export type ToastType = 'success' | 'error' | 'info';

export interface ToastInterface {
  id: number;
  message: string;
  type: ToastType;
}
