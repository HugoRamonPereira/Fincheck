import { sleep } from '../../app/utils/sleep';
import { httpClient } from './../HttpClient/httpClient';

export interface SignupProps {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
}

export async function signup(params : SignupProps) {
  await sleep();
  const { data } = await httpClient.post<SignupResponse>('/auth/signup', params);

  return data;
}