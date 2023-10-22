import { httpClient } from '../HttpClient/httpClient';

export interface UpdateTransactionProps {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
	type: 'INCOME' | 'EXPENSE';
}

export async function update({
  id,
  ...params
}: UpdateTransactionProps) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}