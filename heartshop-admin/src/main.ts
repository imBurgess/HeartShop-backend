import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { setupAuthGuard } from "@/router/guard";

// 引入全域樣式
import "@/styles/scss/main.scss";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

setupAuthGuard(router);

app.use(router);
app.mount("#app");
