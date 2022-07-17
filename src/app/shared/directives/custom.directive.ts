// create a custom directive, ponerlo en el array de declarations en rental.module.ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  // segun el nombre en selector, se lo pasa como propiedad dentro del tag html a aplicar
  selector: '[bwmHighlight]',
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    //alert(JSON.stringify(el.nativeElement));
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
