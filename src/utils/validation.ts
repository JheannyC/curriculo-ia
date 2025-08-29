export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+\d{1,3})?\s?\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateURL = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}