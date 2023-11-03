import { createApp } from "vue"
import App from "./App.vue"
import SVG from "./components/svg/index.vue"
import "./styles/tailwind.css";
import router from "./router";

const app = createApp(App)

app.component("SVG", SVG)

app.use(router)

app.mount("#app")
