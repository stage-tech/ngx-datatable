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
                template: "<select #selectElement (change)=\"emitUpdate(selectElement.value)\" [value]=\"value\" [disabled]=\"selectDisabled\">\n  <ng-container *ngIf=\"options\">\n    <ng-container *ngFor=\"let item of options\">\n      <option [value]=\"item.value\">{{ item.label }}</option>\n    </ng-container>\n  </ng-container>\n</select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
DatatableSelectComponent.propDecorators = {
    align: [{ type: Input }],
    focusOnEnter: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWRhdGF0YWJsZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pY2UtZGF0YXRhYmxlLXNlbGVjdC9pY2UtZGF0YXRhYmxlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3RILE1BQU0sT0FBTyx3QkFBd0I7SUFMckM7UUFNRSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRUQsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ3JDLFlBQU8sR0FBRyxFQUFFLENBQUM7SUFjeEIsQ0FBQzs7OztJQVRDLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7OztZQTVCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsNFVBQW9EO2dCQUNwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O29CQU1FLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7cUJBQ0wsTUFBTTtzQkFDTixLQUFLO3NCQUNMLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxZQUFZLFNBQUMsZUFBZTs7OztJQVo3QiwyQ0FBZ0I7O0lBQ2hCLDBDQUFlOztJQUNmLHdDQUFVOztJQUVWLHlDQUF3Qjs7SUFDeEIsZ0RBQThCOztJQUM5QiwrQ0FBNkI7O0lBQzdCLGtEQUFnQzs7SUFDaEMsMENBQThDOztJQUM5QywyQ0FBc0I7O0lBQ3RCLDJDQUF5Qjs7SUFDekIseUNBQXVCOztJQUN2Qiw0Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ljZS1kYXRhdGFibGUtcm93LXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9pY2UtZGF0YXRhYmxlLXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGVkaXRpbmcgPSBmYWxzZTtcbiAgYWN0aXZlID0gZmFsc2U7XG4gIHJvd3MgPSBbXTtcblxuICBASW5wdXQoKSBhbGlnbiA9ICdsZWZ0JztcbiAgQElucHV0KCkgZm9jdXNPbkVudGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVkaXRPbkZvY3VzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdERpc2FibGVkID0gZmFsc2U7XG4gIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQElucHV0KCkgb3B0aW9ucyA9IFtdO1xuICBASW5wdXQoKSBkZWZhdWx0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG4gIEBWaWV3Q2hpbGRyZW4oJ3NlbGVjdEVsZW1lbnQnKSBzZWxlY3RFbDtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGUuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBlbWl0VXBkYXRlKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy51cGRhdGUuZW1pdChuZXdWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==