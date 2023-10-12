import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const { valuesVisible } = useDashboard();

  return {
    valuesVisible,
    isInitialLoading: false,
    isTransactionsLoading: false,
    transactions: [{}]
  };
}