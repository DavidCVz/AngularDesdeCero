import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, pipe, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL: string = 'https://restcountries.com/v3.1';

  /** La propiedad 'cacheStorage' servira para almacenar los ultimos datos que se obtengan de los componentes
   * que utilicen el servicio, debido a que cuando un servicio se cosntruye por primera vez, se mantiene
   * con vida a lo largo del ciclo de vida
   */
  public cacheStorage: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { countries: [] },
  }

  constructor(private http: HttpClient) {
    // Realiza la carga de los datos guardados previamente en el navegador
    this.loadLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStorage));
  }

  private loadLocalStorage(): void{
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStorage = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    // La consulta get retorna un arreglo de Country
    return this.http.get<Country[]>(url)
      .pipe( // Sirve para especificar diferentes operadores de RXJS
        // Es un operador que que permite atrapaer errores y procesarlos
        catchError( () => of([]) ), // 'of' construye y regresa un nuevo Observable vacio
      );
  }

  searchCapital(term: string): Observable<Country[]>{
    const url:string = `${ this.apiURL }/capital/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        // Almacena en el cacheStorage, el termino entrante y los paises que devuelve la peticion
        tap( countries => this.cacheStorage.byCapital = {term, countries}),
        // Guarda los datos almacenados en la propiedad 'cacheStorage' cada que se resuelve una peticion.
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchCountry(term: string): Observable<Country[]>{
    const url:string = `${ this.apiURL }/name/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStorage.byCountries = {term, countries}),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchRegion(region: string): Observable<Country[]>{
    const url:string = `${ this.apiURL }/region/${region}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStorage.byRegion = {region, countries}),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null>{
    const url:string = `${ this.apiURL }/alpha/${code}`;

    return this.http.get<Country[]>( url )
      .pipe(
        /** Como esta ruta siempre devuelve un arreglo con un elemento en caso de que si exista,
         * y un arreglo vacio en caso de que no, utilizando el operador rxjs 'map()'
         * se hace una evaluacion donde si contiene elementos, devolvera dicho elemento contenido
         * en el arreglo.
         */
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( error => of(null))
      );
  }

}
