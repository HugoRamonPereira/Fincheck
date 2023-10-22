import { httpClient } from '../HttpClient/httpClient';

export interface CreateTransactionProps {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
	type: 'INCOME' | 'EXPENSE';
}

export async function create(params: CreateTransactionProps) {
  const { data } = await httpClient.post('/transactions', params);

  return data;

}