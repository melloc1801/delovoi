import { useMutation } from 'react-query';
import fetcher from '../../../helpers/fetcher';
import { transformTokenIntoBearer } from '../../../helpers/getBearerToken';
import { type AxiosError } from 'axios';
import { queryClient } from '../../../index';

export const useDismissMyTasksMutation = (token: string | null) =>
  useMutation<any, AxiosError, number>(
    async (id) =>
      await fetcher({
        method: 'POST',
        url: `/task/dismiss/${id}`,
        headers: {
          Authorization: transformTokenIntoBearer(token ?? ''),
        },
      }),
    {
      onSuccess: async () => await queryClient.invalidateQueries(['my_tasks']),
    }
  );
