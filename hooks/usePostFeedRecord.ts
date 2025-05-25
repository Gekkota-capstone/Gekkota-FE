import { postFeedRecord } from '@/api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePostFeedRecord(cageId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: {
            date: string;
            food_type: string;
            food_size?: string;
            food_amount?: number;
            amount_unit?: string;
            memo?: string;
        }) => postFeedRecord({ cageId, data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedRecords', cageId], exact: false });
        },
    });
}