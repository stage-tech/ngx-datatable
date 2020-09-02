/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CustomToolTipComponent } from '../components/ice-custom-tooltip/ice-custom-tooltip.component';
var ToolTipRendererDirective = /** @class */ (function () {
    function ToolTipRendererDirective(_overlay, _overlayPositionBuilder, _elementRef) {
        this._overlay = _overlay;
        this._overlayPositionBuilder = _overlayPositionBuilder;
        this._elementRef = _elementRef;
        this.showToolTip = true;
        this.showToolTipOnTextOverflow = false;
        this.duration = 0;
    }
    /**
     * @return {?}
     */
    ToolTipRendererDirective.prototype.show = /**
     * @return {?}
     */
    function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if ((this.showToolTipOnTextOverflow &&
            this._elementRef.nativeElement.offsetWidth < this._elementRef.nativeElement.scrollWidth) ||
            this.showToolTip) {
            if (!this._overlayRef) {
                /** @type {?} */
                var positionStrategy = this._overlayPositionBuilder.flexibleConnectedTo(this._elementRef).withPositions([
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                        offsetY: -5
                    }
                ]);
                this._overlayRef = this._overlay.create({ positionStrategy: positionStrategy });
            }
            if (!this._overlayRef.hasAttached()) {
                /** @type {?} */
                var tooltipRef = this._overlayRef.attach(new ComponentPortal(CustomToolTipComponent));
                this.componentInstance = tooltipRef;
                tooltipRef.instance.text = this.iceTooltipHtmlText;
            }
        }
    };
    /**
     * @return {?}
     */
    ToolTipRendererDirective.prototype.hide = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.timeout = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.closeToolTip();
        }), this.duration);
    };
    /**
     * @return {?}
     */
    ToolTipRendererDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.closeToolTip();
        this._overlayRef = (/** @type {?} */ (null));
    };
    /**
     * @private
     * @return {?}
     */
    ToolTipRendererDirective.prototype.closeToolTip = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.componentInstance = (/** @type {?} */ (null));
        }
    };
    ToolTipRendererDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[iceCustomHtmlToolTip]'
                },] }
    ];
    /** @nocollapse */
    ToolTipRendererDirective.ctorParameters = function () { return [
        { type: Overlay },
        { type: OverlayPositionBuilder },
        { type: ElementRef }
    ]; };
    ToolTipRendererDirective.propDecorators = {
        iceTooltipHtmlText: [{ type: Input }],
        showToolTip: [{ type: Input }],
        showToolTipOnTextOverflow: [{ type: Input }],
        duration: [{ type: Input }],
        show: [{ type: HostListener, args: ['mouseenter',] }],
        hide: [{ type: HostListener, args: ['mouseleave',] }]
    };
    return ToolTipRendererDirective;
}());
export { ToolTipRendererDirective };
if (false) {
    /** @type {?} */
    ToolTipRendererDirective.prototype.iceTooltipHtmlText;
    /** @type {?} */
    ToolTipRendererDirective.prototype.showToolTip;
    /** @type {?} */
    ToolTipRendererDirective.prototype.showToolTipOnTextOverflow;
    /** @type {?} */
    ToolTipRendererDirective.prototype.duration;
    /**
     * @type {?}
     * @private
     */
    ToolTipRendererDirective.prototype._overlayRef;
    /**
     * @type {?}
     * @private
     */
    ToolTipRendererDirective.prototype.timeout;
    /**
     * @type {?}
     * @private
     */
    ToolTipRendererDirective.prototype.componentInstance;
    /**
     * @type {?}
     * @private
     */
    ToolTipRendererDirective.prototype._overlay;
    /**
     * @type {?}
     * @private
     */
    ToolTipRendererDirective.prototype._overlayPositionBuilder;
    /**
     * @type {?}
     * @private
     */
    ToolTipRendererDirective.prototype._elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9pY2UtY3VzdG9tLWh0bWwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFFdkc7SUFhRSxrQ0FDVSxRQUFpQixFQUNqQix1QkFBK0MsRUFDL0MsV0FBdUI7UUFGdkIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBWHhCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLDhCQUF5QixHQUFHLEtBQUssQ0FBQztRQUNsQyxhQUFRLEdBQUcsQ0FBQyxDQUFDO0lBVW5CLENBQUM7Ozs7SUFHSix1Q0FBSTs7O0lBREo7UUFFRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQ0UsQ0FBQyxJQUFJLENBQUMseUJBQXlCO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFDMUYsSUFBSSxDQUFDLFdBQVcsRUFDaEI7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7b0JBQ2YsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUM7b0JBQ3hHO3dCQUNFLE9BQU8sRUFBRSxPQUFPO3dCQUNoQixPQUFPLEVBQUUsS0FBSzt3QkFDZCxRQUFRLEVBQUUsT0FBTzt3QkFDakIsUUFBUSxFQUFFLFFBQVE7d0JBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUM7cUJBQ1o7aUJBQ0YsQ0FBQztnQkFDRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUUsQ0FBQyxDQUFDO2FBQy9EO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQUU7O29CQUM3QixVQUFVLEdBQXlDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUM5RSxJQUFJLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUM1QztnQkFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO2dCQUNwQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7YUFDcEQ7U0FDRjtJQUNILENBQUM7Ozs7SUFHRCx1Q0FBSTs7O0lBREo7UUFBQSxpQkFLQztRQUhDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVTs7O1FBQUM7WUFDeEIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELDhDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQUEsSUFBSSxFQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTywrQ0FBWTs7OztJQUFwQjtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxtQkFBQSxJQUFJLEVBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7O2dCQXZFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtpQkFDbkM7Ozs7Z0JBUFEsT0FBTztnQkFBRSxzQkFBc0I7Z0JBRU4sVUFBVTs7O3FDQU96QyxLQUFLOzhCQUNMLEtBQUs7NENBQ0wsS0FBSzsyQkFDTCxLQUFLO3VCQVlMLFlBQVksU0FBQyxZQUFZO3VCQWdDekIsWUFBWSxTQUFDLFlBQVk7O0lBcUI1QiwrQkFBQztDQUFBLEFBeEVELElBd0VDO1NBckVZLHdCQUF3Qjs7O0lBQ25DLHNEQUFvQzs7SUFDcEMsK0NBQTRCOztJQUM1Qiw2REFBMkM7O0lBQzNDLDRDQUFzQjs7Ozs7SUFFdEIsK0NBQWdDOzs7OztJQUNoQywyQ0FBcUI7Ozs7O0lBQ3JCLHFEQUErQjs7Ozs7SUFHN0IsNENBQXlCOzs7OztJQUN6QiwyREFBdUQ7Ozs7O0lBQ3ZELCtDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEN1c3RvbVRvb2xUaXBDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2ljZS1jdXN0b20tdG9vbHRpcC9pY2UtY3VzdG9tLXRvb2x0aXAuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2ljZUN1c3RvbUh0bWxUb29sVGlwXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvb2xUaXBSZW5kZXJlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgaWNlVG9vbHRpcEh0bWxUZXh0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNob3dUb29sVGlwT25UZXh0T3ZlcmZsb3cgPSBmYWxzZTtcclxuICBASW5wdXQoKSBkdXJhdGlvbiA9IDA7XHJcblxyXG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XHJcbiAgcHJpdmF0ZSB0aW1lb3V0OiBhbnk7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnRJbnN0YW5jZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXHJcbiAgICBwcml2YXRlIF9vdmVybGF5UG9zaXRpb25CdWlsZGVyOiBPdmVybGF5UG9zaXRpb25CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZlxyXG4gICkge31cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXHJcbiAgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgICh0aGlzLnNob3dUb29sVGlwT25UZXh0T3ZlcmZsb3cgJiZcclxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggPCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGgpIHx8XHJcbiAgICAgIHRoaXMuc2hvd1Rvb2xUaXBcclxuICAgICkge1xyXG4gICAgICBpZiAoIXRoaXMuX292ZXJsYXlSZWYpIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVBvc2l0aW9uQnVpbGRlci5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuX2VsZW1lbnRSZWYpLndpdGhQb3NpdGlvbnMoW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXHJcbiAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcclxuICAgICAgICAgICAgb2Zmc2V0WTogLTVcclxuICAgICAgICAgIH1cclxuICAgICAgICBdKTtcclxuICAgICAgICB0aGlzLl9vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUoeyBwb3NpdGlvblN0cmF0ZWd5IH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XHJcbiAgICAgICAgY29uc3QgdG9vbHRpcFJlZjogQ29tcG9uZW50UmVmPEN1c3RvbVRvb2xUaXBDb21wb25lbnQ+ID0gdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2goXHJcbiAgICAgICAgICBuZXcgQ29tcG9uZW50UG9ydGFsKEN1c3RvbVRvb2xUaXBDb21wb25lbnQpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gdG9vbHRpcFJlZjtcclxuICAgICAgICB0b29sdGlwUmVmLmluc3RhbmNlLnRleHQgPSB0aGlzLmljZVRvb2x0aXBIdG1sVGV4dDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXHJcbiAgaGlkZSgpIHtcclxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNsb3NlVG9vbFRpcCgpO1xyXG4gICAgfSwgdGhpcy5kdXJhdGlvbik7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNsb3NlVG9vbFRpcCgpO1xyXG4gICAgdGhpcy5fb3ZlcmxheVJlZiA9IG51bGwhO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbG9zZVRvb2xUaXAoKSB7XHJcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xyXG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xyXG4gICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gbnVsbCE7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==