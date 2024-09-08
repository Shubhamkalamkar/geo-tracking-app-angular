import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { IApiErrorResponse } from '../interfaces/api-response-error.interface';

export const baseInterceptor: HttpInterceptorFn = (req, next) => {
  const request =  req.clone({
    setHeaders:{
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    }
  })
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let apiError: IApiErrorResponse;
      if(error.error instanceof ErrorEvent) {
        apiError = {
          statusCode: 0,
          data: null,
          message: 'Client-Side Error',
          success: false,
          errors: [error.error.message]
        };
      } else {
        apiError = error.error as IApiErrorResponse;
      }

      return throwError(() => apiError);
    })
  );
};
