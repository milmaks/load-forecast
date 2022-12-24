import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydroGeneratorsComponent } from './hydro-generators.component';

describe('HydroGeneratorsComponent', () => {
  let component: HydroGeneratorsComponent;
  let fixture: ComponentFixture<HydroGeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HydroGeneratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydroGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
