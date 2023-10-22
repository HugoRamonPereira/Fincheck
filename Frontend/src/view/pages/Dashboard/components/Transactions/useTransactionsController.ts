import { useEffect, useState } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { TransactionsFilters } from '../../../../../app/services/TransactionsService/getAll';

export function useTransactionsController() {
  const { valuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { transactions, isLoading, isInitialLoading, refetchTransactions } = useTransactions(filters);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  // Every time a transaction change be it by clicking in the swiper arrows or be it by selecting a month clicking on it
  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  // Used a currying function that will return another function inside of it
  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      // Added this conditional because if the filter is the same we just stop the function execution by using return
      if(value === filters[filter]) return;
      // Otherwise we will set the filters to the new value and spread the old value with prevstate
      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }));
    };
  }

  function handleApplyFilters({
    bankAccountId, year
  }: { bankAccountId: string | undefined; year: number; }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    setIsFiltersModalOpen(false);
  }

  return {
    valuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters
  };
}