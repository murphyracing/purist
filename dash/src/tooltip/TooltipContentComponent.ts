import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input} from '@angular/core';


@Component({
  selector: 'mrp-tooltip-content',
  template: `
    <div 
      class="mrp-tooltip"
      [class.in]="isIn"
      [class.fade]="isFade"
      role="tooltip"
      [style.top]="top + 'px'"
      [style.left]="left + 'px'"
      [innerHTML]="tooltipTitle">
    </div>
  `,
  styleUrls: ['TooltipContentComponent.css']
})
export class TooltipContentComponent implements AfterViewInit {

  private top: number;
  private left: number;
  private isIn = false;
  private isFade = false;

  @Input() tooltipTitle: string;
  @Input() tooltipRef: any;
  @Input() animation = true;

  constructor (private element: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.show();
    this.cdr.detectChanges();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
  }

  show(): void {
    console.log(this.tooltipRef.nativeElement);
    const position = TooltipContentComponent.calculatePos(
      this.tooltipRef.nativeElement, this.element.nativeElement.children[0], 'bottom'
    );
    console.log(position);
    this.top = position.top;
    this.left = position.left;
    this.isIn = true;
    if (this.animation) {
      this.isFade = true;
    }
  }

  hide(): void {
    this.isIn = true;
    if (this.animation) {
      this.isFade = false;
    }
  }

  private static calculatePos(
    target: HTMLElement,
    tooltip: HTMLElement,
    positionStr: string,
    appendToBody: boolean = false): { top: number, left: number } {

    const positionStrParts = positionStr.split('-');
    const pos0 = positionStrParts[0];
    const pos1 = positionStrParts[1] || 'center';
    const hostElPos = appendToBody ? this.offset(target) : this.position(target);
    const targetElWidth = tooltip.offsetWidth;
    const targetElHeight = tooltip.offsetHeight;
    const shiftWidth: any = {
      center: function (): number {
        return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
      },
      left: function (): number {
        return hostElPos.left;
      },
      right: function (): number {
        return hostElPos.left + hostElPos.width;
      }
    };

    const shiftHeight: any = {
      center: function (): number {
        return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
      },
      top: function (): number {
        return hostElPos.top;
      },
      bottom: function (): number {
        return hostElPos.top + hostElPos.height;
      }
    };

    let targetElPos: { top: number, left: number };
    switch (pos0) {
      case 'right':
        targetElPos = {
          top: shiftHeight[pos1](),
          left: shiftWidth[pos0]()
        };
        break;

      case 'left':
        targetElPos = {
          top: shiftHeight[pos1](),
          left: hostElPos.left - targetElWidth
        };
        break;

      case 'bottom':
        targetElPos = {
          top: shiftHeight[pos0](),
          left: shiftWidth[pos1]()
        };
        break;

      default:
        targetElPos = {
          top: hostElPos.top - targetElHeight,
          left: shiftWidth[pos1]()
        };
        break;
    }

    return targetElPos;
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
