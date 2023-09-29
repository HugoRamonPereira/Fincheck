import { sleep } from '../../utils/sleep';
import { httpClient } from '../HttpClient/httpClient';

export interface SigninProps {
  email: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
}

export async function signin(params : SigninProps) {
  await sleep();
  const { data } = await httpClient.post<SigninResponse>('/auth/signin', params);

  return data;
}