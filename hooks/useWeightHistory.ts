import { getWeightHistory } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useWeightHistory(cageId: number, date: string) {
  return useQuery({
    queryKey: ['weightHistory', cageId, date],
    queryFn: () => getWeightHistory({ cageId, date }),
  });
}
