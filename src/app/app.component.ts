import { Component } from '@angular/core';
//import { AppDecorator } from './decorators';

//@AppDecorator({ message: 'Hello world!!!' })
@Component({
  selector: 'bwm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public counter = 0;

  public incrementCounter(event: any, incrementor: number): void {
    this.counter += incrementor;
  }
  public decrementCounter(event: any, decrementor: number): void {
    this.counter -= decrementor;
  }
}
