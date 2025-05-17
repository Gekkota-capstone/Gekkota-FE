import { getFeedRecord, getAllFeedRecords } from '@/api/get'; // 여러 급여 기록을 가져오는 함수
import { useQuery } from '@tanstack/react-query';

export function useGetFeedRecord(cageId: string, date?: string) {
  return useQuery({
    queryKey: ['feedRecord', cageId, date],
    queryFn: () => {
      if (date) {
        return getFeedRecord({ cageId, date }); // 특정 날짜의 급여 기록
      } else {
        return getAllFeedRecords({ cageId }); // 모든 급여 기록
      }
    },
  });
}
