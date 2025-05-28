import { postLLMMessage } from '@/api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// src/hooks/usePostLLMMessage.ts
export function usePostLLMMessage(cageId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { question: string }) =>
      postLLMMessage({ cageId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['llmMessage', cageId] });
    },
  });
}
