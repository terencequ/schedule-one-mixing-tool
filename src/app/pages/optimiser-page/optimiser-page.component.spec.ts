import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimiserPageComponent } from './optimiser-page.component';

describe('OptimiserPageComponent', () => {
  let component: OptimiserPageComponent;
  let fixture: ComponentFixture<OptimiserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimiserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimiserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
