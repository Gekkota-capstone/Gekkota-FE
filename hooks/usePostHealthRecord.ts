import { postHealthRecord } from '@/api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// src/hooks/usePostHealthRecord.ts
export function usePostHealthRecord(cageId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      weight: string;
      shedding: string;
      memo: string;
      photo?: string;
    }) => postHealthRecord({ cageId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthRecord', cageId] });
    },
  });
}
