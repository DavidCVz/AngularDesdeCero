import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region, RegionMapping } from '../../enums/region';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
  ]
})

export class ByRegionComponent {

  public countries: Country[] = [];
  public regionMapping: any = RegionMapping;
  public regions = Object.values(Region).filter( value => typeof value === 'number');
  public selectedRegion?: any;

  constructor(private countriesService: CountriesService){}

  searchByRegion(region: any):void{
    this.selectedRegion = region;


    this.countriesService.searchRegion(region)
      .subscribe( countries => {
        this.countries = countries;
      } );
  }
}
