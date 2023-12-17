import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedComponent } from './mapped.component';

describe('MappedComponent', () => {
  let component: MappedComponent;
  let fixture: ComponentFixture<MappedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MappedComponent]
    });
    fixture = TestBed.createComponent(MappedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
