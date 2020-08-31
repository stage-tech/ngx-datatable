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
    ngOnInit() {
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
            if (this._overlayRef && !this._overlayRef.hasAttached()) {
                /** @type {?} */
                const tooltipRef = this._overlayRef.attach(new ComponentPortal(CustomToolTipComponent));
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
        this.closeToolTip();
    }
    /**
     * @private
     * @return {?}
     */
    closeToolTip() {
        if (this._overlayRef) {
            this._overlayRef.detach();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9pY2UtY3VzdG9tLWh0bWwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBS3ZHLE1BQU0sT0FBTyx3QkFBd0I7Ozs7OztJQVNuQyxZQUNVLFFBQWlCLEVBQ2pCLHVCQUErQyxFQUMvQyxXQUF1QjtRQUZ2QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBd0I7UUFDL0MsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFWeEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsOEJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxDQUFDLENBQUM7SUFTbkIsQ0FBQzs7OztJQUVKLFFBQVE7O2NBQ0EsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDeEc7Z0JBQ0UsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsT0FBTyxFQUFFLENBQUMsQ0FBQzthQUNaO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7OztJQUdELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQ0UsQ0FBQyxJQUFJLENBQUMseUJBQXlCO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFDMUYsSUFBSSxDQUFDLFdBQVcsRUFDaEI7WUFDQSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFOztzQkFDakQsVUFBVSxHQUF5QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FDOUUsSUFBSSxlQUFlLENBQUMsc0JBQXNCLENBQUMsQ0FDNUM7Z0JBQ0QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2FBQ3BEO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBR0QsSUFBSTtRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNsQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7OztZQWxFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjthQUNuQzs7OztZQVBRLE9BQU87WUFBRSxzQkFBc0I7WUFFTixVQUFVOzs7aUNBT3pDLEtBQUs7MEJBQ0wsS0FBSzt3Q0FDTCxLQUFLO3VCQUNMLEtBQUs7bUJBeUJMLFlBQVksU0FBQyxZQUFZO21CQW1CekIsWUFBWSxTQUFDLFlBQVk7Ozs7SUEvQzFCLHNEQUFvQzs7SUFDcEMsK0NBQTRCOztJQUM1Qiw2REFBMkM7O0lBQzNDLDRDQUFzQjs7Ozs7SUFFdEIsK0NBQWdDOzs7OztJQUNoQywyQ0FBcUI7Ozs7O0lBR25CLDRDQUF5Qjs7Ozs7SUFDekIsMkRBQXVEOzs7OztJQUN2RCwrQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5UG9zaXRpb25CdWlsZGVyLCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEN1c3RvbVRvb2xUaXBDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2ljZS1jdXN0b20tdG9vbHRpcC9pY2UtY3VzdG9tLXRvb2x0aXAuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2ljZUN1c3RvbUh0bWxUb29sVGlwXSdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbFRpcFJlbmRlcmVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBASW5wdXQoKSBpY2VUb29sdGlwSHRtbFRleHQ6IHN0cmluZztcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcE9uVGV4dE92ZXJmbG93ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMDtcblxuICBwcml2YXRlIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuICBwcml2YXRlIHRpbWVvdXQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXI6IE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXIuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9lbGVtZW50UmVmKS53aXRoUG9zaXRpb25zKFtcbiAgICAgIHtcbiAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICAgIG9mZnNldFk6IC01XG4gICAgICB9XG4gICAgXSk7XG5cbiAgICB0aGlzLl9vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUoeyBwb3NpdGlvblN0cmF0ZWd5IH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICh0aGlzLnNob3dUb29sVGlwT25UZXh0T3ZlcmZsb3cgJiZcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIDwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoKSB8fFxuICAgICAgdGhpcy5zaG93VG9vbFRpcFxuICAgICkge1xuICAgICAgaWYgKHRoaXMuX292ZXJsYXlSZWYgJiYgIXRoaXMuX292ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICBjb25zdCB0b29sdGlwUmVmOiBDb21wb25lbnRSZWY8Q3VzdG9tVG9vbFRpcENvbXBvbmVudD4gPSB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaChcbiAgICAgICAgICBuZXcgQ29tcG9uZW50UG9ydGFsKEN1c3RvbVRvb2xUaXBDb21wb25lbnQpXG4gICAgICAgICk7XG4gICAgICAgIHRvb2x0aXBSZWYuaW5zdGFuY2UudGV4dCA9IHRoaXMuaWNlVG9vbHRpcEh0bWxUZXh0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBoaWRlKCkge1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZVRvb2xUaXAoKTtcbiAgICB9LCB0aGlzLmR1cmF0aW9uKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2VUb29sVGlwKCk7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlVG9vbFRpcCgpIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==