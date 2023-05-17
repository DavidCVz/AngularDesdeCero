import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

/** Para que una clase pueda ser un validadodr asinctrono debe de implementar
 * el AsyncValidator junto con sus metodos 'Validate'
 */
@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator{

  /** DESCRIPCION DE LA FIRMA:
   * - AbstractControl: Representa un control abstracto para formularios,
   *   ejemplo FormControl, FormArray, etc. de esta manera abarca varios componentes
   * - Promise: Debe de ser una promesa que devuelve 'ValidationErrors' ó 'null'
   * - Observable: O tambien puede ser un Observable que retorna lo mismo
   */
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    // Tomdando en cuenta que se aplica sobre un campo que contiene un email, se obtiene el valor
    const email = control.value;

    /** Ejemplo de un observable que representa una entidad a la cual nos suscribimos
     * para tomar y emitir informacion, por ejemplo el resultado una peticion HTTP
     */
    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {

      console.log({email});

      if ( email === 'correo@yaexistente.com' ) {
        /** Si se realiza una validacion que deberia de retornar un error */
        subscriber.next( {emailTaken: true} );
        // Se indica que ya no se recibiran mas valores y se realizara el termino y desubscripcion
        subscriber.complete();
      }

      // En caso de que el correo este disponible, esto es, no hay error, se devuelve null
      subscriber.next(null);
      subscriber.complete();
    })
    .pipe(
      delay(3000)
    );

    /** En caso de que no haya error, retorna 'null' */
    return httpCallObservable;
  }

  /** DESCRIPCION DE LA FIRMA:
   * - AbstractControl: Representa un control abstracto para formularios,
   *   ejemplo FormControl, FormArray, etc. de esta manera abarca varios componentes
   * - Promise: Debe de ser una promesa que devuelve 'ValidationErrors' ó 'null'
   * - Observable: O tambien puede ser un Observable que retorna lo mismo
   */
  /* validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    /// Tomdando en cuenta que se aplica sobre un campo que contiene un email, se obtiene el valor
    const email = control.value;
    console.log({email});

    /// Simula si un correo ya existe
    return of({
      emailTaken: true
    }).pipe(
      delay(2000) // Simula una peticion http o otro proceso que sea asincrono
    );

    ///Ejemplo de una peticion HTTP que en vase al resultado devuelve 'null' o el error
    return this.http.get<any[]>(`http://midominio.com/users?q=${ email }`
      .pipe(
        .map( resp => {
          return (resp.length === 0) ? null : { emailTaken: true}
        })
      );

  } */

}
