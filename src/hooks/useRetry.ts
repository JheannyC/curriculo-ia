import { useState, useCallback } from 'react';

interface UseRetryOptions {
  maxRetries?: number;
  retryDelay?: number;
}

export const useRetry = (options: UseRetryOptions = {}) => {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = useCallback(async <T>(
    operation: () => Promise<T>
  ): Promise<T> => {
    if (retryCount >= maxRetries) {
      throw new Error(`Máximo de ${maxRetries} tentativas atingido`);
    }

    setIsRetrying(true);
    try {
      const result = await operation();
      setRetryCount(0);
      return result;
    } catch (error) {
      setRetryCount(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      throw error;
    } finally {
      setIsRetrying(false);
    }
  }, [maxRetries, retryCount, retryDelay]);

  return {
    retry,
    retryCount,
    isRetrying,
    canRetry: retryCount < maxRetries,
    resetRetry: () => setRetryCount(0)
  };
};