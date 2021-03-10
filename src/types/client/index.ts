import { Nullable } from "../global";

export interface Option {
  id: number;
  name: string;
}

export enum OptionalFields {
  MOBILE_PHONE = "mobilePhone",
  HOME_PHONE = "homePhone",
  EMAIL = "email",
  PLACE_OF_WORK = "placeOfWork",
  POSITION = "position",
}

export interface Client {
  id?: string;
  name: string;
  surname: string;
  middleName: string;
  passportNumber: string;
  birthDate: string;
  sex: boolean;
  passportSeries: string;
  issuer: string;
  issueDate: string;
  passportId: string;
  placeOfBirth: string;
  livingAddress: string;
  mobilePhone?: string;
  homePhone?: string;
  email?: string;
  placeOfWork?: string;
  position?: string;
  placeOfResidence: string;
  isPensioner: boolean;
  isLiableForMilitary: boolean;
  monthlyIncome?: number;
  citizenshipId: number | Nullable;
  disabilityId: number | Nullable;
  regTownId: number | Nullable;
  actualTownId: number | Nullable;
  maritalStatusId: number | Nullable;
  [key: string]: string | number | Nullable | boolean;
}

export interface Bill {
  id: number;
  account: string;
  debit: number;
  credit: number;
  balance: number;
  isActiveBill: boolean;
  clientId: string | null;
  isClosed: boolean;
}

export interface Deposit {
  id: number;
  isRevocable: boolean;
  percent: number;
  termInMs: number;
  minSum: number;
  currency: Option;
}

export interface ClientDeposit {
  id: number;
  client: Client;
  clientId: string;
  deposit: Deposit;
  depositId: number;
  startDate: string;
  startSum: number;
  isClosed: boolean;
  mainBill: Bill;
  percentBill: Bill;
}
