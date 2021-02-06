import { Client } from "@/types/client";

export enum States {
  client = "client",
}

export interface State {
  client: Client;
}

export enum Mutations {
  UPDATE_CLIENT_FIELD = "UPDATE_CLIENT_FIELD",
}
