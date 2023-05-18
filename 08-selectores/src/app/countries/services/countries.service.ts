import { Injectable } from '@angular/core';
import { Region, SmallCountry, Country } from '../interfaces/country.interfaces';
import { Observable, of, map, tap, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseURL: string = 'https://restcountries.com/v3.1';

  // Por seguridad, las regiones se definen como privadas para no poder ser modificadas
  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

  constructor(private http: HttpClient) { }

  // Getter que devolverá las regiones de la propiedad _regions
  get regions(): Region[]{
    // Se desestructura para que no puedan mutar el arreglo base
    return [ ...this._regions];
  }

  getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {

    /** Debido a que se tiene que devolver valores de la resolucion de Observable,
     * se utiliza el operador rxjs 'of()' el cual se encarga de devolver los argumentos
     * que se le pasen como resultados de un observable,
     * para este caso, un arreglo vacio en caso de que no se seleccione una región.
     * https://rxjs.dev/api/index/function/of */
    if (!region) { return of([])}

    // Se arma la url de la peticion
    const url: string = `${this.baseURL}/region/${region}?fields=cca3,name,borders`;

    /** Como se esta filtrando la informacion por medio de los argumentos de la url,
     * el tipo de respuesta, que es similar a la interfaz 'Country' debe de ser transformada
     * a al tipo 'SmallCountry, ya que esto es lo que resuelve el resultado del metodo 'getCountriesByRegion' */
    return this.http.get<Country[]>(url)
      .pipe(

        /**El OPERADOR rxjs 'map' permite realizar transformaciones sobre los valores
         * emitidos por el observable de tipo HttpResponse, para este caso el valor 'countries',
         * luego de que se realice la transformacion de este valor, será nuevamente emitido
         * hacia el siguiente operador (si es que hay mas), o finalmente devuelto*/
        map(

          /** El METODO 'map()' de 'countries' crea y devuelve un nuevo arreglo
           * con los resultados de la operacion que se le aplique a cada elemento,
           * para este caso, por cado 'country' de tipo 'Country' se creará un nuevo
           * objeto de tipo 'SmallCountry' el cual tendrá los datos que nosotros le especifiquemos
           * a partir de cada elemento. Array.prototype.map()*/
          countries => countries.map( country => ({ // Metodo map de countries
            name: country.name.common,
            cca3: country.cca3,
            borders: country.borders ?? [] // si los borders son null, devuelve un arreglo vacio
          }))
          // Finalmente la respuesta este mapeo será detectado como SmallCountry

        ),
        tap( response => console.log({response}))
      );
  }

  getCountryByAlphaCode( alphaCode: string): Observable<SmallCountry>{
    // Se construye la url que devolvera los detalles del pais
    const url = `${this.baseURL}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.http.get<Country>(url)
      .pipe(
        // En base al resultado, se devulve unicamente los datos que se requieren
        map(
          country => ({
            name: country.name.common,
            cca3: country.cca3,
            borders: country.borders ?? [],
          })
        )
      );
  }

  /** Método que devuelve un arreglo de paises a partir de su codigo, como argumento
   * toma los códigos de los paises fronterizos de un pais dado. */
  getCountryBordersByCodes( borders: string[]): Observable<SmallCountry[]>{

    // Si el pais dado, no tiene fronteras con otros paises, retorna vacio
    if (!borders || borders.length === 0) return of([]);

    /** Esta coleccion de Observables contendrá los observables que devolverá el metodo
     * 'getCountryByAlphaCode()' para cada codigo. */
    const countriesRequests: Observable<SmallCountry>[] = [];

    /** Se recorre este arreglo de códigos y por cada código, se mandará a llamar el método
     * getCountryByAlphaCode, que devolverá un Observable con los datos del pais asociado a ese
     * codigo.*/
    borders.forEach(
      code => {
        // Se obtiene el Observable SIN realizar la subscripcion del mismo
        const request = this.getCountryByAlphaCode( code );

        /** Debido a que mas adelante se dispararán todos los Observables que se obtengan por cada
         * código, para este caso, cada Observable será almacenado en el arreglo 'countriesRequest'
         * el cual será ejecutado mas adelante por un operador rxjs */
        countriesRequests.push(request);
      }
    );

    /** El operador rxjs ejecutará las emiciones de todos los elementos de manera simultanea
     *  dentro del arreglo 'countryRequests', y devolverá esa coleccion de valores una
     *  vez todos estos hayan finalizado su emición */
    return combineLatest( countriesRequests );
  }

}
