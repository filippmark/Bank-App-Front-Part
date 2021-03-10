import { ClientCredit } from "@/types/client";
import axios from "axios";
import { AxiosResponse } from "@/types/global";
import { logError } from "@/utils/logger";
import { baseUrl } from "@/services";

export const fetchClientCredits = async (): Promise<
  AxiosResponse<ClientCredit[]>
> => {
  try {
    return await axios.get(`${baseUrl}/client-credit`);
  } catch (error) {
    logError(error);
    return { error };
  }
};

export const createClientCredit = async (createClientCreditBody: {
  clientId: string;
  creditId: number;
  creditSum: number;
}): Promise<AxiosResponse<any>> => {
  try {
    return await axios.post(`${baseUrl}/client-credit/`, {
      ...createClientCreditBody,
    });
  } catch (error) {
    logError(error);
    return error;
  }
};

export const fetchClientCredit = async (
  id: number
): Promise<AxiosResponse<ClientCredit>> => {
  try {
    return await axios.get(`${baseUrl}/client-credit/${id}`);
  } catch (error) {
    logError(error);
    return { error };
  }
};
