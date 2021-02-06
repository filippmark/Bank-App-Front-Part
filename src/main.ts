import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api';
import vuetify from './plugins/vuetify';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore missing types nobody cares
import VCurrencyField from 'v-currency-field';
import { VTextField } from 'vuetify/lib';

Vue.config.productionTip = false

Vue.use(VueCompositionAPI);
Vue.use(VCurrencyField, {
  allowNegative: false,
});
Vue.component('v-text-field', VTextField);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
