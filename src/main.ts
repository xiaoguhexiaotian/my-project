import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

createApp(App).use(store).use(router).use(Antd).use(VXETable).mount("#app");
