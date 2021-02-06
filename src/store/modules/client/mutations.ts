import { Client } from "@/types/client";
import { Nullable } from "@/types/global";
import { MutationTree } from "vuex";
import { Mutations, State, States } from "./types";

const mutations: MutationTree<State> = {
  [Mutations.UPDATE_CLIENT_FIELD]: (
    state: State,
    newValue: { field: string; value: string | number | boolean | Nullable }
  ) => {
    const { field, value } = newValue;
    state[States.client][field] = value;
  },
  [Mutations.CLEAR_CLIENT]: (state: State, clearClient: Client) => {
    state[States.client] = clearClient;
  },
};

export default mutations;