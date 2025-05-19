import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request and return data', (done) => {
    const mockData = [{ name: 'Country1' }, { name: 'Country2' }];
    service.Get<any>('all').subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle error and return empty array', (done) => {
    service.Get<any>('all').subscribe(data => {
      expect(data).toEqual([]);
      done();
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should build url with complement', (done) => {
    const mockData = [{ name: 'Country1' }];
    service.Get<any>('name', 'mexico').subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/name/mexico');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
