import {Directive, HostListener, Input, OnDestroy, ElementRef} from '@angular/core';
import {TooltipService} from './TooltipService';


@Directive({ selector: '[mrpTooltip]' })
export class TooltipDirective implements OnDestroy {
  @Input() tooltipTitle = '';
  private id: string;

  constructor(private tooltipService: TooltipService, private element: ElementRef) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.id = String(Math.random());
    this.tooltipService.components.push({
      id: this.id,
      ref: this.element,
      title: this.tooltipTitle
    });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    const idx = this.tooltipService.components.findIndex((t) => {
      return t.id === this.id;
    });

    this.tooltipService.components.splice(idx, 1);
  }

}
