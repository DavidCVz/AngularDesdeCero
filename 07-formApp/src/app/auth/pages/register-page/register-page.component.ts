import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Nombre personalizado de los validators */
//import * as customValidators from 'src/app/shared/validators/validators';

import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
})

export class RegisterPageComponent {

  public myForm: FormGroup = this.formBuilder.group({

    /** Para casos donde se tenga que realizar la validacion de algun elemento
     * a traves de un patron, debe de usarse el metodo 'pattern' y enviar el string
     * de la expresion regular personalizada */
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],

    /** 'new EmailValidator': Para un 'validator' asincrono personalizado en donde
     *    se realiza 1 o pocas instancias del mismo
     *  'this.emailValidator' Para un 'validator' asincrono personalizado en donde
     *    se tengan muchas mas instancias del validador (mejor en performance)
     * */
/*     email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidator]],
 */    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],

    /** Para las validaciones personalizadas, solo se pasa la referencia de la funcion
     * esta no se invoca*/
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]],
  }, {

    /** Dentro de este segundo argumento del 'formBuilder.group', la propiedad 'validators',
     * tendrá acceso a todas los 'FormControl' anteriores (name, email, username, etc.) */
    validators: [
      this.validatorsService.isFieldOneEquealsFieldTwo('password', 'passwordConfirm') // Recibe los nombres
    ]
  });

  constructor(private formBuilder: FormBuilder,
              private validatorsService: ValidatorsService,
              private emailValidator: EmailValidator){}

  // Se delega la funcionalidad al servicio
  isValidField( field: string){
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
