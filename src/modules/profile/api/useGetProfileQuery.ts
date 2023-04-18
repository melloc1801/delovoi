import { useQuery } from 'react-query';
import fetcher from '../../../helpers/fetcher';
import { transformTokenIntoBearer } from '../../../helpers/getBearerToken';

interface ResponseBody {
  status: boolean;
  data: {
    user: {
      firstname: string;
      lastname: string;
      middlename: string;
      phone: string;
      email: string;
      region: string;
      contractor_id: number;
    };
    contractor: {
      balance: {
        value: number;
      };
      legal_form: {
        title: string;
        status: {
          is_verified: boolean;
        };
      };
    };
  };
}

export const useGetProfileQuery = (token: string | null) =>
  useQuery<ResponseBody>(
    'profile',
    async () =>
      await fetcher<ResponseBody>({
        method: 'POST',
        url: '/profile',
        headers: {
          Authorization: transformTokenIntoBearer(token ?? ''),
        },
      }),
    { enabled: Boolean(token) }
  );
