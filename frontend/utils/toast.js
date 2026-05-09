/**
 * Simple toast notification system
 * Can be replaced with a library like react-hot-toast later
 */

let toastListeners = [];

export const toast = {
  success: (message) => {
    const id = Date.now();
    const toast = { id, type: 'success', message };
    toastListeners.forEach((listener) => listener(toast));
    setTimeout(() => removeToast(id), 3000);
    return id;
  },
  error: (message) => {
    const id = Date.now();
    const toast = { id, type: 'error', message };
    toastListeners.forEach((listener) => listener(toast));
    setTimeout(() => removeToast(id), 5000);
    return id;
  },
  info: (message) => {
    const id = Date.now();
    const toast = { id, type: 'info', message };
    toastListeners.forEach((listener) => listener(toast));
    setTimeout(() => removeToast(id), 3000);
    return id;
  },
};

const removeToast = (id) => {
  toastListeners.forEach((listener) => listener({ id, remove: true }));
};

export const subscribeToToasts = (listener) => {
  toastListeners.push(listener);
  return () => {
    toastListeners = toastListeners.filter((l) => l !== listener);
  };
};

