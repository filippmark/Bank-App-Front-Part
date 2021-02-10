import { State, States } from "@/store/modules/error/types";
import { RootState } from "@/store/types";
import { Module } from "vuex";
import mutations from "@/store/modules/error/mutations";

export const state: State = {
  [States.errorMessage]: "",
  [States.showError]: false,
};

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
};

export default module;
