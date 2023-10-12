import { ReactNode, createContext, useCallback, useState } from 'react';

interface DashboardContextProps {
  valuesVisible: boolean;
  toggleValuesVisibility(): void;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [valuesVisible, setValuesVisible] = useState(true);

  const toggleValuesVisibility = useCallback(() => {
    setValuesVisible(prevState => !prevState);
  }, []);

  return (
    <DashboardContext.Provider value={{ valuesVisible, toggleValuesVisibility }}>
      {children}
    </DashboardContext.Provider>
  );
}