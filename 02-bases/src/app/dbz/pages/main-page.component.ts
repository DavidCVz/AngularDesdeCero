





import { Component } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { DbzService } from '../services/dbz.service';
import { retry } from 'rxjs';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html'
})

/** Cuando se haga la inyeccion de dependencias, de servicio en este ejemplo,
 * Para poder acceder a los atributos del servicio, se tendrá que obtener a través de un getter
 * que devuelva los datos ya sean
 * 1. Referenciados: En caso de que se tengan que utilizar datos compartidos entre componentes
 * 2. Desestructurados: En casos se tengan que usar los datos de manera independiente
 * de otros componentes o enlaces (Usando el operador spread al devolver los datos)
 *
 */
export class MainPageComponent {
  constructor( private dbzService: DbzService ) {}


  // Metodo para obtener los personajes del servicio (desestructurado)
  get characters(): Character[] {
    return [...this.dbzService.characters];
  }

  // Metodo para capturar el id para la eliminacion de un elemento
  onDeleteCharacter(id: string): void {
    this.dbzService.deleteCharacterById(id);
  }

  // Metodo para capturar los datos para la inserccion de un elemento
  onNewCharacter(character: Character): void {
    this.dbzService.addCharacter(character);
  }
}
