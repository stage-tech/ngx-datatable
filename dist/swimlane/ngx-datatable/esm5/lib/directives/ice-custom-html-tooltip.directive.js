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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9pY2UtY3VzdG9tLWh0bWwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFFdkc7SUFhRSxrQ0FDVSxRQUFpQixFQUNqQix1QkFBK0MsRUFDL0MsV0FBdUI7UUFGdkIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBWHhCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLDhCQUF5QixHQUFHLEtBQUssQ0FBQztRQUNsQyxhQUFRLEdBQUcsQ0FBQyxDQUFDO0lBVW5CLENBQUM7Ozs7SUFHSix1Q0FBSTs7O0lBREo7UUFFRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQ0UsQ0FBQyxJQUFJLENBQUMseUJBQXlCO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFDMUYsSUFBSSxDQUFDLFdBQVcsRUFDaEI7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7b0JBQ2YsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUM7b0JBQ3hHO3dCQUNFLE9BQU8sRUFBRSxPQUFPO3dCQUNoQixPQUFPLEVBQUUsS0FBSzt3QkFDZCxRQUFRLEVBQUUsT0FBTzt3QkFDakIsUUFBUSxFQUFFLFFBQVE7d0JBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUM7cUJBQ1o7aUJBQ0YsQ0FBQztnQkFDRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUUsQ0FBQyxDQUFDO2FBQy9EO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQUU7O29CQUM3QixVQUFVLEdBQXlDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUM5RSxJQUFJLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUM1QztnQkFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO2dCQUNwQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7YUFDcEQ7U0FDRjtJQUNILENBQUM7Ozs7SUFHRCx1Q0FBSTs7O0lBREo7UUFBQSxpQkFLQztRQUhDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVTs7O1FBQUM7WUFDeEIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELDhDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQUEsSUFBSSxFQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTywrQ0FBWTs7OztJQUFwQjtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxtQkFBQSxJQUFJLEVBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7O2dCQXZFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtpQkFDbkM7Ozs7Z0JBUFEsT0FBTztnQkFBRSxzQkFBc0I7Z0JBRU4sVUFBVTs7O3FDQU96QyxLQUFLOzhCQUNMLEtBQUs7NENBQ0wsS0FBSzsyQkFDTCxLQUFLO3VCQVlMLFlBQVksU0FBQyxZQUFZO3VCQWdDekIsWUFBWSxTQUFDLFlBQVk7O0lBcUI1QiwrQkFBQztDQUFBLEFBeEVELElBd0VDO1NBckVZLHdCQUF3Qjs7O0lBQ25DLHNEQUFvQzs7SUFDcEMsK0NBQTRCOztJQUM1Qiw2REFBMkM7O0lBQzNDLDRDQUFzQjs7Ozs7SUFFdEIsK0NBQWdDOzs7OztJQUNoQywyQ0FBcUI7Ozs7O0lBQ3JCLHFEQUErQjs7Ozs7SUFHN0IsNENBQXlCOzs7OztJQUN6QiwyREFBdUQ7Ozs7O0lBQ3ZELCtDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEN1c3RvbVRvb2xUaXBDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2ljZS1jdXN0b20tdG9vbHRpcC9pY2UtY3VzdG9tLXRvb2x0aXAuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2ljZUN1c3RvbUh0bWxUb29sVGlwXSdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbFRpcFJlbmRlcmVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgaWNlVG9vbHRpcEh0bWxUZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXBPblRleHRPdmVyZmxvdyA9IGZhbHNlO1xuICBASW5wdXQoKSBkdXJhdGlvbiA9IDA7XG5cbiAgcHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgcHJpdmF0ZSB0aW1lb3V0OiBhbnk7XG4gIHByaXZhdGUgY29tcG9uZW50SW5zdGFuY2U6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXI6IE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICh0aGlzLnNob3dUb29sVGlwT25UZXh0T3ZlcmZsb3cgJiZcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIDwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoKSB8fFxuICAgICAgdGhpcy5zaG93VG9vbFRpcFxuICAgICkge1xuICAgICAgaWYgKCF0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5UG9zaXRpb25CdWlsZGVyLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5fZWxlbWVudFJlZikud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAge1xuICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICAgICAgICBvZmZzZXRZOiAtNVxuICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZSh7IHBvc2l0aW9uU3RyYXRlZ3kgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX292ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICBjb25zdCB0b29sdGlwUmVmOiBDb21wb25lbnRSZWY8Q3VzdG9tVG9vbFRpcENvbXBvbmVudD4gPSB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaChcbiAgICAgICAgICBuZXcgQ29tcG9uZW50UG9ydGFsKEN1c3RvbVRvb2xUaXBDb21wb25lbnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSB0b29sdGlwUmVmO1xuICAgICAgICB0b29sdGlwUmVmLmluc3RhbmNlLnRleHQgPSB0aGlzLmljZVRvb2x0aXBIdG1sVGV4dDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgaGlkZSgpIHtcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2VUb29sVGlwKCk7XG4gICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZVRvb2xUaXAoKTtcbiAgICB0aGlzLl9vdmVybGF5UmVmID0gbnVsbCE7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlVG9vbFRpcCgpIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSBudWxsITtcbiAgICB9XG4gIH1cbn1cbiJdfQ==