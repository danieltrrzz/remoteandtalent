import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country/country.service';
import { ICountry } from '../../../../shared/interfaces/country.interface';
import { Subject, takeUntil } from 'rxjs';
import { FavoritesService } from '../../../../core/services/favorites/favorites.service';

@Component({
  selector: 'app-country',
  standalone: false,
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit, OnDestroy {

  country: ICountry | null = null;
  isLoading: boolean = true;

  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    public favoritesService: FavoritesService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const name: string | null = this.route.snapshot.paramMap.get('name');
    if (!name) {
      this.router.navigate(['list/country-list']);
      return;
    }

    this.countryService.findOne(name as string)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (result: ICountry[]) => {
          if (result.length === 0) {
            this.router.navigate(['list/country-list']);
          } else {
            this.country = result[0];
            this.isLoading = false;
          }
        }
      });
  }

  /**
   * Añade o elimina un país a favoritos
   * @param code
   */
  toggleFavorite(code: string): void {
    this.favoritesService.toggle(code);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
