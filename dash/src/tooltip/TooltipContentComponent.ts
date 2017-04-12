import {AfterViewInit, ChangeDetectorRef, Component, HostListener, Input} from '@angular/core';


@Component({
  selector: 'mrp-tooltip-content',
  template: `
    <div 
      class="mrp-tooltip" 
      [style.display]="block"
      [style.top]="top + 'px'"
      [style.left]="left + 'px'"
      [style.position]="fixed"
      [style.z-index]="1"
      role="tooltip"
      [innerHTML]="tooltipTitle">
    </div>
  `
})
export class TooltipContentComponent implements AfterViewInit {

  private top: number;
  private left: number;

  @Input() tooltipTitle: string;
  @Input() tooltipRef: any;

  constructor (private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const targetPos = TooltipContentComponent.offset(this.tooltipRef.nativeElement);
    this.top = targetPos.top;
    this.left = targetPos.left;
    console.log(targetPos);
    this.cdr.detectChanges();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
  }

  private static position(ref: HTMLElement): { width: number, height: number, top: number, left: number } {
    let offsetParentBCR = { top: 0, left: 0 };
    const elBCR = TooltipContentComponent.offset(ref);
    const offsetParentEl = TooltipContentComponent.parentOffsetEl(ref);
    if (offsetParentEl !== window.document) {
      offsetParentBCR = TooltipContentComponent.offset(offsetParentEl);
      offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
      offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
    }

    const clientBounds = ref.getBoundingClientRect();
    return {
      width: clientBounds.width || ref.offsetWidth,
      height: clientBounds.height || ref.offsetHeight,
      top: elBCR.top - offsetParentBCR.top,
      left: elBCR.left - offsetParentBCR.left
    };
  }
  private static offset(ref: any): { width: number, height: number, top: number, left: number } {
    const clientBounds = ref.getBoundingClientRect();
    return {
      width: clientBounds.width || ref.offsetWidth,
      height: clientBounds.height || ref.offsetHeight,
      top: clientBounds.top + (window.pageYOffset || window.document.documentElement.scrollTop),
      left: clientBounds.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
    };
  }
  private static parentOffsetEl(ref: HTMLElement): any {
    let offsetParent: any = ref.offsetParent || window.document;
    while (offsetParent && offsetParent !== window.document) {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || window.document;
  }
}
