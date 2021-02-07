import { Client } from "@/types/client";
import axios from "axios";
import { AxiosResponse } from "@/types/global";
import { logError } from "@/utils/logger";
import { baseUrl } from "@/services";

export const fetchClient = async (
  id: string
): Promise<AxiosResponse<Client>> => {
  try {
    return await axios.get(`${baseUrl}/client/${id}`);
  } catch (error) {
    logError(error);
    return { error };
  }
};

export const fetchClients = async (): Promise<AxiosResponse<Client[]>> => {
  try {
    return await axios.get(`${baseUrl}/client`);
  } catch (error) {
    logError(error);
    return { error };
  }
};

export const createClient = async (
  client: Client
): Promise<AxiosResponse<Client>> => {
  try {
    return await axios.post(`${baseUrl}/client`, {
      ...client,
    });
  } catch (error) {
    logError(error);
    return { error };
  }
};

export const updateClient = async ({
  id,
  client,
}: {
  id: string;
  client: Client;
}): Promise<AxiosResponse<Client>> => {
  try {
    return await axios.post(`${baseUrl}/client/${id}`, {
      ...client,
    });
  } catch (error) {
    logError(error);
    return { error };
  }
};
