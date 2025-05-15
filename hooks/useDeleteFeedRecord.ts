// src/hooks/useDeleteFeedRecord.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFeedRecord } from '@/api/delete';

export function useDeleteFeedRecord(cageId: number, onSuccess: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (date: string) => deleteFeedRecord({ cageId, date }),
    onSuccess: () => {
      onSuccess();
      console.log('삭제성공');
      queryClient.invalidateQueries({ queryKey: ['FeedRecord', cageId] });
    },
  });
}
