document.addEventListener("DOMContentLoaded", async () => {
  // Initialize theme first
  initTheme();

  // Console signture
  showFuturewiseSignature();

  // Initial toast
  showToast(
    getTranslation("texts.spreadKarma"),
    "success",
    5000,
    "toast-center",
    true
  );

  // Load lucide icons
  lucide.createIcons();

  // NEW: Initialize auth and voting modules
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
      closeModal();
    }
  });

  // modal button
  document.querySelectorAll(".btn-bz-modal").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Access the clicked element from the 'event' object
      const clickedButton = event.currentTarget;
      const modalTitle = clickedButton.dataset.modalTitle;
      const modalBody = clickedButton.dataset.modalBody;
      const isFullscreen = clickedButton.dataset.modalFull === "true";

      setupAndShowModal(
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
 * Sets up the content of the modal and displays it.
 * @param {object} contentData - An object containing the data to populate the modal.
 * @param {string} contentData.title - The title of the modal.
 * @param {string} contentData.body - The main body content of the modal.
 * @param {boolean} show - Whether to show the modal immediately.
 * @param {boolean|HTMLElement} fullscreen - Whether to display in fullscreen mode, or the trigger element to read data-modal-full from.
 */
function setupAndShowModal(contentData, show = true, fullscreen = false) {
  // Select the modal element inside the function to ensure it is in the DOM.
  const modal = document.getElementById("bz_modal_1");

  if (!modal) {
    console.error('Modal element with ID "bz_modal_1" not found.');
    return;
  }

  // Remove existing close listener to avoid duplicates
  modal.removeEventListener("close", emptyModal);

  // Add close listener to reset content when modal is closed
  modal.addEventListener("close", emptyModal);

  // Determine if fullscreen mode should be used
  let isFullscreen = false;

  if (typeof fullscreen === "boolean") {
    isFullscreen = fullscreen;
  } else if (
    fullscreen &&
    fullscreen.dataset &&
    fullscreen.dataset.modalFull === "true"
  ) {
    isFullscreen = true;
  }

  // Find the content elements within the modal box
  const modalTitle = modal.querySelector(".modal-box h3");
  const modalBody = modal.querySelector(".modal-box div");
  const modalBox = modal.querySelector(".modal-box");

  // Toggle fullscreen classes
  if (isFullscreen) {
    // Make modal fullscreen
    modal.classList.add("p-0");
    modalBox.classList.remove("max-w-lg", "w-11/12");
    modalBox.classList.add(
      "w-screen",
      "h-screen",
      "max-w-none",
      "max-h-none",
      "rounded-none",
      "flex",
      "flex-col"
    );
    modalBody.classList.add("flex-1", "overflow-auto");
  } else {
    // Reset to normal modal
    modal.classList.remove("p-0");
    modalBox.classList.add("max-w-lg", "w-11/12");
    modalBox.classList.remove(
      "w-screen",
      "h-screen",
      "max-w-none",
      "max-h-none",
      "rounded-none",
      "flex",
      "flex-col"
    );
    modalBody.classList.remove("flex-1", "overflow-auto");
  }

  // Populate the content elements with the provided data
  if (modalTitle) {
    if (contentData.title && contentData.title.trim() !== "") {
      modalTitle.textContent = contentData.title;
      modalTitle.style.display = "block"; // Show title
    } else {
      modalTitle.textContent = "";
      modalTitle.style.display = "none"; // Hide title if undefined/empty
    }
  }

  if (modalBody) {
    modalBody.innerHTML = contentData.body;
  }

  // Finally, show the modal
  if (show) modal.showModal();
}

function emptyModal() {
  const modal = document.getElementById("bz_modal_1");

  if (!modal) {
    console.error('Modal element with ID "bz_modal_1" not found.');
    return;
  }

  const modalBody = modal.querySelector(".modal-box div");

  modalBody.innerHTML = "";
}

function closeModal() {
  const modal = document.getElementById("bz_modal_1");

  if (!modal) {
    console.error('Modal element with ID "bz_modal_1" not found.');
    return;
  }

  modal.close();
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
