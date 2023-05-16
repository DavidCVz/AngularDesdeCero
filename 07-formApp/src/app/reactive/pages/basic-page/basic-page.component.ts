import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent {

  /** NOTA: Para poder usar las directivas para los formularios html se debe
   * de importar el modulo 'ReactiveFormsModule' en los imports de cada
   * modulo donde se vaya a usar.
   */

  // FORMA 1. CREACION CON FORM TRADICIONAL
  /* public myForm: FormGroup = new FormGroup({
    /// Valor por defecto | Validaciones sincronas | Validaciones Asincronas
    name: new FormControl('', [], []),
    price: new FormControl(0, [], []),
    inStorage: new FormControl(0, [], [])
  }); */

  // FORMA 2. CREACION CON FORM BUILDER
  /** Esta es una forma mas simplificada, permite no andar repitiendo los 'FormControl'
   * para cada propiedad
  */
  public myForm: FormGroup = this.formBuilder.group({
    /// Valor inicial | Validaciones sincronas | Validaciones Asincronas
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(0)], []],
    inStorage: [0, [Validators.required, Validators.min(0)], []],
  });

  constructor(private formBuilder: FormBuilder){}


  // Obtener la informacion luego de disparar un Submit en el formulario
  onSave(): void{
    console.log(this.myForm.value);
  }
}
