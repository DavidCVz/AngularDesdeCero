import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" placeholder="Buscar gifs..." id=""
      class="form-control" #txtTagInput
      (keyup.enter)="searchTag()">
  `
})
export class SearchBoxComponent {

  constructor(public gifsService: GifsService){}

  /**El decorador ViewChild(), permite obtener un elemento html local basado en el tipo de
   * selector que se indique, para este caso, el nombre de la etiqueta del elemento html.
   * Debido a que ElementRef<HTMLInputElement> puede ser nulo con el operador '!' del tagInput
   * define que siempre existira un valor y/o componente con esa referencia.
   */
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  /**Habiendo definido el ViewChild, se obtiene el valor del elemeto html al que se hace referencia*/
  public searchTag(): void{
    const newTag = this.tagInput.nativeElement.value;

    if(newTag === '' || newTag === undefined){ return; }
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
