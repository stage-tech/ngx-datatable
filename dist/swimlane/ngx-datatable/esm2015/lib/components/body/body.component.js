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
        (r) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2JvZHkvYm9keS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixLQUFLLEVBQ0wsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixTQUFTLEVBR1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQXdHcEQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFvSmpDLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBM0loQyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBd0ZwQixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFrQyxLQUFLLENBQUMsQ0FBQztRQUMxRSxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUF3QjdELG9CQUFlLEdBQW1C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Q2pCLDBDQUFnQjs7SUFDaEIsMkNBQWtCOztJQUNsQix5Q0FBZ0I7O0lBQ2hCLDJDQUFrQjs7Ozs7SUE0TmxCLG9EQU1FOzs7OztJQTdOVSxvQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNjcm9sbGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zY3JvbGxlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NlbGVjdGlvbi50eXBlJztcclxuaW1wb3J0IHsgY29sdW1uc0J5UGluLCBjb2x1bW5Hcm91cFdpZHRocyB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbHVtbic7XHJcbmltcG9ydCB7IFJvd0hlaWdodENhY2hlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcm93LWhlaWdodC1jYWNoZSc7XHJcbmltcG9ydCB7IHRyYW5zbGF0ZVhZIH0gZnJvbSAnLi4vLi4vdXRpbHMvdHJhbnNsYXRlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWJvZHknLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGF0YXRhYmxlLXNlbGVjdGlvblxyXG4gICAgICAjc2VsZWN0b3JcclxuICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcclxuICAgICAgW3Jvd3NdPVwicm93c1wiXHJcbiAgICAgIFtzZWxlY3RDaGVja109XCJzZWxlY3RDaGVja1wiXHJcbiAgICAgIFtzZWxlY3RFbmFibGVkXT1cInNlbGVjdEVuYWJsZWRcIlxyXG4gICAgICBbc2VsZWN0aW9uVHlwZV09XCJzZWxlY3Rpb25UeXBlXCJcclxuICAgICAgW3Jvd0lkZW50aXR5XT1cInJvd0lkZW50aXR5XCJcclxuICAgICAgKHNlbGVjdCk9XCJzZWxlY3QuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICA+XHJcbiAgICAgIDxkYXRhdGFibGUtcHJvZ3Jlc3MgKm5nSWY9XCJsb2FkaW5nSW5kaWNhdG9yXCI+IDwvZGF0YXRhYmxlLXByb2dyZXNzPlxyXG4gICAgICA8ZGF0YXRhYmxlLXNjcm9sbGVyXHJcbiAgICAgICAgKm5nSWY9XCJyb3dzPy5sZW5ndGhcIlxyXG4gICAgICAgIFtzY3JvbGxiYXJWXT1cInNjcm9sbGJhclZcIlxyXG4gICAgICAgIFtzY3JvbGxiYXJIXT1cInNjcm9sbGJhckhcIlxyXG4gICAgICAgIFtzY3JvbGxIZWlnaHRdPVwic2Nyb2xsSGVpZ2h0XCJcclxuICAgICAgICBbc2Nyb2xsV2lkdGhdPVwiY29sdW1uR3JvdXBXaWR0aHM/LnRvdGFsXCJcclxuICAgICAgICAoc2Nyb2xsKT1cIm9uQm9keVNjcm9sbCgkZXZlbnQpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkYXRhdGFibGUtc3VtbWFyeS1yb3dcclxuICAgICAgICAgICpuZ0lmPVwic3VtbWFyeVJvdyAmJiBzdW1tYXJ5UG9zaXRpb24gPT09ICd0b3AnXCJcclxuICAgICAgICAgIFtyb3dIZWlnaHRdPVwic3VtbWFyeUhlaWdodFwiXHJcbiAgICAgICAgICBbb2Zmc2V0WF09XCJvZmZzZXRYXCJcclxuICAgICAgICAgIFtpbm5lcldpZHRoXT1cImlubmVyV2lkdGhcIlxyXG4gICAgICAgICAgW3Jvd3NdPVwicm93c1wiXHJcbiAgICAgICAgICBbY29sdW1uc109XCJjb2x1bW5zXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC9kYXRhdGFibGUtc3VtbWFyeS1yb3c+XHJcbiAgICAgICAgPGRhdGF0YWJsZS1yb3ctd3JhcHBlclxyXG4gICAgICAgICAgW2dyb3VwZWRSb3dzXT1cImdyb3VwZWRSb3dzXCJcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBncm91cCBvZiB0ZW1wOyBsZXQgaSA9IGluZGV4OyB0cmFja0J5OiByb3dUcmFja2luZ0ZuXCJcclxuICAgICAgICAgIFtpbm5lcldpZHRoXT1cImlubmVyV2lkdGhcIlxyXG4gICAgICAgICAgW25nU3R5bGVdPVwiZ2V0Um93c1N0eWxlcyhncm91cClcIlxyXG4gICAgICAgICAgW3Jvd0RldGFpbF09XCJyb3dEZXRhaWxcIlxyXG4gICAgICAgICAgW2dyb3VwSGVhZGVyXT1cImdyb3VwSGVhZGVyXCJcclxuICAgICAgICAgIFtvZmZzZXRYXT1cIm9mZnNldFhcIlxyXG4gICAgICAgICAgW2RldGFpbFJvd0hlaWdodF09XCJnZXREZXRhaWxSb3dIZWlnaHQoZ3JvdXBbaV0sIGkpXCJcclxuICAgICAgICAgIFtyb3ddPVwiZ3JvdXBcIlxyXG4gICAgICAgICAgW2V4cGFuZGVkXT1cImdldFJvd0V4cGFuZGVkKGdyb3VwKVwiXHJcbiAgICAgICAgICBbcm93SW5kZXhdPVwiZ2V0Um93SW5kZXgoZ3JvdXBbaV0pXCJcclxuICAgICAgICAgIChyb3dDb250ZXh0bWVudSk9XCJyb3dDb250ZXh0bWVudS5lbWl0KCRldmVudClcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkYXRhdGFibGUtYm9keS1yb3dcclxuICAgICAgICAgICAgKm5nSWY9XCIhZ3JvdXBlZFJvd3M7IGVsc2UgZ3JvdXBlZFJvd3NUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxyXG4gICAgICAgICAgICBbaXNTZWxlY3RlZF09XCJzZWxlY3Rvci5nZXRSb3dTZWxlY3RlZChncm91cClcIlxyXG4gICAgICAgICAgICBbaW5uZXJXaWR0aF09XCJpbm5lcldpZHRoXCJcclxuICAgICAgICAgICAgW29mZnNldFhdPVwib2Zmc2V0WFwiXHJcbiAgICAgICAgICAgIFtjb2x1bW5zXT1cImNvbHVtbnNcIlxyXG4gICAgICAgICAgICBbcm93SGVpZ2h0XT1cImdldFJvd0hlaWdodChncm91cClcIlxyXG4gICAgICAgICAgICBbcm93XT1cImdyb3VwXCJcclxuICAgICAgICAgICAgW3Jvd0luZGV4XT1cImdldFJvd0luZGV4KGdyb3VwKVwiXHJcbiAgICAgICAgICAgIFtleHBhbmRlZF09XCJnZXRSb3dFeHBhbmRlZChncm91cClcIlxyXG4gICAgICAgICAgICBbcm93Q2xhc3NdPVwicm93Q2xhc3NcIlxyXG4gICAgICAgICAgICBbZGlzcGxheUNoZWNrXT1cImRpc3BsYXlDaGVja1wiXHJcbiAgICAgICAgICAgIFt0cmVlU3RhdHVzXT1cImdyb3VwLnRyZWVTdGF0dXNcIlxyXG4gICAgICAgICAgICAodHJlZUFjdGlvbik9XCJvblRyZWVBY3Rpb24oZ3JvdXApXCJcclxuICAgICAgICAgICAgKGFjdGl2YXRlKT1cInNlbGVjdG9yLm9uQWN0aXZhdGUoJGV2ZW50LCBpbmRleGVzLmZpcnN0ICsgaSlcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPC9kYXRhdGFibGUtYm9keS1yb3c+XHJcbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2dyb3VwZWRSb3dzVGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDxkYXRhdGFibGUtYm9keS1yb3dcclxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcm93IG9mIGdyb3VwLnZhbHVlOyBsZXQgaSA9IGluZGV4OyB0cmFja0J5OiByb3dUcmFja2luZ0ZuXCJcclxuICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcclxuICAgICAgICAgICAgICBbaXNTZWxlY3RlZF09XCJzZWxlY3Rvci5nZXRSb3dTZWxlY3RlZChyb3cpXCJcclxuICAgICAgICAgICAgICBbaW5uZXJXaWR0aF09XCJpbm5lcldpZHRoXCJcclxuICAgICAgICAgICAgICBbb2Zmc2V0WF09XCJvZmZzZXRYXCJcclxuICAgICAgICAgICAgICBbY29sdW1uc109XCJjb2x1bW5zXCJcclxuICAgICAgICAgICAgICBbcm93SGVpZ2h0XT1cImdldFJvd0hlaWdodChyb3cpXCJcclxuICAgICAgICAgICAgICBbcm93XT1cInJvd1wiXHJcbiAgICAgICAgICAgICAgW2dyb3VwXT1cImdyb3VwLnZhbHVlXCJcclxuICAgICAgICAgICAgICBbcm93SW5kZXhdPVwiZ2V0Um93SW5kZXgocm93KVwiXHJcbiAgICAgICAgICAgICAgW2V4cGFuZGVkXT1cImdldFJvd0V4cGFuZGVkKHJvdylcIlxyXG4gICAgICAgICAgICAgIFtyb3dDbGFzc109XCJyb3dDbGFzc1wiXHJcbiAgICAgICAgICAgICAgKGFjdGl2YXRlKT1cInNlbGVjdG9yLm9uQWN0aXZhdGUoJGV2ZW50LCBpKVwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgPC9kYXRhdGFibGUtYm9keS1yb3c+XHJcbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvZGF0YXRhYmxlLXJvdy13cmFwcGVyPlxyXG4gICAgICAgIDxkYXRhdGFibGUtc3VtbWFyeS1yb3dcclxuICAgICAgICAgICpuZ0lmPVwic3VtbWFyeVJvdyAmJiBzdW1tYXJ5UG9zaXRpb24gPT09ICdib3R0b20nXCJcclxuICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEJvdHRvbVN1bW1hcnlSb3dTdHlsZXMoKVwiXHJcbiAgICAgICAgICBbcm93SGVpZ2h0XT1cInN1bW1hcnlIZWlnaHRcIlxyXG4gICAgICAgICAgW29mZnNldFhdPVwib2Zmc2V0WFwiXHJcbiAgICAgICAgICBbaW5uZXJXaWR0aF09XCJpbm5lcldpZHRoXCJcclxuICAgICAgICAgIFtyb3dzXT1cInJvd3NcIlxyXG4gICAgICAgICAgW2NvbHVtbnNdPVwiY29sdW1uc1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvZGF0YXRhYmxlLXN1bW1hcnktcm93PlxyXG4gICAgICA8L2RhdGF0YWJsZS1zY3JvbGxlcj5cclxuICAgICAgPGRpdiBjbGFzcz1cImVtcHR5LXJvd1wiICpuZ0lmPVwiIXJvd3M/Lmxlbmd0aCAmJiAhbG9hZGluZ0luZGljYXRvclwiIFtpbm5lckhUTUxdPVwiZW1wdHlNZXNzYWdlXCI+PC9kaXY+XHJcbiAgICA8L2RhdGF0YWJsZS1zZWxlY3Rpb24+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ2RhdGF0YWJsZS1ib2R5J1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUJvZHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgc2Nyb2xsYmFyVjogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGxvYWRpbmdJbmRpY2F0b3I6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgZXh0ZXJuYWxQYWdpbmc6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcm93SGVpZ2h0OiBudW1iZXIgfCAnYXV0bycgfCAoKHJvdz86IGFueSkgPT4gbnVtYmVyKTtcclxuICBASW5wdXQoKSBvZmZzZXRYOiBudW1iZXI7XHJcbiAgQElucHV0KCkgZW1wdHlNZXNzYWdlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcclxuICBASW5wdXQoKSBzZWxlY3RlZDogYW55W10gPSBbXTtcclxuICBASW5wdXQoKSByb3dJZGVudGl0eTogYW55O1xyXG4gIEBJbnB1dCgpIHJvd0RldGFpbDogYW55O1xyXG4gIEBJbnB1dCgpIGdyb3VwSGVhZGVyOiBhbnk7XHJcbiAgQElucHV0KCkgc2VsZWN0Q2hlY2s6IGFueTtcclxuICBASW5wdXQoKSBkaXNwbGF5Q2hlY2s6IGFueTtcclxuICBASW5wdXQoKSB0cmFja0J5UHJvcDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHJvd0NsYXNzOiBhbnk7XHJcbiAgQElucHV0KCkgZ3JvdXBlZFJvd3M6IGFueTtcclxuICBASW5wdXQoKSBncm91cEV4cGFuc2lvbkRlZmF1bHQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgaW5uZXJXaWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGdyb3VwUm93c0J5OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdmlydHVhbGl6YXRpb246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc3VtbWFyeVJvdzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzdW1tYXJ5UG9zaXRpb246IHN0cmluZztcclxuICBASW5wdXQoKSBzdW1tYXJ5SGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBwYWdlU2l6ZSh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fcGFnZVNpemUgPSB2YWw7XHJcbiAgICB0aGlzLnJlY2FsY0xheW91dCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFnZVNpemU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgcm93cyh2YWw6IGFueVtdKSB7XHJcbiAgICB0aGlzLl9yb3dzID0gdmFsO1xyXG4gICAgdGhpcy5yZWNhbGNMYXlvdXQoKTtcclxuICB9XHJcblxyXG4gIGdldCByb3dzKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLl9yb3dzO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGNvbHVtbnModmFsOiBhbnlbXSkge1xyXG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcclxuICAgIGNvbnN0IGNvbHNCeVBpbiA9IGNvbHVtbnNCeVBpbih2YWwpO1xyXG4gICAgdGhpcy5jb2x1bW5Hcm91cFdpZHRocyA9IGNvbHVtbkdyb3VwV2lkdGhzKGNvbHNCeVBpbiwgdmFsKTtcclxuICB9XHJcblxyXG4gIGdldCBjb2x1bW5zKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IG9mZnNldCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fb2Zmc2V0ID0gdmFsO1xyXG4gICAgdGhpcy5yZWNhbGNMYXlvdXQoKTtcclxuICB9XHJcblxyXG4gIGdldCBvZmZzZXQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgcm93Q291bnQodmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3Jvd0NvdW50ID0gdmFsO1xyXG4gICAgdGhpcy5yZWNhbGNMYXlvdXQoKTtcclxuICB9XHJcblxyXG4gIGdldCByb3dDb3VudCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd0NvdW50O1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpXHJcbiAgZ2V0IGJvZHlXaWR0aCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFySCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbm5lcldpZHRoICsgJ3B4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnMTAwJSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JylcclxuICBzZXQgYm9keUhlaWdodCh2YWwpIHtcclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYpIHtcclxuICAgICAgdGhpcy5fYm9keUhlaWdodCA9IHZhbCArICdweCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9ib2R5SGVpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVjYWxjTGF5b3V0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgYm9keUhlaWdodCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9ib2R5SGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIHNjcm9sbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIHBhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRldGFpbFRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIHJvd0NvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyByb3c6IGFueSB9PihmYWxzZSk7XHJcbiAgQE91dHB1dCgpIHRyZWVBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAVmlld0NoaWxkKFNjcm9sbGVyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSkgc2Nyb2xsZXI6IFNjcm9sbGVyQ29tcG9uZW50O1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIHNlbGVjdGlvbiBpcyBlbmFibGVkLlxyXG4gICAqL1xyXG4gIGdldCBzZWxlY3RFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhdGhpcy5zZWxlY3Rpb25UeXBlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvcGVydHkgdGhhdCB3b3VsZCBjYWxjdWxhdGUgdGhlIGhlaWdodCBvZiBzY3JvbGwgYmFyXHJcbiAgICogYmFzZWQgb24gdGhlIHJvdyBoZWlnaHRzIGNhY2hlIGZvciB2aXJ0dWFsIHNjcm9sbCBhbmQgdmlydHVhbGl6YXRpb24uIE90aGVyIHNjZW5hcmlvc1xyXG4gICAqIGNhbGN1bGF0ZSBzY3JvbGwgaGVpZ2h0IGF1dG9tYXRpY2FsbHkgKGFzIGhlaWdodCB3aWxsIGJlIHVuZGVmaW5lZCkuXHJcbiAgICovXHJcbiAgZ2V0IHNjcm9sbEhlaWdodCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViAmJiB0aGlzLnZpcnR1YWxpemF0aW9uICYmIHRoaXMucm93Q291bnQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucm93SGVpZ2h0c0NhY2hlLnF1ZXJ5KHRoaXMucm93Q291bnQgLSAxKTtcclxuICAgIH1cclxuICAgIC8vIGF2b2lkIFRTNzAzMDogTm90IGFsbCBjb2RlIHBhdGhzIHJldHVybiBhIHZhbHVlLlxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHJvd0hlaWdodHNDYWNoZTogUm93SGVpZ2h0Q2FjaGUgPSBuZXcgUm93SGVpZ2h0Q2FjaGUoKTtcclxuICB0ZW1wOiBhbnlbXSA9IFtdO1xyXG4gIG9mZnNldFkgPSAwO1xyXG4gIGluZGV4ZXM6IGFueSA9IHt9O1xyXG4gIGNvbHVtbkdyb3VwV2lkdGhzOiBhbnk7XHJcbiAgY29sdW1uR3JvdXBXaWR0aHNXaXRob3V0R3JvdXA6IGFueTtcclxuICByb3dUcmFja2luZ0ZuOiBhbnk7XHJcbiAgbGlzdGVuZXI6IGFueTtcclxuICByb3dJbmRleGVzOiBhbnkgPSBuZXcgTWFwKCk7XHJcbiAgcm93RXhwYW5zaW9uczogYW55W10gPSBbXTtcclxuXHJcbiAgX3Jvd3M6IGFueVtdO1xyXG4gIF9ib2R5SGVpZ2h0OiBhbnk7XHJcbiAgX2NvbHVtbnM6IGFueVtdO1xyXG4gIF9yb3dDb3VudDogbnVtYmVyO1xyXG4gIF9vZmZzZXQ6IG51bWJlcjtcclxuICBfcGFnZVNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEYXRhVGFibGVCb2R5Q29tcG9uZW50LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAvLyBkZWNsYXJlIGZuIGhlcmUgc28gd2UgY2FuIGdldCBhY2Nlc3MgdG8gdGhlIGB0aGlzYCBwcm9wZXJ0eVxyXG4gICAgdGhpcy5yb3dUcmFja2luZ0ZuID0gKGluZGV4OiBudW1iZXIsIHJvdzogYW55KTogYW55ID0+IHtcclxuICAgICAgY29uc3QgaWR4ID0gdGhpcy5nZXRSb3dJbmRleChyb3cpO1xyXG4gICAgICBpZiAodGhpcy50cmFja0J5UHJvcCkge1xyXG4gICAgICAgIHJldHVybiByb3dbdGhpcy50cmFja0J5UHJvcF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGlkeDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCBhZnRlciB0aGUgY29uc3RydWN0b3IsIGluaXRpYWxpemluZyBpbnB1dCBwcm9wZXJ0aWVzXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yb3dEZXRhaWwpIHtcclxuICAgICAgdGhpcy5saXN0ZW5lciA9IHRoaXMucm93RGV0YWlsLnRvZ2dsZS5zdWJzY3JpYmUoKHsgdHlwZSwgdmFsdWUgfTogeyB0eXBlOiBzdHJpbmc7IHZhbHVlOiBhbnkgfSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlID09PSAncm93Jykge1xyXG4gICAgICAgICAgdGhpcy50b2dnbGVSb3dFeHBhbnNpb24odmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2FsbCcpIHtcclxuICAgICAgICAgIHRoaXMudG9nZ2xlQWxsUm93cyh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZWZyZXNoIHJvd3MgYWZ0ZXIgdG9nZ2xlXHJcbiAgICAgICAgLy8gRml4ZXMgIzg4M1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5kZXhlcygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUm93cygpO1xyXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmdyb3VwSGVhZGVyKSB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXIgPSB0aGlzLmdyb3VwSGVhZGVyLnRvZ2dsZS5zdWJzY3JpYmUoKHsgdHlwZSwgdmFsdWUgfTogeyB0eXBlOiBzdHJpbmc7IHZhbHVlOiBhbnkgfSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnZ3JvdXAnKSB7XHJcbiAgICAgICAgICB0aGlzLnRvZ2dsZVJvd0V4cGFuc2lvbih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnYWxsJykge1xyXG4gICAgICAgICAgdGhpcy50b2dnbGVBbGxSb3dzKHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlZnJlc2ggcm93cyBhZnRlciB0b2dnbGVcclxuICAgICAgICAvLyBGaXhlcyAjODgzXHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmRleGVzKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVSb3dzKCk7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgb25jZSwgYmVmb3JlIHRoZSBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yb3dEZXRhaWwgfHwgdGhpcy5ncm91cEhlYWRlcikge1xyXG4gICAgICB0aGlzLmxpc3RlbmVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBZIG9mZnNldCBnaXZlbiBhIG5ldyBvZmZzZXQuXHJcbiAgICovXHJcbiAgdXBkYXRlT2Zmc2V0WShvZmZzZXQ/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIC8vIHNjcm9sbGVyIGlzIG1pc3Npbmcgb24gZW1wdHkgdGFibGVcclxuICAgIGlmICghdGhpcy5zY3JvbGxlcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViAmJiB0aGlzLnZpcnR1YWxpemF0aW9uICYmIG9mZnNldCkge1xyXG4gICAgICAvLyBGaXJzdCBnZXQgdGhlIHJvdyBJbmRleCB0aGF0IHdlIG5lZWQgdG8gbW92ZSB0by5cclxuICAgICAgY29uc3Qgcm93SW5kZXggPSB0aGlzLnBhZ2VTaXplICogb2Zmc2V0O1xyXG4gICAgICBvZmZzZXQgPSB0aGlzLnJvd0hlaWdodHNDYWNoZS5xdWVyeShyb3dJbmRleCAtIDEpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgIXRoaXMudmlydHVhbGl6YXRpb24pIHtcclxuICAgICAgb2Zmc2V0ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbGVyLnNldE9mZnNldChvZmZzZXQgfHwgMCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCb2R5IHdhcyBzY3JvbGxlZCwgdGhpcyBpcyBtYWlubHkgdXNlZnVsIGZvclxyXG4gICAqIHdoZW4gYSB1c2VyIGlzIHNlcnZlci1zaWRlIHBhZ2luYXRpb24gdmlhIHZpcnR1YWwgc2Nyb2xsLlxyXG4gICAqL1xyXG4gIG9uQm9keVNjcm9sbChldmVudDogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCBzY3JvbGxZUG9zOiBudW1iZXIgPSBldmVudC5zY3JvbGxZUG9zO1xyXG4gICAgY29uc3Qgc2Nyb2xsWFBvczogbnVtYmVyID0gZXZlbnQuc2Nyb2xsWFBvcztcclxuXHJcbiAgICAvLyBpZiBzY3JvbGwgY2hhbmdlLCB0cmlnZ2VyIHVwZGF0ZVxyXG4gICAgLy8gdGhpcyBpcyBtYWlubHkgdXNlZCBmb3IgaGVhZGVyIGNlbGwgcG9zaXRpb25zXHJcbiAgICBpZiAodGhpcy5vZmZzZXRZICE9PSBzY3JvbGxZUG9zIHx8IHRoaXMub2Zmc2V0WCAhPT0gc2Nyb2xsWFBvcykge1xyXG4gICAgICB0aGlzLnNjcm9sbC5lbWl0KHtcclxuICAgICAgICBvZmZzZXRZOiBzY3JvbGxZUG9zLFxyXG4gICAgICAgIG9mZnNldFg6IHNjcm9sbFhQb3NcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vZmZzZXRZID0gc2Nyb2xsWVBvcztcclxuICAgIHRoaXMub2Zmc2V0WCA9IHNjcm9sbFhQb3M7XHJcblxyXG4gICAgdGhpcy51cGRhdGVJbmRleGVzKCk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhZ2UoZXZlbnQuZGlyZWN0aW9uKTtcclxuICAgIHRoaXMudXBkYXRlUm93cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgcGFnZSBnaXZlbiBhIGRpcmVjdGlvbi5cclxuICAgKi9cclxuICB1cGRhdGVQYWdlKGRpcmVjdGlvbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5pbmRleGVzLmZpcnN0IC8gdGhpcy5wYWdlU2l6ZTtcclxuXHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAndXAnKSB7XHJcbiAgICAgIG9mZnNldCA9IE1hdGguY2VpbChvZmZzZXQpO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJykge1xyXG4gICAgICBvZmZzZXQgPSBNYXRoLmZsb29yKG9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkICYmICFpc05hTihvZmZzZXQpKSB7XHJcbiAgICAgIHRoaXMucGFnZS5lbWl0KHsgb2Zmc2V0IH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgcm93cyBpbiB0aGUgdmlldyBwb3J0XHJcbiAgICovXHJcbiAgdXBkYXRlUm93cygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHsgZmlyc3QsIGxhc3QgfSA9IHRoaXMuaW5kZXhlcztcclxuICAgIGxldCByb3dJbmRleCA9IGZpcnN0O1xyXG4gICAgbGV0IGlkeCA9IDA7XHJcbiAgICBjb25zdCB0ZW1wOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIHRoaXMucm93SW5kZXhlcy5jbGVhcigpO1xyXG5cclxuICAgIC8vIGlmIGdyb3Vwcm93c2J5IGhhcyBiZWVuIHNwZWNpZmllZCB0cmVhdCByb3cgcGFnaW5nXHJcbiAgICAvLyBwYXJhbWV0ZXJzIGFzIGdyb3VwIHBhZ2luZyBwYXJhbWV0ZXJzIGllIGlmIGxpbWl0IDEwIGhhcyBiZWVuXHJcbiAgICAvLyBzcGVjaWZpZWQgdHJlYXQgaXQgYXMgMTAgZ3JvdXBzIHJhdGhlciB0aGFuIDEwIHJvd3NcclxuICAgIGlmICh0aGlzLmdyb3VwZWRSb3dzKSB7XHJcbiAgICAgIGxldCBtYXhSb3dzUGVyR3JvdXAgPSAzO1xyXG4gICAgICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSBncm91cCBzZXQgdGhlIG1heGltdW0gbnVtYmVyIG9mXHJcbiAgICAgIC8vIHJvd3MgcGVyIGdyb3VwIHRoZSBzYW1lIGFzIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93c1xyXG4gICAgICBpZiAodGhpcy5ncm91cGVkUm93cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBtYXhSb3dzUGVyR3JvdXAgPSB0aGlzLmdyb3VwZWRSb3dzWzBdLnZhbHVlLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgd2hpbGUgKHJvd0luZGV4IDwgbGFzdCAmJiByb3dJbmRleCA8IHRoaXMuZ3JvdXBlZFJvd3MubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gQWRkIHRoZSBncm91cHMgaW50byB0aGlzIHBhZ2VcclxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZ3JvdXBlZFJvd3Nbcm93SW5kZXhdO1xyXG4gICAgICAgIHRlbXBbaWR4XSA9IGdyb3VwO1xyXG4gICAgICAgIGlkeCsrO1xyXG5cclxuICAgICAgICAvLyBHcm91cCBpbmRleCBpbiB0aGlzIGNvbnRleHRcclxuICAgICAgICByb3dJbmRleCsrO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aGlsZSAocm93SW5kZXggPCBsYXN0ICYmIHJvd0luZGV4IDwgdGhpcy5yb3dDb3VudCkge1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMucm93c1tyb3dJbmRleF07XHJcblxyXG4gICAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICAgIHRoaXMucm93SW5kZXhlcy5zZXQocm93LCByb3dJbmRleCk7XHJcbiAgICAgICAgICB0ZW1wW2lkeF0gPSByb3c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZHgrKztcclxuICAgICAgICByb3dJbmRleCsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50ZW1wID0gdGVtcDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgcm93IGhlaWdodFxyXG4gICAqL1xyXG4gIGdldFJvd0hlaWdodChyb3c6IGFueSk6IG51bWJlciB7XHJcbiAgICAvLyBpZiBpdHMgYSBmdW5jdGlvbiByZXR1cm4gaXRcclxuICAgIGlmICh0eXBlb2YgdGhpcy5yb3dIZWlnaHQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucm93SGVpZ2h0KHJvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucm93SGVpZ2h0IGFzIG51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBncm91cCB0aGUgZ3JvdXAgd2l0aCBhbGwgcm93c1xyXG4gICAqL1xyXG4gIGdldEdyb3VwSGVpZ2h0KGdyb3VwOiBhbnkpOiBudW1iZXIge1xyXG4gICAgbGV0IHJvd0hlaWdodCA9IDA7XHJcblxyXG4gICAgaWYgKGdyb3VwLnZhbHVlKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBncm91cC52YWx1ZS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICByb3dIZWlnaHQgKz0gdGhpcy5nZXRSb3dBbmREZXRhaWxIZWlnaHQoZ3JvdXAudmFsdWVbaW5kZXhdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByb3dIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgcm93IGhlaWdodCBiYXNlZCBvbiB0aGUgZXhwYW5kZWQgc3RhdGUgb2YgdGhlIHJvdy5cclxuICAgKi9cclxuICBnZXRSb3dBbmREZXRhaWxIZWlnaHQocm93OiBhbnkpOiBudW1iZXIge1xyXG4gICAgbGV0IHJvd0hlaWdodCA9IHRoaXMuZ2V0Um93SGVpZ2h0KHJvdyk7XHJcbiAgICBjb25zdCBleHBhbmRlZCA9IHRoaXMuZ2V0Um93RXhwYW5kZWQocm93KTtcclxuXHJcbiAgICAvLyBBZGRpbmcgZGV0YWlsIHJvdyBoZWlnaHQgaWYgaXRzIGV4cGFuZGVkLlxyXG4gICAgaWYgKGV4cGFuZGVkKSB7XHJcbiAgICAgIHJvd0hlaWdodCArPSB0aGlzLmdldERldGFpbFJvd0hlaWdodChyb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByb3dIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGhlaWdodCBvZiB0aGUgZGV0YWlsIHJvdy5cclxuICAgKi9cclxuICBnZXREZXRhaWxSb3dIZWlnaHQgPSAocm93PzogYW55LCBpbmRleD86IGFueSk6IG51bWJlciA9PiB7XHJcbiAgICBpZiAoIXRoaXMucm93RGV0YWlsKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgcm93SGVpZ2h0ID0gdGhpcy5yb3dEZXRhaWwucm93SGVpZ2h0O1xyXG4gICAgcmV0dXJuIHR5cGVvZiByb3dIZWlnaHQgPT09ICdmdW5jdGlvbicgPyByb3dIZWlnaHQocm93LCBpbmRleCkgOiAocm93SGVpZ2h0IGFzIG51bWJlcik7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3R5bGVzIGZvciB0aGUgcm93IHNvIHRoYXQgdGhlIHJvd3MgY2FuIGJlIG1vdmVkIGluIDJEIHNwYWNlXHJcbiAgICogZHVyaW5nIHZpcnR1YWwgc2Nyb2xsIGluc2lkZSB0aGUgRE9NLiAgIEluIHRoZSBiZWxvdyBjYXNlIHRoZSBZIHBvc2l0aW9uIGlzXHJcbiAgICogbWFuaXB1bGF0ZWQuICAgQXMgYW4gZXhhbXBsZSwgaWYgdGhlIGhlaWdodCBvZiByb3cgMCBpcyAzMCBweCBhbmQgcm93IDEgaXNcclxuICAgKiAxMDAgcHggdGhlbiBmb2xsb3dpbmcgc3R5bGVzIGFyZSBnZW5lcmF0ZWQ6XHJcbiAgICpcclxuICAgKiB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpOyAgICAtPiAgcm93MFxyXG4gICAqIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAzMHB4LCAwcHgpOyAgIC0+ICByb3cxXHJcbiAgICogdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDEzMHB4LCAwcHgpOyAgLT4gIHJvdzJcclxuICAgKlxyXG4gICAqIFJvdyBoZWlnaHRzIGhhdmUgdG8gYmUgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgcm93IGhlaWdodHMgY2FjaGUgYXMgd2Ugd29udFxyXG4gICAqIGJlIGFibGUgdG8gZGV0ZXJtaW5lIHdoaWNoIHJvdyBpcyBvZiB3aGF0IGhlaWdodCBiZWZvcmUgaGFuZC4gIEluIHRoZSBhYm92ZVxyXG4gICAqIGNhc2UgdGhlIHBvc2l0aW9uWSBvZiB0aGUgdHJhbnNsYXRlM2QgZm9yIHJvdzIgd291bGQgYmUgdGhlIHN1bSBvZiBhbGwgdGhlXHJcbiAgICogaGVpZ2h0cyBvZiB0aGUgcm93cyBiZWZvcmUgaXQgKGkuZS4gcm93MCBhbmQgcm93MSkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm93cyB0aGUgcm93IHRoYXQgbmVlZHMgdG8gYmUgcGxhY2VkIGluIHRoZSAyRCBzcGFjZS5cclxuICAgKiBAcmV0dXJucyB0aGUgQ1NTMyBzdHlsZSB0byBiZSBhcHBsaWVkXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgRGF0YVRhYmxlQm9keUNvbXBvbmVudFxyXG4gICAqL1xyXG4gIGdldFJvd3NTdHlsZXMocm93czogYW55KTogYW55IHtcclxuICAgIGNvbnN0IHN0eWxlczogYW55ID0ge307XHJcblxyXG4gICAgLy8gb25seSBhZGQgc3R5bGVzIGZvciB0aGUgZ3JvdXAgaWYgdGhlcmUgaXMgYSBncm91cFxyXG4gICAgaWYgKHRoaXMuZ3JvdXBlZFJvd3MpIHtcclxuICAgICAgc3R5bGVzLndpZHRoID0gdGhpcy5jb2x1bW5Hcm91cFdpZHRocy50b3RhbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWICYmIHRoaXMudmlydHVhbGl6YXRpb24pIHtcclxuICAgICAgbGV0IGlkeCA9IDA7XHJcblxyXG4gICAgICBpZiAodGhpcy5ncm91cGVkUm93cykge1xyXG4gICAgICAgIC8vIEdldCB0aGUgbGF0ZXN0IHJvdyByb3dpbmRleCBpbiBhIGdyb3VwXHJcbiAgICAgICAgY29uc3Qgcm93ID0gcm93c1tyb3dzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlkeCA9IHJvdyA/IHRoaXMuZ2V0Um93SW5kZXgocm93KSA6IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWR4ID0gdGhpcy5nZXRSb3dJbmRleChyb3dzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY29uc3QgcG9zID0gaWR4ICogcm93SGVpZ2h0O1xyXG4gICAgICAvLyBUaGUgcG9zaXRpb24gb2YgdGhpcyByb3cgd291bGQgYmUgdGhlIHN1bSBvZiBhbGwgcm93IGhlaWdodHNcclxuICAgICAgLy8gdW50aWwgdGhlIHByZXZpb3VzIHJvdyBwb3NpdGlvbi5cclxuICAgICAgY29uc3QgcG9zID0gdGhpcy5yb3dIZWlnaHRzQ2FjaGUucXVlcnkoaWR4IC0gMSk7XHJcblxyXG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIDAsIHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0eWxlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZSBib3R0b20gc3VtbWFyeSByb3cgb2Zmc2V0IGZvciBzY3JvbGxiYXIgbW9kZS5cclxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBjYWNoZSBhbmQgb2Zmc2V0IGNhbGN1bGF0aW9uXHJcbiAgICogc2VlIGRlc2NyaXB0aW9uIGZvciBgZ2V0Um93c1N0eWxlc2AgbWV0aG9kXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB0aGUgQ1NTMyBzdHlsZSB0byBiZSBhcHBsaWVkXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgRGF0YVRhYmxlQm9keUNvbXBvbmVudFxyXG4gICAqL1xyXG4gIGdldEJvdHRvbVN1bW1hcnlSb3dTdHlsZXMoKTogYW55IHtcclxuICAgIGlmICghdGhpcy5zY3JvbGxiYXJWIHx8ICF0aGlzLnJvd3MgfHwgIXRoaXMucm93cy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3R5bGVzID0geyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9O1xyXG4gICAgY29uc3QgcG9zID0gdGhpcy5yb3dIZWlnaHRzQ2FjaGUucXVlcnkodGhpcy5yb3dzLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgIHRyYW5zbGF0ZVhZKHN0eWxlcywgMCwgcG9zKTtcclxuXHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZXMgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXHJcbiAgICovXHJcbiAgaGlkZUluZGljYXRvcigpOiB2b2lkIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXMubG9hZGluZ0luZGljYXRvciA9IGZhbHNlKSwgNTAwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIGluZGV4IG9mIHRoZSByb3dzIGluIHRoZSB2aWV3cG9ydFxyXG4gICAqL1xyXG4gIHVwZGF0ZUluZGV4ZXMoKTogdm9pZCB7XHJcbiAgICBsZXQgZmlyc3QgPSAwO1xyXG4gICAgbGV0IGxhc3QgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYpIHtcclxuICAgICAgaWYgKHRoaXMudmlydHVhbGl6YXRpb24pIHtcclxuICAgICAgICAvLyBDYWxjdWxhdGlvbiBvZiB0aGUgZmlyc3QgYW5kIGxhc3QgaW5kZXhlcyB3aWxsIGJlIGJhc2VkIG9uIHdoZXJlIHRoZVxyXG4gICAgICAgIC8vIHNjcm9sbFkgcG9zaXRpb24gd291bGQgYmUgYXQuICBUaGUgbGFzdCBpbmRleCB3b3VsZCBiZSB0aGUgb25lXHJcbiAgICAgICAgLy8gdGhhdCBzaG93cyB1cCBpbnNpZGUgdGhlIHZpZXcgcG9ydCB0aGUgbGFzdC5cclxuICAgICAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUludCh0aGlzLmJvZHlIZWlnaHQsIDApO1xyXG4gICAgICAgIGZpcnN0ID0gdGhpcy5yb3dIZWlnaHRzQ2FjaGUuZ2V0Um93SW5kZXgodGhpcy5vZmZzZXRZKTtcclxuICAgICAgICBsYXN0ID0gdGhpcy5yb3dIZWlnaHRzQ2FjaGUuZ2V0Um93SW5kZXgoaGVpZ2h0ICsgdGhpcy5vZmZzZXRZKSArIDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gSWYgdmlydHVhbCByb3dzIGFyZSBub3QgbmVlZGVkXHJcbiAgICAgICAgLy8gV2UgcmVuZGVyIGFsbCBpbiBvbmUgZ29cclxuICAgICAgICBmaXJzdCA9IDA7XHJcbiAgICAgICAgbGFzdCA9IHRoaXMucm93Q291bnQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFRoZSBzZXJ2ZXIgaXMgaGFuZGxpbmcgcGFnaW5nIGFuZCB3aWxsIHBhc3MgYW4gYXJyYXkgdGhhdCBiZWdpbnMgd2l0aCB0aGVcclxuICAgICAgLy8gZWxlbWVudCBhdCBhIHNwZWNpZmllZCBvZmZzZXQuICBmaXJzdCBzaG91bGQgYWx3YXlzIGJlIDAgd2l0aCBleHRlcm5hbCBwYWdpbmcuXHJcbiAgICAgIGlmICghdGhpcy5leHRlcm5hbFBhZ2luZykge1xyXG4gICAgICAgIGZpcnN0ID0gTWF0aC5tYXgodGhpcy5vZmZzZXQgKiB0aGlzLnBhZ2VTaXplLCAwKTtcclxuICAgICAgfVxyXG4gICAgICBsYXN0ID0gTWF0aC5taW4oZmlyc3QgKyB0aGlzLnBhZ2VTaXplLCB0aGlzLnJvd0NvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluZGV4ZXMgPSB7IGZpcnN0LCBsYXN0IH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZyZXNoZXMgdGhlIGZ1bGwgUm93IEhlaWdodCBjYWNoZS4gIFNob3VsZCBiZSB1c2VkXHJcbiAgICogd2hlbiB0aGUgZW50aXJlIHJvdyBhcnJheSBzdGF0ZSBoYXMgY2hhbmdlZC5cclxuICAgKi9cclxuICByZWZyZXNoUm93SGVpZ2h0Q2FjaGUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuc2Nyb2xsYmFyViB8fCAodGhpcy5zY3JvbGxiYXJWICYmICF0aGlzLnZpcnR1YWxpemF0aW9uKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2xlYXIgdGhlIHByZXZpb3VzIHJvdyBoZWlnaHQgY2FjaGUgaWYgYWxyZWFkeSBwcmVzZW50LlxyXG4gICAgLy8gdGhpcyBpcyB1c2VmdWwgZHVyaW5nIHNvcnRzLCBmaWx0ZXJzIHdoZXJlIHRoZSBzdGF0ZSBvZiB0aGVcclxuICAgIC8vIHJvd3MgYXJyYXkgaXMgY2hhbmdlZC5cclxuICAgIHRoaXMucm93SGVpZ2h0c0NhY2hlLmNsZWFyQ2FjaGUoKTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplIHRoZSB0cmVlIG9ubHkgaWYgdGhlcmUgYXJlIHJvd3MgaW5zaWRlIHRoZSB0cmVlLlxyXG4gICAgaWYgKHRoaXMucm93cyAmJiB0aGlzLnJvd3MubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IHJvd0V4cGFuc2lvbnMgPSBuZXcgU2V0KCk7XHJcbiAgICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMucm93cykge1xyXG4gICAgICAgIGlmICh0aGlzLmdldFJvd0V4cGFuZGVkKHJvdykpIHtcclxuICAgICAgICAgIHJvd0V4cGFuc2lvbnMuYWRkKHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnJvd0hlaWdodHNDYWNoZS5pbml0Q2FjaGUoe1xyXG4gICAgICAgIHJvd3M6IHRoaXMucm93cyxcclxuICAgICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxyXG4gICAgICAgIGRldGFpbFJvd0hlaWdodDogdGhpcy5nZXREZXRhaWxSb3dIZWlnaHQsXHJcbiAgICAgICAgZXh0ZXJuYWxWaXJ0dWFsOiB0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy5leHRlcm5hbFBhZ2luZyxcclxuICAgICAgICByb3dDb3VudDogdGhpcy5yb3dDb3VudCxcclxuICAgICAgICByb3dJbmRleGVzOiB0aGlzLnJvd0luZGV4ZXMsXHJcbiAgICAgICAgcm93RXhwYW5zaW9uc1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGluZGV4IGZvciB0aGUgdmlldyBwb3J0XHJcbiAgICovXHJcbiAgZ2V0QWRqdXN0ZWRWaWV3UG9ydEluZGV4KCk6IG51bWJlciB7XHJcbiAgICAvLyBDYXB0dXJlIHRoZSByb3cgaW5kZXggb2YgdGhlIGZpcnN0IHJvdyB0aGF0IGlzIHZpc2libGUgb24gdGhlIHZpZXdwb3J0LlxyXG4gICAgLy8gSWYgdGhlIHNjcm9sbCBiYXIgaXMganVzdCBiZWxvdyB0aGUgcm93IHdoaWNoIGlzIGhpZ2hsaWdodGVkIHRoZW4gbWFrZSB0aGF0IGFzIHRoZVxyXG4gICAgLy8gZmlyc3QgaW5kZXguXHJcbiAgICBjb25zdCB2aWV3UG9ydEZpcnN0Um93SW5kZXggPSB0aGlzLmluZGV4ZXMuZmlyc3Q7XHJcblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViAmJiB0aGlzLnZpcnR1YWxpemF0aW9uKSB7XHJcbiAgICAgIGNvbnN0IG9mZnNldFNjcm9sbCA9IHRoaXMucm93SGVpZ2h0c0NhY2hlLnF1ZXJ5KHZpZXdQb3J0Rmlyc3RSb3dJbmRleCAtIDEpO1xyXG4gICAgICByZXR1cm4gb2Zmc2V0U2Nyb2xsIDw9IHRoaXMub2Zmc2V0WSA/IHZpZXdQb3J0Rmlyc3RSb3dJbmRleCAtIDEgOiB2aWV3UG9ydEZpcnN0Um93SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZpZXdQb3J0Rmlyc3RSb3dJbmRleDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSB0aGUgRXhwYW5zaW9uIG9mIHRoZSByb3cgaS5lLiBpZiB0aGUgcm93IGlzIGV4cGFuZGVkIHRoZW4gaXQgd2lsbFxyXG4gICAqIGNvbGxhcHNlIGFuZCB2aWNlIHZlcnNhLiAgIE5vdGUgdGhhdCB0aGUgZXhwYW5kZWQgc3RhdHVzIGlzIHN0b3JlZCBhc1xyXG4gICAqIGEgcGFydCBvZiB0aGUgcm93IG9iamVjdCBpdHNlbGYgYXMgd2UgaGF2ZSB0byBwcmVzZXJ2ZSB0aGUgZXhwYW5kZWQgcm93XHJcbiAgICogc3RhdHVzIGluIGNhc2Ugb2Ygc29ydGluZyBhbmQgZmlsdGVyaW5nIG9mIHRoZSByb3cgc2V0LlxyXG4gICAqL1xyXG4gIHRvZ2dsZVJvd0V4cGFuc2lvbihyb3c6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gQ2FwdHVyZSB0aGUgcm93IGluZGV4IG9mIHRoZSBmaXJzdCByb3cgdGhhdCBpcyB2aXNpYmxlIG9uIHRoZSB2aWV3cG9ydC5cclxuICAgIGNvbnN0IHZpZXdQb3J0Rmlyc3RSb3dJbmRleCA9IHRoaXMuZ2V0QWRqdXN0ZWRWaWV3UG9ydEluZGV4KCk7XHJcbiAgICBjb25zdCByb3dFeHBhbmRlZElkeCA9IHRoaXMuZ2V0Um93RXhwYW5kZWRJZHgocm93LCB0aGlzLnJvd0V4cGFuc2lvbnMpO1xyXG4gICAgY29uc3QgZXhwYW5kZWQgPSByb3dFeHBhbmRlZElkeCA+IC0xO1xyXG5cclxuICAgIC8vIElmIHRoZSBkZXRhaWxSb3dIZWlnaHQgaXMgYXV0byAtLT4gb25seSBpbiBjYXNlIG9mIG5vbi12aXJ0dWFsaXplZCBzY3JvbGxcclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbikge1xyXG4gICAgICBjb25zdCBkZXRhaWxSb3dIZWlnaHQgPSB0aGlzLmdldERldGFpbFJvd0hlaWdodChyb3cpICogKGV4cGFuZGVkID8gLTEgOiAxKTtcclxuICAgICAgLy8gY29uc3QgaWR4ID0gdGhpcy5yb3dJbmRleGVzLmdldChyb3cpIHx8IDA7XHJcbiAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZ2V0Um93SW5kZXgocm93KTtcclxuICAgICAgdGhpcy5yb3dIZWlnaHRzQ2FjaGUudXBkYXRlKGlkeCwgZGV0YWlsUm93SGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgdGhlIHRvZ2dsZWQgcm93IGFuZCB1cGRhdGUgdGhpdmUgbmV2ZXJlIGhlaWdodHMgaW4gdGhlIGNhY2hlLlxyXG4gICAgaWYgKGV4cGFuZGVkKSB7XHJcbiAgICAgIHRoaXMucm93RXhwYW5zaW9ucy5zcGxpY2Uocm93RXhwYW5kZWRJZHgsIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yb3dFeHBhbnNpb25zLnB1c2gocm93KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRldGFpbFRvZ2dsZS5lbWl0KHtcclxuICAgICAgcm93czogW3Jvd10sXHJcbiAgICAgIGN1cnJlbnRJbmRleDogdmlld1BvcnRGaXJzdFJvd0luZGV4XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cGFuZC9Db2xsYXBzZSBhbGwgdGhlIHJvd3Mgbm8gbWF0dGVyIHdoYXQgdGhlaXIgc3RhdGUgaXMuXHJcbiAgICovXHJcbiAgdG9nZ2xlQWxsUm93cyhleHBhbmRlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgLy8gY2xlYXIgcHJldiBleHBhbnNpb25zXHJcbiAgICB0aGlzLnJvd0V4cGFuc2lvbnMgPSBbXTtcclxuXHJcbiAgICAvLyBDYXB0dXJlIHRoZSByb3cgaW5kZXggb2YgdGhlIGZpcnN0IHJvdyB0aGF0IGlzIHZpc2libGUgb24gdGhlIHZpZXdwb3J0LlxyXG4gICAgY29uc3Qgdmlld1BvcnRGaXJzdFJvd0luZGV4ID0gdGhpcy5nZXRBZGp1c3RlZFZpZXdQb3J0SW5kZXgoKTtcclxuXHJcbiAgICBpZiAoZXhwYW5kZWQpIHtcclxuICAgICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5yb3dzKSB7XHJcbiAgICAgICAgdGhpcy5yb3dFeHBhbnNpb25zLnB1c2gocm93KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYpIHtcclxuICAgICAgLy8gUmVmcmVzaCB0aGUgZnVsbCByb3cgaGVpZ2h0cyBjYWNoZSBzaW5jZSBldmVyeSByb3cgd2FzIGFmZmVjdGVkLlxyXG4gICAgICB0aGlzLnJlY2FsY0xheW91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVtaXQgYWxsIHJvd3MgdGhhdCBoYXZlIGJlZW4gZXhwYW5kZWQuXHJcbiAgICB0aGlzLmRldGFpbFRvZ2dsZS5lbWl0KHtcclxuICAgICAgcm93czogdGhpcy5yb3dzLFxyXG4gICAgICBjdXJyZW50SW5kZXg6IHZpZXdQb3J0Rmlyc3RSb3dJbmRleFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWNhbGN1bGF0ZXMgdGhlIHRhYmxlXHJcbiAgICovXHJcbiAgcmVjYWxjTGF5b3V0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWZyZXNoUm93SGVpZ2h0Q2FjaGUoKTtcclxuICAgIHRoaXMudXBkYXRlSW5kZXhlcygpO1xyXG4gICAgdGhpcy51cGRhdGVSb3dzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFja3MgdGhlIGNvbHVtblxyXG4gICAqL1xyXG4gIGNvbHVtblRyYWNraW5nRm4oaW5kZXg6IG51bWJlciwgY29sdW1uOiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIGNvbHVtbi4kJGlkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgcm93IHBpbm5pbmcgZ3JvdXAgc3R5bGVzXHJcbiAgICovXHJcbiAgc3R5bGVzQnlHcm91cChncm91cDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB3aWR0aHMgPSB0aGlzLmNvbHVtbkdyb3VwV2lkdGhzO1xyXG4gICAgY29uc3Qgb2Zmc2V0WCA9IHRoaXMub2Zmc2V0WDtcclxuXHJcbiAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgIHdpZHRoOiBgJHt3aWR0aHNbZ3JvdXBdfXB4YFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZ3JvdXAgPT09ICdsZWZ0Jykge1xyXG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIG9mZnNldFgsIDApO1xyXG4gICAgfSBlbHNlIGlmIChncm91cCA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICBjb25zdCBib2R5V2lkdGggPSBwYXJzZUludCh0aGlzLmlubmVyV2lkdGggKyAnJywgMCk7XHJcbiAgICAgIGNvbnN0IHRvdGFsRGlmZiA9IHdpZHRocy50b3RhbCAtIGJvZHlXaWR0aDtcclxuICAgICAgY29uc3Qgb2Zmc2V0RGlmZiA9IHRvdGFsRGlmZiAtIG9mZnNldFg7XHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IG9mZnNldERpZmYgKiAtMTtcclxuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXQsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIHRoZSByb3cgd2FzIGV4cGFuZGVkIGFuZCBzZXQgZGVmYXVsdCByb3cgZXhwYW5zaW9uIHdoZW4gcm93IGV4cGFuc2lvbiBpcyBlbXB0eVxyXG4gICAqL1xyXG4gIGdldFJvd0V4cGFuZGVkKHJvdzogYW55KTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5yb3dFeHBhbnNpb25zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmdyb3VwRXhwYW5zaW9uRGVmYXVsdCkge1xyXG4gICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMuZ3JvdXBlZFJvd3MpIHtcclxuICAgICAgICB0aGlzLnJvd0V4cGFuc2lvbnMucHVzaChncm91cCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRSb3dFeHBhbmRlZElkeChyb3csIHRoaXMucm93RXhwYW5zaW9ucykgPiAtMTtcclxuICB9XHJcblxyXG4gIGdldFJvd0V4cGFuZGVkSWR4KHJvdzogYW55LCBleHBhbmRlZDogYW55W10pOiBudW1iZXIge1xyXG4gICAgaWYgKCFleHBhbmRlZCB8fCAhZXhwYW5kZWQubGVuZ3RoKSByZXR1cm4gLTE7XHJcblxyXG4gICAgY29uc3Qgcm93SWQgPSB0aGlzLnJvd0lkZW50aXR5KHJvdyk7XHJcbiAgICByZXR1cm4gZXhwYW5kZWQuZmluZEluZGV4KChyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5yb3dJZGVudGl0eShyKTtcclxuICAgICAgcmV0dXJuIGlkID09PSByb3dJZDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgcm93IGluZGV4IGdpdmVuIGEgcm93XHJcbiAgICovXHJcbiAgZ2V0Um93SW5kZXgocm93OiBhbnkpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucm93SW5kZXhlcy5nZXQocm93KSB8fCAwO1xyXG4gIH1cclxuXHJcbiAgb25UcmVlQWN0aW9uKHJvdzogYW55KSB7XHJcbiAgICB0aGlzLnRyZWVBY3Rpb24uZW1pdCh7IHJvdyB9KTtcclxuICB9XHJcbn1cclxuIl19