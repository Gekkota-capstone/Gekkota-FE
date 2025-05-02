// src/hooks/useDeleteFeedRecord.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCleanRecord } from '@/api/delete';

export function useDeleteCleanRecord(cageId: number, onSuccess: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: number) => deleteCleanRecord({ cageId, cardId }),
    onSuccess: () => {
      onSuccess();
      console.log('삭제성공');
      queryClient.invalidateQueries({ queryKey: ['CleanRecord', cageId] });
    },
  });
}