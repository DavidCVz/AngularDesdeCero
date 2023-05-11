import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{
  public countries: Country[] = [];
  public searchInitialValue: string = '';

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byCountries.countries;
    this.searchInitialValue = this.countriesService.cacheStorage.byCountries.term;
  }

  searchByCountryName(term: string):void{
    this.countriesService.searchCountry(term)
      .subscribe( countries => {
        this.countries = countries;
      } );
  }
}
