import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { RequestInterceptor } from './request.interceptor';

describe('RequestInterceptor', () => {
  let interceptor: RequestInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestInterceptor]
    });
    interceptor = TestBed.inject(RequestInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Content-Type header as application/json', (done) => {
    const request = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.get('Content-Type')).toBe('application/json');
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(request, next).subscribe(() => done());
  });
});
