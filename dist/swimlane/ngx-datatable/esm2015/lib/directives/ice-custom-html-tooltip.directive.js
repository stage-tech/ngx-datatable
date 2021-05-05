import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ToolbarService } from '../services/toolbar-service';
export class ToolTipRendererDirective {
  constructor(_overlay, _overlayPositionBuilder, _elementRef, toolbarService) {
    this._overlay = _overlay;
    this._overlayPositionBuilder = _overlayPositionBuilder;
    this._elementRef = _elementRef;
    this.toolbarService = toolbarService;
    this.showToolTip = true;
    this.showToolTipOnTextOverflow = false;
    this.duration = 0;
  }
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
  hide() {
    this.toolbarService.setTimeout(this.duration);
  }
  ngOnDestroy() {
    this.toolbarService.destroy();
  }
}
ToolTipRendererDirective.decorators = [
  {
    type: Directive,
    args: [
      {
        selector: '[iceCustomHtmlToolTip]'
      }
    ]
  }
];
ToolTipRendererDirective.ctorParameters = () => [
  { type: Overlay },
  { type: OverlayPositionBuilder },
  { type: ElementRef },
  { type: ToolbarService }
];
ToolTipRendererDirective.propDecorators = {
  iceTooltipHtmlText: [{ type: Input }],
  showToolTip: [{ type: Input }],
  showToolTipOnTextOverflow: [{ type: Input }],
  duration: [{ type: Input }],
  show: [{ type: HostListener, args: ['mouseenter'] }],
  hide: [{ type: HostListener, args: ['mouseleave'] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUs3RCxNQUFNLE9BQU8sd0JBQXdCO0lBTW5DLFlBQ1UsUUFBaUIsRUFDakIsdUJBQStDLEVBQy9DLFdBQXVCLEVBQ3ZCLGNBQThCO1FBSDlCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFSL0IsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsOEJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxDQUFDLENBQUM7SUFPbkIsQ0FBQztJQUdKLElBQUk7UUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLElBQ0UsQ0FBQyxJQUFJLENBQUMseUJBQXlCO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFDMUYsSUFBSSxDQUFDLFdBQVcsRUFDaEI7WUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FDNUIsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsdUJBQXVCLEVBQzVCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FDZCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBR0QsSUFBSTtRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7O1lBekNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2FBQ25DOzs7WUFOUSxPQUFPO1lBQUUsc0JBQXNCO1lBQ3BCLFVBQVU7WUFDckIsY0FBYzs7O2lDQU1wQixLQUFLOzBCQUNMLEtBQUs7d0NBQ0wsS0FBSzt1QkFDTCxLQUFLO21CQVNMLFlBQVksU0FBQyxZQUFZO21CQWtCekIsWUFBWSxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5UG9zaXRpb25CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUb29sYmFyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Rvb2xiYXItc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpY2VDdXN0b21IdG1sVG9vbFRpcF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sVGlwUmVuZGVyZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGljZVRvb2x0aXBIdG1sVGV4dDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzaG93VG9vbFRpcE9uVGV4dE92ZXJmbG93ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZHVyYXRpb24gPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXHJcbiAgICBwcml2YXRlIF9vdmVybGF5UG9zaXRpb25CdWlsZGVyOiBPdmVybGF5UG9zaXRpb25CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgdG9vbGJhclNlcnZpY2U6IFRvb2xiYXJTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcclxuICBzaG93KCkge1xyXG4gICAgdGhpcy50b29sYmFyU2VydmljZS5kZXN0cm95KCk7XHJcbiAgICBpZiAoXHJcbiAgICAgICh0aGlzLnNob3dUb29sVGlwT25UZXh0T3ZlcmZsb3cgJiZcclxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggPCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGgpIHx8XHJcbiAgICAgIHRoaXMuc2hvd1Rvb2xUaXBcclxuICAgICkge1xyXG4gICAgICB0aGlzLnRvb2xiYXJTZXJ2aWNlLnNldFRvb2xiYXIoXHJcbiAgICAgICAgdGhpcy5fb3ZlcmxheSxcclxuICAgICAgICB0aGlzLl9vdmVybGF5UG9zaXRpb25CdWlsZGVyLFxyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYsXHJcbiAgICAgICAgdGhpcy5pY2VUb29sdGlwSHRtbFRleHQsXHJcbiAgICAgICAgdGhpcy5kdXJhdGlvblxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXHJcbiAgaGlkZSgpIHtcclxuICAgIHRoaXMudG9vbGJhclNlcnZpY2Uuc2V0VGltZW91dCh0aGlzLmR1cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy50b29sYmFyU2VydmljZS5kZXN0cm95KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
