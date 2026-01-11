import type { Router } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export function setupAuthGuard(router: Router) {
  router.beforeEach((to) => {
    // 不擋 login
    if (to.path === "/login") return true;

    const auth = useAuthStore();

    if (!auth.isLogin) {
      return { path: "/login", query: { redirect: to.fullPath } };
    }

    return true;
  });
}
