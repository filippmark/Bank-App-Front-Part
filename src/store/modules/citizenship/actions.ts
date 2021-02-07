import { fetchCitizenships } from "@/services/citizenship";
import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { Actions, Mutations, State } from "./types";

const actions: ActionTree<State, RootState> = {
  [Actions.LOAD_CITIZENSHIPS]: async ({ commit }) => {
    commit(Mutations.SET_CITIZENSHIP_LOADING, true);
    const response = await fetchCitizenships();
    if (response.data) {
      commit(Mutations.SET_CITIZENSHIPS, response.data);
    }
    commit(Mutations.SET_CITIZENSHIP_LOADING, false);
  },
};

export default actions;
