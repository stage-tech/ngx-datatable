import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { CustomToolTipComponent } from '../components/ice-custom-tooltip/ice-custom-tooltip.component';
/**
 * service to make DatatableComponent aware of changes to
 * input bindings of DataTableColumnDirective
 */
@Injectable()
export class ToolbarService {
  public _overlayRef: OverlayRef;
  public timeout: any;
  public componentInstance: any;

  setToolbar(_overlay, _overlayPositionBuilder, _elementRef, iceTooltipHtmlText, duration) {
    if (!this._overlayRef) {
      const positionStrategy = _overlayPositionBuilder.flexibleConnectedTo(_elementRef).withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -5
        }
      ]);
      this._overlayRef = _overlay.create({ positionStrategy });
    }
    if (!this._overlayRef.hasAttached()) {
      const tooltipRef: ComponentRef<CustomToolTipComponent> = this._overlayRef.attach(
        new ComponentPortal(CustomToolTipComponent)
      );
      this.componentInstance = tooltipRef;
      this.componentInstance.instance.text = iceTooltipHtmlText;
      this.componentInstance.instance.onMouseLeave = () => {
        this.clearTimeout();
        this.setTimeout(duration);
      };
      this.componentInstance.instance.onMouseEnter = () => this.clearTimeout();
    }
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  setTimeout(duration) {
    this.timeout = setTimeout(() => {
      this.closeToolTip();
    }, duration);
  }

  destroy() {
    this.clearTimeout();
    this.closeToolTip();
    this._overlayRef = null!;
  }

  closeToolTip() {
    if (this._overlayRef) {
      this._overlayRef.detach();
      this.componentInstance = null!;
    }
  }
}
