/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CustomToolTipComponent } from '../components/ice-custom-tooltip/ice-custom-tooltip.component';
export class ToolTipRendererDirective {
    /**
     * @param {?} _overlay
     * @param {?} _overlayPositionBuilder
     * @param {?} _elementRef
     */
    constructor(_overlay, _overlayPositionBuilder, _elementRef) {
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
    show() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if ((this.showToolTipOnTextOverflow &&
            this._elementRef.nativeElement.offsetWidth < this._elementRef.nativeElement.scrollWidth) ||
            this.showToolTip) {
            if (!this._overlayRef) {
                /** @type {?} */
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
            if (!this._overlayRef.hasAttached()) {
                /** @type {?} */
                const tooltipRef = this._overlayRef.attach(new ComponentPortal(CustomToolTipComponent));
                this.componentInstance = tooltipRef;
                tooltipRef.instance.text = this.iceTooltipHtmlText;
            }
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this.timeout = setTimeout((/**
         * @return {?}
         */
        () => {
            this.closeToolTip();
        }), this.duration);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.closeToolTip();
        this._overlayRef = (/** @type {?} */ (null));
    }
    /**
     * @private
     * @return {?}
     */
    closeToolTip() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.componentInstance = (/** @type {?} */ (null));
        }
    }
}
ToolTipRendererDirective.decorators = [
    { type: Directive, args: [{
                selector: '[iceCustomHtmlToolTip]'
            },] }
];
/** @nocollapse */
ToolTipRendererDirective.ctorParameters = () => [
    { type: Overlay },
    { type: OverlayPositionBuilder },
    { type: ElementRef }
];
ToolTipRendererDirective.propDecorators = {
    iceTooltipHtmlText: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showToolTipOnTextOverflow: [{ type: Input }],
    duration: [{ type: Input }],
    show: [{ type: HostListener, args: ['mouseenter',] }],
    hide: [{ type: HostListener, args: ['mouseleave',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9pY2UtY3VzdG9tLWh0bWwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFLdkcsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBVW5DLFlBQ1UsUUFBaUIsRUFDakIsdUJBQStDLEVBQy9DLFdBQXVCO1FBRnZCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQVh4QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQiw4QkFBeUIsR0FBRyxLQUFLLENBQUM7UUFDbEMsYUFBUSxHQUFHLENBQUMsQ0FBQztJQVVuQixDQUFDOzs7O0lBR0osSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFDRSxDQUFDLElBQUksQ0FBQyx5QkFBeUI7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUMxRixJQUFJLENBQUMsV0FBVyxFQUNoQjtZQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFOztzQkFDZixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztvQkFDeEc7d0JBQ0UsT0FBTyxFQUFFLE9BQU87d0JBQ2hCLE9BQU8sRUFBRSxLQUFLO3dCQUNkLFFBQVEsRUFBRSxPQUFPO3dCQUNqQixRQUFRLEVBQUUsUUFBUTt3QkFDbEIsT0FBTyxFQUFFLENBQUMsQ0FBQztxQkFDWjtpQkFDRixDQUFDO2dCQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7YUFDL0Q7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFBRTs7c0JBQzdCLFVBQVUsR0FBeUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQzlFLElBQUksZUFBZSxDQUFDLHNCQUFzQixDQUFDLENBQzVDO2dCQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7Z0JBQ3BDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUNwRDtTQUNGO0lBQ0gsQ0FBQzs7OztJQUdELElBQUk7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQUEsSUFBSSxFQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTyxZQUFZO1FBQ2xCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxtQkFBQSxJQUFJLEVBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7OztZQXZFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjthQUNuQzs7OztZQVBRLE9BQU87WUFBRSxzQkFBc0I7WUFFTixVQUFVOzs7aUNBT3pDLEtBQUs7MEJBQ0wsS0FBSzt3Q0FDTCxLQUFLO3VCQUNMLEtBQUs7bUJBWUwsWUFBWSxTQUFDLFlBQVk7bUJBZ0N6QixZQUFZLFNBQUMsWUFBWTs7OztJQS9DMUIsc0RBQW9DOztJQUNwQywrQ0FBNEI7O0lBQzVCLDZEQUEyQzs7SUFDM0MsNENBQXNCOzs7OztJQUV0QiwrQ0FBZ0M7Ozs7O0lBQ2hDLDJDQUFxQjs7Ozs7SUFDckIscURBQStCOzs7OztJQUc3Qiw0Q0FBeUI7Ozs7O0lBQ3pCLDJEQUF1RDs7Ozs7SUFDdkQsK0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVBvc2l0aW9uQnVpbGRlciwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tVG9vbFRpcENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvaWNlLWN1c3RvbS10b29sdGlwL2ljZS1jdXN0b20tdG9vbHRpcC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaWNlQ3VzdG9tSHRtbFRvb2xUaXBdJ1xufSlcbmV4cG9ydCBjbGFzcyBUb29sVGlwUmVuZGVyZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpY2VUb29sdGlwSHRtbFRleHQ6IHN0cmluZztcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcE9uVGV4dE92ZXJmbG93ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMDtcblxuICBwcml2YXRlIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuICBwcml2YXRlIHRpbWVvdXQ6IGFueTtcbiAgcHJpdmF0ZSBjb21wb25lbnRJbnN0YW5jZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfb3ZlcmxheVBvc2l0aW9uQnVpbGRlcjogT3ZlcmxheVBvc2l0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge31cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgc2hvdygpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKHRoaXMuc2hvd1Rvb2xUaXBPblRleHRPdmVyZmxvdyAmJlxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggPCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGgpIHx8XG4gICAgICB0aGlzLnNob3dUb29sVGlwXG4gICAgKSB7XG4gICAgICBpZiAoIXRoaXMuX292ZXJsYXlSZWYpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXIuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9lbGVtZW50UmVmKS53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgICAgICAgIG9mZnNldFk6IC01XG4gICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKHsgcG9zaXRpb25TdHJhdGVneSB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXBSZWY6IENvbXBvbmVudFJlZjxDdXN0b21Ub29sVGlwQ29tcG9uZW50PiA9IHRoaXMuX292ZXJsYXlSZWYuYXR0YWNoKFxuICAgICAgICAgIG5ldyBDb21wb25lbnRQb3J0YWwoQ3VzdG9tVG9vbFRpcENvbXBvbmVudClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IHRvb2x0aXBSZWY7XG4gICAgICAgIHRvb2x0aXBSZWYuaW5zdGFuY2UudGV4dCA9IHRoaXMuaWNlVG9vbHRpcEh0bWxUZXh0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBoaWRlKCkge1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZVRvb2xUaXAoKTtcbiAgICB9LCB0aGlzLmR1cmF0aW9uKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlVG9vbFRpcCgpO1xuICAgIHRoaXMuX292ZXJsYXlSZWYgPSBudWxsITtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VUb29sVGlwKCkge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IG51bGwhO1xuICAgIH1cbiAgfVxufVxuIl19