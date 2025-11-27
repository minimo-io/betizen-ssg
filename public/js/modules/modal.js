// Modal constructor function
function BZModal(id = "bz_modal_1") {
  this.id = id;

  this.isModal = false;
  this.modal = undefined;

  // Init the modal (usually once DOMContentLoad is ready)
  this.init = () => {
    let modal = document.getElementById(this.id);

    if (!modal) {
      // If the modal does not exists, create it in the DOM and append it to body.
      // If the modal does not exist, create it in the DOM and append it to body
      modal = createModalElement(this.id);
      document.body.appendChild(modal);
    }

    this.modal = modal;
    // Remove existing close listener to avoid duplicates
    this.modal.removeEventListener("close", this.empty);

    // Add close listener to reset content when modal is closed
    this.modal.addEventListener("close", this.empty);

    this.modal = modal;
    this.isModal = Boolean(modal);
  };

  // Empty the modal
  this.empty = () => {
    if (!this.isModal) {
      //   console.error(`Modal element with ID "${this.id}" not found.`);
      return;
    }

    this.modal.querySelector(".modal-box div").innerHTML = "";
  };

  // Close the modal
  this.close = () => {
    if (!this.isModal) {
      //   console.error(`Modal element with ID "${this.id}" not found.`);
      return;
    }
    this.modal.close();
  };

  this.show = (contentData, show = true, fullscreen = false) => {
    const modal = this.modal;

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
  };

  // Private method to create modal structure
  const createModalElement = (id) => {
    const dialog = document.createElement("dialog");
    dialog.classList.add("modal");
    dialog.id = id;

    // Create modal-box div
    const modalBox = document.createElement("div");
    modalBox.classList.add("modal-box");

    // Create title h3
    const title = document.createElement("h3");
    title.classList.add("text-lg", "font-bold");

    // Create body div
    const body = document.createElement("div");
    body.classList.add("py-4", "text-sm", "md:text-sm");

    // Create modal-action div
    const modalAction = document.createElement("div");
    modalAction.classList.add("modal-action", "mt-0");

    // Create form with method="dialog"
    const form = document.createElement("form");
    form.setAttribute("method", "dialog");

    // Create close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("btn");
    // closeButton.textContent = "Close";
    closeButton.textContent = getTranslation("texts.close") || "Close";

    // Assemble the structure
    form.appendChild(closeButton);
    modalAction.appendChild(form);
    modalBox.appendChild(title);
    modalBox.appendChild(body);
    modalBox.appendChild(modalAction);
    dialog.appendChild(modalBox);

    return dialog;
  };
}

window.BZ.modal = new BZModal("bz_modal_1");
