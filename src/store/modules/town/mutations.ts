import { Option } from "@/types/client";
import { MutationTree } from "vuex";
import { Mutations, State, States } from "./types";

const mutations: MutationTree<State> = {
  [Mutations.SET_TOWNS]: (state: State, newValue: Option[]) => {
    state[States.towns] = newValue;
  },
  [Mutations.SET_TOWNS_LOADING]: (state: State, newValue: boolean) => {
    state[States.isTownLoading] = newValue;
  },
};

export default mutations;
