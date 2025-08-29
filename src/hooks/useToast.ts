import { useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType, duration?: number) => {
    const id = Date.now().toString()
    const newToast: Toast = { id, message, type, duration }
    
    setToasts(prevToasts => [...prevToasts, newToast])
    
    // Retorna função para remover o toast manualmente
    return () => removeToast(id)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
  }, [])

  const toast = useCallback((message: string, type: ToastType, duration?: number) => {
    return addToast(message, type, duration)
  }, [addToast])

  // Métodos específicos para cada tipo
  const success = useCallback((message: string, duration?: number) => {
    return addToast(message, 'success', duration)
  }, [addToast])

  const error = useCallback((message: string, duration?: number) => {
    return addToast(message, 'error', duration)
  }, [addToast])

  const warning = useCallback((message: string, duration?: number) => {
    return addToast(message, 'warning', duration)
  }, [addToast])

  const info = useCallback((message: string, duration?: number) => {
    return addToast(message, 'info', duration)
  }, [addToast])

  return {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    removeToast
  }
}