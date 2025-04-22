import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EffectType} from '../../models/effect-type';
import {Effect} from '../../models/effect';
import {EffectsDictionary} from '../../data/effects';
import {NgIf, NgStyle} from '@angular/common';
import {MatBadge} from '@angular/material/badge';

/**
 * Display an effect as a compact chip.
 */
@Component({
  selector: 'effect-chip',
  imports: [
    NgStyle,
    NgIf,
  ],
  templateUrl: './effect-chip.component.html',
  styleUrl: './effect-chip.component.scss'
})
export class EffectChipComponent implements OnChanges {
  @Input({required: true})
  effectType!: EffectType;

  @Input()
  includeMultiplier: boolean = false;

  effect?: Effect;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["effectType"]) {
      this.effect = EffectsDictionary[this.effectType];
    }
  }
}
