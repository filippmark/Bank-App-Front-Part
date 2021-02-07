import { State, States } from "@/store/modules/disability/types";
import { RootState } from "@/store/types";
import { Module } from "vuex";
import mutations from "@/store/modules/disability/mutations";
import actions from "@/store/modules/disability/actions";

export const state: State = {
  [States.disabilities]: [],
  [States.isDisabilitiesLoading]: false,
};

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default module;
