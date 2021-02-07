import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import client from "@/store/modules/client";
import citizenship from "@/store/modules/citizenship";
import maritalStatuses from "@/store/modules/maritalStatus";
import town from "@/store/modules/town";
import disabilities from "@/store/modules/disability";
import { Modules, RootState } from "./types";

const storeOptions: StoreOptions<RootState> = {
  modules: {
    [Modules.CLIENT]: client,
    [Modules.CITIZENSHIP]: citizenship,
    [Modules.MARITAL_STATUS]: maritalStatuses,
    [Modules.DISABILITY]: disabilities,
    [Modules.TOWN]: town,
  },
};

Vue.use(Vuex);

export const store = new Vuex.Store(storeOptions);

export default store;
