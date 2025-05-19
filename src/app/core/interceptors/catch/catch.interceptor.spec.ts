import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CatchInterceptor } from './catch.interceptor';
import { ToastrService } from 'ngx-toastr';

describe('CatchInterceptor', () => {
  let interceptor: CatchInterceptor;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);
    TestBed.configureTestingModule({
      providers: [
        CatchInterceptor,
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    });
    interceptor = TestBed.inject(CatchInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call next.handle and not call toastr.error on success', (done) => {
    const request = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: () => of({} as HttpEvent<any>)
    };

    interceptor.intercept(request, next).subscribe({
      next: () => {
        expect(toastrServiceSpy.error).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('should call toastr.error on error', (done) => {
    const request = new HttpRequest('GET', '/test');
    const error = { status: 500, message: 'Server error' };
    const next: HttpHandler = {
      handle: () => throwError(() => error)
    };

    interceptor.intercept(request, next).subscribe({
      error: (err) => {
        expect(toastrServiceSpy.error).toHaveBeenCalledWith(
          `Ocurrió un error con la petición: ${JSON.stringify({ error })}`,
          'Error'
        );
        expect(err).toBe(error);
        done();
      }
    });
  });
});
