import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/TransactionsService';
import { TransactionsFilters } from '../services/TransactionsService/getAll';

export function useTransactions(filters: TransactionsFilters) {
  const {
    data,
    isFetching,
    isInitialLoading,
    refetch
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters)
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    // Remamed refetch which belongs to useQuery to use refetchTransactions which is a more meaningful name, because it will be used to make new requests
    // when the filters, transactions change
    refetchTransactions: refetch
  };
}