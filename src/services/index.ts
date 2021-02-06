import { AxiosRequestConfig } from "axios";

export const baseUrl = "http://localhost:3000/";

export interface AxiosResponse<T> {
  status?: number;
  data?: T;
  error?: unknown;
  config?: AxiosRequestConfig;
}
