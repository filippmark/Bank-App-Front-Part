import {
  createClient,
  deleteClient,
  fetchClient,
  fetchClients,
  updateClient,
} from "@/services/client";
import { Modules, RootState } from "@/store/types";
import { Client } from "@/types/client";
import { ActionTree } from "vuex";
import { Mutations as ErrorMutations } from "@/store/modules/error/types";
import { Actions, Mutations, State } from "./types";

const actions: ActionTree<State, RootState> = {
  [Actions.CREATE_CLIENT]: async ({ commit }, client: Client) => {
    let isErrorHappened = false;
    commit(Mutations.UPDATE_CLIENT_LOADING, true);
    const response = await createClient(client);
    if (response.data) {
      commit(Mutations.SET_CLIENT, response.data);
    } else if (response.error) {
      commit(
        `${Modules.ERROR_SNAPBACK}/${ErrorMutations.UPDATE_ERROR_MESSAGE}`,
        response.error.response.data.message,
        { root: true }
      );
      isErrorHappened = true;
    }
    commit(Mutations.UPDATE_CLIENT_LOADING, false);
    return isErrorHappened;
  },
  [Actions.UPDATE_CLIENT]: async (
    { commit },
    { id, client }: { id: string; client: Client }
  ) => {
    let isErrorHappened = false;
    commit(Mutations.UPDATE_CLIENT_LOADING, true);
    const response = await updateClient({ id, client });
    if (response.data) {
      commit(Mutations.SET_CLIENT, response.data);
    } else if (response.error) {
      commit(
        `${Modules.ERROR_SNAPBACK}/${ErrorMutations.UPDATE_ERROR_MESSAGE}`,
        response.error.response.data.message,
        { root: true }
      );
      isErrorHappened = true;
    }
    commit(Mutations.UPDATE_CLIENT_LOADING, false);
    return isErrorHappened;
  },
  [Actions.LOAD_CLIENT_DATA]: async ({ commit }, id: string) => {
    commit(Mutations.UPDATE_CLIENT_LOADING, true);
    const response = await fetchClient(id);
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
  [Actions.DELETE_CLIENT]: async ({ commit }, id: string) => {
    commit(Mutations.UPDATE_CLIENT_LOADING, true);
    await deleteClient(id);
    commit(Mutations.UPDATE_CLIENT_LOADING, false);
  },
};

export default actions;
