import { getCleanRecord } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetCleanRecord(cageId: number, date: string) {
  return useQuery({
    queryKey: ['cleanRecord', cageId, date],
    queryFn: () => getCleanRecord({ cageId, date }),
  });
}
