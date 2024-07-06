import axios, { AxiosInstance, AxiosResponse } from "axios";

type IRes<DATA> = Promise<AxiosResponse<DATA>>;

const baseURL = import.meta.env.VITE_REACT_APP_API;
const apiService: AxiosInstance = axios.create({ baseURL });

export { apiService, baseURL };
export type { IRes };
