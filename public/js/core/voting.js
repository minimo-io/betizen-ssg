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
  },

  async handleVote(button) {
    if (!window.BZ.state.get("auth.isAuthenticated")) {
      window.BZ.auth.showLoginModal();
      return;
    }

    const entityId = button.dataset.entityId;
    const voteType = button.dataset.vote;
    const entityType = button.dataset.entityType;

    try {
      button.disabled = true;
      button.classList.add("loading");

      const response = await window.BZ.api.voting.vote({
        entityId,
        voteType,
        entityType,
      });

      // Update local state
      const userVotes = window.BZ.state.get("voting.userVotes");
      userVotes.set(entityId, voteType);
      window.BZ.state.set("voting.userVotes", userVotes);

      // Update UI
      this.updateVoteUI(entityId, response.votes);
      showToast("Vote recorded!", "success");
    } catch (error) {
      showToast("Vote failed", "error");
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
