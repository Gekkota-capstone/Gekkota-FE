// hooks/useUpdatePetInfo.ts
import { useMutation } from '@tanstack/react-query';
import { updatePetInfo } from '@/api/update';

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
  return useMutation({
    mutationFn: ({ petId, updatedData }: { petId: string; updatedData: any }) =>
      updatePetInfo(petId, updatedData),
    onSuccess: (data) => {
      console.log('✅ 업데이트 성공:', data);
    },
    onError: (error) => {
      console.error('❌ 업데이트 실패:', error);
    },
  });
}
