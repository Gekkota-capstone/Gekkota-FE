// src/hooks/useDeleteFeedRecord.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCleanRecord } from '@/api/delete';

export function useDeleteCleanRecord(cageId: string, onSuccess: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (date: string) => deleteCleanRecord({ cageId, date }),
    onSuccess: (_,date) => {
      onSuccess();
      console.log('삭제성공');
      queryClient.invalidateQueries({ queryKey: ['cleanRecord', cageId, date] });
      queryClient.invalidateQueries({ queryKey: ['cleanRecordList', cageId] });
    },
  });
}
