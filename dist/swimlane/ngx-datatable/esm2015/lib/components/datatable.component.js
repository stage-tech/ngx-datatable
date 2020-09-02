/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ElementRef, EventEmitter, ViewChild, HostListener, ContentChildren, QueryList, HostBinding, ContentChild, KeyValueDiffers, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, SkipSelf, Optional, Inject } from '@angular/core';
import { DatatableGroupHeaderDirective } from './body/body-group-header.directive';
import { BehaviorSubject } from 'rxjs';
import { groupRowsByParents, optionalGetterForProp } from '../utils/tree';
import { setColumnDefaults, translateTemplates } from '../utils/column-helper';
import { ColumnMode } from '../types/column-mode.type';
import { SelectionType } from '../types/selection.type';
import { SortType } from '../types/sort.type';
import { ContextmenuType } from '../types/contextmenu.type';
import { DataTableColumnDirective } from './columns/column.directive';
import { DatatableRowDetailDirective } from './row-detail/row-detail.directive';
import { DatatableFooterDirective } from './footer/footer.directive';
import { DataTableBodyComponent } from './body/body.component';
import { DataTableHeaderComponent } from './header/header.component';
import { ScrollbarHelper } from '../services/scrollbar-helper.service';
import { ColumnChangesService } from '../services/column-changes.service';
import { DimensionsHelper } from '../services/dimensions-helper.service';
import { throttleable } from '../utils/throttle';
import { forceFillColumnWidths, adjustColumnWidths } from '../utils/math';
import { sortRows } from '../utils/sort';
export class DatatableComponent {
    /**
     * @param {?} scrollbarHelper
     * @param {?} dimensionsHelper
     * @param {?} cd
     * @param {?} element
     * @param {?} differs
     * @param {?} columnChangesService
     * @param {?} configuration
     */
    constructor(scrollbarHelper, dimensionsHelper, cd, element, differs, columnChangesService, configuration) {
        this.scrollbarHelper = scrollbarHelper;
        this.dimensionsHelper = dimensionsHelper;
        this.cd = cd;
        this.columnChangesService = columnChangesService;
        this.configuration = configuration;
        /**
         * List of row objects that should be
         * represented as selected in the grid.
         * Default value: `[]`
         */
        this.selected = [];
        /**
         * Enable vertical scrollbars
         */
        this.scrollbarV = false;
        /**
         * Enable horz scrollbars
         */
        this.scrollbarH = false;
        /**
         * The row height; which is necessary
         * to calculate the height for the lazy rendering.
         */
        this.rowHeight = 30;
        /**
         * Type of column width distribution formula.
         * Example: flex, force, standard
         */
        this.columnMode = ColumnMode.standard;
        /**
         * The minimum header height in pixels.
         * Pass a falsey for no header
         */
        this.headerHeight = 30;
        /**
         * The minimum footer height in pixels.
         * Pass falsey for no footer
         */
        this.footerHeight = 0;
        /**
         * If the table should use external paging
         * otherwise its assumed that all data is preloaded.
         */
        this.externalPaging = false;
        /**
         * If the table should use external sorting or
         * the built-in basic sorting.
         */
        this.externalSorting = false;
        /**
         * Show the linear loading bar.
         * Default value: `false`
         */
        this.loadingIndicator = false;
        /**
         * Enable/Disable ability to re-order columns
         * by dragging them.
         */
        this.reorderable = true;
        /**
         * Swap columns on re-order columns or
         * move them.
         */
        this.swapColumns = true;
        /**
         * The type of sorting
         */
        this.sortType = SortType.single;
        /**
         * Array of sorted columns by property and type.
         * Default value: `[]`
         */
        this.sorts = [];
        /**
         * Css class overrides
         */
        this.cssClasses = {
            sortAscending: 'datatable-icon-up',
            sortDescending: 'datatable-icon-down',
            pagerLeftArrow: 'datatable-icon-left',
            pagerRightArrow: 'datatable-icon-right',
            pagerPrevious: 'datatable-icon-prev',
            pagerNext: 'datatable-icon-skip'
        };
        /**
         * Message overrides for localization
         *
         * emptyMessage     [default] = 'No data to display'
         * totalMessage     [default] = 'total'
         * selectedMessage  [default] = 'selected'
         */
        this.messages = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total',
            // Footer selected message
            selectedMessage: 'selected'
        };
        /**
         * A boolean you can use to set the detault behaviour of rows and groups
         * whether they will start expanded or not. If ommited the default is NOT expanded.
         *
         */
        this.groupExpansionDefault = false;
        /**
         * Property to which you can use for determining select all
         * rows on current page or not.
         *
         * \@memberOf DatatableComponent
         */
        this.selectAllRowsOnPage = false;
        /**
         * A flag for row virtualization on / off
         */
        this.virtualization = true;
        /**
         * A flag for switching summary row on / off
         */
        this.summaryRow = false;
        /**
         * A height of summary row
         */
        this.summaryHeight = 30;
        /**
         * A property holds a summary row position: top/bottom
         */
        this.summaryPosition = 'top';
        /**
         * Body was scrolled typically in a `scrollbarV:true` scenario.
         */
        this.scroll = new EventEmitter();
        /**
         * A cell or row was focused via keyboard or mouse click.
         */
        this.activate = new EventEmitter();
        /**
         * A cell or row was selected.
         */
        this.select = new EventEmitter();
        /**
         * Column sort was invoked.
         */
        this.sort = new EventEmitter();
        /**
         * The table was paged either triggered by the pager or the body scroll.
         */
        this.page = new EventEmitter();
        /**
         * Columns were re-ordered.
         */
        this.reorder = new EventEmitter();
        /**
         * Column was resized.
         */
        this.resize = new EventEmitter();
        /**
         * The context menu was invoked on the table.
         * type indicates whether the header or the body was clicked.
         * content contains either the column or the row that was clicked.
         */
        this.tableContextmenu = new EventEmitter(false);
        /**
         * A row was expanded ot collapsed for tree
         */
        this.treeAction = new EventEmitter();
        this.rowCount = 0;
        this._offsetX = new BehaviorSubject(0);
        this._count = 0;
        this._offset = 0;
        this._subscriptions = [];
        /**
         * This will be used when displaying or selecting rows.
         * when tracking/comparing them, we'll use the value of this fn,
         *
         * (`fn(x) === fn(y)` instead of `x === y`)
         */
        this.rowIdentity = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            if (this._groupRowsBy) {
                // each group in groupedRows are stored as {key, value: [rows]},
                // where key is the groupRowsBy index
                return x.key;
            }
            else {
                return x;
            }
        });
        // get ref to elm for measuring
        this.element = element.nativeElement;
        this.rowDiffer = differs.find({}).create();
        // apply global settings from Module.forRoot
        if (this.configuration && this.configuration.messages) {
            this.messages = Object.assign({}, this.configuration.messages);
        }
    }
    /**
     * Rows that are displayed in the table.
     * @param {?} val
     * @return {?}
     */
    set rows(val) {
        this._rows = val;
        if (val) {
            this._internalRows = [...val];
        }
        // auto sort on new updates
        if (!this.externalSorting) {
            this.sortInternalRows();
        }
        // auto group by parent on new update
        this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
        // recalculate sizes/etc
        this.recalculate();
        if (this._rows && this._groupRowsBy) {
            // If a column has been specified in _groupRowsBy created a new array with the data grouped by that row
            this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
        }
        this.cd.markForCheck();
    }
    /**
     * Gets the rows.
     * @return {?}
     */
    get rows() {
        return this._rows;
    }
    /**
     * This attribute allows the user to set the name of the column to group the data with
     * @param {?} val
     * @return {?}
     */
    set groupRowsBy(val) {
        if (val) {
            this._groupRowsBy = val;
            if (this._rows && this._groupRowsBy) {
                // cretes a new array with the data grouped
                this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
            }
        }
    }
    /**
     * @return {?}
     */
    get groupRowsBy() {
        return this._groupRowsBy;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set expandable(val) {
        this._expandable = val;
        this.columns = this._columns;
    }
    /**
     * @return {?}
     */
    get expandable() {
        return this._expandable;
    }
    /**
     * Columns to be displayed.
     * @param {?} val
     * @return {?}
     */
    set columns(val) {
        val = [
            ...(this.expandable
                ? [
                    {
                        width: 50,
                        prop: 'ice-expandable',
                        name: '',
                        resizeable: false,
                        canAutoResize: false,
                        draggable: false,
                        sortable: false
                    }
                ]
                : []),
            ...val
        ];
        if (val) {
            this._internalColumns = [...val];
            setColumnDefaults(this._internalColumns);
            this.recalculateColumns();
        }
        this._columns = val;
    }
    /**
     * Get the columns.
     * @return {?}
     */
    get columns() {
        return this._columns;
    }
    /**
     * The page size to be shown.
     * Default value: `undefined`
     * @param {?} val
     * @return {?}
     */
    set limit(val) {
        this._limit = val;
        // recalculate sizes/etc
        this.recalculate();
    }
    /**
     * Gets the limit.
     * @return {?}
     */
    get limit() {
        return this._limit;
    }
    /**
     * The total count of all rows.
     * Default value: `0`
     * @param {?} val
     * @return {?}
     */
    set count(val) {
        this._count = val;
        // recalculate sizes/etc
        this.recalculate();
    }
    /**
     * Gets the count.
     * @return {?}
     */
    get count() {
        return this._count;
    }
    /**
     * The current offset ( page - 1 ) shown.
     * Default value: `0`
     * @param {?} val
     * @return {?}
     */
    set offset(val) {
        this._offset = val;
    }
    /**
     * @return {?}
     */
    get offset() {
        return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
    }
    /**
     * CSS class applied if the header height if fixed height.
     * @return {?}
     */
    get isFixedHeader() {
        /** @type {?} */
        const headerHeight = this.headerHeight;
        return typeof headerHeight === 'string' ? (/** @type {?} */ (headerHeight)) !== 'auto' : true;
    }
    /**
     * CSS class applied to the root element if
     * the row heights are fixed heights.
     * @return {?}
     */
    get isFixedRow() {
        return this.rowHeight !== 'auto';
    }
    /**
     * CSS class applied to root element if
     * vertical scrolling is enabled.
     * @return {?}
     */
    get isVertScroll() {
        return this.scrollbarV;
    }
    /**
     * CSS class applied to root element if
     * virtualization is enabled.
     * @return {?}
     */
    get isVirtualized() {
        return this.virtualization;
    }
    /**
     * CSS class applied to the root element
     * if the horziontal scrolling is enabled.
     * @return {?}
     */
    get isHorScroll() {
        return this.scrollbarH;
    }
    /**
     * CSS class applied to root element is selectable.
     * @return {?}
     */
    get isSelectable() {
        return this.selectionType !== undefined;
    }
    /**
     * CSS class applied to root is checkbox selection.
     * @return {?}
     */
    get isCheckboxSelection() {
        return this.selectionType === SelectionType.checkbox;
    }
    /**
     * CSS class applied to root if cell selection.
     * @return {?}
     */
    get isCellSelection() {
        return this.selectionType === SelectionType.cell;
    }
    /**
     * CSS class applied to root if single select.
     * @return {?}
     */
    get isSingleSelection() {
        return this.selectionType === SelectionType.single;
    }
    /**
     * CSS class added to root element if mulit select
     * @return {?}
     */
    get isMultiSelection() {
        return this.selectionType === SelectionType.multi;
    }
    /**
     * CSS class added to root element if mulit click select
     * @return {?}
     */
    get isMultiClickSelection() {
        return this.selectionType === SelectionType.multiClick;
    }
    /**
     * Column templates gathered from `ContentChildren`
     * if described in your markup.
     * @param {?} val
     * @return {?}
     */
    set columnTemplates(val) {
        this._columnTemplates = val;
        this.translateColumns(val);
    }
    /**
     * Returns the column templates.
     * @return {?}
     */
    get columnTemplates() {
        return this._columnTemplates;
    }
    /**
     * Returns if all rows are selected.
     * @return {?}
     */
    get allRowsSelected() {
        /** @type {?} */
        let allRowsSelected = this.rows && this.selected && this.selected.length === this.rows.length;
        if (this.selectAllRowsOnPage) {
            /** @type {?} */
            const indexes = this.bodyComponent.indexes;
            /** @type {?} */
            const rowsOnPage = indexes.last - indexes.first;
            allRowsSelected = this.selected.length === rowsOnPage;
        }
        return this.selected && this.rows && this.rows.length !== 0 && allRowsSelected;
    }
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     * @return {?}
     */
    ngOnInit() {
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
    }
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.externalSorting) {
            this.sortInternalRows();
        }
        // this has to be done to prevent the change detection
        // tree from freaking out because we are readjusting
        if (typeof requestAnimationFrame === 'undefined') {
            return;
        }
        requestAnimationFrame((/**
         * @return {?}
         */
        () => {
            this.recalculate();
            // emit page for virtual server-side kickoff
            if (this.externalPaging && this.scrollbarV) {
                this.page.emit({
                    count: this.count,
                    pageSize: this.pageSize,
                    limit: this.limit,
                    offset: 0
                });
            }
        }));
    }
    /**
     * Lifecycle hook that is called after a component's
     * content has been fully initialized.
     * @return {?}
     */
    ngAfterContentInit() {
        this.columnTemplates.changes.subscribe((/**
         * @param {?} v
         * @return {?}
         */
        v => this.translateColumns(v)));
        this.listenForColumnInputChanges();
    }
    /**
     * Translates the templates to the column objects
     * @param {?} val
     * @return {?}
     */
    translateColumns(val) {
        if (val) {
            /** @type {?} */
            const arr = val.toArray();
            if (arr.length) {
                this._internalColumns = translateTemplates(arr);
                setColumnDefaults(this._internalColumns);
                this.recalculateColumns();
                this.sortInternalRows();
                this.cd.markForCheck();
            }
        }
    }
    /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param {?} originalArray the original array passed via parameter
     * @param {?} groupBy
     * @return {?}
     */
    groupArrayBy(originalArray, groupBy) {
        // create a map to hold groups with their corresponding results
        /** @type {?} */
        const map = new Map();
        /** @type {?} */
        let i = 0;
        originalArray.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const key = item[groupBy];
            if (!map.has(key)) {
                map.set(key, [item]);
            }
            else {
                map.get(key).push(item);
            }
            i++;
        }));
        /** @type {?} */
        const addGroup = (/**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        (key, value) => {
            return { key, value };
        });
        // convert map back to a simple array of objects
        return Array.from(map, (/**
         * @param {?} x
         * @return {?}
         */
        x => addGroup(x[0], x[1])));
    }
    /*
       * Lifecycle hook that is called when Angular dirty checks a directive.
       */
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.rowDiffer.diff(this.rows)) {
            if (!this.externalSorting) {
                this.sortInternalRows();
            }
            else {
                this._internalRows = [...this.rows];
            }
            // auto group by parent on new update
            this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
            this.recalculatePages();
            this.cd.markForCheck();
        }
    }
    /**
     * Recalc's the sizes of the grid.
     *
     * Updated automatically on changes to:
     *
     *  - Columns
     *  - Rows
     *  - Paging related
     *
     * Also can be manually invoked or upon window resize.
     * @return {?}
     */
    recalculate() {
        this.recalculateDims();
        this.recalculateColumns();
    }
    /**
     * Window resize handler to update sizes.
     * @return {?}
     */
    onWindowResize() {
        this.recalculate();
    }
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     * @param {?=} columns
     * @param {?=} forceIdx
     * @param {?=} allowBleed
     * @return {?}
     */
    recalculateColumns(columns = this._internalColumns, forceIdx = -1, allowBleed = this.scrollbarH) {
        if (!columns)
            return undefined;
        /** @type {?} */
        let width = this._innerWidth;
        if (this.scrollbarV) {
            width = width - this.scrollbarHelper.width;
        }
        if (this.columnMode === ColumnMode.force) {
            forceFillColumnWidths(columns, width, forceIdx, allowBleed);
        }
        else if (this.columnMode === ColumnMode.flex) {
            adjustColumnWidths(columns, width);
        }
        return columns;
    }
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     * @return {?}
     */
    recalculateDims() {
        /** @type {?} */
        const dims = this.dimensionsHelper.getDimensions(this.element);
        this._innerWidth = Math.floor(dims.width);
        if (this.scrollbarV) {
            /** @type {?} */
            let height = dims.height;
            if (this.headerHeight)
                height = height - this.headerHeight;
            if (this.footerHeight)
                height = height - this.footerHeight;
            this.bodyHeight = height;
        }
        this.recalculatePages();
    }
    /**
     * Recalculates the pages after a update.
     * @return {?}
     */
    recalculatePages() {
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    }
    /**
     * Body triggered a page event.
     * @param {?} __0
     * @return {?}
     */
    onBodyPage({ offset }) {
        // Avoid pagination caming from body events like scroll when the table
        // has no virtualization and the external paging is enable.
        // This means, let's the developer handle pagination by my him(her) self
        if (this.externalPaging && !this.virtualization) {
            return;
        }
        this.offset = offset;
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    }
    /**
     * The body triggered a scroll event.
     * @param {?} event
     * @return {?}
     */
    onBodyScroll(event) {
        this._offsetX.next(event.offsetX);
        this.scroll.emit(event);
        this.cd.detectChanges();
    }
    /**
     * The footer triggered a page event.
     * @param {?} event
     * @return {?}
     */
    onFooterPage(event) {
        this.offset = event.page - 1;
        this.bodyComponent.updateOffsetY(this.offset);
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
        if (this.selectAllRowsOnPage) {
            this.selected = [];
            this.select.emit({
                selected: this.selected
            });
        }
    }
    /**
     * Recalculates the sizes of the page
     * @param {?=} val
     * @return {?}
     */
    calcPageSize(val = this.rows) {
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            const size = Math.ceil(this.bodyHeight / ((/** @type {?} */ (this.rowHeight))));
            return Math.max(size, 0);
        }
        // if limit is passed, we are paging
        if (this.limit !== undefined) {
            return this.limit;
        }
        // otherwise use row length
        if (val) {
            return val.length;
        }
        // other empty :(
        return 0;
    }
    /**
     * Calculates the row count.
     * @param {?=} val
     * @return {?}
     */
    calcRowCount(val = this.rows) {
        if (!this.externalPaging) {
            if (!val)
                return 0;
            if (this.groupedRows) {
                return this.groupedRows.length;
            }
            else if (this.treeFromRelation != null && this.treeToRelation != null) {
                return this._internalRows.length;
            }
            else {
                return val.length;
            }
        }
        return this.count;
    }
    /**
     * The header triggered a contextmenu event.
     * @param {?} __0
     * @return {?}
     */
    onColumnContextmenu({ event, column }) {
        this.tableContextmenu.emit({ event, type: ContextmenuType.header, content: column });
    }
    /**
     * The body triggered a contextmenu event.
     * @param {?} __0
     * @return {?}
     */
    onRowContextmenu({ event, row }) {
        this.tableContextmenu.emit({ event, type: ContextmenuType.body, content: row });
    }
    /**
     * The header triggered a column resize event.
     * @param {?} __0
     * @return {?}
     */
    onColumnResize({ column, newValue }) {
        /* Safari/iOS 10.2 workaround */
        if (column === undefined) {
            return;
        }
        /** @type {?} */
        let idx;
        /** @type {?} */
        const cols = this._internalColumns.map((/**
         * @param {?} c
         * @param {?} i
         * @return {?}
         */
        (c, i) => {
            c = Object.assign({}, c);
            if (c.$$id === column.$$id) {
                idx = i;
                c.width = newValue;
                // set this so we can force the column
                // width distribution to be to this value
                c.$$oldWidth = newValue;
            }
            return c;
        }));
        this.recalculateColumns(cols, idx);
        this._internalColumns = cols;
        this.resize.emit({
            column,
            newValue
        });
    }
    /**
     * The header triggered a column re-order event.
     * @param {?} __0
     * @return {?}
     */
    onColumnReorder({ column, newValue, prevValue }) {
        /** @type {?} */
        const cols = this._internalColumns.map((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            return Object.assign({}, c);
        }));
        if (this.swapColumns) {
            /** @type {?} */
            const prevCol = cols[newValue];
            cols[newValue] = column;
            cols[prevValue] = prevCol;
        }
        else {
            if (newValue > prevValue) {
                /** @type {?} */
                const movedCol = cols[prevValue];
                for (let i = prevValue; i < newValue; i++) {
                    cols[i] = cols[i + 1];
                }
                cols[newValue] = movedCol;
            }
            else {
                /** @type {?} */
                const movedCol = cols[prevValue];
                for (let i = prevValue; i > newValue; i--) {
                    cols[i] = cols[i - 1];
                }
                cols[newValue] = movedCol;
            }
        }
        this._internalColumns = cols;
        this.reorder.emit({
            column,
            newValue,
            prevValue
        });
    }
    /**
     * The header triggered a column sort event.
     * @param {?} event
     * @return {?}
     */
    onColumnSort(event) {
        // clean selected rows
        if (this.selectAllRowsOnPage) {
            this.selected = [];
            this.select.emit({
                selected: this.selected
            });
        }
        this.sorts = event.sorts;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            // don't use normal setter so we don't resort
            this.sortInternalRows();
        }
        // auto group by parent on new update
        this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
        // Always go to first page when sorting to see the newly sorted data
        this.offset = 0;
        this.bodyComponent.updateOffsetY(this.offset);
        this.sort.emit(event);
    }
    /**
     * Toggle all row selection
     * @param {?} event
     * @return {?}
     */
    onHeaderSelect(event) {
        if (this.selectAllRowsOnPage) {
            // before we splice, chk if we currently have all selected
            /** @type {?} */
            const first = this.bodyComponent.indexes.first;
            /** @type {?} */
            const last = this.bodyComponent.indexes.last;
            /** @type {?} */
            const allSelected = this.selected.length === last - first;
            // remove all existing either way
            this.selected = [];
            // do the opposite here
            if (!allSelected) {
                this.selected.push(...this._internalRows.slice(first, last));
            }
        }
        else {
            // before we splice, chk if we currently have all selected
            /** @type {?} */
            const allSelected = this.selected.length === this.rows.length;
            // remove all existing either way
            this.selected = [];
            // do the opposite here
            if (!allSelected) {
                this.selected.push(...this.rows);
            }
        }
        this.select.emit({
            selected: this.selected
        });
    }
    /**
     * A row was selected from body
     * @param {?} event
     * @return {?}
     */
    onBodySelect(event) {
        this.select.emit(event);
    }
    /**
     * A row was expanded or collapsed for tree
     * @param {?} event
     * @return {?}
     */
    onTreeAction(event) {
        /** @type {?} */
        const row = event.row;
        // TODO: For duplicated items this will not work
        /** @type {?} */
        const rowIndex = this._rows.findIndex((/**
         * @param {?} r
         * @return {?}
         */
        r => r[this.treeToRelation] === event.row[this.treeToRelation]));
        this.treeAction.emit({ row, rowIndex });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        subscription => subscription.unsubscribe()));
    }
    /**
     * listen for changes to input bindings of all DataTableColumnDirective and
     * trigger the columnTemplates.changes observable to emit
     * @private
     * @return {?}
     */
    listenForColumnInputChanges() {
        this._subscriptions.push(this.columnChangesService.columnInputChanges$.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.columnTemplates) {
                this.columnTemplates.notifyOnChanges();
            }
        })));
    }
    /**
     * @private
     * @return {?}
     */
    sortInternalRows() {
        this._internalRows = sortRows(this._internalRows, this._internalColumns, this.sorts);
    }
}
DatatableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-datatable',
                template: "<div visibilityObserver (visible)=\"recalculate()\">\r\n  <datatable-header\r\n    *ngIf=\"headerHeight\"\r\n    [sorts]=\"sorts\"\r\n    [sortType]=\"sortType\"\r\n    [scrollbarH]=\"scrollbarH\"\r\n    [innerWidth]=\"_innerWidth\"\r\n    [offsetX]=\"_offsetX | async\"\r\n    [dealsWithGroup]=\"groupedRows !== undefined\"\r\n    [columns]=\"_internalColumns\"\r\n    [headerHeight]=\"headerHeight\"\r\n    [reorderable]=\"reorderable\"\r\n    [targetMarkerTemplate]=\"targetMarkerTemplate\"\r\n    [sortAscendingIcon]=\"cssClasses.sortAscending\"\r\n    [sortDescendingIcon]=\"cssClasses.sortDescending\"\r\n    [allRowsSelected]=\"allRowsSelected\"\r\n    [selectionType]=\"selectionType\"\r\n    (sort)=\"onColumnSort($event)\"\r\n    (resize)=\"onColumnResize($event)\"\r\n    (reorder)=\"onColumnReorder($event)\"\r\n    (select)=\"onHeaderSelect($event)\"\r\n    (columnContextmenu)=\"onColumnContextmenu($event)\"\r\n  >\r\n  </datatable-header>\r\n  <datatable-body\r\n    [groupRowsBy]=\"groupRowsBy\"\r\n    [groupedRows]=\"groupedRows\"\r\n    [rows]=\"_internalRows\"\r\n    [groupExpansionDefault]=\"groupExpansionDefault\"\r\n    [scrollbarV]=\"scrollbarV\"\r\n    [scrollbarH]=\"scrollbarH\"\r\n    [virtualization]=\"virtualization\"\r\n    [loadingIndicator]=\"loadingIndicator\"\r\n    [externalPaging]=\"externalPaging\"\r\n    [rowHeight]=\"rowHeight\"\r\n    [rowCount]=\"rowCount\"\r\n    [offset]=\"offset\"\r\n    [trackByProp]=\"trackByProp\"\r\n    [columns]=\"_internalColumns\"\r\n    [pageSize]=\"pageSize\"\r\n    [offsetX]=\"_offsetX | async\"\r\n    [rowDetail]=\"rowDetail\"\r\n    [groupHeader]=\"groupHeader\"\r\n    [selected]=\"selected\"\r\n    [innerWidth]=\"_innerWidth\"\r\n    [bodyHeight]=\"bodyHeight\"\r\n    [selectionType]=\"selectionType\"\r\n    [emptyMessage]=\"messages.emptyMessage\"\r\n    [rowIdentity]=\"rowIdentity\"\r\n    [rowClass]=\"rowClass\"\r\n    [selectCheck]=\"selectCheck\"\r\n    [displayCheck]=\"displayCheck\"\r\n    [summaryRow]=\"summaryRow\"\r\n    [summaryHeight]=\"summaryHeight\"\r\n    [summaryPosition]=\"summaryPosition\"\r\n    (page)=\"onBodyPage($event)\"\r\n    (activate)=\"activate.emit($event)\"\r\n    (rowContextmenu)=\"onRowContextmenu($event)\"\r\n    (select)=\"onBodySelect($event)\"\r\n    (scroll)=\"onBodyScroll($event)\"\r\n    (treeAction)=\"onTreeAction($event)\"\r\n  >\r\n  </datatable-body>\r\n  <datatable-footer\r\n    *ngIf=\"footerHeight\"\r\n    [rowCount]=\"rowCount\"\r\n    [pageSize]=\"pageSize\"\r\n    [offset]=\"offset\"\r\n    [footerHeight]=\"footerHeight\"\r\n    [footerTemplate]=\"footer\"\r\n    [totalMessage]=\"messages.totalMessage\"\r\n    [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\r\n    [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\r\n    [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\r\n    [selectedCount]=\"selected.length\"\r\n    [selectedMessage]=\"!!selectionType && messages.selectedMessage\"\r\n    [pagerNextIcon]=\"cssClasses.pagerNext\"\r\n    (page)=\"onFooterPage($event)\"\r\n  >\r\n  </datatable-footer>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    class: 'ngx-datatable'
                },
                styles: [".ngx-datatable{display:block;overflow:hidden;justify-content:center;position:relative;-webkit-transform:translate3d(0,0,0)}.ngx-datatable [hidden]{display:none!important}.ngx-datatable *,.ngx-datatable :after,.ngx-datatable :before{box-sizing:border-box}.ngx-datatable.scroll-vertical .datatable-body{overflow-y:auto}.ngx-datatable.scroll-vertical.virtualized .datatable-body .datatable-row-wrapper{position:absolute}.ngx-datatable.scroll-horz .datatable-body{overflow-x:auto;-webkit-overflow-scrolling:touch}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner{white-space:nowrap}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngx-datatable.fixed-row .datatable-scroll,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row{white-space:nowrap}.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ngx-datatable .datatable-body-row,.ngx-datatable .datatable-header-inner,.ngx-datatable .datatable-row-center{display:flex;flex-direction:row;-o-flex-flow:row;flex-flow:row}.ngx-datatable .datatable-body-cell,.ngx-datatable .datatable-header-cell{overflow-x:hidden;vertical-align:top;display:inline-block;line-height:1.625}.ngx-datatable .datatable-body-cell:focus,.ngx-datatable .datatable-header-cell:focus{outline:0}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-right{z-index:9}.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-row-group,.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-right{position:relative}.ngx-datatable .datatable-header{display:block;overflow:hidden}.ngx-datatable .datatable-header .datatable-header-inner{align-items:stretch;-webkit-align-items:stretch}.ngx-datatable .datatable-header .datatable-header-cell{position:relative;display:inline-block}.ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper{cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper{cursor:move}.ngx-datatable .datatable-header .datatable-header-cell .sort-btn{line-height:100%;vertical-align:middle;display:inline-block;cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell .resize-handle--not-resizable{display:inline-block;position:absolute;right:0;top:0;bottom:0;width:5px;padding:0 4px;visibility:hidden}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle{cursor:ew-resize}.ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell:hover .resize-handle--not-resizable{visibility:visible}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker{position:absolute;top:0;bottom:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromLeft{right:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromRight{left:0}.ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-template-wrap{height:inherit}.ngx-datatable .datatable-body{position:relative;z-index:10;display:block}.ngx-datatable .datatable-body .datatable-scroll{display:inline-block}.ngx-datatable .datatable-body .datatable-row-detail{overflow-y:hidden}.ngx-datatable .datatable-body .datatable-row-wrapper{display:flex;flex-direction:column}.ngx-datatable .datatable-body .datatable-body-row{outline:0}.ngx-datatable .datatable-body .datatable-body-row>div{display:flex}.ngx-datatable .datatable-footer{display:block;width:100%;overflow:auto}.ngx-datatable .datatable-footer .datatable-footer-inner{display:flex;align-items:center;width:100%}.ngx-datatable .datatable-footer .selected-count .page-count{flex:1 1 40%}.ngx-datatable .datatable-footer .selected-count .datatable-pager{flex:1 1 60%}.ngx-datatable .datatable-footer .page-count{flex:1 1 20%}.ngx-datatable .datatable-footer .datatable-pager{flex:1 1 80%;text-align:right}.ngx-datatable .datatable-footer .datatable-pager .pager,.ngx-datatable .datatable-footer .datatable-pager .pager li{padding:0;margin:0;display:inline-block;list-style:none}.ngx-datatable .datatable-footer .datatable-pager .pager li,.ngx-datatable .datatable-footer .datatable-pager .pager li a{outline:0}.ngx-datatable .datatable-footer .datatable-pager .pager li a{cursor:pointer;display:inline-block}.ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a{cursor:not-allowed}"]
            }] }
];
/** @nocollapse */
DatatableComponent.ctorParameters = () => [
    { type: ScrollbarHelper, decorators: [{ type: SkipSelf }] },
    { type: DimensionsHelper, decorators: [{ type: SkipSelf }] },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: KeyValueDiffers },
    { type: ColumnChangesService },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['configuration',] }] }
];
DatatableComponent.propDecorators = {
    targetMarkerTemplate: [{ type: Input }],
    rows: [{ type: Input }],
    groupRowsBy: [{ type: Input }],
    groupedRows: [{ type: Input }],
    expandable: [{ type: Input }],
    columns: [{ type: Input }],
    selected: [{ type: Input }],
    scrollbarV: [{ type: Input }],
    scrollbarH: [{ type: Input }],
    rowHeight: [{ type: Input }],
    columnMode: [{ type: Input }],
    headerHeight: [{ type: Input }],
    footerHeight: [{ type: Input }],
    externalPaging: [{ type: Input }],
    externalSorting: [{ type: Input }],
    limit: [{ type: Input }],
    count: [{ type: Input }],
    offset: [{ type: Input }],
    loadingIndicator: [{ type: Input }],
    selectionType: [{ type: Input }],
    reorderable: [{ type: Input }],
    swapColumns: [{ type: Input }],
    sortType: [{ type: Input }],
    sorts: [{ type: Input }],
    cssClasses: [{ type: Input }],
    messages: [{ type: Input }],
    rowClass: [{ type: Input }],
    selectCheck: [{ type: Input }],
    displayCheck: [{ type: Input }],
    groupExpansionDefault: [{ type: Input }],
    trackByProp: [{ type: Input }],
    selectAllRowsOnPage: [{ type: Input }],
    virtualization: [{ type: Input }],
    treeFromRelation: [{ type: Input }],
    treeToRelation: [{ type: Input }],
    summaryRow: [{ type: Input }],
    summaryHeight: [{ type: Input }],
    summaryPosition: [{ type: Input }],
    scroll: [{ type: Output }],
    activate: [{ type: Output }],
    select: [{ type: Output }],
    sort: [{ type: Output }],
    page: [{ type: Output }],
    reorder: [{ type: Output }],
    resize: [{ type: Output }],
    tableContextmenu: [{ type: Output }],
    treeAction: [{ type: Output }],
    isFixedHeader: [{ type: HostBinding, args: ['class.fixed-header',] }],
    isFixedRow: [{ type: HostBinding, args: ['class.fixed-row',] }],
    isVertScroll: [{ type: HostBinding, args: ['class.scroll-vertical',] }],
    isVirtualized: [{ type: HostBinding, args: ['class.virtualized',] }],
    isHorScroll: [{ type: HostBinding, args: ['class.scroll-horz',] }],
    isSelectable: [{ type: HostBinding, args: ['class.selectable',] }],
    isCheckboxSelection: [{ type: HostBinding, args: ['class.checkbox-selection',] }],
    isCellSelection: [{ type: HostBinding, args: ['class.cell-selection',] }],
    isSingleSelection: [{ type: HostBinding, args: ['class.single-selection',] }],
    isMultiSelection: [{ type: HostBinding, args: ['class.multi-selection',] }],
    isMultiClickSelection: [{ type: HostBinding, args: ['class.multi-click-selection',] }],
    columnTemplates: [{ type: ContentChildren, args: [DataTableColumnDirective,] }],
    rowDetail: [{ type: ContentChild, args: [DatatableRowDetailDirective, { static: false },] }],
    groupHeader: [{ type: ContentChild, args: [DatatableGroupHeaderDirective, { static: false },] }],
    footer: [{ type: ContentChild, args: [DatatableFooterDirective, { static: false },] }],
    bodyComponent: [{ type: ViewChild, args: [DataTableBodyComponent, { static: false },] }],
    headerComponent: [{ type: ViewChild, args: [DataTableHeaderComponent, { static: false },] }],
    rowIdentity: [{ type: Input }],
    onWindowResize: [{ type: HostListener, args: ['window:resize',] }]
};
tslib_1.__decorate([
    throttleable(5),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DatatableComponent.prototype, "onWindowResize", null);
if (false) {
    /**
     * Template for the target marker of drag target columns.
     * @type {?}
     */
    DatatableComponent.prototype.targetMarkerTemplate;
    /**
     * This attribute allows the user to set a grouped array in the following format:
     *  [
     *    {groupid=1} [
     *      {id=1 name="test1"},
     *      {id=2 name="test2"},
     *      {id=3 name="test3"}
     *    ]},
     *    {groupid=2>[
     *      {id=4 name="test4"},
     *      {id=5 name="test5"},
     *      {id=6 name="test6"}
     *    ]}
     *  ]
     * @type {?}
     */
    DatatableComponent.prototype.groupedRows;
    /**
     * List of row objects that should be
     * represented as selected in the grid.
     * Default value: `[]`
     * @type {?}
     */
    DatatableComponent.prototype.selected;
    /**
     * Enable vertical scrollbars
     * @type {?}
     */
    DatatableComponent.prototype.scrollbarV;
    /**
     * Enable horz scrollbars
     * @type {?}
     */
    DatatableComponent.prototype.scrollbarH;
    /**
     * The row height; which is necessary
     * to calculate the height for the lazy rendering.
     * @type {?}
     */
    DatatableComponent.prototype.rowHeight;
    /**
     * Type of column width distribution formula.
     * Example: flex, force, standard
     * @type {?}
     */
    DatatableComponent.prototype.columnMode;
    /**
     * The minimum header height in pixels.
     * Pass a falsey for no header
     * @type {?}
     */
    DatatableComponent.prototype.headerHeight;
    /**
     * The minimum footer height in pixels.
     * Pass falsey for no footer
     * @type {?}
     */
    DatatableComponent.prototype.footerHeight;
    /**
     * If the table should use external paging
     * otherwise its assumed that all data is preloaded.
     * @type {?}
     */
    DatatableComponent.prototype.externalPaging;
    /**
     * If the table should use external sorting or
     * the built-in basic sorting.
     * @type {?}
     */
    DatatableComponent.prototype.externalSorting;
    /**
     * Show the linear loading bar.
     * Default value: `false`
     * @type {?}
     */
    DatatableComponent.prototype.loadingIndicator;
    /**
     * Type of row selection. Options are:
     *
     *  - `single`
     *  - `multi`
     *  - `checkbox`
     *  - `multiClick`
     *  - `cell`
     *
     * For no selection pass a `falsey`.
     * Default value: `undefined`
     * @type {?}
     */
    DatatableComponent.prototype.selectionType;
    /**
     * Enable/Disable ability to re-order columns
     * by dragging them.
     * @type {?}
     */
    DatatableComponent.prototype.reorderable;
    /**
     * Swap columns on re-order columns or
     * move them.
     * @type {?}
     */
    DatatableComponent.prototype.swapColumns;
    /**
     * The type of sorting
     * @type {?}
     */
    DatatableComponent.prototype.sortType;
    /**
     * Array of sorted columns by property and type.
     * Default value: `[]`
     * @type {?}
     */
    DatatableComponent.prototype.sorts;
    /**
     * Css class overrides
     * @type {?}
     */
    DatatableComponent.prototype.cssClasses;
    /**
     * Message overrides for localization
     *
     * emptyMessage     [default] = 'No data to display'
     * totalMessage     [default] = 'total'
     * selectedMessage  [default] = 'selected'
     * @type {?}
     */
    DatatableComponent.prototype.messages;
    /**
     * Row specific classes.
     * Similar implementation to ngClass.
     *
     *  [rowClass]="'first second'"
     *  [rowClass]="{ 'first': true, 'second': true, 'third': false }"
     * @type {?}
     */
    DatatableComponent.prototype.rowClass;
    /**
     * A boolean/function you can use to check whether you want
     * to select a particular row based on a criteria. Example:
     *
     *    (selection) => {
     *      return selection !== 'Ethel Price';
     *    }
     * @type {?}
     */
    DatatableComponent.prototype.selectCheck;
    /**
     * A function you can use to check whether you want
     * to show the checkbox for a particular row based on a criteria. Example:
     *
     *    (row, column, value) => {
     *      return row.name !== 'Ethel Price';
     *    }
     * @type {?}
     */
    DatatableComponent.prototype.displayCheck;
    /**
     * A boolean you can use to set the detault behaviour of rows and groups
     * whether they will start expanded or not. If ommited the default is NOT expanded.
     *
     * @type {?}
     */
    DatatableComponent.prototype.groupExpansionDefault;
    /**
     * Property to which you can use for custom tracking of rows.
     * Example: 'name'
     * @type {?}
     */
    DatatableComponent.prototype.trackByProp;
    /**
     * Property to which you can use for determining select all
     * rows on current page or not.
     *
     * \@memberOf DatatableComponent
     * @type {?}
     */
    DatatableComponent.prototype.selectAllRowsOnPage;
    /**
     * A flag for row virtualization on / off
     * @type {?}
     */
    DatatableComponent.prototype.virtualization;
    /**
     * Tree from relation
     * @type {?}
     */
    DatatableComponent.prototype.treeFromRelation;
    /**
     * Tree to relation
     * @type {?}
     */
    DatatableComponent.prototype.treeToRelation;
    /**
     * A flag for switching summary row on / off
     * @type {?}
     */
    DatatableComponent.prototype.summaryRow;
    /**
     * A height of summary row
     * @type {?}
     */
    DatatableComponent.prototype.summaryHeight;
    /**
     * A property holds a summary row position: top/bottom
     * @type {?}
     */
    DatatableComponent.prototype.summaryPosition;
    /**
     * Body was scrolled typically in a `scrollbarV:true` scenario.
     * @type {?}
     */
    DatatableComponent.prototype.scroll;
    /**
     * A cell or row was focused via keyboard or mouse click.
     * @type {?}
     */
    DatatableComponent.prototype.activate;
    /**
     * A cell or row was selected.
     * @type {?}
     */
    DatatableComponent.prototype.select;
    /**
     * Column sort was invoked.
     * @type {?}
     */
    DatatableComponent.prototype.sort;
    /**
     * The table was paged either triggered by the pager or the body scroll.
     * @type {?}
     */
    DatatableComponent.prototype.page;
    /**
     * Columns were re-ordered.
     * @type {?}
     */
    DatatableComponent.prototype.reorder;
    /**
     * Column was resized.
     * @type {?}
     */
    DatatableComponent.prototype.resize;
    /**
     * The context menu was invoked on the table.
     * type indicates whether the header or the body was clicked.
     * content contains either the column or the row that was clicked.
     * @type {?}
     */
    DatatableComponent.prototype.tableContextmenu;
    /**
     * A row was expanded ot collapsed for tree
     * @type {?}
     */
    DatatableComponent.prototype.treeAction;
    /**
     * Row Detail templates gathered from the ContentChild
     * @type {?}
     */
    DatatableComponent.prototype.rowDetail;
    /**
     * Group Header templates gathered from the ContentChild
     * @type {?}
     */
    DatatableComponent.prototype.groupHeader;
    /**
     * Footer template gathered from the ContentChild
     * @type {?}
     */
    DatatableComponent.prototype.footer;
    /**
     * Reference to the body component for manually
     * invoking functions on the body.
     * @type {?}
     */
    DatatableComponent.prototype.bodyComponent;
    /**
     * Reference to the header component for manually
     * invoking functions on the header.
     *
     * \@memberOf DatatableComponent
     * @type {?}
     */
    DatatableComponent.prototype.headerComponent;
    /** @type {?} */
    DatatableComponent.prototype.element;
    /** @type {?} */
    DatatableComponent.prototype._innerWidth;
    /** @type {?} */
    DatatableComponent.prototype.pageSize;
    /** @type {?} */
    DatatableComponent.prototype.bodyHeight;
    /** @type {?} */
    DatatableComponent.prototype.rowCount;
    /** @type {?} */
    DatatableComponent.prototype.rowDiffer;
    /** @type {?} */
    DatatableComponent.prototype._offsetX;
    /** @type {?} */
    DatatableComponent.prototype._limit;
    /** @type {?} */
    DatatableComponent.prototype._count;
    /** @type {?} */
    DatatableComponent.prototype._offset;
    /** @type {?} */
    DatatableComponent.prototype._rows;
    /** @type {?} */
    DatatableComponent.prototype._groupRowsBy;
    /** @type {?} */
    DatatableComponent.prototype._internalRows;
    /** @type {?} */
    DatatableComponent.prototype._internalColumns;
    /** @type {?} */
    DatatableComponent.prototype._columns;
    /** @type {?} */
    DatatableComponent.prototype._expandable;
    /** @type {?} */
    DatatableComponent.prototype._columnTemplates;
    /** @type {?} */
    DatatableComponent.prototype._subscriptions;
    /**
     * This will be used when displaying or selecting rows.
     * when tracking/comparing them, we'll use the value of this fn,
     *
     * (`fn(x) === fn(y)` instead of `x === y`)
     * @type {?}
     */
    DatatableComponent.prototype.rowIdentity;
    /**
     * @type {?}
     * @private
     */
    DatatableComponent.prototype.scrollbarHelper;
    /**
     * @type {?}
     * @private
     */
    DatatableComponent.prototype.dimensionsHelper;
    /**
     * @type {?}
     * @private
     */
    DatatableComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    DatatableComponent.prototype.columnChangesService;
    /**
     * @type {?}
     * @private
     */
    DatatableComponent.prototype.configuration;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUVmLFNBQVMsRUFFVCxXQUFXLEVBQ1gsWUFBWSxFQUVaLGVBQWUsRUFFZixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixRQUFRLEVBRVIsUUFBUSxFQUNSLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVuRixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JF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dkIseUNBQTBCOzs7Ozs7Ozs7O0lBVTFCLDBDQUF3RTs7Ozs7OztJQU94RSxtREFBZ0Q7Ozs7OztJQU1oRCx5Q0FBNkI7Ozs7Ozs7O0lBUTdCLGlEQUFxQzs7Ozs7SUFLckMsNENBQXdDOzs7OztJQUt4Qyw4Q0FBa0M7Ozs7O0lBS2xDLDRDQUFnQzs7Ozs7SUFLaEMsd0NBQXFDOzs7OztJQUtyQywyQ0FBb0M7Ozs7O0lBS3BDLDZDQUF5Qzs7Ozs7SUFLekMsb0NBQXlEOzs7OztJQUt6RCxzQ0FBMkQ7Ozs7O0lBSzNELG9DQUF5RDs7Ozs7SUFLekQsa0NBQXVEOzs7OztJQUt2RCxrQ0FBdUQ7Ozs7O0lBS3ZELHFDQUEwRDs7Ozs7SUFLMUQsb0NBQXlEOzs7Ozs7O0lBT3pELDhDQUFpSDs7Ozs7SUFLakgsd0NBQTZEOzs7OztJQW1IN0QsdUNBQ3VDOzs7OztJQUt2Qyx5Q0FDMkM7Ozs7O0lBSzNDLG9DQUNpQzs7Ozs7O0lBTWpDLDJDQUNzQzs7Ozs7Ozs7SUFRdEMsNkNBQzBDOztJQWlCMUMscUNBQXFCOztJQUNyQix5Q0FBb0I7O0lBQ3BCLHNDQUFpQjs7SUFDakIsd0NBQW1COztJQUNuQixzQ0FBcUI7O0lBQ3JCLHVDQUFrQzs7SUFFbEMsc0NBQWtDOztJQUNsQyxvQ0FBMkI7O0lBQzNCLG9DQUFtQjs7SUFDbkIscUNBQW9COztJQUNwQixtQ0FBYTs7SUFDYiwwQ0FBcUI7O0lBQ3JCLDJDQUFxQjs7SUFDckIsOENBQWdDOztJQUNoQyxzQ0FBd0I7O0lBQ3hCLHlDQUFxQjs7SUFDckIsOENBQXNEOztJQUN0RCw0Q0FBb0M7Ozs7Ozs7O0lBNkVwQyx5Q0FRRTs7Ozs7SUFsRkEsNkNBQW9EOzs7OztJQUNwRCw4Q0FBc0Q7Ozs7O0lBQ3RELGdDQUE2Qjs7Ozs7SUFHN0Isa0RBQWtEOzs7OztJQUNsRCwyQ0FBK0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0NoaWxkLFxuICBIb3N0TGlzdGVuZXIsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyVmlld0luaXQsXG4gIEhvc3RCaW5kaW5nLFxuICBDb250ZW50Q2hpbGQsXG4gIERvQ2hlY2ssXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgS2V5VmFsdWVEaWZmZXIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFNraXBTZWxmLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLmRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJTmd4RGF0YXRhYmxlQ29uZmlnIH0gZnJvbSAnLi4vbmd4LWRhdGF0YWJsZS5tb2R1bGUnO1xuaW1wb3J0IHsgZ3JvdXBSb3dzQnlQYXJlbnRzLCBvcHRpb25hbEdldHRlckZvclByb3AgfSBmcm9tICcuLi91dGlscy90cmVlJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xuaW1wb3J0IHsgc2V0Q29sdW1uRGVmYXVsdHMsIHRyYW5zbGF0ZVRlbXBsYXRlcyB9IGZyb20gJy4uL3V0aWxzL2NvbHVtbi1oZWxwZXInO1xuaW1wb3J0IHsgQ29sdW1uTW9kZSB9IGZyb20gJy4uL3R5cGVzL2NvbHVtbi1tb2RlLnR5cGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uL3R5cGVzL3NlbGVjdGlvbi50eXBlJztcbmltcG9ydCB7IFNvcnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvc29ydC50eXBlJztcbmltcG9ydCB7IENvbnRleHRtZW51VHlwZSB9IGZyb20gJy4uL3R5cGVzL2NvbnRleHRtZW51LnR5cGUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW5zL2NvbHVtbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlIH0gZnJvbSAnLi9yb3ctZGV0YWlsL3Jvdy1kZXRhaWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSB9IGZyb20gJy4vZm9vdGVyL2Zvb3Rlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQm9keUNvbXBvbmVudCB9IGZyb20gJy4vYm9keS9ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNjcm9sbGJhckhlbHBlciB9IGZyb20gJy4uL3NlcnZpY2VzL3Njcm9sbGJhci1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb2x1bW5DaGFuZ2VzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvbHVtbi1jaGFuZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGltZW5zaW9uc0hlbHBlciB9IGZyb20gJy4uL3NlcnZpY2VzL2RpbWVuc2lvbnMtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgdGhyb3R0bGVhYmxlIH0gZnJvbSAnLi4vdXRpbHMvdGhyb3R0bGUnO1xuaW1wb3J0IHsgZm9yY2VGaWxsQ29sdW1uV2lkdGhzLCBhZGp1c3RDb2x1bW5XaWR0aHMgfSBmcm9tICcuLi91dGlscy9tYXRoJztcbmltcG9ydCB7IHNvcnRSb3dzIH0gZnJvbSAnLi4vdXRpbHMvc29ydCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1kYXRhdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0YXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL2RhdGF0YWJsZS5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICduZ3gtZGF0YXRhYmxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCB7XG4gIC8qKlxuICAgKiBUZW1wbGF0ZSBmb3IgdGhlIHRhcmdldCBtYXJrZXIgb2YgZHJhZyB0YXJnZXQgY29sdW1ucy5cbiAgICovXG4gIEBJbnB1dCgpIHRhcmdldE1hcmtlclRlbXBsYXRlOiBhbnk7XG5cbiAgLyoqXG4gICAqIFJvd3MgdGhhdCBhcmUgZGlzcGxheWVkIGluIHRoZSB0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpIHNldCByb3dzKHZhbDogYW55KSB7XG4gICAgdGhpcy5fcm93cyA9IHZhbDtcblxuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyA9IFsuLi52YWxdO1xuICAgIH1cblxuICAgIC8vIGF1dG8gc29ydCBvbiBuZXcgdXBkYXRlc1xuICAgIGlmICghdGhpcy5leHRlcm5hbFNvcnRpbmcpIHtcbiAgICAgIHRoaXMuc29ydEludGVybmFsUm93cygpO1xuICAgIH1cblxuICAgIC8vIGF1dG8gZ3JvdXAgYnkgcGFyZW50IG9uIG5ldyB1cGRhdGVcbiAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBncm91cFJvd3NCeVBhcmVudHMoXG4gICAgICB0aGlzLl9pbnRlcm5hbFJvd3MsXG4gICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlRnJvbVJlbGF0aW9uKSxcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVUb1JlbGF0aW9uKVxuICAgICk7XG5cbiAgICAvLyByZWNhbGN1bGF0ZSBzaXplcy9ldGNcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG5cbiAgICBpZiAodGhpcy5fcm93cyAmJiB0aGlzLl9ncm91cFJvd3NCeSkge1xuICAgICAgLy8gSWYgYSBjb2x1bW4gaGFzIGJlZW4gc3BlY2lmaWVkIGluIF9ncm91cFJvd3NCeSBjcmVhdGVkIGEgbmV3IGFycmF5IHdpdGggdGhlIGRhdGEgZ3JvdXBlZCBieSB0aGF0IHJvd1xuICAgICAgdGhpcy5ncm91cGVkUm93cyA9IHRoaXMuZ3JvdXBBcnJheUJ5KHRoaXMuX3Jvd3MsIHRoaXMuX2dyb3VwUm93c0J5KTtcbiAgICB9XG5cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJvd3MuXG4gICAqL1xuICBnZXQgcm93cygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgYXR0cmlidXRlIGFsbG93cyB0aGUgdXNlciB0byBzZXQgdGhlIG5hbWUgb2YgdGhlIGNvbHVtbiB0byBncm91cCB0aGUgZGF0YSB3aXRoXG4gICAqL1xuICBASW5wdXQoKSBzZXQgZ3JvdXBSb3dzQnkodmFsOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLl9ncm91cFJvd3NCeSA9IHZhbDtcbiAgICAgIGlmICh0aGlzLl9yb3dzICYmIHRoaXMuX2dyb3VwUm93c0J5KSB7XG4gICAgICAgIC8vIGNyZXRlcyBhIG5ldyBhcnJheSB3aXRoIHRoZSBkYXRhIGdyb3VwZWRcbiAgICAgICAgdGhpcy5ncm91cGVkUm93cyA9IHRoaXMuZ3JvdXBBcnJheUJ5KHRoaXMuX3Jvd3MsIHRoaXMuX2dyb3VwUm93c0J5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgZ3JvdXBSb3dzQnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwUm93c0J5O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgYXR0cmlidXRlIGFsbG93cyB0aGUgdXNlciB0byBzZXQgYSBncm91cGVkIGFycmF5IGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICAgKiAgW1xuICAgKiAgICB7Z3JvdXBpZD0xfSBbXG4gICAqICAgICAge2lkPTEgbmFtZT1cInRlc3QxXCJ9LFxuICAgKiAgICAgIHtpZD0yIG5hbWU9XCJ0ZXN0MlwifSxcbiAgICogICAgICB7aWQ9MyBuYW1lPVwidGVzdDNcIn1cbiAgICogICAgXX0sXG4gICAqICAgIHtncm91cGlkPTI+W1xuICAgKiAgICAgIHtpZD00IG5hbWU9XCJ0ZXN0NFwifSxcbiAgICogICAgICB7aWQ9NSBuYW1lPVwidGVzdDVcIn0sXG4gICAqICAgICAge2lkPTYgbmFtZT1cInRlc3Q2XCJ9XG4gICAqICAgIF19XG4gICAqICBdXG4gICAqL1xuICBASW5wdXQoKSBncm91cGVkUm93czogYW55W107XG5cbiAgQElucHV0KCkgc2V0IGV4cGFuZGFibGUodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZXhwYW5kYWJsZSA9IHZhbDtcbiAgICB0aGlzLmNvbHVtbnMgPSB0aGlzLl9jb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGV4cGFuZGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZGFibGU7XG4gIH1cblxuICAvKipcbiAgICogQ29sdW1ucyB0byBiZSBkaXNwbGF5ZWQuXG4gICAqL1xuICBASW5wdXQoKSBzZXQgY29sdW1ucyh2YWw6IFRhYmxlQ29sdW1uW10pIHtcbiAgICB2YWwgPSBbXG4gICAgICAuLi4odGhpcy5leHBhbmRhYmxlXG4gICAgICAgID8gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB3aWR0aDogNTAsXG4gICAgICAgICAgICAgIHByb3A6ICdpY2UtZXhwYW5kYWJsZScsXG4gICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICByZXNpemVhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgY2FuQXV0b1Jlc2l6ZTogZmFsc2UsXG4gICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSksXG4gICAgICAuLi52YWxcbiAgICBdO1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IFsuLi52YWxdO1xuICAgICAgc2V0Q29sdW1uRGVmYXVsdHModGhpcy5faW50ZXJuYWxDb2x1bW5zKTtcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbHVtbnMuXG4gICAqL1xuICBnZXQgY29sdW1ucygpOiBUYWJsZUNvbHVtbltdIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IG9mIHJvdyBvYmplY3RzIHRoYXQgc2hvdWxkIGJlXG4gICAqIHJlcHJlc2VudGVkIGFzIHNlbGVjdGVkIGluIHRoZSBncmlkLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgW11gXG4gICAqL1xuICBASW5wdXQoKSBzZWxlY3RlZDogYW55W10gPSBbXTtcblxuICAvKipcbiAgICogRW5hYmxlIHZlcnRpY2FsIHNjcm9sbGJhcnNcbiAgICovXG4gIEBJbnB1dCgpIHNjcm9sbGJhclY6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogRW5hYmxlIGhvcnogc2Nyb2xsYmFyc1xuICAgKi9cbiAgQElucHV0KCkgc2Nyb2xsYmFySDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgcm93IGhlaWdodDsgd2hpY2ggaXMgbmVjZXNzYXJ5XG4gICAqIHRvIGNhbGN1bGF0ZSB0aGUgaGVpZ2h0IGZvciB0aGUgbGF6eSByZW5kZXJpbmcuXG4gICAqL1xuICBASW5wdXQoKSByb3dIZWlnaHQ6IG51bWJlciB8ICdhdXRvJyB8ICgocm93PzogYW55KSA9PiBudW1iZXIpID0gMzA7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgY29sdW1uIHdpZHRoIGRpc3RyaWJ1dGlvbiBmb3JtdWxhLlxuICAgKiBFeGFtcGxlOiBmbGV4LCBmb3JjZSwgc3RhbmRhcmRcbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbk1vZGU6IENvbHVtbk1vZGUgPSBDb2x1bW5Nb2RlLnN0YW5kYXJkO1xuXG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBoZWFkZXIgaGVpZ2h0IGluIHBpeGVscy5cbiAgICogUGFzcyBhIGZhbHNleSBmb3Igbm8gaGVhZGVyXG4gICAqL1xuICBASW5wdXQoKSBoZWFkZXJIZWlnaHQ6IGFueSA9IDMwO1xuXG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBmb290ZXIgaGVpZ2h0IGluIHBpeGVscy5cbiAgICogUGFzcyBmYWxzZXkgZm9yIG5vIGZvb3RlclxuICAgKi9cbiAgQElucHV0KCkgZm9vdGVySGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgdGFibGUgc2hvdWxkIHVzZSBleHRlcm5hbCBwYWdpbmdcbiAgICogb3RoZXJ3aXNlIGl0cyBhc3N1bWVkIHRoYXQgYWxsIGRhdGEgaXMgcHJlbG9hZGVkLlxuICAgKi9cbiAgQElucHV0KCkgZXh0ZXJuYWxQYWdpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogSWYgdGhlIHRhYmxlIHNob3VsZCB1c2UgZXh0ZXJuYWwgc29ydGluZyBvclxuICAgKiB0aGUgYnVpbHQtaW4gYmFzaWMgc29ydGluZy5cbiAgICovXG4gIEBJbnB1dCgpIGV4dGVybmFsU29ydGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgcGFnZSBzaXplIHRvIGJlIHNob3duLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgdW5kZWZpbmVkYFxuICAgKi9cbiAgQElucHV0KCkgc2V0IGxpbWl0KHZhbDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fbGltaXQgPSB2YWw7XG5cbiAgICAvLyByZWNhbGN1bGF0ZSBzaXplcy9ldGNcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbGltaXQuXG4gICAqL1xuICBnZXQgbGltaXQoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbGltaXQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHRvdGFsIGNvdW50IG9mIGFsbCByb3dzLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgMGBcbiAgICovXG4gIEBJbnB1dCgpIHNldCBjb3VudCh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX2NvdW50ID0gdmFsO1xuXG4gICAgLy8gcmVjYWxjdWxhdGUgc2l6ZXMvZXRjXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGNvdW50LlxuICAgKi9cbiAgZ2V0IGNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvdW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IG9mZnNldCAoIHBhZ2UgLSAxICkgc2hvd24uXG4gICAqIERlZmF1bHQgdmFsdWU6IGAwYFxuICAgKi9cbiAgQElucHV0KCkgc2V0IG9mZnNldCh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX29mZnNldCA9IHZhbDtcbiAgfVxuICBnZXQgb2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKHRoaXMuX29mZnNldCwgTWF0aC5jZWlsKHRoaXMucm93Q291bnQgLyB0aGlzLnBhZ2VTaXplKSAtIDEpLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoZSBsaW5lYXIgbG9hZGluZyBiYXIuXG4gICAqIERlZmF1bHQgdmFsdWU6IGBmYWxzZWBcbiAgICovXG4gIEBJbnB1dCgpIGxvYWRpbmdJbmRpY2F0b3I6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVHlwZSBvZiByb3cgc2VsZWN0aW9uLiBPcHRpb25zIGFyZTpcbiAgICpcbiAgICogIC0gYHNpbmdsZWBcbiAgICogIC0gYG11bHRpYFxuICAgKiAgLSBgY2hlY2tib3hgXG4gICAqICAtIGBtdWx0aUNsaWNrYFxuICAgKiAgLSBgY2VsbGBcbiAgICpcbiAgICogRm9yIG5vIHNlbGVjdGlvbiBwYXNzIGEgYGZhbHNleWAuXG4gICAqIERlZmF1bHQgdmFsdWU6IGB1bmRlZmluZWRgXG4gICAqL1xuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xuXG4gIC8qKlxuICAgKiBFbmFibGUvRGlzYWJsZSBhYmlsaXR5IHRvIHJlLW9yZGVyIGNvbHVtbnNcbiAgICogYnkgZHJhZ2dpbmcgdGhlbS5cbiAgICovXG4gIEBJbnB1dCgpIHJlb3JkZXJhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogU3dhcCBjb2x1bW5zIG9uIHJlLW9yZGVyIGNvbHVtbnMgb3JcbiAgICogbW92ZSB0aGVtLlxuICAgKi9cbiAgQElucHV0KCkgc3dhcENvbHVtbnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiBzb3J0aW5nXG4gICAqL1xuICBASW5wdXQoKSBzb3J0VHlwZTogU29ydFR5cGUgPSBTb3J0VHlwZS5zaW5nbGU7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHNvcnRlZCBjb2x1bW5zIGJ5IHByb3BlcnR5IGFuZCB0eXBlLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgW11gXG4gICAqL1xuICBASW5wdXQoKSBzb3J0czogYW55W10gPSBbXTtcblxuICAvKipcbiAgICogQ3NzIGNsYXNzIG92ZXJyaWRlc1xuICAgKi9cbiAgQElucHV0KCkgY3NzQ2xhc3NlczogYW55ID0ge1xuICAgIHNvcnRBc2NlbmRpbmc6ICdkYXRhdGFibGUtaWNvbi11cCcsXG4gICAgc29ydERlc2NlbmRpbmc6ICdkYXRhdGFibGUtaWNvbi1kb3duJyxcbiAgICBwYWdlckxlZnRBcnJvdzogJ2RhdGF0YWJsZS1pY29uLWxlZnQnLFxuICAgIHBhZ2VyUmlnaHRBcnJvdzogJ2RhdGF0YWJsZS1pY29uLXJpZ2h0JyxcbiAgICBwYWdlclByZXZpb3VzOiAnZGF0YXRhYmxlLWljb24tcHJldicsXG4gICAgcGFnZXJOZXh0OiAnZGF0YXRhYmxlLWljb24tc2tpcCdcbiAgfTtcblxuICAvKipcbiAgICogTWVzc2FnZSBvdmVycmlkZXMgZm9yIGxvY2FsaXphdGlvblxuICAgKlxuICAgKiBlbXB0eU1lc3NhZ2UgICAgIFtkZWZhdWx0XSA9ICdObyBkYXRhIHRvIGRpc3BsYXknXG4gICAqIHRvdGFsTWVzc2FnZSAgICAgW2RlZmF1bHRdID0gJ3RvdGFsJ1xuICAgKiBzZWxlY3RlZE1lc3NhZ2UgIFtkZWZhdWx0XSA9ICdzZWxlY3RlZCdcbiAgICovXG4gIEBJbnB1dCgpIG1lc3NhZ2VzOiBhbnkgPSB7XG4gICAgLy8gTWVzc2FnZSB0byBzaG93IHdoZW4gYXJyYXkgaXMgcHJlc2VudGVkXG4gICAgLy8gYnV0IGNvbnRhaW5zIG5vIHZhbHVlc1xuICAgIGVtcHR5TWVzc2FnZTogJ05vIGRhdGEgdG8gZGlzcGxheScsXG5cbiAgICAvLyBGb290ZXIgdG90YWwgbWVzc2FnZVxuICAgIHRvdGFsTWVzc2FnZTogJ3RvdGFsJyxcblxuICAgIC8vIEZvb3RlciBzZWxlY3RlZCBtZXNzYWdlXG4gICAgc2VsZWN0ZWRNZXNzYWdlOiAnc2VsZWN0ZWQnXG4gIH07XG5cbiAgLyoqXG4gICAqIFJvdyBzcGVjaWZpYyBjbGFzc2VzLlxuICAgKiBTaW1pbGFyIGltcGxlbWVudGF0aW9uIHRvIG5nQ2xhc3MuXG4gICAqXG4gICAqICBbcm93Q2xhc3NdPVwiJ2ZpcnN0IHNlY29uZCdcIlxuICAgKiAgW3Jvd0NsYXNzXT1cInsgJ2ZpcnN0JzogdHJ1ZSwgJ3NlY29uZCc6IHRydWUsICd0aGlyZCc6IGZhbHNlIH1cIlxuICAgKi9cbiAgQElucHV0KCkgcm93Q2xhc3M6IGFueTtcblxuICAvKipcbiAgICogQSBib29sZWFuL2Z1bmN0aW9uIHlvdSBjYW4gdXNlIHRvIGNoZWNrIHdoZXRoZXIgeW91IHdhbnRcbiAgICogdG8gc2VsZWN0IGEgcGFydGljdWxhciByb3cgYmFzZWQgb24gYSBjcml0ZXJpYS4gRXhhbXBsZTpcbiAgICpcbiAgICogICAgKHNlbGVjdGlvbikgPT4ge1xuICAgKiAgICAgIHJldHVybiBzZWxlY3Rpb24gIT09ICdFdGhlbCBQcmljZSc7XG4gICAqICAgIH1cbiAgICovXG4gIEBJbnB1dCgpIHNlbGVjdENoZWNrOiBhbnk7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24geW91IGNhbiB1c2UgdG8gY2hlY2sgd2hldGhlciB5b3Ugd2FudFxuICAgKiB0byBzaG93IHRoZSBjaGVja2JveCBmb3IgYSBwYXJ0aWN1bGFyIHJvdyBiYXNlZCBvbiBhIGNyaXRlcmlhLiBFeGFtcGxlOlxuICAgKlxuICAgKiAgICAocm93LCBjb2x1bW4sIHZhbHVlKSA9PiB7XG4gICAqICAgICAgcmV0dXJuIHJvdy5uYW1lICE9PSAnRXRoZWwgUHJpY2UnO1xuICAgKiAgICB9XG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5Q2hlY2s6IChyb3c6IGFueSwgY29sdW1uPzogYW55LCB2YWx1ZT86IGFueSkgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBib29sZWFuIHlvdSBjYW4gdXNlIHRvIHNldCB0aGUgZGV0YXVsdCBiZWhhdmlvdXIgb2Ygcm93cyBhbmQgZ3JvdXBzXG4gICAqIHdoZXRoZXIgdGhleSB3aWxsIHN0YXJ0IGV4cGFuZGVkIG9yIG5vdC4gSWYgb21taXRlZCB0aGUgZGVmYXVsdCBpcyBOT1QgZXhwYW5kZWQuXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBncm91cEV4cGFuc2lvbkRlZmF1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogUHJvcGVydHkgdG8gd2hpY2ggeW91IGNhbiB1c2UgZm9yIGN1c3RvbSB0cmFja2luZyBvZiByb3dzLlxuICAgKiBFeGFtcGxlOiAnbmFtZSdcbiAgICovXG4gIEBJbnB1dCgpIHRyYWNrQnlQcm9wOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFByb3BlcnR5IHRvIHdoaWNoIHlvdSBjYW4gdXNlIGZvciBkZXRlcm1pbmluZyBzZWxlY3QgYWxsXG4gICAqIHJvd3Mgb24gY3VycmVudCBwYWdlIG9yIG5vdC5cbiAgICpcbiAgICogQG1lbWJlck9mIERhdGF0YWJsZUNvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgc2VsZWN0QWxsUm93c09uUGFnZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgZm9yIHJvdyB2aXJ0dWFsaXphdGlvbiBvbiAvIG9mZlxuICAgKi9cbiAgQElucHV0KCkgdmlydHVhbGl6YXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUcmVlIGZyb20gcmVsYXRpb25cbiAgICovXG4gIEBJbnB1dCgpIHRyZWVGcm9tUmVsYXRpb246IHN0cmluZztcblxuICAvKipcbiAgICogVHJlZSB0byByZWxhdGlvblxuICAgKi9cbiAgQElucHV0KCkgdHJlZVRvUmVsYXRpb246IHN0cmluZztcblxuICAvKipcbiAgICogQSBmbGFnIGZvciBzd2l0Y2hpbmcgc3VtbWFyeSByb3cgb24gLyBvZmZcbiAgICovXG4gIEBJbnB1dCgpIHN1bW1hcnlSb3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBoZWlnaHQgb2Ygc3VtbWFyeSByb3dcbiAgICovXG4gIEBJbnB1dCgpIHN1bW1hcnlIZWlnaHQ6IG51bWJlciA9IDMwO1xuXG4gIC8qKlxuICAgKiBBIHByb3BlcnR5IGhvbGRzIGEgc3VtbWFyeSByb3cgcG9zaXRpb246IHRvcC9ib3R0b21cbiAgICovXG4gIEBJbnB1dCgpIHN1bW1hcnlQb3NpdGlvbjogc3RyaW5nID0gJ3RvcCc7XG5cbiAgLyoqXG4gICAqIEJvZHkgd2FzIHNjcm9sbGVkIHR5cGljYWxseSBpbiBhIGBzY3JvbGxiYXJWOnRydWVgIHNjZW5hcmlvLlxuICAgKi9cbiAgQE91dHB1dCgpIHNjcm9sbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEEgY2VsbCBvciByb3cgd2FzIGZvY3VzZWQgdmlhIGtleWJvYXJkIG9yIG1vdXNlIGNsaWNrLlxuICAgKi9cbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQSBjZWxsIG9yIHJvdyB3YXMgc2VsZWN0ZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ29sdW1uIHNvcnQgd2FzIGludm9rZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIFRoZSB0YWJsZSB3YXMgcGFnZWQgZWl0aGVyIHRyaWdnZXJlZCBieSB0aGUgcGFnZXIgb3IgdGhlIGJvZHkgc2Nyb2xsLlxuICAgKi9cbiAgQE91dHB1dCgpIHBhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDb2x1bW5zIHdlcmUgcmUtb3JkZXJlZC5cbiAgICovXG4gIEBPdXRwdXQoKSByZW9yZGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ29sdW1uIHdhcyByZXNpemVkLlxuICAgKi9cbiAgQE91dHB1dCgpIHJlc2l6ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIFRoZSBjb250ZXh0IG1lbnUgd2FzIGludm9rZWQgb24gdGhlIHRhYmxlLlxuICAgKiB0eXBlIGluZGljYXRlcyB3aGV0aGVyIHRoZSBoZWFkZXIgb3IgdGhlIGJvZHkgd2FzIGNsaWNrZWQuXG4gICAqIGNvbnRlbnQgY29udGFpbnMgZWl0aGVyIHRoZSBjb2x1bW4gb3IgdGhlIHJvdyB0aGF0IHdhcyBjbGlja2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIHRhYmxlQ29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IE1vdXNlRXZlbnQ7IHR5cGU6IENvbnRleHRtZW51VHlwZTsgY29udGVudDogYW55IH0+KGZhbHNlKTtcblxuICAvKipcbiAgICogQSByb3cgd2FzIGV4cGFuZGVkIG90IGNvbGxhcHNlZCBmb3IgdHJlZVxuICAgKi9cbiAgQE91dHB1dCgpIHRyZWVBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCBpZiB0aGUgaGVhZGVyIGhlaWdodCBpZiBmaXhlZCBoZWlnaHQuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZpeGVkLWhlYWRlcicpXG4gIGdldCBpc0ZpeGVkSGVhZGVyKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGhlYWRlckhlaWdodDogbnVtYmVyIHwgc3RyaW5nID0gdGhpcy5oZWFkZXJIZWlnaHQ7XG4gICAgcmV0dXJuIHR5cGVvZiBoZWFkZXJIZWlnaHQgPT09ICdzdHJpbmcnID8gPHN0cmluZz5oZWFkZXJIZWlnaHQgIT09ICdhdXRvJyA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZlxuICAgKiB0aGUgcm93IGhlaWdodHMgYXJlIGZpeGVkIGhlaWdodHMuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZpeGVkLXJvdycpXG4gIGdldCBpc0ZpeGVkUm93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJvd0hlaWdodCAhPT0gJ2F1dG8nO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgZWxlbWVudCBpZlxuICAgKiB2ZXJ0aWNhbCBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2Nyb2xsLXZlcnRpY2FsJylcbiAgZ2V0IGlzVmVydFNjcm9sbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxiYXJWO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgZWxlbWVudCBpZlxuICAgKiB2aXJ0dWFsaXphdGlvbiBpcyBlbmFibGVkLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy52aXJ0dWFsaXplZCcpXG4gIGdldCBpc1ZpcnR1YWxpemVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnZpcnR1YWxpemF0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnRcbiAgICogaWYgdGhlIGhvcnppb250YWwgc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNjcm9sbC1ob3J6JylcbiAgZ2V0IGlzSG9yU2Nyb2xsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNjcm9sbGJhckg7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBlbGVtZW50IGlzIHNlbGVjdGFibGUuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGFibGUnKVxuICBnZXQgaXNTZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGlzIGNoZWNrYm94IHNlbGVjdGlvbi5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2hlY2tib3gtc2VsZWN0aW9uJylcbiAgZ2V0IGlzQ2hlY2tib3hTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5jaGVja2JveDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGlmIGNlbGwgc2VsZWN0aW9uLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jZWxsLXNlbGVjdGlvbicpXG4gIGdldCBpc0NlbGxTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5jZWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgaWYgc2luZ2xlIHNlbGVjdC5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2luZ2xlLXNlbGVjdGlvbicpXG4gIGdldCBpc1NpbmdsZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLnNpbmdsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYWRkZWQgdG8gcm9vdCBlbGVtZW50IGlmIG11bGl0IHNlbGVjdFxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tdWx0aS1zZWxlY3Rpb24nKVxuICBnZXQgaXNNdWx0aVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLm11bHRpO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhZGRlZCB0byByb290IGVsZW1lbnQgaWYgbXVsaXQgY2xpY2sgc2VsZWN0XG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm11bHRpLWNsaWNrLXNlbGVjdGlvbicpXG4gIGdldCBpc011bHRpQ2xpY2tTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5tdWx0aUNsaWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbHVtbiB0ZW1wbGF0ZXMgZ2F0aGVyZWQgZnJvbSBgQ29udGVudENoaWxkcmVuYFxuICAgKiBpZiBkZXNjcmliZWQgaW4geW91ciBtYXJrdXAuXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSlcbiAgc2V0IGNvbHVtblRlbXBsYXRlcyh2YWw6IFF1ZXJ5TGlzdDxEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmU+KSB7XG4gICAgdGhpcy5fY29sdW1uVGVtcGxhdGVzID0gdmFsO1xuICAgIHRoaXMudHJhbnNsYXRlQ29sdW1ucyh2YWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMuXG4gICAqL1xuICBnZXQgY29sdW1uVGVtcGxhdGVzKCk6IFF1ZXJ5TGlzdDxEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmU+IHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uVGVtcGxhdGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdyBEZXRhaWwgdGVtcGxhdGVzIGdhdGhlcmVkIGZyb20gdGhlIENvbnRlbnRDaGlsZFxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KVxuICByb3dEZXRhaWw6IERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZTtcblxuICAvKipcbiAgICogR3JvdXAgSGVhZGVyIHRlbXBsYXRlcyBnYXRoZXJlZCBmcm9tIHRoZSBDb250ZW50Q2hpbGRcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBncm91cEhlYWRlcjogRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmU7XG5cbiAgLyoqXG4gICAqIEZvb3RlciB0ZW1wbGF0ZSBnYXRoZXJlZCBmcm9tIHRoZSBDb250ZW50Q2hpbGRcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgZm9vdGVyOiBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmU7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgYm9keSBjb21wb25lbnQgZm9yIG1hbnVhbGx5XG4gICAqIGludm9raW5nIGZ1bmN0aW9ucyBvbiB0aGUgYm9keS5cbiAgICovXG4gIEBWaWV3Q2hpbGQoRGF0YVRhYmxlQm9keUNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGJvZHlDb21wb25lbnQ6IERhdGFUYWJsZUJvZHlDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgaGVhZGVyIGNvbXBvbmVudCBmb3IgbWFudWFsbHlcbiAgICogaW52b2tpbmcgZnVuY3Rpb25zIG9uIHRoZSBoZWFkZXIuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBEYXRhdGFibGVDb21wb25lbnRcbiAgICovXG4gIEBWaWV3Q2hpbGQoRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgaGVhZGVyQ29tcG9uZW50OiBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgYWxsIHJvd3MgYXJlIHNlbGVjdGVkLlxuICAgKi9cbiAgZ2V0IGFsbFJvd3NTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICBsZXQgYWxsUm93c1NlbGVjdGVkID0gdGhpcy5yb3dzICYmIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggPT09IHRoaXMucm93cy5sZW5ndGg7XG5cbiAgICBpZiAodGhpcy5zZWxlY3RBbGxSb3dzT25QYWdlKSB7XG4gICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5ib2R5Q29tcG9uZW50LmluZGV4ZXM7XG4gICAgICBjb25zdCByb3dzT25QYWdlID0gaW5kZXhlcy5sYXN0IC0gaW5kZXhlcy5maXJzdDtcbiAgICAgIGFsbFJvd3NTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSByb3dzT25QYWdlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkICYmIHRoaXMucm93cyAmJiB0aGlzLnJvd3MubGVuZ3RoICE9PSAwICYmIGFsbFJvd3NTZWxlY3RlZDtcbiAgfVxuXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBfaW5uZXJXaWR0aDogbnVtYmVyO1xuICBwYWdlU2l6ZTogbnVtYmVyO1xuICBib2R5SGVpZ2h0OiBudW1iZXI7XG4gIHJvd0NvdW50OiBudW1iZXIgPSAwO1xuICByb3dEaWZmZXI6IEtleVZhbHVlRGlmZmVyPHt9LCB7fT47XG5cbiAgX29mZnNldFggPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICBfbGltaXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgX2NvdW50OiBudW1iZXIgPSAwO1xuICBfb2Zmc2V0OiBudW1iZXIgPSAwO1xuICBfcm93czogYW55W107XG4gIF9ncm91cFJvd3NCeTogc3RyaW5nO1xuICBfaW50ZXJuYWxSb3dzOiBhbnlbXTtcbiAgX2ludGVybmFsQ29sdW1uczogVGFibGVDb2x1bW5bXTtcbiAgX2NvbHVtbnM6IFRhYmxlQ29sdW1uW107XG4gIF9leHBhbmRhYmxlOiBib29sZWFuO1xuICBfY29sdW1uVGVtcGxhdGVzOiBRdWVyeUxpc3Q8RGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlPjtcbiAgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQFNraXBTZWxmKCkgcHJpdmF0ZSBzY3JvbGxiYXJIZWxwZXI6IFNjcm9sbGJhckhlbHBlcixcbiAgICBAU2tpcFNlbGYoKSBwcml2YXRlIGRpbWVuc2lvbnNIZWxwZXI6IERpbWVuc2lvbnNIZWxwZXIsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgcHJpdmF0ZSBjb2x1bW5DaGFuZ2VzU2VydmljZTogQ29sdW1uQ2hhbmdlc1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnY29uZmlndXJhdGlvbicpIHByaXZhdGUgY29uZmlndXJhdGlvbjogSU5neERhdGF0YWJsZUNvbmZpZ1xuICApIHtcbiAgICAvLyBnZXQgcmVmIHRvIGVsbSBmb3IgbWVhc3VyaW5nXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMucm93RGlmZmVyID0gZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcblxuICAgIC8vIGFwcGx5IGdsb2JhbCBzZXR0aW5ncyBmcm9tIE1vZHVsZS5mb3JSb290XG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbiAmJiB0aGlzLmNvbmZpZ3VyYXRpb24ubWVzc2FnZXMpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMgPSB7IC4uLnRoaXMuY29uZmlndXJhdGlvbi5tZXNzYWdlcyB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBkYXRhLWJvdW5kXG4gICAqIHByb3BlcnRpZXMgb2YgYSBkaXJlY3RpdmUgYXJlIGluaXRpYWxpemVkLlxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gbmVlZCB0byBjYWxsIHRoaXMgaW1tZWRpYXRseSB0byBzaXplXG4gICAgLy8gaWYgdGhlIHRhYmxlIGlzIGhpZGRlbiB0aGUgdmlzaWJpbGl0eVxuICAgIC8vIGxpc3RlbmVyIHdpbGwgaW52b2tlIHRoaXMgaXRzZWxmIHVwb24gc2hvd1xuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBhIGNvbXBvbmVudCdzXG4gICAqIHZpZXcgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmV4dGVybmFsU29ydGluZykge1xuICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XG4gICAgfVxuXG4gICAgLy8gdGhpcyBoYXMgdG8gYmUgZG9uZSB0byBwcmV2ZW50IHRoZSBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgLy8gdHJlZSBmcm9tIGZyZWFraW5nIG91dCBiZWNhdXNlIHdlIGFyZSByZWFkanVzdGluZ1xuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG5cbiAgICAgIC8vIGVtaXQgcGFnZSBmb3IgdmlydHVhbCBzZXJ2ZXItc2lkZSBraWNrb2ZmXG4gICAgICBpZiAodGhpcy5leHRlcm5hbFBhZ2luZyAmJiB0aGlzLnNjcm9sbGJhclYpIHtcbiAgICAgICAgdGhpcy5wYWdlLmVtaXQoe1xuICAgICAgICAgIGNvdW50OiB0aGlzLmNvdW50LFxuICAgICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgICAgIG9mZnNldDogMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBhIGNvbXBvbmVudCdzXG4gICAqIGNvbnRlbnQgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5jb2x1bW5UZW1wbGF0ZXMuY2hhbmdlcy5zdWJzY3JpYmUodiA9PiB0aGlzLnRyYW5zbGF0ZUNvbHVtbnModikpO1xuICAgIHRoaXMubGlzdGVuRm9yQ29sdW1uSW5wdXRDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyB3aWxsIGJlIHVzZWQgd2hlbiBkaXNwbGF5aW5nIG9yIHNlbGVjdGluZyByb3dzLlxuICAgKiB3aGVuIHRyYWNraW5nL2NvbXBhcmluZyB0aGVtLCB3ZSdsbCB1c2UgdGhlIHZhbHVlIG9mIHRoaXMgZm4sXG4gICAqXG4gICAqIChgZm4oeCkgPT09IGZuKHkpYCBpbnN0ZWFkIG9mIGB4ID09PSB5YClcbiAgICovXG4gIEBJbnB1dCgpIHJvd0lkZW50aXR5OiAoeDogYW55KSA9PiBhbnkgPSAoeDogYW55KSA9PiB7XG4gICAgaWYgKHRoaXMuX2dyb3VwUm93c0J5KSB7XG4gICAgICAvLyBlYWNoIGdyb3VwIGluIGdyb3VwZWRSb3dzIGFyZSBzdG9yZWQgYXMge2tleSwgdmFsdWU6IFtyb3dzXX0sXG4gICAgICAvLyB3aGVyZSBrZXkgaXMgdGhlIGdyb3VwUm93c0J5IGluZGV4XG4gICAgICByZXR1cm4geC5rZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVHJhbnNsYXRlcyB0aGUgdGVtcGxhdGVzIHRvIHRoZSBjb2x1bW4gb2JqZWN0c1xuICAgKi9cbiAgdHJhbnNsYXRlQ29sdW1ucyh2YWw6IGFueSkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIGNvbnN0IGFyciA9IHZhbC50b0FycmF5KCk7XG4gICAgICBpZiAoYXJyLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSB0cmFuc2xhdGVUZW1wbGF0ZXMoYXJyKTtcbiAgICAgICAgc2V0Q29sdW1uRGVmYXVsdHModGhpcy5faW50ZXJuYWxDb2x1bW5zKTtcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBtYXAgd2l0aCB0aGUgZGF0YSBncm91cGVkIGJ5IHRoZSB1c2VyIGNob2ljZSBvZiBncm91cGluZyBpbmRleFxuICAgKlxuICAgKiBAcGFyYW0gb3JpZ2luYWxBcnJheSB0aGUgb3JpZ2luYWwgYXJyYXkgcGFzc2VkIHZpYSBwYXJhbWV0ZXJcbiAgICogQHBhcmFtIGdyb3VwQnlJbmRleCAgdGhlIGluZGV4IG9mIHRoZSBjb2x1bW4gdG8gZ3JvdXAgdGhlIGRhdGEgYnlcbiAgICovXG4gIGdyb3VwQXJyYXlCeShvcmlnaW5hbEFycmF5OiBhbnksIGdyb3VwQnk6IGFueSkge1xuICAgIC8vIGNyZWF0ZSBhIG1hcCB0byBob2xkIGdyb3VwcyB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmcgcmVzdWx0c1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgaTogbnVtYmVyID0gMDtcblxuICAgIG9yaWdpbmFsQXJyYXkuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBpdGVtW2dyb3VwQnldO1xuICAgICAgaWYgKCFtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgbWFwLnNldChrZXksIFtpdGVtXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXAuZ2V0KGtleSkucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9KTtcblxuICAgIGNvbnN0IGFkZEdyb3VwID0gKGtleTogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgICByZXR1cm4geyBrZXksIHZhbHVlIH07XG4gICAgfTtcblxuICAgIC8vIGNvbnZlcnQgbWFwIGJhY2sgdG8gYSBzaW1wbGUgYXJyYXkgb2Ygb2JqZWN0c1xuICAgIHJldHVybiBBcnJheS5mcm9tKG1hcCwgeCA9PiBhZGRHcm91cCh4WzBdLCB4WzFdKSk7XG4gIH1cblxuICAvKlxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIEFuZ3VsYXIgZGlydHkgY2hlY2tzIGEgZGlyZWN0aXZlLlxuICAgKi9cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJvd0RpZmZlci5kaWZmKHRoaXMucm93cykpIHtcbiAgICAgIGlmICghdGhpcy5leHRlcm5hbFNvcnRpbmcpIHtcbiAgICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBbLi4udGhpcy5yb3dzXTtcbiAgICAgIH1cblxuICAgICAgLy8gYXV0byBncm91cCBieSBwYXJlbnQgb24gbmV3IHVwZGF0ZVxuICAgICAgdGhpcy5faW50ZXJuYWxSb3dzID0gZ3JvdXBSb3dzQnlQYXJlbnRzKFxuICAgICAgICB0aGlzLl9pbnRlcm5hbFJvd3MsXG4gICAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVGcm9tUmVsYXRpb24pLFxuICAgICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlVG9SZWxhdGlvbilcbiAgICAgICk7XG5cbiAgICAgIHRoaXMucmVjYWxjdWxhdGVQYWdlcygpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVjYWxjJ3MgdGhlIHNpemVzIG9mIHRoZSBncmlkLlxuICAgKlxuICAgKiBVcGRhdGVkIGF1dG9tYXRpY2FsbHkgb24gY2hhbmdlcyB0bzpcbiAgICpcbiAgICogIC0gQ29sdW1uc1xuICAgKiAgLSBSb3dzXG4gICAqICAtIFBhZ2luZyByZWxhdGVkXG4gICAqXG4gICAqIEFsc28gY2FuIGJlIG1hbnVhbGx5IGludm9rZWQgb3IgdXBvbiB3aW5kb3cgcmVzaXplLlxuICAgKi9cbiAgcmVjYWxjdWxhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5yZWNhbGN1bGF0ZURpbXMoKTtcbiAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdpbmRvdyByZXNpemUgaGFuZGxlciB0byB1cGRhdGUgc2l6ZXMuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgQHRocm90dGxlYWJsZSg1KVxuICBvbldpbmRvd1Jlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVjYWx1bGNhdGVzIHRoZSBjb2x1bW4gd2lkdGhzIGJhc2VkIG9uIGNvbHVtbiB3aWR0aFxuICAgKiBkaXN0cmlidXRpb24gbW9kZSBhbmQgc2Nyb2xsYmFyIG9mZnNldHMuXG4gICAqL1xuICByZWNhbGN1bGF0ZUNvbHVtbnMoXG4gICAgY29sdW1uczogYW55W10gPSB0aGlzLl9pbnRlcm5hbENvbHVtbnMsXG4gICAgZm9yY2VJZHg6IG51bWJlciA9IC0xLFxuICAgIGFsbG93QmxlZWQ6IGJvb2xlYW4gPSB0aGlzLnNjcm9sbGJhckhcbiAgKTogYW55W10gfCB1bmRlZmluZWQge1xuICAgIGlmICghY29sdW1ucykgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIGxldCB3aWR0aCA9IHRoaXMuX2lubmVyV2lkdGg7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyVikge1xuICAgICAgd2lkdGggPSB3aWR0aCAtIHRoaXMuc2Nyb2xsYmFySGVscGVyLndpZHRoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbHVtbk1vZGUgPT09IENvbHVtbk1vZGUuZm9yY2UpIHtcbiAgICAgIGZvcmNlRmlsbENvbHVtbldpZHRocyhjb2x1bW5zLCB3aWR0aCwgZm9yY2VJZHgsIGFsbG93QmxlZWQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb2x1bW5Nb2RlID09PSBDb2x1bW5Nb2RlLmZsZXgpIHtcbiAgICAgIGFkanVzdENvbHVtbldpZHRocyhjb2x1bW5zLCB3aWR0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH1cblxuICAvKipcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBkaW1lbnNpb25zIG9mIHRoZSB0YWJsZSBzaXplLlxuICAgKiBJbnRlcm5hbGx5IGNhbGxzIHRoZSBwYWdlIHNpemUgYW5kIHJvdyBjb3VudCBjYWxjcyB0b28uXG4gICAqXG4gICAqL1xuICByZWNhbGN1bGF0ZURpbXMoKTogdm9pZCB7XG4gICAgY29uc3QgZGltcyA9IHRoaXMuZGltZW5zaW9uc0hlbHBlci5nZXREaW1lbnNpb25zKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IE1hdGguZmxvb3IoZGltcy53aWR0aCk7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gZGltcy5oZWlnaHQ7XG4gICAgICBpZiAodGhpcy5oZWFkZXJIZWlnaHQpIGhlaWdodCA9IGhlaWdodCAtIHRoaXMuaGVhZGVySGVpZ2h0O1xuICAgICAgaWYgKHRoaXMuZm9vdGVySGVpZ2h0KSBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmZvb3RlckhlaWdodDtcbiAgICAgIHRoaXMuYm9keUhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICB0aGlzLnJlY2FsY3VsYXRlUGFnZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZXMgdGhlIHBhZ2VzIGFmdGVyIGEgdXBkYXRlLlxuICAgKi9cbiAgcmVjYWxjdWxhdGVQYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VTaXplID0gdGhpcy5jYWxjUGFnZVNpemUoKTtcbiAgICB0aGlzLnJvd0NvdW50ID0gdGhpcy5jYWxjUm93Q291bnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCb2R5IHRyaWdnZXJlZCBhIHBhZ2UgZXZlbnQuXG4gICAqL1xuICBvbkJvZHlQYWdlKHsgb2Zmc2V0IH06IGFueSk6IHZvaWQge1xuICAgIC8vIEF2b2lkIHBhZ2luYXRpb24gY2FtaW5nIGZyb20gYm9keSBldmVudHMgbGlrZSBzY3JvbGwgd2hlbiB0aGUgdGFibGVcbiAgICAvLyBoYXMgbm8gdmlydHVhbGl6YXRpb24gYW5kIHRoZSBleHRlcm5hbCBwYWdpbmcgaXMgZW5hYmxlLlxuICAgIC8vIFRoaXMgbWVhbnMsIGxldCdzIHRoZSBkZXZlbG9wZXIgaGFuZGxlIHBhZ2luYXRpb24gYnkgbXkgaGltKGhlcikgc2VsZlxuICAgIGlmICh0aGlzLmV4dGVybmFsUGFnaW5nICYmICF0aGlzLnZpcnR1YWxpemF0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICB0aGlzLnBhZ2UuZW1pdCh7XG4gICAgICBjb3VudDogdGhpcy5jb3VudCxcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJvZHkgdHJpZ2dlcmVkIGEgc2Nyb2xsIGV2ZW50LlxuICAgKi9cbiAgb25Cb2R5U2Nyb2xsKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5fb2Zmc2V0WC5uZXh0KGV2ZW50Lm9mZnNldFgpO1xuICAgIHRoaXMuc2Nyb2xsLmVtaXQoZXZlbnQpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmb290ZXIgdHJpZ2dlcmVkIGEgcGFnZSBldmVudC5cbiAgICovXG4gIG9uRm9vdGVyUGFnZShldmVudDogYW55KSB7XG4gICAgdGhpcy5vZmZzZXQgPSBldmVudC5wYWdlIC0gMTtcbiAgICB0aGlzLmJvZHlDb21wb25lbnQudXBkYXRlT2Zmc2V0WSh0aGlzLm9mZnNldCk7XG5cbiAgICB0aGlzLnBhZ2UuZW1pdCh7XG4gICAgICBjb3VudDogdGhpcy5jb3VudCxcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5zZWxlY3RBbGxSb3dzT25QYWdlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZXMgdGhlIHNpemVzIG9mIHRoZSBwYWdlXG4gICAqL1xuICBjYWxjUGFnZVNpemUodmFsOiBhbnlbXSA9IHRoaXMucm93cyk6IG51bWJlciB7XG4gICAgLy8gS2VlcCB0aGUgcGFnZSBzaXplIGNvbnN0YW50IGV2ZW4gaWYgdGhlIHJvdyBoYXMgYmVlbiBleHBhbmRlZC5cbiAgICAvLyBUaGlzIGlzIGJlY2F1c2UgYW4gZXhwYW5kZWQgcm93IGlzIHN0aWxsIGNvbnNpZGVyZWQgdG8gYmUgYSBjaGlsZCBvZlxuICAgIC8vIHRoZSBvcmlnaW5hbCByb3cuICBIZW5jZSBjYWxjdWxhdGlvbiB3b3VsZCB1c2Ugcm93SGVpZ2h0IG9ubHkuXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViAmJiB0aGlzLnZpcnR1YWxpemF0aW9uKSB7XG4gICAgICBjb25zdCBzaXplID0gTWF0aC5jZWlsKHRoaXMuYm9keUhlaWdodCAvICh0aGlzLnJvd0hlaWdodCBhcyBudW1iZXIpKTtcbiAgICAgIHJldHVybiBNYXRoLm1heChzaXplLCAwKTtcbiAgICB9XG5cbiAgICAvLyBpZiBsaW1pdCBpcyBwYXNzZWQsIHdlIGFyZSBwYWdpbmdcbiAgICBpZiAodGhpcy5saW1pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5saW1pdDtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgdXNlIHJvdyBsZW5ndGhcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvLyBvdGhlciBlbXB0eSA6KFxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHJvdyBjb3VudC5cbiAgICovXG4gIGNhbGNSb3dDb3VudCh2YWw6IGFueVtdID0gdGhpcy5yb3dzKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuZXh0ZXJuYWxQYWdpbmcpIHtcbiAgICAgIGlmICghdmFsKSByZXR1cm4gMDtcblxuICAgICAgaWYgKHRoaXMuZ3JvdXBlZFJvd3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBlZFJvd3MubGVuZ3RoO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnRyZWVGcm9tUmVsYXRpb24gIT0gbnVsbCAmJiB0aGlzLnRyZWVUb1JlbGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsUm93cy5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaGVhZGVyIHRyaWdnZXJlZCBhIGNvbnRleHRtZW51IGV2ZW50LlxuICAgKi9cbiAgb25Db2x1bW5Db250ZXh0bWVudSh7IGV2ZW50LCBjb2x1bW4gfTogYW55KTogdm9pZCB7XG4gICAgdGhpcy50YWJsZUNvbnRleHRtZW51LmVtaXQoeyBldmVudCwgdHlwZTogQ29udGV4dG1lbnVUeXBlLmhlYWRlciwgY29udGVudDogY29sdW1uIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBib2R5IHRyaWdnZXJlZCBhIGNvbnRleHRtZW51IGV2ZW50LlxuICAgKi9cbiAgb25Sb3dDb250ZXh0bWVudSh7IGV2ZW50LCByb3cgfTogYW55KTogdm9pZCB7XG4gICAgdGhpcy50YWJsZUNvbnRleHRtZW51LmVtaXQoeyBldmVudCwgdHlwZTogQ29udGV4dG1lbnVUeXBlLmJvZHksIGNvbnRlbnQ6IHJvdyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaGVhZGVyIHRyaWdnZXJlZCBhIGNvbHVtbiByZXNpemUgZXZlbnQuXG4gICAqL1xuICBvbkNvbHVtblJlc2l6ZSh7IGNvbHVtbiwgbmV3VmFsdWUgfTogYW55KTogdm9pZCB7XG4gICAgLyogU2FmYXJpL2lPUyAxMC4yIHdvcmthcm91bmQgKi9cbiAgICBpZiAoY29sdW1uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaWR4OiBudW1iZXI7XG4gICAgY29uc3QgY29scyA9IHRoaXMuX2ludGVybmFsQ29sdW1ucy5tYXAoKGMsIGkpID0+IHtcbiAgICAgIGMgPSB7IC4uLmMgfTtcblxuICAgICAgaWYgKGMuJCRpZCA9PT0gY29sdW1uLiQkaWQpIHtcbiAgICAgICAgaWR4ID0gaTtcbiAgICAgICAgYy53aWR0aCA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIC8vIHNldCB0aGlzIHNvIHdlIGNhbiBmb3JjZSB0aGUgY29sdW1uXG4gICAgICAgIC8vIHdpZHRoIGRpc3RyaWJ1dGlvbiB0byBiZSB0byB0aGlzIHZhbHVlXG4gICAgICAgIGMuJCRvbGRXaWR0aCA9IG5ld1ZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYztcbiAgICB9KTtcblxuICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKGNvbHMsIGlkeCk7XG4gICAgdGhpcy5faW50ZXJuYWxDb2x1bW5zID0gY29scztcblxuICAgIHRoaXMucmVzaXplLmVtaXQoe1xuICAgICAgY29sdW1uLFxuICAgICAgbmV3VmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaGVhZGVyIHRyaWdnZXJlZCBhIGNvbHVtbiByZS1vcmRlciBldmVudC5cbiAgICovXG4gIG9uQ29sdW1uUmVvcmRlcih7IGNvbHVtbiwgbmV3VmFsdWUsIHByZXZWYWx1ZSB9OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjb2xzID0gdGhpcy5faW50ZXJuYWxDb2x1bW5zLm1hcChjID0+IHtcbiAgICAgIHJldHVybiB7IC4uLmMgfTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnN3YXBDb2x1bW5zKSB7XG4gICAgICBjb25zdCBwcmV2Q29sID0gY29sc1tuZXdWYWx1ZV07XG4gICAgICBjb2xzW25ld1ZhbHVlXSA9IGNvbHVtbjtcbiAgICAgIGNvbHNbcHJldlZhbHVlXSA9IHByZXZDb2w7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChuZXdWYWx1ZSA+IHByZXZWYWx1ZSkge1xuICAgICAgICBjb25zdCBtb3ZlZENvbCA9IGNvbHNbcHJldlZhbHVlXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHByZXZWYWx1ZTsgaSA8IG5ld1ZhbHVlOyBpKyspIHtcbiAgICAgICAgICBjb2xzW2ldID0gY29sc1tpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgY29sc1tuZXdWYWx1ZV0gPSBtb3ZlZENvbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1vdmVkQ29sID0gY29sc1twcmV2VmFsdWVdO1xuICAgICAgICBmb3IgKGxldCBpID0gcHJldlZhbHVlOyBpID4gbmV3VmFsdWU7IGktLSkge1xuICAgICAgICAgIGNvbHNbaV0gPSBjb2xzW2kgLSAxXTtcbiAgICAgICAgfVxuICAgICAgICBjb2xzW25ld1ZhbHVlXSA9IG1vdmVkQ29sO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IGNvbHM7XG5cbiAgICB0aGlzLnJlb3JkZXIuZW1pdCh7XG4gICAgICBjb2x1bW4sXG4gICAgICBuZXdWYWx1ZSxcbiAgICAgIHByZXZWYWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBoZWFkZXIgdHJpZ2dlcmVkIGEgY29sdW1uIHNvcnQgZXZlbnQuXG4gICAqL1xuICBvbkNvbHVtblNvcnQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIC8vIGNsZWFuIHNlbGVjdGVkIHJvd3NcbiAgICBpZiAodGhpcy5zZWxlY3RBbGxSb3dzT25QYWdlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc29ydHMgPSBldmVudC5zb3J0cztcblxuICAgIC8vIHRoaXMgY291bGQgYmUgb3B0aW1pemVkIGJldHRlciBzaW5jZSBpdCB3aWxsIHJlc29ydFxuICAgIC8vIHRoZSByb3dzIGFnYWluIG9uIHRoZSAncHVzaCcgZGV0ZWN0aW9uLi4uXG4gICAgaWYgKHRoaXMuZXh0ZXJuYWxTb3J0aW5nID09PSBmYWxzZSkge1xuICAgICAgLy8gZG9uJ3QgdXNlIG5vcm1hbCBzZXR0ZXIgc28gd2UgZG9uJ3QgcmVzb3J0XG4gICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcbiAgICB9XG5cbiAgICAvLyBhdXRvIGdyb3VwIGJ5IHBhcmVudCBvbiBuZXcgdXBkYXRlXG4gICAgdGhpcy5faW50ZXJuYWxSb3dzID0gZ3JvdXBSb3dzQnlQYXJlbnRzKFxuICAgICAgdGhpcy5faW50ZXJuYWxSb3dzLFxuICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZUZyb21SZWxhdGlvbiksXG4gICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlVG9SZWxhdGlvbilcbiAgICApO1xuXG4gICAgLy8gQWx3YXlzIGdvIHRvIGZpcnN0IHBhZ2Ugd2hlbiBzb3J0aW5nIHRvIHNlZSB0aGUgbmV3bHkgc29ydGVkIGRhdGFcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgdGhpcy5ib2R5Q29tcG9uZW50LnVwZGF0ZU9mZnNldFkodGhpcy5vZmZzZXQpO1xuICAgIHRoaXMuc29ydC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgYWxsIHJvdyBzZWxlY3Rpb25cbiAgICovXG4gIG9uSGVhZGVyU2VsZWN0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RBbGxSb3dzT25QYWdlKSB7XG4gICAgICAvLyBiZWZvcmUgd2Ugc3BsaWNlLCBjaGsgaWYgd2UgY3VycmVudGx5IGhhdmUgYWxsIHNlbGVjdGVkXG4gICAgICBjb25zdCBmaXJzdCA9IHRoaXMuYm9keUNvbXBvbmVudC5pbmRleGVzLmZpcnN0O1xuICAgICAgY29uc3QgbGFzdCA9IHRoaXMuYm9keUNvbXBvbmVudC5pbmRleGVzLmxhc3Q7XG4gICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSBsYXN0IC0gZmlyc3Q7XG5cbiAgICAgIC8vIHJlbW92ZSBhbGwgZXhpc3RpbmcgZWl0aGVyIHdheVxuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuXG4gICAgICAvLyBkbyB0aGUgb3Bwb3NpdGUgaGVyZVxuICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goLi4udGhpcy5faW50ZXJuYWxSb3dzLnNsaWNlKGZpcnN0LCBsYXN0KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGJlZm9yZSB3ZSBzcGxpY2UsIGNoayBpZiB3ZSBjdXJyZW50bHkgaGF2ZSBhbGwgc2VsZWN0ZWRcbiAgICAgIGNvbnN0IGFsbFNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZC5sZW5ndGggPT09IHRoaXMucm93cy5sZW5ndGg7XG4gICAgICAvLyByZW1vdmUgYWxsIGV4aXN0aW5nIGVpdGhlciB3YXlcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgIC8vIGRvIHRoZSBvcHBvc2l0ZSBoZXJlXG4gICAgICBpZiAoIWFsbFNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi50aGlzLnJvd3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xuICAgICAgc2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWRcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJvdyB3YXMgc2VsZWN0ZWQgZnJvbSBib2R5XG4gICAqL1xuICBvbkJvZHlTZWxlY3QoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcm93IHdhcyBleHBhbmRlZCBvciBjb2xsYXBzZWQgZm9yIHRyZWVcbiAgICovXG4gIG9uVHJlZUFjdGlvbihldmVudDogYW55KSB7XG4gICAgY29uc3Qgcm93ID0gZXZlbnQucm93O1xuICAgIC8vIFRPRE86IEZvciBkdXBsaWNhdGVkIGl0ZW1zIHRoaXMgd2lsbCBub3Qgd29ya1xuICAgIGNvbnN0IHJvd0luZGV4ID0gdGhpcy5fcm93cy5maW5kSW5kZXgociA9PiByW3RoaXMudHJlZVRvUmVsYXRpb25dID09PSBldmVudC5yb3dbdGhpcy50cmVlVG9SZWxhdGlvbl0pO1xuICAgIHRoaXMudHJlZUFjdGlvbi5lbWl0KHsgcm93LCByb3dJbmRleCB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGxpc3RlbiBmb3IgY2hhbmdlcyB0byBpbnB1dCBiaW5kaW5ncyBvZiBhbGwgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIGFuZFxuICAgKiB0cmlnZ2VyIHRoZSBjb2x1bW5UZW1wbGF0ZXMuY2hhbmdlcyBvYnNlcnZhYmxlIHRvIGVtaXRcbiAgICovXG4gIHByaXZhdGUgbGlzdGVuRm9yQ29sdW1uSW5wdXRDaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY29sdW1uQ2hhbmdlc1NlcnZpY2UuY29sdW1uSW5wdXRDaGFuZ2VzJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5UZW1wbGF0ZXMpIHtcbiAgICAgICAgICB0aGlzLmNvbHVtblRlbXBsYXRlcy5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzb3J0SW50ZXJuYWxSb3dzKCk6IHZvaWQge1xuICAgIHRoaXMuX2ludGVybmFsUm93cyA9IHNvcnRSb3dzKHRoaXMuX2ludGVybmFsUm93cywgdGhpcy5faW50ZXJuYWxDb2x1bW5zLCB0aGlzLnNvcnRzKTtcbiAgfVxufVxuIl19