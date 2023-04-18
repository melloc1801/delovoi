import { createContext } from 'react';
import { type Profile } from '../model/Profile';

export const ProfileContext = createContext<Profile>({
  balance: 0,
  lastname: '',
  region: '',
  firstname: '',
  middlename: '',
  phone: '',
  status: '',
  isStatusVerified: false,
});

export const ProfileContextProvider = ProfileContext.Provider;
