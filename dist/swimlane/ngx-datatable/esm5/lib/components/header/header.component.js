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
    DataTableHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-header',
                    template: "\n    <div\n      orderable\n      (reorder)=\"onColumnReordered($event)\"\n      (targetChanged)=\"onTargetChanged($event)\"\n      [style.width.px]=\"_columnGroupWidths.total\"\n      class=\"datatable-header-inner\"\n    >\n      <div\n        *ngFor=\"let colGroup of _columnsByPin; trackBy: trackByGroups\"\n        [class]=\"'datatable-row-' + colGroup.type\"\n        [ngStyle]=\"_styleByGroup[colGroup.type]\"\n      >\n        <datatable-header-cell\n          *ngFor=\"let column of colGroup.columns; trackBy: columnTrackingFn\"\n          [ngClass]=\"{ 'filter-template-wrap': column.filter }\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (resize)=\"onColumnResized($event, column)\"\n          long-press\n          [pressModel]=\"column\"\n          [pressEnabled]=\"reorderable && column.draggable\"\n          (longPressStart)=\"onLongPressStart($event)\"\n          (longPressEnd)=\"onLongPressEnd($event)\"\n          draggable\n          [dragX]=\"reorderable && column.draggable && column.dragging\"\n          [dragY]=\"false\"\n          [dragModel]=\"column\"\n          [dragEventTarget]=\"dragEventTarget\"\n          [headerHeight]=\"headerHeight\"\n          [isTarget]=\"column.isTarget\"\n          [targetMarkerTemplate]=\"targetMarkerTemplate\"\n          [targetMarkerContext]=\"column.targetMarkerContext\"\n          [column]=\"column\"\n          [sortType]=\"sortType\"\n          [sorts]=\"sorts\"\n          [selectionType]=\"selectionType\"\n          [sortAscendingIcon]=\"sortAscendingIcon\"\n          [sortDescendingIcon]=\"sortDescendingIcon\"\n          [allRowsSelected]=\"allRowsSelected\"\n          (sort)=\"onSort($event)\"\n          (select)=\"select.emit($event)\"\n          (columnContextmenu)=\"columnContextmenu.emit($event)\"\n        >\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEQ7SUFpSkUsa0NBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBcEIvQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLENBQXFDLEtBQUssQ0FBQyxDQUFDO1FBRzFGLHVCQUFrQixHQUFRO1lBQ3hCLEtBQUssRUFBRSxHQUFHO1NBQ1gsQ0FBQztRQUtGLGtCQUFhLEdBQTJCO1lBQ3RDLElBQUksRUFBRSxFQUFFO1lBQ1IsTUFBTSxFQUFFLEVBQUU7WUFDVixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7SUFFMEMsQ0FBQztJQWpGN0Msc0JBQWEsZ0RBQVU7Ozs7UUFXdkI7WUFD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dkQsMkNBQTBEOztJQUMxRCwwQ0FBeUQ7O0lBQ3pELDBDQUF5RDs7SUFDekQscURBQTBGOztJQUUxRixpREFBbUI7O0lBQ25CLHNEQUVFOztJQUNGLCtDQUFvQjs7SUFDcEIsNENBQWlCOztJQUNqQiw0Q0FBZ0I7O0lBQ2hCLGlEQUFzQjs7SUFDdEIsaURBSUU7Ozs7O0lBRVUsc0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIEhvc3RCaW5kaW5nLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcbmltcG9ydCB7IGNvbHVtbnNCeVBpbiwgY29sdW1uR3JvdXBXaWR0aHMsIGNvbHVtbnNCeVBpbkFyciB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbHVtbic7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQudHlwZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvc2VsZWN0aW9uLnR5cGUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IHRyYW5zbGF0ZVhZIH0gZnJvbSAnLi4vLi4vdXRpbHMvdHJhbnNsYXRlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgb3JkZXJhYmxlXG4gICAgICAocmVvcmRlcik9XCJvbkNvbHVtblJlb3JkZXJlZCgkZXZlbnQpXCJcbiAgICAgICh0YXJnZXRDaGFuZ2VkKT1cIm9uVGFyZ2V0Q2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgIFtzdHlsZS53aWR0aC5weF09XCJfY29sdW1uR3JvdXBXaWR0aHMudG90YWxcIlxuICAgICAgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWlubmVyXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0Zvcj1cImxldCBjb2xHcm91cCBvZiBfY29sdW1uc0J5UGluOyB0cmFja0J5OiB0cmFja0J5R3JvdXBzXCJcbiAgICAgICAgW2NsYXNzXT1cIidkYXRhdGFibGUtcm93LScgKyBjb2xHcm91cC50eXBlXCJcbiAgICAgICAgW25nU3R5bGVdPVwiX3N0eWxlQnlHcm91cFtjb2xHcm91cC50eXBlXVwiXG4gICAgICA+XG4gICAgICAgIDxkYXRhdGFibGUtaGVhZGVyLWNlbGxcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbEdyb3VwLmNvbHVtbnM7IHRyYWNrQnk6IGNvbHVtblRyYWNraW5nRm5cIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ2ZpbHRlci10ZW1wbGF0ZS13cmFwJzogY29sdW1uLmZpbHRlciB9XCJcbiAgICAgICAgICByZXNpemVhYmxlXG4gICAgICAgICAgW3Jlc2l6ZUVuYWJsZWRdPVwiY29sdW1uLnJlc2l6ZWFibGVcIlxuICAgICAgICAgIChyZXNpemUpPVwib25Db2x1bW5SZXNpemVkKCRldmVudCwgY29sdW1uKVwiXG4gICAgICAgICAgbG9uZy1wcmVzc1xuICAgICAgICAgIFtwcmVzc01vZGVsXT1cImNvbHVtblwiXG4gICAgICAgICAgW3ByZXNzRW5hYmxlZF09XCJyZW9yZGVyYWJsZSAmJiBjb2x1bW4uZHJhZ2dhYmxlXCJcbiAgICAgICAgICAobG9uZ1ByZXNzU3RhcnQpPVwib25Mb25nUHJlc3NTdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAobG9uZ1ByZXNzRW5kKT1cIm9uTG9uZ1ByZXNzRW5kKCRldmVudClcIlxuICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgIFtkcmFnWF09XCJyZW9yZGVyYWJsZSAmJiBjb2x1bW4uZHJhZ2dhYmxlICYmIGNvbHVtbi5kcmFnZ2luZ1wiXG4gICAgICAgICAgW2RyYWdZXT1cImZhbHNlXCJcbiAgICAgICAgICBbZHJhZ01vZGVsXT1cImNvbHVtblwiXG4gICAgICAgICAgW2RyYWdFdmVudFRhcmdldF09XCJkcmFnRXZlbnRUYXJnZXRcIlxuICAgICAgICAgIFtoZWFkZXJIZWlnaHRdPVwiaGVhZGVySGVpZ2h0XCJcbiAgICAgICAgICBbaXNUYXJnZXRdPVwiY29sdW1uLmlzVGFyZ2V0XCJcbiAgICAgICAgICBbdGFyZ2V0TWFya2VyVGVtcGxhdGVdPVwidGFyZ2V0TWFya2VyVGVtcGxhdGVcIlxuICAgICAgICAgIFt0YXJnZXRNYXJrZXJDb250ZXh0XT1cImNvbHVtbi50YXJnZXRNYXJrZXJDb250ZXh0XCJcbiAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgICAgW3NvcnRUeXBlXT1cInNvcnRUeXBlXCJcbiAgICAgICAgICBbc29ydHNdPVwic29ydHNcIlxuICAgICAgICAgIFtzZWxlY3Rpb25UeXBlXT1cInNlbGVjdGlvblR5cGVcIlxuICAgICAgICAgIFtzb3J0QXNjZW5kaW5nSWNvbl09XCJzb3J0QXNjZW5kaW5nSWNvblwiXG4gICAgICAgICAgW3NvcnREZXNjZW5kaW5nSWNvbl09XCJzb3J0RGVzY2VuZGluZ0ljb25cIlxuICAgICAgICAgIFthbGxSb3dzU2VsZWN0ZWRdPVwiYWxsUm93c1NlbGVjdGVkXCJcbiAgICAgICAgICAoc29ydCk9XCJvblNvcnQoJGV2ZW50KVwiXG4gICAgICAgICAgKHNlbGVjdCk9XCJzZWxlY3QuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAoY29sdW1uQ29udGV4dG1lbnUpPVwiY29sdW1uQ29udGV4dG1lbnUuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICA8L2RhdGF0YWJsZS1oZWFkZXItY2VsbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkYXRhdGFibGUtaGVhZGVyJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBzb3J0QXNjZW5kaW5nSWNvbjogYW55O1xuICBASW5wdXQoKSBzb3J0RGVzY2VuZGluZ0ljb246IGFueTtcbiAgQElucHV0KCkgc2Nyb2xsYmFySDogYm9vbGVhbjtcbiAgQElucHV0KCkgZGVhbHNXaXRoR3JvdXA6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRhcmdldE1hcmtlclRlbXBsYXRlOiBhbnk7XG5cbiAgdGFyZ2V0TWFya2VyQ29udGV4dDogYW55O1xuXG4gIEBJbnB1dCgpIHNldCBpbm5lcldpZHRoKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IHZhbDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9jb2x1bW5zKSB7XG4gICAgICAgIGNvbnN0IGNvbEJ5UGluID0gY29sdW1uc0J5UGluKHRoaXMuX2NvbHVtbnMpO1xuICAgICAgICB0aGlzLl9jb2x1bW5Hcm91cFdpZHRocyA9IGNvbHVtbkdyb3VwV2lkdGhzKGNvbEJ5UGluLCB0aGlzLl9jb2x1bW5zKTtcbiAgICAgICAgdGhpcy5zZXRTdHlsZXNCeUdyb3VwKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXQgaW5uZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbm5lcldpZHRoO1xuICB9XG5cbiAgQElucHV0KCkgc29ydHM6IGFueVtdO1xuICBASW5wdXQoKSBzb3J0VHlwZTogU29ydFR5cGU7XG4gIEBJbnB1dCgpIGFsbFJvd3NTZWxlY3RlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcbiAgQElucHV0KCkgcmVvcmRlcmFibGU6IGJvb2xlYW47XG5cbiAgZHJhZ0V2ZW50VGFyZ2V0OiBhbnk7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKVxuICBASW5wdXQoKVxuICBzZXQgaGVhZGVySGVpZ2h0KHZhbDogYW55KSB7XG4gICAgaWYgKHZhbCAhPT0gJ2F1dG8nKSB7XG4gICAgICB0aGlzLl9oZWFkZXJIZWlnaHQgPSBgJHt2YWx9cHhgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFkZXJIZWlnaHQgPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhlYWRlckhlaWdodCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJIZWlnaHQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgY29sdW1ucyh2YWw6IGFueVtdKSB7XG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcblxuICAgIGNvbnN0IGNvbHNCeVBpbiA9IGNvbHVtbnNCeVBpbih2YWwpO1xuICAgIHRoaXMuX2NvbHVtbnNCeVBpbiA9IGNvbHVtbnNCeVBpbkFycih2YWwpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fY29sdW1uR3JvdXBXaWR0aHMgPSBjb2x1bW5Hcm91cFdpZHRocyhjb2xzQnlQaW4sIHZhbCk7XG4gICAgICB0aGlzLnNldFN0eWxlc0J5R3JvdXAoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjb2x1bW5zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBvZmZzZXRYKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fb2Zmc2V0WCA9IHZhbDtcbiAgICB0aGlzLnNldFN0eWxlc0J5R3JvdXAoKTtcbiAgfVxuICBnZXQgb2Zmc2V0WCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0WDtcbiAgfVxuXG4gIEBPdXRwdXQoKSBzb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVzaXplOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjb2x1bW5Db250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgY29sdW1uOiBhbnkgfT4oZmFsc2UpO1xuXG4gIF9jb2x1bW5zQnlQaW46IGFueTtcbiAgX2NvbHVtbkdyb3VwV2lkdGhzOiBhbnkgPSB7XG4gICAgdG90YWw6IDEwMFxuICB9O1xuICBfaW5uZXJXaWR0aDogbnVtYmVyO1xuICBfb2Zmc2V0WDogbnVtYmVyO1xuICBfY29sdW1uczogYW55W107XG4gIF9oZWFkZXJIZWlnaHQ6IHN0cmluZztcbiAgX3N0eWxlQnlHcm91cDogeyBbcHJvcDogc3RyaW5nXToge30gfSA9IHtcbiAgICBsZWZ0OiB7fSxcbiAgICBjZW50ZXI6IHt9LFxuICAgIHJpZ2h0OiB7fVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG9uTG9uZ1ByZXNzU3RhcnQoeyBldmVudCwgbW9kZWwgfTogeyBldmVudDogYW55OyBtb2RlbDogYW55IH0pIHtcbiAgICBtb2RlbC5kcmFnZ2luZyA9IHRydWU7XG4gICAgdGhpcy5kcmFnRXZlbnRUYXJnZXQgPSBldmVudDtcbiAgfVxuXG4gIG9uTG9uZ1ByZXNzRW5kKHsgZXZlbnQsIG1vZGVsIH06IHsgZXZlbnQ6IGFueTsgbW9kZWw6IGFueSB9KSB7XG4gICAgdGhpcy5kcmFnRXZlbnRUYXJnZXQgPSBldmVudDtcblxuICAgIC8vIGRlbGF5IHJlc2V0dGluZyBzbyBzb3J0IGNhbiBiZVxuICAgIC8vIHByZXZlbnRlZCBpZiB3ZSB3ZXJlIGRyYWdnaW5nXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBkYXRhdGFibGUgY29tcG9uZW50IGNyZWF0ZXMgY29waWVzIGZyb20gY29sdW1ucyBvbiByZW9yZGVyXG4gICAgICAvLyBzZXQgZHJhZ2dpbmcgdG8gZmFsc2Ugb24gbmV3IG9iamVjdHNcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuX2NvbHVtbnMuZmluZChjID0+IGMuJCRpZCA9PT0gbW9kZWwuJCRpZCk7XG4gICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgIGNvbHVtbi5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sIDUpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpXG4gIGdldCBoZWFkZXJXaWR0aCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnNjcm9sbGJhckgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyV2lkdGggKyAncHgnO1xuICAgIH1cblxuICAgIHJldHVybiAnMTAwJSc7XG4gIH1cblxuICB0cmFja0J5R3JvdXBzKGluZGV4OiBudW1iZXIsIGNvbEdyb3VwOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBjb2xHcm91cC50eXBlO1xuICB9XG5cbiAgY29sdW1uVHJhY2tpbmdGbihpbmRleDogbnVtYmVyLCBjb2x1bW46IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGNvbHVtbi4kJGlkO1xuICB9XG5cbiAgb25Db2x1bW5SZXNpemVkKHdpZHRoOiBudW1iZXIsIGNvbHVtbjogRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgaWYgKHdpZHRoIDw9IGNvbHVtbi5taW5XaWR0aCkge1xuICAgICAgd2lkdGggPSBjb2x1bW4ubWluV2lkdGg7XG4gICAgfSBlbHNlIGlmICh3aWR0aCA+PSBjb2x1bW4ubWF4V2lkdGgpIHtcbiAgICAgIHdpZHRoID0gY29sdW1uLm1heFdpZHRoO1xuICAgIH1cblxuICAgIHRoaXMucmVzaXplLmVtaXQoe1xuICAgICAgY29sdW1uLFxuICAgICAgcHJldlZhbHVlOiBjb2x1bW4ud2lkdGgsXG4gICAgICBuZXdWYWx1ZTogd2lkdGhcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ29sdW1uUmVvcmRlcmVkKHsgcHJldkluZGV4LCBuZXdJbmRleCwgbW9kZWwgfTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmV3SW5kZXgpO1xuICAgIGNvbHVtbi5pc1RhcmdldCA9IGZhbHNlO1xuICAgIGNvbHVtbi50YXJnZXRNYXJrZXJDb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucmVvcmRlci5lbWl0KHtcbiAgICAgIGNvbHVtbjogbW9kZWwsXG4gICAgICBwcmV2VmFsdWU6IHByZXZJbmRleCxcbiAgICAgIG5ld1ZhbHVlOiBuZXdJbmRleFxuICAgIH0pO1xuICB9XG5cbiAgb25UYXJnZXRDaGFuZ2VkKHsgcHJldkluZGV4LCBuZXdJbmRleCwgaW5pdGlhbEluZGV4IH06IGFueSk6IHZvaWQge1xuICAgIGlmIChwcmV2SW5kZXggfHwgcHJldkluZGV4ID09PSAwKSB7XG4gICAgICBjb25zdCBvbGRDb2x1bW4gPSB0aGlzLmdldENvbHVtbihwcmV2SW5kZXgpO1xuICAgICAgb2xkQ29sdW1uLmlzVGFyZ2V0ID0gZmFsc2U7XG4gICAgICBvbGRDb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKG5ld0luZGV4IHx8IG5ld0luZGV4ID09PSAwKSB7XG4gICAgICBjb25zdCBuZXdDb2x1bW4gPSB0aGlzLmdldENvbHVtbihuZXdJbmRleCk7XG4gICAgICBuZXdDb2x1bW4uaXNUYXJnZXQgPSB0cnVlO1xuXG4gICAgICBpZiAoaW5pdGlhbEluZGV4ICE9PSBuZXdJbmRleCkge1xuICAgICAgICBuZXdDb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dCA9IHtcbiAgICAgICAgICBjbGFzczogJ3RhcmdldE1hcmtlciAnLmNvbmNhdChpbml0aWFsSW5kZXggPiBuZXdJbmRleCA/ICdkcmFnRnJvbVJpZ2h0JyA6ICdkcmFnRnJvbUxlZnQnKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENvbHVtbihpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICBjb25zdCBsZWZ0Q29sdW1uQ291bnQgPSB0aGlzLl9jb2x1bW5zQnlQaW5bMF0uY29sdW1ucy5sZW5ndGg7XG4gICAgaWYgKGluZGV4IDwgbGVmdENvbHVtbkNvdW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29sdW1uc0J5UGluWzBdLmNvbHVtbnNbaW5kZXhdO1xuICAgIH1cblxuICAgIGNvbnN0IGNlbnRlckNvbHVtbkNvdW50ID0gdGhpcy5fY29sdW1uc0J5UGluWzFdLmNvbHVtbnMubGVuZ3RoO1xuICAgIGlmIChpbmRleCA8IGxlZnRDb2x1bW5Db3VudCArIGNlbnRlckNvbHVtbkNvdW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29sdW1uc0J5UGluWzFdLmNvbHVtbnNbaW5kZXggLSBsZWZ0Q29sdW1uQ291bnRdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zQnlQaW5bMl0uY29sdW1uc1tpbmRleCAtIGxlZnRDb2x1bW5Db3VudCAtIGNlbnRlckNvbHVtbkNvdW50XTtcbiAgfVxuXG4gIG9uU29ydCh7IGNvbHVtbiwgcHJldlZhbHVlLCBuZXdWYWx1ZSB9OiBhbnkpOiB2b2lkIHtcbiAgICAvLyBpZiB3ZSBhcmUgZHJhZ2dpbmcgZG9uJ3Qgc29ydCFcbiAgICBpZiAoY29sdW1uLmRyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc29ydHMgPSB0aGlzLmNhbGNOZXdTb3J0cyhjb2x1bW4sIHByZXZWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIHRoaXMuc29ydC5lbWl0KHtcbiAgICAgIHNvcnRzLFxuICAgICAgY29sdW1uLFxuICAgICAgcHJldlZhbHVlLFxuICAgICAgbmV3VmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGNOZXdTb3J0cyhjb2x1bW46IGFueSwgcHJldlZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpOiBhbnlbXSB7XG4gICAgbGV0IGlkeCA9IDA7XG5cbiAgICBpZiAoIXRoaXMuc29ydHMpIHtcbiAgICAgIHRoaXMuc29ydHMgPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3J0cyA9IHRoaXMuc29ydHMubWFwKChzLCBpKSA9PiB7XG4gICAgICBzID0geyAuLi5zIH07XG4gICAgICBpZiAocy5wcm9wID09PSBjb2x1bW4ucHJvcCkge1xuICAgICAgICBpZHggPSBpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHM7XG4gICAgfSk7XG5cbiAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgc29ydHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfSBlbHNlIGlmIChwcmV2VmFsdWUpIHtcbiAgICAgIHNvcnRzW2lkeF0uZGlyID0gbmV3VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnNvcnRUeXBlID09PSBTb3J0VHlwZS5zaW5nbGUpIHtcbiAgICAgICAgc29ydHMuc3BsaWNlKDAsIHRoaXMuc29ydHMubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgc29ydHMucHVzaCh7IGRpcjogbmV3VmFsdWUsIHByb3A6IGNvbHVtbi5wcm9wIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzb3J0cztcbiAgfVxuXG4gIHNldFN0eWxlc0J5R3JvdXAoKSB7XG4gICAgdGhpcy5fc3R5bGVCeUdyb3VwLmxlZnQgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdsZWZ0Jyk7XG4gICAgdGhpcy5fc3R5bGVCeUdyb3VwLmNlbnRlciA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ2NlbnRlcicpO1xuICAgIHRoaXMuX3N0eWxlQnlHcm91cC5yaWdodCA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ3JpZ2h0Jyk7XG4gICAgaWYgKCEodGhpcy5jZCBhcyBWaWV3UmVmKS5kZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGNhbGNTdHlsZXNCeUdyb3VwKGdyb3VwOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHdpZHRocyA9IHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzO1xuICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLm9mZnNldFg7XG5cbiAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICB3aWR0aDogYCR7d2lkdGhzW2dyb3VwXX1weGBcbiAgICB9O1xuXG4gICAgaWYgKGdyb3VwID09PSAnY2VudGVyJykge1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXRYICogLTEsIDApO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAgPT09ICdyaWdodCcpIHtcbiAgICAgIGNvbnN0IHRvdGFsRGlmZiA9IHdpZHRocy50b3RhbCAtIHRoaXMuaW5uZXJXaWR0aDtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHRvdGFsRGlmZiAqIC0xO1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXQsIDApO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cbn1cbiJdfQ==