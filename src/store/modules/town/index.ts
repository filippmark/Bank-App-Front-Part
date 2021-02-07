import { State, States } from "@/store/modules/town/types";
import { RootState } from "@/store/types";
import { Module } from "vuex";
import mutations from "@/store/modules/town/mutations";
import actions from "@/store/modules/town/actions";

export const state: State = {
  [States.towns]: [],
  [States.isTownLoading]: false,
};

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default module;
