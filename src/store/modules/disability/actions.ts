import { fetchDisabilities } from "@/services/disability";
import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { Actions, Mutations, State } from "./types";

const actions: ActionTree<State, RootState> = {
  [Actions.LOAD_DISABILITIES]: async ({ commit }) => {
    commit(Mutations.SET_DISABILITIES_LOADING, true);
    const response = await fetchDisabilities();
    if (response.data) {
      commit(Mutations.SET_DISABILITIES, response.data);
    }
    commit(Mutations.SET_DISABILITIES_LOADING, false);
  },
};

export default actions;
