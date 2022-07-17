import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// modules
import { RentalModule } from './rental/rental.module';
// components
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, RentalModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
