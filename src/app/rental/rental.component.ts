import { Component, OnInit } from '@angular/core';
import { RentalService } from './shared/rental.service';

@Component({
  selector: 'bwm-rental',
  templateUrl: './rental.component.html',
})
export class RentalComponent {
  constructor(private rentalService: RentalService) {}
}
