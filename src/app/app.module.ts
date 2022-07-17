import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// modules
import { RentalModule } from './rental/rental.module';
// components
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, RentalModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
