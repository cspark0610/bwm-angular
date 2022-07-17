import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  ViewContainerRef,
  TemplateRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  // segun el nombre en selector, se lo pasa como propiedad dentro del tag html a aplicar
  selector: '[bwmHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input('bwmHighlight') bwmHighlight: string;
  // el: ElementRef;

  constructor(private el: ElementRef) {
    // this.el = el;
  }

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.bwmHighlight;
  }
}

@Directive({ selector: '[bwmNgIf]' })
export class BwmNgIfDirective {
  hasView = false;
  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}

  @Input('bwmNgIf') set bwmNgIf(condition: boolean) {
    if (condition && !this.hasView) {
      this.container.createEmbeddedView(this.template);
      this.hasView = true;
    } else {
      this.container.clear();
      this.hasView = false;
    }
  }
}

@Directive({
  // tendro de la etiqueta se usa *bwmNgFor
  selector: '[bwmNgFor]',
})
export class BwmNgForDirective implements OnChanges {
  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}

  // lo que esta del "lado derecho" del selector lo llamo bwmNgForOf
  @Input('bwmNgForOf') bwmNgForOf: any[];

  ngOnChanges(): void {
    this.bwmNgForOf.forEach((value) => {
      this.container.createEmbeddedView(this.template, {
        $implicit: value,
      });
    });
  }
}
