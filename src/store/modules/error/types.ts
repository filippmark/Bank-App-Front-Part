export enum Mutations {
  UPDATE_ERROR_MESSAGE = "UPDATE_ERROR_MESSAGE",
  UPDATE_SHOW_ERROR = "UPDATE_SHOW_ERROR",
}

export interface State {
  errorMessage: string;
  showError: boolean;
}

export enum States {
  errorMessage = "errorMessage",
  showError = "showError",
}
