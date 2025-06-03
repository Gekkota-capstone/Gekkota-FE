import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFeedRecord, deletePet } from '@/api/delete';

export function useDeletePet(cageId: string, onSuccess: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePet({ petId: cageId }),
    onSuccess: (_, date) => {
      onSuccess();
      console.log('삭제성공');
      queryClient.invalidateQueries({ queryKey: ['list', cageId] });
    },
  });
}
