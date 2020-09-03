/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MouseEvent } from '../../events';
import { SortType } from '../../types/sort.type';
import { SelectionType } from '../../types/selection.type';
import { nextSortDir } from '../../utils/sort';
import { SortDirection } from '../../types/sort-direction.type';
var DataTableHeaderCellComponent = /** @class */ (function () {
    function DataTableHeaderCellComponent(cd) {
        this.cd = cd;
        this.sort = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
        this.filter = new EventEmitter();
        this.sortFn = this.onSort.bind(this);
        this.selectFn = this.select.emit.bind(this.select);
        this.filterCache = {};
        this.cellContext = {
            column: this.column,
            sortDir: this.sortDir,
            sortFn: this.sortFn,
            allRowsSelected: this.allRowsSelected,
            selectFn: this.selectFn
        };
    }
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "allRowsSelected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._allRowsSelected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._allRowsSelected = value;
            this.cellContext.allRowsSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "column", {
        get: /**
         * @return {?}
         */
        function () {
            return this._column;
        },
        set: /**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            this._column = column;
            this.cellContext.column = column;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "sorts", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sorts;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._sorts = val;
            this.sortDir = this.calcSortDir(val);
            this.cellContext.sortDir = this.sortDir;
            this.sortClass = this.calcSortClass(this.sortDir);
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "columnCssClasses", {
        get: /**
         * @return {?}
         */
        function () {
            var e_1, _a;
            /** @type {?} */
            var cls = 'datatable-header-cell';
            if (this.column.sortable)
                cls += ' sortable';
            if (this.column.resizeable)
                cls += ' resizeable';
            if (this.column.headerClass) {
                if (typeof this.column.headerClass === 'string') {
                    cls += ' ' + this.column.headerClass;
                }
                else if (typeof this.column.headerClass === 'function') {
                    /** @type {?} */
                    var res = this.column.headerClass({
                        column: this.column
                    });
                    if (typeof res === 'string') {
                        cls += res;
                    }
                    else if (typeof res === 'object') {
                        /** @type {?} */
                        var keys = Object.keys(res);
                        try {
                            for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                                var k = keys_1_1.value;
                                if (res[k] === true)
                                    cls += " " + k;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
            }
            /** @type {?} */
            var sortDir = this.sortDir;
            if (sortDir) {
                cls += " sort-active sort-" + sortDir;
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            // guaranteed to have a value by setColumnDefaults() in column-helper.ts
            return this.column.headerTemplate === undefined ? this.column.name : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "minWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.column.minWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "maxWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.column.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "width", {
        get: /**
         * @return {?}
         */
        function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "isCheckboxable", {
        get: /**
         * @return {?}
         */
        function () {
            return this.column.checkboxable && this.column.headerCheckboxable && this.selectionType === SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} $event
     * @return {?}
     */
    DataTableHeaderCellComponent.prototype.onContextmenu = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.columnContextmenu.emit({ event: $event, column: this.column });
    };
    /**
     * @param {?} sorts
     * @return {?}
     */
    DataTableHeaderCellComponent.prototype.calcSortDir = /**
     * @param {?} sorts
     * @return {?}
     */
    function (sorts) {
        var _this = this;
        if (sorts && this.column) {
            /** @type {?} */
            var sort = sorts.find((/**
             * @param {?} s
             * @return {?}
             */
            function (s) {
                return s.prop === _this.column.prop;
            }));
            if (sort)
                return sort.dir;
        }
    };
    /**
     * @return {?}
     */
    DataTableHeaderCellComponent.prototype.onSort = /**
     * @return {?}
     */
    function () {
        if (!this.column.sortable)
            return;
        /** @type {?} */
        var newValue = nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue: newValue
        });
    };
    /**
     * @param {?} sortDir
     * @return {?}
     */
    DataTableHeaderCellComponent.prototype.calcSortClass = /**
     * @param {?} sortDir
     * @return {?}
     */
    function (sortDir) {
        if (sortDir === SortDirection.asc) {
            return "sort-btn sort-asc " + this.sortAscendingIcon;
        }
        else if (sortDir === SortDirection.desc) {
            return "sort-btn sort-desc " + this.sortDescendingIcon;
        }
        else {
            return "sort-btn";
        }
    };
    /**
     * @param {?} column
     * @return {?}
     */
    DataTableHeaderCellComponent.prototype.setFilter = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        this.filter.emit({
            column: column,
            value: this.filterCache[column]
        });
    };
    /**
     * @param {?} column
     * @return {?}
     */
    DataTableHeaderCellComponent.prototype.resetFilter = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        this.filterCache[column] = '';
        this.filter.emit({
            column: column
        });
    };
    DataTableHeaderCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-header-cell',
                    template: "\n    <div class=\"datatable-header-cell-template-wrap\">\n      <ng-container *ngIf=\"column.filter\">\n        <mat-form-field class=\"filter-header\">\n          <input\n            matInput\n            [placeholder]=\"column.name\"\n            [(ngModel)]=\"filterCache[column.prop]\"\n            (ngModelChange)=\"setFilter(column.prop)\"\n          />\n          <button\n            mat-button\n            *ngIf=\"filterCache[column.prop]\"\n            matSuffix\n            mat-icon-button\n            aria-label=\"Clear\"\n            (click)=\"resetFilter(column.prop)\"\n          >\n            <mat-icon class=\"mat-icon material-icons\">close</mat-icon>\n          </button>\n        </mat-form-field>\n        <button mat-icon-button>\n          <mat-icon class=\"mat-icon material-icons\" (click)=\"onSort()\">sort</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"!column.filter\">\n        <ng-template\n          *ngIf=\"isTarget\"\n          [ngTemplateOutlet]=\"targetMarkerTemplate\"\n          [ngTemplateOutletContext]=\"targetMarkerContext\"\n        >\n        </ng-template>\n        <label *ngIf=\"isCheckboxable\" class=\"datatable-checkbox\">\n          <input type=\"checkbox\" [checked]=\"allRowsSelected\" (change)=\"select.emit(!allRowsSelected)\" />\n        </label>\n        <span *ngIf=\"!column.headerTemplate\" class=\"datatable-header-cell-wrapper\">\n          <span class=\"datatable-header-cell-label draggable\" (click)=\"onSort()\" [innerHTML]=\"name\"> </span>\n        </span>\n        <ng-template\n          *ngIf=\"column.headerTemplate\"\n          [ngTemplateOutlet]=\"column.headerTemplate\"\n          [ngTemplateOutletContext]=\"cellContext\"\n        >\n        </ng-template>\n        <span (click)=\"onSort()\" [class]=\"sortClass\"> </span>\n      </ng-container>\n    </div>\n  ",
                    host: {
                        class: 'datatable-header-cell'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    DataTableHeaderCellComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    DataTableHeaderCellComponent.propDecorators = {
        sortType: [{ type: Input }],
        sortAscendingIcon: [{ type: Input }],
        sortDescendingIcon: [{ type: Input }],
        isTarget: [{ type: Input }],
        targetMarkerTemplate: [{ type: Input }],
        targetMarkerContext: [{ type: Input }],
        allRowsSelected: [{ type: Input }],
        selectionType: [{ type: Input }],
        column: [{ type: Input }],
        headerHeight: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
        sorts: [{ type: Input }],
        sort: [{ type: Output }],
        select: [{ type: Output }],
        columnContextmenu: [{ type: Output }],
        filter: [{ type: Output }],
        columnCssClasses: [{ type: HostBinding, args: ['class',] }],
        name: [{ type: HostBinding, args: ['attr.title',] }],
        minWidth: [{ type: HostBinding, args: ['style.minWidth.px',] }],
        maxWidth: [{ type: HostBinding, args: ['style.maxWidth.px',] }],
        width: [{ type: HostBinding, args: ['style.width.px',] }],
        onContextmenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
    };
    return DataTableHeaderCellComponent;
}());
export { DataTableHeaderCellComponent };
if (false) {
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortType;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortAscendingIcon;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortDescendingIcon;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.isTarget;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.targetMarkerTemplate;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.targetMarkerContext;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype._allRowsSelected;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.selectionType;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.headerHeight;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sort;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.select;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.columnContextmenu;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.filter;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortFn;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortClass;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortDir;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.selectFn;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.filterCache;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.cellContext;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderCellComponent.prototype._column;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderCellComponent.prototype._sorts;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderCellComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsWUFBWSxFQUNaLE1BQU0sRUFDTixXQUFXLEVBQ1gsWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJaEU7SUFzTEUsc0NBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBaEYvQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLHNCQUFpQixHQUFHLElBQUksWUFBWSxDQUFxQyxLQUFLLENBQUMsQ0FBQztRQUNoRixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUE0RHpELFdBQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUdoQyxhQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQixnQkFBVyxHQUFRO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQztJQUswQyxDQUFDO0lBcEg3QyxzQkFBYSx5REFBZTs7OztRQUk1QjtZQUNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQy9CLENBQUM7Ozs7O1FBTkQsVUFBNkIsS0FBSztZQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQU9ELHNCQUFhLGdEQUFNOzs7O1FBTW5CO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7Ozs7O1FBUkQsVUFBb0IsTUFBbUI7WUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFVRCxzQkFBYSwrQ0FBSzs7OztRQVFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQVZELFVBQW1CLEdBQVU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBV0Qsc0JBQ0ksMERBQWdCOzs7O1FBRHBCOzs7Z0JBRU0sR0FBRyxHQUFHLHVCQUF1QjtZQUVqQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtnQkFBRSxHQUFHLElBQUksV0FBVyxDQUFDO1lBQzdDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO2dCQUFFLEdBQUcsSUFBSSxhQUFhLENBQUM7WUFDakQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDM0IsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtvQkFDL0MsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztpQkFDdEM7cUJBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxLQUFLLFVBQVUsRUFBRTs7d0JBQ2xELEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQzt3QkFDbEMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO3FCQUNwQixDQUFDO29CQUVGLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO3dCQUMzQixHQUFHLElBQUksR0FBRyxDQUFDO3FCQUNaO3lCQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFOzs0QkFDNUIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzs0QkFDN0IsS0FBZ0IsSUFBQSxTQUFBLGlCQUFBLElBQUksQ0FBQSwwQkFBQSw0Q0FBRTtnQ0FBakIsSUFBTSxDQUFDLGlCQUFBO2dDQUNWLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUk7b0NBQUUsR0FBRyxJQUFJLE1BQUksQ0FBRyxDQUFDOzZCQUNyQzs7Ozs7Ozs7O3FCQUNGO2lCQUNGO2FBQ0Y7O2dCQUVLLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztZQUM1QixJQUFJLE9BQU8sRUFBRTtnQkFDWCxHQUFHLElBQUksdUJBQXFCLE9BQVMsQ0FBQzthQUN2QztZQUVELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQzs7O09BQUE7SUFFRCxzQkFDSSw4Q0FBSTs7OztRQURSO1lBRUUsd0VBQXdFO1lBQ3hFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2pGLENBQUM7OztPQUFBO0lBRUQsc0JBQ0ksa0RBQVE7Ozs7UUFEWjtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFDSSxrREFBUTs7OztRQURaO1lBRUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVELHNCQUNJLCtDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksd0RBQWM7Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ3JILENBQUM7OztPQUFBOzs7OztJQXNCRCxvREFBYTs7OztJQURiLFVBQ2MsTUFBa0I7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7O0lBRUQsa0RBQVc7Ozs7SUFBWCxVQUFZLEtBQVk7UUFBeEIsaUJBUUM7UUFQQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztnQkFDbEIsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQyxDQUFNO2dCQUM3QixPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckMsQ0FBQyxFQUFDO1lBRUYsSUFBSSxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFFRCw2Q0FBTTs7O0lBQU47UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQUUsT0FBTzs7WUFFNUIsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3ZCLFFBQVEsVUFBQTtTQUNULENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsb0RBQWE7Ozs7SUFBYixVQUFjLE9BQXNCO1FBQ2xDLElBQUksT0FBTyxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDakMsT0FBTyx1QkFBcUIsSUFBSSxDQUFDLGlCQUFtQixDQUFDO1NBQ3REO2FBQU0sSUFBSSxPQUFPLEtBQUssYUFBYSxDQUFDLElBQUksRUFBRTtZQUN6QyxPQUFPLHdCQUFzQixJQUFJLENBQUMsa0JBQW9CLENBQUM7U0FDeEQ7YUFBTTtZQUNMLE9BQU8sVUFBVSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxnREFBUzs7OztJQUFULFVBQVUsTUFBTTtRQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsTUFBTSxRQUFBO1lBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQ2hDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsa0RBQVc7Ozs7SUFBWCxVQUFZLE1BQU07UUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixNQUFNLFFBQUE7U0FDUCxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkF4T0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSx3MURBK0NUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsdUJBQXVCO3FCQUMvQjtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBakVDLGlCQUFpQjs7OzJCQW1FaEIsS0FBSztvQ0FDTCxLQUFLO3FDQUNMLEtBQUs7MkJBRUwsS0FBSzt1Q0FDTCxLQUFLO3NDQUNMLEtBQUs7a0NBSUwsS0FBSztnQ0FRTCxLQUFLO3lCQUVMLEtBQUs7K0JBVUwsV0FBVyxTQUFDLGlCQUFpQixjQUM3QixLQUFLO3dCQUdMLEtBQUs7dUJBWUwsTUFBTTt5QkFDTixNQUFNO29DQUNOLE1BQU07eUJBQ04sTUFBTTttQ0FFTixXQUFXLFNBQUMsT0FBTzt1QkFpQ25CLFdBQVcsU0FBQyxZQUFZOzJCQU14QixXQUFXLFNBQUMsbUJBQW1COzJCQUsvQixXQUFXLFNBQUMsbUJBQW1CO3dCQUsvQixXQUFXLFNBQUMsZ0JBQWdCO2dDQTRCNUIsWUFBWSxTQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFpRHpDLG1DQUFDO0NBQUEsQUF6T0QsSUF5T0M7U0FsTFksNEJBQTRCOzs7SUFDdkMsZ0RBQTRCOztJQUM1Qix5REFBbUM7O0lBQ25DLDBEQUFvQzs7SUFFcEMsZ0RBQTJCOztJQUMzQiw0REFBbUM7O0lBQ25DLDJEQUFrQzs7SUFFbEMsd0RBQTBCOztJQVUxQixxREFBc0M7O0lBWXRDLG9EQUVxQjs7SUFjckIsNENBQXVEOztJQUN2RCw4Q0FBeUQ7O0lBQ3pELHlEQUEwRjs7SUFDMUYsOENBQXlEOztJQTREekQsOENBQWdDOztJQUNoQyxpREFBa0I7O0lBQ2xCLCtDQUF1Qjs7SUFDdkIsZ0RBQThDOztJQUM5QyxtREFBaUI7O0lBRWpCLG1EQU1FOzs7OztJQUVGLCtDQUE2Qjs7Ozs7SUFDN0IsOENBQXNCOzs7OztJQUVWLDBDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcbmltcG9ydCB7IFNvcnRUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvc29ydC50eXBlJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uLy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcbmltcG9ydCB7IG5leHRTb3J0RGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvc29ydCc7XG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vdHlwZXMvc29ydC1kaXJlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1jZWxsLXRlbXBsYXRlLXdyYXBcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4uZmlsdGVyXCI+XG4gICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImZpbHRlci1oZWFkZXJcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29sdW1uLm5hbWVcIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJmaWx0ZXJDYWNoZVtjb2x1bW4ucHJvcF1cIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwic2V0RmlsdGVyKGNvbHVtbi5wcm9wKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBtYXQtYnV0dG9uXG4gICAgICAgICAgICAqbmdJZj1cImZpbHRlckNhY2hlW2NvbHVtbi5wcm9wXVwiXG4gICAgICAgICAgICBtYXRTdWZmaXhcbiAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkNsZWFyXCJcbiAgICAgICAgICAgIChjbGljayk9XCJyZXNldEZpbHRlcihjb2x1bW4ucHJvcClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbj5cbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaWNvbiBtYXRlcmlhbC1pY29uc1wiIChjbGljayk9XCJvblNvcnQoKVwiPnNvcnQ8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjb2x1bW4uZmlsdGVyXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICpuZ0lmPVwiaXNUYXJnZXRcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhcmdldE1hcmtlclRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwidGFyZ2V0TWFya2VyQ29udGV4dFwiXG4gICAgICAgID5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPGxhYmVsICpuZ0lmPVwiaXNDaGVja2JveGFibGVcIiBjbGFzcz1cImRhdGF0YWJsZS1jaGVja2JveFwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJhbGxSb3dzU2VsZWN0ZWRcIiAoY2hhbmdlKT1cInNlbGVjdC5lbWl0KCFhbGxSb3dzU2VsZWN0ZWQpXCIgLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhY29sdW1uLmhlYWRlclRlbXBsYXRlXCIgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWNlbGwtd3JhcHBlclwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1jZWxsLWxhYmVsIGRyYWdnYWJsZVwiIChjbGljayk9XCJvblNvcnQoKVwiIFtpbm5lckhUTUxdPVwibmFtZVwiPiA8L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW4uaGVhZGVyVGVtcGxhdGVcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbi5oZWFkZXJUZW1wbGF0ZVwiXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNlbGxDb250ZXh0XCJcbiAgICAgICAgPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8c3BhbiAoY2xpY2spPVwib25Tb3J0KClcIiBbY2xhc3NdPVwic29ydENsYXNzXCI+IDwvc3Bhbj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkYXRhdGFibGUtaGVhZGVyLWNlbGwnXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUhlYWRlckNlbGxDb21wb25lbnQge1xuICBASW5wdXQoKSBzb3J0VHlwZTogU29ydFR5cGU7XG4gIEBJbnB1dCgpIHNvcnRBc2NlbmRpbmdJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNvcnREZXNjZW5kaW5nSWNvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGlzVGFyZ2V0OiBib29sZWFuO1xuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJUZW1wbGF0ZTogYW55O1xuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJDb250ZXh0OiBhbnk7XG5cbiAgX2FsbFJvd3NTZWxlY3RlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBzZXQgYWxsUm93c1NlbGVjdGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fYWxsUm93c1NlbGVjdGVkID0gdmFsdWU7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5hbGxSb3dzU2VsZWN0ZWQgPSB2YWx1ZTtcbiAgfVxuICBnZXQgYWxsUm93c1NlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9hbGxSb3dzU2VsZWN0ZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xuXG4gIEBJbnB1dCgpIHNldCBjb2x1bW4oY29sdW1uOiBUYWJsZUNvbHVtbikge1xuICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLmNlbGxDb250ZXh0LmNvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGNvbHVtbigpOiBUYWJsZUNvbHVtbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcbiAgQElucHV0KClcbiAgaGVhZGVySGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KCkgc2V0IHNvcnRzKHZhbDogYW55W10pIHtcbiAgICB0aGlzLl9zb3J0cyA9IHZhbDtcbiAgICB0aGlzLnNvcnREaXIgPSB0aGlzLmNhbGNTb3J0RGlyKHZhbCk7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5zb3J0RGlyID0gdGhpcy5zb3J0RGlyO1xuICAgIHRoaXMuc29ydENsYXNzID0gdGhpcy5jYWxjU29ydENsYXNzKHRoaXMuc29ydERpcik7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBzb3J0cygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRzO1xuICB9XG5cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbHVtbkNvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyBjb2x1bW46IGFueSB9PihmYWxzZSk7XG4gIEBPdXRwdXQoKSBmaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgY29sdW1uQ3NzQ2xhc3NlcygpOiBhbnkge1xuICAgIGxldCBjbHMgPSAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJztcblxuICAgIGlmICh0aGlzLmNvbHVtbi5zb3J0YWJsZSkgY2xzICs9ICcgc29ydGFibGUnO1xuICAgIGlmICh0aGlzLmNvbHVtbi5yZXNpemVhYmxlKSBjbHMgKz0gJyByZXNpemVhYmxlJztcbiAgICBpZiAodGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3MpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNscyArPSAnICcgKyB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmhlYWRlckNsYXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuY29sdW1uLmhlYWRlckNsYXNzKHtcbiAgICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNscyArPSByZXM7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocmVzKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgICAgICAgICAgaWYgKHJlc1trXSA9PT0gdHJ1ZSkgY2xzICs9IGAgJHtrfWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc29ydERpciA9IHRoaXMuc29ydERpcjtcbiAgICBpZiAoc29ydERpcikge1xuICAgICAgY2xzICs9IGAgc29ydC1hY3RpdmUgc29ydC0ke3NvcnREaXJ9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xzO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRpdGxlJylcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBndWFyYW50ZWVkIHRvIGhhdmUgYSB2YWx1ZSBieSBzZXRDb2x1bW5EZWZhdWx0cygpIGluIGNvbHVtbi1oZWxwZXIudHNcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4uaGVhZGVyVGVtcGxhdGUgPT09IHVuZGVmaW5lZCA/IHRoaXMuY29sdW1uLm5hbWUgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbldpZHRoLnB4JylcbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1pbldpZHRoO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXhXaWR0aC5weCcpXG4gIGdldCBtYXhXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5tYXhXaWR0aDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ud2lkdGg7XG4gIH1cblxuICBnZXQgaXNDaGVja2JveGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLmNoZWNrYm94YWJsZSAmJiB0aGlzLmNvbHVtbi5oZWFkZXJDaGVja2JveGFibGUgJiYgdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLmNoZWNrYm94O1xuICB9XG5cbiAgc29ydEZuID0gdGhpcy5vblNvcnQuYmluZCh0aGlzKTtcbiAgc29ydENsYXNzOiBzdHJpbmc7XG4gIHNvcnREaXI6IFNvcnREaXJlY3Rpb247XG4gIHNlbGVjdEZuID0gdGhpcy5zZWxlY3QuZW1pdC5iaW5kKHRoaXMuc2VsZWN0KTtcbiAgZmlsdGVyQ2FjaGUgPSB7fTtcblxuICBjZWxsQ29udGV4dDogYW55ID0ge1xuICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgc29ydERpcjogdGhpcy5zb3J0RGlyLFxuICAgIHNvcnRGbjogdGhpcy5zb3J0Rm4sXG4gICAgYWxsUm93c1NlbGVjdGVkOiB0aGlzLmFsbFJvd3NTZWxlY3RlZCxcbiAgICBzZWxlY3RGbjogdGhpcy5zZWxlY3RGblxuICB9O1xuXG4gIHByaXZhdGUgX2NvbHVtbjogVGFibGVDb2x1bW47XG4gIHByaXZhdGUgX3NvcnRzOiBhbnlbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXG4gIG9uQ29udGV4dG1lbnUoJGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5Db250ZXh0bWVudS5lbWl0KHsgZXZlbnQ6ICRldmVudCwgY29sdW1uOiB0aGlzLmNvbHVtbiB9KTtcbiAgfVxuXG4gIGNhbGNTb3J0RGlyKHNvcnRzOiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKHNvcnRzICYmIHRoaXMuY29sdW1uKSB7XG4gICAgICBjb25zdCBzb3J0ID0gc29ydHMuZmluZCgoczogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBzLnByb3AgPT09IHRoaXMuY29sdW1uLnByb3A7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHNvcnQpIHJldHVybiBzb3J0LmRpcjtcbiAgICB9XG4gIH1cblxuICBvblNvcnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbi5zb3J0YWJsZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3VmFsdWUgPSBuZXh0U29ydERpcih0aGlzLnNvcnRUeXBlLCB0aGlzLnNvcnREaXIpO1xuICAgIHRoaXMuc29ydC5lbWl0KHtcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICBwcmV2VmFsdWU6IHRoaXMuc29ydERpcixcbiAgICAgIG5ld1ZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBjYWxjU29ydENsYXNzKHNvcnREaXI6IFNvcnREaXJlY3Rpb24pOiBzdHJpbmcge1xuICAgIGlmIChzb3J0RGlyID09PSBTb3J0RGlyZWN0aW9uLmFzYykge1xuICAgICAgcmV0dXJuIGBzb3J0LWJ0biBzb3J0LWFzYyAke3RoaXMuc29ydEFzY2VuZGluZ0ljb259YDtcbiAgICB9IGVsc2UgaWYgKHNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uZGVzYykge1xuICAgICAgcmV0dXJuIGBzb3J0LWJ0biBzb3J0LWRlc2MgJHt0aGlzLnNvcnREZXNjZW5kaW5nSWNvbn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYHNvcnQtYnRuYDtcbiAgICB9XG4gIH1cblxuICBzZXRGaWx0ZXIoY29sdW1uKSB7XG4gICAgdGhpcy5maWx0ZXIuZW1pdCh7XG4gICAgICBjb2x1bW4sXG4gICAgICB2YWx1ZTogdGhpcy5maWx0ZXJDYWNoZVtjb2x1bW5dXG4gICAgfSk7XG4gIH1cblxuICByZXNldEZpbHRlcihjb2x1bW4pIHtcbiAgICB0aGlzLmZpbHRlckNhY2hlW2NvbHVtbl0gPSAnJztcbiAgICB0aGlzLmZpbHRlci5lbWl0KHtcbiAgICAgIGNvbHVtblxuICAgIH0pO1xuICB9XG59XG4iXX0=