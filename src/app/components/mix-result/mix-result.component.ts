import {Component, Input} from '@angular/core';
import {MixResult} from '../../models/mix-result';
import {NgForOf, NgIf} from '@angular/common';
import {MatCard, MatCardContent} from '@angular/material/card';
import {EffectChipComponent} from '../effect-chip/effect-chip.component';

@Component({
  selector: 'mix-result',
  imports: [
    NgIf,
    MatCard,
    MatCardContent,
    EffectChipComponent,
    NgForOf
  ],
  templateUrl: './mix-result.component.html',
  styleUrl: './mix-result.component.scss'
})
export class MixResultComponent {
  @Input()
  mixResult?: MixResult;
}
