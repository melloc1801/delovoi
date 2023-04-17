import { useInfiniteQuery } from 'react-query';
import fetcher from '../../../helpers/fetcher';
import { type AxiosError } from 'axios';
import { transformTokenIntoBearer } from '../../../helpers/getBearerToken';
import { type Task } from '../model/Task';
import moment from 'moment/moment';
import { type Col } from '../../../pages/searchTasks/components/SortBar';

interface ResponseBody {
  data: Task[];
  last_page: number;
  total: number;
  to: number;
  per_page: number;
  current_page: number;
}

interface RequestBody {
  order_date_start: string;
  order_date_end: string;
  vacancy: string;
  sort: string;
  order: string;
}

export const useGetTasksQuery = (
  token: string | null,
  date?: [Date, Date],
  vacancy?: string,
  sort?: Col
) =>
  useInfiniteQuery<any, AxiosError, ResponseBody>(
    ['tasks'],
    async ({ pageParam = 1 }) =>
      await fetcher<ResponseBody>({
        url: `/task/search?page=${pageParam}`,
        method: 'POST',
        headers: {
          Authorization: transformTokenIntoBearer(token ?? ''),
        },
        data: {
          vacancy: vacancy ?? undefined,
          order_date_start: date
            ? moment(date[0]).format('YYYY-MM-DD')
            : undefined,
          order_date_end: date
            ? moment(date[1]).format('YYYY-MM-DD')
            : undefined,
          sort: sort?.key ?? undefined,
          order: sort?.order ?? undefined,
        } as RequestBody,
      }),
    {
      enabled: Boolean(token),
      getNextPageParam: (firstPage: ResponseBody) =>
        (firstPage.current_page + 1) * firstPage.per_page <= firstPage.total
          ? firstPage.current_page + 1
          : null,
      keepPreviousData: false,
    }
  );
