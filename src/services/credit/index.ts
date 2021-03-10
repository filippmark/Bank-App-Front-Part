import { Credit } from "@/types/client";
import axios from "axios";
import { AxiosResponse } from "@/types/global";
import { logError } from "@/utils/logger";
import { baseUrl } from "@/services";

export const fetchCredits = async (): Promise<AxiosResponse<Credit[]>> => {
  try {
    return await axios.get(`${baseUrl}/credit`);
  } catch (error) {
    logError(error);
    return { error };
  }
};

export const fetchCreditById = async (
  id: number
): Promise<AxiosResponse<Credit>> => {
  try {
    return await axios.get(`${baseUrl}/credit/${id}`);
  } catch (error) {
    logError(error);
    return { error };
  }
};
