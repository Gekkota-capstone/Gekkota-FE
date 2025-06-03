import { getLiveCameras } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetLiveCameras(cageId: number) {
  return useQuery({
    queryKey: ['liveCameras', cageId],
    queryFn: () => getLiveCameras({ cageId }),
  });
}
