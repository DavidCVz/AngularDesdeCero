import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";


@Injectable({providedIn: 'root'})

  export class ValidatorsService {

    // Patron que solo admite dos palabras
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  /** Se recibe un FormControl
   * El input o elemento de la vista el cual se validará está asociado a un FormControl.
   * Esta validacion es considerada como SINCRONA, ya que no se resuelve ningun
   * Observable o Promesa
   */
  public cantBeStrider = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    // En caso de no pasar la validacion debe regresarse un objeto con el error
    if (value === 'strider') {
      return {
        noStrider: true
      }
    }

    // En caso de se pase la validacion, se regresará 'null'
    return null;
  }

  /** Si luego de interactuar con el elemento, hay errores, devuelve 'true' */
  isValidField(form: FormGroup, field: string): boolean | null {
    // Si el elemento con nombre 'field' cumple las condiciones
    return form.controls[field].errors && form.controls[field].touched;
  }

  // Caso donde se tenga que evaluar si dos campos son iguales
  isFieldOneEquealsFieldTwo(field1: string, field2: string){

    /** Se debe de retornar las validaciones a traves de una funcion
     * 'ValidationErrors | null' Si es un proceso sincrono
     * 'Promise<ValidationErrors | null> | Observable<ValidationErrors | null>' En caso
     *    de ser un proceso asincrono
     *
     * Debido a que a la hora de hacer la instancia de este metodo, se espera que se proporcionen
     * los dos campos o 'FormControls' de un 'FormGroup', entonces se tendrá acceso a este grupo
     * y a partir de el se realizarán las validaciones de comparativa correspondientes
    */
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      // Obteniendo los valores del 'FormGroup'
      const fieldValue1 = formGroup.get(field1)?.value; //  ? en caso de ser necesario
      const fieldValue2 = formGroup.get(field2)?.value; //  ? en caso de ser necesario

      // Si los valores no son iguales
      if (fieldValue1 !== fieldValue2) {

        // Para establecer el error EN EL CAMPO que no cumple con la regla
        formGroup.get(field2)?.setErrors({fieldNotEqual: true});

        // Retorna el error de la validacion general de ambos campos
        return { notEqual: true }

      }else{
        // En caso de que ambos campos sean iguales, se limpian los errores
        formGroup.get(field2)?.setErrors(null);

        /* EJEMPLO DONDE SE ELIMINA UN SOLO ERROR UNICO
        if( formGroup.get(campo2)?.hasError('noIguales') ) {
          delete formGroup.get(campo2)?.errors?.["noIguales"];
          formGroup.get(campo2)?.updateValueAndValidity();
        }
         */
        return null;
      }
    }
  }

}
