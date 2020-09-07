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
        this.options = [];
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
        this.update.emit(newValue);
    }
}
DatatableSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ice-datatable-row-select',
                template: "<select #selectElement (change)=\"emitUpdate(selectElement.value)\" [value]=\"value\" [disabled]=\"selectDisabled\">\r\n  <ng-container *ngIf=\"options\">\r\n    <ng-container *ngFor=\"let item of options\">\r\n      <option [value]=\"item.value\">{{ item.label }}</option>\r\n    </ng-container>\r\n  </ng-container>\r\n</select>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
DatatableSelectComponent.propDecorators = {
    align: [{ type: Input }],
    focusOnEnter: [{ type: Input }],
    defaultValue: [{ type: Input }],
    editOnFocus: [{ type: Input }],
    selectDisabled: [{ type: Input }],
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
    DatatableSelectComponent.prototype.update;
    /** @type {?} */
    DatatableSelectComponent.prototype.options;
    /** @type {?} */
    DatatableSelectComponent.prototype.default;
    /** @type {?} */
    DatatableSelectComponent.prototype.value;
    /** @type {?} */
    DatatableSelectComponent.prototype.selectEl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWRhdGF0YWJsZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pY2UtZGF0YXRhYmxlLXNlbGVjdC9pY2UtZGF0YXRhYmxlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3RILE1BQU0sT0FBTyx3QkFBd0I7SUFMckM7UUFNRSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRUQsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ3JDLFlBQU8sR0FBRyxFQUFFLENBQUM7SUFpQnhCLENBQUM7Ozs7SUFaQyxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDaEM7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7OztZQWhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsMFZBQW9EO2dCQUNwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O29CQU1FLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7NkJBQ0wsS0FBSztxQkFDTCxNQUFNO3NCQUNOLEtBQUs7c0JBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLFlBQVksU0FBQyxlQUFlOzs7O0lBYjdCLDJDQUFnQjs7SUFDaEIsMENBQWU7O0lBQ2Ysd0NBQVU7O0lBRVYseUNBQXdCOztJQUN4QixnREFBOEI7O0lBQzlCLGdEQUE4Qjs7SUFDOUIsK0NBQTZCOztJQUM3QixrREFBZ0M7O0lBQ2hDLDBDQUE4Qzs7SUFDOUMsMkNBQXNCOztJQUN0QiwyQ0FBeUI7O0lBQ3pCLHlDQUF1Qjs7SUFDdkIsNENBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vaWNlLWRhdGF0YWJsZS1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhdGFibGVTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBlZGl0aW5nID0gZmFsc2U7XG4gIGFjdGl2ZSA9IGZhbHNlO1xuICByb3dzID0gW107XG5cbiAgQElucHV0KCkgYWxpZ24gPSAnbGVmdCc7XG4gIEBJbnB1dCgpIGZvY3VzT25FbnRlciA9IGZhbHNlO1xuICBASW5wdXQoKSBkZWZhdWx0VmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgZWRpdE9uRm9jdXMgPSBmYWxzZTtcbiAgQElucHV0KCkgc2VsZWN0RGlzYWJsZWQgPSBmYWxzZTtcbiAgQE91dHB1dCgpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBASW5wdXQoKSBvcHRpb25zID0gW107XG4gIEBJbnB1dCgpIGRlZmF1bHQ6IHN0cmluZztcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcbiAgQFZpZXdDaGlsZHJlbignc2VsZWN0RWxlbWVudCcpIHNlbGVjdEVsO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGUuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBlbWl0VXBkYXRlKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy51cGRhdGUuZW1pdChuZXdWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==