import { httpClient } from '../HttpClient/httpClient';

export interface UpdateBankAccountProps {
  id: string;
  name: string;
	initialBalance: number;
	color: string;
	type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export async function update({ id, ...params } : UpdateBankAccountProps) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

  return data;
}