'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { subscribeToToasts } from '../utils/toast';

/**
 * Toast notification component
 */
export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((toast) => {
      if (toast.remove) {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      } else {
        setToasts((prev) => [...prev, toast]);
      }
    });

    return unsubscribe;
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`glass rounded-lg p-4 min-w-[300px] flex items-center gap-3 ${
              toast.type === 'success'
                ? 'border-accent-green/50'
                : toast.type === 'error'
                ? 'border-red-500/50'
                : 'border-accent-blue/50'
            }`}
          >
            {toast.type === 'success' && (
              <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
            )}
            {toast.type === 'error' && (
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-accent-blue flex-shrink-0" />
            )}
            <p className="flex-1 text-sm">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

