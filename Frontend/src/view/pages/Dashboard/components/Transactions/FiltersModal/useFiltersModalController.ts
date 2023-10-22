import { useState } from 'react';
import { useBankAccounts } from '../../../../../../app/hooks/useBankAccounts';

export function useFiltersModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<undefined | string>(undefined);
  // The value passed in the state is the current year the user is in the moment of the selection of the year
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { accounts } = useBankAccounts();

  function handleSelectBankAccountId(bankAccountId: string) {
    setSelectedBankAccountId(prevState => prevState === bankAccountId ? undefined : bankAccountId);
  }

  // This function is generic it can increase or decrease the value, this is why we added the parameter called step
  // In the modal we have the year surrounded by a button to increase and also decrease a year
  // so we added a parameter called step so that we can add -1 to the button to increase a year by 1
  // Even though we have + step in the function but +-1 will diminish + with - equals minus so it will subtract
  function handleChangeYear(step: number) {
    setSelectedYear(prevState => prevState + step);
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccountId,
    selectedYear,
    handleChangeYear,
    accounts
  };
}