import { State, States } from "@/store/modules/citizenship/types";
import { RootState } from "@/store/types";
import { Module } from "vuex";
import mutations from "@/store/modules/citizenship/mutations";
import actions from "@/store/modules/citizenship/actions";

export const state: State = {
  [States.citizenships]: [],
  [States.isCitizenshipsLoading]: false,
};

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default module;
