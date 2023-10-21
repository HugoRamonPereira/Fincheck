import { httpClient } from '../HttpClient/httpClient';

export interface CreateBankAccountProps {
  name: string;
	initialBalance: number;
	color: string;
	type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export async function create(params : CreateBankAccountProps) {
  const { data } = await httpClient.post('/bank-accounts', params);

  return data;
}