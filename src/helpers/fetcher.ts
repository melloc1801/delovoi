import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { appConfig } from '../app-config';

const instance = axios.create({
  baseURL: 'https://api.delovoi.me/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Api-Front-Token': appConfig.apiKey,
  },
});

export default async function fetcher<JSON = unknown>(
  input: AxiosRequestConfig
): Promise<JSON> {
  return await instance(input).then(
    (response: AxiosResponse<JSON>) => response.data
  );
}
