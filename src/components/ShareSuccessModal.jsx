import { useEffect } from 'react';

export default function ShareSuccessModal({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg dark:bg-gray-700 dark:text-gray-100">
        {message}
      </div>
    </div>
  );
}
