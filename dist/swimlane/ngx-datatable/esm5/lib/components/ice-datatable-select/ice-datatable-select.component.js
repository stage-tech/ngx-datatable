/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
var DatatableSelectComponent = /** @class */ (function () {
    function DatatableSelectComponent() {
        this.editing = false;
        this.active = false;
        this.rows = [];
        this.align = 'left';
        this.focusOnEnter = false;
        this.editOnFocus = false;
        this.selectDisabled = false;
        this.update = new EventEmitter();
        this.currentClass = 'initial';
    }
    Object.defineProperty(DatatableSelectComponent.prototype, "options", {
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            var _this = this;
            if (!this._options) {
                this.currentClass = (options.find((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.value === _this.value; })) || { class: 'none' }).class;
                this._options = options;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableSelectComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.currentClass = (this._options.find((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.value === value; })) || { class: 'none' }).class;
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatatableSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.value) {
            this.value = this.defaultValue;
        }
        if (this.value) {
            this.update.emit(this.value);
        }
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    DatatableSelectComponent.prototype.emitUpdate = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        this.currentClass = (this._options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.value === newValue; })) || { class: 'none' }).class;
        this.update.emit(newValue);
    };
    DatatableSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ice-datatable-row-select',
                    template: "<select *ngIf=\"_options\" style=\"width: 100%;\" [ngClass]=\"currentClass\" #selectElement (change)=\"emitUpdate(selectElement.value)\" [(ngModel)]=\"value\" [disabled]=\"selectDisabled\">\r\n      <option *ngFor=\"let item of _options\" [value]=\"item.value\" [disabled]=\"item.disabled\" [ngClass]=\"item.class || 'black'\">{{ item.label }}</option>\r\n</select>\r\n\r\n\r\n <!-- <mat-form-field appearance=\"fill\">\r\n  <mat-select>\r\n    <ng-container *ngFor=\"let item of options\">\r\n    <mat-option  [value]=\"item.value\">{{ item.label }}</mat-option>\r\n  </ng-container>\r\n  </mat-select>\r\n</mat-form-field> -->\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    DatatableSelectComponent.propDecorators = {
        align: [{ type: Input }],
        focusOnEnter: [{ type: Input }],
        defaultValue: [{ type: Input }],
        editOnFocus: [{ type: Input }],
        selectDisabled: [{ type: Input }],
        title: [{ type: Input }],
        update: [{ type: Output }],
        options: [{ type: Input }],
        default: [{ type: Input }],
        value: [{ type: Input }],
        selectEl: [{ type: ViewChildren, args: ['selectElement',] }]
    };
    return DatatableSelectComponent;
}());
export { DatatableSelectComponent };
if (false) {
    /** @type {?} */
    DatatableSelectComponent.prototype.editing;
    /** @type {?} */
    DatatableSelectComponent.prototype.active;
    /** @type {?} */
    DatatableSelectComponent.prototype.rows;
    /** @type {?} */
    DatatableSelectComponent.prototype.align;
    /** @type {?} */
    DatatableSelectComponent.prototype.focusOnEnter;
    /** @type {?} */
    DatatableSelectComponent.prototype.defaultValue;
    /** @type {?} */
    DatatableSelectComponent.prototype.editOnFocus;
    /** @type {?} */
    DatatableSelectComponent.prototype.selectDisabled;
    /** @type {?} */
    DatatableSelectComponent.prototype.title;
    /** @type {?} */
    DatatableSelectComponent.prototype.update;
    /** @type {?} */
    DatatableSelectComponent.prototype.default;
    /** @type {?} */
    DatatableSelectComponent.prototype.selectEl;
    /** @type {?} */
    DatatableSelectComponent.prototype.currentClass;
    /** @type {?} */
    DatatableSelectComponent.prototype._options;
    /** @type {?} */
    DatatableSelectComponent.prototype._value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWRhdGF0YWJsZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pY2UtZGF0YXRhYmxlLXNlbGVjdC9pY2UtZGF0YXRhYmxlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRIO0lBQUE7UUFNRSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRUQsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXRCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBZ0I5QyxpQkFBWSxHQUFHLFNBQVMsQ0FBQztJQWlCM0IsQ0FBQztJQWhDQyxzQkFBYSw2Q0FBTzs7Ozs7UUFBcEIsVUFBcUIsT0FBTztZQUE1QixpQkFLQztZQUpDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7Z0JBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUksQ0FBQyxLQUFLLEVBQTNCLENBQTJCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDckcsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDekI7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHNCQUFhLDJDQUFLOzs7O1FBSWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBTkQsVUFBbUIsS0FBSztZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBdEIsQ0FBc0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RHLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBOzs7O0lBU0QsMkNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDaEM7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7OztJQUVELDZDQUFVOzs7O0lBQVYsVUFBVyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUF6QixDQUF5QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDekcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Z0JBaERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxvb0JBQW9EO29CQUNwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozt3QkFNRSxLQUFLOytCQUNMLEtBQUs7K0JBQ0wsS0FBSzs4QkFDTCxLQUFLO2lDQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxNQUFNOzBCQUNOLEtBQUs7MEJBTUwsS0FBSzt3QkFDTCxLQUFLOzJCQU9MLFlBQVksU0FBQyxlQUFlOztJQWtCL0IsK0JBQUM7Q0FBQSxBQWpERCxJQWlEQztTQTVDWSx3QkFBd0I7OztJQUNuQywyQ0FBZ0I7O0lBQ2hCLDBDQUFlOztJQUNmLHdDQUFVOztJQUVWLHlDQUF3Qjs7SUFDeEIsZ0RBQThCOztJQUM5QixnREFBOEI7O0lBQzlCLCtDQUE2Qjs7SUFDN0Isa0RBQWdDOztJQUNoQyx5Q0FBZTs7SUFDZiwwQ0FBOEM7O0lBTzlDLDJDQUF5Qjs7SUFRekIsNENBQXdDOztJQUN4QyxnREFBeUI7O0lBQ3pCLDRDQUFTOztJQUNULDBDQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pY2UtZGF0YXRhYmxlLXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgZWRpdGluZyA9IGZhbHNlO1xyXG4gIGFjdGl2ZSA9IGZhbHNlO1xyXG4gIHJvd3MgPSBbXTtcclxuXHJcbiAgQElucHV0KCkgYWxpZ24gPSAnbGVmdCc7XHJcbiAgQElucHV0KCkgZm9jdXNPbkVudGVyID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGVmYXVsdFZhbHVlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZWRpdE9uRm9jdXMgPSBmYWxzZTtcclxuICBASW5wdXQoKSBzZWxlY3REaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRpdGxlO1xyXG4gIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zKSB7XHJcbiAgICBpZiAoIXRoaXMuX29wdGlvbnMpIHtcclxuICAgICAgdGhpcy5jdXJyZW50Q2xhc3MgPSAob3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHRoaXMudmFsdWUpIHx8IHsgY2xhc3M6ICdub25lJyB9KS5jbGFzcztcclxuICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIEBJbnB1dCgpIGRlZmF1bHQ6IHN0cmluZztcclxuICBASW5wdXQoKSBzZXQgdmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMuY3VycmVudENsYXNzID0gKHRoaXMuX29wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSB2YWx1ZSkgfHwgeyBjbGFzczogJ25vbmUnIH0pLmNsYXNzO1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IHZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBAVmlld0NoaWxkcmVuKCdzZWxlY3RFbGVtZW50Jykgc2VsZWN0RWw7XHJcbiAgY3VycmVudENsYXNzID0gJ2luaXRpYWwnO1xyXG4gIF9vcHRpb25zO1xyXG4gIF92YWx1ZTtcclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy51cGRhdGUuZW1pdCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVtaXRVcGRhdGUobmV3VmFsdWUpIHtcclxuICAgIHRoaXMuY3VycmVudENsYXNzID0gKHRoaXMuX29wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBuZXdWYWx1ZSkgfHwgeyBjbGFzczogJ25vbmUnIH0pLmNsYXNzO1xyXG4gICAgdGhpcy51cGRhdGUuZW1pdChuZXdWYWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==