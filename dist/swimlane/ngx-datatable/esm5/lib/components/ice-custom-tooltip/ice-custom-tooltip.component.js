/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
var CustomToolTipComponent = /** @class */ (function () {
    function CustomToolTipComponent() {
    }
    /**
     * @return {?}
     */
    CustomToolTipComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (this.onMouseLeave) {
            this.onMouseLeave();
        }
    };
    /**
     * @return {?}
     */
    CustomToolTipComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        if (this.onMouseEnter) {
            this.onMouseEnter();
        }
    };
    CustomToolTipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ice-custom-tooltip',
                    template: "<div>\r\n  <div class=\"tooltip-container\">\r\n    <div [innerHTML]=\"text\"></div>\r\n  </div>\r\n</div>\r\n",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ice-custom-tooltip'
                    },
                    styles: [".ice-custom-tooltip .tooltip-container{border:1px solid gray;border-radius:5px;padding:1px 5px 4px;background:#616161;color:#fff}.ice-custom-tooltip .tooltip-table{border-collapse:collapse}.ice-custom-tooltip .tooltip-header-row{border-bottom:1pt solid #fff}.ice-custom-tooltip .text-align-left{text-align:left}.ice-custom-tooltip .text-align-vertical-center{vertical-align:middle!important}.ice-custom-tooltip .cell-padding{padding:5px;margin:5px}"]
                }] }
    ];
    CustomToolTipComponent.propDecorators = {
        text: [{ type: Input }],
        onMouseLeave: [{ type: Input }],
        onMouseEnter: [{ type: Input }],
        hide: [{ type: HostListener, args: ['mouseleave',] }],
        show: [{ type: HostListener, args: ['mouseenter',] }]
    };
    return CustomToolTipComponent;
}());
export { CustomToolTipComponent };
if (false) {
    /** @type {?} */
    CustomToolTipComponent.prototype.text;
    /** @type {?} */
    CustomToolTipComponent.prototype.onMouseLeave;
    /** @type {?} */
    CustomToolTipComponent.prototype.onMouseEnter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWN1c3RvbS10b29sdGlwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaWNlLWN1c3RvbS10b29sdGlwL2ljZS1jdXN0b20tdG9vbHRpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRjtJQUFBO0lBMkJBLENBQUM7Ozs7SUFaQyxxQ0FBSTs7O0lBREo7UUFFRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7OztJQUdELHFDQUFJOzs7SUFESjtRQUVFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDOztnQkExQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLDBIQUFrRDtvQkFDbEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBRXJDLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsb0JBQW9CO3FCQUM1Qjs7aUJBQ0Y7Ozt1QkFFRSxLQUFLOytCQUNMLEtBQUs7K0JBQ0wsS0FBSzt1QkFFTCxZQUFZLFNBQUMsWUFBWTt1QkFPekIsWUFBWSxTQUFDLFlBQVk7O0lBTTVCLDZCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0FsQlksc0JBQXNCOzs7SUFDakMsc0NBQXNCOztJQUN0Qiw4Q0FBa0M7O0lBQ2xDLDhDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdExpc3RlbmVyLCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaWNlLWN1c3RvbS10b29sdGlwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ljZS1jdXN0b20tdG9vbHRpcC5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL2ljZS1jdXN0b20tdG9vbHRpcC5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdpY2UtY3VzdG9tLXRvb2x0aXAnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tVG9vbFRpcENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRleHQ6IHN0cmluZztcbiAgQElucHV0KCkgb25Nb3VzZUxlYXZlOiAoKSA9PiB2b2lkO1xuICBASW5wdXQoKSBvbk1vdXNlRW50ZXI6ICgpID0+IHZvaWQ7XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMub25Nb3VzZUxlYXZlKSB7XG4gICAgICB0aGlzLm9uTW91c2VMZWF2ZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBzaG93KCkge1xuICAgIGlmICh0aGlzLm9uTW91c2VFbnRlcikge1xuICAgICAgdGhpcy5vbk1vdXNlRW50ZXIoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==