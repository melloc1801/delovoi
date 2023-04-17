import { createContext } from 'react';
import { type Profile } from '../model/Profile';

export const ProfileContext = createContext<Profile>({
  balance: 0,
  lastname: '',
  city: '',
  firstname: '',
  middlename: '',
  phone: '',
  status: '',
});

export const ProfileContextProvider = ProfileContext.Provider;
