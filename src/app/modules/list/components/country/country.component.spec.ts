import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryComponent } from './country.component';
import { CountryService } from '../../services/country/country.service';
import { FavoritesService } from '../../../../core/services/favorites/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let favoritesService: FavoritesService;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockCountry = [{
    name: { common: 'Mexico' },
    capital: ['CDMX'],
    region: 'Americas',
    subregion: 'North America',
    population: 1000000,
    flags: { svg: 'flag.svg' },
    languages: { spa: 'Spanish' },
    currencies: { MXN: { name: 'Mexican peso', symbol: '$' } }
  }];

  beforeEach(async () => {
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['findOne']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [CountryComponent],
      providers: [
        FavoritesService,
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => key === 'name' ? 'Mexico' : null } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    favoritesService = TestBed.inject(FavoritesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate if no country name in route', () => {
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(null);
    // Asegúrate de que findOne NO se llama
    expect(() => component.ngOnInit()).not.toThrow();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['list/country-list']);
    expect(countryServiceSpy.findOne).not.toHaveBeenCalled();
  });

  it('should load country and set isLoading to false', () => {
    countryServiceSpy.findOne.and.returnValue(of(mockCountry));
    component.ngOnInit();
    expect(component.country).toEqual(mockCountry[0] as any);
    expect(component.isLoading).toBeFalse();
  });

  it('should navigate if country not found', () => {
    countryServiceSpy.findOne.and.returnValue(of([]));
    component.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['list/country-list']);
  });

  it('should call favoritesService.toggle when toggleFavorite is called', () => {
    spyOn(favoritesService, 'toggle');
    component.toggleFavorite('Mexico');
    expect(favoritesService.toggle).toHaveBeenCalledWith('Mexico');
  });

  it('should clean up on destroy', () => {
    const completeSpy = spyOn((component as any).ngUnsubscribe, 'complete').and.callThrough();
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
