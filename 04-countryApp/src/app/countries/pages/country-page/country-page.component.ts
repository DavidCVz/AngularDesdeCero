import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { count, switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    // Ayuda a gestionar los parametros que vienen desde la ruta
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ){}

  ngOnInit(): void {
    // Obtiene los parametros de la ruta
    this.activatedRoute.params
      /** Debido a que la propiedad 'params' de la clase 'ActivatedRoute' devuelve los parametros que
       * se envian desde la ruta, se hace uso a traves de un pipe, el operador rxjs 'switchMap()
       * este desestructura los 'params' entrantes de la ruta, en este caso solo el 'id'
       * y lo envia directamente al servicio para obtener el resultado
      */
      .pipe(
        switchMap(({id}) => this.countriesService.searchCountryByAlphaCode( id )),
      )
      /** El metodo 'subscribe' recibira el resultado que devuelva el servicio (vease al definicion del servicio)
       * en este caso el pais, y lo procesará
       */
      .subscribe( country => {

        if (!country) { return this.router.navigateByUrl(''); } // Redirecciona al home

        return this.country = country;
      }

    );
  }
}
