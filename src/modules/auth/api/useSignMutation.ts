import { useMutation } from 'react-query';
import fetcher from '../../../helpers/fetcher';
import { type User } from '../models/User';
import { type AxiosError } from 'axios';

interface RequestBody {
  phone: string;
  verify_code: string;
}

interface ResponseBody {
  data: { user: User; token: string };
}

export const useSignMutation = () =>
  useMutation<ResponseBody, AxiosError, RequestBody>(
    async (body: RequestBody) =>
      await fetcher<ResponseBody>({ method: 'POST', url: '/login', data: body })
  );
