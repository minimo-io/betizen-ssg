// API client with error handling
window.BZ.api = {
  baseURL: window.isDev
    ? "http://127.0.0.1:8085"
    : "https://api.futurewise.lat",
  async request(endpoint, options = {}) {
    const { headers: optionHeaders = {}, ...restOptions } = options;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Database-UUID": "3dc66d01-63f5-4909-88ee-f27f03c79d28",
        ...optionHeaders,
      },
      ...restOptions,
    };

    const token = window.BZ.state.get("auth.token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw { message: data.message, status: response.status };
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // Auth endpoints
  auth: {
    // login: (credentials) =>
    //   window.BZ.api.request("/auth/login", {
    //     method: "POST",
    //     body: JSON.stringify(credentials),
    //   }),
    logout: () => {
      window.BZ.api.request("/users/auth/logout", {
        method: "POST",
        body: JSON.stringify(""),
      });
    },
    // register: (userData) =>
    //   window.BZ.api.request("/auth/register", {
    //     method: "POST",
    //     body: JSON.stringify(userData),
    //   }),
    verify: () => window.BZ.api.request("/users/auth/verify"),
    loginWithGoogle: (credential) =>
      window.BZ.api.request("/users/auth/google/login", {
        method: "POST",
        body: JSON.stringify({ credential: credential }),
      }),
  },

  // Voting endpoints
  voting: {
    vote: async (voteData) => {
      const voteResult = await window.BZ.api.request("/users/voting/vote", {
        method: "POST",
        body: JSON.stringify(voteData),
      });
      return voteResult;
    },

    getUserVotes: () => window.BZ.api.request("/votes/user"),
  },
};
