import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services/http/http.service';
import { ICountry } from '../../../../shared/interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpService: HttpService) { }

  /**
   * Buscar un pais por su nombre
   * @param name
   * @returns
   */
  findOne(name: string): Observable<any> {
    return this.httpService.Get<ICountry>('name', name);
  }

  /**
   * Obtener todos los paises o filtrar por region
   * @param region
   * @param qst
   * @returns
   */
  find(region?: string): Observable<ICountry[]> {
    return this.httpService.Get<ICountry>(`${region ? 'region' : 'all'}`, region);
  }
}
