import { useInfiniteQuery } from 'react-query';
import { type AxiosError } from 'axios/index';
import fetcher from '../../../helpers/fetcher';
import { transformTokenIntoBearer } from '../../../helpers/getBearerToken';
import { type MyTask } from '../model/MyTask';

interface ResponseBody {
  data: MyTask[];
  last_page: number;
  total: number;
  to: number;
  per_page: number;
  current_page: number;
}

export const useGetMyTasksQuery = (token: string | null) =>
  useInfiniteQuery<any, AxiosError, ResponseBody>(
    ['my_tasks'],
    async ({ pageParam = 1 }) =>
      await fetcher<ResponseBody>({
        url: `/task/my?page=${pageParam}`,
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
