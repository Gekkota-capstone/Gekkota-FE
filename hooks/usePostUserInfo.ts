import { postUserInfo } from '@/api/post';
import { useMutation } from '@tanstack/react-query';

// src/hooks/usePostUserInfo.ts
export function usePostUserInfo(onSuccess: () => void) {
  return useMutation({
    mutationFn: (data: { nickname: string; profile: string }) =>
      postUserInfo({ data }),
    onSuccess: () => {
      onSuccess();
    },
  });
}
