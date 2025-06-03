import { postCleanRecord } from '@/api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePostCleanRecord(cageId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { date: string; memo: string }) =>
      postCleanRecord({ cageId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cleanRecord', cageId] });
      queryClient.invalidateQueries({ queryKey: ['cleanRecords', cageId] });
    },
  });
}
