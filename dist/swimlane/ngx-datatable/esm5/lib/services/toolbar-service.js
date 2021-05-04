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
var ToolbarService = /** @class */ (function () {
    function ToolbarService() {
    }
    /**
     * @param {?} _overlay
     * @param {?} _overlayPositionBuilder
     * @param {?} _elementRef
     * @param {?} iceTooltipHtmlText
     * @param {?} duration
     * @return {?}
     */
    ToolbarService.prototype.setToolbar = /**
     * @param {?} _overlay
     * @param {?} _overlayPositionBuilder
     * @param {?} _elementRef
     * @param {?} iceTooltipHtmlText
     * @param {?} duration
     * @return {?}
     */
    function (_overlay, _overlayPositionBuilder, _elementRef, iceTooltipHtmlText, duration) {
        var _this = this;
        if (!this._overlayRef) {
            /** @type {?} */
            var positionStrategy = _overlayPositionBuilder.flexibleConnectedTo(_elementRef).withPositions([
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    offsetY: -5
                }
            ]);
            this._overlayRef = _overlay.create({ positionStrategy: positionStrategy });
        }
        if (!this._overlayRef.hasAttached()) {
            /** @type {?} */
            var tooltipRef = this._overlayRef.attach(new ComponentPortal(CustomToolTipComponent));
            this.componentInstance = tooltipRef;
            this.componentInstance.instance.text = iceTooltipHtmlText;
            this.componentInstance.instance.onMouseLeave = (/**
             * @return {?}
             */
            function () { return (_this.clearTimeout(), _this.setTimeout(duration)); });
            this.componentInstance.instance.onMouseEnter = (/**
             * @return {?}
             */
            function () { return _this.clearTimeout(); });
        }
    };
    /**
     * @return {?}
     */
    ToolbarService.prototype.clearTimeout = /**
     * @return {?}
     */
    function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };
    /**
     * @param {?} duration
     * @return {?}
     */
    ToolbarService.prototype.setTimeout = /**
     * @param {?} duration
     * @return {?}
     */
    function (duration) {
        var _this = this;
        this.timeout = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.closeToolTip();
        }), duration);
    };
    /**
     * @return {?}
     */
    ToolbarService.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.clearTimeout();
        this.closeToolTip();
        this._overlayRef = (/** @type {?} */ (null));
    };
    /**
     * @return {?}
     */
    ToolbarService.prototype.closeToolTip = /**
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.componentInstance = (/** @type {?} */ (null));
        }
    };
    ToolbarService.decorators = [
        { type: Injectable }
    ];
    return ToolbarService;
}());
export { ToolbarService };
if (false) {
    /** @type {?} */
    ToolbarService.prototype._overlayRef;
    /** @type {?} */
    ToolbarService.prototype.timeout;
    /** @type {?} */
    ToolbarService.prototype.componentInstance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdG9vbGJhci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0RBQStELENBQUM7Ozs7O0FBS3ZHO0lBQUE7SUFzREEsQ0FBQzs7Ozs7Ozs7O0lBaERDLG1DQUFVOzs7Ozs7OztJQUFWLFVBQVcsUUFBUSxFQUFFLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxRQUFRO1FBQXZGLGlCQXNCQztRQXJCQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7Z0JBQ2YsZ0JBQWdCLEdBQUcsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDO2dCQUM5RjtvQkFDRSxPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLFFBQVEsRUFBRSxRQUFRO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxDQUFDO2lCQUNaO2FBQ0YsQ0FBQztZQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLGdCQUFnQixrQkFBQSxFQUFFLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFOztnQkFDN0IsVUFBVSxHQUF5QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FDOUUsSUFBSSxlQUFlLENBQUMsc0JBQXNCLENBQUMsQ0FDNUM7WUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDO1lBQzFELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsWUFBWTs7O1lBQUcsY0FBTSxPQUFBLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBaEQsQ0FBZ0QsQ0FBQSxDQUFDO1lBQ3RHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsWUFBWTs7O1lBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLEVBQUUsRUFBbkIsQ0FBbUIsQ0FBQSxDQUFDO1NBQzFFO0lBQ0gsQ0FBQzs7OztJQUVELHFDQUFZOzs7SUFBWjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxtQ0FBVTs7OztJQUFWLFVBQVcsUUFBUTtRQUFuQixpQkFJQztRQUhDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVTs7O1FBQUM7WUFDeEIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsR0FBRSxRQUFRLENBQUMsQ0FBQztJQUNmLENBQUM7Ozs7SUFFRCxnQ0FBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQUEsSUFBSSxFQUFDLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELHFDQUFZOzs7SUFBWjtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxtQkFBQSxJQUFJLEVBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7O2dCQXJERixVQUFVOztJQXNEWCxxQkFBQztDQUFBLEFBdERELElBc0RDO1NBckRZLGNBQWM7OztJQUN6QixxQ0FBK0I7O0lBQy9CLGlDQUFvQjs7SUFDcEIsMkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21Ub29sVGlwQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9pY2UtY3VzdG9tLXRvb2x0aXAvaWNlLWN1c3RvbS10b29sdGlwLmNvbXBvbmVudCc7XG4vKipcbiAqIHNlcnZpY2UgdG8gbWFrZSBEYXRhdGFibGVDb21wb25lbnQgYXdhcmUgb2YgY2hhbmdlcyB0b1xuICogaW5wdXQgYmluZGluZ3Mgb2YgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb29sYmFyU2VydmljZSB7XG4gIHB1YmxpYyBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgcHVibGljIHRpbWVvdXQ6IGFueTtcbiAgcHVibGljIGNvbXBvbmVudEluc3RhbmNlOiBhbnk7XG5cbiAgc2V0VG9vbGJhcihfb3ZlcmxheSwgX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsIF9lbGVtZW50UmVmLCBpY2VUb29sdGlwSHRtbFRleHQsIGR1cmF0aW9uKSB7XG4gICAgaWYgKCF0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXIuZmxleGlibGVDb25uZWN0ZWRUbyhfZWxlbWVudFJlZikud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgIHtcbiAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgICAgICBvZmZzZXRZOiAtNVxuICAgICAgICB9XG4gICAgICBdKTtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSBfb3ZlcmxheS5jcmVhdGUoeyBwb3NpdGlvblN0cmF0ZWd5IH0pO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX292ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgY29uc3QgdG9vbHRpcFJlZjogQ29tcG9uZW50UmVmPEN1c3RvbVRvb2xUaXBDb21wb25lbnQ+ID0gdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2goXG4gICAgICAgIG5ldyBDb21wb25lbnRQb3J0YWwoQ3VzdG9tVG9vbFRpcENvbXBvbmVudClcbiAgICAgICk7XG4gICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gdG9vbHRpcFJlZjtcbiAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UuaW5zdGFuY2UudGV4dCA9IGljZVRvb2x0aXBIdG1sVGV4dDtcbiAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UuaW5zdGFuY2Uub25Nb3VzZUxlYXZlID0gKCkgPT4gKHRoaXMuY2xlYXJUaW1lb3V0KCksIHRoaXMuc2V0VGltZW91dChkdXJhdGlvbikpO1xuICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5pbnN0YW5jZS5vbk1vdXNlRW50ZXIgPSAoKSA9PiB0aGlzLmNsZWFyVGltZW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyVGltZW91dCgpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBzZXRUaW1lb3V0KGR1cmF0aW9uKSB7XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlVG9vbFRpcCgpO1xuICAgIH0sIGR1cmF0aW9uKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgICB0aGlzLmNsb3NlVG9vbFRpcCgpO1xuICAgIHRoaXMuX292ZXJsYXlSZWYgPSBudWxsITtcbiAgfVxuXG4gIGNsb3NlVG9vbFRpcCgpIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSBudWxsITtcbiAgICB9XG4gIH1cbn1cbiJdfQ==