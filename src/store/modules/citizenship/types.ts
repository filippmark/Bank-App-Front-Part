import { Option } from "@/types/client";

export enum Actions {
  LOAD_CITIZENSHIPS = "LOAD_CITIZENSHIPS",
}

export enum Mutations {
  SET_CITIZENSHIPS = "SET_CITIZENSHIPS",
  SET_CITIZENSHIP_LOADING = "SET_CITIZENSHIP_LOADING",
}

export interface State {
  citizenships: Option[];
  isCitizenshipsLoading: boolean;
}

export enum States {
  citizenships = "citizenships",
  isCitizenshipsLoading = "isCitizenshipsLoading",
}
