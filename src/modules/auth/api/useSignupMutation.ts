import fetcher from '../../../helpers/fetcher';
import { useMutation } from 'react-query';
import { type AxiosError } from 'axios';
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

export const useSignupMutation = () =>
  useMutation<ResponseBody, AxiosError, RequestBody>(
    async (data: RequestBody) =>
      await fetcher<ResponseBody>({ method: 'POST', url: '/register', data })
  );
