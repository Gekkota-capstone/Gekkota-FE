import { postHealthRecord } from '@/api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// src/hooks/usePostHealthRecord.ts
export function usePostHealthRecord(cageId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      weight: string;
      shedding_status: string;
      memo: string;
      date: string;
    }) => postHealthRecord({ cageId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthRecord', cageId] });
    },
  });
}
