import { fetchMaritalStatuses } from "@/services/maritalStatus";
import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { Actions, Mutations, State } from "./types";

const actions: ActionTree<State, RootState> = {
  [Actions.LOAD_MARITAL_STATUSES]: async ({ commit }) => {
    commit(Mutations.SET_MARITAL_STATUSES_LOADING, true);
    const response = await fetchMaritalStatuses();
    if (response.data) {
      commit(Mutations.SET_MARITAL_STATUSES, response.data);
    }
    commit(Mutations.SET_MARITAL_STATUSES_LOADING, false);
  },
};

export default actions;
