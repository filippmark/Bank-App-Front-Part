import { Client } from "@/types/client";

export enum States {
  client = "client",
  clients = "clients",
  isClientLoading = "isClientLoading",
}

export interface State {
  client: Client;
  clients: Client[];
  isClientLoading: boolean;
}

export enum Mutations {
  UPDATE_CLIENT_FIELD = "UPDATE_CLIENT_FIELD",
  SET_CLIENT = "SET_CLIENT",
  SET_CLIENTS = "SET_CLIENTS",
  UPDATE_CLIENT_LOADING = "UPDATE_CLIENT_LOADING",
}

export enum Actions {
  LOAD_CLIENT_DATA = "LOAD_CLIENT_DATA",
  CREATE_CLIENT = "CREATE_CLIENT",
  UPDATE_CLIENT = "UPDATE_CLIENT",
  LOAD_CLIENTS = "LOAD_CLIENTS",
  DELETE_CLIENT = "DELETE_CLIENT",
}
