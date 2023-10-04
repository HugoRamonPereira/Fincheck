import axios from 'axios';
import { localStorageKeys } from '../../config/localStorageKeys';
import { sleep } from '../../utils/sleep';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// This interceptor is to be used before the api request is triggered
// In attempts to see if there is an accessToken in the localstorage
// In case the accessToken is found then we add the accessToken to the headers of the request being made
httpClient.interceptors.request.use(async config => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// This is only to force a delay so that we can see the loading spinner component
httpClient.interceptors.response.use(async data => {
  await sleep(500);

  return data;
});