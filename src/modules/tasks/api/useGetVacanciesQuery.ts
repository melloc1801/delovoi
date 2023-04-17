import { useQuery } from 'react-query';
import fetcher from '../../../helpers/fetcher';

interface ResponseBody {
  data: {
    vacancy: string[];
  };
}

export const useGetVacanciesQuery = (token: string) =>
  useQuery<ResponseBody>(
    'vacancies',
    async () =>
      await fetcher<ResponseBody>({
        url: '/task/vacancy',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
  );
