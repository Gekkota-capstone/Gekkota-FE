// hooks/useUpdatePetInfo.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePetInfo } from '@/api/update';
import { router } from 'expo-router';

interface UpdatePetInfoParams {
  petId: string;
  updatedData: {
    name: string;
    species: string;
    gender: string;
    birthdate: string;
  };
}

export function useUpdatePetInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ petId, updatedData }: { petId: string; updatedData: any }) =>
      updatePetInfo(petId, updatedData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['list'],
      });
      router.replace(`/cage/${data.petId}`);
    },
    onError: (error) => {
      console.error('❌ 업데이트 실패:', error);
    },
  });
}
