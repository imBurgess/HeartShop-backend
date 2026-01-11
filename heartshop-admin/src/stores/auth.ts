import { defineStore } from "pinia";

const TOKEN_KEY = "admin_token";

export interface AdminUser {
  name: string;
  role?: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: (localStorage.getItem(TOKEN_KEY) as string | null) ?? null,
    user: null as AdminUser | null,
  }),

  getters: {
    isLogin: (state) => !!state.token,
  },

  actions: {
    login(payload: { token: string; user: AdminUser }) {
      this.token = payload.token;
      this.user = payload.user;
      localStorage.setItem(TOKEN_KEY, payload.token);
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});
