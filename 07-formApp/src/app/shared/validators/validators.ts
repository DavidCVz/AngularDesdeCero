import { FormControl, ValidationErrors } from "@angular/forms";

  // Patron que solo admite dos palabras
  export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  /** Se recibe un FormControl
   * El input o elemento de la vista el cual se validará está asociado a un FormControl.
   * Esta validacion es considerada como SINCRONA, ya que no se resuelve ningun
   * Observable o Promesa
   */
  export const cantBeStrider = (control: FormControl): ValidationErrors | null => {

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
