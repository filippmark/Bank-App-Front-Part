import { State, States } from "@/store/modules/maritalStatus/types";
import { RootState } from "@/store/types";
import { Module } from "vuex";
import mutations from "@/store/modules/maritalStatus/mutations";
import actions from "@/store/modules/maritalStatus/actions";

export const state: State = {
  [States.maritalStatuses]: [],
  [States.isMaritalStatusesLoading]: false,
};

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default module;
