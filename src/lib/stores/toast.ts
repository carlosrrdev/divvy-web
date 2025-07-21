import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  timeout?: number;
}

interface ToastStore {
  subscribe: (run: (value: Toast[]) => void, invalidate?: (value?: Toast[]) => void) => () => void;
  add: (toast: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
  success: (message: string, timeout?: number) => void;
  error: (message: string, timeout?: number) => void;
  warning: (message: string, timeout?: number) => void;
  info: (message: string, timeout?: number) => void;
}

const createToastStore = (): ToastStore => {
  const { subscribe, update } = writable<Toast[]>([]);

  const add = (toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    const timeout = toast.timeout || 3000; // Default timeout of 3 seconds

    update(toasts => [
      ...toasts,
      { ...toast, id }
    ]);

    // Automatically remove toast after timeout
    setTimeout(() => {
      remove(id);
    }, timeout);
  };

  const remove = (id: string) => {
    update(toasts => toasts.filter(toast => toast.id !== id));
  };

  const success = (message: string, timeout = 3000) => {
    add({ message, type: 'success', timeout });
  };

  const error = (message: string, timeout = 3000) => {
    add({ message, type: 'error', timeout });
  };

  const warning = (message: string, timeout = 3000) => {
    add({ message, type: 'warning', timeout });
  };

  const info = (message: string, timeout = 3000) => {
    add({ message, type: 'info', timeout });
  };

  return {
    subscribe,
    add,
    remove,
    success,
    error,
    warning,
    info
  };
};

export const toasts = createToastStore();