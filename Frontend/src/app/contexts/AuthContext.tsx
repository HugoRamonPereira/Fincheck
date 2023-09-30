import { ReactNode, createContext, useCallback, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    //Double !! will turn the value into a boolean, another solution would be Boolean(storedAccessToken)
    return !!storedAccessToken;
  });

  // Function to signin and store the token in localStorage
  const signin = useCallback((accessToken: string) => {
    // This is where we set the accessToken to Localstorage
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  // Function to signout and remove token from localStorage
  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}