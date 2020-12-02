/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
export class DatatableSelectComponent {
    constructor() {
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
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        if (!this._options) {
            this.currentClass = (options.find((/**
             * @param {?} option
             * @return {?}
             */
            option => option.value === this.value)) || { class: 'none' }).class;
            this._options = options;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.currentClass = (this._options.find((/**
         * @param {?} option
         * @return {?}
         */
        option => option.value === value)) || { class: 'none' }).class;
        this._value = value;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.value) {
            this.value = this.defaultValue;
        }
        if (this.value) {
            this.update.emit(this.value);
        }
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    emitUpdate(newValue) {
        this.currentClass = (this._options.find((/**
         * @param {?} option
         * @return {?}
         */
        option => option.value === newValue)) || { class: 'none' }).class;
        this.update.emit(newValue);
    }
}
DatatableSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ice-datatable-row-select',
                template: "<select *ngIf=\"_options\" style=\"width: 100%;\" [ngClass]=\"currentClass\" #selectElement (change)=\"emitUpdate(selectElement.value)\" [(ngModel)]=\"value\" [disabled]=\"selectDisabled\">\n      <option *ngFor=\"let item of _options\" [value]=\"item.value\" [disabled]=\"item.disabled\" [ngClass]=\"item.class || 'black'\">{{ item.label }}</option>\n</select>\n\n\n <!-- <mat-form-field appearance=\"fill\">\n  <mat-select>\n    <ng-container *ngFor=\"let item of options\">\n    <mat-option  [value]=\"item.value\">{{ item.label }}</mat-option>\n  </ng-container>\n  </mat-select>\n</mat-form-field> -->\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWRhdGF0YWJsZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pY2UtZGF0YXRhYmxlLXNlbGVjdC9pY2UtZGF0YXRhYmxlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3RILE1BQU0sT0FBTyx3QkFBd0I7SUFMckM7UUFNRSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRUQsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXRCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBZ0I5QyxpQkFBWSxHQUFHLFNBQVMsQ0FBQztJQWlCM0IsQ0FBQzs7Ozs7SUFoQ0MsSUFBYSxPQUFPLENBQUMsT0FBTztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7WUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3JHLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxJQUFhLEtBQUssQ0FBQyxLQUFLO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7OztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7O0lBTUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsUUFBUTtRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3pHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7OztZQWhERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsNG1CQUFvRDtnQkFDcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztvQkFNRSxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7b0JBQ0wsS0FBSztxQkFDTCxNQUFNO3NCQUNOLEtBQUs7c0JBTUwsS0FBSztvQkFDTCxLQUFLO3VCQU9MLFlBQVksU0FBQyxlQUFlOzs7O0lBekI3QiwyQ0FBZ0I7O0lBQ2hCLDBDQUFlOztJQUNmLHdDQUFVOztJQUVWLHlDQUF3Qjs7SUFDeEIsZ0RBQThCOztJQUM5QixnREFBOEI7O0lBQzlCLCtDQUE2Qjs7SUFDN0Isa0RBQWdDOztJQUNoQyx5Q0FBZTs7SUFDZiwwQ0FBOEM7O0lBTzlDLDJDQUF5Qjs7SUFRekIsNENBQXdDOztJQUN4QyxnREFBeUI7O0lBQ3pCLDRDQUFTOztJQUNULDBDQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vaWNlLWRhdGF0YWJsZS1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhdGFibGVTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBlZGl0aW5nID0gZmFsc2U7XG4gIGFjdGl2ZSA9IGZhbHNlO1xuICByb3dzID0gW107XG5cbiAgQElucHV0KCkgYWxpZ24gPSAnbGVmdCc7XG4gIEBJbnB1dCgpIGZvY3VzT25FbnRlciA9IGZhbHNlO1xuICBASW5wdXQoKSBkZWZhdWx0VmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgZWRpdE9uRm9jdXMgPSBmYWxzZTtcbiAgQElucHV0KCkgc2VsZWN0RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdGl0bGU7XG4gIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmICghdGhpcy5fb3B0aW9ucykge1xuICAgICAgdGhpcy5jdXJyZW50Q2xhc3MgPSAob3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHRoaXMudmFsdWUpIHx8IHsgY2xhc3M6ICdub25lJyB9KS5jbGFzcztcbiAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKSBkZWZhdWx0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuY3VycmVudENsYXNzID0gKHRoaXMuX29wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSB2YWx1ZSkgfHwgeyBjbGFzczogJ25vbmUnIH0pLmNsYXNzO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBAVmlld0NoaWxkcmVuKCdzZWxlY3RFbGVtZW50Jykgc2VsZWN0RWw7XG4gIGN1cnJlbnRDbGFzcyA9ICdpbml0aWFsJztcbiAgX29wdGlvbnM7XG4gIF92YWx1ZTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZW1pdFVwZGF0ZShuZXdWYWx1ZSkge1xuICAgIHRoaXMuY3VycmVudENsYXNzID0gKHRoaXMuX29wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBuZXdWYWx1ZSkgfHwgeyBjbGFzczogJ25vbmUnIH0pLmNsYXNzO1xuICAgIHRoaXMudXBkYXRlLmVtaXQobmV3VmFsdWUpO1xuICB9XG59XG4iXX0=