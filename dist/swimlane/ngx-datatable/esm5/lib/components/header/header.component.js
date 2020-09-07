/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, Input, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { columnsByPin, columnGroupWidths, columnsByPinArr } from '../../utils/column';
import { SortType } from '../../types/sort.type';
import { SelectionType } from '../../types/selection.type';
import { translateXY } from '../../utils/translate';
var DataTableHeaderComponent = /** @class */ (function () {
    function DataTableHeaderComponent(cd) {
        this.cd = cd;
        this.sort = new EventEmitter();
        this.reorder = new EventEmitter();
        this.resize = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
        this.filter = new EventEmitter();
        this._columnGroupWidths = {
            total: 100
        };
        this._styleByGroup = {
            left: {},
            center: {},
            right: {}
        };
    }
    Object.defineProperty(DataTableHeaderComponent.prototype, "innerWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this._innerWidth;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            var _this = this;
            this._innerWidth = val;
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this._columns) {
                    /** @type {?} */
                    var colByPin = columnsByPin(_this._columns);
                    _this._columnGroupWidths = columnGroupWidths(colByPin, _this._columns);
                    _this.setStylesByGroup();
                }
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._headerHeight;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val !== 'auto') {
                this._headerHeight = val + "px";
            }
            else {
                this._headerHeight = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "columns", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columns;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            var _this = this;
            this._columns = val;
            /** @type {?} */
            var colsByPin = columnsByPin(val);
            this._columnsByPin = columnsByPinArr(val);
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this._columnGroupWidths = columnGroupWidths(colsByPin, val);
                _this.setStylesByGroup();
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "offsetX", {
        get: /**
         * @return {?}
         */
        function () {
            return this._offsetX;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._offsetX = val;
            this.setStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} __0
     * @return {?}
     */
    DataTableHeaderComponent.prototype.onLongPressStart = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var event = _a.event, model = _a.model;
        model.dragging = true;
        this.dragEventTarget = event;
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    DataTableHeaderComponent.prototype.onLongPressEnd = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _this = this;
        var event = _a.event, model = _a.model;
        this.dragEventTarget = event;
        // delay resetting so sort can be
        // prevented if we were dragging
        setTimeout((/**
         * @return {?}
         */
        function () {
            // datatable component creates copies from columns on reorder
            // set dragging to false on new objects
            /** @type {?} */
            var column = _this._columns.find((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.$$id === model.$$id; }));
            if (column) {
                column.dragging = false;
            }
        }), 5);
    };
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} index
     * @param {?} colGroup
     * @return {?}
     */
    DataTableHeaderComponent.prototype.trackByGroups = /**
     * @param {?} index
     * @param {?} colGroup
     * @return {?}
     */
    function (index, colGroup) {
        return colGroup.type;
    };
    /**
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    DataTableHeaderComponent.prototype.columnTrackingFn = /**
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    function (index, column) {
        return column.$$id;
    };
    /**
     * @param {?} width
     * @param {?} column
     * @return {?}
     */
    DataTableHeaderComponent.prototype.onColumnResized = /**
     * @param {?} width
     * @param {?} column
     * @return {?}
     */
    function (width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.resize.emit({
            column: column,
            prevValue: column.width,
            newValue: width
        });
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    DataTableHeaderComponent.prototype.onColumnReordered = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, model = _a.model;
        /** @type {?} */
        var column = this.getColumn(newIndex);
        column.isTarget = false;
        column.targetMarkerContext = undefined;
        this.reorder.emit({
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    DataTableHeaderComponent.prototype.onTargetChanged = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, initialIndex = _a.initialIndex;
        if (prevIndex || prevIndex === 0) {
            /** @type {?} */
            var oldColumn = this.getColumn(prevIndex);
            oldColumn.isTarget = false;
            oldColumn.targetMarkerContext = undefined;
        }
        if (newIndex || newIndex === 0) {
            /** @type {?} */
            var newColumn = this.getColumn(newIndex);
            newColumn.isTarget = true;
            if (initialIndex !== newIndex) {
                newColumn.targetMarkerContext = {
                    class: 'targetMarker '.concat(initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft')
                };
            }
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    DataTableHeaderComponent.prototype.getColumn = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var leftColumnCount = this._columnsByPin[0].columns.length;
        if (index < leftColumnCount) {
            return this._columnsByPin[0].columns[index];
        }
        /** @type {?} */
        var centerColumnCount = this._columnsByPin[1].columns.length;
        if (index < leftColumnCount + centerColumnCount) {
            return this._columnsByPin[1].columns[index - leftColumnCount];
        }
        return this._columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    DataTableHeaderComponent.prototype.onSort = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var column = _a.column, prevValue = _a.prevValue, newValue = _a.newValue;
        // if we are dragging don't sort!
        if (column.dragging) {
            return;
        }
        /** @type {?} */
        var sorts = this.calcNewSorts(column, prevValue, newValue);
        this.sort.emit({
            sorts: sorts,
            column: column,
            prevValue: prevValue,
            newValue: newValue
        });
    };
    /**
     * @param {?} column
     * @param {?} prevValue
     * @param {?} newValue
     * @return {?}
     */
    DataTableHeaderComponent.prototype.calcNewSorts = /**
     * @param {?} column
     * @param {?} prevValue
     * @param {?} newValue
     * @return {?}
     */
    function (column, prevValue, newValue) {
        /** @type {?} */
        var idx = 0;
        if (!this.sorts) {
            this.sorts = [];
        }
        /** @type {?} */
        var sorts = this.sorts.map((/**
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        function (s, i) {
            s = tslib_1.__assign({}, s);
            if (s.prop === column.prop) {
                idx = i;
            }
            return s;
        }));
        if (newValue === undefined) {
            sorts.splice(idx, 1);
        }
        else if (prevValue) {
            sorts[idx].dir = newValue;
        }
        else {
            if (this.sortType === SortType.single) {
                sorts.splice(0, this.sorts.length);
            }
            sorts.push({ dir: newValue, prop: column.prop });
        }
        return sorts;
    };
    /**
     * @return {?}
     */
    DataTableHeaderComponent.prototype.setStylesByGroup = /**
     * @return {?}
     */
    function () {
        this._styleByGroup.left = this.calcStylesByGroup('left');
        this._styleByGroup.center = this.calcStylesByGroup('center');
        this._styleByGroup.right = this.calcStylesByGroup('right');
        if (!((/** @type {?} */ (this.cd))).destroyed) {
            this.cd.detectChanges();
        }
    };
    /**
     * @param {?} group
     * @return {?}
     */
    DataTableHeaderComponent.prototype.calcStylesByGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        /** @type {?} */
        var widths = this._columnGroupWidths;
        /** @type {?} */
        var offsetX = this.offsetX;
        /** @type {?} */
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            /** @type {?} */
            var totalDiff = widths.total - this.innerWidth;
            /** @type {?} */
            var offset = totalDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DataTableHeaderComponent.prototype.onColumnFilter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.filter.emit(event);
    };
    DataTableHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-header',
                    template: "\n    <div\n      orderable\n      (reorder)=\"onColumnReordered($event)\"\n      (targetChanged)=\"onTargetChanged($event)\"\n      [style.width.px]=\"_columnGroupWidths.total\"\n      class=\"datatable-header-inner\"\n    >\n      <div\n        *ngFor=\"let colGroup of _columnsByPin; trackBy: trackByGroups\"\n        [class]=\"'datatable-row-' + colGroup.type\"\n        [ngStyle]=\"_styleByGroup[colGroup.type]\"\n      >\n        <datatable-header-cell\n          *ngFor=\"let column of colGroup.columns; trackBy: columnTrackingFn\"\n          [ngClass]=\"{ 'filter-template-wrap': column.filter }\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (resize)=\"onColumnResized($event, column)\"\n          long-press\n          [pressModel]=\"column\"\n          [pressEnabled]=\"reorderable && column.draggable\"\n          (longPressStart)=\"onLongPressStart($event)\"\n          (longPressEnd)=\"onLongPressEnd($event)\"\n          draggable\n          [dragX]=\"reorderable && column.draggable && column.dragging\"\n          [dragY]=\"false\"\n          [dragModel]=\"column\"\n          [dragEventTarget]=\"dragEventTarget\"\n          [headerHeight]=\"headerHeight\"\n          [isTarget]=\"column.isTarget\"\n          [targetMarkerTemplate]=\"targetMarkerTemplate\"\n          [targetMarkerContext]=\"column.targetMarkerContext\"\n          [column]=\"column\"\n          [sortType]=\"sortType\"\n          [sorts]=\"sorts\"\n          [selectionType]=\"selectionType\"\n          [sortAscendingIcon]=\"sortAscendingIcon\"\n          [sortDescendingIcon]=\"sortDescendingIcon\"\n          [allRowsSelected]=\"allRowsSelected\"\n          (sort)=\"onSort($event)\"\n          (filter)=\"onColumnFilter($event)\"\n          (select)=\"select.emit($event)\"\n          (columnContextmenu)=\"columnContextmenu.emit($event)\"\n        >\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
                    host: {
                        class: 'datatable-header'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    DataTableHeaderComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    DataTableHeaderComponent.propDecorators = {
        sortAscendingIcon: [{ type: Input }],
        sortDescendingIcon: [{ type: Input }],
        scrollbarH: [{ type: Input }],
        dealsWithGroup: [{ type: Input }],
        targetMarkerTemplate: [{ type: Input }],
        innerWidth: [{ type: Input }],
        sorts: [{ type: Input }],
        sortType: [{ type: Input }],
        allRowsSelected: [{ type: Input }],
        selectionType: [{ type: Input }],
        reorderable: [{ type: Input }],
        headerHeight: [{ type: HostBinding, args: ['style.height',] }, { type: Input }],
        columns: [{ type: Input }],
        offsetX: [{ type: Input }],
        sort: [{ type: Output }],
        reorder: [{ type: Output }],
        resize: [{ type: Output }],
        select: [{ type: Output }],
        columnContextmenu: [{ type: Output }],
        filter: [{ type: Output }],
        headerWidth: [{ type: HostBinding, args: ['style.width',] }]
    };
    return DataTableHeaderComponent;
}());
export { DataTableHeaderComponent };
if (false) {
    /** @type {?} */
    DataTableHeaderComponent.prototype.sortAscendingIcon;
    /** @type {?} */
    DataTableHeaderComponent.prototype.sortDescendingIcon;
    /** @type {?} */
    DataTableHeaderComponent.prototype.scrollbarH;
    /** @type {?} */
    DataTableHeaderComponent.prototype.dealsWithGroup;
    /** @type {?} */
    DataTableHeaderComponent.prototype.targetMarkerTemplate;
    /** @type {?} */
    DataTableHeaderComponent.prototype.targetMarkerContext;
    /** @type {?} */
    DataTableHeaderComponent.prototype.sorts;
    /** @type {?} */
    DataTableHeaderComponent.prototype.sortType;
    /** @type {?} */
    DataTableHeaderComponent.prototype.allRowsSelected;
    /** @type {?} */
    DataTableHeaderComponent.prototype.selectionType;
    /** @type {?} */
    DataTableHeaderComponent.prototype.reorderable;
    /** @type {?} */
    DataTableHeaderComponent.prototype.dragEventTarget;
    /** @type {?} */
    DataTableHeaderComponent.prototype.sort;
    /** @type {?} */
    DataTableHeaderComponent.prototype.reorder;
    /** @type {?} */
    DataTableHeaderComponent.prototype.resize;
    /** @type {?} */
    DataTableHeaderComponent.prototype.select;
    /** @type {?} */
    DataTableHeaderComponent.prototype.columnContextmenu;
    /** @type {?} */
    DataTableHeaderComponent.prototype.filter;
    /** @type {?} */
    DataTableHeaderComponent.prototype._columnsByPin;
    /** @type {?} */
    DataTableHeaderComponent.prototype._columnGroupWidths;
    /** @type {?} */
    DataTableHeaderComponent.prototype._innerWidth;
    /** @type {?} */
    DataTableHeaderComponent.prototype._offsetX;
    /** @type {?} */
    DataTableHeaderComponent.prototype._columns;
    /** @type {?} */
    DataTableHeaderComponent.prototype._headerHeight;
    /** @type {?} */
    DataTableHeaderComponent.prototype._styleByGroup;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEQ7SUFtSkUsa0NBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBckIvQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLENBQXFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUd6RCx1QkFBa0IsR0FBUTtZQUN4QixLQUFLLEVBQUUsR0FBRztTQUNYLENBQUM7UUFLRixrQkFBYSxHQUEyQjtZQUN0QyxJQUFJLEVBQUUsRUFBRTtZQUNSLE1BQU0sRUFBRSxFQUFFO1lBQ1YsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO0lBRTBD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QzdCLGtEQUFpQzs7SUFDakMsd0RBQW1DOztJQUVuQyx1REFBeUI7O0lBaUJ6Qix5Q0FBc0I7O0lBQ3RCLDRDQUE0Qjs7SUFDNUIsbURBQWtDOztJQUNsQyxpREFBc0M7O0lBQ3RDLCtDQUE4Qjs7SUFFOUIsbURBQXFCOztJQXdDckIsd0NBQXVEOztJQUN2RCwyQ0FBMEQ7O0lBQzFELDBDQUF5RDs7SUFDekQsMENBQXlEOztJQUN6RCxxREFBMEY7O0lBQzFGLDBDQUF5RDs7SUFFekQsaURBQW1COztJQUNuQixzREFFRTs7SUFDRiwrQ0FBb0I7O0lBQ3BCLDRDQUFpQjs7SUFDakIsNENBQWdCOztJQUNoQixpREFBc0I7O0lBQ3RCLGlEQUlFOzs7OztJQUVVLHNDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVmlld1JlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcclxuaW1wb3J0IHsgY29sdW1uc0J5UGluLCBjb2x1bW5Hcm91cFdpZHRocywgY29sdW1uc0J5UGluQXJyIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29sdW1uJztcclxuaW1wb3J0IHsgU29ydFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LnR5cGUnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvc2VsZWN0aW9uLnR5cGUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyB0cmFuc2xhdGVYWSB9IGZyb20gJy4uLy4uL3V0aWxzL3RyYW5zbGF0ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1oZWFkZXInLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2XHJcbiAgICAgIG9yZGVyYWJsZVxyXG4gICAgICAocmVvcmRlcik9XCJvbkNvbHVtblJlb3JkZXJlZCgkZXZlbnQpXCJcclxuICAgICAgKHRhcmdldENoYW5nZWQpPVwib25UYXJnZXRDaGFuZ2VkKCRldmVudClcIlxyXG4gICAgICBbc3R5bGUud2lkdGgucHhdPVwiX2NvbHVtbkdyb3VwV2lkdGhzLnRvdGFsXCJcclxuICAgICAgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWlubmVyXCJcclxuICAgID5cclxuICAgICAgPGRpdlxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBjb2xHcm91cCBvZiBfY29sdW1uc0J5UGluOyB0cmFja0J5OiB0cmFja0J5R3JvdXBzXCJcclxuICAgICAgICBbY2xhc3NdPVwiJ2RhdGF0YWJsZS1yb3ctJyArIGNvbEdyb3VwLnR5cGVcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cIl9zdHlsZUJ5R3JvdXBbY29sR3JvdXAudHlwZV1cIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRhdGF0YWJsZS1oZWFkZXItY2VsbFxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2xHcm91cC5jb2x1bW5zOyB0cmFja0J5OiBjb2x1bW5UcmFja2luZ0ZuXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ2ZpbHRlci10ZW1wbGF0ZS13cmFwJzogY29sdW1uLmZpbHRlciB9XCJcclxuICAgICAgICAgIHJlc2l6ZWFibGVcclxuICAgICAgICAgIFtyZXNpemVFbmFibGVkXT1cImNvbHVtbi5yZXNpemVhYmxlXCJcclxuICAgICAgICAgIChyZXNpemUpPVwib25Db2x1bW5SZXNpemVkKCRldmVudCwgY29sdW1uKVwiXHJcbiAgICAgICAgICBsb25nLXByZXNzXHJcbiAgICAgICAgICBbcHJlc3NNb2RlbF09XCJjb2x1bW5cIlxyXG4gICAgICAgICAgW3ByZXNzRW5hYmxlZF09XCJyZW9yZGVyYWJsZSAmJiBjb2x1bW4uZHJhZ2dhYmxlXCJcclxuICAgICAgICAgIChsb25nUHJlc3NTdGFydCk9XCJvbkxvbmdQcmVzc1N0YXJ0KCRldmVudClcIlxyXG4gICAgICAgICAgKGxvbmdQcmVzc0VuZCk9XCJvbkxvbmdQcmVzc0VuZCgkZXZlbnQpXCJcclxuICAgICAgICAgIGRyYWdnYWJsZVxyXG4gICAgICAgICAgW2RyYWdYXT1cInJlb3JkZXJhYmxlICYmIGNvbHVtbi5kcmFnZ2FibGUgJiYgY29sdW1uLmRyYWdnaW5nXCJcclxuICAgICAgICAgIFtkcmFnWV09XCJmYWxzZVwiXHJcbiAgICAgICAgICBbZHJhZ01vZGVsXT1cImNvbHVtblwiXHJcbiAgICAgICAgICBbZHJhZ0V2ZW50VGFyZ2V0XT1cImRyYWdFdmVudFRhcmdldFwiXHJcbiAgICAgICAgICBbaGVhZGVySGVpZ2h0XT1cImhlYWRlckhlaWdodFwiXHJcbiAgICAgICAgICBbaXNUYXJnZXRdPVwiY29sdW1uLmlzVGFyZ2V0XCJcclxuICAgICAgICAgIFt0YXJnZXRNYXJrZXJUZW1wbGF0ZV09XCJ0YXJnZXRNYXJrZXJUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbdGFyZ2V0TWFya2VyQ29udGV4dF09XCJjb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dFwiXHJcbiAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXHJcbiAgICAgICAgICBbc29ydFR5cGVdPVwic29ydFR5cGVcIlxyXG4gICAgICAgICAgW3NvcnRzXT1cInNvcnRzXCJcclxuICAgICAgICAgIFtzZWxlY3Rpb25UeXBlXT1cInNlbGVjdGlvblR5cGVcIlxyXG4gICAgICAgICAgW3NvcnRBc2NlbmRpbmdJY29uXT1cInNvcnRBc2NlbmRpbmdJY29uXCJcclxuICAgICAgICAgIFtzb3J0RGVzY2VuZGluZ0ljb25dPVwic29ydERlc2NlbmRpbmdJY29uXCJcclxuICAgICAgICAgIFthbGxSb3dzU2VsZWN0ZWRdPVwiYWxsUm93c1NlbGVjdGVkXCJcclxuICAgICAgICAgIChzb3J0KT1cIm9uU29ydCgkZXZlbnQpXCJcclxuICAgICAgICAgIChmaWx0ZXIpPVwib25Db2x1bW5GaWx0ZXIoJGV2ZW50KVwiXHJcbiAgICAgICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIlxyXG4gICAgICAgICAgKGNvbHVtbkNvbnRleHRtZW51KT1cImNvbHVtbkNvbnRleHRtZW51LmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvZGF0YXRhYmxlLWhlYWRlci1jZWxsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdkYXRhdGFibGUtaGVhZGVyJ1xyXG4gIH0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgc29ydEFzY2VuZGluZ0ljb246IGFueTtcclxuICBASW5wdXQoKSBzb3J0RGVzY2VuZGluZ0ljb246IGFueTtcclxuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGRlYWxzV2l0aEdyb3VwOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHRhcmdldE1hcmtlclRlbXBsYXRlOiBhbnk7XHJcblxyXG4gIHRhcmdldE1hcmtlckNvbnRleHQ6IGFueTtcclxuXHJcbiAgQElucHV0KCkgc2V0IGlubmVyV2lkdGgodmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2lubmVyV2lkdGggPSB2YWw7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2NvbHVtbnMpIHtcclxuICAgICAgICBjb25zdCBjb2xCeVBpbiA9IGNvbHVtbnNCeVBpbih0aGlzLl9jb2x1bW5zKTtcclxuICAgICAgICB0aGlzLl9jb2x1bW5Hcm91cFdpZHRocyA9IGNvbHVtbkdyb3VwV2lkdGhzKGNvbEJ5UGluLCB0aGlzLl9jb2x1bW5zKTtcclxuICAgICAgICB0aGlzLnNldFN0eWxlc0J5R3JvdXAoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXQgaW5uZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lubmVyV2lkdGg7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzb3J0czogYW55W107XHJcbiAgQElucHV0KCkgc29ydFR5cGU6IFNvcnRUeXBlO1xyXG4gIEBJbnB1dCgpIGFsbFJvd3NTZWxlY3RlZDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xyXG4gIEBJbnB1dCgpIHJlb3JkZXJhYmxlOiBib29sZWFuO1xyXG5cclxuICBkcmFnRXZlbnRUYXJnZXQ6IGFueTtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGhlYWRlckhlaWdodCh2YWw6IGFueSkge1xyXG4gICAgaWYgKHZhbCAhPT0gJ2F1dG8nKSB7XHJcbiAgICAgIHRoaXMuX2hlYWRlckhlaWdodCA9IGAke3ZhbH1weGA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9oZWFkZXJIZWlnaHQgPSB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgaGVhZGVySGVpZ2h0KCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGVhZGVySGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGNvbHVtbnModmFsOiBhbnlbXSkge1xyXG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcclxuXHJcbiAgICBjb25zdCBjb2xzQnlQaW4gPSBjb2x1bW5zQnlQaW4odmFsKTtcclxuICAgIHRoaXMuX2NvbHVtbnNCeVBpbiA9IGNvbHVtbnNCeVBpbkFycih2YWwpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzID0gY29sdW1uR3JvdXBXaWR0aHMoY29sc0J5UGluLCB2YWwpO1xyXG4gICAgICB0aGlzLnNldFN0eWxlc0J5R3JvdXAoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbHVtbnMoKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBvZmZzZXRYKHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9vZmZzZXRYID0gdmFsO1xyXG4gICAgdGhpcy5zZXRTdHlsZXNCeUdyb3VwKCk7XHJcbiAgfVxyXG4gIGdldCBvZmZzZXRYKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29mZnNldFg7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIHJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSByZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBjb2x1bW5Db250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgY29sdW1uOiBhbnkgfT4oZmFsc2UpO1xyXG4gIEBPdXRwdXQoKSBmaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBfY29sdW1uc0J5UGluOiBhbnk7XHJcbiAgX2NvbHVtbkdyb3VwV2lkdGhzOiBhbnkgPSB7XHJcbiAgICB0b3RhbDogMTAwXHJcbiAgfTtcclxuICBfaW5uZXJXaWR0aDogbnVtYmVyO1xyXG4gIF9vZmZzZXRYOiBudW1iZXI7XHJcbiAgX2NvbHVtbnM6IGFueVtdO1xyXG4gIF9oZWFkZXJIZWlnaHQ6IHN0cmluZztcclxuICBfc3R5bGVCeUdyb3VwOiB7IFtwcm9wOiBzdHJpbmddOiB7fSB9ID0ge1xyXG4gICAgbGVmdDoge30sXHJcbiAgICBjZW50ZXI6IHt9LFxyXG4gICAgcmlnaHQ6IHt9XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIG9uTG9uZ1ByZXNzU3RhcnQoeyBldmVudCwgbW9kZWwgfTogeyBldmVudDogYW55OyBtb2RlbDogYW55IH0pIHtcclxuICAgIG1vZGVsLmRyYWdnaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuZHJhZ0V2ZW50VGFyZ2V0ID0gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICBvbkxvbmdQcmVzc0VuZCh7IGV2ZW50LCBtb2RlbCB9OiB7IGV2ZW50OiBhbnk7IG1vZGVsOiBhbnkgfSkge1xyXG4gICAgdGhpcy5kcmFnRXZlbnRUYXJnZXQgPSBldmVudDtcclxuXHJcbiAgICAvLyBkZWxheSByZXNldHRpbmcgc28gc29ydCBjYW4gYmVcclxuICAgIC8vIHByZXZlbnRlZCBpZiB3ZSB3ZXJlIGRyYWdnaW5nXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgLy8gZGF0YXRhYmxlIGNvbXBvbmVudCBjcmVhdGVzIGNvcGllcyBmcm9tIGNvbHVtbnMgb24gcmVvcmRlclxyXG4gICAgICAvLyBzZXQgZHJhZ2dpbmcgdG8gZmFsc2Ugb24gbmV3IG9iamVjdHNcclxuICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5fY29sdW1ucy5maW5kKGMgPT4gYy4kJGlkID09PSBtb2RlbC4kJGlkKTtcclxuICAgICAgaWYgKGNvbHVtbikge1xyXG4gICAgICAgIGNvbHVtbi5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LCA1KTtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxyXG4gIGdldCBoZWFkZXJXaWR0aCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFySCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbm5lcldpZHRoICsgJ3B4JztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJzEwMCUnO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUdyb3VwcyhpbmRleDogbnVtYmVyLCBjb2xHcm91cDogYW55KTogYW55IHtcclxuICAgIHJldHVybiBjb2xHcm91cC50eXBlO1xyXG4gIH1cclxuXHJcbiAgY29sdW1uVHJhY2tpbmdGbihpbmRleDogbnVtYmVyLCBjb2x1bW46IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gY29sdW1uLiQkaWQ7XHJcbiAgfVxyXG5cclxuICBvbkNvbHVtblJlc2l6ZWQod2lkdGg6IG51bWJlciwgY29sdW1uOiBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgIGlmICh3aWR0aCA8PSBjb2x1bW4ubWluV2lkdGgpIHtcclxuICAgICAgd2lkdGggPSBjb2x1bW4ubWluV2lkdGg7XHJcbiAgICB9IGVsc2UgaWYgKHdpZHRoID49IGNvbHVtbi5tYXhXaWR0aCkge1xyXG4gICAgICB3aWR0aCA9IGNvbHVtbi5tYXhXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlc2l6ZS5lbWl0KHtcclxuICAgICAgY29sdW1uLFxyXG4gICAgICBwcmV2VmFsdWU6IGNvbHVtbi53aWR0aCxcclxuICAgICAgbmV3VmFsdWU6IHdpZHRoXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uQ29sdW1uUmVvcmRlcmVkKHsgcHJldkluZGV4LCBuZXdJbmRleCwgbW9kZWwgfTogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdldENvbHVtbihuZXdJbmRleCk7XHJcbiAgICBjb2x1bW4uaXNUYXJnZXQgPSBmYWxzZTtcclxuICAgIGNvbHVtbi50YXJnZXRNYXJrZXJDb250ZXh0ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5yZW9yZGVyLmVtaXQoe1xyXG4gICAgICBjb2x1bW46IG1vZGVsLFxyXG4gICAgICBwcmV2VmFsdWU6IHByZXZJbmRleCxcclxuICAgICAgbmV3VmFsdWU6IG5ld0luZGV4XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uVGFyZ2V0Q2hhbmdlZCh7IHByZXZJbmRleCwgbmV3SW5kZXgsIGluaXRpYWxJbmRleCB9OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChwcmV2SW5kZXggfHwgcHJldkluZGV4ID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IG9sZENvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKHByZXZJbmRleCk7XHJcbiAgICAgIG9sZENvbHVtbi5pc1RhcmdldCA9IGZhbHNlO1xyXG4gICAgICBvbGRDb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmIChuZXdJbmRleCB8fCBuZXdJbmRleCA9PT0gMCkge1xyXG4gICAgICBjb25zdCBuZXdDb2x1bW4gPSB0aGlzLmdldENvbHVtbihuZXdJbmRleCk7XHJcbiAgICAgIG5ld0NvbHVtbi5pc1RhcmdldCA9IHRydWU7XHJcblxyXG4gICAgICBpZiAoaW5pdGlhbEluZGV4ICE9PSBuZXdJbmRleCkge1xyXG4gICAgICAgIG5ld0NvbHVtbi50YXJnZXRNYXJrZXJDb250ZXh0ID0ge1xyXG4gICAgICAgICAgY2xhc3M6ICd0YXJnZXRNYXJrZXIgJy5jb25jYXQoaW5pdGlhbEluZGV4ID4gbmV3SW5kZXggPyAnZHJhZ0Zyb21SaWdodCcgOiAnZHJhZ0Zyb21MZWZ0JylcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDb2x1bW4oaW5kZXg6IG51bWJlcik6IGFueSB7XHJcbiAgICBjb25zdCBsZWZ0Q29sdW1uQ291bnQgPSB0aGlzLl9jb2x1bW5zQnlQaW5bMF0uY29sdW1ucy5sZW5ndGg7XHJcbiAgICBpZiAoaW5kZXggPCBsZWZ0Q29sdW1uQ291bnQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnNCeVBpblswXS5jb2x1bW5zW2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjZW50ZXJDb2x1bW5Db3VudCA9IHRoaXMuX2NvbHVtbnNCeVBpblsxXS5jb2x1bW5zLmxlbmd0aDtcclxuICAgIGlmIChpbmRleCA8IGxlZnRDb2x1bW5Db3VudCArIGNlbnRlckNvbHVtbkNvdW50KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jb2x1bW5zQnlQaW5bMV0uY29sdW1uc1tpbmRleCAtIGxlZnRDb2x1bW5Db3VudF07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnNCeVBpblsyXS5jb2x1bW5zW2luZGV4IC0gbGVmdENvbHVtbkNvdW50IC0gY2VudGVyQ29sdW1uQ291bnRdO1xyXG4gIH1cclxuXHJcbiAgb25Tb3J0KHsgY29sdW1uLCBwcmV2VmFsdWUsIG5ld1ZhbHVlIH06IGFueSk6IHZvaWQge1xyXG4gICAgLy8gaWYgd2UgYXJlIGRyYWdnaW5nIGRvbid0IHNvcnQhXHJcbiAgICBpZiAoY29sdW1uLmRyYWdnaW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb3J0cyA9IHRoaXMuY2FsY05ld1NvcnRzKGNvbHVtbiwgcHJldlZhbHVlLCBuZXdWYWx1ZSk7XHJcbiAgICB0aGlzLnNvcnQuZW1pdCh7XHJcbiAgICAgIHNvcnRzLFxyXG4gICAgICBjb2x1bW4sXHJcbiAgICAgIHByZXZWYWx1ZSxcclxuICAgICAgbmV3VmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2FsY05ld1NvcnRzKGNvbHVtbjogYW55LCBwcmV2VmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcik6IGFueVtdIHtcclxuICAgIGxldCBpZHggPSAwO1xyXG5cclxuICAgIGlmICghdGhpcy5zb3J0cykge1xyXG4gICAgICB0aGlzLnNvcnRzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc29ydHMgPSB0aGlzLnNvcnRzLm1hcCgocywgaSkgPT4ge1xyXG4gICAgICBzID0geyAuLi5zIH07XHJcbiAgICAgIGlmIChzLnByb3AgPT09IGNvbHVtbi5wcm9wKSB7XHJcbiAgICAgICAgaWR4ID0gaTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcztcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHNvcnRzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgfSBlbHNlIGlmIChwcmV2VmFsdWUpIHtcclxuICAgICAgc29ydHNbaWR4XS5kaXIgPSBuZXdWYWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLnNvcnRUeXBlID09PSBTb3J0VHlwZS5zaW5nbGUpIHtcclxuICAgICAgICBzb3J0cy5zcGxpY2UoMCwgdGhpcy5zb3J0cy5sZW5ndGgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzb3J0cy5wdXNoKHsgZGlyOiBuZXdWYWx1ZSwgcHJvcDogY29sdW1uLnByb3AgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNvcnRzO1xyXG4gIH1cclxuXHJcbiAgc2V0U3R5bGVzQnlHcm91cCgpIHtcclxuICAgIHRoaXMuX3N0eWxlQnlHcm91cC5sZWZ0ID0gdGhpcy5jYWxjU3R5bGVzQnlHcm91cCgnbGVmdCcpO1xyXG4gICAgdGhpcy5fc3R5bGVCeUdyb3VwLmNlbnRlciA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ2NlbnRlcicpO1xyXG4gICAgdGhpcy5fc3R5bGVCeUdyb3VwLnJpZ2h0ID0gdGhpcy5jYWxjU3R5bGVzQnlHcm91cCgncmlnaHQnKTtcclxuICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XHJcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2FsY1N0eWxlc0J5R3JvdXAoZ3JvdXA6IHN0cmluZyk6IGFueSB7XHJcbiAgICBjb25zdCB3aWR0aHMgPSB0aGlzLl9jb2x1bW5Hcm91cFdpZHRocztcclxuICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLm9mZnNldFg7XHJcblxyXG4gICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICB3aWR0aDogYCR7d2lkdGhzW2dyb3VwXX1weGBcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGdyb3VwID09PSAnY2VudGVyJykge1xyXG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIG9mZnNldFggKiAtMSwgMCk7XHJcbiAgICB9IGVsc2UgaWYgKGdyb3VwID09PSAncmlnaHQnKSB7XHJcbiAgICAgIGNvbnN0IHRvdGFsRGlmZiA9IHdpZHRocy50b3RhbCAtIHRoaXMuaW5uZXJXaWR0aDtcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gdG90YWxEaWZmICogLTE7XHJcbiAgICAgIHRyYW5zbGF0ZVhZKHN0eWxlcywgb2Zmc2V0LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuXHJcbiAgb25Db2x1bW5GaWx0ZXIoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5maWx0ZXIuZW1pdChldmVudCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==