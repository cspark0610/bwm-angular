// CommonModule: para poder usar las directivas , ej *ngFor, *ngIf
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { RentalComponent } from './rental.component';
import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalCardComponent } from '../shared/rental-card/rental-card.component';
// Pipes
import { FirstUpperLetterPipe } from '../shared/pipes/uppercase.pipe';
// Directives
import {
  HighlightDirective,
  BwmNgIfDirective,
} from '../shared/directives/custom.directive';
// Services
import { RentalService } from './shared/rental.service';
import { BwmNgForDirective } from '../shared/directives/custom.directive';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListingComponent },
      { path: ':rentalId', component: RentalDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [
    RentalComponent,
    RentalDetailComponent,
    RentalListingComponent,
    RentalCardComponent,
    FirstUpperLetterPipe,
    HighlightDirective,
    BwmNgIfDirective,
    BwmNgForDirective,
  ],
  providers: [RentalService],
  exports: [],
})
export class RentalModule {}
