import { Option } from "@/types/client";

export enum Actions {
  LOAD_TOWNS = "LOAD_TOWNS",
}

export enum Mutations {
  SET_TOWNS = "SET_TOWNS",
  SET_TOWNS_LOADING = "SET_TOWNS_LOADING",
}

export interface State {
  towns: Option[];
  isTownLoading: boolean;
}

export enum States {
  towns = "towns",
  isTownLoading = "isTownLoading",
}
