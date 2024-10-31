import { useState } from 'react';
import { api } from '../lib/api';

interface UseWebsiteStatusProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useWebsiteStatus({ onSuccess, onError }: UseWebsiteStatusProps = {}) {
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});

  const updateStatus = async (websiteId: string, status: string) => {
    setIsUpdating(prev => ({ ...prev, [websiteId]: true }));

    try {
      // In a real app, this would be an API call
      await api.put(`/websites/${websiteId}/status`, { status });
      onSuccess?.();
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update status';
      onError?.(message);
      return false;
    } finally {
      setIsUpdating(prev => ({ ...prev, [websiteId]: false }));
    }
  };

  return {
    updateStatus,
    isUpdating,
  };
}