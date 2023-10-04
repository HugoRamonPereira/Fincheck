import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/UsersService';
import toast from 'react-hot-toast';
import { LaunchScreen } from '../../view/components/LaunchScreen';

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

  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    // enabled is to trigger the request, so the request is gonna happen only if the user is signedin
    // we passed the value signedin which is a state, when it is true, then the request happens
    enabled: signedIn,
    staleTime: Infinity,
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

  // If there is an error in the first load of the page, this is why we used an useEffect
  // Then we use the function signout from the context to sign the user out because the token must have expired
  // If we manually edit the token in the local storage and if we try to do something, we will be logged out
  useEffect(() => {
    if (isError) {
      toast.error('Your session has expired!');
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider value={{
      // isSuccess comes from React-Query, so this indicates that we are only signedIn if the request is successful
      signedIn: isSuccess && signedIn,
      signin,
      signout
    }}>
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}