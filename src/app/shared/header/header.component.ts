import { Component, Input } from '@angular/core';

@Component({
  selector: 'bwm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  //public customNumber: number = 10;
  @Input('isAuthenticated') isAuthenticated: boolean = false;
  @Input('username') username: string = '';
  @Input('logout') logout = () => {};
}
