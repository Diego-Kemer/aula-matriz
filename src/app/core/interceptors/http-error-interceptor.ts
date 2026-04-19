import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {

      let message = 'Error inesperado';

      if (error.status === 0) {
        message = 'No hay conexión con el servidor';
      }

      if (error.status === 400) {
        message = 'Datos inválidos';
      }

      if (error.status === 404) {
        message = 'Recurso no encontrado';
      }

      if (error.status === 500) {
        message = 'Error del servidor';
      }

      toast.show(message, 'error');

      return throwError(() => error);
    })
  );
};
