import { createApp } from "vue";
import App from "./App.vue";
// 3. Import the router we just configured
import router from "./router";

const app = createApp(App);

// 4. Tell the Vue app to use the router
app.use(router);

app.mount("#app");
