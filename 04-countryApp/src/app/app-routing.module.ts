import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { AboutPageComponent } from './shared/components/about-page/about-page.component';
import { ContactPageComponent } from './shared/components/contact-page/contact-page.component';

/// CONFIGURACION BASICA DE UN ROUTER (RUTAS RAIZ O PRINCIPALES)

// Contiene las rutas y la defincion de componentes para cada una
const routes: Routes = [
  {
    path: 'home', // Nombre de ruta
    component: HomePageComponent // Componente correspondiente
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: '**', // Si se intenta acceder a la URL raiz
    redirectTo: 'home' // Redireccionará a la ruta home
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ), // '.forRoot' hace referencia al routing principal
  ],
  exports: [
    RouterModule // Se exporta el modulo para que sea visible por otros componentes
  ]
})
export class AppRoutingModule { }
