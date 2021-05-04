import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { ToolbarService } from '../services/toolbar-service';

@Directive({
  selector: '[iceCustomHtmlToolTip]'
})
export class ToolTipRendererDirective implements OnDestroy {
  @Input() iceTooltipHtmlText: string;
  @Input() showToolTip = true;
  @Input() showToolTipOnTextOverflow = false;
  @Input() duration = 0;

  constructor(
    private _overlay: Overlay,
    private _overlayPositionBuilder: OverlayPositionBuilder,
    private _elementRef: ElementRef,
    private toolbarService: ToolbarService
  ) {}

  @HostListener('mouseenter')
  show() {
    this.toolbarService.destroy();
    if (
      (this.showToolTipOnTextOverflow &&
        this._elementRef.nativeElement.offsetWidth < this._elementRef.nativeElement.scrollWidth) ||
      this.showToolTip
    ) {
      this.toolbarService.setToolbar(
        this._overlay,
        this._overlayPositionBuilder,
        this._elementRef,
        this.iceTooltipHtmlText,
        this.duration
      );
    }
  }

  @HostListener('mouseleave')
  hide() {
    this.toolbarService.setTimeout(this.duration);
  }

  ngOnDestroy() {
    this.toolbarService.destroy();
  }
}
