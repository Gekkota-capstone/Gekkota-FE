import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFeedRecord } from '@/api/delete';

export function useDeleteFeedRecord(cageId: string, onSuccess: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ date, food_type }: { date: string; food_type: string }) =>
      deleteFeedRecord({ cageId, date, food_type }),
    onSuccess: (_, date) => {
      onSuccess();
      console.log('삭제성공');
      queryClient.invalidateQueries({ queryKey: ['feedRecord', cageId] });
      queryClient.invalidateQueries({ queryKey: ['feedRecordList', cageId] });
    },
  });
}
