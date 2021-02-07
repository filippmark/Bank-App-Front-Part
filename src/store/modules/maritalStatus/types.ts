import { Option } from "@/types/client";

export enum Actions {
  LOAD_MARITAL_STATUSES = "LOAD_MARITAL_STATUSES",
}

export enum Mutations {
  SET_MARITAL_STATUSES = "SET_MARITAL_STATUSES",
  SET_MARITAL_STATUSES_LOADING = "SET_MARITAL_STATUSES_LOADING",
}

export interface State {
  maritalStatuses: Option[];
  isMaritalStatusesLoading: boolean;
}

export enum States {
  maritalStatuses = "maritalStatuses",
  isMaritalStatusesLoading = "isMaritalStatusesLoading",
}
