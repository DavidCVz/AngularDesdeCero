import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCapital(termn: string): Observable<Country[]>{
    const url:string = `${ this.apiURL }/capital/${termn}`;

    // La consulta get retorna un arreglo de Country
    return this.http.get<Country[]>( url )
      .pipe( // Sirve para especificar diferentes operadores de RXJS
        // Es un operador que que permite atrapaer errores y procesarlos
        catchError( error => of([])) // 'of' construye y regresa un nuevo Observable vacio
      );
  }

  searchCountry(term: string): Observable<Country[]>{
    const url:string = `${ this.apiURL }/name/${term}`;

    return this.http.get<Country[]>( url )
      .pipe(
        catchError( error => of([]))
      );
  }

  searchRegion(region: string): Observable<Country[]>{
    const url:string = `${ this.apiURL }/region/${region}`;

    return this.http.get<Country[]>( url )
      .pipe(
        catchError( error => of([]))
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
