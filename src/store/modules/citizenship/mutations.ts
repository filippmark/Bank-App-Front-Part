import { Option } from "@/types/client";
import { MutationTree } from "vuex";
import { Mutations, State, States } from "./types";

const mutations: MutationTree<State> = {
  [Mutations.SET_CITIZENSHIPS]: (state: State, newValue: Option[]) => {
    state[States.citizenships] = newValue;
  },
  [Mutations.SET_CITIZENSHIP_LOADING]: (state: State, newValue: boolean) => {
    state[States.isCitizenshipsLoading] = newValue;
  },
};

export default mutations;
