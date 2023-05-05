import { Component, EventEmitter, Output } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  // Inyeccion de servicio
  constructor(private gifsService: GifsService){}

  // Getter personalizado que devuelve el hisotorial de busqueda del usuario
  get tagsHistory(): string[]{
    return this.gifsService.tagsHistory;
  }

  public selectedTag(tag: string): void{
    this.gifsService.searchTag(tag);
  }
}
