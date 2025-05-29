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
        queryFn: async () => {
                    try {
                        console.log('🐛 급여 API 호출 with:', cageId, startDate, endDate);
                        const res = await getAllFeedRecords({cageId, startDate, endDate});
                        console.log('📦 급여 API 응답:', res);
                        return res;
                    } catch (error) {
                        console.error('❌ 급여 API 요청 중 에러 발생:', error);
                        throw error;
                    }
                },
        enabled: !!cageId && !!startDate && !!endDate,
        refetchOnWindowFocus: true
    });
}