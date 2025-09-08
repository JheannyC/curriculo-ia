import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkError, setNetworkError] = useState<Error | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setNetworkError(null);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNetworkError(new Error('Connection lost'));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const withNetworkRetry = async <T>(
    operation: () => Promise<T>,
    retries = 2
  ): Promise<T> => {
    if (!isOnline) {
      throw new Error('No network connection');
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === retries) throw error;
        
        // Aguarda tempo exponencial entre tentativas
        await new Promise(resolve => 
          setTimeout(resolve, 1000 * Math.pow(2, attempt))
        );
      }
    }
    
    throw new Error('All retry attempts failed');
  };

  return {
    isOnline,
    networkError,
    withNetworkRetry,
    setNetworkError
  };
};