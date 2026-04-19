import { Injectable, signal } from '@angular/core';
import { ToastInterface, ToastType } from '../../utils/moks/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts = signal<ToastInterface[]>([]);
  toasts = this._toasts.asReadonly();

  show(message: string, type: ToastType = 'info') {
    const toast: ToastInterface = {
      id: Date.now(),
      message,
      type
    };

    this._toasts.update(prev => [...prev, toast]);

    setTimeout(() => {
      this.remove(toast.id);
    }, 3000);
  }

  remove(id: number) {
    this._toasts.update(prev => prev.filter(t => t.id !== id));
  }
  
}
