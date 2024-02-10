import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeviewComponent } from './freeview.component';

describe('FreeviewComponent', () => {
  let component: FreeviewComponent;
  let fixture: ComponentFixture<FreeviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreeviewComponent]
    });
    fixture = TestBed.createComponent(FreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
