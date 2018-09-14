import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoInicioComponent } from './logo-inicio.component';

describe('LogoInicioComponent', () => {
  let component: LogoInicioComponent;
  let fixture: ComponentFixture<LogoInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
