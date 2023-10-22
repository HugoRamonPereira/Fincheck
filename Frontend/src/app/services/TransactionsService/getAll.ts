import { httpClient } from '../HttpClient/httpClient';
import { Transaction } from '../../entities/Transaction';

type TransactionsResponse = Array<Transaction>

type TransactionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
}

export async function getAll(filters: TransactionsFilters) {
  const { data } = await httpClient.get<TransactionsResponse>('/transactions', {
    params: filters
  });

  return data;
}