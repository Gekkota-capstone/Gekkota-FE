import { getPets } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetList() {
  return useQuery({
    queryFn: getPets,
    queryKey: ['list'],
  });
}
