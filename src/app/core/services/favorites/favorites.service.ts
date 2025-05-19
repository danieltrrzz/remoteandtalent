import { Injectable, signal, computed, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  /**
   * Listado con el nombre de paises favoritos
   */
  private _favorites = signal<string[]>([]);
  readonly favorites = computed(() => this._favorites());

  /**
   * Añade un pais a favoritos
   * @param name Nombre del pais a añadir a favoritos
   */
  add(name: string): void {
    if (!this._favorites().includes(name)) {
      this._favorites.update(favs => [...favs, name]);
    }
  }

  /**
   * Elimina un pais de favoritos
   * @param name Nombre del pais a eliminar de favoritos
   */
  remove(name: string): void {
    this._favorites.update(favs => favs.filter(f => f !== name));
  }

  /**
   * Elimina o añade un pais a favoritos
   * @param name Nombre del pais a añadir o eliminar de favoritos
   */
  toggle(name: string): void {
    this._favorites().includes(name)
      ? this.remove(name)
      : this.add(name);
  }

  /**
   * Verifica si un pais es favorito
   * @param name Nombre del pais a verificar
   * @returns
   */
  isFavorite(name: string): Signal<boolean> {
    return computed(() => this._favorites().includes(name));
  }
}
