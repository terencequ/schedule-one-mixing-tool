import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EffectType} from '../../models/effect-type';
import {Effect} from '../../models/effect';
import {EffectsDictionary} from '../../data/effects';
import {NgStyle} from '@angular/common';

/**
 * Show the numerical difference in multiplier from one effect to another.
 */
@Component({
  selector: 'effect-difference',
  imports: [
    NgStyle
  ],
  templateUrl: './effect-difference.component.html',
  styleUrl: './effect-difference.component.scss'
})
export class EffectDifferenceComponent implements OnChanges {
  @Input({required:true})
  fromEffectType!: EffectType;

  @Input({required:true})
  toEffectType!: EffectType;

  fromEffect?: Effect;
  toEffect?: Effect;
  difference: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fromEffectType']) {
      this.fromEffect = EffectsDictionary[this.fromEffectType];
      this.updateDifference();
    }
    if (changes['toEffectType']) {
      this.toEffect = EffectsDictionary[this.toEffectType];
      this.updateDifference();
    }
  }

  updateDifference(){
    this.difference = (this.toEffect?.multiplier ?? 0) - (this.fromEffect?.multiplier ?? 0);
    this.difference = Number(this.difference.toFixed(2));
  }
}
