import { Component } from '@angular/core';

/**En caso de que el componente contenga pocas lineas de codigo Html, 4 o 5 dentro de las buenas practicas
 * se podra utilizar directamente en la definicion de la propiedad template
 * En caso de que sean mas lineas, se deberá utilizar un documento Html aparte.
 */
@Component({
  selector: 'app-counter',
  template: `
  <h2>Contador: {{counter}}</h2>
  <button (click)="increaseBy(1)">Increase +1</button>
  <button (click)="reset()">Reset</button>
  <button (click)="increaseBy(-1)">Decrease -1</button>
  `,
})

export class CounterComponent{
  public counter: number = 10;

  public increaseBy(value: number): void{
    this.counter += value;
  }

  public reset(): void{
    this.counter = 10;
  }
}
