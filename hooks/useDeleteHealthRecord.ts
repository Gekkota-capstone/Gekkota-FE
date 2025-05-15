// src/hooks/useDeleteHealthRecord.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHealthRecord } from '@/api/delete';

export function useDeleteHealthRecord(cageId: number, onSuccess: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (date: string) => deleteHealthRecord({ cageId, date }),
    onSuccess: () => {
      onSuccess();
      console.log('삭제성공');
      queryClient.invalidateQueries({ queryKey: ['healthRecord', cageId] });
    },
  });
}
