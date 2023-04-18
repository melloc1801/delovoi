import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { appConfig } from '../app-config';
import { useLocalStorage } from '../hooks/useLocalStorage';

const instance = axios.create({
  baseURL: 'https://api.delovoi.me/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Api-Front-Token': appConfig.apiKey,
  },
});

const ls = useLocalStorage();
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          ls.removeToken();
          location.reload();
        }
      }
    }
    throw error;
  }
);

export default async function fetcher<JSON = unknown>(
  input: AxiosRequestConfig
): Promise<JSON> {
  return await instance(input).then(
    (response: AxiosResponse<JSON>) => response.data
  );
}
