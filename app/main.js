import Vue from "nativescript-vue";
import App from "./components/App";
import store from "./store";
import RadListView from "nativescript-ui-listview/vue";
import RadDataForm from "nativescript-ui-dataform/vue";
import { TNSFontIcon, fonticon } from "nativescript-fonticon";
import VueDevtools from "nativescript-vue-devtools";

Vue.use(RadDataForm);

//Initialize FontAwesome
TNSFontIcon.debug = false;

TNSFontIcon.paths = {
  fa: "./fonts/fa5-all.css"
};
TNSFontIcon.loadCss();
Vue.filter("fonticon", fonticon);

Vue.registerElement(
  "CardView",
  () => require("nativescript-cardview").CardView
);

Vue.use(RadListView);

if (TNS_ENV !== "production") {
  Vue.use(VueDevtools);
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";

Vue.registerElement(
  "RadSideDrawer",
  () => require("nativescript-ui-sidedrawer").RadSideDrawer
);

new Vue({
  store,
  render: h => h("frame", [h(App)])
}).$start();
