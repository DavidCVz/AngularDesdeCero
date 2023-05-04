import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  // Retorna el historial de busquedas o inputs del usuario
  get tagsHistory(){
    return [...this._tagsHistory];
  }


  // Mueve la busqueda actual al inicio del historial
  private organizeHistory(tag: string): void{
    // Convierte a minusculas para determinar si el texto ya ha sido introducido
    tag = tag.toLowerCase();

    // Si la busqueda coincide con una busqueda ya registrada en el historial
    if(this.tagsHistory.includes(tag)){

      // Solo aquellos elementos que no coincidan con la busqueda entrante se incluiran en el historial
      this._tagsHistory = this._tagsHistory.filter( (currentTag) => currentTag !== tag );
    }

    // Inserta busqueda actual al inicio del hisotorial
    this._tagsHistory.unshift(tag);

    /** Se limita unicamente a 10 elementos en el historial para evitar un desbordamiento en la vista */
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  // Agregar el valor capturado al inicio del historial de busquedas del usuario
  public searchTag(tag: string): void{

    this.organizeHistory(tag);
  }
}
