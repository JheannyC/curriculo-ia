import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null>(null);

  const showToast = (
    type: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    setToast({ type, message });
  };

  const removeToast = () => setToast(null);

  return { showToast, toast, removeToast };
}
