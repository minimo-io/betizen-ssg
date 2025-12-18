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

    // Event for link buttons which earn karma
    document.addEventListener("click", (e) => {
      const visitBtn = e.target.closest("[data-earnurl]");
      if (visitBtn) {
        this.handleEarnKarma(visitBtn);
      }
    });

    // UI Subscriptions
    // Subscribe to changes in user karma
    window.BZ.state.subscribe("auth.user.karma", (newKarma) => {
      const user = JSON.parse(localStorage.getItem("bz_user"));
      user.karma = newKarma;

      // save edited value to local storage
      localStorage.setItem("bz_user", JSON.stringify(user));
      // update ui elements
      const karmaElements = document.querySelectorAll(".bz-karma-count");
      karmaElements.forEach((el) => {
        el.textContent = `${newKarma} karma`;
      });
    });

    // Subscribe changes to user ranking
    window.BZ.state.subscribe("auth.user.rank", (newRank) => {
      const user = JSON.parse(localStorage.getItem("bz_user"));
      user.rank = newRank;

      // save edited value to local storage
      localStorage.setItem("bz_user", JSON.stringify(user));
      // update ui elements
      const karmaElements = document.querySelectorAll(".bz-user-rank");
      karmaElements.forEach((el) => {
        el.textContent = `${newRank}`;
      });
    });

    // Subscribe to changes in the modal for external links opened
    window.BZ.state.subscribe("ui.currentModal", (currentModal) => {
      if (currentModal == "external_link_opening") {
        document
          .getElementById("modal-external-click")
          .classList.add("modal-open");
      } else {
        document
          .getElementById("modal-external-click")
          .classList.remove("modal-open");
      }
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

      const response = await window.BZ.api.voting.vote({
        entity_id: entityId,
        karma: Number(karma),
      });

      showToast(`${getTranslation("texts.votingSuccess")}`, "success");

      // Update user karma value an visual elements
      if (response && response.data.newKarma != null) {
        // Update karma state (that will fire ui updates)
        window.BZ.state.set("auth.user.karma", response.data.newKarma);
      }
      // update user rank state (to fire ui updates)
      if (response && response.data.newRank != null) {
        window.BZ.state.set("auth.user.rank", response.data.newRank);
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

  async handleEarnKarma(button) {
    // Only apply karma if user is authenticated
    if (window.BZ.state.get("auth.isAuthenticated")) {
      const urlToVisit = button.dataset.earnurl.trim();
      // console.log("TRIMMED_URL", urlToVisit);

      window.BZ.modal.close(); // close other modals if opened

      button.disabled = true;
      // open modal
      window.BZ.state.set("ui.currentModal", "external_link_opening");

      try {
        const response = await window.BZ.api.voting.earnKarma.forVisitingLink({
          type: "VISIT_AFFILIATE_LINK",
          url: urlToVisit,
        });

        switch (response.data.status) {
          case "COOLDOWN":
            showToast(`${getTranslation("texts.karmaEarnCooldown")}`, "error");
            showToast(
              `${getTranslation("texts.cooldownTime")}: ${
                response.data.cooldown_hours
              }hrs`,
              "error"
            );

            break;
          case "SUCCESS":
            showToast(`${getTranslation("texts.karmaEarned")}`, "success");
            showToast(
              `${getTranslation("texts.youEarned")}: ${
                response.data.karma_granted
              } ${getTranslation("texts.karmaPoints")}`,
              "success"
            );
            break;
        }

        // window.BZ.state.set("ui.currentModal", null);
        // button.disabled = false;
      } catch (err) {
        showToast(`${getTranslation("texts.karmaEarnError")}`, "error");
        // button.disabled = false;
        // window.BZ.state.set("ui.currentModal", "null");
      } finally {
        // button.disabled = false;
        // window.BZ.state.set("ui.currentModal", "null");

        // change modal message
        document.getElementById(
          "modal-external-click-message"
        ).innerHTML = `${getTranslation("texts.karmaEarnRedirecting")}`;

        // Finally visit the casino
        // setTimeout(function () {
        window.location.href = urlToVisit;
        // }, 1000);

        // window.open(urlToVisit, "_blank");
      }
    } else {
      console.log("Karma not earned, used is logged out.");
    }
  },

  async loadUserKarmaData() {
    if (!window.BZ.state.get("auth.isAuthenticated")) {
      return;
    }

    try {
      const response = await window.BZ.api.voting.getKarmaData();
      // Update karma state (that will fire ui updates)
      if (response && response.data.karma != null) {
        window.BZ.state.set("auth.user.karma", response.data.karma);
      }
      // Update rank state (that will fire ui updates)
      if (response && response.data.rank != null) {
        window.BZ.state.set("auth.user.rank", response.data.rank);
      }
    } catch {
      console.error("Failed to get user karma data", error);
    }
  },

  // updateVoteUI(entityId, voteCounts) {
  //   const container = document.querySelector(`[data-entity-id="${entityId}"]`);
  //   if (container) {
  //     container.querySelector(".up-count").textContent = voteCounts.up;
  //     container.querySelector(".down-count").textContent = voteCounts.down;
  //   }
  // },

  // async loadUserVotes() {
  //   try {
  //     const response = await window.BZ.api.voting.getUserVotes();
  //     const userVotes = new Map();
  //     response.votes.forEach((vote) => {
  //       userVotes.set(vote.entityId, vote.voteType);
  //     });
  //     window.BZ.state.set("voting.userVotes", userVotes);
  //   } catch (error) {
  //     console.error("Failed to load user votes:", error);
  //   }
  // },
};
