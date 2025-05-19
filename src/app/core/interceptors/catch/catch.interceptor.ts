import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CatchInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }
  /**
   * Intercepcion de Request
   * @param request
   * @param next
   * @returns
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        debugger;
        this.toastr.error(`Ocurrió un error con la petición: ${JSON.stringify({ error })}`, 'Error');
        return throwError(() => error);
      })
    );
  }
}
