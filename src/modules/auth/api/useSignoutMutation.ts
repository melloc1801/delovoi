import { useMutation } from 'react-query';
import fetcher from '../../../helpers/fetcher';
import { type AxiosError } from 'axios';
import { transformTokenIntoBearer } from '../../../helpers/getBearerToken';

export const useSignoutMutation = () =>
  useMutation<any, AxiosError, string>(
    async (token: string) =>
      await fetcher({
        url: '/logout',
        method: 'POST',
        headers: { Authorization: transformTokenIntoBearer(token) },
      })
  );
