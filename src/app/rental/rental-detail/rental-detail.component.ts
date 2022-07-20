import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'bwm-rental-component',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss'],
})
export class RentalDetailComponent {
  rental: Rental = null;
  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // console.log(params);
      // const params = { rentalId: '1' }
      const rentalId: Rental['_id'] = params['rentalId'];

      this.rentalService
        .getRentalById(rentalId)
        .subscribe((rental) => (this.rental = rental));
    });
  }

  // con el accesor "get" puedo bindear en el html la variable local de map.component.ts "location" con la variable  "rentalLocation" de rental-detail.component.ts
  get rentalLocation(): string {
    return `${this.rental.city}, ${this.rental.street}`;
  }
}
