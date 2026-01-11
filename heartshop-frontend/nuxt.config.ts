export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  build: {
    transpile: [
      "naive-ui",
      "vueuc",
      "@css-render/vue3-ssr",
      "@juggle/resize-observer",
    ],
  },
  vite: {
    ssr: {
      noExternal: [
        "naive-ui",
        "vueuc",
        "@css-render/vue3-ssr",
        "@juggle/resize-observer",
      ],
    },
  },

  // API Proxy 配置：開發環境將 /api 請求代理到後端 Spring Boot
  nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:8080/api",
        changeOrigin: true,
        prependPath: true,
      },
      "/uploads": {
        target: "http://localhost:8080/api/uploads",
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
});
