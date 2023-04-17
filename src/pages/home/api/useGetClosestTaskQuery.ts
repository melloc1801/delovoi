import { useQuery } from 'react-query';
import fetcher from '../../../helpers/fetcher';
import { type MyTask } from '../../../modules/tasks';
import { transformTokenIntoBearer } from '../../../helpers/getBearerToken';

export const useGetClosestTaskQuery = (token: string) =>
  useQuery<MyTask[]>(
    'closes_task',
    async () =>
      await fetcher<MyTask[]>({
        method: 'POST',
        url: '/task/main',
        headers: {
          Authorization: transformTokenIntoBearer(token),
        },
      })
  );
