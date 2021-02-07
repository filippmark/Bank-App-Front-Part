import { Option } from "@/types/client";
import { MutationTree } from "vuex";
import { Mutations, State, States } from "./types";

const mutations: MutationTree<State> = {
  [Mutations.SET_DISABILITIES]: (state: State, newValue: Option[]) => {
    state[States.disabilities] = newValue;
  },
  [Mutations.SET_DISABILITIES_LOADING]: (state: State, newValue: boolean) => {
    state[States.isDisabilitiesLoading] = newValue;
  },
};

export default mutations;
