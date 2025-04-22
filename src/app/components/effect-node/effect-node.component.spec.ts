import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectNodeComponent } from './effect-node.component';

describe('EffectNodeComponent', () => {
  let component: EffectNodeComponent;
  let fixture: ComponentFixture<EffectNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffectNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
