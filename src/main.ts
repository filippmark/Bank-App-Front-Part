import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore missing types nobody cares
import VCurrencyField from "v-currency-field";
import { VTextField } from "vuetify/lib";
import Store from "@/store/store";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);
Vue.use(VCurrencyField, {
  allowNegative: false,
});
Vue.component("v-text-field", VTextField);

new Vue({
  router,
  store: Store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
