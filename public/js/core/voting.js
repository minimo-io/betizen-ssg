// Voting system
window.BZ.voting = {
  init() {
    // Event delegation for vote buttons
    document.addEventListener("click", (e) => {
      const voteBtn = e.target.closest("[data-vote]");
      if (voteBtn) {
        this.handleVote(voteBtn);
      }
    });

    // Load user votes on auth
    // window.BZ.state.subscribe("auth.isAuthenticated", (isAuth) => {
    //   if (isAuth) this.loadUserVotes();
    // });

    // Subscribe to changes in user karma
    window.BZ.state.subscribe("auth.user.karma", (newKarma) => {
      console.log("FIRE_KARMA CHANGE UPDATE", newKarma);
      const user = JSON.parse(localStorage.getItem("bz_user"));
      user.karma = newKarma;
      // save edited value to local storage
      localStorage.setItem("bz_user", JSON.stringify(user));
    });
  },

  async handleVote(button) {
    if (!window.BZ.state.get("auth.isAuthenticated")) {
      window.BZ.auth.showLoginModal();
      return;
    }

    const entityId = button.dataset.entityId;
    const karma = button.dataset.karma;

    try {
      button.disabled = true;
      button.classList.add("loading");

      c.log("Trying to vote...");

      const response = await window.BZ.api.voting.vote({
        entity_id: entityId,
        karma: Number(karma),
      });

      c.log("VOTING RESPONSE", response);
      showToast(`${getTranslation("texts.votingSuccess")}`, "success");

      // Update user karma value an visual elements
      if (response && response.data.newKarma) {
        // Update karma state (that will fire ui updates)
        window.BZ.state.set("auth.user.karma", response.data.newKarma);

        const karmaElements = document.querySelectorAll(".bz-karma-count");
        karmaElements.forEach((el) => {
          el.textContent = `${response.data.newKarma} karma`;
        });
      }

      // Update local state
      // const userVotes = window.BZ.state.get("voting.userVotes");
      // userVotes.set(entityId, voteType);
      // window.BZ.state.set("voting.userVotes", userVotes);

      // Update UI
      // this.updateVoteUI(entityId, response.votes);
      // showToast("Vote recorded!", "success");
    } catch (error) {
      // Show a message
      console.error("Vote failed", error);
      showToast(`${getTranslation("texts.votingFailed")}`, "error");
    } finally {
      button.disabled = false;
      button.classList.remove("loading");
    }
  },

  updateVoteUI(entityId, voteCounts) {
    const container = document.querySelector(`[data-entity-id="${entityId}"]`);
    if (container) {
      container.querySelector(".up-count").textContent = voteCounts.up;
      container.querySelector(".down-count").textContent = voteCounts.down;
    }
  },

  async loadUserVotes() {
    try {
      const response = await window.BZ.api.voting.getUserVotes();
      const userVotes = new Map();
      response.votes.forEach((vote) => {
        userVotes.set(vote.entityId, vote.voteType);
      });
      window.BZ.state.set("voting.userVotes", userVotes);
    } catch (error) {
      console.error("Failed to load user votes:", error);
    }
  },
};
