import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryListComponent } from './country-list.component';
import { CountryService } from '../../services/country/country.service';
import { FavoritesService } from '../../../../core/services/favorites/favorites.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let favoritesService: FavoritesService;

  const mockCountries = [
    { name: { common: 'Mexico' } },
    { name: { common: 'Canada' } },
    { name: { common: 'Brazil' } }
  ];

  beforeEach(async () => {
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['find']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CountryListComponent],
      providers: [
        FavoritesService,
        { provide: CountryService, useValue: countryServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    favoritesService = TestBed.inject(FavoritesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries on init', () => {
    countryServiceSpy.find.and.returnValue(of(mockCountries as any));
    component.ngOnInit();
    expect(countryServiceSpy.find).toHaveBeenCalled();
  });

  it('should filter countries by search value', () => {
    component.countries = mockCountries as any;
    component.searchControl.setValue('mex');
    component.applyFilters();
    expect(component.filteredCountries.length).toBe(1);
    expect(component.filteredCountries[0].name.common).toBe('Mexico');
  });

  it('should filter countries by favorites', () => {
    component.countries = mockCountries as any;
    favoritesService.add('Canada');
    component.showFavorites = true;
    component.applyFilters();
    expect(component.filteredCountries.length).toBe(1);
    expect(component.filteredCountries[0].name.common).toBe('Canada');
  });

  it('should toggle showFavorites and apply filters', () => {
    spyOn(component, 'applyFilters');
    component.showFavorites = false;
    component.showFavoritesList();
    expect(component.showFavorites).toBeTrue();
    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('should clean up on destroy', () => {
    const completeSpy = spyOn((component as any).ngUnsubscribe, 'complete').and.callThrough();
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
