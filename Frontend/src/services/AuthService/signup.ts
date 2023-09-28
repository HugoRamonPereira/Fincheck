import { httpClient } from './../HttpClient/httpClient';

interface SignupProps {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
}

export async function signup(params : SignupProps) {
  const { data } = await httpClient.post<SignupResponse>('/auth/signup', params);

  return data;
}