import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalGeneratorsComponent } from './coal-generators.component';

describe('CoalGeneratorsComponent', () => {
  let component: CoalGeneratorsComponent;
  let fixture: ComponentFixture<CoalGeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoalGeneratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoalGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
