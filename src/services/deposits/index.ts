import { Deposit } from "@/types/client";
import axios from "axios";
import { AxiosResponse } from "@/types/global";
import { logError } from "@/utils/logger";
import { baseUrl } from "@/services";

export const fetchDeposits = async (): Promise<AxiosResponse<Deposit[]>> => {
  try {
    return await axios.get(`${baseUrl}/deposit`);
  } catch (error) {
    logError(error);
    return { error };
  }
};
