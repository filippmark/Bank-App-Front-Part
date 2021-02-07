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
  [Mutations.SET_CLIENT]: (state: State, clearClient: Client) => {
    state[States.client] = clearClient;
  },
  [Mutations.SET_CLIENTS]: (state: State, clients: []) => {
    state[States.clients] = clients;
  },
  [Mutations.UPDATE_CLIENT_LOADING]: (state: State, loading: boolean) => {
    state[States.isClientLoading] = loading;
  },
};

export default mutations;
