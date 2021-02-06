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
  citizenship: null,
  disability: null,
  regTown: null,
  actualTown: null,
};

export const state: State = {
  [States.client]: initialStateClient,
};

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default module;
