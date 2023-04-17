import { useQuery } from 'react-query';
import fetcher from '../../../helpers/fetcher';

interface ResponseBody {
  data: Array<{ id: number; name: string; code: number }>;
}

export const useGetRegionsQuery = () =>
  useQuery<ResponseBody>(
    'regions',
    async () => await fetcher<ResponseBody>({ method: 'POST', url: '/regions' })
  );
