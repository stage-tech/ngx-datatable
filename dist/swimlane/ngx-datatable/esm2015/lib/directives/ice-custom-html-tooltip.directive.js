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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9pY2UtY3VzdG9tLWh0bWwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFLdkcsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBVW5DLFlBQ1UsUUFBaUIsRUFDakIsdUJBQStDLEVBQy9DLFdBQXVCO1FBRnZCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQVh4QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQiw4QkFBeUIsR0FBRyxLQUFLLENBQUM7UUFDbEMsYUFBUSxHQUFHLENBQUMsQ0FBQztJQVVuQixDQUFDOzs7O0lBR0osSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFDRSxDQUFDLElBQUksQ0FBQyx5QkFBeUI7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUMxRixJQUFJLENBQUMsV0FBVyxFQUNoQjtZQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFOztzQkFDZixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztvQkFDeEc7d0JBQ0UsT0FBTyxFQUFFLE9BQU87d0JBQ2hCLE9BQU8sRUFBRSxLQUFLO3dCQUNkLFFBQVEsRUFBRSxPQUFPO3dCQUNqQixRQUFRLEVBQUUsUUFBUTt3QkFDbEIsT0FBTyxFQUFFLENBQUMsQ0FBQztxQkFDWjtpQkFDRixDQUFDO2dCQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7YUFDL0Q7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFBRTs7c0JBQzdCLFVBQVUsR0FBeUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQzlFLElBQUksZUFBZSxDQUFDLHNCQUFzQixDQUFDLENBQzVDO2dCQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7Z0JBQ3BDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUNwRDtTQUNGO0lBQ0gsQ0FBQzs7OztJQUdELElBQUk7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQUEsSUFBSSxFQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTyxZQUFZO1FBQ2xCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxtQkFBQSxJQUFJLEVBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7OztZQXZFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjthQUNuQzs7OztZQVBRLE9BQU87WUFBRSxzQkFBc0I7WUFFTixVQUFVOzs7aUNBT3pDLEtBQUs7MEJBQ0wsS0FBSzt3Q0FDTCxLQUFLO3VCQUNMLEtBQUs7bUJBWUwsWUFBWSxTQUFDLFlBQVk7bUJBZ0N6QixZQUFZLFNBQUMsWUFBWTs7OztJQS9DMUIsc0RBQW9DOztJQUNwQywrQ0FBNEI7O0lBQzVCLDZEQUEyQzs7SUFDM0MsNENBQXNCOzs7OztJQUV0QiwrQ0FBZ0M7Ozs7O0lBQ2hDLDJDQUFxQjs7Ozs7SUFDckIscURBQStCOzs7OztJQUc3Qiw0Q0FBeUI7Ozs7O0lBQ3pCLDJEQUF1RDs7Ozs7SUFDdkQsK0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVBvc2l0aW9uQnVpbGRlciwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7IENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ3VzdG9tVG9vbFRpcENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvaWNlLWN1c3RvbS10b29sdGlwL2ljZS1jdXN0b20tdG9vbHRpcC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWNlQ3VzdG9tSHRtbFRvb2xUaXBdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbFRpcFJlbmRlcmVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBpY2VUb29sdGlwSHRtbFRleHQ6IHN0cmluZztcclxuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XHJcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXBPblRleHRPdmVyZmxvdyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMDtcclxuXHJcbiAgcHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcclxuICBwcml2YXRlIHRpbWVvdXQ6IGFueTtcclxuICBwcml2YXRlIGNvbXBvbmVudEluc3RhbmNlOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcclxuICAgIHByaXZhdGUgX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXI6IE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmXHJcbiAgKSB7fVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcclxuICBzaG93KCkge1xyXG4gICAgaWYgKHRoaXMudGltZW91dCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgKHRoaXMuc2hvd1Rvb2xUaXBPblRleHRPdmVyZmxvdyAmJlxyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA8IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCkgfHxcclxuICAgICAgdGhpcy5zaG93VG9vbFRpcFxyXG4gICAgKSB7XHJcbiAgICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZikge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5UG9zaXRpb25CdWlsZGVyLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5fZWxlbWVudFJlZikud2l0aFBvc2l0aW9ucyhbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXHJcbiAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxyXG4gICAgICAgICAgICBvZmZzZXRZOiAtNVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZSh7IHBvc2l0aW9uU3RyYXRlZ3kgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLl9vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcclxuICAgICAgICBjb25zdCB0b29sdGlwUmVmOiBDb21wb25lbnRSZWY8Q3VzdG9tVG9vbFRpcENvbXBvbmVudD4gPSB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaChcclxuICAgICAgICAgIG5ldyBDb21wb25lbnRQb3J0YWwoQ3VzdG9tVG9vbFRpcENvbXBvbmVudClcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSB0b29sdGlwUmVmO1xyXG4gICAgICAgIHRvb2x0aXBSZWYuaW5zdGFuY2UudGV4dCA9IHRoaXMuaWNlVG9vbHRpcEh0bWxUZXh0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2xvc2VUb29sVGlwKCk7XHJcbiAgICB9LCB0aGlzLmR1cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMudGltZW91dCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xvc2VUb29sVGlwKCk7XHJcbiAgICB0aGlzLl9vdmVybGF5UmVmID0gbnVsbCE7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsb3NlVG9vbFRpcCgpIHtcclxuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XHJcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSBudWxsITtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19