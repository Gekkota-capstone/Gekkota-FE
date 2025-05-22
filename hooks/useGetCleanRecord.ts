import { getCleanRecord, getAllCleanRecords } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetCleanRecord(cageId: string, date: string) {
  const queryKey = date
    ? ['cleanRecord', cageId, date]     // 단일 날짜 조회
    : ['cleanRecordList', cageId];      // 전체 기록 조회는 키를 다르게 설정
  return useQuery({
    queryKey,
    queryFn: () => {
      if (date) {
        return getCleanRecord({ cageId, date }); // 특정 날짜의 급여 기록
      } else {
        return getAllCleanRecords({ cageId }); // 모든 급여 기록
      }
    },
    refetchOnWindowFocus: true
  });
}
