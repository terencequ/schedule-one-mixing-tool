import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixResultComponent } from './mix-result.component';

describe('MixResultComponent', () => {
  let component: MixResultComponent;
  let fixture: ComponentFixture<MixResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
