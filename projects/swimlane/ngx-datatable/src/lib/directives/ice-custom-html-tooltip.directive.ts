import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { CustomToolTipComponent } from '../components/ice-custom-tooltip/ice-custom-tooltip.component';

@Directive({
  selector: '[iceCustomHtmlToolTip]'
})
export class ToolTipRendererDirective implements OnDestroy, OnInit {
  @Input() iceTooltipHtmlText: string;
  @Input() showToolTip = true;
  @Input() showToolTipOnTextOverflow = false;
  @Input() duration = 0;

  private _overlayRef: OverlayRef;
  private timeout: any;

  constructor(
    private _overlay: Overlay,
    private _overlayPositionBuilder: OverlayPositionBuilder,
    private _elementRef: ElementRef
  ) {}

  ngOnInit() {
    const positionStrategy = this._overlayPositionBuilder.flexibleConnectedTo(this._elementRef).withPositions([
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: -5
      }
    ]);

    this._overlayRef = this._overlay.create({ positionStrategy });
  }

  @HostListener('mouseenter')
  show() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (
      (this.showToolTipOnTextOverflow &&
        this._elementRef.nativeElement.offsetWidth < this._elementRef.nativeElement.scrollWidth) ||
      this.showToolTip
    ) {
      if (this._overlayRef && !this._overlayRef.hasAttached()) {
        const tooltipRef: ComponentRef<CustomToolTipComponent> = this._overlayRef.attach(
          new ComponentPortal(CustomToolTipComponent)
        );
        tooltipRef.instance.text = this.iceTooltipHtmlText;
      }
    }
  }

  @HostListener('mouseleave')
  hide() {
    this.timeout = setTimeout(() => {
      this.closeToolTip();
    }, this.duration);
  }

  ngOnDestroy() {
    this.closeToolTip();
  }

  private closeToolTip() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }
}
