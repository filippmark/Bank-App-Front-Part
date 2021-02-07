import { Client } from "@/types/client";
import axios from "axios";
import { AxiosResponse } from "@/types/global";
import { logError } from "@/utils/logger";
import { baseUrl } from "@/services";

export const fetchCitizenships = async (): Promise<AxiosResponse<Client[]>> => {
  try {
    return await axios.get(`${baseUrl}/client`);
  } catch (error) {
    logError(error);
    return { error };
  }
};
