import {Component} from '@angular/core';
import {TooltipService} from './TooltipService';


@Component({
  selector: 'mrp-tooltip-container',
  template: `
    <div class="tooltip-container">
      <mrp-tooltip-content
        *ngFor="let tooltip of tooltipService.components"
        [tooltipTitle]="tooltip.title"
        [tooltipRef]="tooltip.ref">
      </mrp-tooltip-content>
    </div>
  `})
export class TooltipContainerComponent {
  constructor(private tooltipService: TooltipService) { }
}
