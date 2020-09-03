/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { columnsByPin, columnGroupWidths, columnsByPinArr } from '../../utils/column';
import { SortType } from '../../types/sort.type';
import { SelectionType } from '../../types/selection.type';
import { translateXY } from '../../utils/translate';
export class DataTableHeaderComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
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
    /**
     * @param {?} val
     * @return {?}
     */
    set innerWidth(val) {
        this._innerWidth = val;
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this._columns) {
                /** @type {?} */
                const colByPin = columnsByPin(this._columns);
                this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
                this.setStylesByGroup();
            }
        }));
    }
    /**
     * @return {?}
     */
    get innerWidth() {
        return this._innerWidth;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set headerHeight(val) {
        if (val !== 'auto') {
            this._headerHeight = `${val}px`;
        }
        else {
            this._headerHeight = val;
        }
    }
    /**
     * @return {?}
     */
    get headerHeight() {
        return this._headerHeight;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set columns(val) {
        this._columns = val;
        /** @type {?} */
        const colsByPin = columnsByPin(val);
        this._columnsByPin = columnsByPinArr(val);
        setTimeout((/**
         * @return {?}
         */
        () => {
            this._columnGroupWidths = columnGroupWidths(colsByPin, val);
            this.setStylesByGroup();
        }));
    }
    /**
     * @return {?}
     */
    get columns() {
        return this._columns;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set offsetX(val) {
        this._offsetX = val;
        this.setStylesByGroup();
    }
    /**
     * @return {?}
     */
    get offsetX() {
        return this._offsetX;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onLongPressStart({ event, model }) {
        model.dragging = true;
        this.dragEventTarget = event;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onLongPressEnd({ event, model }) {
        this.dragEventTarget = event;
        // delay resetting so sort can be
        // prevented if we were dragging
        setTimeout((/**
         * @return {?}
         */
        () => {
            // datatable component creates copies from columns on reorder
            // set dragging to false on new objects
            /** @type {?} */
            const column = this._columns.find((/**
             * @param {?} c
             * @return {?}
             */
            c => c.$$id === model.$$id));
            if (column) {
                column.dragging = false;
            }
        }), 5);
    }
    /**
     * @return {?}
     */
    get headerWidth() {
        if (this.scrollbarH) {
            return this.innerWidth + 'px';
        }
        return '100%';
    }
    /**
     * @param {?} index
     * @param {?} colGroup
     * @return {?}
     */
    trackByGroups(index, colGroup) {
        return colGroup.type;
    }
    /**
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    /**
     * @param {?} width
     * @param {?} column
     * @return {?}
     */
    onColumnResized(width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.resize.emit({
            column,
            prevValue: column.width,
            newValue: width
        });
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onColumnReordered({ prevIndex, newIndex, model }) {
        /** @type {?} */
        const column = this.getColumn(newIndex);
        column.isTarget = false;
        column.targetMarkerContext = undefined;
        this.reorder.emit({
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onTargetChanged({ prevIndex, newIndex, initialIndex }) {
        if (prevIndex || prevIndex === 0) {
            /** @type {?} */
            const oldColumn = this.getColumn(prevIndex);
            oldColumn.isTarget = false;
            oldColumn.targetMarkerContext = undefined;
        }
        if (newIndex || newIndex === 0) {
            /** @type {?} */
            const newColumn = this.getColumn(newIndex);
            newColumn.isTarget = true;
            if (initialIndex !== newIndex) {
                newColumn.targetMarkerContext = {
                    class: 'targetMarker '.concat(initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft')
                };
            }
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getColumn(index) {
        /** @type {?} */
        const leftColumnCount = this._columnsByPin[0].columns.length;
        if (index < leftColumnCount) {
            return this._columnsByPin[0].columns[index];
        }
        /** @type {?} */
        const centerColumnCount = this._columnsByPin[1].columns.length;
        if (index < leftColumnCount + centerColumnCount) {
            return this._columnsByPin[1].columns[index - leftColumnCount];
        }
        return this._columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onSort({ column, prevValue, newValue }) {
        // if we are dragging don't sort!
        if (column.dragging) {
            return;
        }
        /** @type {?} */
        const sorts = this.calcNewSorts(column, prevValue, newValue);
        this.sort.emit({
            sorts,
            column,
            prevValue,
            newValue
        });
    }
    /**
     * @param {?} column
     * @param {?} prevValue
     * @param {?} newValue
     * @return {?}
     */
    calcNewSorts(column, prevValue, newValue) {
        /** @type {?} */
        let idx = 0;
        if (!this.sorts) {
            this.sorts = [];
        }
        /** @type {?} */
        const sorts = this.sorts.map((/**
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        (s, i) => {
            s = Object.assign({}, s);
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
    }
    /**
     * @return {?}
     */
    setStylesByGroup() {
        this._styleByGroup.left = this.calcStylesByGroup('left');
        this._styleByGroup.center = this.calcStylesByGroup('center');
        this._styleByGroup.right = this.calcStylesByGroup('right');
        if (!((/** @type {?} */ (this.cd))).destroyed) {
            this.cd.detectChanges();
        }
    }
    /**
     * @param {?} group
     * @return {?}
     */
    calcStylesByGroup(group) {
        /** @type {?} */
        const widths = this._columnGroupWidths;
        /** @type {?} */
        const offsetX = this.offsetX;
        /** @type {?} */
        const styles = {
            width: `${widths[group]}px`
        };
        if (group === 'center') {
            translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            /** @type {?} */
            const totalDiff = widths.total - this.innerWidth;
            /** @type {?} */
            const offset = totalDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onColumnFilter(event) {
        this.filter.emit(event);
    }
}
DataTableHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-header',
                template: `
    <div
      orderable
      (reorder)="onColumnReordered($event)"
      (targetChanged)="onTargetChanged($event)"
      [style.width.px]="_columnGroupWidths.total"
      class="datatable-header-inner"
    >
      <div
        *ngFor="let colGroup of _columnsByPin; trackBy: trackByGroups"
        [class]="'datatable-row-' + colGroup.type"
        [ngStyle]="_styleByGroup[colGroup.type]"
      >
        <datatable-header-cell
          *ngFor="let column of colGroup.columns; trackBy: columnTrackingFn"
          [ngClass]="{ 'filter-template-wrap': column.filter }"
          resizeable
          [resizeEnabled]="column.resizeable"
          (resize)="onColumnResized($event, column)"
          long-press
          [pressModel]="column"
          [pressEnabled]="reorderable && column.draggable"
          (longPressStart)="onLongPressStart($event)"
          (longPressEnd)="onLongPressEnd($event)"
          draggable
          [dragX]="reorderable && column.draggable && column.dragging"
          [dragY]="false"
          [dragModel]="column"
          [dragEventTarget]="dragEventTarget"
          [headerHeight]="headerHeight"
          [isTarget]="column.isTarget"
          [targetMarkerTemplate]="targetMarkerTemplate"
          [targetMarkerContext]="column.targetMarkerContext"
          [column]="column"
          [sortType]="sortType"
          [sorts]="sorts"
          [selectionType]="selectionType"
          [sortAscendingIcon]="sortAscendingIcon"
          [sortDescendingIcon]="sortDescendingIcon"
          [allRowsSelected]="allRowsSelected"
          (sort)="onSort($event)"
          (filter)="onColumnFilter($event)"
          (select)="select.emit($event)"
          (columnContextmenu)="columnContextmenu.emit($event)"
        >
        </datatable-header-cell>
      </div>
    </div>
  `,
                host: {
                    class: 'datatable-header'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DataTableHeaderComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixLQUFLLEVBQ0wsV0FBVyxFQUNYLGlCQUFpQixFQUNqQix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQTBEcEQsTUFBTSxPQUFPLHdCQUF3Qjs7OztJQTJGbkMsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFyQi9CLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksQ0FBcUMsS0FBSyxDQUFDLENBQUM7UUFDaEYsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR3pELHVCQUFrQixHQUFRO1lBQ3hCLEtBQUssRUFBRSxHQUFHO1NBQ1gsQ0FBQztRQUtGLGtCQUFhLEdBQTJCO1lBQ3RDLElBQUksRUFBRSxFQUFFO1lBQ1IsTUFBTSxFQUFFLEVBQUU7WUFDVixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7SUFFMEMsQ0FBQzs7Ozs7SUFsRjdDLElBQWEsVUFBVSxDQUFDLEdBQVc7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFOztzQkFDWCxRQUFRLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDOzs7OztJQVVELElBRUksWUFBWSxDQUFDLEdBQVE7UUFDdkIsSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNqQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7O0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRUQsSUFBYSxPQUFPLENBQUMsR0FBVTtRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzs7Y0FFZCxTQUFTLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELElBQ0ksT0FBTyxDQUFDLEdBQVc7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUNELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQXlCRCxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQThCO1FBQzNELEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBOEI7UUFDekQsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFFN0IsaUNBQWlDO1FBQ2pDLGdDQUFnQztRQUNoQyxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7Ozs7a0JBR1IsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxFQUFDO1lBQzdELElBQUksTUFBTSxFQUFFO2dCQUNWLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQzs7OztJQUVELElBQ0ksV0FBVztRQUNiLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQy9CO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7O0lBRUQsYUFBYSxDQUFDLEtBQWEsRUFBRSxRQUFhO1FBQ3hDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsTUFBVztRQUN6QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBRUQsZUFBZSxDQUFDLEtBQWEsRUFBRSxNQUFnQztRQUM3RCxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQzVCLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNuQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUN6QjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsTUFBTTtZQUNOLFNBQVMsRUFBRSxNQUFNLENBQUMsS0FBSztZQUN2QixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQU87O2NBQzdDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUN2QyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN4QixNQUFNLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLFNBQVM7WUFDcEIsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBTztRQUN4RCxJQUFJLFNBQVMsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFOztrQkFDMUIsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQzNDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7U0FDM0M7UUFDRCxJQUFJLFFBQVEsSUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFOztrQkFDeEIsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQzFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRTFCLElBQUksWUFBWSxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsU0FBUyxDQUFDLG1CQUFtQixHQUFHO29CQUM5QixLQUFLLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztpQkFDMUYsQ0FBQzthQUNIO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFhOztjQUNmLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1FBQzVELElBQUksS0FBSyxHQUFHLGVBQWUsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDOztjQUVLLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU07UUFDOUQsSUFBSSxLQUFLLEdBQUcsZUFBZSxHQUFHLGlCQUFpQixFQUFFO1lBQy9DLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDO1NBQy9EO1FBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsZUFBZSxHQUFHLGlCQUFpQixDQUFDLENBQUM7SUFDcEYsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBTztRQUN6QyxpQ0FBaUM7UUFDakMsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ25CLE9BQU87U0FDUjs7Y0FFSyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztRQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNiLEtBQUs7WUFDTCxNQUFNO1lBQ04sU0FBUztZQUNULFFBQVE7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQVcsRUFBRSxTQUFpQixFQUFFLFFBQWdCOztZQUN2RCxHQUFHLEdBQUcsQ0FBQztRQUVYLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDakI7O2NBRUssS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzs7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxDQUFDLHFCQUFRLENBQUMsQ0FBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQzFCLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDVDtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxFQUFDO1FBRUYsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzFCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxTQUFTLEVBQUU7WUFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7U0FDM0I7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUNyQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BDO1lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLEVBQUUsRUFBVyxDQUFDLENBQUMsU0FBUyxFQUFFO1lBQ25DLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEtBQWE7O2NBQ3ZCLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCOztjQUNoQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87O2NBRXRCLE1BQU0sR0FBRztZQUNiLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtTQUM1QjtRQUVELElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUN0QixXQUFXLENBQUMsTUFBTSxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0QzthQUFNLElBQUksS0FBSyxLQUFLLE9BQU8sRUFBRTs7a0JBQ3RCLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVOztrQkFDMUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDN0IsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEM7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7OztZQTlURixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnRFQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxrQkFBa0I7aUJBQzFCO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBbEVDLGlCQUFpQjs7O2dDQW9FaEIsS0FBSztpQ0FDTCxLQUFLO3lCQUNMLEtBQUs7NkJBQ0wsS0FBSzttQ0FDTCxLQUFLO3lCQUlMLEtBQUs7b0JBZUwsS0FBSzt1QkFDTCxLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUlMLFdBQVcsU0FBQyxjQUFjLGNBQzFCLEtBQUs7c0JBYUwsS0FBSztzQkFlTCxLQUFLO21CQVNMLE1BQU07c0JBQ04sTUFBTTtxQkFDTixNQUFNO3FCQUNOLE1BQU07Z0NBQ04sTUFBTTtxQkFDTixNQUFNOzBCQXNDTixXQUFXLFNBQUMsYUFBYTs7OztJQWhIMUIscURBQWdDOztJQUNoQyxzREFBaUM7O0lBQ2pDLDhDQUE2Qjs7SUFDN0Isa0RBQWlDOztJQUNqQyx3REFBbUM7O0lBRW5DLHVEQUF5Qjs7SUFpQnpCLHlDQUFzQjs7SUFDdEIsNENBQTRCOztJQUM1QixtREFBa0M7O0lBQ2xDLGlEQUFzQzs7SUFDdEMsK0NBQThCOztJQUU5QixtREFBcUI7O0lBd0NyQix3Q0FBdUQ7O0lBQ3ZELDJDQUEwRDs7SUFDMUQsMENBQXlEOztJQUN6RCwwQ0FBeUQ7O0lBQ3pELHFEQUEwRjs7SUFDMUYsMENBQXlEOztJQUV6RCxpREFBbUI7O0lBQ25CLHNEQUVFOztJQUNGLCtDQUFvQjs7SUFDcEIsNENBQWlCOztJQUNqQiw0Q0FBZ0I7O0lBQ2hCLGlEQUFzQjs7SUFDdEIsaURBSUU7Ozs7O0lBRVUsc0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIEhvc3RCaW5kaW5nLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcbmltcG9ydCB7IGNvbHVtbnNCeVBpbiwgY29sdW1uR3JvdXBXaWR0aHMsIGNvbHVtbnNCeVBpbkFyciB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbHVtbic7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQudHlwZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvc2VsZWN0aW9uLnR5cGUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IHRyYW5zbGF0ZVhZIH0gZnJvbSAnLi4vLi4vdXRpbHMvdHJhbnNsYXRlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgb3JkZXJhYmxlXG4gICAgICAocmVvcmRlcik9XCJvbkNvbHVtblJlb3JkZXJlZCgkZXZlbnQpXCJcbiAgICAgICh0YXJnZXRDaGFuZ2VkKT1cIm9uVGFyZ2V0Q2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgIFtzdHlsZS53aWR0aC5weF09XCJfY29sdW1uR3JvdXBXaWR0aHMudG90YWxcIlxuICAgICAgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWlubmVyXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0Zvcj1cImxldCBjb2xHcm91cCBvZiBfY29sdW1uc0J5UGluOyB0cmFja0J5OiB0cmFja0J5R3JvdXBzXCJcbiAgICAgICAgW2NsYXNzXT1cIidkYXRhdGFibGUtcm93LScgKyBjb2xHcm91cC50eXBlXCJcbiAgICAgICAgW25nU3R5bGVdPVwiX3N0eWxlQnlHcm91cFtjb2xHcm91cC50eXBlXVwiXG4gICAgICA+XG4gICAgICAgIDxkYXRhdGFibGUtaGVhZGVyLWNlbGxcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbEdyb3VwLmNvbHVtbnM7IHRyYWNrQnk6IGNvbHVtblRyYWNraW5nRm5cIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ2ZpbHRlci10ZW1wbGF0ZS13cmFwJzogY29sdW1uLmZpbHRlciB9XCJcbiAgICAgICAgICByZXNpemVhYmxlXG4gICAgICAgICAgW3Jlc2l6ZUVuYWJsZWRdPVwiY29sdW1uLnJlc2l6ZWFibGVcIlxuICAgICAgICAgIChyZXNpemUpPVwib25Db2x1bW5SZXNpemVkKCRldmVudCwgY29sdW1uKVwiXG4gICAgICAgICAgbG9uZy1wcmVzc1xuICAgICAgICAgIFtwcmVzc01vZGVsXT1cImNvbHVtblwiXG4gICAgICAgICAgW3ByZXNzRW5hYmxlZF09XCJyZW9yZGVyYWJsZSAmJiBjb2x1bW4uZHJhZ2dhYmxlXCJcbiAgICAgICAgICAobG9uZ1ByZXNzU3RhcnQpPVwib25Mb25nUHJlc3NTdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAobG9uZ1ByZXNzRW5kKT1cIm9uTG9uZ1ByZXNzRW5kKCRldmVudClcIlxuICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgIFtkcmFnWF09XCJyZW9yZGVyYWJsZSAmJiBjb2x1bW4uZHJhZ2dhYmxlICYmIGNvbHVtbi5kcmFnZ2luZ1wiXG4gICAgICAgICAgW2RyYWdZXT1cImZhbHNlXCJcbiAgICAgICAgICBbZHJhZ01vZGVsXT1cImNvbHVtblwiXG4gICAgICAgICAgW2RyYWdFdmVudFRhcmdldF09XCJkcmFnRXZlbnRUYXJnZXRcIlxuICAgICAgICAgIFtoZWFkZXJIZWlnaHRdPVwiaGVhZGVySGVpZ2h0XCJcbiAgICAgICAgICBbaXNUYXJnZXRdPVwiY29sdW1uLmlzVGFyZ2V0XCJcbiAgICAgICAgICBbdGFyZ2V0TWFya2VyVGVtcGxhdGVdPVwidGFyZ2V0TWFya2VyVGVtcGxhdGVcIlxuICAgICAgICAgIFt0YXJnZXRNYXJrZXJDb250ZXh0XT1cImNvbHVtbi50YXJnZXRNYXJrZXJDb250ZXh0XCJcbiAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgICAgW3NvcnRUeXBlXT1cInNvcnRUeXBlXCJcbiAgICAgICAgICBbc29ydHNdPVwic29ydHNcIlxuICAgICAgICAgIFtzZWxlY3Rpb25UeXBlXT1cInNlbGVjdGlvblR5cGVcIlxuICAgICAgICAgIFtzb3J0QXNjZW5kaW5nSWNvbl09XCJzb3J0QXNjZW5kaW5nSWNvblwiXG4gICAgICAgICAgW3NvcnREZXNjZW5kaW5nSWNvbl09XCJzb3J0RGVzY2VuZGluZ0ljb25cIlxuICAgICAgICAgIFthbGxSb3dzU2VsZWN0ZWRdPVwiYWxsUm93c1NlbGVjdGVkXCJcbiAgICAgICAgICAoc29ydCk9XCJvblNvcnQoJGV2ZW50KVwiXG4gICAgICAgICAgKGZpbHRlcik9XCJvbkNvbHVtbkZpbHRlcigkZXZlbnQpXCJcbiAgICAgICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIlxuICAgICAgICAgIChjb2x1bW5Db250ZXh0bWVudSk9XCJjb2x1bW5Db250ZXh0bWVudS5lbWl0KCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgIDwvZGF0YXRhYmxlLWhlYWRlci1jZWxsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2RhdGF0YWJsZS1oZWFkZXInXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNvcnRBc2NlbmRpbmdJY29uOiBhbnk7XG4gIEBJbnB1dCgpIHNvcnREZXNjZW5kaW5nSWNvbjogYW55O1xuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuO1xuICBASW5wdXQoKSBkZWFsc1dpdGhHcm91cDogYm9vbGVhbjtcbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyVGVtcGxhdGU6IGFueTtcblxuICB0YXJnZXRNYXJrZXJDb250ZXh0OiBhbnk7XG5cbiAgQElucHV0KCkgc2V0IGlubmVyV2lkdGgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gdmFsO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbHVtbnMpIHtcbiAgICAgICAgY29uc3QgY29sQnlQaW4gPSBjb2x1bW5zQnlQaW4odGhpcy5fY29sdW1ucyk7XG4gICAgICAgIHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzID0gY29sdW1uR3JvdXBXaWR0aHMoY29sQnlQaW4sIHRoaXMuX2NvbHVtbnMpO1xuICAgICAgICB0aGlzLnNldFN0eWxlc0J5R3JvdXAoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpbm5lcldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2lubmVyV2lkdGg7XG4gIH1cblxuICBASW5wdXQoKSBzb3J0czogYW55W107XG4gIEBJbnB1dCgpIHNvcnRUeXBlOiBTb3J0VHlwZTtcbiAgQElucHV0KCkgYWxsUm93c1NlbGVjdGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xuICBASW5wdXQoKSByZW9yZGVyYWJsZTogYm9vbGVhbjtcblxuICBkcmFnRXZlbnRUYXJnZXQ6IGFueTtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpXG4gIEBJbnB1dCgpXG4gIHNldCBoZWFkZXJIZWlnaHQodmFsOiBhbnkpIHtcbiAgICBpZiAodmFsICE9PSAnYXV0bycpIHtcbiAgICAgIHRoaXMuX2hlYWRlckhlaWdodCA9IGAke3ZhbH1weGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hlYWRlckhlaWdodCA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBnZXQgaGVhZGVySGVpZ2h0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlckhlaWdodDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBjb2x1bW5zKHZhbDogYW55W10pIHtcbiAgICB0aGlzLl9jb2x1bW5zID0gdmFsO1xuXG4gICAgY29uc3QgY29sc0J5UGluID0gY29sdW1uc0J5UGluKHZhbCk7XG4gICAgdGhpcy5fY29sdW1uc0J5UGluID0gY29sdW1uc0J5UGluQXJyKHZhbCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9jb2x1bW5Hcm91cFdpZHRocyA9IGNvbHVtbkdyb3VwV2lkdGhzKGNvbHNCeVBpbiwgdmFsKTtcbiAgICAgIHRoaXMuc2V0U3R5bGVzQnlHcm91cCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGNvbHVtbnMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG9mZnNldFgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9vZmZzZXRYID0gdmFsO1xuICAgIHRoaXMuc2V0U3R5bGVzQnlHcm91cCgpO1xuICB9XG4gIGdldCBvZmZzZXRYKCkge1xuICAgIHJldHVybiB0aGlzLl9vZmZzZXRYO1xuICB9XG5cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbHVtbkNvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyBjb2x1bW46IGFueSB9PihmYWxzZSk7XG4gIEBPdXRwdXQoKSBmaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9jb2x1bW5zQnlQaW46IGFueTtcbiAgX2NvbHVtbkdyb3VwV2lkdGhzOiBhbnkgPSB7XG4gICAgdG90YWw6IDEwMFxuICB9O1xuICBfaW5uZXJXaWR0aDogbnVtYmVyO1xuICBfb2Zmc2V0WDogbnVtYmVyO1xuICBfY29sdW1uczogYW55W107XG4gIF9oZWFkZXJIZWlnaHQ6IHN0cmluZztcbiAgX3N0eWxlQnlHcm91cDogeyBbcHJvcDogc3RyaW5nXToge30gfSA9IHtcbiAgICBsZWZ0OiB7fSxcbiAgICBjZW50ZXI6IHt9LFxuICAgIHJpZ2h0OiB7fVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG9uTG9uZ1ByZXNzU3RhcnQoeyBldmVudCwgbW9kZWwgfTogeyBldmVudDogYW55OyBtb2RlbDogYW55IH0pIHtcbiAgICBtb2RlbC5kcmFnZ2luZyA9IHRydWU7XG4gICAgdGhpcy5kcmFnRXZlbnRUYXJnZXQgPSBldmVudDtcbiAgfVxuXG4gIG9uTG9uZ1ByZXNzRW5kKHsgZXZlbnQsIG1vZGVsIH06IHsgZXZlbnQ6IGFueTsgbW9kZWw6IGFueSB9KSB7XG4gICAgdGhpcy5kcmFnRXZlbnRUYXJnZXQgPSBldmVudDtcblxuICAgIC8vIGRlbGF5IHJlc2V0dGluZyBzbyBzb3J0IGNhbiBiZVxuICAgIC8vIHByZXZlbnRlZCBpZiB3ZSB3ZXJlIGRyYWdnaW5nXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBkYXRhdGFibGUgY29tcG9uZW50IGNyZWF0ZXMgY29waWVzIGZyb20gY29sdW1ucyBvbiByZW9yZGVyXG4gICAgICAvLyBzZXQgZHJhZ2dpbmcgdG8gZmFsc2Ugb24gbmV3IG9iamVjdHNcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuX2NvbHVtbnMuZmluZChjID0+IGMuJCRpZCA9PT0gbW9kZWwuJCRpZCk7XG4gICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgIGNvbHVtbi5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sIDUpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpXG4gIGdldCBoZWFkZXJXaWR0aCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnNjcm9sbGJhckgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyV2lkdGggKyAncHgnO1xuICAgIH1cblxuICAgIHJldHVybiAnMTAwJSc7XG4gIH1cblxuICB0cmFja0J5R3JvdXBzKGluZGV4OiBudW1iZXIsIGNvbEdyb3VwOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBjb2xHcm91cC50eXBlO1xuICB9XG5cbiAgY29sdW1uVHJhY2tpbmdGbihpbmRleDogbnVtYmVyLCBjb2x1bW46IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGNvbHVtbi4kJGlkO1xuICB9XG5cbiAgb25Db2x1bW5SZXNpemVkKHdpZHRoOiBudW1iZXIsIGNvbHVtbjogRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgaWYgKHdpZHRoIDw9IGNvbHVtbi5taW5XaWR0aCkge1xuICAgICAgd2lkdGggPSBjb2x1bW4ubWluV2lkdGg7XG4gICAgfSBlbHNlIGlmICh3aWR0aCA+PSBjb2x1bW4ubWF4V2lkdGgpIHtcbiAgICAgIHdpZHRoID0gY29sdW1uLm1heFdpZHRoO1xuICAgIH1cblxuICAgIHRoaXMucmVzaXplLmVtaXQoe1xuICAgICAgY29sdW1uLFxuICAgICAgcHJldlZhbHVlOiBjb2x1bW4ud2lkdGgsXG4gICAgICBuZXdWYWx1ZTogd2lkdGhcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ29sdW1uUmVvcmRlcmVkKHsgcHJldkluZGV4LCBuZXdJbmRleCwgbW9kZWwgfTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmV3SW5kZXgpO1xuICAgIGNvbHVtbi5pc1RhcmdldCA9IGZhbHNlO1xuICAgIGNvbHVtbi50YXJnZXRNYXJrZXJDb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucmVvcmRlci5lbWl0KHtcbiAgICAgIGNvbHVtbjogbW9kZWwsXG4gICAgICBwcmV2VmFsdWU6IHByZXZJbmRleCxcbiAgICAgIG5ld1ZhbHVlOiBuZXdJbmRleFxuICAgIH0pO1xuICB9XG5cbiAgb25UYXJnZXRDaGFuZ2VkKHsgcHJldkluZGV4LCBuZXdJbmRleCwgaW5pdGlhbEluZGV4IH06IGFueSk6IHZvaWQge1xuICAgIGlmIChwcmV2SW5kZXggfHwgcHJldkluZGV4ID09PSAwKSB7XG4gICAgICBjb25zdCBvbGRDb2x1bW4gPSB0aGlzLmdldENvbHVtbihwcmV2SW5kZXgpO1xuICAgICAgb2xkQ29sdW1uLmlzVGFyZ2V0ID0gZmFsc2U7XG4gICAgICBvbGRDb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKG5ld0luZGV4IHx8IG5ld0luZGV4ID09PSAwKSB7XG4gICAgICBjb25zdCBuZXdDb2x1bW4gPSB0aGlzLmdldENvbHVtbihuZXdJbmRleCk7XG4gICAgICBuZXdDb2x1bW4uaXNUYXJnZXQgPSB0cnVlO1xuXG4gICAgICBpZiAoaW5pdGlhbEluZGV4ICE9PSBuZXdJbmRleCkge1xuICAgICAgICBuZXdDb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dCA9IHtcbiAgICAgICAgICBjbGFzczogJ3RhcmdldE1hcmtlciAnLmNvbmNhdChpbml0aWFsSW5kZXggPiBuZXdJbmRleCA/ICdkcmFnRnJvbVJpZ2h0JyA6ICdkcmFnRnJvbUxlZnQnKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENvbHVtbihpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICBjb25zdCBsZWZ0Q29sdW1uQ291bnQgPSB0aGlzLl9jb2x1bW5zQnlQaW5bMF0uY29sdW1ucy5sZW5ndGg7XG4gICAgaWYgKGluZGV4IDwgbGVmdENvbHVtbkNvdW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29sdW1uc0J5UGluWzBdLmNvbHVtbnNbaW5kZXhdO1xuICAgIH1cblxuICAgIGNvbnN0IGNlbnRlckNvbHVtbkNvdW50ID0gdGhpcy5fY29sdW1uc0J5UGluWzFdLmNvbHVtbnMubGVuZ3RoO1xuICAgIGlmIChpbmRleCA8IGxlZnRDb2x1bW5Db3VudCArIGNlbnRlckNvbHVtbkNvdW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29sdW1uc0J5UGluWzFdLmNvbHVtbnNbaW5kZXggLSBsZWZ0Q29sdW1uQ291bnRdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zQnlQaW5bMl0uY29sdW1uc1tpbmRleCAtIGxlZnRDb2x1bW5Db3VudCAtIGNlbnRlckNvbHVtbkNvdW50XTtcbiAgfVxuXG4gIG9uU29ydCh7IGNvbHVtbiwgcHJldlZhbHVlLCBuZXdWYWx1ZSB9OiBhbnkpOiB2b2lkIHtcbiAgICAvLyBpZiB3ZSBhcmUgZHJhZ2dpbmcgZG9uJ3Qgc29ydCFcbiAgICBpZiAoY29sdW1uLmRyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc29ydHMgPSB0aGlzLmNhbGNOZXdTb3J0cyhjb2x1bW4sIHByZXZWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIHRoaXMuc29ydC5lbWl0KHtcbiAgICAgIHNvcnRzLFxuICAgICAgY29sdW1uLFxuICAgICAgcHJldlZhbHVlLFxuICAgICAgbmV3VmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGNOZXdTb3J0cyhjb2x1bW46IGFueSwgcHJldlZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpOiBhbnlbXSB7XG4gICAgbGV0IGlkeCA9IDA7XG5cbiAgICBpZiAoIXRoaXMuc29ydHMpIHtcbiAgICAgIHRoaXMuc29ydHMgPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3J0cyA9IHRoaXMuc29ydHMubWFwKChzLCBpKSA9PiB7XG4gICAgICBzID0geyAuLi5zIH07XG4gICAgICBpZiAocy5wcm9wID09PSBjb2x1bW4ucHJvcCkge1xuICAgICAgICBpZHggPSBpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHM7XG4gICAgfSk7XG5cbiAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgc29ydHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfSBlbHNlIGlmIChwcmV2VmFsdWUpIHtcbiAgICAgIHNvcnRzW2lkeF0uZGlyID0gbmV3VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnNvcnRUeXBlID09PSBTb3J0VHlwZS5zaW5nbGUpIHtcbiAgICAgICAgc29ydHMuc3BsaWNlKDAsIHRoaXMuc29ydHMubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgc29ydHMucHVzaCh7IGRpcjogbmV3VmFsdWUsIHByb3A6IGNvbHVtbi5wcm9wIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzb3J0cztcbiAgfVxuXG4gIHNldFN0eWxlc0J5R3JvdXAoKSB7XG4gICAgdGhpcy5fc3R5bGVCeUdyb3VwLmxlZnQgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdsZWZ0Jyk7XG4gICAgdGhpcy5fc3R5bGVCeUdyb3VwLmNlbnRlciA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ2NlbnRlcicpO1xuICAgIHRoaXMuX3N0eWxlQnlHcm91cC5yaWdodCA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ3JpZ2h0Jyk7XG4gICAgaWYgKCEodGhpcy5jZCBhcyBWaWV3UmVmKS5kZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGNhbGNTdHlsZXNCeUdyb3VwKGdyb3VwOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHdpZHRocyA9IHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzO1xuICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLm9mZnNldFg7XG5cbiAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICB3aWR0aDogYCR7d2lkdGhzW2dyb3VwXX1weGBcbiAgICB9O1xuXG4gICAgaWYgKGdyb3VwID09PSAnY2VudGVyJykge1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXRYICogLTEsIDApO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAgPT09ICdyaWdodCcpIHtcbiAgICAgIGNvbnN0IHRvdGFsRGlmZiA9IHdpZHRocy50b3RhbCAtIHRoaXMuaW5uZXJXaWR0aDtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHRvdGFsRGlmZiAqIC0xO1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXQsIDApO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cblxuICBvbkNvbHVtbkZpbHRlcihldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXIuZW1pdChldmVudCk7XG4gIH1cbn1cbiJdfQ==