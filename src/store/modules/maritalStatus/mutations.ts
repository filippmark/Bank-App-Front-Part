import { Option } from "@/types/client";
import { MutationTree } from "vuex";
import { Mutations, State, States } from "./types";

const mutations: MutationTree<State> = {
  [Mutations.SET_MARITAL_STATUSES]: (state: State, newValue: Option[]) => {
    state[States.maritalStatuses] = newValue;
  },
  [Mutations.SET_MARITAL_STATUSES_LOADING]: (
    state: State,
    newValue: boolean
  ) => {
    state[States.isMaritalStatusesLoading] = newValue;
  },
};

export default mutations;
