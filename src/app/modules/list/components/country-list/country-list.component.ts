import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountryService } from '../../services/country/country.service';
import { debounceTime, distinctUntilChanged, startWith, takeUntil, Subject } from 'rxjs';
import { ICountry } from '../../../../shared/interfaces/country.interface';
import { FavoritesService } from '../../../../core/services/favorites/favorites.service';

@Component({
  selector: 'app-country-list',
  standalone: false,
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent implements OnInit, OnDestroy {

  searchControl = new FormControl('');
  regionControl = new FormControl('');
  showFavorites: boolean = false;
  isLoading: boolean = true;

  countries: ICountry[] = [];
  filteredCountries: ICountry[] = [];
  regions: string[] = ["africa", "europe", "oceania", "antarctic", "americas", "asia"];

  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    public favoritesService: FavoritesService,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    // Inicializa observable para el input de búsqueda
    this.searchControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe), startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe({
        next: (result: string | null) => {
          if (result) this.applyFilters();
        }
      });

    // Inicializa observable para el input de región
    this.regionControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe), startWith(''))
      .subscribe({
        next: (result: string | null) => {
          this.loadCountries(result as any);
        }
      });

    this.loadCountries();
  }

  /**
   * Devuelve el valor del input de búsqueda
   */
  get searchValue(): string {
    return this.searchControl.value || '';
  }

  /**
   * Carga los países desde la API
   * @returns {void}
   */
  loadCountries(region?: string): void {
    this.isLoading = true;
    this.countryService.find(region)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (result: ICountry[]) => {
          this.isLoading = false;

          if (result.length == 0) return;
          this.countries = result;
          this.applyFilters();
        }
      });
  }

  /**
   * Aplica los filtros de búsqueda segun el valor del input del buscador
   * Solo se aplica si el valor es mayor a 3 caracteres
   * @param search
   */
  applyFilters() {
    const lowerSearch: string = this.searchValue?.toLowerCase() ?? '';
    const favorites: string[] | null = this.showFavorites ? this.favoritesService.favorites() : null;

    this.filteredCountries = this.countries.filter(c => {
      const matchesSearch = lowerSearch.length < 3 || c.name.common.toLowerCase().includes(lowerSearch);
      const matchesFavorite = !favorites || favorites.includes(c.name.common);
      return matchesSearch && matchesFavorite;
    });
  }

  /**
   * Mostra u oculta la lista con los países favoritos
   */
  showFavoritesList(): void {
    this.showFavorites = !this.showFavorites;
    this.applyFilters();
  }

  /**
   * Destruye el componente
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
