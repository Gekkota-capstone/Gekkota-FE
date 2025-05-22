import { getFeedRecord } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetFeedRecord(cageId: string, date: string) {
    return useQuery({
        queryKey: ['feedRecord', cageId, date],
        queryFn: () => {
            return getFeedRecord({ cageId, date }); // 모든 급여 기록
        },
        refetchOnWindowFocus: true
    });
}
