import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],

    /** Arreglo de FormControls que contiene un grupo de validaciones para Inputs o elementos con
     * sus propias reglas. Esto puede servir para casos donde en base a un numero de elementos
     * los cuales pueden ser dinamicos (que devuelva el backend por ejemplo), se cree un numero
     * determinado de valores predeterminados y validaciones para cada uno.
     */
    favoriteGames: this.formBuilder.array([
      // FormControl interno
      ['Metal Gear', Validators.required],
      // FormControl interno
      ['Death Stranding', Validators.required]
    ])
  });

  /* FormControl que estará asociado a un nuevo elemento, se enlaza en la vista de la misma
  manera en la que se enlazaría una propiedad primitiva*/
  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder) {}

  get favoriteGames() {
    /** Debido a que 'myForm.get' devuelve un 'any' hay que indicar que tipo
     * de objeto se esta devolviendo segun nuestras necesidades.
     */
    return this.myForm.get('favoriteGames') as FormArray;
  }

  /** Si luego de interactuar con el elemento, hay errores, devuelve 'true' */
  isValidField(field: string): boolean | null {
    // Si el elemento con nombre 'field' cumple las condiciones
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  /** Arreglo de elementos de tipo FormControl | Indice del elemento dentro del arreglo */
  isValidFieldInArray(formArray: FormArray, index: number){
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
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

  onAddToFavorites():void {

    if (this.newFavorite.invalid) { return; }

    // Se obtiene el valor del input
    const newGame = this.newFavorite.value;

    // Se agrega el FormControl al arreglo, utilizando el formBuilder
    this.favoriteGames.push(
      this.formBuilder.control( newGame, Validators.required )
    );

    // Resetea el campo del formulario
    this.newFavorite.reset();
  }

  // Elimina el elemento del FormArray y este se actualiza en la vista automaticamente
  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void{

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    // Se resetea el arreglo a uno vacio usando el FormBuilder
    (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();

  }
}
