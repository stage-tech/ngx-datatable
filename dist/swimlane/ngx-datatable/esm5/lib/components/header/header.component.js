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
                    template: "\n    <div\n      orderable\n      (reorder)=\"onColumnReordered($event)\"\n      (targetChanged)=\"onTargetChanged($event)\"\n      [style.width.px]=\"_columnGroupWidths.total\"\n      class=\"datatable-header-inner\"\n    >\n      <div\n        *ngFor=\"let colGroup of _columnsByPin; trackBy: trackByGroups\"\n        [class]=\"'datatable-row-' + colGroup.type\"\n        [ngStyle]=\"_styleByGroup[colGroup.type]\"\n      >\n        <datatable-header-cell\n          *ngFor=\"let column of colGroup.columns; trackBy: columnTrackingFn\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (resize)=\"onColumnResized($event, column)\"\n          long-press\n          [pressModel]=\"column\"\n          [pressEnabled]=\"reorderable && column.draggable\"\n          (longPressStart)=\"onLongPressStart($event)\"\n          (longPressEnd)=\"onLongPressEnd($event)\"\n          draggable\n          [dragX]=\"reorderable && column.draggable && column.dragging\"\n          [dragY]=\"false\"\n          [dragModel]=\"column\"\n          [dragEventTarget]=\"dragEventTarget\"\n          [headerHeight]=\"headerHeight\"\n          [isTarget]=\"column.isTarget\"\n          [targetMarkerTemplate]=\"targetMarkerTemplate\"\n          [targetMarkerContext]=\"column.targetMarkerContext\"\n          [column]=\"column\"\n          [sortType]=\"sortType\"\n          [sorts]=\"sorts\"\n          [selectionType]=\"selectionType\"\n          [sortAscendingIcon]=\"sortAscendingIcon\"\n          [sortDescendingIcon]=\"sortDescendingIcon\"\n          [allRowsSelected]=\"allRowsSelected\"\n          (sort)=\"onSort($event)\"\n          (select)=\"select.emit($event)\"\n          (columnContextmenu)=\"columnContextmenu.emit($event)\"\n        >\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEQ7SUFnSkUsa0NBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBcEIvQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLENBQXFDLEtBQUssQ0FBQyxDQUFDO1FBRzFGLHVCQUFrQixHQUFRO1lBQ3hCLEtBQUssRUFBRSxHQUFHO1NBQ1gsQ0FBQztRQUtGLGtCQUFhLEdBQTJCO1lBQ3RDLElBQUksRUFBRSxFQUFFO1lBQ1IsTUFBTSxFQUFFLEVBQUU7WUFDVixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7SUFFMEMsQ0FBQztJQWpGN0Msc0JBQWEsZ0RBQVU7Ozs7UUFXdkI7WUFD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dkQsMkNBQTBEOztJQUMxRCwwQ0FBeUQ7O0lBQ3pELDBDQUF5RDs7SUFDekQscURBQTBGOztJQUUxRixpREFBbUI7O0lBQ25CLHNEQUVFOztJQUNGLCtDQUFvQjs7SUFDcEIsNENBQWlCOztJQUNqQiw0Q0FBZ0I7O0lBQ2hCLGlEQUFzQjs7SUFDdEIsaURBSUU7Ozs7O0lBRVUsc0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBIb3N0QmluZGluZyxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBWaWV3UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudHMnO1xyXG5pbXBvcnQgeyBjb2x1bW5zQnlQaW4sIGNvbHVtbkdyb3VwV2lkdGhzLCBjb2x1bW5zQnlQaW5BcnIgfSBmcm9tICcuLi8uLi91dGlscy9jb2x1bW4nO1xyXG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQudHlwZSc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IHRyYW5zbGF0ZVhZIH0gZnJvbSAnLi4vLi4vdXRpbHMvdHJhbnNsYXRlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlcicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXZcclxuICAgICAgb3JkZXJhYmxlXHJcbiAgICAgIChyZW9yZGVyKT1cIm9uQ29sdW1uUmVvcmRlcmVkKCRldmVudClcIlxyXG4gICAgICAodGFyZ2V0Q2hhbmdlZCk9XCJvblRhcmdldENoYW5nZWQoJGV2ZW50KVwiXHJcbiAgICAgIFtzdHlsZS53aWR0aC5weF09XCJfY29sdW1uR3JvdXBXaWR0aHMudG90YWxcIlxyXG4gICAgICBjbGFzcz1cImRhdGF0YWJsZS1oZWFkZXItaW5uZXJcIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGNvbEdyb3VwIG9mIF9jb2x1bW5zQnlQaW47IHRyYWNrQnk6IHRyYWNrQnlHcm91cHNcIlxyXG4gICAgICAgIFtjbGFzc109XCInZGF0YXRhYmxlLXJvdy0nICsgY29sR3JvdXAudHlwZVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwiX3N0eWxlQnlHcm91cFtjb2xHcm91cC50eXBlXVwiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGF0YXRhYmxlLWhlYWRlci1jZWxsXHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbEdyb3VwLmNvbHVtbnM7IHRyYWNrQnk6IGNvbHVtblRyYWNraW5nRm5cIlxyXG4gICAgICAgICAgcmVzaXplYWJsZVxyXG4gICAgICAgICAgW3Jlc2l6ZUVuYWJsZWRdPVwiY29sdW1uLnJlc2l6ZWFibGVcIlxyXG4gICAgICAgICAgKHJlc2l6ZSk9XCJvbkNvbHVtblJlc2l6ZWQoJGV2ZW50LCBjb2x1bW4pXCJcclxuICAgICAgICAgIGxvbmctcHJlc3NcclxuICAgICAgICAgIFtwcmVzc01vZGVsXT1cImNvbHVtblwiXHJcbiAgICAgICAgICBbcHJlc3NFbmFibGVkXT1cInJlb3JkZXJhYmxlICYmIGNvbHVtbi5kcmFnZ2FibGVcIlxyXG4gICAgICAgICAgKGxvbmdQcmVzc1N0YXJ0KT1cIm9uTG9uZ1ByZXNzU3RhcnQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAobG9uZ1ByZXNzRW5kKT1cIm9uTG9uZ1ByZXNzRW5kKCRldmVudClcIlxyXG4gICAgICAgICAgZHJhZ2dhYmxlXHJcbiAgICAgICAgICBbZHJhZ1hdPVwicmVvcmRlcmFibGUgJiYgY29sdW1uLmRyYWdnYWJsZSAmJiBjb2x1bW4uZHJhZ2dpbmdcIlxyXG4gICAgICAgICAgW2RyYWdZXT1cImZhbHNlXCJcclxuICAgICAgICAgIFtkcmFnTW9kZWxdPVwiY29sdW1uXCJcclxuICAgICAgICAgIFtkcmFnRXZlbnRUYXJnZXRdPVwiZHJhZ0V2ZW50VGFyZ2V0XCJcclxuICAgICAgICAgIFtoZWFkZXJIZWlnaHRdPVwiaGVhZGVySGVpZ2h0XCJcclxuICAgICAgICAgIFtpc1RhcmdldF09XCJjb2x1bW4uaXNUYXJnZXRcIlxyXG4gICAgICAgICAgW3RhcmdldE1hcmtlclRlbXBsYXRlXT1cInRhcmdldE1hcmtlclRlbXBsYXRlXCJcclxuICAgICAgICAgIFt0YXJnZXRNYXJrZXJDb250ZXh0XT1cImNvbHVtbi50YXJnZXRNYXJrZXJDb250ZXh0XCJcclxuICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcclxuICAgICAgICAgIFtzb3J0VHlwZV09XCJzb3J0VHlwZVwiXHJcbiAgICAgICAgICBbc29ydHNdPVwic29ydHNcIlxyXG4gICAgICAgICAgW3NlbGVjdGlvblR5cGVdPVwic2VsZWN0aW9uVHlwZVwiXHJcbiAgICAgICAgICBbc29ydEFzY2VuZGluZ0ljb25dPVwic29ydEFzY2VuZGluZ0ljb25cIlxyXG4gICAgICAgICAgW3NvcnREZXNjZW5kaW5nSWNvbl09XCJzb3J0RGVzY2VuZGluZ0ljb25cIlxyXG4gICAgICAgICAgW2FsbFJvd3NTZWxlY3RlZF09XCJhbGxSb3dzU2VsZWN0ZWRcIlxyXG4gICAgICAgICAgKHNvcnQpPVwib25Tb3J0KCRldmVudClcIlxyXG4gICAgICAgICAgKHNlbGVjdCk9XCJzZWxlY3QuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgICAgIChjb2x1bW5Db250ZXh0bWVudSk9XCJjb2x1bW5Db250ZXh0bWVudS5lbWl0KCRldmVudClcIlxyXG4gICAgICAgID5cclxuICAgICAgICA8L2RhdGF0YWJsZS1oZWFkZXItY2VsbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnZGF0YXRhYmxlLWhlYWRlcidcclxuICB9LFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIHNvcnRBc2NlbmRpbmdJY29uOiBhbnk7XHJcbiAgQElucHV0KCkgc29ydERlc2NlbmRpbmdJY29uOiBhbnk7XHJcbiAgQElucHV0KCkgc2Nyb2xsYmFySDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBkZWFsc1dpdGhHcm91cDogYm9vbGVhbjtcclxuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJUZW1wbGF0ZTogYW55O1xyXG5cclxuICB0YXJnZXRNYXJrZXJDb250ZXh0OiBhbnk7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBpbm5lcldpZHRoKHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gdmFsO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9jb2x1bW5zKSB7XHJcbiAgICAgICAgY29uc3QgY29sQnlQaW4gPSBjb2x1bW5zQnlQaW4odGhpcy5fY29sdW1ucyk7XHJcbiAgICAgICAgdGhpcy5fY29sdW1uR3JvdXBXaWR0aHMgPSBjb2x1bW5Hcm91cFdpZHRocyhjb2xCeVBpbiwgdGhpcy5fY29sdW1ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZXNCeUdyb3VwKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlubmVyV2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9pbm5lcldpZHRoO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc29ydHM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHNvcnRUeXBlOiBTb3J0VHlwZTtcclxuICBASW5wdXQoKSBhbGxSb3dzU2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcclxuICBASW5wdXQoKSByZW9yZGVyYWJsZTogYm9vbGVhbjtcclxuXHJcbiAgZHJhZ0V2ZW50VGFyZ2V0OiBhbnk7XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JylcclxuICBASW5wdXQoKVxyXG4gIHNldCBoZWFkZXJIZWlnaHQodmFsOiBhbnkpIHtcclxuICAgIGlmICh2YWwgIT09ICdhdXRvJykge1xyXG4gICAgICB0aGlzLl9oZWFkZXJIZWlnaHQgPSBgJHt2YWx9cHhgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5faGVhZGVySGVpZ2h0ID0gdmFsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGhlYWRlckhlaWdodCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlckhlaWdodDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBjb2x1bW5zKHZhbDogYW55W10pIHtcclxuICAgIHRoaXMuX2NvbHVtbnMgPSB2YWw7XHJcblxyXG4gICAgY29uc3QgY29sc0J5UGluID0gY29sdW1uc0J5UGluKHZhbCk7XHJcbiAgICB0aGlzLl9jb2x1bW5zQnlQaW4gPSBjb2x1bW5zQnlQaW5BcnIodmFsKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jb2x1bW5Hcm91cFdpZHRocyA9IGNvbHVtbkdyb3VwV2lkdGhzKGNvbHNCeVBpbiwgdmFsKTtcclxuICAgICAgdGhpcy5zZXRTdHlsZXNCeUdyb3VwKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldCBjb2x1bW5zKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgb2Zmc2V0WCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fb2Zmc2V0WCA9IHZhbDtcclxuICAgIHRoaXMuc2V0U3R5bGVzQnlHcm91cCgpO1xyXG4gIH1cclxuICBnZXQgb2Zmc2V0WCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9vZmZzZXRYO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSByZW9yZGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgcmVzaXplOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgY29sdW1uQ29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IE1vdXNlRXZlbnQ7IGNvbHVtbjogYW55IH0+KGZhbHNlKTtcclxuXHJcbiAgX2NvbHVtbnNCeVBpbjogYW55O1xyXG4gIF9jb2x1bW5Hcm91cFdpZHRoczogYW55ID0ge1xyXG4gICAgdG90YWw6IDEwMFxyXG4gIH07XHJcbiAgX2lubmVyV2lkdGg6IG51bWJlcjtcclxuICBfb2Zmc2V0WDogbnVtYmVyO1xyXG4gIF9jb2x1bW5zOiBhbnlbXTtcclxuICBfaGVhZGVySGVpZ2h0OiBzdHJpbmc7XHJcbiAgX3N0eWxlQnlHcm91cDogeyBbcHJvcDogc3RyaW5nXToge30gfSA9IHtcclxuICAgIGxlZnQ6IHt9LFxyXG4gICAgY2VudGVyOiB7fSxcclxuICAgIHJpZ2h0OiB7fVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICBvbkxvbmdQcmVzc1N0YXJ0KHsgZXZlbnQsIG1vZGVsIH06IHsgZXZlbnQ6IGFueTsgbW9kZWw6IGFueSB9KSB7XHJcbiAgICBtb2RlbC5kcmFnZ2luZyA9IHRydWU7XHJcbiAgICB0aGlzLmRyYWdFdmVudFRhcmdldCA9IGV2ZW50O1xyXG4gIH1cclxuXHJcbiAgb25Mb25nUHJlc3NFbmQoeyBldmVudCwgbW9kZWwgfTogeyBldmVudDogYW55OyBtb2RlbDogYW55IH0pIHtcclxuICAgIHRoaXMuZHJhZ0V2ZW50VGFyZ2V0ID0gZXZlbnQ7XHJcblxyXG4gICAgLy8gZGVsYXkgcmVzZXR0aW5nIHNvIHNvcnQgY2FuIGJlXHJcbiAgICAvLyBwcmV2ZW50ZWQgaWYgd2Ugd2VyZSBkcmFnZ2luZ1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIC8vIGRhdGF0YWJsZSBjb21wb25lbnQgY3JlYXRlcyBjb3BpZXMgZnJvbSBjb2x1bW5zIG9uIHJlb3JkZXJcclxuICAgICAgLy8gc2V0IGRyYWdnaW5nIHRvIGZhbHNlIG9uIG5ldyBvYmplY3RzXHJcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuX2NvbHVtbnMuZmluZChjID0+IGMuJCRpZCA9PT0gbW9kZWwuJCRpZCk7XHJcbiAgICAgIGlmIChjb2x1bW4pIHtcclxuICAgICAgICBjb2x1bW4uZHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSwgNSk7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcclxuICBnZXQgaGVhZGVyV2lkdGgoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLnNjcm9sbGJhckgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJXaWR0aCArICdweCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICcxMDAlJztcclxuICB9XHJcblxyXG4gIHRyYWNrQnlHcm91cHMoaW5kZXg6IG51bWJlciwgY29sR3JvdXA6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gY29sR3JvdXAudHlwZTtcclxuICB9XHJcblxyXG4gIGNvbHVtblRyYWNraW5nRm4oaW5kZXg6IG51bWJlciwgY29sdW1uOiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIGNvbHVtbi4kJGlkO1xyXG4gIH1cclxuXHJcbiAgb25Db2x1bW5SZXNpemVkKHdpZHRoOiBudW1iZXIsIGNvbHVtbjogRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICBpZiAod2lkdGggPD0gY29sdW1uLm1pbldpZHRoKSB7XHJcbiAgICAgIHdpZHRoID0gY29sdW1uLm1pbldpZHRoO1xyXG4gICAgfSBlbHNlIGlmICh3aWR0aCA+PSBjb2x1bW4ubWF4V2lkdGgpIHtcclxuICAgICAgd2lkdGggPSBjb2x1bW4ubWF4V2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZXNpemUuZW1pdCh7XHJcbiAgICAgIGNvbHVtbixcclxuICAgICAgcHJldlZhbHVlOiBjb2x1bW4ud2lkdGgsXHJcbiAgICAgIG5ld1ZhbHVlOiB3aWR0aFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkNvbHVtblJlb3JkZXJlZCh7IHByZXZJbmRleCwgbmV3SW5kZXgsIG1vZGVsIH06IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmV3SW5kZXgpO1xyXG4gICAgY29sdW1uLmlzVGFyZ2V0ID0gZmFsc2U7XHJcbiAgICBjb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMucmVvcmRlci5lbWl0KHtcclxuICAgICAgY29sdW1uOiBtb2RlbCxcclxuICAgICAgcHJldlZhbHVlOiBwcmV2SW5kZXgsXHJcbiAgICAgIG5ld1ZhbHVlOiBuZXdJbmRleFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblRhcmdldENoYW5nZWQoeyBwcmV2SW5kZXgsIG5ld0luZGV4LCBpbml0aWFsSW5kZXggfTogYW55KTogdm9pZCB7XHJcbiAgICBpZiAocHJldkluZGV4IHx8IHByZXZJbmRleCA9PT0gMCkge1xyXG4gICAgICBjb25zdCBvbGRDb2x1bW4gPSB0aGlzLmdldENvbHVtbihwcmV2SW5kZXgpO1xyXG4gICAgICBvbGRDb2x1bW4uaXNUYXJnZXQgPSBmYWxzZTtcclxuICAgICAgb2xkQ29sdW1uLnRhcmdldE1hcmtlckNvbnRleHQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAobmV3SW5kZXggfHwgbmV3SW5kZXggPT09IDApIHtcclxuICAgICAgY29uc3QgbmV3Q29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmV3SW5kZXgpO1xyXG4gICAgICBuZXdDb2x1bW4uaXNUYXJnZXQgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKGluaXRpYWxJbmRleCAhPT0gbmV3SW5kZXgpIHtcclxuICAgICAgICBuZXdDb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dCA9IHtcclxuICAgICAgICAgIGNsYXNzOiAndGFyZ2V0TWFya2VyICcuY29uY2F0KGluaXRpYWxJbmRleCA+IG5ld0luZGV4ID8gJ2RyYWdGcm9tUmlnaHQnIDogJ2RyYWdGcm9tTGVmdCcpXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Q29sdW1uKGluZGV4OiBudW1iZXIpOiBhbnkge1xyXG4gICAgY29uc3QgbGVmdENvbHVtbkNvdW50ID0gdGhpcy5fY29sdW1uc0J5UGluWzBdLmNvbHVtbnMubGVuZ3RoO1xyXG4gICAgaWYgKGluZGV4IDwgbGVmdENvbHVtbkNvdW50KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jb2x1bW5zQnlQaW5bMF0uY29sdW1uc1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2VudGVyQ29sdW1uQ291bnQgPSB0aGlzLl9jb2x1bW5zQnlQaW5bMV0uY29sdW1ucy5sZW5ndGg7XHJcbiAgICBpZiAoaW5kZXggPCBsZWZ0Q29sdW1uQ291bnQgKyBjZW50ZXJDb2x1bW5Db3VudCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY29sdW1uc0J5UGluWzFdLmNvbHVtbnNbaW5kZXggLSBsZWZ0Q29sdW1uQ291bnRdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zQnlQaW5bMl0uY29sdW1uc1tpbmRleCAtIGxlZnRDb2x1bW5Db3VudCAtIGNlbnRlckNvbHVtbkNvdW50XTtcclxuICB9XHJcblxyXG4gIG9uU29ydCh7IGNvbHVtbiwgcHJldlZhbHVlLCBuZXdWYWx1ZSB9OiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIGlmIHdlIGFyZSBkcmFnZ2luZyBkb24ndCBzb3J0IVxyXG4gICAgaWYgKGNvbHVtbi5kcmFnZ2luZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc29ydHMgPSB0aGlzLmNhbGNOZXdTb3J0cyhjb2x1bW4sIHByZXZWYWx1ZSwgbmV3VmFsdWUpO1xyXG4gICAgdGhpcy5zb3J0LmVtaXQoe1xyXG4gICAgICBzb3J0cyxcclxuICAgICAgY29sdW1uLFxyXG4gICAgICBwcmV2VmFsdWUsXHJcbiAgICAgIG5ld1ZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNhbGNOZXdTb3J0cyhjb2x1bW46IGFueSwgcHJldlZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpOiBhbnlbXSB7XHJcbiAgICBsZXQgaWR4ID0gMDtcclxuXHJcbiAgICBpZiAoIXRoaXMuc29ydHMpIHtcclxuICAgICAgdGhpcy5zb3J0cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNvcnRzID0gdGhpcy5zb3J0cy5tYXAoKHMsIGkpID0+IHtcclxuICAgICAgcyA9IHsgLi4ucyB9O1xyXG4gICAgICBpZiAocy5wcm9wID09PSBjb2x1bW4ucHJvcCkge1xyXG4gICAgICAgIGlkeCA9IGk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHM7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzb3J0cy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIH0gZWxzZSBpZiAocHJldlZhbHVlKSB7XHJcbiAgICAgIHNvcnRzW2lkeF0uZGlyID0gbmV3VmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5zb3J0VHlwZSA9PT0gU29ydFR5cGUuc2luZ2xlKSB7XHJcbiAgICAgICAgc29ydHMuc3BsaWNlKDAsIHRoaXMuc29ydHMubGVuZ3RoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc29ydHMucHVzaCh7IGRpcjogbmV3VmFsdWUsIHByb3A6IGNvbHVtbi5wcm9wIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzb3J0cztcclxuICB9XHJcblxyXG4gIHNldFN0eWxlc0J5R3JvdXAoKSB7XHJcbiAgICB0aGlzLl9zdHlsZUJ5R3JvdXAubGVmdCA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ2xlZnQnKTtcclxuICAgIHRoaXMuX3N0eWxlQnlHcm91cC5jZW50ZXIgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdjZW50ZXInKTtcclxuICAgIHRoaXMuX3N0eWxlQnlHcm91cC5yaWdodCA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ3JpZ2h0Jyk7XHJcbiAgICBpZiAoISh0aGlzLmNkIGFzIFZpZXdSZWYpLmRlc3Ryb3llZCkge1xyXG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNhbGNTdHlsZXNCeUdyb3VwKGdyb3VwOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgY29uc3Qgd2lkdGhzID0gdGhpcy5fY29sdW1uR3JvdXBXaWR0aHM7XHJcbiAgICBjb25zdCBvZmZzZXRYID0gdGhpcy5vZmZzZXRYO1xyXG5cclxuICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgd2lkdGg6IGAke3dpZHRoc1tncm91cF19cHhgXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChncm91cCA9PT0gJ2NlbnRlcicpIHtcclxuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXRYICogLTEsIDApO1xyXG4gICAgfSBlbHNlIGlmIChncm91cCA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICBjb25zdCB0b3RhbERpZmYgPSB3aWR0aHMudG90YWwgLSB0aGlzLmlubmVyV2lkdGg7XHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IHRvdGFsRGlmZiAqIC0xO1xyXG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIG9mZnNldCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0eWxlcztcclxuICB9XHJcbn1cclxuIl19