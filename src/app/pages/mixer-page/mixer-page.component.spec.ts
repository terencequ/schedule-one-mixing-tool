import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixerPageComponent } from './mixer-page.component';

describe('MixerPageComponent', () => {
  let component: MixerPageComponent;
  let fixture: ComponentFixture<MixerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
