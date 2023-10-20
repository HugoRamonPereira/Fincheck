import { httpClient } from '../HttpClient/httpClient';

export interface BankAccountProps {
  name: string;
	initialBalance: number;
	color: string;
	type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export async function create(params : BankAccountProps) {
  const { data } = await httpClient.post('/bank-accounts', params);

  return data;
}