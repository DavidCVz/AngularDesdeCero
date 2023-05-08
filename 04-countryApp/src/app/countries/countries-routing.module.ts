
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

const routes: Routes = [
  {
    path: 'by-capital',
    component: ByCapitalPageComponent
  },
  {
    path: 'by-country',
    component: ByCountryPageComponent
  },
  {
    path: 'by-region',
    component: ByRegionComponent
  },
  {
    path: 'by/:id', // Argumento dinamico que recibira la ruta
    component: CountryPageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), // Se espeficican las rutas definidas anteriormente
  ],
  exports: [
    RouterModule // Se exporta el modulo para ser usado por otros componentes
  ],
})

export class CountriesRoutingModule { }
