import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveCodeComponent } from './have-code.component';

describe('HaveCodeComponent', () => {
  let component: HaveCodeComponent;
  let fixture: ComponentFixture<HaveCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HaveCodeComponent]
    });
    fixture = TestBed.createComponent(HaveCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
