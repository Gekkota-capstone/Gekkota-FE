import { postLLMMessage } from '@/api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// src/hooks/usePostLLMMessage.ts
export function usePostLLMMessage(cageId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { message: string }) => postLLMMessage({ cageId, data }),
    onSuccess: () => {},
  });
}
