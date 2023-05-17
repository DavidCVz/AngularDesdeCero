import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Nombre personalizado de los validators */
import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
})

export class RegisterPageComponent {

  public myForm: FormGroup = this.formBuilder.group({

    /** Para casos donde se tenga que realizar la validacion de algun elemento
     * a traves de un patron, debe de usarse el metodo 'pattern' y enviar el string
     * de la expresion regular personalizada */
    name: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],

    /** Para las validaciones personalizadas, solo se pasa la referencia de la funcion
     * esta no se invoca*/
    username: ['', [Validators.required, customValidators.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder){}

  isValidField( field: string){
    // TODO: Obtener validacion desde un servicio
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
