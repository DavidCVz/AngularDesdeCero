import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

@Injectable({providedIn: 'root'})

export class DbzService {

  /**Elementos de tipo Character definidos en un componente padre */
  public characters: Character[] = [
    {
      id: uuid(),
      name: 'Krillin',
      power: 1000
    },
    {
      id: uuid(),
      name: 'Goku',
      power: 9500
    },
    {
      id: uuid(),
      name: 'Vegeta',
      power: 8000
    }
  ];

  addCharacter(character: Character): void{
    console.log('Recibe emicion de componente hijo');
    console.log(character);

    /** Cuando se utiliza el operador Spread en la creacion de un objeto a partir de los datos
     * de otro que comparten el mismo tipo, dichos datos seran copiados a la nueva instancia
     */
    const newCharacter: Character = {id: uuid(), ...character}

    /* FORMA 2
      const newCharacter: Character = {
      id: uuid(),
      name: character.name,
      power: character.power
    } */
    this.characters.push(newCharacter);
  }

  /* onDeleteCharacter(index: number): void{
    this.characters.splice(index, 1);
  } */

  deleteCharacterById(id: string){
    this.characters = this.characters.filter( character => character.id !== id);
  }
}
