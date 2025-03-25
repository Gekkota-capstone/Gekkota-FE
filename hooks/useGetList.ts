import { getList } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetList() {
  return useQuery({
    queryFn: getList,
    queryKey: ['list'],
  });
}
