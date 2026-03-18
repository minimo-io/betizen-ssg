/**
 * Casino Search Module
 * Handles client-side fuzzy search for casinos on the casinos list page
 */

window.BZ = window.BZ || {};
window.BZ.casinoSearch = {
  debounceTimer: null,
  debounceDelay: 300,

  init() {
    const searchInput = document.getElementById("casino-search");
    const tbody = document.querySelector("#casinos-list tbody");
    
    if (!searchInput || !tbody) return;

    searchInput.addEventListener("input", (e) => {
      this.handleSearch(e.target.value, tbody);
    });
  },

  handleSearch(query, tbody) {
    clearTimeout(this.debounceTimer);
    
    this.debounceTimer = setTimeout(() => {
      this.filterCasinos(query.trim().toLowerCase(), tbody);
    }, this.debounceDelay);
  },

  filterCasinos(query, tbody) {
    const rows = tbody.querySelectorAll("tr");
    let visibleCount = 0;

    rows.forEach((row) => {
      const titleElement = row.querySelector("span.text-center");
      const title = titleElement ? titleElement.textContent.toLowerCase() : "";
      const matches = this.fuzzyMatch(query, title);

      if (matches) {
        row.style.display = "";
        row.classList.remove("hidden");
        row.style.animation = "fadeIn 0.3s ease-in";
        visibleCount++;
      } else {
        row.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => {
          row.classList.add("hidden");
          row.style.display = "none";
        }, 300);
      }
    });

    this.updateNoResultsMessage(visibleCount === 0 && query.length > 0);
  },

  fuzzyMatch(query, text) {
    if (!query) return true;
    if (!text) return false;

    let queryIndex = 0;
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
      if (text[i] === query[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === query.length;
  },

  updateNoResultsMessage(show) {
    let noResultsEl = document.getElementById("casinos-no-results");
    
    if (show) {
      if (!noResultsEl) {
        noResultsEl = document.createElement("div");
        noResultsEl.id = "casinos-no-results";
        noResultsEl.className = "text-center py-8 text-base-content/60";
        noResultsEl.innerHTML = `
          <i data-lucide="search-x" strokeWidth={1} class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
          <p class="text-lg">No casinos found</p>
          <p class="text-sm opacity-70">Try a different search term</p>
        `;
        const table = document.querySelector("#casinos-list");
        table.parentNode.insertBefore(noResultsEl, table.nextSibling);
        lucide.createIcons();
      }
      noResultsEl.style.display = "";
      noResultsEl.style.animation = "fadeIn 0.3s ease-in";
    } else if (noResultsEl) {
      noResultsEl.style.animation = "fadeOut 0.3s ease-out";
      setTimeout(() => {
        noResultsEl.style.display = "none";
      }, 300);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.BZ.casinoSearch.init();
});
