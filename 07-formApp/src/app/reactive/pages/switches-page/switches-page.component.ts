import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent {

  // Caso donde el Backend devuelve esta informacion
  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  public myForm: FormGroup = this.formBuilder.group({
    gender: [ 'M', Validators.required],
    wantNotifications: [ true, Validators.required ],
    termsAndConditios: [ false, Validators.requiredTrue ]
  });

  constructor(private formBuilder: FormBuilder){}

  onSave(){
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    /** En un caso donde se esten actualizando las preferencias de un usuario desde un formulario,
     * y se quisiera evitar la conexion por referencias entre objetos, (para un DTO final
     * que se mandará al backend por ejemplo. se puede realizar la desestructuracion de los datos
     */

    const { termsAndConditions, ...newPerson} = this.myForm.value;

    this.person = newPerson;
  }

  /** Si luego de interactuar con el elemento, hay errores, devuelve 'true' */
  isValidField(field: string): boolean | null {
    // Si el elemento con nombre 'field' cumple las condiciones
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }
}
