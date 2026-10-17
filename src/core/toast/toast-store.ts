import { create } from "zustand";

export type ToastType = "error" | "success" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastType, duration?: number) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type = "info", duration = 5000) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }

    return id;
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),
}));

export const toast = {
  error: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, "error", duration),
  success: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, "success", duration),
  info: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, "info", duration),
  warning: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, "warning", duration),
  dismiss: (id: string) => useToastStore.getState().removeToast(id),
  clear: () => useToastStore.getState().clearToasts(),
};

