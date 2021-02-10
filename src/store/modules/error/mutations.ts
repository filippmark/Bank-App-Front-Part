import { MutationTree } from "vuex";
import { Mutations, State, States } from "./types";

const mutations: MutationTree<State> = {
  [Mutations.UPDATE_ERROR_MESSAGE]: (state: State, errorMessage: string) => {
    state[States.errorMessage] = errorMessage;
    state[States.showError] = true;
  },
  [Mutations.UPDATE_SHOW_ERROR]: (state: State, showError: boolean) => {
    state[States.showError] = showError;
  },
};

export default mutations;
