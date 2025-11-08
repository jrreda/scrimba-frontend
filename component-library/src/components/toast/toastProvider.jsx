import { useState } from "react";
import Toast from "./Toast.jsx";
import ToastContext from "./toastContext.jsx";

// Generate unique ID
function generateUniqueID() {
  return 'u' + Date.now() + Math.random().toString(36).slice(2);
}

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (toast) => {
    setToasts((prevToasts) => [...prevToasts, 
      { ...toast, id: generateUniqueID() }
    ]);
  };

  const hideToast = (toastId) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}

      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => hideToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
