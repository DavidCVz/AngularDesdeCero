import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region, RegionMapping } from '../../enums/region';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
  ]
})

export class ByRegionComponent implements OnInit {

  public countries: Country[] = [];
  public regionMapping: any = RegionMapping;
  public regions = Object.values(Region).filter( value => typeof value === 'number');
  public selectedRegion?: any;

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStorage.byRegion.region;
    this.countries = this.countriesService.cacheStorage.byRegion.countries;
  }

  searchByRegion(region: any):void{
    this.selectedRegion = region;


    this.countriesService.searchRegion(region)
      .subscribe( countries => {
        this.countries = countries;
      } );
  }
}
