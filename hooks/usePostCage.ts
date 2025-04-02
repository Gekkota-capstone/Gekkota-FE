// hooks/useLizardMutation.ts
import { useMutation } from '@tanstack/react-query';
import { postCage, CageData } from '@/api/post';

export const usePostCage = () => {
  return useMutation({
    mutationFn: (data: CageData) => postCage(data),
  });
};
