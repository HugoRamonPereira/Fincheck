import { useState } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const { valuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

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
    transactions: [{}],
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal
  };
}