import { Client } from "@/types/client";

export enum States {
  client = "client",
}

export interface State {
  client: Client;
}
