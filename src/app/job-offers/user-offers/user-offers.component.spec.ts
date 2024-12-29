import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOffersComponent } from './user-offers.component';

describe('UserOffersComponent', () => {
  let component: UserOffersComponent;
  let fixture: ComponentFixture<UserOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOffersComponent]
    });
    fixture = TestBed.createComponent(UserOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
