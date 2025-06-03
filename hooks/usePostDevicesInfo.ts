// hooks/useLizardMutation.ts
import { useMutation } from '@tanstack/react-query';
import { postDevicesInfo } from '@/api/post';

export const usePostDevicesInfo = () => {
  return useMutation({
    mutationFn: () => postDevicesInfo(),
  });
};
