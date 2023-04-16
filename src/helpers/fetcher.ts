import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'https://api.delovoi.me/api/',
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Api-Front-Token': 'X5uIpEV++InuNxjjx0rESRmA',
  },
});

export default async function fetcher<JSON = unknown>(
  input: AxiosRequestConfig
): Promise<JSON> {
  return await instance(input).then(
    (response: AxiosResponse<JSON>) => response.data
  );
}
