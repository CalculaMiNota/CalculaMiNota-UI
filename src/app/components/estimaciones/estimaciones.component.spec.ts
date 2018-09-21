import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimacionesComponent } from './estimaciones.component';

describe('EstimacionesComponent', () => {
  let component: EstimacionesComponent;
  let fixture: ComponentFixture<EstimacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
