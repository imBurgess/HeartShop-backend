// stores/auth.ts
import { defineStore } from "pinia";
import { authService, type LoginResponse } from "~/services/auth";

export const useAuthStore = defineStore("auth", () => {
  // === state ===
  const isLoggedIn = ref(false);
  const member = ref<LoginResponse["member"] | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // === actions ===
  const login = async (account: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await authService.login({ account, password });
      isLoggedIn.value = res.ok;
      member.value = res.member;
      return true;
    } catch (e: any) {
      isLoggedIn.value = false;
      member.value = null;
      error.value = e?.message ?? "登入失敗";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    // 目前先做前端登出（清狀態）
    // 之後我們再補 /api/auth/logout 清 cookie
    isLoggedIn.value = false;
    member.value = null;
    error.value = null;
  };

  return { isLoggedIn, member, loading, error, login, logout };
});
