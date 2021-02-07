import {
  createClient,
  fetchClient,
  fetchClients,
  updateClient,
} from "@/services/client";
import { RootState } from "@/store/types";
import { Client } from "@/types/client";
import { ActionTree } from "vuex";
import { Actions, Mutations, State } from "./types";

const actions: ActionTree<State, RootState> = {
  [Actions.CREATE_CLIENT]: async ({ commit }, client: Client) => {
    commit(Mutations.UPDATE_CLIENT_LOADING, true);
    const response = await createClient(client);
    if (response.data) {
      commit(Mutations.SET_CLIENT, response.data);
    }
    commit(Mutations.UPDATE_CLIENT_LOADING, false);
  },
  [Actions.LOAD_CLIENT_DATA]: async ({ commit }, id: string) => {
    commit(Mutations.UPDATE_CLIENT_LOADING, true);
    const response = await fetchClient(id);
    if (response.data) {
      commit(Mutations.SET_CLIENT, response.data);
    }
    commit(Mutations.UPDATE_CLIENT_LOADING, false);
  },
  [Actions.CREATE_CLIENT]: async (
    { commit },
    { id, client }: { id: string; client: Client }
  ) => {
    commit(Mutations.UPDATE_CLIENT_LOADING, true);
    const response = await updateClient({ id, client });
    if (response.data) {
      commit(Mutations.SET_CLIENT, response.data);
    }
    commit(Mutations.UPDATE_CLIENT_LOADING, false);
  },
  [Actions.LOAD_CLIENTS]: async ({ commit }) => {
    commit(Mutations.UPDATE_CLIENT_LOADING, true);
    const response = await fetchClients();
    if (response.data) {
      commit(Mutations.SET_CLIENTS, response.data);
    }
    commit(Mutations.UPDATE_CLIENT_LOADING, false);
  },
};

export default actions;
