import { useMutation } from 'react-query';
import fetcher from '../../../helpers/fetcher';
import { transformTokenIntoBearer } from '../../../helpers/getBearerToken';
import { type AxiosError } from 'axios';

interface RequestParams {
  token: string;
  taskId: number;
  baseId: number;
}

interface ResponseBody {
  base_id: number;
}

export const useAcceptTaskMutation = () =>
  useMutation<ResponseBody, AxiosError, RequestParams>(
    async ({ token, taskId, baseId }: RequestParams) =>
      await fetcher<ResponseBody>({
        method: 'POST',
        url: `/task/accept/${taskId}`,
        headers: {
          Authorization: transformTokenIntoBearer(token),
        },
        data: {
          base_id: baseId,
        },
      })
  );
