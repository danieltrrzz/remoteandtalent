import { TestBed } from '@angular/core/testing';
import { CountryService } from './country.service';
import { HttpService } from '../../../../core/services/http/http.service';
import { of } from 'rxjs';

describe('CountryService', () => {
  let service: CountryService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['Get']);
    TestBed.configureTestingModule({
      providers: [
        CountryService,
        { provide: HttpService, useValue: httpServiceSpy }
      ]
    });
    service = TestBed.inject(CountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpService.Get with correct params for findOne', (done) => {
    const mockCountry = [{ name: 'Mexico' }];
    httpServiceSpy.Get.and.returnValue(of(mockCountry));

    service.findOne('Mexico').subscribe(data => {
      expect(data).toEqual(mockCountry);
      expect(httpServiceSpy.Get).toHaveBeenCalledWith('name', 'Mexico');
      done();
    });
  });

  it('should call httpService.Get with "region" and region param for find(region)', (done) => {
    const mockCountries = [{ name: 'Canada' }];
    httpServiceSpy.Get.and.returnValue(of(mockCountries));

    service.find('Americas').subscribe(data => {
      expect(data).toEqual(mockCountries as any);
      expect(httpServiceSpy.Get).toHaveBeenCalledWith('region', 'Americas');
      done();
    });
  });

  it('should call httpService.Get with "all" and undefined for find()', (done) => {
    const mockCountries = [{ name: 'Spain' }];
    httpServiceSpy.Get.and.returnValue(of(mockCountries));

    service.find().subscribe(data => {
      expect(data).toEqual(mockCountries as any);
      expect(httpServiceSpy.Get).toHaveBeenCalledWith('all', undefined);
      done();
    });
  });
});
