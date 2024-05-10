import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyPasswordComponent } from './verfiy-password.component';

describe('VerfiyPasswordComponent', () => {
  let component: VerfiyPasswordComponent;
  let fixture: ComponentFixture<VerfiyPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerfiyPasswordComponent]
    });
    fixture = TestBed.createComponent(VerfiyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
