import { getHealthRecord } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetHealthRecord(cageId: number, date: string) {
  return useQuery({
    queryKey: ['healthRecord', cageId, date],
    queryFn: () => getHealthRecord({ cageId, date }),
  });
}
