/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ToolbarService } from '../services/toolbar-service';
export class ToolTipRendererDirective {
    /**
     * @param {?} _overlay
     * @param {?} _overlayPositionBuilder
     * @param {?} _elementRef
     * @param {?} toolbarService
     */
    constructor(_overlay, _overlayPositionBuilder, _elementRef, toolbarService) {
        this._overlay = _overlay;
        this._overlayPositionBuilder = _overlayPositionBuilder;
        this._elementRef = _elementRef;
        this.toolbarService = toolbarService;
        this.showToolTip = true;
        this.showToolTipOnTextOverflow = false;
        this.duration = 0;
    }
    /**
     * @return {?}
     */
    show() {
        this.toolbarService.destroy();
        if ((this.showToolTipOnTextOverflow &&
            this._elementRef.nativeElement.offsetWidth < this._elementRef.nativeElement.scrollWidth) ||
            this.showToolTip) {
            this.toolbarService.setToolbar(this._overlay, this._overlayPositionBuilder, this._elementRef, this.iceTooltipHtmlText, this.duration);
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this.toolbarService.setTimeout(this.duration);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.toolbarService.destroy();
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
    { type: ElementRef },
    { type: ToolbarService }
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
    /**
     * @type {?}
     * @private
     */
    ToolTipRendererDirective.prototype.toolbarService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9pY2UtY3VzdG9tLWh0bWwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUs3RCxNQUFNLE9BQU8sd0JBQXdCOzs7Ozs7O0lBTW5DLFlBQ1UsUUFBaUIsRUFDakIsdUJBQStDLEVBQy9DLFdBQXVCLEVBQ3ZCLGNBQThCO1FBSDlCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFSL0IsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsOEJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxDQUFDLENBQUM7SUFPbkIsQ0FBQzs7OztJQUdKLElBQUk7UUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLElBQ0UsQ0FBQyxJQUFJLENBQUMseUJBQXlCO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFDMUYsSUFBSSxDQUFDLFdBQVcsRUFDaEI7WUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FDNUIsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsdUJBQXVCLEVBQzVCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FDZCxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7O0lBR0QsSUFBSTtRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7O1lBekNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2FBQ25DOzs7O1lBTlEsT0FBTztZQUFFLHNCQUFzQjtZQUNwQixVQUFVO1lBQ3JCLGNBQWM7OztpQ0FNcEIsS0FBSzswQkFDTCxLQUFLO3dDQUNMLEtBQUs7dUJBQ0wsS0FBSzttQkFTTCxZQUFZLFNBQUMsWUFBWTttQkFrQnpCLFlBQVksU0FBQyxZQUFZOzs7O0lBOUIxQixzREFBb0M7O0lBQ3BDLCtDQUE0Qjs7SUFDNUIsNkRBQTJDOztJQUMzQyw0Q0FBc0I7Ozs7O0lBR3BCLDRDQUF5Qjs7Ozs7SUFDekIsMkRBQXVEOzs7OztJQUN2RCwrQ0FBK0I7Ozs7O0lBQy9CLGtEQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90b29sYmFyLXNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaWNlQ3VzdG9tSHRtbFRvb2xUaXBdJ1xufSlcbmV4cG9ydCBjbGFzcyBUb29sVGlwUmVuZGVyZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpY2VUb29sdGlwSHRtbFRleHQ6IHN0cmluZztcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcE9uVGV4dE92ZXJmbG93ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXI6IE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHRvb2xiYXJTZXJ2aWNlOiBUb29sYmFyU2VydmljZVxuICApIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIHNob3coKSB7XG4gICAgdGhpcy50b29sYmFyU2VydmljZS5kZXN0cm95KCk7XG4gICAgaWYgKFxuICAgICAgKHRoaXMuc2hvd1Rvb2xUaXBPblRleHRPdmVyZmxvdyAmJlxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggPCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGgpIHx8XG4gICAgICB0aGlzLnNob3dUb29sVGlwXG4gICAgKSB7XG4gICAgICB0aGlzLnRvb2xiYXJTZXJ2aWNlLnNldFRvb2xiYXIoXG4gICAgICAgIHRoaXMuX292ZXJsYXksXG4gICAgICAgIHRoaXMuX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYsXG4gICAgICAgIHRoaXMuaWNlVG9vbHRpcEh0bWxUZXh0LFxuICAgICAgICB0aGlzLmR1cmF0aW9uXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBoaWRlKCkge1xuICAgIHRoaXMudG9vbGJhclNlcnZpY2Uuc2V0VGltZW91dCh0aGlzLmR1cmF0aW9uKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudG9vbGJhclNlcnZpY2UuZGVzdHJveSgpO1xuICB9XG59XG4iXX0=