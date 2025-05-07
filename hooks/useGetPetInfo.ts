import { getPetInfo } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetPetInfo(petId: string) {
  return useQuery({
    queryKey: ['petInfo', petId],
    queryFn: () => getPetInfo(petId),
    refetchInterval: 5000, // 5초마다 데이터를 갱신
  });
}