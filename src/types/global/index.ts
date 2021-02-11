import { AxiosRequestConfig } from "axios";

export type Nullable = undefined | null;

export interface AxiosResponse<T> {
  status?: number;
  data?: T;
  error?: any;
  config?: AxiosRequestConfig;
}
