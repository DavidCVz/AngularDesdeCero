import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap, count } from 'rxjs';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  public myForm: FormGroup = this.formBulder.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  constructor(private formBulder:FormBuilder,
              private countriesService: CountriesService) {}

  // En este punto el OnInit tiene acceso a las propiedades, metodos y al constructor
  ngOnInit(): void {
    // Dentro del OnInit, se estará escuchando cada metodo cada vez que
    // un selector cambie de valor
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChanged(): void {
    /**  'valuehanges' emite valores cada que se detecta un cambio en el control especificado
         * para este caso, el control 'region' de 'MyForm', por lo tanto cada vez que se seleccione
         * una nueva region, el 'valueChanges' emitirá el valor de dicha selección */
    this.myForm.get('region')!.valueChanges
    .pipe(

      // Para resetear el campo cada que se cambia de región
      tap( () => this.myForm.get('country')!.setValue('') ),
      // Si se cambia el pais, se resetea la variable que contiene las fronteras
      tap( () => this.borders = [] ),

      /** El switchMap() tomará el valor emitido por 'valueChanges' en este caso la región
       * y realizará el procedimiento de su cuerpo, por lo que el valor que regrese
       * será tomado posteriormente por el '.subscribe()'.
       * Cada vez que se seleccione una nueva región se realizará una petición HTTP mandando
       * como argumento, dicho valor emitido por el 'valueChanges' */
      switchMap( (region) => this.countriesService.getCountriesByRegion(region) )
    )
    // 'subscribe' recibe el valor devuelto por el 'switchMap'
    .subscribe( (countries) => { // Este resultado es lo que devuelve la peticion http
      this.countriesByRegion = countries;
    });
  }

  /** Actualiza los valores en el selector de borders cuando se cambia de pais */
  onCountryChanged(){
    // Detecta el cambio del valor del elemento 'country'
    this.myForm.get('country')!.valueChanges
    .pipe(

      // Para resetear el campo cada que se cambia de pais
      tap( () => this.myForm.get('border')!.setValue('') ),

      /** El operador 'filter' unicamente permite que se sigan emitiendo valores
       * que cumplan con la condición que se le especifique, en este caso, si el valor del selector
       * no contiene nada, entonces no se realizarán los procesos posteriores. */
      filter( (value: string) => value.length > 0 ),

      /** Se devuelve los resultados con la informacion procesada por el servicio */
      switchMap( (alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode) ),

      switchMap( (country) => this.countriesService.getCountryBordersByCodes(country.borders) ),
    )
    // 'subscribe' recibe el valor devuelto por el 'switchMap'
    .subscribe( (countries) => { // Este resultado es lo que devuelve la peticion http

      this.borders = countries;
    });
  }

}
