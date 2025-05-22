import { getAllFeedRecords } from '@/api/get'; // 여러 급여 기록을 가져오는 함수
import { useQuery } from '@tanstack/react-query';

export function useGetAllFeedRecords(cageId: string) {
    return useQuery({
        queryKey: ['feedRecordList', cageId],
        queryFn: () => {
            return getAllFeedRecords({ cageId }); // 모든 급여 기록
        },
        refetchOnWindowFocus: true
    });
}