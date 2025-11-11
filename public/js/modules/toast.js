// Toast configuration - customize these values
window.TOAST_CONFIG = window.TOAST_CONFIG || {
  duration: 3000, // Duration in milliseconds (3 seconds)
  message: "Page loaded successfully!",
  type: "success", // success, error, warning, info
  position: "toast-end", // toast-start, toast-center, toast-end, toast-top, toast-middle, toast-bottom
  closable: true, // Whether to show close button
  pauseOnHover: true, // Pause auto-dismiss when hovering
};

// Function to remove toast with animation
function removeToast(toast) {
  if (toast && toast.parentNode) {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px)";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}

// Function to create and show DaisyUI toast
function showToast(
  message,
  type = "success",
  duration = 5000,
  position = "toast-center",
  closable = true,
  pauseOnHover = true
) {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector(".toast");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = `toast ${position}`;
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `alert alert-soft alert-${type}`;

  // Add icon based on type
  const icons = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" /></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  };

  // Build toast content with simple close button
  toast.innerHTML = `
    ${icons[type] || icons.info}
    <span>${message}</span>
    ${
      closable
        ? `<button class="toast-close-btn" style="background: rgba(0,0,0,0.1); border: none; border-radius: 4px; width: 24px; height: 24px; margin-left: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; line-height: 1;">&times;</button>`
        : ""
    }
  `;

  // Make the alert flex to accommodate the close button
  if (closable) {
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.justifyContent = "space-between";
  }

  // Add close button functionality
  if (closable) {
    const closeBtn = toast.querySelector(".toast-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        clearTimeout(autoRemoveTimeout);
        removeToast(toast);
      });
    }
  }

  // Add click-to-close functionality (optional)
  toast.addEventListener("click", () => {
    clearTimeout(autoRemoveTimeout);
    removeToast(toast);
  });

  // Pause on hover functionality
  let autoRemoveTimeout;
  let remainingTime = duration;
  let startTime = Date.now();

  if (pauseOnHover) {
    toast.addEventListener("mouseenter", () => {
      clearTimeout(autoRemoveTimeout);
      remainingTime = remainingTime - (Date.now() - startTime);
    });

    toast.addEventListener("mouseleave", () => {
      startTime = Date.now();
      autoRemoveTimeout = setTimeout(() => {
        removeToast(toast);
      }, remainingTime);
    });
  }

  // Add toast to container
  toastContainer.appendChild(toast);

  // Add animation class for smooth appearance
  toast.style.opacity = "0";
  toast.style.transform = "translateY(20px)";
  toast.style.transition = "all 0.3s ease-in-out";

  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 10);

  // Auto-remove toast after specified duration
  if (duration > 0) {
    autoRemoveTimeout = setTimeout(() => {
      removeToast(toast);
    }, duration);
  }

  // Return toast element for external control if needed
  return toast;
}

// Export functions globally (prevent redeclaration)
if (!window.showToast) {
  window.showToast = showToast;
}
if (!window.removeToast) {
  window.removeToast = removeToast;
}
