import { Component, Input } from '@angular/core';
import { Gifs } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

  /** Recibe los gifs consultados por el componente 'search-box' a traves del servicio
   * instanciado por el componente padre de ambos, de esta manera se permite que el componente
   * 'CardListComponent' pueda ser reutilizado y no esté estrechamente relacionado al servicio
   */
  @Input()
  public gifsList: Gifs[] = [];
}
