import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer = new Subject<string>();
  /** Se define una subscripcion para el 'debouncer' el cual permitira realizar la terminacion
   * de la subscripcion de emiciones cuando el componente sea destruido
   * este se definira como opcional ya que al costruir el objeto, este no sera asignado aun*/
  private debouncerSubscription?: Subscription;

  @ViewChild('searchBoxInput')
  public searchBoxInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  // SE EJECUTABA CUANDO SE PRESIONABA ENTER (Sustituido por Debouncer)
  /* @Output()
  public onValue: EventEmitter<string> = new EventEmitter(); */

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    // Se realiza la subscripcion del debouncer
    this.debouncerSubscription = this.debouncer
      .pipe(
        /** 'debounceTime()' es un operador rxjs que sirve para esperar una siguiente emición
         * del observable 'debouncer' antes de que se continue con el proceso en el tiempo definido (1000)
         * este tiempo se reiniciará cada que el debouncer detecte una siguiente emicion antes del tiempo
        */
        debounceTime(1000)
      )
      .subscribe(value => {
        /** Cada que se termina de procesar las emiciones por medio del debouncer, se emitira el valor
         * hacia componenten padre por medio del @Output onDebounce.
        */

        this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  // EVENTO QUE SE EJECUTABA CUANDO SE PRESIONABA ENTER (Sustituido por Debouncer)
  /* public searchTermn():void {
    const inputTermn = this.searchBoxInput.nativeElement.value;

    if(inputTermn === '' || inputTermn === undefined){ return; }
    this.onValue.emit(inputTermn);
  } */

  // Implementacion de Debouncer
  onKeyPress(searchTerm: string): void{
    /** El metodo 'onKeyPress()' enviara una emicion del 'searchTerm'
     * por medio del debouncer cada vez que se ejecute*/
    this.debouncer.next( searchTerm );
  }
}
