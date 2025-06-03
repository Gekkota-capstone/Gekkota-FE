// src/hooks/useBehaviorAnalytics.ts
import { getBehaviorAnalytics } from '@/api/get';
import { useQuery } from '@tanstack/react-query';

export function useBehaviorAnalytics(cageId: string, date: string) {
  return useQuery({
    queryKey: ['behaviorAnalytics', cageId, date],
    queryFn: () => getBehaviorAnalytics({ cageId, date }),
  });
}
