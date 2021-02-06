import { Option } from "@/types/client";
import axios from "axios";
import { AxiosResponse } from "@/types/global";
import { logError } from "@/utils/logger";
import { baseUrl } from "@/services";

export const fetchCitizenships = async (): Promise<AxiosResponse<Option[]>> => {
  try {
    return await axios.get(`${baseUrl}/town`);
  } catch (error) {
    logError(error);
    return { error };
  }
};
