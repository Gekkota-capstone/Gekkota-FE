// hooks/useLizardMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPet, CageData } from '@/api/post';

export const usePostCage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CageData) => postPet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list'] });
    },
  });
};
