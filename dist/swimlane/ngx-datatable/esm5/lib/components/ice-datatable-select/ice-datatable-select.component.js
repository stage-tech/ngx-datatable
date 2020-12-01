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
                    template: "<select *ngIf=\"_options\" [ngClass]=\"currentClass\" #selectElement (change)=\"emitUpdate(selectElement.value)\" [(ngModel)]=\"value\" [disabled]=\"selectDisabled\">\n      <option *ngFor=\"let item of _options\" [value]=\"item.value\" [disabled]=\"item.disabled\" [ngClass]=\"item.class || 'black'\">{{ item.label }}</option>\n</select>\n\n\n <!-- <mat-form-field appearance=\"fill\">\n  <mat-select>\n    <ng-container *ngFor=\"let item of options\">\n    <mat-option  [value]=\"item.value\">{{ item.label }}</mat-option>\n  </ng-container>\n  </mat-select>\n</mat-form-field> -->\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWRhdGF0YWJsZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pY2UtZGF0YXRhYmxlLXNlbGVjdC9pY2UtZGF0YXRhYmxlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRIO0lBQUE7UUFNRSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRUQsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXRCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBZ0I5QyxpQkFBWSxHQUFHLFNBQVMsQ0FBQztJQWlCM0IsQ0FBQztJQWhDQyxzQkFBYSw2Q0FBTzs7Ozs7UUFBcEIsVUFBcUIsT0FBTztZQUE1QixpQkFLQztZQUpDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7Z0JBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUksQ0FBQyxLQUFLLEVBQTNCLENBQTJCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDckcsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDekI7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHNCQUFhLDJDQUFLOzs7O1FBSWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBTkQsVUFBbUIsS0FBSztZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBdEIsQ0FBc0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RHLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBOzs7O0lBU0QsMkNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDaEM7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7OztJQUVELDZDQUFVOzs7O0lBQVYsVUFBVyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUF6QixDQUF5QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDekcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Z0JBaERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxxbEJBQW9EO29CQUNwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozt3QkFNRSxLQUFLOytCQUNMLEtBQUs7K0JBQ0wsS0FBSzs4QkFDTCxLQUFLO2lDQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxNQUFNOzBCQUNOLEtBQUs7MEJBTUwsS0FBSzt3QkFDTCxLQUFLOzJCQU9MLFlBQVksU0FBQyxlQUFlOztJQWtCL0IsK0JBQUM7Q0FBQSxBQWpERCxJQWlEQztTQTVDWSx3QkFBd0I7OztJQUNuQywyQ0FBZ0I7O0lBQ2hCLDBDQUFlOztJQUNmLHdDQUFVOztJQUVWLHlDQUF3Qjs7SUFDeEIsZ0RBQThCOztJQUM5QixnREFBOEI7O0lBQzlCLCtDQUE2Qjs7SUFDN0Isa0RBQWdDOztJQUNoQyx5Q0FBZTs7SUFDZiwwQ0FBOEM7O0lBTzlDLDJDQUF5Qjs7SUFRekIsNENBQXdDOztJQUN4QyxnREFBeUI7O0lBQ3pCLDRDQUFTOztJQUNULDBDQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vaWNlLWRhdGF0YWJsZS1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhdGFibGVTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBlZGl0aW5nID0gZmFsc2U7XG4gIGFjdGl2ZSA9IGZhbHNlO1xuICByb3dzID0gW107XG5cbiAgQElucHV0KCkgYWxpZ24gPSAnbGVmdCc7XG4gIEBJbnB1dCgpIGZvY3VzT25FbnRlciA9IGZhbHNlO1xuICBASW5wdXQoKSBkZWZhdWx0VmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgZWRpdE9uRm9jdXMgPSBmYWxzZTtcbiAgQElucHV0KCkgc2VsZWN0RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdGl0bGU7XG4gIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmICghdGhpcy5fb3B0aW9ucykge1xuICAgICAgdGhpcy5jdXJyZW50Q2xhc3MgPSAob3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHRoaXMudmFsdWUpIHx8IHsgY2xhc3M6ICdub25lJyB9KS5jbGFzcztcbiAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKSBkZWZhdWx0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuY3VycmVudENsYXNzID0gKHRoaXMuX29wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSB2YWx1ZSkgfHwgeyBjbGFzczogJ25vbmUnIH0pLmNsYXNzO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBAVmlld0NoaWxkcmVuKCdzZWxlY3RFbGVtZW50Jykgc2VsZWN0RWw7XG4gIGN1cnJlbnRDbGFzcyA9ICdpbml0aWFsJztcbiAgX29wdGlvbnM7XG4gIF92YWx1ZTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZW1pdFVwZGF0ZShuZXdWYWx1ZSkge1xuICAgIHRoaXMuY3VycmVudENsYXNzID0gKHRoaXMuX29wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBuZXdWYWx1ZSkgfHwgeyBjbGFzczogJ25vbmUnIH0pLmNsYXNzO1xuICAgIHRoaXMudXBkYXRlLmVtaXQobmV3VmFsdWUpO1xuICB9XG59XG4iXX0=