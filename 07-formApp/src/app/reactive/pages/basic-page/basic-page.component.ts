import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Caso donde el backend devuelve el siguiente objeto:
const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{

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

  ngOnInit(): void {
    /* En un caso donde se quiera establecer los valores iniciales del
    formulario a traves de una respuesta del back antes de cargar el
    componente, se puede pasar esa respuesta al reset siempre y cuando los keys
    del objeto que se receba coincidan con los keys del formulario*/
    //this.myForm.reset(rtx5090);
  }

  /** Si luego de interactuar con el elemento, hay errores, devuelve 'true' */
  isValidField(field: string): boolean | null {
    //
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string): string | null{

    /* Si no existe el elemento, devuelve null */
    if ( !this.myForm.controls[field] ) { return null }

    /** Si hay errores se almacenaran en la variable, sino quedará como un
     * objeto vacio*/
    const errors = this.myForm.controls[field].errors || {}

    /** Se recorre el objeto con los errores, si un error cae en un caso
     * entonce se devolverá el mensaje
     */
    for (const key of Object.keys(errors)){
      switch( key ){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength} caracters`;
      }
    }
    return null;
  }

  // Obtener la informacion luego de disparar un Submit en el formulario
  onSave(): void{
    if (this.myForm.invalid) {
      /** En casos donde se desee disparar o ejecutar ciertas acciones o errores
       * sobre el formulario cuando se trata de enviar un formulario en vacio por ejemplo,
       * se puede utilizar los metodos de tipo 'markAll' del objeto de tipo 'FormGroup'
      */
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    /* 'reset' reestablece los valores de los elementos del formulario a traves de
    las keys que se pasen como argumentos del metodo, estos valores serán tomados
    por el formulario, siempre y cuando hagan march con los nombres correctamente */
    this.myForm.reset({
      name: '',
      price: 10,
      inStorage: 50
    });
  }
}
