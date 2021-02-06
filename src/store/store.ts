import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import client from "@/store/modules/client";
import { Modules, RootState } from "./types";

const storeOptions: StoreOptions<RootState> = {
  modules: {
    [Modules.CLIENT]: client,
  },
};

Vue.use(Vuex);

export const store = new Vuex.Store(storeOptions);

export default store;
