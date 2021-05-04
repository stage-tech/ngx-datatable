/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { CustomToolTipComponent } from '../components/ice-custom-tooltip/ice-custom-tooltip.component';
/**
 * service to make DatatableComponent aware of changes to
 * input bindings of DataTableColumnDirective
 */
export class ToolbarService {
    /**
     * @param {?} _overlay
     * @param {?} _overlayPositionBuilder
     * @param {?} _elementRef
     * @param {?} iceTooltipHtmlText
     * @param {?} duration
     * @return {?}
     */
    setToolbar(_overlay, _overlayPositionBuilder, _elementRef, iceTooltipHtmlText, duration) {
        if (!this._overlayRef) {
            /** @type {?} */
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
            /** @type {?} */
            const tooltipRef = this._overlayRef.attach(new ComponentPortal(CustomToolTipComponent));
            this.componentInstance = tooltipRef;
            this.componentInstance.instance.text = iceTooltipHtmlText;
            this.componentInstance.instance.onMouseLeave = (/**
             * @return {?}
             */
            () => (this.clearTimeout(), this.setTimeout(duration)));
            this.componentInstance.instance.onMouseEnter = (/**
             * @return {?}
             */
            () => this.clearTimeout());
        }
    }
    /**
     * @return {?}
     */
    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    setTimeout(duration) {
        this.timeout = setTimeout((/**
         * @return {?}
         */
        () => {
            this.closeToolTip();
        }), duration);
    }
    /**
     * @return {?}
     */
    destroy() {
        this.clearTimeout();
        this.closeToolTip();
        this._overlayRef = (/** @type {?} */ (null));
    }
    /**
     * @return {?}
     */
    closeToolTip() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.componentInstance = (/** @type {?} */ (null));
        }
    }
}
ToolbarService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ToolbarService.prototype._overlayRef;
    /** @type {?} */
    ToolbarService.prototype.timeout;
    /** @type {?} */
    ToolbarService.prototype.componentInstance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdG9vbGJhci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0RBQStELENBQUM7Ozs7O0FBTXZHLE1BQU0sT0FBTyxjQUFjOzs7Ozs7Ozs7SUFLekIsVUFBVSxDQUFDLFFBQVEsRUFBRSx1QkFBdUIsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsUUFBUTtRQUNyRixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7a0JBQ2YsZ0JBQWdCLEdBQUcsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDO2dCQUM5RjtvQkFDRSxPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLFFBQVEsRUFBRSxRQUFRO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxDQUFDO2lCQUNaO2FBQ0YsQ0FBQztZQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFOztrQkFDN0IsVUFBVSxHQUF5QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FDOUUsSUFBSSxlQUFlLENBQUMsc0JBQXNCLENBQUMsQ0FDNUM7WUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDO1lBQzFELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsWUFBWTs7O1lBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDdEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxZQUFZOzs7WUFBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUEsQ0FBQztTQUMxRTtJQUNILENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLEdBQUUsUUFBUSxDQUFDLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBQSxJQUFJLEVBQUMsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxtQkFBQSxJQUFJLEVBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7OztZQXJERixVQUFVOzs7O0lBRVQscUNBQStCOztJQUMvQixpQ0FBb0I7O0lBQ3BCLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbXBvbmVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tVG9vbFRpcENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvaWNlLWN1c3RvbS10b29sdGlwL2ljZS1jdXN0b20tdG9vbHRpcC5jb21wb25lbnQnO1xuLyoqXG4gKiBzZXJ2aWNlIHRvIG1ha2UgRGF0YXRhYmxlQ29tcG9uZW50IGF3YXJlIG9mIGNoYW5nZXMgdG9cbiAqIGlucHV0IGJpbmRpbmdzIG9mIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9vbGJhclNlcnZpY2Uge1xuICBwdWJsaWMgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG4gIHB1YmxpYyB0aW1lb3V0OiBhbnk7XG4gIHB1YmxpYyBjb21wb25lbnRJbnN0YW5jZTogYW55O1xuXG4gIHNldFRvb2xiYXIoX292ZXJsYXksIF9vdmVybGF5UG9zaXRpb25CdWlsZGVyLCBfZWxlbWVudFJlZiwgaWNlVG9vbHRpcEh0bWxUZXh0LCBkdXJhdGlvbikge1xuICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IF9vdmVybGF5UG9zaXRpb25CdWlsZGVyLmZsZXhpYmxlQ29ubmVjdGVkVG8oX2VsZW1lbnRSZWYpLndpdGhQb3NpdGlvbnMoW1xuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICAgICAgb2Zmc2V0WTogLTVcbiAgICAgICAgfVxuICAgICAgXSk7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmID0gX292ZXJsYXkuY3JlYXRlKHsgcG9zaXRpb25TdHJhdGVneSB9KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIGNvbnN0IHRvb2x0aXBSZWY6IENvbXBvbmVudFJlZjxDdXN0b21Ub29sVGlwQ29tcG9uZW50PiA9IHRoaXMuX292ZXJsYXlSZWYuYXR0YWNoKFxuICAgICAgICBuZXcgQ29tcG9uZW50UG9ydGFsKEN1c3RvbVRvb2xUaXBDb21wb25lbnQpXG4gICAgICApO1xuICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IHRvb2x0aXBSZWY7XG4gICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlLnRleHQgPSBpY2VUb29sdGlwSHRtbFRleHQ7XG4gICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlLm9uTW91c2VMZWF2ZSA9ICgpID0+ICh0aGlzLmNsZWFyVGltZW91dCgpLCB0aGlzLnNldFRpbWVvdXQoZHVyYXRpb24pKTtcbiAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UuaW5zdGFuY2Uub25Nb3VzZUVudGVyID0gKCkgPT4gdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBjbGVhclRpbWVvdXQoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VGltZW91dChkdXJhdGlvbikge1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZVRvb2xUaXAoKTtcbiAgICB9LCBkdXJhdGlvbik7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gICAgdGhpcy5jbG9zZVRvb2xUaXAoKTtcbiAgICB0aGlzLl9vdmVybGF5UmVmID0gbnVsbCE7XG4gIH1cblxuICBjbG9zZVRvb2xUaXAoKSB7XG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gbnVsbCE7XG4gICAgfVxuICB9XG59XG4iXX0=