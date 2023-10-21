import { useMemo, useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useQuery } from '@tanstack/react-query';
import { BankAccountsService } from '../../../../../app/services/bankAccountsService';

export function useAccountsController() {
  const windowWidth  = useWindowWidth();
  const {
    valuesVisible,
    toggleValuesVisibility,
    openNewAccountModal
  } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: BankAccountsService.getAll
  });

  const currentBalance = useMemo(() => {
    if (!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0);
  }, [data]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    valuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: data ?? [],
    openNewAccountModal,
    currentBalance
  };
}

// the variable windowWidth is not destructured we named it like this
// it could have any other name, but since we are interested in watching
// the width of the window and it is being stored in a hook that resides
// in the hooks createRoutesFromChildren, we are just using this hook here
// and passing it along to be used in the useAccountsController,
// and wherever we use it we will have the width of the windows stored in this
// value so that we can use the necessary Tailwind classes to manipulate the responsiveness