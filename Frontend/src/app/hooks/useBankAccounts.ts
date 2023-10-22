import { useQuery } from '@tanstack/react-query';
import { BankAccountsService } from '../services/bankAccountsService';

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: BankAccountsService.getAll
  });

  // Every time this hook is called it will return accounts being an array of bank accounts or an empty array
  return { accounts: data ?? [] , isFetching };
}