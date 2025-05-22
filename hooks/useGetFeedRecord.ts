import { getFeedRecord, getAllFeedRecords } from '@/api/get'; // 여러 급여 기록을 가져오는 함수
import { useQuery } from '@tanstack/react-query';

export function useGetFeedRecord(cageId: string, date: string) {
  const queryKey = date
    ? ['feedRecord', cageId, date]     // 단일 날짜 조회
    : ['feedRecordList', cageId];      // 전체 기록 조회는 키를 다르게 설정
  return useQuery({
    queryKey,
    queryFn: () => {
      if (date) {
        return getFeedRecord({ cageId, date }); // 특정 날짜의 급여 기록
      } else {
        return getAllFeedRecords({ cageId }); // 모든 급여 기록
      }
    },
    refetchOnWindowFocus: true
  });
}
