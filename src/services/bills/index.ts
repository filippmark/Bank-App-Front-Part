import { Bill } from "@/types/client";
import axios from "axios";
import { AxiosResponse } from "@/types/global";
import { logError } from "@/utils/logger";
import { baseUrl } from "@/services";

export const fetchBills = async (): Promise<AxiosResponse<Bill[]>> => {
  try {
    return await axios.get(`${baseUrl}/bill`);
  } catch (error) {
    logError(error);
    return { error };
  }
};
