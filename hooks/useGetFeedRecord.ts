import { getFeedRecord } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetFeedRecord(cageId: number, date: string) {
  return useQuery({
    queryKey: ['feedRecord', cageId, date],
    queryFn: () => getFeedRecord({ cageId, date }),
  });
}
