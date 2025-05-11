// hooks/useLizardMutation.ts
import { useMutation } from '@tanstack/react-query';
import { postPet, CageData } from '@/api/post';

export const usePostCage = () => {
  return useMutation({
    mutationFn: (data: CageData) => postPet(data),
  });
};
