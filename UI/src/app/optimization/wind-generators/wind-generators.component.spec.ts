import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindGeneratorsComponent } from './wind-generators.component';

describe('WindGeneratorsComponent', () => {
  let component: WindGeneratorsComponent;
  let fixture: ComponentFixture<WindGeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindGeneratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
