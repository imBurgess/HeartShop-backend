// plugins/naive-ui-ssr.ts
import { defineNuxtPlugin } from "#app";
import { setup } from "@css-render/vue3-ssr";

export default defineNuxtPlugin((nuxtApp) => {
  // 只在伺服器端執行
  if (import.meta.server) {
    const { collect } = setup(nuxtApp.vueApp);

    // 直接拿 Nuxt 的 ssrContext，用 any 把型別壓掉
    const ssrContext = nuxtApp.ssrContext as any;
    if (!ssrContext) return;

    const originalRenderMeta = ssrContext.renderMeta;

    ssrContext.renderMeta = async () => {
      const result = originalRenderMeta ? await originalRenderMeta() : {};

      return {
        ...result,
        headTags: (result.headTags || "") + collect(),
      };
    };
  }
});
