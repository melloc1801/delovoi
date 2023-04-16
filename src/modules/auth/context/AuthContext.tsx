import React from 'react';

interface ContextState {
  auth: boolean;
  token: string | null;
  setAuth: (isAuth: boolean) => void;
  setToken: (token: string) => void;
}

export const AuthContext = React.createContext<ContextState>({
  auth: false,
  token: null,
  setAuth: () => {},
  setToken: () => {},
});

export const AuthContextProvider = AuthContext.Provider;
