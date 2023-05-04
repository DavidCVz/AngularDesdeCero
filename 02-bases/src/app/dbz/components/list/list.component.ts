import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  /**El decorador @Input indica que este componente hijo
   * puede recibir argumetos de tipo Character[] con nombre characterList
   */
  @Input()
  public characterList: Character[] = [
    {
      name: 'Trunks',
      power: 10
    }
  ];

  @Output()
  public OnDelete: EventEmitter<string> = new EventEmitter();


  public OnDeleteElement(id?: string): void{
    this.OnDelete.emit(id);
  }
}
