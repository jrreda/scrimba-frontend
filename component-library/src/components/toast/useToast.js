import { useContext } from "react";
import ToastContext from "./toastContext.jsx";

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { showToast } = context;

  // Helper methods for each toast type + direct access to showToast
  const toast = {
    // Direct access to showToast for advanced usage
    showToast,

    // Convenience methods
    success: (title, content, timer) => {
      showToast({ type: 'success', title, content, timer });
    },
    error: (title, content, timer) => {
      showToast({ type: 'error', title, content, timer });
    },
    warning: (title, content, timer) => {
      showToast({ type: 'warning', title, content, timer });
    },
    info: (title, content, timer) => {
      showToast({ type: 'info', title, content, timer });
    }
  };

  return toast;
}