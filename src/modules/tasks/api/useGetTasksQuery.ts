import { useInfiniteQuery } from 'react-query';
import fetcher from '../../../helpers/fetcher';
import { type AxiosError } from 'axios';
import { transformTokenIntoBearer } from '../../../helpers/getBearerToken';
import { type Task } from '../model/Task';

interface ResponseBody {
  data: Task[];
  last_page: number;
  total: number;
  to: number;
  per_page: number;
  current_page: number;
}

export const useGetTasksQuery = (token: string | null) =>
  useInfiniteQuery<any, AxiosError, ResponseBody>(
    ['tasks'],
    async ({ pageParam = 1 }) =>
      await fetcher<ResponseBody>({
        url: `/task/search?page=${pageParam}`,
        method: 'POST',
        headers: {
          Authorization: transformTokenIntoBearer(token ?? ''),
        },
      }),
    {
      enabled: Boolean(token),
      getNextPageParam: (firstPage: ResponseBody) =>
        (firstPage.current_page + 1) * firstPage.per_page <= firstPage.total
          ? firstPage.current_page + 1
          : null,
    }
  );
