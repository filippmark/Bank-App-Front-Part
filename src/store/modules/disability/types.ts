import { Option } from "@/types/client";

export enum Actions {
  LOAD_DISABILITIES = "LOAD_DISABILITIES",
}

export enum Mutations {
  SET_DISABILITIES = "SET_DISABILITIES",
  SET_DISABILITIES_LOADING = "SET_DISABILITIES_LOADING",
}

export interface State {
  disabilities: Option[];
  isDisabilitiesLoading: boolean;
}

export enum States {
  disabilities = "disabilities",
  isDisabilitiesLoading = "isDisabilitiesLoading",
}
