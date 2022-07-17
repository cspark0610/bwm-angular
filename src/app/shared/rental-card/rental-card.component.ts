import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Rental } from 'src/app/rental/shared/rental.model';

@Component({
  selector: 'bwm-rental-card',
  templateUrl: './rental-card.component.html',
  styleUrls: ['./rental-card.component.scss'],
})
export class RentalCardComponent {
  // usar este decorador para property-binding, pasar props del parent al child
  @Input('rental') rental: Rental;
}
