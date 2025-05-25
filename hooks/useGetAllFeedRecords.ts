import { getAllFeedRecords } from '@/api/get'; // 여러 급여 기록을 가져오는 함수
import { useQuery } from '@tanstack/react-query';

export function useGetAllFeedRecords({
    cageId,
    startDate,
    endDate,
}: {
    cageId: string; 
    startDate: string;
    endDate: string;
}) {
    return useQuery({
        queryKey: ['feedRecords', cageId, startDate, endDate],
        queryFn: () => getAllFeedRecords({ cageId, startDate, endDate }), // 모든 급여 기록
        enabled: !!cageId && !!startDate && !!endDate,
        refetchOnWindowFocus: true
    });
}