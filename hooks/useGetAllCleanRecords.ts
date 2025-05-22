import { getAllCleanRecords } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetAllCleanRecords(cageId: string) {
  return useQuery({
    queryKey: ['cleanRecordList', cageId],
    queryFn: () => {
      return getAllCleanRecords({ cageId });
    },
    refetchOnWindowFocus: true
  });
}

