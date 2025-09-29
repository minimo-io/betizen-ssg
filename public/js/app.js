document.addEventListener("DOMContentLoaded", async () => {
  // Initialize theme first
  initTheme();

  // Console signture
  showFuturewiseSignature();

  // Initial toast
  // showToast(
  //   getTranslation("texts.spreadKarma"),
  //   "success",
  //   5000,
  //   "toast-center",
  //   true
  // );

  // Load lucide icons
  lucide.createIcons();

  // Initialize main modules
  if (window.BZ?.modal) window.BZ.modal.init();
  if (window.BZ?.auth) await window.BZ.auth.init();
  if (window.BZ?.voting) window.BZ.voting.init();

  // Event delegation for login/logout buttons (supports multiple buttons)
  document.addEventListener("click", (e) => {
    // Handle login buttons
    if (e.target.closest(".btn-login")) {
      window.BZ.auth.showLoginModal();

      // Set up modal form listeners after modal is shown
      setTimeout(() => {
        // document
        //   .getElementById("bz-login-form")
        //   ?.addEventListener("submit", async (e) => {
        //     e.preventDefault();
        //     const formData = new FormData(e.target);
        //     await window.BZ.auth.login(
        //       formData.get("email"),
        //       formData.get("password")
        //     );
        //   });

        // Nostr login
        document
          .getElementById("nostr-login-btn")
          ?.addEventListener("click", () => {
            window.BZ.auth.loginWithNostr();
          });
      }, 100);
    }

    // Handle logout buttons
    if (e.target.closest(".btn-logout")) {
      window.BZ.auth.logout();
      window.BZ.modal.close();
    }

    // Handle voting buttons
    if (e.target.closest(".btn-bz-voting")) {
      if (window.BZ.voting) {
        const buttonElement = e.target.closest(".btn-bz-voting");

        // const entityId = buttonElement.dataset.entityId;
        // const karma = buttonElement.dataset.karma;
        // console.log(`So u wanna vote ${karma} to ${entityId} eh?`);

        // Pass the button element to your function
        window.BZ.voting.handleVote(buttonElement);
      }
    }
  });

  // modal buttons
  document.querySelectorAll(".btn-bz-modal").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Access the clicked element from the 'event' object
      const clickedButton = event.currentTarget;
      const modalTitle = clickedButton.dataset.modalTitle;
      const modalBody = clickedButton.dataset.modalBody;
      const isFullscreen = clickedButton.dataset.modalFull === "true";

      window.BZ.modal.show(
        {
          title: modalTitle,
          body: modalBody,
        },
        true,
        isFullscreen
      );
    });
  });
  // Call the setupReadMore function for your content.
  // The IDs here must match the IDs in your HTML template.
  setupReadMore("expandable-content", "toggle-read-more");

  // swing button with pulse
  const elements = document.querySelectorAll(".bz-swing-and-pulse");
  if (elements.length) {
    setTimeout(() => {
      elements.forEach((el) => {
        el.classList.add("animate__pulse", "animate__infinite");
        el.classList.remove("animate__swing");
      });
    }, 1000);
  }

  const isAuthenticated = window.BZ.state.get("auth.isAuthenticated");

  if (!isAuthenticated) {
    c.log("User needs to login...");
  }

  document
    .getElementById("login-btn")
    ?.classList.toggle("hidden", isAuthenticated);
  document
    .getElementById("logout-btn")
    ?.classList.toggle("hidden", !isAuthenticated);
  // Handle language modal
  document.addEventListener("click", (e) => {
    if (e.target.closest("#language-modal-trigger")) {
      const template = document.getElementById("language-links-template");
      if (template) {
        const content = template.innerHTML;
        window.BZ.modal.show(
          {
            title:
              getTranslation("texts.selectLanguage", window.currentLang) ||
              "Select Language",
            body: content,
          },
          true,
          false
        );
      }
    }
  });

  // NEW: Simple auth UI updates
  window.BZ?.state?.subscribe("auth.isAuthenticated", (isAuth) => {
    document.getElementById("login-btn")?.classList.toggle("hidden", isAuth);
    document.getElementById("logout-btn")?.classList.toggle("hidden", !isAuth);
  });
});

function showFuturewiseSignature() {
  const asciiArt = `
███████╗██╗    ██╗
██╔════╝██║    ██║
█████╗  ██║ █╗ ██║
██╔══╝  ██║███╗██║
██║     ╚███╔███╔╝
╚═╝      ╚══╝╚══╝
+------------------------------------------------+
|  This is an experiment developed by            |
|  Futurewise Labs @ https://futurewise.lat      |
+------------------------------------------------+
|  The aim of this experiment is to test the     |
|  limits of vanilla javascript.                 |
+------------------------------------------------+
`;

  // Apply a style to the ASCII art for better visibility
  const style = "color: #E93F33; font-weight: bold; font-family: monospace;";

  // Log the message with the applied style
  console.log("%c" + asciiArt, style);
}

/**
 * Sets up a "Read More" functionality for a given container element.
 * It dynamically calculates the collapsed height based on the first paragraph.
 * @param {HTMLElement} container - The content container element.
 */
function setupReadMore(container) {
  const toggleBtn = document.getElementById("toggle-read-more");
  const content = document.getElementById("expandable-content");

  if (toggleBtn && content) {
    const firstParagraph = content.querySelector("p:first-of-type");

    // If there's no paragraph, we can't do anything, so hide the button.
    if (!firstParagraph) {
      toggleBtn.style.display = "none";
      return;
    }

    // Using a short timeout ensures the browser has finished rendering and calculating heights.
    setTimeout(() => {
      const pStyle = window.getComputedStyle(firstParagraph);
      const marginBottom = parseFloat(pStyle.marginBottom);
      const collapsedHeight = firstParagraph.offsetHeight + marginBottom;
      const fullHeight = content.scrollHeight;

      // If the full content is not significantly taller than the first paragraph, hide the button.
      if (fullHeight <= collapsedHeight + 20) {
        // Using a 20px buffer
        toggleBtn.style.display = "none";
        return;
      }

      // Set the initial state to collapsed
      content.style.maxHeight = `${collapsedHeight}px`;

      let isExpanded = false;
      const readMoreText = "{{ languages[page.lang].texts.readMore }}";
      const readLessText =
        "{{ languages[page.lang].texts.readLess | default('Read Less') }}";

      toggleBtn.addEventListener("click", () => {
        isExpanded = !isExpanded;
        if (isExpanded) {
          // Expand to the full height of the content
          content.style.maxHeight = `${fullHeight}px`;
          toggleBtn.textContent = readLessText;
        } else {
          // Collapse back to the first paragraph's height
          content.style.maxHeight = `${collapsedHeight}px`;
          toggleBtn.textContent = readMoreText;
        }
      });
    }, 100);
  }
}

// Get language translation configure
function getTranslation(key, lang = window.currentLang) {
  const keys = key.split(".");
  let value = window.i18n[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value ?? key;
}

// Init the app theme
function initTheme() {
  // Get saved theme from localStorage, default to 'cmyk'
  const savedTheme = localStorage.getItem("bz_theme") || "cmyk";

  // Apply the theme
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Update the theme toggle button icon
  const themeToggle = document.querySelector('[title="Toggle theme"]');
  if (themeToggle) {
    themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
  }
}
