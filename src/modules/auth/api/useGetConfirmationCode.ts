import fetcher from '../../../helpers/fetcher';
import { useMutation } from 'react-query';
import { type AxiosError } from 'axios';

interface RequestBody {
  phone: string;
}

interface ResponseBody {
  result: {
    id: string;
    code: string;
  };
  success: boolean;
}

export const useGetConfirmationCode = () =>
  useMutation<ResponseBody, AxiosError, RequestBody>(
    async (body: RequestBody) =>
      await fetcher<ResponseBody>({
        method: 'POST',
        url: '/verifyphone',
        data: body,
      }),
    {}
  );
