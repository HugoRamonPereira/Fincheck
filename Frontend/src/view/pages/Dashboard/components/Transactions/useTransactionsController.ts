import { useState } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useTransactions } from '../../../../../app/hooks/useTransactions';

export function useTransactionsController() {
  const { valuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const { transactions } = useTransactions();

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    valuesVisible,
    isInitialLoading: false,
    isTransactionsLoading: false,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal
  };
}