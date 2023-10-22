import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/TransactionsService';

export function useTransactions() {
  const { data } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll({
      month: 9,
      year: 2023
    })
  });

  return {
    transactions: data ?? []
  };
}