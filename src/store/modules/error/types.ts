export enum Mutations {
  UPDATE_ERROR_MESSAGE = "UPDATE_ERROR_MESSAGE",
  UPDATE_SHOW_ERROR = "UPDATE_SHOW_ERROR",
}

export interface State {
  errorMessages: string[];
  showError: boolean;
}

export enum States {
  errorMessages = "errorMessages",
  showError = "showError",
}
