import { RootState } from "@/store/types";
import { Module } from "vuex";
import { Client } from "@/types/client";
import { State, States } from "./types";
import mutations from "./mutations";
import actions from "./actions";

export const initialStateClient: Client = {
  name: "",
  surname: "",
  middleName: "",
  passportNumber: "",
  birthDate: "",
  sex: false,
  passportSeries: "",
  issuer: "",
  issueDate: "",
  passportId: "",
  placeOfBirth: "",
  livingAddress: "",
  mobilePhone: "",
  homePhone: "",
  email: "",
  placeOfWork: "",
  position: "",
  placeOfResidence: "",
  isPensioner: false,
  isLiableForMilitary: false,
  monthlyIncome: 0,
  citizenshipId: null,
  disabilityId: null,
  regTownId: null,
  actualTownId: null,
  maritalStatusId: null,
};

export const state: State = {
  [States.client]: initialStateClient,
  [States.clients]: [],
  [States.isClientLoading]: false,
};

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default module;
