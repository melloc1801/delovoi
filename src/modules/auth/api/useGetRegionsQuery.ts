import { useQuery } from 'react-query';
import fetcher from '../../../helpers/fetcher';

export const useGetRegionsQuery = () =>
  useQuery(
    'regions',
    async () => await fetcher({ method: 'POST', url: '/api/profile' })
  );
