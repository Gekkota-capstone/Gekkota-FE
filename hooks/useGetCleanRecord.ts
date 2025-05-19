import { getCleanRecord, getAllCleanRecords } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetCleanRecord(cageId: string, date?: string) {
  return useQuery({
    queryKey: ['cleanRecord', cageId, date],
    queryFn: () => {
          if (date) {
            return getCleanRecord({ cageId, date }); // 특정 날짜의 급여 기록
          } else {
            return getAllCleanRecords({ cageId }); // 모든 급여 기록
          }
        },
  });
}
