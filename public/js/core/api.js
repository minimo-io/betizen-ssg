// API client with error handling
window.BZ.api = {
  baseURL: window.isDev ? "http://127.0.0.1:8085" : "https://api.cubiq.lat",
  async request(endpoint, options = {}) {
    const { headers: optionHeaders = {}, ...restOptions } = options;

    // config for all api requests
    const config = {
      headers: {
        "Content-Type": "application/json",
        // "X-Database-UUID": "3dc66d01-63f5-4909-88ee-f27f03c79d28",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYTM0MTJiYy0yYjZkLTQxMTAtOTIyZi05ZmZlMTNmYmNlYTEiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzY5MTY5ODY1LCJleHAiOjMzNDU5Njk4NjV9.ObbR1fEi-AYVpLb48ArboH4Twj8dNrTyLCJL5_6xy0o",
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

  // Auth API endpoints
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

  // Voting API endpoints
  voting: {
    vote: async (voteData) => {
      const voteResult = await window.BZ.api.request("/users/voting/vote", {
        method: "POST",
        body: JSON.stringify(voteData),
      });
      return voteResult;
    },

    getUserVotes: () => window.BZ.api.request("/votes/user"),

    // for refreshing karma ui, for example on page load
    getKarmaData: async () => {
      // get karma data from api
      console.log("Getting karma data from api...");
      const karmaData = await window.BZ.api.request("/users/voting/karma", {
        method: "GET",
      });
      console.log("Getting karma data from api... OK", karmaData.data);
      return karmaData;
    },

    // Earn karma method, which internally (in the api) will also count link
    // When the user is offline, we have another method so we can just count the link visit (see below)
    earnKarma: {
      forVisitingLink: async (payload) => {
        // console.log("Earning karma from api...");
        const earnKarmaResult = window.BZ.api.request("/users/voting/earn", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        return earnKarmaResult;
        // console.log("Earn karma result", earnKarmaResult);
      },
    },

    // Count link vistit even if the user is not loggeed-in
    countVisit: async (payload) => {
      console.log("Trying to count +1 visit to this link...");

      const visitCountResult = await window.BZ.api.request(
        "/users/voting/visit-count",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
      );
      
      console.log(`Visit count result:`, visitCountResult);
    },
  },

  // Cms API endpoints
  cms:{
    comments:{
      async create(payload){
        console.log("Comment created!")
      },
      async fetch(query){
        console.log("Fetch all comments...")
      }
    }
  }
};
