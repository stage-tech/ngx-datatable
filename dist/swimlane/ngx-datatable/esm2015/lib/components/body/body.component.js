/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input, HostBinding, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ScrollerComponent } from './scroller.component';
import { SelectionType } from '../../types/selection.type';
import { columnsByPin, columnGroupWidths } from '../../utils/column';
import { RowHeightCache } from '../../utils/row-height-cache';
import { translateXY } from '../../utils/translate';
export class DataTableBodyComponent {
    /**
     * Creates an instance of DataTableBodyComponent.
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
        this.selected = [];
        this.scroll = new EventEmitter();
        this.page = new EventEmitter();
        this.activate = new EventEmitter();
        this.select = new EventEmitter();
        this.detailToggle = new EventEmitter();
        this.rowContextmenu = new EventEmitter(false);
        this.treeAction = new EventEmitter();
        this.rowHeightsCache = new RowHeightCache();
        this.temp = [];
        this.offsetY = 0;
        this.indexes = {};
        this.rowIndexes = new Map();
        this.rowExpansions = [];
        /**
         * Get the height of the detail row.
         */
        this.getDetailRowHeight = (/**
         * @param {?=} row
         * @param {?=} index
         * @return {?}
         */
        (row, index) => {
            if (!this.rowDetail) {
                return 0;
            }
            /** @type {?} */
            const rowHeight = this.rowDetail.rowHeight;
            return typeof rowHeight === 'function' ? rowHeight(row, index) : ((/** @type {?} */ (rowHeight)));
        });
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = (/**
         * @param {?} index
         * @param {?} row
         * @return {?}
         */
        (index, row) => {
            /** @type {?} */
            const idx = this.getRowIndex(row);
            if (this.trackByProp) {
                return row[this.trackByProp];
            }
            else {
                return idx;
            }
        });
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set pageSize(val) {
        this._pageSize = val;
        this.recalcLayout();
    }
    /**
     * @return {?}
     */
    get pageSize() {
        return this._pageSize;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set rows(val) {
        this._rows = val;
        this.recalcLayout();
    }
    /**
     * @return {?}
     */
    get rows() {
        return this._rows;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set columns(val) {
        this._columns = val;
        /** @type {?} */
        const colsByPin = columnsByPin(val);
        this.columnGroupWidths = columnGroupWidths(colsByPin, val);
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
    set offset(val) {
        this._offset = val;
        this.recalcLayout();
    }
    /**
     * @return {?}
     */
    get offset() {
        return this._offset;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set rowCount(val) {
        this._rowCount = val;
        this.recalcLayout();
    }
    /**
     * @return {?}
     */
    get rowCount() {
        return this._rowCount;
    }
    /**
     * @return {?}
     */
    get bodyWidth() {
        if (this.scrollbarH) {
            return this.innerWidth + 'px';
        }
        else {
            return '100%';
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set bodyHeight(val) {
        if (this.scrollbarV) {
            this._bodyHeight = val + 'px';
        }
        else {
            this._bodyHeight = 'auto';
        }
        this.recalcLayout();
    }
    /**
     * @return {?}
     */
    get bodyHeight() {
        return this._bodyHeight;
    }
    /**
     * Returns if selection is enabled.
     * @return {?}
     */
    get selectEnabled() {
        return !!this.selectionType;
    }
    /**
     * Property that would calculate the height of scroll bar
     * based on the row heights cache for virtual scroll and virtualization. Other scenarios
     * calculate scroll height automatically (as height will be undefined).
     * @return {?}
     */
    get scrollHeight() {
        if (this.scrollbarV && this.virtualization && this.rowCount) {
            return this.rowHeightsCache.query(this.rowCount - 1);
        }
        // avoid TS7030: Not all code paths return a value.
        return undefined;
    }
    /**
     * Called after the constructor, initializing input properties
     * @return {?}
     */
    ngOnInit() {
        if (this.rowDetail) {
            this.listener = this.rowDetail.toggle.subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            ({ type, value }) => {
                if (type === 'row') {
                    this.toggleRowExpansion(value);
                }
                if (type === 'all') {
                    this.toggleAllRows(value);
                }
                // Refresh rows after toggle
                // Fixes #883
                this.updateIndexes();
                this.updateRows();
                this.cd.markForCheck();
            }));
        }
        if (this.groupHeader) {
            this.listener = this.groupHeader.toggle.subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            ({ type, value }) => {
                if (type === 'group') {
                    this.toggleRowExpansion(value);
                }
                if (type === 'all') {
                    this.toggleAllRows(value);
                }
                // Refresh rows after toggle
                // Fixes #883
                this.updateIndexes();
                this.updateRows();
                this.cd.markForCheck();
            }));
        }
    }
    /**
     * Called once, before the instance is destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        if (this.rowDetail || this.groupHeader) {
            this.listener.unsubscribe();
        }
    }
    /**
     * Updates the Y offset given a new offset.
     * @param {?=} offset
     * @return {?}
     */
    updateOffsetY(offset) {
        // scroller is missing on empty table
        if (!this.scroller) {
            return;
        }
        if (this.scrollbarV && this.virtualization && offset) {
            // First get the row Index that we need to move to.
            /** @type {?} */
            const rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        else if (this.scrollbarV && !this.virtualization) {
            offset = 0;
        }
        this.scroller.setOffset(offset || 0);
    }
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     * @param {?} event
     * @return {?}
     */
    onBodyScroll(event) {
        /** @type {?} */
        const scrollYPos = event.scrollYPos;
        /** @type {?} */
        const scrollXPos = event.scrollXPos;
        // if scroll change, trigger update
        // this is mainly used for header cell positions
        if (this.offsetY !== scrollYPos || this.offsetX !== scrollXPos) {
            this.scroll.emit({
                offsetY: scrollYPos,
                offsetX: scrollXPos
            });
        }
        this.offsetY = scrollYPos;
        this.offsetX = scrollXPos;
        this.updateIndexes();
        this.updatePage(event.direction);
        this.updateRows();
    }
    /**
     * Updates the page given a direction.
     * @param {?} direction
     * @return {?}
     */
    updatePage(direction) {
        /** @type {?} */
        let offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.ceil(offset);
        }
        else if (direction === 'down') {
            offset = Math.floor(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset });
        }
    }
    /**
     * Updates the rows in the view port
     * @return {?}
     */
    updateRows() {
        const { first, last } = this.indexes;
        /** @type {?} */
        let rowIndex = first;
        /** @type {?} */
        let idx = 0;
        /** @type {?} */
        const temp = [];
        this.rowIndexes.clear();
        // if grouprowsby has been specified treat row paging
        // parameters as group paging parameters ie if limit 10 has been
        // specified treat it as 10 groups rather than 10 rows
        if (this.groupedRows) {
            /** @type {?} */
            let maxRowsPerGroup = 3;
            // if there is only one group set the maximum number of
            // rows per group the same as the total number of rows
            if (this.groupedRows.length === 1) {
                maxRowsPerGroup = this.groupedRows[0].value.length;
            }
            while (rowIndex < last && rowIndex < this.groupedRows.length) {
                // Add the groups into this page
                /** @type {?} */
                const group = this.groupedRows[rowIndex];
                temp[idx] = group;
                idx++;
                // Group index in this context
                rowIndex++;
            }
        }
        else {
            while (rowIndex < last && rowIndex < this.rowCount) {
                /** @type {?} */
                const row = this.rows[rowIndex];
                if (row) {
                    this.rowIndexes.set(row, rowIndex);
                    temp[idx] = row;
                }
                idx++;
                rowIndex++;
            }
        }
        this.temp = temp;
    }
    /**
     * Get the row height
     * @param {?} row
     * @return {?}
     */
    getRowHeight(row) {
        // if its a function return it
        if (typeof this.rowHeight === 'function') {
            return this.rowHeight(row);
        }
        return (/** @type {?} */ (this.rowHeight));
    }
    /**
     * @param {?} group the group with all rows
     * @return {?}
     */
    getGroupHeight(group) {
        /** @type {?} */
        let rowHeight = 0;
        if (group.value) {
            for (let index = 0; index < group.value.length; index++) {
                rowHeight += this.getRowAndDetailHeight(group.value[index]);
            }
        }
        return rowHeight;
    }
    /**
     * Calculate row height based on the expanded state of the row.
     * @param {?} row
     * @return {?}
     */
    getRowAndDetailHeight(row) {
        /** @type {?} */
        let rowHeight = this.getRowHeight(row);
        /** @type {?} */
        const expanded = this.getRowExpanded(row);
        // Adding detail row height if its expanded.
        if (expanded) {
            rowHeight += this.getDetailRowHeight(row);
        }
        return rowHeight;
    }
    /**
     * Calculates the styles for the row so that the rows can be moved in 2D space
     * during virtual scroll inside the DOM.   In the below case the Y position is
     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
     * 100 px then following styles are generated:
     *
     * transform: translate3d(0px, 0px, 0px);    ->  row0
     * transform: translate3d(0px, 30px, 0px);   ->  row1
     * transform: translate3d(0px, 130px, 0px);  ->  row2
     *
     * Row heights have to be calculated based on the row heights cache as we wont
     * be able to determine which row is of what height before hand.  In the above
     * case the positionY of the translate3d for row2 would be the sum of all the
     * heights of the rows before it (i.e. row0 and row1).
     *
     * \@memberOf DataTableBodyComponent
     * @param {?} rows the row that needs to be placed in the 2D space.
     * @return {?} the CSS3 style to be applied
     *
     */
    getRowsStyles(rows) {
        /** @type {?} */
        const styles = {};
        // only add styles for the group if there is a group
        if (this.groupedRows) {
            styles.width = this.columnGroupWidths.total;
        }
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            let idx = 0;
            if (this.groupedRows) {
                // Get the latest row rowindex in a group
                /** @type {?} */
                const row = rows[rows.length - 1];
                idx = row ? this.getRowIndex(row) : 0;
            }
            else {
                idx = this.getRowIndex(rows);
            }
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            /** @type {?} */
            const pos = this.rowHeightsCache.query(idx - 1);
            translateXY(styles, 0, pos);
        }
        return styles;
    }
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * \@memberOf DataTableBodyComponent
     * @return {?} the CSS3 style to be applied
     *
     */
    getBottomSummaryRowStyles() {
        if (!this.scrollbarV || !this.rows || !this.rows.length) {
            return null;
        }
        /** @type {?} */
        const styles = { position: 'absolute' };
        /** @type {?} */
        const pos = this.rowHeightsCache.query(this.rows.length - 1);
        translateXY(styles, 0, pos);
        return styles;
    }
    /**
     * Hides the loading indicator
     * @return {?}
     */
    hideIndicator() {
        setTimeout((/**
         * @return {?}
         */
        () => (this.loadingIndicator = false)), 500);
    }
    /**
     * Updates the index of the rows in the viewport
     * @return {?}
     */
    updateIndexes() {
        /** @type {?} */
        let first = 0;
        /** @type {?} */
        let last = 0;
        if (this.scrollbarV) {
            if (this.virtualization) {
                // Calculation of the first and last indexes will be based on where the
                // scrollY position would be at.  The last index would be the one
                // that shows up inside the view port the last.
                /** @type {?} */
                const height = parseInt(this.bodyHeight, 0);
                first = this.rowHeightsCache.getRowIndex(this.offsetY);
                last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
            }
            else {
                // If virtual rows are not needed
                // We render all in one go
                first = 0;
                last = this.rowCount;
            }
        }
        else {
            // The server is handling paging and will pass an array that begins with the
            // element at a specified offset.  first should always be 0 with external paging.
            if (!this.externalPaging) {
                first = Math.max(this.offset * this.pageSize, 0);
            }
            last = Math.min(first + this.pageSize, this.rowCount);
        }
        this.indexes = { first, last };
    }
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     * @return {?}
     */
    refreshRowHeightCache() {
        if (!this.scrollbarV || (this.scrollbarV && !this.virtualization)) {
            return;
        }
        // clear the previous row height cache if already present.
        // this is useful during sorts, filters where the state of the
        // rows array is changed.
        this.rowHeightsCache.clearCache();
        // Initialize the tree only if there are rows inside the tree.
        if (this.rows && this.rows.length) {
            /** @type {?} */
            const rowExpansions = new Set();
            for (const row of this.rows) {
                if (this.getRowExpanded(row)) {
                    rowExpansions.add(row);
                }
            }
            this.rowHeightsCache.initCache({
                rows: this.rows,
                rowHeight: this.rowHeight,
                detailRowHeight: this.getDetailRowHeight,
                externalVirtual: this.scrollbarV && this.externalPaging,
                rowCount: this.rowCount,
                rowIndexes: this.rowIndexes,
                rowExpansions
            });
        }
    }
    /**
     * Gets the index for the view port
     * @return {?}
     */
    getAdjustedViewPortIndex() {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        /** @type {?} */
        const viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            const offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
            return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
        }
        return viewPortFirstRowIndex;
    }
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     * @param {?} row
     * @return {?}
     */
    toggleRowExpansion(row) {
        // Capture the row index of the first row that is visible on the viewport.
        /** @type {?} */
        const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        /** @type {?} */
        const rowExpandedIdx = this.getRowExpandedIdx(row, this.rowExpansions);
        /** @type {?} */
        const expanded = rowExpandedIdx > -1;
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            const detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
            // const idx = this.rowIndexes.get(row) || 0;
            /** @type {?} */
            const idx = this.getRowIndex(row);
            this.rowHeightsCache.update(idx, detailRowHeight);
        }
        // Update the toggled row and update thive nevere heights in the cache.
        if (expanded) {
            this.rowExpansions.splice(rowExpandedIdx, 1);
        }
        else {
            this.rowExpansions.push(row);
        }
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    }
    /**
     * Expand/Collapse all the rows no matter what their state is.
     * @param {?} expanded
     * @return {?}
     */
    toggleAllRows(expanded) {
        // clear prev expansions
        this.rowExpansions = [];
        // Capture the row index of the first row that is visible on the viewport.
        /** @type {?} */
        const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        if (expanded) {
            for (const row of this.rows) {
                this.rowExpansions.push(row);
            }
        }
        if (this.scrollbarV) {
            // Refresh the full row heights cache since every row was affected.
            this.recalcLayout();
        }
        // Emit all rows that have been expanded.
        this.detailToggle.emit({
            rows: this.rows,
            currentIndex: viewPortFirstRowIndex
        });
    }
    /**
     * Recalculates the table
     * @return {?}
     */
    recalcLayout() {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    }
    /**
     * Tracks the column
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    /**
     * Gets the row pinning group styles
     * @param {?} group
     * @return {?}
     */
    stylesByGroup(group) {
        /** @type {?} */
        const widths = this.columnGroupWidths;
        /** @type {?} */
        const offsetX = this.offsetX;
        /** @type {?} */
        const styles = {
            width: `${widths[group]}px`
        };
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            /** @type {?} */
            const bodyWidth = parseInt(this.innerWidth + '', 0);
            /** @type {?} */
            const totalDiff = widths.total - bodyWidth;
            /** @type {?} */
            const offsetDiff = totalDiff - offsetX;
            /** @type {?} */
            const offset = offsetDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     * @param {?} row
     * @return {?}
     */
    getRowExpanded(row) {
        if (this.rowExpansions.length === 0 && this.groupExpansionDefault) {
            for (const group of this.groupedRows) {
                this.rowExpansions.push(group);
            }
        }
        return this.getRowExpandedIdx(row, this.rowExpansions) > -1;
    }
    /**
     * @param {?} row
     * @param {?} expanded
     * @return {?}
     */
    getRowExpandedIdx(row, expanded) {
        if (!expanded || !expanded.length)
            return -1;
        /** @type {?} */
        const rowId = this.rowIdentity(row);
        return expanded.findIndex((/**
         * @param {?} r
         * @return {?}
         */
        r => {
            /** @type {?} */
            const id = this.rowIdentity(r);
            return id === rowId;
        }));
    }
    /**
     * Gets the row index given a row
     * @param {?} row
     * @return {?}
     */
    getRowIndex(row) {
        return this.rowIndexes.get(row) || 0;
    }
    /**
     * @param {?} row
     * @return {?}
     */
    onTreeAction(row) {
        this.treeAction.emit({ row });
    }
}
DataTableBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-body',
                template: `
    <datatable-selection
      #selector
      [selected]="selected"
      [rows]="rows"
      [selectCheck]="selectCheck"
      [selectEnabled]="selectEnabled"
      [selectionType]="selectionType"
      [rowIdentity]="rowIdentity"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)"
    >
      <datatable-progress *ngIf="loadingIndicator"> </datatable-progress>
      <datatable-scroller
        *ngIf="rows?.length"
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH"
        [scrollHeight]="scrollHeight"
        [scrollWidth]="columnGroupWidths?.total"
        (scroll)="onBodyScroll($event)"
      >
        <datatable-summary-row
          *ngIf="summaryRow && summaryPosition === 'top'"
          [rowHeight]="summaryHeight"
          [offsetX]="offsetX"
          [innerWidth]="innerWidth"
          [rows]="rows"
          [columns]="columns"
        >
        </datatable-summary-row>
        <datatable-row-wrapper
          [groupedRows]="groupedRows"
          *ngFor="let group of temp; let i = index; trackBy: rowTrackingFn"
          [innerWidth]="innerWidth"
          [ngStyle]="getRowsStyles(group)"
          [rowDetail]="rowDetail"
          [groupHeader]="groupHeader"
          [offsetX]="offsetX"
          [detailRowHeight]="getDetailRowHeight(group[i], i)"
          [row]="group"
          [expanded]="getRowExpanded(group)"
          [rowIndex]="getRowIndex(group[i])"
          (rowContextmenu)="rowContextmenu.emit($event)"
        >
          <datatable-body-row
            *ngIf="!groupedRows; else groupedRowsTemplate"
            tabindex="-1"
            [isSelected]="selector.getRowSelected(group)"
            [innerWidth]="innerWidth"
            [offsetX]="offsetX"
            [columns]="columns"
            [rowDetail]="rowDetail"
            [rowHeight]="getRowHeight(group)"
            [row]="group"
            [rowIndex]="getRowIndex(group)"
            [expanded]="getRowExpanded(group)"
            [rowClass]="rowClass"
            [displayCheck]="displayCheck"
            [treeStatus]="group.treeStatus"
            (treeAction)="onTreeAction(group)"
            (activate)="selector.onActivate($event, indexes.first + i)"
          >
          </datatable-body-row>
          <ng-template #groupedRowsTemplate>
            <datatable-body-row
              *ngFor="let row of group.value; let i = index; trackBy: rowTrackingFn"
              tabindex="-1"
              [isSelected]="selector.getRowSelected(row)"
              [innerWidth]="innerWidth"
              [offsetX]="offsetX"
              [columns]="columns"
              [rowHeight]="getRowHeight(row)"
              [row]="row"
              [group]="group.value"
              [rowIndex]="getRowIndex(row)"
              [expanded]="getRowExpanded(row)"
              [rowClass]="rowClass"
              (activate)="selector.onActivate($event, i)"
            >
            </datatable-body-row>
          </ng-template>
        </datatable-row-wrapper>
        <datatable-summary-row
          *ngIf="summaryRow && summaryPosition === 'bottom'"
          [ngStyle]="getBottomSummaryRowStyles()"
          [rowHeight]="summaryHeight"
          [offsetX]="offsetX"
          [innerWidth]="innerWidth"
          [rows]="rows"
          [columns]="columns"
        >
        </datatable-summary-row>
      </datatable-scroller>
      <div class="empty-row" *ngIf="!rows?.length && !loadingIndicator" [innerHTML]="emptyMessage"></div>
    </datatable-selection>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'datatable-body'
                }
            }] }
];
/** @nocollapse */
DataTableBodyComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
DataTableBodyComponent.propDecorators = {
    scrollbarV: [{ type: Input }],
    scrollbarH: [{ type: Input }],
    loadingIndicator: [{ type: Input }],
    externalPaging: [{ type: Input }],
    rowHeight: [{ type: Input }],
    offsetX: [{ type: Input }],
    emptyMessage: [{ type: Input }],
    selectionType: [{ type: Input }],
    selected: [{ type: Input }],
    rowIdentity: [{ type: Input }],
    rowDetail: [{ type: Input }],
    groupHeader: [{ type: Input }],
    selectCheck: [{ type: Input }],
    displayCheck: [{ type: Input }],
    trackByProp: [{ type: Input }],
    rowClass: [{ type: Input }],
    groupedRows: [{ type: Input }],
    groupExpansionDefault: [{ type: Input }],
    innerWidth: [{ type: Input }],
    groupRowsBy: [{ type: Input }],
    virtualization: [{ type: Input }],
    summaryRow: [{ type: Input }],
    summaryPosition: [{ type: Input }],
    summaryHeight: [{ type: Input }],
    pageSize: [{ type: Input }],
    rows: [{ type: Input }],
    columns: [{ type: Input }],
    offset: [{ type: Input }],
    rowCount: [{ type: Input }],
    bodyWidth: [{ type: HostBinding, args: ['style.width',] }],
    bodyHeight: [{ type: Input }, { type: HostBinding, args: ['style.height',] }],
    scroll: [{ type: Output }],
    page: [{ type: Output }],
    activate: [{ type: Output }],
    select: [{ type: Output }],
    detailToggle: [{ type: Output }],
    rowContextmenu: [{ type: Output }],
    treeAction: [{ type: Output }],
    scroller: [{ type: ViewChild, args: [ScrollerComponent, { static: false },] }]
};
if (false) {
    /** @type {?} */
    DataTableBodyComponent.prototype.scrollbarV;
    /** @type {?} */
    DataTableBodyComponent.prototype.scrollbarH;
    /** @type {?} */
    DataTableBodyComponent.prototype.loadingIndicator;
    /** @type {?} */
    DataTableBodyComponent.prototype.externalPaging;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowHeight;
    /** @type {?} */
    DataTableBodyComponent.prototype.offsetX;
    /** @type {?} */
    DataTableBodyComponent.prototype.emptyMessage;
    /** @type {?} */
    DataTableBodyComponent.prototype.selectionType;
    /** @type {?} */
    DataTableBodyComponent.prototype.selected;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowIdentity;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowDetail;
    /** @type {?} */
    DataTableBodyComponent.prototype.groupHeader;
    /** @type {?} */
    DataTableBodyComponent.prototype.selectCheck;
    /** @type {?} */
    DataTableBodyComponent.prototype.displayCheck;
    /** @type {?} */
    DataTableBodyComponent.prototype.trackByProp;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowClass;
    /** @type {?} */
    DataTableBodyComponent.prototype.groupedRows;
    /** @type {?} */
    DataTableBodyComponent.prototype.groupExpansionDefault;
    /** @type {?} */
    DataTableBodyComponent.prototype.innerWidth;
    /** @type {?} */
    DataTableBodyComponent.prototype.groupRowsBy;
    /** @type {?} */
    DataTableBodyComponent.prototype.virtualization;
    /** @type {?} */
    DataTableBodyComponent.prototype.summaryRow;
    /** @type {?} */
    DataTableBodyComponent.prototype.summaryPosition;
    /** @type {?} */
    DataTableBodyComponent.prototype.summaryHeight;
    /** @type {?} */
    DataTableBodyComponent.prototype.scroll;
    /** @type {?} */
    DataTableBodyComponent.prototype.page;
    /** @type {?} */
    DataTableBodyComponent.prototype.activate;
    /** @type {?} */
    DataTableBodyComponent.prototype.select;
    /** @type {?} */
    DataTableBodyComponent.prototype.detailToggle;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowContextmenu;
    /** @type {?} */
    DataTableBodyComponent.prototype.treeAction;
    /** @type {?} */
    DataTableBodyComponent.prototype.scroller;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowHeightsCache;
    /** @type {?} */
    DataTableBodyComponent.prototype.temp;
    /** @type {?} */
    DataTableBodyComponent.prototype.offsetY;
    /** @type {?} */
    DataTableBodyComponent.prototype.indexes;
    /** @type {?} */
    DataTableBodyComponent.prototype.columnGroupWidths;
    /** @type {?} */
    DataTableBodyComponent.prototype.columnGroupWidthsWithoutGroup;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowTrackingFn;
    /** @type {?} */
    DataTableBodyComponent.prototype.listener;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowIndexes;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowExpansions;
    /** @type {?} */
    DataTableBodyComponent.prototype._rows;
    /** @type {?} */
    DataTableBodyComponent.prototype._bodyHeight;
    /** @type {?} */
    DataTableBodyComponent.prototype._columns;
    /** @type {?} */
    DataTableBodyComponent.prototype._rowCount;
    /** @type {?} */
    DataTableBodyComponent.prototype._offset;
    /** @type {?} */
    DataTableBodyComponent.prototype._pageSize;
    /**
     * Get the height of the detail row.
     * @type {?}
     */
    DataTableBodyComponent.prototype.getDetailRowHeight;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2JvZHkvYm9keS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixLQUFLLEVBQ0wsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixTQUFTLEVBR1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQXlHcEQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFvSmpDLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBM0loQyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBd0ZwQixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFrQyxLQUFLLENBQUMsQ0FBQztRQUMxRSxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUF3QjdELG9CQUFlLEdBQW1C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MENBQWdCOztJQUNoQiwyQ0FBa0I7O0lBQ2xCLHlDQUFnQjs7SUFDaEIsMkNBQWtCOzs7OztJQTRObEIsb0RBTUU7Ozs7O0lBN05VLG9DQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2Nyb2xsZXJDb21wb25lbnQgfSBmcm9tICcuL3Njcm9sbGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudHMnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvc2VsZWN0aW9uLnR5cGUnO1xyXG5pbXBvcnQgeyBjb2x1bW5zQnlQaW4sIGNvbHVtbkdyb3VwV2lkdGhzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29sdW1uJztcclxuaW1wb3J0IHsgUm93SGVpZ2h0Q2FjaGUgfSBmcm9tICcuLi8uLi91dGlscy9yb3ctaGVpZ2h0LWNhY2hlJztcclxuaW1wb3J0IHsgdHJhbnNsYXRlWFkgfSBmcm9tICcuLi8uLi91dGlscy90cmFuc2xhdGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtYm9keScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkYXRhdGFibGUtc2VsZWN0aW9uXHJcbiAgICAgICNzZWxlY3RvclxyXG4gICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxyXG4gICAgICBbcm93c109XCJyb3dzXCJcclxuICAgICAgW3NlbGVjdENoZWNrXT1cInNlbGVjdENoZWNrXCJcclxuICAgICAgW3NlbGVjdEVuYWJsZWRdPVwic2VsZWN0RW5hYmxlZFwiXHJcbiAgICAgIFtzZWxlY3Rpb25UeXBlXT1cInNlbGVjdGlvblR5cGVcIlxyXG4gICAgICBbcm93SWRlbnRpdHldPVwicm93SWRlbnRpdHlcIlxyXG4gICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIlxyXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgID5cclxuICAgICAgPGRhdGF0YWJsZS1wcm9ncmVzcyAqbmdJZj1cImxvYWRpbmdJbmRpY2F0b3JcIj4gPC9kYXRhdGFibGUtcHJvZ3Jlc3M+XHJcbiAgICAgIDxkYXRhdGFibGUtc2Nyb2xsZXJcclxuICAgICAgICAqbmdJZj1cInJvd3M/Lmxlbmd0aFwiXHJcbiAgICAgICAgW3Njcm9sbGJhclZdPVwic2Nyb2xsYmFyVlwiXHJcbiAgICAgICAgW3Njcm9sbGJhckhdPVwic2Nyb2xsYmFySFwiXHJcbiAgICAgICAgW3Njcm9sbEhlaWdodF09XCJzY3JvbGxIZWlnaHRcIlxyXG4gICAgICAgIFtzY3JvbGxXaWR0aF09XCJjb2x1bW5Hcm91cFdpZHRocz8udG90YWxcIlxyXG4gICAgICAgIChzY3JvbGwpPVwib25Cb2R5U2Nyb2xsKCRldmVudClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRhdGF0YWJsZS1zdW1tYXJ5LXJvd1xyXG4gICAgICAgICAgKm5nSWY9XCJzdW1tYXJ5Um93ICYmIHN1bW1hcnlQb3NpdGlvbiA9PT0gJ3RvcCdcIlxyXG4gICAgICAgICAgW3Jvd0hlaWdodF09XCJzdW1tYXJ5SGVpZ2h0XCJcclxuICAgICAgICAgIFtvZmZzZXRYXT1cIm9mZnNldFhcIlxyXG4gICAgICAgICAgW2lubmVyV2lkdGhdPVwiaW5uZXJXaWR0aFwiXHJcbiAgICAgICAgICBbcm93c109XCJyb3dzXCJcclxuICAgICAgICAgIFtjb2x1bW5zXT1cImNvbHVtbnNcIlxyXG4gICAgICAgID5cclxuICAgICAgICA8L2RhdGF0YWJsZS1zdW1tYXJ5LXJvdz5cclxuICAgICAgICA8ZGF0YXRhYmxlLXJvdy13cmFwcGVyXHJcbiAgICAgICAgICBbZ3JvdXBlZFJvd3NdPVwiZ3JvdXBlZFJvd3NcIlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGdyb3VwIG9mIHRlbXA7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6IHJvd1RyYWNraW5nRm5cIlxyXG4gICAgICAgICAgW2lubmVyV2lkdGhdPVwiaW5uZXJXaWR0aFwiXHJcbiAgICAgICAgICBbbmdTdHlsZV09XCJnZXRSb3dzU3R5bGVzKGdyb3VwKVwiXHJcbiAgICAgICAgICBbcm93RGV0YWlsXT1cInJvd0RldGFpbFwiXHJcbiAgICAgICAgICBbZ3JvdXBIZWFkZXJdPVwiZ3JvdXBIZWFkZXJcIlxyXG4gICAgICAgICAgW29mZnNldFhdPVwib2Zmc2V0WFwiXHJcbiAgICAgICAgICBbZGV0YWlsUm93SGVpZ2h0XT1cImdldERldGFpbFJvd0hlaWdodChncm91cFtpXSwgaSlcIlxyXG4gICAgICAgICAgW3Jvd109XCJncm91cFwiXHJcbiAgICAgICAgICBbZXhwYW5kZWRdPVwiZ2V0Um93RXhwYW5kZWQoZ3JvdXApXCJcclxuICAgICAgICAgIFtyb3dJbmRleF09XCJnZXRSb3dJbmRleChncm91cFtpXSlcIlxyXG4gICAgICAgICAgKHJvd0NvbnRleHRtZW51KT1cInJvd0NvbnRleHRtZW51LmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRhdGF0YWJsZS1ib2R5LXJvd1xyXG4gICAgICAgICAgICAqbmdJZj1cIiFncm91cGVkUm93czsgZWxzZSBncm91cGVkUm93c1RlbXBsYXRlXCJcclxuICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgIFtpc1NlbGVjdGVkXT1cInNlbGVjdG9yLmdldFJvd1NlbGVjdGVkKGdyb3VwKVwiXHJcbiAgICAgICAgICAgIFtpbm5lcldpZHRoXT1cImlubmVyV2lkdGhcIlxyXG4gICAgICAgICAgICBbb2Zmc2V0WF09XCJvZmZzZXRYXCJcclxuICAgICAgICAgICAgW2NvbHVtbnNdPVwiY29sdW1uc1wiXHJcbiAgICAgICAgICAgIFtyb3dEZXRhaWxdPVwicm93RGV0YWlsXCJcclxuICAgICAgICAgICAgW3Jvd0hlaWdodF09XCJnZXRSb3dIZWlnaHQoZ3JvdXApXCJcclxuICAgICAgICAgICAgW3Jvd109XCJncm91cFwiXHJcbiAgICAgICAgICAgIFtyb3dJbmRleF09XCJnZXRSb3dJbmRleChncm91cClcIlxyXG4gICAgICAgICAgICBbZXhwYW5kZWRdPVwiZ2V0Um93RXhwYW5kZWQoZ3JvdXApXCJcclxuICAgICAgICAgICAgW3Jvd0NsYXNzXT1cInJvd0NsYXNzXCJcclxuICAgICAgICAgICAgW2Rpc3BsYXlDaGVja109XCJkaXNwbGF5Q2hlY2tcIlxyXG4gICAgICAgICAgICBbdHJlZVN0YXR1c109XCJncm91cC50cmVlU3RhdHVzXCJcclxuICAgICAgICAgICAgKHRyZWVBY3Rpb24pPVwib25UcmVlQWN0aW9uKGdyb3VwKVwiXHJcbiAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJzZWxlY3Rvci5vbkFjdGl2YXRlKCRldmVudCwgaW5kZXhlcy5maXJzdCArIGkpXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgIDwvZGF0YXRhYmxlLWJvZHktcm93PlxyXG4gICAgICAgICAgPG5nLXRlbXBsYXRlICNncm91cGVkUm93c1RlbXBsYXRlPlxyXG4gICAgICAgICAgICA8ZGF0YXRhYmxlLWJvZHktcm93XHJcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJvdyBvZiBncm91cC52YWx1ZTsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogcm93VHJhY2tpbmdGblwiXHJcbiAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgICAgW2lzU2VsZWN0ZWRdPVwic2VsZWN0b3IuZ2V0Um93U2VsZWN0ZWQocm93KVwiXHJcbiAgICAgICAgICAgICAgW2lubmVyV2lkdGhdPVwiaW5uZXJXaWR0aFwiXHJcbiAgICAgICAgICAgICAgW29mZnNldFhdPVwib2Zmc2V0WFwiXHJcbiAgICAgICAgICAgICAgW2NvbHVtbnNdPVwiY29sdW1uc1wiXHJcbiAgICAgICAgICAgICAgW3Jvd0hlaWdodF09XCJnZXRSb3dIZWlnaHQocm93KVwiXHJcbiAgICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxyXG4gICAgICAgICAgICAgIFtncm91cF09XCJncm91cC52YWx1ZVwiXHJcbiAgICAgICAgICAgICAgW3Jvd0luZGV4XT1cImdldFJvd0luZGV4KHJvdylcIlxyXG4gICAgICAgICAgICAgIFtleHBhbmRlZF09XCJnZXRSb3dFeHBhbmRlZChyb3cpXCJcclxuICAgICAgICAgICAgICBbcm93Q2xhc3NdPVwicm93Q2xhc3NcIlxyXG4gICAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJzZWxlY3Rvci5vbkFjdGl2YXRlKCRldmVudCwgaSlcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDwvZGF0YXRhYmxlLWJvZHktcm93PlxyXG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L2RhdGF0YWJsZS1yb3ctd3JhcHBlcj5cclxuICAgICAgICA8ZGF0YXRhYmxlLXN1bW1hcnktcm93XHJcbiAgICAgICAgICAqbmdJZj1cInN1bW1hcnlSb3cgJiYgc3VtbWFyeVBvc2l0aW9uID09PSAnYm90dG9tJ1wiXHJcbiAgICAgICAgICBbbmdTdHlsZV09XCJnZXRCb3R0b21TdW1tYXJ5Um93U3R5bGVzKClcIlxyXG4gICAgICAgICAgW3Jvd0hlaWdodF09XCJzdW1tYXJ5SGVpZ2h0XCJcclxuICAgICAgICAgIFtvZmZzZXRYXT1cIm9mZnNldFhcIlxyXG4gICAgICAgICAgW2lubmVyV2lkdGhdPVwiaW5uZXJXaWR0aFwiXHJcbiAgICAgICAgICBbcm93c109XCJyb3dzXCJcclxuICAgICAgICAgIFtjb2x1bW5zXT1cImNvbHVtbnNcIlxyXG4gICAgICAgID5cclxuICAgICAgICA8L2RhdGF0YWJsZS1zdW1tYXJ5LXJvdz5cclxuICAgICAgPC9kYXRhdGFibGUtc2Nyb2xsZXI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1yb3dcIiAqbmdJZj1cIiFyb3dzPy5sZW5ndGggJiYgIWxvYWRpbmdJbmRpY2F0b3JcIiBbaW5uZXJIVE1MXT1cImVtcHR5TWVzc2FnZVwiPjwvZGl2PlxyXG4gICAgPC9kYXRhdGFibGUtc2VsZWN0aW9uPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdkYXRhdGFibGUtYm9keSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCb2R5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHNjcm9sbGJhclY6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2Nyb2xsYmFySDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBsb2FkaW5nSW5kaWNhdG9yOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGV4dGVybmFsUGFnaW5nOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHJvd0hlaWdodDogbnVtYmVyIHwgJ2F1dG8nIHwgKChyb3c/OiBhbnkpID0+IG51bWJlcik7XHJcbiAgQElucHV0KCkgb2Zmc2V0WDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGlvblR5cGU6IFNlbGVjdGlvblR5cGU7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGFueVtdID0gW107XHJcbiAgQElucHV0KCkgcm93SWRlbnRpdHk6IGFueTtcclxuICBASW5wdXQoKSByb3dEZXRhaWw6IGFueTtcclxuICBASW5wdXQoKSBncm91cEhlYWRlcjogYW55O1xyXG4gIEBJbnB1dCgpIHNlbGVjdENoZWNrOiBhbnk7XHJcbiAgQElucHV0KCkgZGlzcGxheUNoZWNrOiBhbnk7XHJcbiAgQElucHV0KCkgdHJhY2tCeVByb3A6IHN0cmluZztcclxuICBASW5wdXQoKSByb3dDbGFzczogYW55O1xyXG4gIEBJbnB1dCgpIGdyb3VwZWRSb3dzOiBhbnk7XHJcbiAgQElucHV0KCkgZ3JvdXBFeHBhbnNpb25EZWZhdWx0OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGlubmVyV2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBncm91cFJvd3NCeTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHZpcnR1YWxpemF0aW9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHN1bW1hcnlSb3c6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc3VtbWFyeVBvc2l0aW9uOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodDogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBzZXQgcGFnZVNpemUodmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3BhZ2VTaXplID0gdmFsO1xyXG4gICAgdGhpcy5yZWNhbGNMYXlvdXQoKTtcclxuICB9XHJcblxyXG4gIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhZ2VTaXplO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IHJvd3ModmFsOiBhbnlbXSkge1xyXG4gICAgdGhpcy5fcm93cyA9IHZhbDtcclxuICAgIHRoaXMucmVjYWxjTGF5b3V0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93cygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcm93cztcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBjb2x1bW5zKHZhbDogYW55W10pIHtcclxuICAgIHRoaXMuX2NvbHVtbnMgPSB2YWw7XHJcbiAgICBjb25zdCBjb2xzQnlQaW4gPSBjb2x1bW5zQnlQaW4odmFsKTtcclxuICAgIHRoaXMuY29sdW1uR3JvdXBXaWR0aHMgPSBjb2x1bW5Hcm91cFdpZHRocyhjb2xzQnlQaW4sIHZhbCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY29sdW1ucygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX29mZnNldCA9IHZhbDtcclxuICAgIHRoaXMucmVjYWxjTGF5b3V0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgb2Zmc2V0KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IHJvd0NvdW50KHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9yb3dDb3VudCA9IHZhbDtcclxuICAgIHRoaXMucmVjYWxjTGF5b3V0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93Q291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9yb3dDb3VudDtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxyXG4gIGdldCBib2R5V2lkdGgoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLnNjcm9sbGJhckgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJXaWR0aCArICdweCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJzEwMCUnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpXHJcbiAgc2V0IGJvZHlIZWlnaHQodmFsKSB7XHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XHJcbiAgICAgIHRoaXMuX2JvZHlIZWlnaHQgPSB2YWwgKyAncHgnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fYm9keUhlaWdodCA9ICdhdXRvJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlY2FsY0xheW91dCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJvZHlIZWlnaHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYm9keUhlaWdodDtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBzY3JvbGw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBwYWdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZXRhaWxUb2dnbGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSByb3dDb250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgcm93OiBhbnkgfT4oZmFsc2UpO1xyXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZChTY3JvbGxlckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pIHNjcm9sbGVyOiBTY3JvbGxlckNvbXBvbmVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBpZiBzZWxlY3Rpb24gaXMgZW5hYmxlZC5cclxuICAgKi9cclxuICBnZXQgc2VsZWN0RW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIXRoaXMuc2VsZWN0aW9uVHlwZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb3BlcnR5IHRoYXQgd291bGQgY2FsY3VsYXRlIHRoZSBoZWlnaHQgb2Ygc2Nyb2xsIGJhclxyXG4gICAqIGJhc2VkIG9uIHRoZSByb3cgaGVpZ2h0cyBjYWNoZSBmb3IgdmlydHVhbCBzY3JvbGwgYW5kIHZpcnR1YWxpemF0aW9uLiBPdGhlciBzY2VuYXJpb3NcclxuICAgKiBjYWxjdWxhdGUgc2Nyb2xsIGhlaWdodCBhdXRvbWF0aWNhbGx5IChhcyBoZWlnaHQgd2lsbCBiZSB1bmRlZmluZWQpLlxyXG4gICAqL1xyXG4gIGdldCBzY3JvbGxIZWlnaHQoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbiAmJiB0aGlzLnJvd0NvdW50KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvd0hlaWdodHNDYWNoZS5xdWVyeSh0aGlzLnJvd0NvdW50IC0gMSk7XHJcbiAgICB9XHJcbiAgICAvLyBhdm9pZCBUUzcwMzA6IE5vdCBhbGwgY29kZSBwYXRocyByZXR1cm4gYSB2YWx1ZS5cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICByb3dIZWlnaHRzQ2FjaGU6IFJvd0hlaWdodENhY2hlID0gbmV3IFJvd0hlaWdodENhY2hlKCk7XHJcbiAgdGVtcDogYW55W10gPSBbXTtcclxuICBvZmZzZXRZID0gMDtcclxuICBpbmRleGVzOiBhbnkgPSB7fTtcclxuICBjb2x1bW5Hcm91cFdpZHRoczogYW55O1xyXG4gIGNvbHVtbkdyb3VwV2lkdGhzV2l0aG91dEdyb3VwOiBhbnk7XHJcbiAgcm93VHJhY2tpbmdGbjogYW55O1xyXG4gIGxpc3RlbmVyOiBhbnk7XHJcbiAgcm93SW5kZXhlczogYW55ID0gbmV3IE1hcCgpO1xyXG4gIHJvd0V4cGFuc2lvbnM6IGFueVtdID0gW107XHJcblxyXG4gIF9yb3dzOiBhbnlbXTtcclxuICBfYm9keUhlaWdodDogYW55O1xyXG4gIF9jb2x1bW5zOiBhbnlbXTtcclxuICBfcm93Q291bnQ6IG51bWJlcjtcclxuICBfb2Zmc2V0OiBudW1iZXI7XHJcbiAgX3BhZ2VTaXplOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGF0YVRhYmxlQm9keUNvbXBvbmVudC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgLy8gZGVjbGFyZSBmbiBoZXJlIHNvIHdlIGNhbiBnZXQgYWNjZXNzIHRvIHRoZSBgdGhpc2AgcHJvcGVydHlcclxuICAgIHRoaXMucm93VHJhY2tpbmdGbiA9IChpbmRleDogbnVtYmVyLCByb3c6IGFueSk6IGFueSA9PiB7XHJcbiAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZ2V0Um93SW5kZXgocm93KTtcclxuICAgICAgaWYgKHRoaXMudHJhY2tCeVByb3ApIHtcclxuICAgICAgICByZXR1cm4gcm93W3RoaXMudHJhY2tCeVByb3BdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpZHg7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIGNvbnN0cnVjdG9yLCBpbml0aWFsaXppbmcgaW5wdXQgcHJvcGVydGllc1xyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucm93RGV0YWlsKSB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXIgPSB0aGlzLnJvd0RldGFpbC50b2dnbGUuc3Vic2NyaWJlKCh7IHR5cGUsIHZhbHVlIH06IHsgdHlwZTogc3RyaW5nOyB2YWx1ZTogYW55IH0pID0+IHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gJ3JvdycpIHtcclxuICAgICAgICAgIHRoaXMudG9nZ2xlUm93RXhwYW5zaW9uKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdhbGwnKSB7XHJcbiAgICAgICAgICB0aGlzLnRvZ2dsZUFsbFJvd3ModmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCByb3dzIGFmdGVyIHRvZ2dsZVxyXG4gICAgICAgIC8vIEZpeGVzICM4ODNcclxuICAgICAgICB0aGlzLnVwZGF0ZUluZGV4ZXMoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVJvd3MoKTtcclxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ncm91cEhlYWRlcikge1xyXG4gICAgICB0aGlzLmxpc3RlbmVyID0gdGhpcy5ncm91cEhlYWRlci50b2dnbGUuc3Vic2NyaWJlKCh7IHR5cGUsIHZhbHVlIH06IHsgdHlwZTogc3RyaW5nOyB2YWx1ZTogYW55IH0pID0+IHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2dyb3VwJykge1xyXG4gICAgICAgICAgdGhpcy50b2dnbGVSb3dFeHBhbnNpb24odmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2FsbCcpIHtcclxuICAgICAgICAgIHRoaXMudG9nZ2xlQWxsUm93cyh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZWZyZXNoIHJvd3MgYWZ0ZXIgdG9nZ2xlXHJcbiAgICAgICAgLy8gRml4ZXMgIzg4M1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5kZXhlcygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUm93cygpO1xyXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIG9uY2UsIGJlZm9yZSB0aGUgaW5zdGFuY2UgaXMgZGVzdHJveWVkLlxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucm93RGV0YWlsIHx8IHRoaXMuZ3JvdXBIZWFkZXIpIHtcclxuICAgICAgdGhpcy5saXN0ZW5lci51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgWSBvZmZzZXQgZ2l2ZW4gYSBuZXcgb2Zmc2V0LlxyXG4gICAqL1xyXG4gIHVwZGF0ZU9mZnNldFkob2Zmc2V0PzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAvLyBzY3JvbGxlciBpcyBtaXNzaW5nIG9uIGVtcHR5IHRhYmxlXHJcbiAgICBpZiAoIXRoaXMuc2Nyb2xsZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbiAmJiBvZmZzZXQpIHtcclxuICAgICAgLy8gRmlyc3QgZ2V0IHRoZSByb3cgSW5kZXggdGhhdCB3ZSBuZWVkIHRvIG1vdmUgdG8uXHJcbiAgICAgIGNvbnN0IHJvd0luZGV4ID0gdGhpcy5wYWdlU2l6ZSAqIG9mZnNldDtcclxuICAgICAgb2Zmc2V0ID0gdGhpcy5yb3dIZWlnaHRzQ2FjaGUucXVlcnkocm93SW5kZXggLSAxKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zY3JvbGxiYXJWICYmICF0aGlzLnZpcnR1YWxpemF0aW9uKSB7XHJcbiAgICAgIG9mZnNldCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zY3JvbGxlci5zZXRPZmZzZXQob2Zmc2V0IHx8IDApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQm9keSB3YXMgc2Nyb2xsZWQsIHRoaXMgaXMgbWFpbmx5IHVzZWZ1bCBmb3JcclxuICAgKiB3aGVuIGEgdXNlciBpcyBzZXJ2ZXItc2lkZSBwYWdpbmF0aW9uIHZpYSB2aXJ0dWFsIHNjcm9sbC5cclxuICAgKi9cclxuICBvbkJvZHlTY3JvbGwoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2Nyb2xsWVBvczogbnVtYmVyID0gZXZlbnQuc2Nyb2xsWVBvcztcclxuICAgIGNvbnN0IHNjcm9sbFhQb3M6IG51bWJlciA9IGV2ZW50LnNjcm9sbFhQb3M7XHJcblxyXG4gICAgLy8gaWYgc2Nyb2xsIGNoYW5nZSwgdHJpZ2dlciB1cGRhdGVcclxuICAgIC8vIHRoaXMgaXMgbWFpbmx5IHVzZWQgZm9yIGhlYWRlciBjZWxsIHBvc2l0aW9uc1xyXG4gICAgaWYgKHRoaXMub2Zmc2V0WSAhPT0gc2Nyb2xsWVBvcyB8fCB0aGlzLm9mZnNldFggIT09IHNjcm9sbFhQb3MpIHtcclxuICAgICAgdGhpcy5zY3JvbGwuZW1pdCh7XHJcbiAgICAgICAgb2Zmc2V0WTogc2Nyb2xsWVBvcyxcclxuICAgICAgICBvZmZzZXRYOiBzY3JvbGxYUG9zXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2Zmc2V0WSA9IHNjcm9sbFlQb3M7XHJcbiAgICB0aGlzLm9mZnNldFggPSBzY3JvbGxYUG9zO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5kZXhlcygpO1xyXG4gICAgdGhpcy51cGRhdGVQYWdlKGV2ZW50LmRpcmVjdGlvbik7XHJcbiAgICB0aGlzLnVwZGF0ZVJvd3MoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIHBhZ2UgZ2l2ZW4gYSBkaXJlY3Rpb24uXHJcbiAgICovXHJcbiAgdXBkYXRlUGFnZShkaXJlY3Rpb246IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuaW5kZXhlcy5maXJzdCAvIHRoaXMucGFnZVNpemU7XHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwJykge1xyXG4gICAgICBvZmZzZXQgPSBNYXRoLmNlaWwob2Zmc2V0KTtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZG93bicpIHtcclxuICAgICAgb2Zmc2V0ID0gTWF0aC5mbG9vcihvZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaXJlY3Rpb24gIT09IHVuZGVmaW5lZCAmJiAhaXNOYU4ob2Zmc2V0KSkge1xyXG4gICAgICB0aGlzLnBhZ2UuZW1pdCh7IG9mZnNldCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIHJvd3MgaW4gdGhlIHZpZXcgcG9ydFxyXG4gICAqL1xyXG4gIHVwZGF0ZVJvd3MoKTogdm9pZCB7XHJcbiAgICBjb25zdCB7IGZpcnN0LCBsYXN0IH0gPSB0aGlzLmluZGV4ZXM7XHJcbiAgICBsZXQgcm93SW5kZXggPSBmaXJzdDtcclxuICAgIGxldCBpZHggPSAwO1xyXG4gICAgY29uc3QgdGVtcDogYW55W10gPSBbXTtcclxuXHJcbiAgICB0aGlzLnJvd0luZGV4ZXMuY2xlYXIoKTtcclxuXHJcbiAgICAvLyBpZiBncm91cHJvd3NieSBoYXMgYmVlbiBzcGVjaWZpZWQgdHJlYXQgcm93IHBhZ2luZ1xyXG4gICAgLy8gcGFyYW1ldGVycyBhcyBncm91cCBwYWdpbmcgcGFyYW1ldGVycyBpZSBpZiBsaW1pdCAxMCBoYXMgYmVlblxyXG4gICAgLy8gc3BlY2lmaWVkIHRyZWF0IGl0IGFzIDEwIGdyb3VwcyByYXRoZXIgdGhhbiAxMCByb3dzXHJcbiAgICBpZiAodGhpcy5ncm91cGVkUm93cykge1xyXG4gICAgICBsZXQgbWF4Um93c1Blckdyb3VwID0gMztcclxuICAgICAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUgZ3JvdXAgc2V0IHRoZSBtYXhpbXVtIG51bWJlciBvZlxyXG4gICAgICAvLyByb3dzIHBlciBncm91cCB0aGUgc2FtZSBhcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3NcclxuICAgICAgaWYgKHRoaXMuZ3JvdXBlZFJvd3MubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgbWF4Um93c1Blckdyb3VwID0gdGhpcy5ncm91cGVkUm93c1swXS52YWx1ZS5sZW5ndGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdoaWxlIChyb3dJbmRleCA8IGxhc3QgJiYgcm93SW5kZXggPCB0aGlzLmdyb3VwZWRSb3dzLmxlbmd0aCkge1xyXG4gICAgICAgIC8vIEFkZCB0aGUgZ3JvdXBzIGludG8gdGhpcyBwYWdlXHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdyb3VwZWRSb3dzW3Jvd0luZGV4XTtcclxuICAgICAgICB0ZW1wW2lkeF0gPSBncm91cDtcclxuICAgICAgICBpZHgrKztcclxuXHJcbiAgICAgICAgLy8gR3JvdXAgaW5kZXggaW4gdGhpcyBjb250ZXh0XHJcbiAgICAgICAgcm93SW5kZXgrKztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2hpbGUgKHJvd0luZGV4IDwgbGFzdCAmJiByb3dJbmRleCA8IHRoaXMucm93Q291bnQpIHtcclxuICAgICAgICBjb25zdCByb3cgPSB0aGlzLnJvd3Nbcm93SW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgICB0aGlzLnJvd0luZGV4ZXMuc2V0KHJvdywgcm93SW5kZXgpO1xyXG4gICAgICAgICAgdGVtcFtpZHhdID0gcm93O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWR4Kys7XHJcbiAgICAgICAgcm93SW5kZXgrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGVtcCA9IHRlbXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHJvdyBoZWlnaHRcclxuICAgKi9cclxuICBnZXRSb3dIZWlnaHQocm93OiBhbnkpOiBudW1iZXIge1xyXG4gICAgLy8gaWYgaXRzIGEgZnVuY3Rpb24gcmV0dXJuIGl0XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucm93SGVpZ2h0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvd0hlaWdodChyb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnJvd0hlaWdodCBhcyBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZ3JvdXAgdGhlIGdyb3VwIHdpdGggYWxsIHJvd3NcclxuICAgKi9cclxuICBnZXRHcm91cEhlaWdodChncm91cDogYW55KTogbnVtYmVyIHtcclxuICAgIGxldCByb3dIZWlnaHQgPSAwO1xyXG5cclxuICAgIGlmIChncm91cC52YWx1ZSkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZ3JvdXAudmFsdWUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgcm93SGVpZ2h0ICs9IHRoaXMuZ2V0Um93QW5kRGV0YWlsSGVpZ2h0KGdyb3VwLnZhbHVlW2luZGV4XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm93SGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHJvdyBoZWlnaHQgYmFzZWQgb24gdGhlIGV4cGFuZGVkIHN0YXRlIG9mIHRoZSByb3cuXHJcbiAgICovXHJcbiAgZ2V0Um93QW5kRGV0YWlsSGVpZ2h0KHJvdzogYW55KTogbnVtYmVyIHtcclxuICAgIGxldCByb3dIZWlnaHQgPSB0aGlzLmdldFJvd0hlaWdodChyb3cpO1xyXG4gICAgY29uc3QgZXhwYW5kZWQgPSB0aGlzLmdldFJvd0V4cGFuZGVkKHJvdyk7XHJcblxyXG4gICAgLy8gQWRkaW5nIGRldGFpbCByb3cgaGVpZ2h0IGlmIGl0cyBleHBhbmRlZC5cclxuICAgIGlmIChleHBhbmRlZCkge1xyXG4gICAgICByb3dIZWlnaHQgKz0gdGhpcy5nZXREZXRhaWxSb3dIZWlnaHQocm93KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm93SGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBoZWlnaHQgb2YgdGhlIGRldGFpbCByb3cuXHJcbiAgICovXHJcbiAgZ2V0RGV0YWlsUm93SGVpZ2h0ID0gKHJvdz86IGFueSwgaW5kZXg/OiBhbnkpOiBudW1iZXIgPT4ge1xyXG4gICAgaWYgKCF0aGlzLnJvd0RldGFpbCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGNvbnN0IHJvd0hlaWdodCA9IHRoaXMucm93RGV0YWlsLnJvd0hlaWdodDtcclxuICAgIHJldHVybiB0eXBlb2Ygcm93SGVpZ2h0ID09PSAnZnVuY3Rpb24nID8gcm93SGVpZ2h0KHJvdywgaW5kZXgpIDogKHJvd0hlaWdodCBhcyBudW1iZXIpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZXMgdGhlIHN0eWxlcyBmb3IgdGhlIHJvdyBzbyB0aGF0IHRoZSByb3dzIGNhbiBiZSBtb3ZlZCBpbiAyRCBzcGFjZVxyXG4gICAqIGR1cmluZyB2aXJ0dWFsIHNjcm9sbCBpbnNpZGUgdGhlIERPTS4gICBJbiB0aGUgYmVsb3cgY2FzZSB0aGUgWSBwb3NpdGlvbiBpc1xyXG4gICAqIG1hbmlwdWxhdGVkLiAgIEFzIGFuIGV4YW1wbGUsIGlmIHRoZSBoZWlnaHQgb2Ygcm93IDAgaXMgMzAgcHggYW5kIHJvdyAxIGlzXHJcbiAgICogMTAwIHB4IHRoZW4gZm9sbG93aW5nIHN0eWxlcyBhcmUgZ2VuZXJhdGVkOlxyXG4gICAqXHJcbiAgICogdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTsgICAgLT4gIHJvdzBcclxuICAgKiB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMzBweCwgMHB4KTsgICAtPiAgcm93MVxyXG4gICAqIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAxMzBweCwgMHB4KTsgIC0+ICByb3cyXHJcbiAgICpcclxuICAgKiBSb3cgaGVpZ2h0cyBoYXZlIHRvIGJlIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIHJvdyBoZWlnaHRzIGNhY2hlIGFzIHdlIHdvbnRcclxuICAgKiBiZSBhYmxlIHRvIGRldGVybWluZSB3aGljaCByb3cgaXMgb2Ygd2hhdCBoZWlnaHQgYmVmb3JlIGhhbmQuICBJbiB0aGUgYWJvdmVcclxuICAgKiBjYXNlIHRoZSBwb3NpdGlvblkgb2YgdGhlIHRyYW5zbGF0ZTNkIGZvciByb3cyIHdvdWxkIGJlIHRoZSBzdW0gb2YgYWxsIHRoZVxyXG4gICAqIGhlaWdodHMgb2YgdGhlIHJvd3MgYmVmb3JlIGl0IChpLmUuIHJvdzAgYW5kIHJvdzEpLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJvd3MgdGhlIHJvdyB0aGF0IG5lZWRzIHRvIGJlIHBsYWNlZCBpbiB0aGUgMkQgc3BhY2UuXHJcbiAgICogQHJldHVybnMgdGhlIENTUzMgc3R5bGUgdG8gYmUgYXBwbGllZFxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIERhdGFUYWJsZUJvZHlDb21wb25lbnRcclxuICAgKi9cclxuICBnZXRSb3dzU3R5bGVzKHJvd3M6IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBzdHlsZXM6IGFueSA9IHt9O1xyXG5cclxuICAgIC8vIG9ubHkgYWRkIHN0eWxlcyBmb3IgdGhlIGdyb3VwIGlmIHRoZXJlIGlzIGEgZ3JvdXBcclxuICAgIGlmICh0aGlzLmdyb3VwZWRSb3dzKSB7XHJcbiAgICAgIHN0eWxlcy53aWR0aCA9IHRoaXMuY29sdW1uR3JvdXBXaWR0aHMudG90YWw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViAmJiB0aGlzLnZpcnR1YWxpemF0aW9uKSB7XHJcbiAgICAgIGxldCBpZHggPSAwO1xyXG5cclxuICAgICAgaWYgKHRoaXMuZ3JvdXBlZFJvd3MpIHtcclxuICAgICAgICAvLyBHZXQgdGhlIGxhdGVzdCByb3cgcm93aW5kZXggaW4gYSBncm91cFxyXG4gICAgICAgIGNvbnN0IHJvdyA9IHJvd3Nbcm93cy5sZW5ndGggLSAxXTtcclxuICAgICAgICBpZHggPSByb3cgPyB0aGlzLmdldFJvd0luZGV4KHJvdykgOiAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlkeCA9IHRoaXMuZ2V0Um93SW5kZXgocm93cyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNvbnN0IHBvcyA9IGlkeCAqIHJvd0hlaWdodDtcclxuICAgICAgLy8gVGhlIHBvc2l0aW9uIG9mIHRoaXMgcm93IHdvdWxkIGJlIHRoZSBzdW0gb2YgYWxsIHJvdyBoZWlnaHRzXHJcbiAgICAgIC8vIHVudGlsIHRoZSBwcmV2aW91cyByb3cgcG9zaXRpb24uXHJcbiAgICAgIGNvbnN0IHBvcyA9IHRoaXMucm93SGVpZ2h0c0NhY2hlLnF1ZXJ5KGlkeCAtIDEpO1xyXG5cclxuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCAwLCBwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgYm90dG9tIHN1bW1hcnkgcm93IG9mZnNldCBmb3Igc2Nyb2xsYmFyIG1vZGUuXHJcbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgY2FjaGUgYW5kIG9mZnNldCBjYWxjdWxhdGlvblxyXG4gICAqIHNlZSBkZXNjcmlwdGlvbiBmb3IgYGdldFJvd3NTdHlsZXNgIG1ldGhvZFxyXG4gICAqXHJcbiAgICogQHJldHVybnMgdGhlIENTUzMgc3R5bGUgdG8gYmUgYXBwbGllZFxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIERhdGFUYWJsZUJvZHlDb21wb25lbnRcclxuICAgKi9cclxuICBnZXRCb3R0b21TdW1tYXJ5Um93U3R5bGVzKCk6IGFueSB7XHJcbiAgICBpZiAoIXRoaXMuc2Nyb2xsYmFyViB8fCAhdGhpcy5yb3dzIHx8ICF0aGlzLnJvd3MubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0eWxlcyA9IHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfTtcclxuICAgIGNvbnN0IHBvcyA9IHRoaXMucm93SGVpZ2h0c0NhY2hlLnF1ZXJ5KHRoaXMucm93cy5sZW5ndGggLSAxKTtcclxuXHJcbiAgICB0cmFuc2xhdGVYWShzdHlsZXMsIDAsIHBvcyk7XHJcblxyXG4gICAgcmV0dXJuIHN0eWxlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGVzIHRoZSBsb2FkaW5nIGluZGljYXRvclxyXG4gICAqL1xyXG4gIGhpZGVJbmRpY2F0b3IoKTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmxvYWRpbmdJbmRpY2F0b3IgPSBmYWxzZSksIDUwMCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBpbmRleCBvZiB0aGUgcm93cyBpbiB0aGUgdmlld3BvcnRcclxuICAgKi9cclxuICB1cGRhdGVJbmRleGVzKCk6IHZvaWQge1xyXG4gICAgbGV0IGZpcnN0ID0gMDtcclxuICAgIGxldCBsYXN0ID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XHJcbiAgICAgIGlmICh0aGlzLnZpcnR1YWxpemF0aW9uKSB7XHJcbiAgICAgICAgLy8gQ2FsY3VsYXRpb24gb2YgdGhlIGZpcnN0IGFuZCBsYXN0IGluZGV4ZXMgd2lsbCBiZSBiYXNlZCBvbiB3aGVyZSB0aGVcclxuICAgICAgICAvLyBzY3JvbGxZIHBvc2l0aW9uIHdvdWxkIGJlIGF0LiAgVGhlIGxhc3QgaW5kZXggd291bGQgYmUgdGhlIG9uZVxyXG4gICAgICAgIC8vIHRoYXQgc2hvd3MgdXAgaW5zaWRlIHRoZSB2aWV3IHBvcnQgdGhlIGxhc3QuXHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5ib2R5SGVpZ2h0LCAwKTtcclxuICAgICAgICBmaXJzdCA9IHRoaXMucm93SGVpZ2h0c0NhY2hlLmdldFJvd0luZGV4KHRoaXMub2Zmc2V0WSk7XHJcbiAgICAgICAgbGFzdCA9IHRoaXMucm93SGVpZ2h0c0NhY2hlLmdldFJvd0luZGV4KGhlaWdodCArIHRoaXMub2Zmc2V0WSkgKyAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIElmIHZpcnR1YWwgcm93cyBhcmUgbm90IG5lZWRlZFxyXG4gICAgICAgIC8vIFdlIHJlbmRlciBhbGwgaW4gb25lIGdvXHJcbiAgICAgICAgZmlyc3QgPSAwO1xyXG4gICAgICAgIGxhc3QgPSB0aGlzLnJvd0NvdW50O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBUaGUgc2VydmVyIGlzIGhhbmRsaW5nIHBhZ2luZyBhbmQgd2lsbCBwYXNzIGFuIGFycmF5IHRoYXQgYmVnaW5zIHdpdGggdGhlXHJcbiAgICAgIC8vIGVsZW1lbnQgYXQgYSBzcGVjaWZpZWQgb2Zmc2V0LiAgZmlyc3Qgc2hvdWxkIGFsd2F5cyBiZSAwIHdpdGggZXh0ZXJuYWwgcGFnaW5nLlxyXG4gICAgICBpZiAoIXRoaXMuZXh0ZXJuYWxQYWdpbmcpIHtcclxuICAgICAgICBmaXJzdCA9IE1hdGgubWF4KHRoaXMub2Zmc2V0ICogdGhpcy5wYWdlU2l6ZSwgMCk7XHJcbiAgICAgIH1cclxuICAgICAgbGFzdCA9IE1hdGgubWluKGZpcnN0ICsgdGhpcy5wYWdlU2l6ZSwgdGhpcy5yb3dDb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmRleGVzID0geyBmaXJzdCwgbGFzdCB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVmcmVzaGVzIHRoZSBmdWxsIFJvdyBIZWlnaHQgY2FjaGUuICBTaG91bGQgYmUgdXNlZFxyXG4gICAqIHdoZW4gdGhlIGVudGlyZSByb3cgYXJyYXkgc3RhdGUgaGFzIGNoYW5nZWQuXHJcbiAgICovXHJcbiAgcmVmcmVzaFJvd0hlaWdodENhY2hlKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnNjcm9sbGJhclYgfHwgKHRoaXMuc2Nyb2xsYmFyViAmJiAhdGhpcy52aXJ0dWFsaXphdGlvbikpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsZWFyIHRoZSBwcmV2aW91cyByb3cgaGVpZ2h0IGNhY2hlIGlmIGFscmVhZHkgcHJlc2VudC5cclxuICAgIC8vIHRoaXMgaXMgdXNlZnVsIGR1cmluZyBzb3J0cywgZmlsdGVycyB3aGVyZSB0aGUgc3RhdGUgb2YgdGhlXHJcbiAgICAvLyByb3dzIGFycmF5IGlzIGNoYW5nZWQuXHJcbiAgICB0aGlzLnJvd0hlaWdodHNDYWNoZS5jbGVhckNhY2hlKCk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgdHJlZSBvbmx5IGlmIHRoZXJlIGFyZSByb3dzIGluc2lkZSB0aGUgdHJlZS5cclxuICAgIGlmICh0aGlzLnJvd3MgJiYgdGhpcy5yb3dzLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCByb3dFeHBhbnNpb25zID0gbmV3IFNldCgpO1xyXG4gICAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLnJvd3MpIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRSb3dFeHBhbmRlZChyb3cpKSB7XHJcbiAgICAgICAgICByb3dFeHBhbnNpb25zLmFkZChyb3cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5yb3dIZWlnaHRzQ2FjaGUuaW5pdENhY2hlKHtcclxuICAgICAgICByb3dzOiB0aGlzLnJvd3MsXHJcbiAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcclxuICAgICAgICBkZXRhaWxSb3dIZWlnaHQ6IHRoaXMuZ2V0RGV0YWlsUm93SGVpZ2h0LFxyXG4gICAgICAgIGV4dGVybmFsVmlydHVhbDogdGhpcy5zY3JvbGxiYXJWICYmIHRoaXMuZXh0ZXJuYWxQYWdpbmcsXHJcbiAgICAgICAgcm93Q291bnQ6IHRoaXMucm93Q291bnQsXHJcbiAgICAgICAgcm93SW5kZXhlczogdGhpcy5yb3dJbmRleGVzLFxyXG4gICAgICAgIHJvd0V4cGFuc2lvbnNcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBpbmRleCBmb3IgdGhlIHZpZXcgcG9ydFxyXG4gICAqL1xyXG4gIGdldEFkanVzdGVkVmlld1BvcnRJbmRleCgpOiBudW1iZXIge1xyXG4gICAgLy8gQ2FwdHVyZSB0aGUgcm93IGluZGV4IG9mIHRoZSBmaXJzdCByb3cgdGhhdCBpcyB2aXNpYmxlIG9uIHRoZSB2aWV3cG9ydC5cclxuICAgIC8vIElmIHRoZSBzY3JvbGwgYmFyIGlzIGp1c3QgYmVsb3cgdGhlIHJvdyB3aGljaCBpcyBoaWdobGlnaHRlZCB0aGVuIG1ha2UgdGhhdCBhcyB0aGVcclxuICAgIC8vIGZpcnN0IGluZGV4LlxyXG4gICAgY29uc3Qgdmlld1BvcnRGaXJzdFJvd0luZGV4ID0gdGhpcy5pbmRleGVzLmZpcnN0O1xyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbikge1xyXG4gICAgICBjb25zdCBvZmZzZXRTY3JvbGwgPSB0aGlzLnJvd0hlaWdodHNDYWNoZS5xdWVyeSh2aWV3UG9ydEZpcnN0Um93SW5kZXggLSAxKTtcclxuICAgICAgcmV0dXJuIG9mZnNldFNjcm9sbCA8PSB0aGlzLm9mZnNldFkgPyB2aWV3UG9ydEZpcnN0Um93SW5kZXggLSAxIDogdmlld1BvcnRGaXJzdFJvd0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2aWV3UG9ydEZpcnN0Um93SW5kZXg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGUgdGhlIEV4cGFuc2lvbiBvZiB0aGUgcm93IGkuZS4gaWYgdGhlIHJvdyBpcyBleHBhbmRlZCB0aGVuIGl0IHdpbGxcclxuICAgKiBjb2xsYXBzZSBhbmQgdmljZSB2ZXJzYS4gICBOb3RlIHRoYXQgdGhlIGV4cGFuZGVkIHN0YXR1cyBpcyBzdG9yZWQgYXNcclxuICAgKiBhIHBhcnQgb2YgdGhlIHJvdyBvYmplY3QgaXRzZWxmIGFzIHdlIGhhdmUgdG8gcHJlc2VydmUgdGhlIGV4cGFuZGVkIHJvd1xyXG4gICAqIHN0YXR1cyBpbiBjYXNlIG9mIHNvcnRpbmcgYW5kIGZpbHRlcmluZyBvZiB0aGUgcm93IHNldC5cclxuICAgKi9cclxuICB0b2dnbGVSb3dFeHBhbnNpb24ocm93OiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIENhcHR1cmUgdGhlIHJvdyBpbmRleCBvZiB0aGUgZmlyc3Qgcm93IHRoYXQgaXMgdmlzaWJsZSBvbiB0aGUgdmlld3BvcnQuXHJcbiAgICBjb25zdCB2aWV3UG9ydEZpcnN0Um93SW5kZXggPSB0aGlzLmdldEFkanVzdGVkVmlld1BvcnRJbmRleCgpO1xyXG4gICAgY29uc3Qgcm93RXhwYW5kZWRJZHggPSB0aGlzLmdldFJvd0V4cGFuZGVkSWR4KHJvdywgdGhpcy5yb3dFeHBhbnNpb25zKTtcclxuICAgIGNvbnN0IGV4cGFuZGVkID0gcm93RXhwYW5kZWRJZHggPiAtMTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZGV0YWlsUm93SGVpZ2h0IGlzIGF1dG8gLS0+IG9ubHkgaW4gY2FzZSBvZiBub24tdmlydHVhbGl6ZWQgc2Nyb2xsXHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWICYmIHRoaXMudmlydHVhbGl6YXRpb24pIHtcclxuICAgICAgY29uc3QgZGV0YWlsUm93SGVpZ2h0ID0gdGhpcy5nZXREZXRhaWxSb3dIZWlnaHQocm93KSAqIChleHBhbmRlZCA/IC0xIDogMSk7XHJcbiAgICAgIC8vIGNvbnN0IGlkeCA9IHRoaXMucm93SW5kZXhlcy5nZXQocm93KSB8fCAwO1xyXG4gICAgICBjb25zdCBpZHggPSB0aGlzLmdldFJvd0luZGV4KHJvdyk7XHJcbiAgICAgIHRoaXMucm93SGVpZ2h0c0NhY2hlLnVwZGF0ZShpZHgsIGRldGFpbFJvd0hlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIHRoZSB0b2dnbGVkIHJvdyBhbmQgdXBkYXRlIHRoaXZlIG5ldmVyZSBoZWlnaHRzIGluIHRoZSBjYWNoZS5cclxuICAgIGlmIChleHBhbmRlZCkge1xyXG4gICAgICB0aGlzLnJvd0V4cGFuc2lvbnMuc3BsaWNlKHJvd0V4cGFuZGVkSWR4LCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucm93RXhwYW5zaW9ucy5wdXNoKHJvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZXRhaWxUb2dnbGUuZW1pdCh7XHJcbiAgICAgIHJvd3M6IFtyb3ddLFxyXG4gICAgICBjdXJyZW50SW5kZXg6IHZpZXdQb3J0Rmlyc3RSb3dJbmRleFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHBhbmQvQ29sbGFwc2UgYWxsIHRoZSByb3dzIG5vIG1hdHRlciB3aGF0IHRoZWlyIHN0YXRlIGlzLlxyXG4gICAqL1xyXG4gIHRvZ2dsZUFsbFJvd3MoZXhwYW5kZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIC8vIGNsZWFyIHByZXYgZXhwYW5zaW9uc1xyXG4gICAgdGhpcy5yb3dFeHBhbnNpb25zID0gW107XHJcblxyXG4gICAgLy8gQ2FwdHVyZSB0aGUgcm93IGluZGV4IG9mIHRoZSBmaXJzdCByb3cgdGhhdCBpcyB2aXNpYmxlIG9uIHRoZSB2aWV3cG9ydC5cclxuICAgIGNvbnN0IHZpZXdQb3J0Rmlyc3RSb3dJbmRleCA9IHRoaXMuZ2V0QWRqdXN0ZWRWaWV3UG9ydEluZGV4KCk7XHJcblxyXG4gICAgaWYgKGV4cGFuZGVkKSB7XHJcbiAgICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMucm93cykge1xyXG4gICAgICAgIHRoaXMucm93RXhwYW5zaW9ucy5wdXNoKHJvdyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XHJcbiAgICAgIC8vIFJlZnJlc2ggdGhlIGZ1bGwgcm93IGhlaWdodHMgY2FjaGUgc2luY2UgZXZlcnkgcm93IHdhcyBhZmZlY3RlZC5cclxuICAgICAgdGhpcy5yZWNhbGNMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFbWl0IGFsbCByb3dzIHRoYXQgaGF2ZSBiZWVuIGV4cGFuZGVkLlxyXG4gICAgdGhpcy5kZXRhaWxUb2dnbGUuZW1pdCh7XHJcbiAgICAgIHJvd3M6IHRoaXMucm93cyxcclxuICAgICAgY3VycmVudEluZGV4OiB2aWV3UG9ydEZpcnN0Um93SW5kZXhcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWxjdWxhdGVzIHRoZSB0YWJsZVxyXG4gICAqL1xyXG4gIHJlY2FsY0xheW91dCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVmcmVzaFJvd0hlaWdodENhY2hlKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUluZGV4ZXMoKTtcclxuICAgIHRoaXMudXBkYXRlUm93cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhY2tzIHRoZSBjb2x1bW5cclxuICAgKi9cclxuICBjb2x1bW5UcmFja2luZ0ZuKGluZGV4OiBudW1iZXIsIGNvbHVtbjogYW55KTogYW55IHtcclxuICAgIHJldHVybiBjb2x1bW4uJCRpZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHJvdyBwaW5uaW5nIGdyb3VwIHN0eWxlc1xyXG4gICAqL1xyXG4gIHN0eWxlc0J5R3JvdXAoZ3JvdXA6IHN0cmluZykge1xyXG4gICAgY29uc3Qgd2lkdGhzID0gdGhpcy5jb2x1bW5Hcm91cFdpZHRocztcclxuICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLm9mZnNldFg7XHJcblxyXG4gICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICB3aWR0aDogYCR7d2lkdGhzW2dyb3VwXX1weGBcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGdyb3VwID09PSAnbGVmdCcpIHtcclxuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXRYLCAwKTtcclxuICAgIH0gZWxzZSBpZiAoZ3JvdXAgPT09ICdyaWdodCcpIHtcclxuICAgICAgY29uc3QgYm9keVdpZHRoID0gcGFyc2VJbnQodGhpcy5pbm5lcldpZHRoICsgJycsIDApO1xyXG4gICAgICBjb25zdCB0b3RhbERpZmYgPSB3aWR0aHMudG90YWwgLSBib2R5V2lkdGg7XHJcbiAgICAgIGNvbnN0IG9mZnNldERpZmYgPSB0b3RhbERpZmYgLSBvZmZzZXRYO1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSBvZmZzZXREaWZmICogLTE7XHJcbiAgICAgIHRyYW5zbGF0ZVhZKHN0eWxlcywgb2Zmc2V0LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBpZiB0aGUgcm93IHdhcyBleHBhbmRlZCBhbmQgc2V0IGRlZmF1bHQgcm93IGV4cGFuc2lvbiB3aGVuIHJvdyBleHBhbnNpb24gaXMgZW1wdHlcclxuICAgKi9cclxuICBnZXRSb3dFeHBhbmRlZChyb3c6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMucm93RXhwYW5zaW9ucy5sZW5ndGggPT09IDAgJiYgdGhpcy5ncm91cEV4cGFuc2lvbkRlZmF1bHQpIHtcclxuICAgICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLmdyb3VwZWRSb3dzKSB7XHJcbiAgICAgICAgdGhpcy5yb3dFeHBhbnNpb25zLnB1c2goZ3JvdXApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Um93RXhwYW5kZWRJZHgocm93LCB0aGlzLnJvd0V4cGFuc2lvbnMpID4gLTE7XHJcbiAgfVxyXG5cclxuICBnZXRSb3dFeHBhbmRlZElkeChyb3c6IGFueSwgZXhwYW5kZWQ6IGFueVtdKTogbnVtYmVyIHtcclxuICAgIGlmICghZXhwYW5kZWQgfHwgIWV4cGFuZGVkLmxlbmd0aCkgcmV0dXJuIC0xO1xyXG5cclxuICAgIGNvbnN0IHJvd0lkID0gdGhpcy5yb3dJZGVudGl0eShyb3cpO1xyXG4gICAgcmV0dXJuIGV4cGFuZGVkLmZpbmRJbmRleChyID0+IHtcclxuICAgICAgY29uc3QgaWQgPSB0aGlzLnJvd0lkZW50aXR5KHIpO1xyXG4gICAgICByZXR1cm4gaWQgPT09IHJvd0lkO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSByb3cgaW5kZXggZ2l2ZW4gYSByb3dcclxuICAgKi9cclxuICBnZXRSb3dJbmRleChyb3c6IGFueSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5yb3dJbmRleGVzLmdldChyb3cpIHx8IDA7XHJcbiAgfVxyXG5cclxuICBvblRyZWVBY3Rpb24ocm93OiBhbnkpIHtcclxuICAgIHRoaXMudHJlZUFjdGlvbi5lbWl0KHsgcm93IH0pO1xyXG4gIH1cclxufVxyXG4iXX0=