import fetcher from '../../../helpers/fetcher';
import { useMutation } from 'react-query';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { type AxiosError } from 'axios';
import { type NavigateFunction } from 'react-router-dom';
import { type User } from '../models/User';

interface RequestBody {
  lastname: string;
  firstname: string;
  middlename: string;
  city: string;
  phone: string;
}

interface ResponseBody {
  status: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export const useSignupMutation = (navigate: NavigateFunction) =>
  useMutation<ResponseBody, AxiosError, RequestBody>(
    async (data: RequestBody) =>
      await fetcher<ResponseBody>({ method: 'POST', url: '/register', data }),
    {
      onSuccess(response) {
        const { setAuthToken } = useLocalStorage();
        setAuthToken(response.data.token);
        navigate('/');
      },
    }
  );
