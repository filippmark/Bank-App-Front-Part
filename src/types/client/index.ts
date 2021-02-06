import { Nullable } from "../global";

export interface Option {
    id: number;
    name: string;
}

export interface Client {
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
    mobilePhone: string;
    homePhone: string;
    email: string;
    placeOfWork: string;
    position: string;
    placeOfResidence: string;
    isPensioner: boolean;
    isLiableForMilitary: boolean;
    monthlyIncome: number;
    citizenship: number | Nullable;
    disability: number | Nullable;
    regTown: number | Nullable;
    actualTown: number | Nullable;
}