import { getAllCleanRecords } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetAllCleanRecords({
    cageId,
    startDate,
    endDate,
}: {
    cageId: string;
    startDate: string;
    endDate: string;
}) {
    return useQuery({
        queryKey: ['cleanRecords', cageId, startDate, endDate],
        queryFn: async () => {
            try {
                console.log('🐛 청소 API 호출 with:', cageId, startDate, endDate);
                const res = await getAllCleanRecords({cageId, startDate, endDate});
                console.log('📦 청소 API 응답:', res);
                return res;
            } catch (error) {
                console.error('❌ 청소 API 요청 중 에러 발생:', error);
                throw error;
            }
        },
        enabled: !!cageId && !!startDate && !!endDate,
        refetchOnWindowFocus: true
    });
}

