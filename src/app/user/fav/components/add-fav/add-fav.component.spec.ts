import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavComponent } from './add-fav.component';

describe('AddFavComponent', () => {
  let component: AddFavComponent;
  let fixture: ComponentFixture<AddFavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFavComponent]
    });
    fixture = TestBed.createComponent(AddFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
