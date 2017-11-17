import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OTPVerificationComponent } from './otpverification.component';

describe('OTPVerificationComponent', () => {
  let component: OTPVerificationComponent;
  let fixture: ComponentFixture<OTPVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OTPVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OTPVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
