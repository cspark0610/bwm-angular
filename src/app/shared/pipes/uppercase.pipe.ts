import { Pipe, PipeTransform } from '@angular/core';

// with name declarated in the pipe, we can use it in the template html with " | " operator
@Pipe({
  name: 'firstUpperLetter',
})
export class FirstUpperLetterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    return value
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }
}
