import { Component, Input } from '@angular/core';
import { ICountry } from '../../interfaces/country.interface';
import { FavoritesService } from '../../../core/services/favorites/favorites.service';

@Component({
  selector: 'app-country-scroll',
  standalone: false,
  templateUrl: './country-scroll.component.html',
  styleUrl: './country-scroll.component.scss'
})
export class CountryScrollComponent {

  @Input() country: ICountry | any;

  constructor(public favoritesService: FavoritesService) { }

  /**
   * Añade o elimina un país a favoritos
   * @param code
   */
  toggleFavorite(code: string): void {
    this.favoritesService.toggle(code);
  }
}
