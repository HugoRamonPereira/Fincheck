import { httpClient } from '../HttpClient/httpClient';
import { BankAccount } from '../../entities/BankAccount';

type BankAccountsResponse = Array<BankAccount>

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts');

  return data;
}