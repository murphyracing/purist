import {Directive, HostListener, Input, OnDestroy, ElementRef, OnInit} from '@angular/core';
import {TooltipService} from './TooltipService';


@Directive({ selector: '[mrpTooltip]' })
export class TooltipDirective implements OnInit, OnDestroy {
  @Input() tooltipTitle = '';
  private id: string;

  constructor(private tooltipService: TooltipService, private element: ElementRef) { }

  ngOnInit() {
    this.id = String(Math.random());
    this.tooltipService.components.push({
      id: this.id,
      ref: this.element,
      title: this.tooltipTitle
    });
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
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
