import axios, {
  type CreateAxiosDefaults,
  type AxiosRequestConfig,
} from 'axios';
import { API_URL } from '../../configs';

const axiosParams: CreateAxiosDefaults = {
  baseURL: API_URL,
};

const axiosInstance = axios.create(axiosParams);

export const api = {
  get: <T>(url: string, config: AxiosRequestConfig = {}) =>
    axiosInstance.get<T>(url, config),
};
