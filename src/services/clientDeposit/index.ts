import { ClientDeposit } from "@/types/client";
import axios from "axios";
import { AxiosResponse } from "@/types/global";
import { logError } from "@/utils/logger";
import { baseUrl } from "@/services";

export const fetchClientDeposits = async (): Promise<
  AxiosResponse<ClientDeposit[]>
> => {
  try {
    return await axios.get(`${baseUrl}/client-deposit`);
  } catch (error) {
    logError(error);
    return { error };
  }
};

export const createClientDeposit = async (createClientDepositBody: {
  clientId: string;
  depositId: number;
  startSum: number;
  withCapitalization: boolean;
}): Promise<AxiosResponse<any>> => {
  try {
    return await axios.post(`${baseUrl}/client-deposit/`, {
      ...createClientDepositBody,
    });
  } catch (error) {
    logError(error);
    return error;
  }
};

export const fetchClientDeposit = async (
  id: number
): Promise<AxiosResponse<ClientDeposit>> => {
  try {
    return await axios.get(`${baseUrl}/client-deposit/${id}`);
  } catch (error) {
    logError(error);
    return { error };
  }
};

export const closeClientDeposit = async (
  id: number
): Promise<AxiosResponse<any>> => {
  try {
    return await axios.patch(
      `${baseUrl}/client-deposit/closeClientDeposit/${id}`
    );
  } catch (error) {
    logError(error);
    return { error };
  }
};

export const getPercentsClientDeposit = async (
  id: number
): Promise<AxiosResponse<any>> => {
  try {
    return await axios.patch(
      `${baseUrl}/client-deposit/getMoneyFromPercentBill/${id}`
    );
  } catch (error) {
    logError(error);
    return { error };
  }
};

export const closeBankDayDeposits = async (): Promise<AxiosResponse<any>> => {
  try {
    return await axios.patch(`${baseUrl}/client-deposit/closeBankDay`);
  } catch (error) {
    logError(error);
    return { error };
  }
};

export const closeBankMonthDeposits = async (): Promise<AxiosResponse<any>> => {
  try {
    return await axios.patch(`${baseUrl}/client-deposit/closeBankMonth`);
  } catch (error) {
    logError(error);
    return { error };
  }
};
