// public/js/core/state.js
// State management with events
class BZState extends EventTarget {
  constructor() {
    super();
    this.data = {
      auth: {
        user: null,
        token: localStorage.getItem("bz_token"),
        isAuthenticated: false,
      },
      voting: { userVotes: new Map(), counts: new Map() },
      ui: { loading: false, error: null, currentModal: null },
    };
  }

  get(path) {
    return path.split(".").reduce((obj, key) => obj?.[key], this.data);
  }

  set(path, value) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce(
      (obj, key) => (obj[key] = obj[key] || {}),
      this.data
    );
    const oldValue = target[lastKey];
    target[lastKey] = value;

    this.dispatchEvent(
      new CustomEvent("state:change", {
        detail: { path, oldValue, newValue: value },
      })
    );
  }

  subscribe(path, callback) {
    const handler = (e) => {
      if (e.detail.path === path)
        callback(e.detail.newValue, e.detail.oldValue);
    };
    this.addEventListener("state:change", handler);
    return () => this.removeEventListener("state:change", handler);
  }
}

// Global state instance
window.BZ = window.BZ || {};
window.BZ.state = new BZState();
