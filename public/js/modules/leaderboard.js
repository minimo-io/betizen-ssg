/**
 * Leaderboard Module
 * Handles UI rendering for the leaderboard table
 */

window.BZ = window.BZ || {};
window.BZ.leaderboard = {
  async init() {
    const tbody = document.getElementById("leaderboard-table-body");
    if (!tbody) return;

    await this.fetchLeaderboard(tbody);
  },

  renderRow(user) {
    const avatarUrl =
      user.picture ||
      "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name);
    const karmaFormatted = user.karma.toLocaleString();

    return `
      <tr>
        <th>${user.rank}</th>
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img src="${avatarUrl}" alt="Avatar of ${user.name}" />
              </div>
            </div>
            <div>
              <div class="font-bold">${user.name}</div>
            </div>
          </div>
        </td>
        <td>${karmaFormatted}</td>
      </tr>
    `;
  },

  async fetchLeaderboard(tbody) {
    try {
      const response = await window.BZ.api.lists.listUsers({ limit: 20, sort: "karma", order: "desc" });
      const users = response.data.data;

      tbody.innerHTML = users
        .map((user) => this.renderRow(user))
        .join("");
    } catch (error) {
      console.error("Failed to load leaderboard:", error);
      tbody.innerHTML = `
        <tr>
          <td colspan="3" class="text-center py-8 text-base-content/60">
            Failed to load leaderboard data
          </td>
        </tr>
      `;
    }
  },
};
