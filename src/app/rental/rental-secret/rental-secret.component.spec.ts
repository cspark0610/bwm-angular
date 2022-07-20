import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalSecretComponent } from './rental-secret.component';

describe('RentalSecretComponent', () => {
  let component: RentalSecretComponent;
  let fixture: ComponentFixture<RentalSecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalSecretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
