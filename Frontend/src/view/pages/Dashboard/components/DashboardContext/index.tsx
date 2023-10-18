import {
  ReactNode,
  createContext,
  useCallback,
  useState
} from 'react';

interface DashboardContextProps {
  valuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  toggleValuesVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [valuesVisible, setValuesVisible] = useState(true);
  const [isNewAccountModalOpen, SetIsNewAccountModalOpen] = useState(false);

  const toggleValuesVisibility = useCallback(() => {
    setValuesVisible(prevState => !prevState);
  }, []);

  const openNewAccountModal = useCallback(() => {
    SetIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    SetIsNewAccountModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        valuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
