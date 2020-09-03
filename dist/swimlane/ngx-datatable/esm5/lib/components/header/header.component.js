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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEQ7SUFtSkUsa0NBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBckIvQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLENBQXFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUd6RCx1QkFBa0IsR0FBUTtZQUN4QixLQUFLLEVBQUUsR0FBRztTQUNYLENBQUM7UUFLRixrQkFBYSxHQUEyQjtZQUN0QyxJQUFJLEVBQUUsRUFBRTtZQUNSLE1BQU0sRUFBRSxFQUFFO1lBQ1YsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO0lBRTBD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QzdCLGtEQUFpQzs7SUFDakMsd0RBQW1DOztJQUVuQyx1REFBeUI7O0lBaUJ6Qix5Q0FBc0I7O0lBQ3RCLDRDQUE0Qjs7SUFDNUIsbURBQWtDOztJQUNsQyxpREFBc0M7O0lBQ3RDLCtDQUE4Qjs7SUFFOUIsbURBQXFCOztJQXdDckIsd0NBQXVEOztJQUN2RCwyQ0FBMEQ7O0lBQzFELDBDQUF5RDs7SUFDekQsMENBQXlEOztJQUN6RCxxREFBMEY7O0lBQzFGLDBDQUF5RDs7SUFFekQsaURBQW1COztJQUNuQixzREFFRTs7SUFDRiwrQ0FBb0I7O0lBQ3BCLDRDQUFpQjs7SUFDakIsNENBQWdCOztJQUNoQixpREFBc0I7O0lBQ3RCLGlEQUlFOzs7OztJQUVVLHNDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uLy4uL2V2ZW50cyc7XG5pbXBvcnQgeyBjb2x1bW5zQnlQaW4sIGNvbHVtbkdyb3VwV2lkdGhzLCBjb2x1bW5zQnlQaW5BcnIgfSBmcm9tICcuLi8uLi91dGlscy9jb2x1bW4nO1xuaW1wb3J0IHsgU29ydFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LnR5cGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NlbGVjdGlvbi50eXBlJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyB0cmFuc2xhdGVYWSB9IGZyb20gJy4uLy4uL3V0aWxzL3RyYW5zbGF0ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIG9yZGVyYWJsZVxuICAgICAgKHJlb3JkZXIpPVwib25Db2x1bW5SZW9yZGVyZWQoJGV2ZW50KVwiXG4gICAgICAodGFyZ2V0Q2hhbmdlZCk9XCJvblRhcmdldENoYW5nZWQoJGV2ZW50KVwiXG4gICAgICBbc3R5bGUud2lkdGgucHhdPVwiX2NvbHVtbkdyb3VwV2lkdGhzLnRvdGFsXCJcbiAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1pbm5lclwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICAqbmdGb3I9XCJsZXQgY29sR3JvdXAgb2YgX2NvbHVtbnNCeVBpbjsgdHJhY2tCeTogdHJhY2tCeUdyb3Vwc1wiXG4gICAgICAgIFtjbGFzc109XCInZGF0YXRhYmxlLXJvdy0nICsgY29sR3JvdXAudHlwZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIl9zdHlsZUJ5R3JvdXBbY29sR3JvdXAudHlwZV1cIlxuICAgICAgPlxuICAgICAgICA8ZGF0YXRhYmxlLWhlYWRlci1jZWxsXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2xHcm91cC5jb2x1bW5zOyB0cmFja0J5OiBjb2x1bW5UcmFja2luZ0ZuXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7ICdmaWx0ZXItdGVtcGxhdGUtd3JhcCc6IGNvbHVtbi5maWx0ZXIgfVwiXG4gICAgICAgICAgcmVzaXplYWJsZVxuICAgICAgICAgIFtyZXNpemVFbmFibGVkXT1cImNvbHVtbi5yZXNpemVhYmxlXCJcbiAgICAgICAgICAocmVzaXplKT1cIm9uQ29sdW1uUmVzaXplZCgkZXZlbnQsIGNvbHVtbilcIlxuICAgICAgICAgIGxvbmctcHJlc3NcbiAgICAgICAgICBbcHJlc3NNb2RlbF09XCJjb2x1bW5cIlxuICAgICAgICAgIFtwcmVzc0VuYWJsZWRdPVwicmVvcmRlcmFibGUgJiYgY29sdW1uLmRyYWdnYWJsZVwiXG4gICAgICAgICAgKGxvbmdQcmVzc1N0YXJ0KT1cIm9uTG9uZ1ByZXNzU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgKGxvbmdQcmVzc0VuZCk9XCJvbkxvbmdQcmVzc0VuZCgkZXZlbnQpXCJcbiAgICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgICBbZHJhZ1hdPVwicmVvcmRlcmFibGUgJiYgY29sdW1uLmRyYWdnYWJsZSAmJiBjb2x1bW4uZHJhZ2dpbmdcIlxuICAgICAgICAgIFtkcmFnWV09XCJmYWxzZVwiXG4gICAgICAgICAgW2RyYWdNb2RlbF09XCJjb2x1bW5cIlxuICAgICAgICAgIFtkcmFnRXZlbnRUYXJnZXRdPVwiZHJhZ0V2ZW50VGFyZ2V0XCJcbiAgICAgICAgICBbaGVhZGVySGVpZ2h0XT1cImhlYWRlckhlaWdodFwiXG4gICAgICAgICAgW2lzVGFyZ2V0XT1cImNvbHVtbi5pc1RhcmdldFwiXG4gICAgICAgICAgW3RhcmdldE1hcmtlclRlbXBsYXRlXT1cInRhcmdldE1hcmtlclRlbXBsYXRlXCJcbiAgICAgICAgICBbdGFyZ2V0TWFya2VyQ29udGV4dF09XCJjb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dFwiXG4gICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgIFtzb3J0VHlwZV09XCJzb3J0VHlwZVwiXG4gICAgICAgICAgW3NvcnRzXT1cInNvcnRzXCJcbiAgICAgICAgICBbc2VsZWN0aW9uVHlwZV09XCJzZWxlY3Rpb25UeXBlXCJcbiAgICAgICAgICBbc29ydEFzY2VuZGluZ0ljb25dPVwic29ydEFzY2VuZGluZ0ljb25cIlxuICAgICAgICAgIFtzb3J0RGVzY2VuZGluZ0ljb25dPVwic29ydERlc2NlbmRpbmdJY29uXCJcbiAgICAgICAgICBbYWxsUm93c1NlbGVjdGVkXT1cImFsbFJvd3NTZWxlY3RlZFwiXG4gICAgICAgICAgKHNvcnQpPVwib25Tb3J0KCRldmVudClcIlxuICAgICAgICAgIChmaWx0ZXIpPVwib25Db2x1bW5GaWx0ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgKHNlbGVjdCk9XCJzZWxlY3QuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAoY29sdW1uQ29udGV4dG1lbnUpPVwiY29sdW1uQ29udGV4dG1lbnUuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICA8L2RhdGF0YWJsZS1oZWFkZXItY2VsbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkYXRhdGFibGUtaGVhZGVyJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBzb3J0QXNjZW5kaW5nSWNvbjogYW55O1xuICBASW5wdXQoKSBzb3J0RGVzY2VuZGluZ0ljb246IGFueTtcbiAgQElucHV0KCkgc2Nyb2xsYmFySDogYm9vbGVhbjtcbiAgQElucHV0KCkgZGVhbHNXaXRoR3JvdXA6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRhcmdldE1hcmtlclRlbXBsYXRlOiBhbnk7XG5cbiAgdGFyZ2V0TWFya2VyQ29udGV4dDogYW55O1xuXG4gIEBJbnB1dCgpIHNldCBpbm5lcldpZHRoKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IHZhbDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9jb2x1bW5zKSB7XG4gICAgICAgIGNvbnN0IGNvbEJ5UGluID0gY29sdW1uc0J5UGluKHRoaXMuX2NvbHVtbnMpO1xuICAgICAgICB0aGlzLl9jb2x1bW5Hcm91cFdpZHRocyA9IGNvbHVtbkdyb3VwV2lkdGhzKGNvbEJ5UGluLCB0aGlzLl9jb2x1bW5zKTtcbiAgICAgICAgdGhpcy5zZXRTdHlsZXNCeUdyb3VwKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXQgaW5uZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbm5lcldpZHRoO1xuICB9XG5cbiAgQElucHV0KCkgc29ydHM6IGFueVtdO1xuICBASW5wdXQoKSBzb3J0VHlwZTogU29ydFR5cGU7XG4gIEBJbnB1dCgpIGFsbFJvd3NTZWxlY3RlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcbiAgQElucHV0KCkgcmVvcmRlcmFibGU6IGJvb2xlYW47XG5cbiAgZHJhZ0V2ZW50VGFyZ2V0OiBhbnk7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKVxuICBASW5wdXQoKVxuICBzZXQgaGVhZGVySGVpZ2h0KHZhbDogYW55KSB7XG4gICAgaWYgKHZhbCAhPT0gJ2F1dG8nKSB7XG4gICAgICB0aGlzLl9oZWFkZXJIZWlnaHQgPSBgJHt2YWx9cHhgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFkZXJIZWlnaHQgPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhlYWRlckhlaWdodCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJIZWlnaHQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgY29sdW1ucyh2YWw6IGFueVtdKSB7XG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcblxuICAgIGNvbnN0IGNvbHNCeVBpbiA9IGNvbHVtbnNCeVBpbih2YWwpO1xuICAgIHRoaXMuX2NvbHVtbnNCeVBpbiA9IGNvbHVtbnNCeVBpbkFycih2YWwpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fY29sdW1uR3JvdXBXaWR0aHMgPSBjb2x1bW5Hcm91cFdpZHRocyhjb2xzQnlQaW4sIHZhbCk7XG4gICAgICB0aGlzLnNldFN0eWxlc0J5R3JvdXAoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjb2x1bW5zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBvZmZzZXRYKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fb2Zmc2V0WCA9IHZhbDtcbiAgICB0aGlzLnNldFN0eWxlc0J5R3JvdXAoKTtcbiAgfVxuICBnZXQgb2Zmc2V0WCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0WDtcbiAgfVxuXG4gIEBPdXRwdXQoKSBzb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVzaXplOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjb2x1bW5Db250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgY29sdW1uOiBhbnkgfT4oZmFsc2UpO1xuICBAT3V0cHV0KCkgZmlsdGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfY29sdW1uc0J5UGluOiBhbnk7XG4gIF9jb2x1bW5Hcm91cFdpZHRoczogYW55ID0ge1xuICAgIHRvdGFsOiAxMDBcbiAgfTtcbiAgX2lubmVyV2lkdGg6IG51bWJlcjtcbiAgX29mZnNldFg6IG51bWJlcjtcbiAgX2NvbHVtbnM6IGFueVtdO1xuICBfaGVhZGVySGVpZ2h0OiBzdHJpbmc7XG4gIF9zdHlsZUJ5R3JvdXA6IHsgW3Byb3A6IHN0cmluZ106IHt9IH0gPSB7XG4gICAgbGVmdDoge30sXG4gICAgY2VudGVyOiB7fSxcbiAgICByaWdodDoge31cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBvbkxvbmdQcmVzc1N0YXJ0KHsgZXZlbnQsIG1vZGVsIH06IHsgZXZlbnQ6IGFueTsgbW9kZWw6IGFueSB9KSB7XG4gICAgbW9kZWwuZHJhZ2dpbmcgPSB0cnVlO1xuICAgIHRoaXMuZHJhZ0V2ZW50VGFyZ2V0ID0gZXZlbnQ7XG4gIH1cblxuICBvbkxvbmdQcmVzc0VuZCh7IGV2ZW50LCBtb2RlbCB9OiB7IGV2ZW50OiBhbnk7IG1vZGVsOiBhbnkgfSkge1xuICAgIHRoaXMuZHJhZ0V2ZW50VGFyZ2V0ID0gZXZlbnQ7XG5cbiAgICAvLyBkZWxheSByZXNldHRpbmcgc28gc29ydCBjYW4gYmVcbiAgICAvLyBwcmV2ZW50ZWQgaWYgd2Ugd2VyZSBkcmFnZ2luZ1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gZGF0YXRhYmxlIGNvbXBvbmVudCBjcmVhdGVzIGNvcGllcyBmcm9tIGNvbHVtbnMgb24gcmVvcmRlclxuICAgICAgLy8gc2V0IGRyYWdnaW5nIHRvIGZhbHNlIG9uIG5ldyBvYmplY3RzXG4gICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLl9jb2x1bW5zLmZpbmQoYyA9PiBjLiQkaWQgPT09IG1vZGVsLiQkaWQpO1xuICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICBjb2x1bW4uZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCA1KTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICBnZXQgaGVhZGVyV2lkdGgoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJIKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lcldpZHRoICsgJ3B4JztcbiAgICB9XG5cbiAgICByZXR1cm4gJzEwMCUnO1xuICB9XG5cbiAgdHJhY2tCeUdyb3VwcyhpbmRleDogbnVtYmVyLCBjb2xHcm91cDogYW55KTogYW55IHtcbiAgICByZXR1cm4gY29sR3JvdXAudHlwZTtcbiAgfVxuXG4gIGNvbHVtblRyYWNraW5nRm4oaW5kZXg6IG51bWJlciwgY29sdW1uOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBjb2x1bW4uJCRpZDtcbiAgfVxuXG4gIG9uQ29sdW1uUmVzaXplZCh3aWR0aDogbnVtYmVyLCBjb2x1bW46IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGlmICh3aWR0aCA8PSBjb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgIHdpZHRoID0gY29sdW1uLm1pbldpZHRoO1xuICAgIH0gZWxzZSBpZiAod2lkdGggPj0gY29sdW1uLm1heFdpZHRoKSB7XG4gICAgICB3aWR0aCA9IGNvbHVtbi5tYXhXaWR0aDtcbiAgICB9XG5cbiAgICB0aGlzLnJlc2l6ZS5lbWl0KHtcbiAgICAgIGNvbHVtbixcbiAgICAgIHByZXZWYWx1ZTogY29sdW1uLndpZHRoLFxuICAgICAgbmV3VmFsdWU6IHdpZHRoXG4gICAgfSk7XG4gIH1cblxuICBvbkNvbHVtblJlb3JkZXJlZCh7IHByZXZJbmRleCwgbmV3SW5kZXgsIG1vZGVsIH06IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKG5ld0luZGV4KTtcbiAgICBjb2x1bW4uaXNUYXJnZXQgPSBmYWxzZTtcbiAgICBjb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJlb3JkZXIuZW1pdCh7XG4gICAgICBjb2x1bW46IG1vZGVsLFxuICAgICAgcHJldlZhbHVlOiBwcmV2SW5kZXgsXG4gICAgICBuZXdWYWx1ZTogbmV3SW5kZXhcbiAgICB9KTtcbiAgfVxuXG4gIG9uVGFyZ2V0Q2hhbmdlZCh7IHByZXZJbmRleCwgbmV3SW5kZXgsIGluaXRpYWxJbmRleCB9OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocHJldkluZGV4IHx8IHByZXZJbmRleCA9PT0gMCkge1xuICAgICAgY29uc3Qgb2xkQ29sdW1uID0gdGhpcy5nZXRDb2x1bW4ocHJldkluZGV4KTtcbiAgICAgIG9sZENvbHVtbi5pc1RhcmdldCA9IGZhbHNlO1xuICAgICAgb2xkQ29sdW1uLnRhcmdldE1hcmtlckNvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChuZXdJbmRleCB8fCBuZXdJbmRleCA9PT0gMCkge1xuICAgICAgY29uc3QgbmV3Q29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmV3SW5kZXgpO1xuICAgICAgbmV3Q29sdW1uLmlzVGFyZ2V0ID0gdHJ1ZTtcblxuICAgICAgaWYgKGluaXRpYWxJbmRleCAhPT0gbmV3SW5kZXgpIHtcbiAgICAgICAgbmV3Q29sdW1uLnRhcmdldE1hcmtlckNvbnRleHQgPSB7XG4gICAgICAgICAgY2xhc3M6ICd0YXJnZXRNYXJrZXIgJy5jb25jYXQoaW5pdGlhbEluZGV4ID4gbmV3SW5kZXggPyAnZHJhZ0Zyb21SaWdodCcgOiAnZHJhZ0Zyb21MZWZ0JylcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRDb2x1bW4oaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgY29uc3QgbGVmdENvbHVtbkNvdW50ID0gdGhpcy5fY29sdW1uc0J5UGluWzBdLmNvbHVtbnMubGVuZ3RoO1xuICAgIGlmIChpbmRleCA8IGxlZnRDb2x1bW5Db3VudCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnNCeVBpblswXS5jb2x1bW5zW2luZGV4XTtcbiAgICB9XG5cbiAgICBjb25zdCBjZW50ZXJDb2x1bW5Db3VudCA9IHRoaXMuX2NvbHVtbnNCeVBpblsxXS5jb2x1bW5zLmxlbmd0aDtcbiAgICBpZiAoaW5kZXggPCBsZWZ0Q29sdW1uQ291bnQgKyBjZW50ZXJDb2x1bW5Db3VudCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnNCeVBpblsxXS5jb2x1bW5zW2luZGV4IC0gbGVmdENvbHVtbkNvdW50XTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY29sdW1uc0J5UGluWzJdLmNvbHVtbnNbaW5kZXggLSBsZWZ0Q29sdW1uQ291bnQgLSBjZW50ZXJDb2x1bW5Db3VudF07XG4gIH1cblxuICBvblNvcnQoeyBjb2x1bW4sIHByZXZWYWx1ZSwgbmV3VmFsdWUgfTogYW55KTogdm9pZCB7XG4gICAgLy8gaWYgd2UgYXJlIGRyYWdnaW5nIGRvbid0IHNvcnQhXG4gICAgaWYgKGNvbHVtbi5kcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNvcnRzID0gdGhpcy5jYWxjTmV3U29ydHMoY29sdW1uLCBwcmV2VmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB0aGlzLnNvcnQuZW1pdCh7XG4gICAgICBzb3J0cyxcbiAgICAgIGNvbHVtbixcbiAgICAgIHByZXZWYWx1ZSxcbiAgICAgIG5ld1ZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBjYWxjTmV3U29ydHMoY29sdW1uOiBhbnksIHByZXZWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKTogYW55W10ge1xuICAgIGxldCBpZHggPSAwO1xuXG4gICAgaWYgKCF0aGlzLnNvcnRzKSB7XG4gICAgICB0aGlzLnNvcnRzID0gW107XG4gICAgfVxuXG4gICAgY29uc3Qgc29ydHMgPSB0aGlzLnNvcnRzLm1hcCgocywgaSkgPT4ge1xuICAgICAgcyA9IHsgLi4ucyB9O1xuICAgICAgaWYgKHMucHJvcCA9PT0gY29sdW1uLnByb3ApIHtcbiAgICAgICAgaWR4ID0gaTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzO1xuICAgIH0pO1xuXG4gICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNvcnRzLnNwbGljZShpZHgsIDEpO1xuICAgIH0gZWxzZSBpZiAocHJldlZhbHVlKSB7XG4gICAgICBzb3J0c1tpZHhdLmRpciA9IG5ld1ZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5zb3J0VHlwZSA9PT0gU29ydFR5cGUuc2luZ2xlKSB7XG4gICAgICAgIHNvcnRzLnNwbGljZSgwLCB0aGlzLnNvcnRzLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIHNvcnRzLnB1c2goeyBkaXI6IG5ld1ZhbHVlLCBwcm9wOiBjb2x1bW4ucHJvcCB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc29ydHM7XG4gIH1cblxuICBzZXRTdHlsZXNCeUdyb3VwKCkge1xuICAgIHRoaXMuX3N0eWxlQnlHcm91cC5sZWZ0ID0gdGhpcy5jYWxjU3R5bGVzQnlHcm91cCgnbGVmdCcpO1xuICAgIHRoaXMuX3N0eWxlQnlHcm91cC5jZW50ZXIgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdjZW50ZXInKTtcbiAgICB0aGlzLl9zdHlsZUJ5R3JvdXAucmlnaHQgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdyaWdodCcpO1xuICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBjYWxjU3R5bGVzQnlHcm91cChncm91cDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCB3aWR0aHMgPSB0aGlzLl9jb2x1bW5Hcm91cFdpZHRocztcbiAgICBjb25zdCBvZmZzZXRYID0gdGhpcy5vZmZzZXRYO1xuXG4gICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgd2lkdGg6IGAke3dpZHRoc1tncm91cF19cHhgXG4gICAgfTtcblxuICAgIGlmIChncm91cCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgIHRyYW5zbGF0ZVhZKHN0eWxlcywgb2Zmc2V0WCAqIC0xLCAwKTtcbiAgICB9IGVsc2UgaWYgKGdyb3VwID09PSAncmlnaHQnKSB7XG4gICAgICBjb25zdCB0b3RhbERpZmYgPSB3aWR0aHMudG90YWwgLSB0aGlzLmlubmVyV2lkdGg7XG4gICAgICBjb25zdCBvZmZzZXQgPSB0b3RhbERpZmYgKiAtMTtcbiAgICAgIHRyYW5zbGF0ZVhZKHN0eWxlcywgb2Zmc2V0LCAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9XG5cbiAgb25Db2x1bW5GaWx0ZXIoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZmlsdGVyLmVtaXQoZXZlbnQpO1xuICB9XG59XG4iXX0=