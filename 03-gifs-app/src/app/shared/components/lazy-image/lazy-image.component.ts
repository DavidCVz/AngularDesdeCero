import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public isLoaded: boolean = false;

  ngOnInit(): void{
    if ( !this.url ) throw new Error('URL property is required');

  }

  // Cuando se termina de cargar una imagen, la bandera se vuelve true
  imgLoaded(): void{
    this.isLoaded = true;
  }

}
