/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ToolbarService } from '../services/toolbar-service';
var ToolTipRendererDirective = /** @class */ (function () {
    function ToolTipRendererDirective(_overlay, _overlayPositionBuilder, _elementRef, toolbarService) {
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
    ToolTipRendererDirective.prototype.show = /**
     * @return {?}
     */
    function () {
        this.toolbarService.destroy();
        if ((this.showToolTipOnTextOverflow &&
            this._elementRef.nativeElement.offsetWidth < this._elementRef.nativeElement.scrollWidth) ||
            this.showToolTip) {
            this.toolbarService.setToolbar(this._overlay, this._overlayPositionBuilder, this._elementRef, this.iceTooltipHtmlText, this.duration);
        }
    };
    /**
     * @return {?}
     */
    ToolTipRendererDirective.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.toolbarService.setTimeout(this.duration);
    };
    /**
     * @return {?}
     */
    ToolTipRendererDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.toolbarService.destroy();
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
        { type: ElementRef },
        { type: ToolbarService }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9pY2UtY3VzdG9tLWh0bWwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RDtJQVNFLGtDQUNVLFFBQWlCLEVBQ2pCLHVCQUErQyxFQUMvQyxXQUF1QixFQUN2QixjQUE4QjtRQUg5QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBd0I7UUFDL0MsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBUi9CLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLDhCQUF5QixHQUFHLEtBQUssQ0FBQztRQUNsQyxhQUFRLEdBQUcsQ0FBQyxDQUFDO0lBT25CLENBQUM7Ozs7SUFHSix1Q0FBSTs7O0lBREo7UUFFRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLElBQ0UsQ0FBQyxJQUFJLENBQUMseUJBQXlCO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFDMUYsSUFBSSxDQUFDLFdBQVcsRUFDaEI7WUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FDNUIsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsdUJBQXVCLEVBQzVCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FDZCxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7O0lBR0QsdUNBQUk7OztJQURKO1FBRUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCw4Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7O2dCQXpDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtpQkFDbkM7Ozs7Z0JBTlEsT0FBTztnQkFBRSxzQkFBc0I7Z0JBQ3BCLFVBQVU7Z0JBQ3JCLGNBQWM7OztxQ0FNcEIsS0FBSzs4QkFDTCxLQUFLOzRDQUNMLEtBQUs7MkJBQ0wsS0FBSzt1QkFTTCxZQUFZLFNBQUMsWUFBWTt1QkFrQnpCLFlBQVksU0FBQyxZQUFZOztJQVE1QiwrQkFBQztDQUFBLEFBMUNELElBMENDO1NBdkNZLHdCQUF3Qjs7O0lBQ25DLHNEQUFvQzs7SUFDcEMsK0NBQTRCOztJQUM1Qiw2REFBMkM7O0lBQzNDLDRDQUFzQjs7Ozs7SUFHcEIsNENBQXlCOzs7OztJQUN6QiwyREFBdUQ7Ozs7O0lBQ3ZELCtDQUErQjs7Ozs7SUFDL0Isa0RBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVBvc2l0aW9uQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb29sYmFyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Rvb2xiYXItc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tpY2VDdXN0b21IdG1sVG9vbFRpcF0nXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xUaXBSZW5kZXJlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGljZVRvb2x0aXBIdG1sVGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwT25UZXh0T3ZlcmZsb3cgPSBmYWxzZTtcbiAgQElucHV0KCkgZHVyYXRpb24gPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfb3ZlcmxheVBvc2l0aW9uQnVpbGRlcjogT3ZlcmxheVBvc2l0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgdG9vbGJhclNlcnZpY2U6IFRvb2xiYXJTZXJ2aWNlXG4gICkge31cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgc2hvdygpIHtcbiAgICB0aGlzLnRvb2xiYXJTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICBpZiAoXG4gICAgICAodGhpcy5zaG93VG9vbFRpcE9uVGV4dE92ZXJmbG93ICYmXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA8IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCkgfHxcbiAgICAgIHRoaXMuc2hvd1Rvb2xUaXBcbiAgICApIHtcbiAgICAgIHRoaXMudG9vbGJhclNlcnZpY2Uuc2V0VG9vbGJhcihcbiAgICAgICAgdGhpcy5fb3ZlcmxheSxcbiAgICAgICAgdGhpcy5fb3ZlcmxheVBvc2l0aW9uQnVpbGRlcixcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZixcbiAgICAgICAgdGhpcy5pY2VUb29sdGlwSHRtbFRleHQsXG4gICAgICAgIHRoaXMuZHVyYXRpb25cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIGhpZGUoKSB7XG4gICAgdGhpcy50b29sYmFyU2VydmljZS5zZXRUaW1lb3V0KHRoaXMuZHVyYXRpb24pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy50b29sYmFyU2VydmljZS5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==