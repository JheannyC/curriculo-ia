import React, { useEffect } from 'react'
import { ToastType } from '../../hooks/useToast'


interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return '💡'
    }
  }

  return (
    <div className={`
      fixed top-4 right-4 z-50 
      transform transition-all duration-300
      animate-in slide-in-from-right-full
    `}>
      <div className={`
        ${getBackgroundColor()} 
        text-white 
        px-4 py-3 
        rounded-lg 
        shadow-lg 
        flex 
        items-center 
        gap-3
        min-w-64
        max-w-md
      `}>
        <span className="text-lg">{getIcon()}</span>
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="
            text-white 
            hover:text-gray-200 
            text-lg 
            font-bold 
            ml-2
          "
          aria-label="Fechar notificação"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Toast