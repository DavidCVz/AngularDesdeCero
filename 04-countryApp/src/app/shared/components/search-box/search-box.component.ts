import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @ViewChild('searchBoxInput')
  public searchBoxInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  public searchTermn():void {
    const inputTermn = this.searchBoxInput.nativeElement.value;

    if(inputTermn === '' || inputTermn === undefined){ return; }
    this.onValue.emit(inputTermn);
  }
}
