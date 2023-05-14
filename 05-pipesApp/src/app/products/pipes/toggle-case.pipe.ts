import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase'
})

/** Un PIPE para que funcione, debe de ser declarado en el modulo */
export class ToggleCasePipe implements PipeTransform {

  /**  Implementa el metodo transform para tomar el valor
   * El primer argumento es el valor al cual se está aplicando el pipe
   * El resto de los argumentos son los parametros que aplicarán
   * las modificaciones del valor entrante.
  */
  transform(value: string, toUpper: boolean = false): string {
    return (toUpper)
      ? value.toUpperCase()
      : value.toLowerCase();
  }
}
