import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarGeneratorsComponent } from './solar-generators.component';

describe('SolarGeneratorsComponent', () => {
  let component: SolarGeneratorsComponent;
  let fixture: ComponentFixture<SolarGeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarGeneratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolarGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
