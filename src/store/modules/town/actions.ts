import { fetchTowns } from "@/services/town";
import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { Actions, Mutations, State } from "./types";

const actions: ActionTree<State, RootState> = {
  [Actions.LOAD_TOWNS]: async ({ commit }) => {
    commit(Mutations.SET_TOWNS_LOADING, true);
    const response = await fetchTowns();
    if (response.data) {
      commit(Mutations.SET_TOWNS, response.data);
    }
    commit(Mutations.SET_TOWNS_LOADING, false);
  },
};

export default actions;
