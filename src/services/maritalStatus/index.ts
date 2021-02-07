import { Option } from "@/types/client";
import axios from "axios";
import { AxiosResponse } from "@/types/global";
import { logError } from "@/utils/logger";
import { baseUrl } from "@/services";

export const fetchMaritalStatuses = async (): Promise<
  AxiosResponse<Option[]>
> => {
  try {
    return await axios.get(`${baseUrl}/marital-status`);
  } catch (error) {
    logError(error);
    return { error };
  }
};
