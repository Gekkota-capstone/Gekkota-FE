import { getLLMMessage } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useGetLLMMessage(cageId: string) {
  return useQuery({
    queryKey: ['llmMessage', cageId],
    queryFn: () => getLLMMessage({ cageId }),
  });
}
