import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule // Se importa para poder acceder a las rutas
  ],
  exports: [
    SideMenuComponent
  ]
})
export class SharedModule { }
