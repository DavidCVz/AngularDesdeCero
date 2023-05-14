import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFlyCase'
})

export class canFlyCasePipe implements PipeTransform {

  transform(value: boolean): string {
    return (value) ? 'Vuela' : 'No vuela';
  }
}
