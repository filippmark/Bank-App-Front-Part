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
