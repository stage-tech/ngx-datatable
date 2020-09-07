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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsWUFBWSxFQUNaLE1BQU0sRUFDTixXQUFXLEVBQ1gsWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJaEU7SUFzTEUsc0NBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBaEYvQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLHNCQUFpQixHQUFHLElBQUksWUFBWSxDQUFxQyxLQUFLLENBQUMsQ0FBQztRQUNoRixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUE0RHpELFdBQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUdoQyxhQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQixn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OENBQXlEOztJQTREekQsOENBQWdDOztJQUNoQyxpREFBa0I7O0lBQ2xCLCtDQUF1Qjs7SUFDdkIsZ0RBQThDOztJQUM5QyxtREFBaUI7O0lBRWpCLG1EQU1FOzs7OztJQUVGLCtDQUE2Qjs7Ozs7SUFDN0IsOENBQXNCOzs7OztJQUVWLDBDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudHMnO1xyXG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQudHlwZSc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XHJcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xyXG5pbXBvcnQgeyBuZXh0U29ydERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3NvcnQnO1xyXG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vdHlwZXMvc29ydC1kaXJlY3Rpb24udHlwZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1oZWFkZXItY2VsbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWNlbGwtdGVtcGxhdGUtd3JhcFwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmZpbHRlclwiPlxyXG4gICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImZpbHRlci1oZWFkZXJcIj5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBtYXRJbnB1dFxyXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29sdW1uLm5hbWVcIlxyXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cImZpbHRlckNhY2hlW2NvbHVtbi5wcm9wXVwiXHJcbiAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInNldEZpbHRlcihjb2x1bW4ucHJvcClcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgbWF0LWJ1dHRvblxyXG4gICAgICAgICAgICAqbmdJZj1cImZpbHRlckNhY2hlW2NvbHVtbi5wcm9wXVwiXHJcbiAgICAgICAgICAgIG1hdFN1ZmZpeFxyXG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkNsZWFyXCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cInJlc2V0RmlsdGVyKGNvbHVtbi5wcm9wKVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cIm9uU29ydCgpXCI+c29ydDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNvbHVtbi5maWx0ZXJcIj5cclxuICAgICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICAgICpuZ0lmPVwiaXNUYXJnZXRcIlxyXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFyZ2V0TWFya2VyVGVtcGxhdGVcIlxyXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInRhcmdldE1hcmtlckNvbnRleHRcIlxyXG4gICAgICAgID5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDxsYWJlbCAqbmdJZj1cImlzQ2hlY2tib3hhYmxlXCIgY2xhc3M9XCJkYXRhdGFibGUtY2hlY2tib3hcIj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJhbGxSb3dzU2VsZWN0ZWRcIiAoY2hhbmdlKT1cInNlbGVjdC5lbWl0KCFhbGxSb3dzU2VsZWN0ZWQpXCIgLz5cclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIWNvbHVtbi5oZWFkZXJUZW1wbGF0ZVwiIGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1jZWxsLXdyYXBwZXJcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1jZWxsLWxhYmVsIGRyYWdnYWJsZVwiIChjbGljayk9XCJvblNvcnQoKVwiIFtpbm5lckhUTUxdPVwibmFtZVwiPiA8L3NwYW4+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW4uaGVhZGVyVGVtcGxhdGVcIlxyXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLmhlYWRlclRlbXBsYXRlXCJcclxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjZWxsQ29udGV4dFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPHNwYW4gKGNsaWNrKT1cIm9uU29ydCgpXCIgW2NsYXNzXT1cInNvcnRDbGFzc1wiPiA8L3NwYW4+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ2RhdGF0YWJsZS1oZWFkZXItY2VsbCdcclxuICB9LFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXJDZWxsQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBzb3J0VHlwZTogU29ydFR5cGU7XHJcbiAgQElucHV0KCkgc29ydEFzY2VuZGluZ0ljb246IHN0cmluZztcclxuICBASW5wdXQoKSBzb3J0RGVzY2VuZGluZ0ljb246IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgaXNUYXJnZXQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyVGVtcGxhdGU6IGFueTtcclxuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJDb250ZXh0OiBhbnk7XHJcblxyXG4gIF9hbGxSb3dzU2VsZWN0ZWQ6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIHNldCBhbGxSb3dzU2VsZWN0ZWQodmFsdWUpIHtcclxuICAgIHRoaXMuX2FsbFJvd3NTZWxlY3RlZCA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dC5hbGxSb3dzU2VsZWN0ZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IGFsbFJvd3NTZWxlY3RlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9hbGxSb3dzU2VsZWN0ZWQ7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xyXG5cclxuICBASW5wdXQoKSBzZXQgY29sdW1uKGNvbHVtbjogVGFibGVDb2x1bW4pIHtcclxuICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcclxuICAgIHRoaXMuY2VsbENvbnRleHQuY29sdW1uID0gY29sdW1uO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCBjb2x1bW4oKTogVGFibGVDb2x1bW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbjtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcclxuICBASW5wdXQoKVxyXG4gIGhlYWRlckhlaWdodDogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBzZXQgc29ydHModmFsOiBhbnlbXSkge1xyXG4gICAgdGhpcy5fc29ydHMgPSB2YWw7XHJcbiAgICB0aGlzLnNvcnREaXIgPSB0aGlzLmNhbGNTb3J0RGlyKHZhbCk7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnNvcnREaXIgPSB0aGlzLnNvcnREaXI7XHJcbiAgICB0aGlzLnNvcnRDbGFzcyA9IHRoaXMuY2FsY1NvcnRDbGFzcyh0aGlzLnNvcnREaXIpO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCBzb3J0cygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc29ydHM7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNvbHVtbkNvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyBjb2x1bW46IGFueSB9PihmYWxzZSk7XHJcbiAgQE91dHB1dCgpIGZpbHRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxyXG4gIGdldCBjb2x1bW5Dc3NDbGFzc2VzKCk6IGFueSB7XHJcbiAgICBsZXQgY2xzID0gJ2RhdGF0YWJsZS1oZWFkZXItY2VsbCc7XHJcblxyXG4gICAgaWYgKHRoaXMuY29sdW1uLnNvcnRhYmxlKSBjbHMgKz0gJyBzb3J0YWJsZSc7XHJcbiAgICBpZiAodGhpcy5jb2x1bW4ucmVzaXplYWJsZSkgY2xzICs9ICcgcmVzaXplYWJsZSc7XHJcbiAgICBpZiAodGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3MpIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBjbHMgKz0gJyAnICsgdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3M7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmhlYWRlckNsYXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3Moe1xyXG4gICAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGNscyArPSByZXM7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcyk7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xyXG4gICAgICAgICAgICBpZiAocmVzW2tdID09PSB0cnVlKSBjbHMgKz0gYCAke2t9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb3J0RGlyID0gdGhpcy5zb3J0RGlyO1xyXG4gICAgaWYgKHNvcnREaXIpIHtcclxuICAgICAgY2xzICs9IGAgc29ydC1hY3RpdmUgc29ydC0ke3NvcnREaXJ9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2xzO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRpdGxlJylcclxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgLy8gZ3VhcmFudGVlZCB0byBoYXZlIGEgdmFsdWUgYnkgc2V0Q29sdW1uRGVmYXVsdHMoKSBpbiBjb2x1bW4taGVscGVyLnRzXHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4uaGVhZGVyVGVtcGxhdGUgPT09IHVuZGVmaW5lZCA/IHRoaXMuY29sdW1uLm5hbWUgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbldpZHRoLnB4JylcclxuICBnZXQgbWluV2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbi5taW5XaWR0aDtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWF4V2lkdGgucHgnKVxyXG4gIGdldCBtYXhXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1heFdpZHRoO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC5weCcpXHJcbiAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ud2lkdGg7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNDaGVja2JveGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4uY2hlY2tib3hhYmxlICYmIHRoaXMuY29sdW1uLmhlYWRlckNoZWNrYm94YWJsZSAmJiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2hlY2tib3g7XHJcbiAgfVxyXG5cclxuICBzb3J0Rm4gPSB0aGlzLm9uU29ydC5iaW5kKHRoaXMpO1xyXG4gIHNvcnRDbGFzczogc3RyaW5nO1xyXG4gIHNvcnREaXI6IFNvcnREaXJlY3Rpb247XHJcbiAgc2VsZWN0Rm4gPSB0aGlzLnNlbGVjdC5lbWl0LmJpbmQodGhpcy5zZWxlY3QpO1xyXG4gIGZpbHRlckNhY2hlID0ge307XHJcblxyXG4gIGNlbGxDb250ZXh0OiBhbnkgPSB7XHJcbiAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxyXG4gICAgc29ydERpcjogdGhpcy5zb3J0RGlyLFxyXG4gICAgc29ydEZuOiB0aGlzLnNvcnRGbixcclxuICAgIGFsbFJvd3NTZWxlY3RlZDogdGhpcy5hbGxSb3dzU2VsZWN0ZWQsXHJcbiAgICBzZWxlY3RGbjogdGhpcy5zZWxlY3RGblxyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgX2NvbHVtbjogVGFibGVDb2x1bW47XHJcbiAgcHJpdmF0ZSBfc29ydHM6IGFueVtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY29udGV4dG1lbnUnLCBbJyRldmVudCddKVxyXG4gIG9uQ29udGV4dG1lbnUoJGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbHVtbkNvbnRleHRtZW51LmVtaXQoeyBldmVudDogJGV2ZW50LCBjb2x1bW46IHRoaXMuY29sdW1uIH0pO1xyXG4gIH1cclxuXHJcbiAgY2FsY1NvcnREaXIoc29ydHM6IGFueVtdKTogYW55IHtcclxuICAgIGlmIChzb3J0cyAmJiB0aGlzLmNvbHVtbikge1xyXG4gICAgICBjb25zdCBzb3J0ID0gc29ydHMuZmluZCgoczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHMucHJvcCA9PT0gdGhpcy5jb2x1bW4ucHJvcDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoc29ydCkgcmV0dXJuIHNvcnQuZGlyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Tb3J0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmNvbHVtbi5zb3J0YWJsZSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gbmV4dFNvcnREaXIodGhpcy5zb3J0VHlwZSwgdGhpcy5zb3J0RGlyKTtcclxuICAgIHRoaXMuc29ydC5lbWl0KHtcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgcHJldlZhbHVlOiB0aGlzLnNvcnREaXIsXHJcbiAgICAgIG5ld1ZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNhbGNTb3J0Q2xhc3Moc29ydERpcjogU29ydERpcmVjdGlvbik6IHN0cmluZyB7XHJcbiAgICBpZiAoc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5hc2MpIHtcclxuICAgICAgcmV0dXJuIGBzb3J0LWJ0biBzb3J0LWFzYyAke3RoaXMuc29ydEFzY2VuZGluZ0ljb259YDtcclxuICAgIH0gZWxzZSBpZiAoc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5kZXNjKSB7XHJcbiAgICAgIHJldHVybiBgc29ydC1idG4gc29ydC1kZXNjICR7dGhpcy5zb3J0RGVzY2VuZGluZ0ljb259YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBgc29ydC1idG5gO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RmlsdGVyKGNvbHVtbikge1xyXG4gICAgdGhpcy5maWx0ZXIuZW1pdCh7XHJcbiAgICAgIGNvbHVtbixcclxuICAgICAgdmFsdWU6IHRoaXMuZmlsdGVyQ2FjaGVbY29sdW1uXVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXNldEZpbHRlcihjb2x1bW4pIHtcclxuICAgIHRoaXMuZmlsdGVyQ2FjaGVbY29sdW1uXSA9ICcnO1xyXG4gICAgdGhpcy5maWx0ZXIuZW1pdCh7XHJcbiAgICAgIGNvbHVtblxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==