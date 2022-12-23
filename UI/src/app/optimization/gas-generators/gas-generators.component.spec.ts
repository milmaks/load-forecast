import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasGeneratorsComponent } from './gas-generators.component';

describe('GasGeneratorsComponent', () => {
  let component: GasGeneratorsComponent;
  let fixture: ComponentFixture<GasGeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasGeneratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GasGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
