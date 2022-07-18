import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

// two way data binding
// primero ponerlo como provider dentro de rental.module.ts y luego inyectarlo en el componente rental.component.ts
@Injectable()
export class RentalService {
  constructor(private http: HttpClient) {}

  // simulate a async server call with setTimeout, using Observables
  getRentals(): Observable<Rental[]> {
    // return new Observable((observer) => {
    //   setTimeout(() => observer.next(this.rentals), 1000);
    // });
    return this.http.get<Rental[]>('/api/v1/rentals');
    // hago la peticion desde un MISMO DOMINIO localhost:4200/api, para no tener error de CORS y luego aplico el proxy seteado en el proxy.config.json
  }

  getRentalById(id: string): Observable<Rental> {
    // return new Observable((observer) => {
    //   const foundRental = this.rentals.find((rental) => rental._id === id);
    //   setTimeout(() => observer.next(foundRental), 1000);
    // });
    return this.http.get<Rental>(`/api/v1/rentals/${id}`);
  }
}
