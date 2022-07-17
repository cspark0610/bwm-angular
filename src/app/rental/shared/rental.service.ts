import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

// two way data binding
// primero ponerlo como provider dentro de rental.module.ts y luego inyectarlo en el componente rental.component.ts
@Injectable()
export class RentalService {
  rentals: Rental[] = [
    {
      _id: '1',
      title: 'Central Apartment',
      city: 'New York',
      street: 'Times Sqaure',
      category: 'apartment',
      image: 'http://via.placeholder.com/300x200',
      numOfRooms: 3,
      description: 'Very nice apartment',
      dailyPrice: 100,
      shared: false,
      createdAt: '24/12/2017',
    },
    {
      _id: '2',
      title: 'San Frnacisco Apartment 2',
      city: 'San Francisco',
      street: 'Times Sqaure',
      category: 'apartment',
      image: 'http://via.placeholder.com/300x200',
      numOfRooms: 3,
      description: 'Very nice apartment',
      dailyPrice: 100,
      shared: false,
      createdAt: '24/12/2017',
    },
    {
      _id: '3',
      title: 'Berlin Central Apartment 3',
      city: 'Berlin',
      street: 'Times Sqaure',
      category: 'apartment',
      image: 'http://via.placeholder.com/300x200',
      numOfRooms: 3,
      description: 'Very nice apartment',
      dailyPrice: 100,
      shared: false,
      createdAt: '24/12/2017',
    },
    {
      _id: '4',
      title: 'Madrid Central Apartment 4',
      city: 'Madrid',
      street: 'Times Sqaure',
      category: 'house',
      image: 'http://via.placeholder.com/300x200',
      numOfRooms: 3,
      description: 'Very nice apartment',
      dailyPrice: 100,
      shared: false,
      createdAt: '24/12/2017',
    },
  ];
  constructor() {}

  // simulate a async server call with setTimeout, using Observables
  getRentals(): Observable<Rental[]> {
    return new Observable((observer) => {
      setTimeout(() => observer.next(this.rentals), 1000);
    });
  }

  getRentalById(id: string): Observable<Rental> {
    return new Observable((observer) => {
      const foundRental = this.rentals.find((rental) => rental._id === id);
      setTimeout(() => observer.next(foundRental), 1000);
    });
  }
}
