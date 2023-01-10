import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ngxIisDefined' })
export class IsDefinedPipe implements PipeTransform {

  transform(input: string): string {
    return input && input.length
      ? input
      : '';
  }
}
