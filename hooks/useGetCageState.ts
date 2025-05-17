import { getCageState } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetCageState(cageId: string) {
  return useQuery({
    queryKey: ['state', cageId],
    queryFn: () => getCageState({ cageId }),
    refetchInterval: 10000,
  });
}
