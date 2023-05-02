import { NgModule } from "@angular/core";
import { CounterComponent } from "./counter/counter.component";

// Definición de los elementos de un componente
@NgModule({
  declarations: [
    CounterComponent
  ],
  exports: [
    CounterComponent
  ]
})

export class CounterModule {}
