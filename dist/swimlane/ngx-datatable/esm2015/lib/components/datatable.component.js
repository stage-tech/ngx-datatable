/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, ElementRef, EventEmitter, ViewChild, ContentChildren, QueryList, HostBinding, ContentChild, KeyValueDiffers, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, SkipSelf, Optional, Inject } from '@angular/core';
import { DatatableGroupHeaderDirective } from './body/body-group-header.directive';
import { BehaviorSubject, Subject, asyncScheduler } from 'rxjs';
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
import { forceFillColumnWidths, adjustColumnWidths } from '../utils/math';
import { sortRows } from '../utils/sort';
import { ResizeSensor } from 'css-element-queries';
import { throttleTime, delay } from 'rxjs/operators';
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
        this.expandable = false;
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
         * Ice column filter was invoked.
         */
        this.filter = new EventEmitter();
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
        this.recalculate$ = new Subject();
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
        if (ResizeSensor) {
            this.resizeSensor = new ResizeSensor(this.element, (/**
             * @return {?}
             */
            () => this.recalculate$.next()));
        }
        this._subscriptions.push(this.recalculate$
            .pipe(throttleTime(250, asyncScheduler, { leading: true, trailing: true }), delay(100))
            .subscribe((/**
         * @return {?}
         */
        () => this.recalculate())));
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
        requestAnimationFrame((/**
         * @return {?}
         */
        () => {
            if (!((/** @type {?} */ (this.cd))).destroyed) {
                this.cd.detectChanges();
            }
        }));
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
     * @param {?} event
     * @return {?}
     */
    onColumnFilter(event) {
        this.filter.emit(event);
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
        if (this.resizeSensor) {
            this.resizeSensor.detach();
        }
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
                template: "<div visibilityObserver (visible)=\"recalculate()\">\r\n  <datatable-header\r\n    *ngIf=\"headerHeight\"\r\n    [sorts]=\"sorts\"\r\n    [sortType]=\"sortType\"\r\n    [scrollbarH]=\"scrollbarH\"\r\n    [innerWidth]=\"_innerWidth\"\r\n    [offsetX]=\"_offsetX | async\"\r\n    [dealsWithGroup]=\"groupedRows !== undefined\"\r\n    [columns]=\"_internalColumns\"\r\n    [headerHeight]=\"headerHeight\"\r\n    [reorderable]=\"reorderable\"\r\n    [targetMarkerTemplate]=\"targetMarkerTemplate\"\r\n    [sortAscendingIcon]=\"cssClasses.sortAscending\"\r\n    [sortDescendingIcon]=\"cssClasses.sortDescending\"\r\n    [allRowsSelected]=\"allRowsSelected\"\r\n    [selectionType]=\"selectionType\"\r\n    (sort)=\"onColumnSort($event)\"\r\n    (filter)=\"onColumnFilter($event)\"\r\n    (resize)=\"onColumnResize($event)\"\r\n    (reorder)=\"onColumnReorder($event)\"\r\n    (select)=\"onHeaderSelect($event)\"\r\n    (columnContextmenu)=\"onColumnContextmenu($event)\"\r\n  >\r\n  </datatable-header>\r\n  <datatable-body\r\n    [groupRowsBy]=\"groupRowsBy\"\r\n    [groupedRows]=\"groupedRows\"\r\n    [rows]=\"_internalRows\"\r\n    [groupExpansionDefault]=\"groupExpansionDefault\"\r\n    [scrollbarV]=\"scrollbarV\"\r\n    [scrollbarH]=\"scrollbarH\"\r\n    [virtualization]=\"virtualization\"\r\n    [loadingIndicator]=\"loadingIndicator\"\r\n    [externalPaging]=\"externalPaging\"\r\n    [rowHeight]=\"rowHeight\"\r\n    [rowCount]=\"rowCount\"\r\n    [offset]=\"offset\"\r\n    [trackByProp]=\"trackByProp\"\r\n    [columns]=\"_internalColumns\"\r\n    [pageSize]=\"pageSize\"\r\n    [offsetX]=\"_offsetX | async\"\r\n    [rowDetail]=\"rowDetail\"\r\n    [groupHeader]=\"groupHeader\"\r\n    [selected]=\"selected\"\r\n    [innerWidth]=\"_innerWidth\"\r\n    [bodyHeight]=\"bodyHeight\"\r\n    [selectionType]=\"selectionType\"\r\n    [emptyMessage]=\"messages.emptyMessage\"\r\n    [rowIdentity]=\"rowIdentity\"\r\n    [rowClass]=\"rowClass\"\r\n    [selectCheck]=\"selectCheck\"\r\n    [displayCheck]=\"displayCheck\"\r\n    [summaryRow]=\"summaryRow\"\r\n    [summaryHeight]=\"summaryHeight\"\r\n    [summaryPosition]=\"summaryPosition\"\r\n    (page)=\"onBodyPage($event)\"\r\n    (activate)=\"activate.emit($event)\"\r\n    (rowContextmenu)=\"onRowContextmenu($event)\"\r\n    (select)=\"onBodySelect($event)\"\r\n    (scroll)=\"onBodyScroll($event)\"\r\n    (treeAction)=\"onTreeAction($event)\"\r\n  >\r\n  </datatable-body>\r\n  <datatable-footer\r\n    *ngIf=\"footerHeight\"\r\n    [rowCount]=\"rowCount\"\r\n    [pageSize]=\"pageSize\"\r\n    [offset]=\"offset\"\r\n    [footerHeight]=\"footerHeight\"\r\n    [footerTemplate]=\"footer\"\r\n    [totalMessage]=\"messages.totalMessage\"\r\n    [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\r\n    [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\r\n    [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\r\n    [selectedCount]=\"selected.length\"\r\n    [selectedMessage]=\"!!selectionType && messages.selectedMessage\"\r\n    [pagerNextIcon]=\"cssClasses.pagerNext\"\r\n    (page)=\"onFooterPage($event)\"\r\n  >\r\n  </datatable-footer>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    class: 'ngx-datatable'
                },
                styles: [".ngx-datatable{display:block;overflow:hidden;justify-content:center;position:relative;-webkit-transform:translate3d(0,0,0)}.ngx-datatable [hidden]{display:none!important}.ngx-datatable *,.ngx-datatable :after,.ngx-datatable :before{box-sizing:border-box}.ngx-datatable.scroll-vertical .datatable-body{overflow-y:auto}.ngx-datatable.scroll-vertical.virtualized .datatable-body .datatable-row-wrapper{position:absolute}.ngx-datatable.scroll-horz .datatable-body{overflow-x:auto;-webkit-overflow-scrolling:touch}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner{white-space:nowrap}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngx-datatable.fixed-row .datatable-scroll,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row{white-space:nowrap}.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ngx-datatable .datatable-body-row,.ngx-datatable .datatable-header-inner,.ngx-datatable .datatable-row-center{display:flex;flex-direction:row;-o-flex-flow:row;flex-flow:row}.ngx-datatable .datatable-body-cell,.ngx-datatable .datatable-header-cell{overflow-x:hidden;vertical-align:top;display:inline-block;line-height:1.625}.ngx-datatable .datatable-body-cell:focus,.ngx-datatable .datatable-header-cell:focus{outline:0}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-right{z-index:9}.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-row-group,.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-right{position:relative}.ngx-datatable .datatable-header{display:block;overflow:hidden}.ngx-datatable .datatable-header .datatable-header-inner{align-items:stretch;-webkit-align-items:stretch}.ngx-datatable .datatable-header .filter-template-wrap{padding:0 0 0 .9rem!important}.ngx-datatable .datatable-header .datatable-header-cell{position:relative;display:inline-block}.ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper{cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper{cursor:move}.ngx-datatable .datatable-header .datatable-header-cell .sort-btn{line-height:100%;vertical-align:middle;display:inline-block;cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell .filter-header{padding-top:5px}.ngx-datatable .datatable-header .datatable-header-cell .filter-header .mat-form-field-flex{height:40px}.ngx-datatable .datatable-header .datatable-header-cell .filter-header .mat-form-field-label-wrapper{font-size:12px;font-weight:500;top:-1.01em}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell .resize-handle--not-resizable{display:inline-block;position:absolute;right:0;top:0;bottom:0;width:5px;padding:0 4px;visibility:hidden}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle{cursor:ew-resize}.ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell:hover .resize-handle--not-resizable{visibility:visible}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker{position:absolute;top:0;bottom:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromLeft{right:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromRight{left:0}.ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-template-wrap{height:inherit}.ngx-datatable .datatable-body{position:relative;z-index:10;display:block}.ngx-datatable .datatable-body .datatable-scroll{display:inline-block}.ngx-datatable .datatable-body .datatable-row-detail{overflow-y:hidden}.ngx-datatable .datatable-body .datatable-row-wrapper{display:flex;flex-direction:column}.ngx-datatable .datatable-body .datatable-body-row{outline:0}.ngx-datatable .datatable-body .datatable-body-row>div{display:flex}.ngx-datatable .datatable-footer{display:block;width:100%;overflow:auto}.ngx-datatable .datatable-footer .datatable-footer-inner{display:flex;align-items:center;width:100%}.ngx-datatable .datatable-footer .selected-count .page-count{flex:1 1 40%}.ngx-datatable .datatable-footer .selected-count .datatable-pager{flex:1 1 60%}.ngx-datatable .datatable-footer .page-count{flex:1 1 20%}.ngx-datatable .datatable-footer .datatable-pager{flex:1 1 80%;text-align:right}.ngx-datatable .datatable-footer .datatable-pager .pager,.ngx-datatable .datatable-footer .datatable-pager .pager li{padding:0;margin:0;display:inline-block;list-style:none}.ngx-datatable .datatable-footer .datatable-pager .pager li,.ngx-datatable .datatable-footer .datatable-pager .pager li a{outline:0}.ngx-datatable .datatable-footer .datatable-pager .pager li a{cursor:pointer;display:inline-block}.ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a{cursor:not-allowed}"]
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
    filter: [{ type: Output }],
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
    rowIdentity: [{ type: Input }]
};
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
    /** @type {?} */
    DatatableComponent.prototype.expandable;
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
     * Ice column filter was invoked.
     * @type {?}
     */
    DatatableComponent.prototype.filter;
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
    DatatableComponent.prototype._columnTemplates;
    /** @type {?} */
    DatatableComponent.prototype._subscriptions;
    /** @type {?} */
    DatatableComponent.prototype.resizeSensor;
    /** @type {?} */
    DatatableComponent.prototype.recalculate$;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxFQUVULGVBQWUsRUFFZixTQUFTLEVBRVQsV0FBVyxFQUNYLFlBQVksRUFFWixlQUFlLEVBRWYsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsUUFBUSxFQUVSLFFBQVEsRUFDUixNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbkYsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixD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QXVEOzs7OztJQUt2RCxxQ0FBMEQ7Ozs7O0lBSzFELG9DQUF5RDs7Ozs7OztJQU96RCw4Q0FBaUg7Ozs7O0lBS2pILHdDQUE2RDs7Ozs7SUFtSDdELHVDQUN1Qzs7Ozs7SUFLdkMseUNBQzJDOzs7OztJQUszQyxvQ0FDaUM7Ozs7OztJQU1qQywyQ0FDc0M7Ozs7Ozs7O0lBUXRDLDZDQUMwQzs7SUFpQjFDLHFDQUFxQjs7SUFDckIseUNBQW9COztJQUNwQixzQ0FBaUI7O0lBQ2pCLHdDQUFtQjs7SUFDbkIsc0NBQXFCOztJQUNyQix1Q0FBa0M7O0lBRWxDLHNDQUFrQzs7SUFDbEMsb0NBQTJCOztJQUMzQixvQ0FBbUI7O0lBQ25CLHFDQUFvQjs7SUFDcEIsbUNBQWE7O0lBQ2IsMENBQXFCOztJQUNyQiwyQ0FBcUI7O0lBQ3JCLDhDQUFnQzs7SUFDaEMsc0NBQXdCOztJQUN4Qiw4Q0FBc0Q7O0lBQ3RELDRDQUFvQzs7SUFDcEMsMENBQTJCOztJQUMzQiwwQ0FBNkI7Ozs7Ozs7O0lBd0Y3Qix5Q0FRRTs7Ozs7SUE3RkEsNkNBQW9EOzs7OztJQUNwRCw4Q0FBc0Q7Ozs7O0lBQ3RELGdDQUE2Qjs7Ozs7SUFHN0Isa0RBQWtEOzs7OztJQUNsRCwyQ0FBK0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0NoaWxkLFxuICBIb3N0TGlzdGVuZXIsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyVmlld0luaXQsXG4gIEhvc3RCaW5kaW5nLFxuICBDb250ZW50Q2hpbGQsXG4gIERvQ2hlY2ssXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgS2V5VmFsdWVEaWZmZXIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFNraXBTZWxmLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG4gIFZpZXdSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLmRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBTdWJqZWN0LCBhc3luY1NjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSU5neERhdGF0YWJsZUNvbmZpZyB9IGZyb20gJy4uL25neC1kYXRhdGFibGUubW9kdWxlJztcbmltcG9ydCB7IGdyb3VwUm93c0J5UGFyZW50cywgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wIH0gZnJvbSAnLi4vdXRpbHMvdHJlZSc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcbmltcG9ydCB7IHNldENvbHVtbkRlZmF1bHRzLCB0cmFuc2xhdGVUZW1wbGF0ZXMgfSBmcm9tICcuLi91dGlscy9jb2x1bW4taGVscGVyJztcbmltcG9ydCB7IENvbHVtbk1vZGUgfSBmcm9tICcuLi90eXBlcy9jb2x1bW4tbW9kZS50eXBlJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uL3R5cGVzL3NvcnQudHlwZSc7XG5pbXBvcnQgeyBDb250ZXh0bWVudVR5cGUgfSBmcm9tICcuLi90eXBlcy9jb250ZXh0bWVudS50eXBlJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSB9IGZyb20gJy4vcm93LWRldGFpbC9yb3ctZGV0YWlsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2Zvb3Rlci9mb290ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlDb21wb25lbnQgfSBmcm9tICcuL2JvZHkvYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JvbGxiYXJIZWxwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9zY3JvbGxiYXItaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sdW1uQ2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb2x1bW4tY2hhbmdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnNIZWxwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9kaW1lbnNpb25zLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IHRocm90dGxlYWJsZSB9IGZyb20gJy4uL3V0aWxzL3Rocm90dGxlJztcbmltcG9ydCB7IGZvcmNlRmlsbENvbHVtbldpZHRocywgYWRqdXN0Q29sdW1uV2lkdGhzIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XG5pbXBvcnQgeyBzb3J0Um93cyB9IGZyb20gJy4uL3V0aWxzL3NvcnQnO1xuaW1wb3J0IHsgUmVzaXplU2Vuc29yIH0gZnJvbSAnY3NzLWVsZW1lbnQtcXVlcmllcyc7XG5pbXBvcnQgeyB0aHJvdHRsZVRpbWUsIGRlYm91bmNlVGltZSwgZGVsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1kYXRhdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0YXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL2RhdGF0YWJsZS5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICduZ3gtZGF0YXRhYmxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCB7XG4gIC8qKlxuICAgKiBUZW1wbGF0ZSBmb3IgdGhlIHRhcmdldCBtYXJrZXIgb2YgZHJhZyB0YXJnZXQgY29sdW1ucy5cbiAgICovXG4gIEBJbnB1dCgpIHRhcmdldE1hcmtlclRlbXBsYXRlOiBhbnk7XG5cbiAgLyoqXG4gICAqIFJvd3MgdGhhdCBhcmUgZGlzcGxheWVkIGluIHRoZSB0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpIHNldCByb3dzKHZhbDogYW55KSB7XG4gICAgdGhpcy5fcm93cyA9IHZhbDtcblxuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyA9IFsuLi52YWxdO1xuICAgIH1cblxuICAgIC8vIGF1dG8gc29ydCBvbiBuZXcgdXBkYXRlc1xuICAgIGlmICghdGhpcy5leHRlcm5hbFNvcnRpbmcpIHtcbiAgICAgIHRoaXMuc29ydEludGVybmFsUm93cygpO1xuICAgIH1cblxuICAgIC8vIGF1dG8gZ3JvdXAgYnkgcGFyZW50IG9uIG5ldyB1cGRhdGVcbiAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBncm91cFJvd3NCeVBhcmVudHMoXG4gICAgICB0aGlzLl9pbnRlcm5hbFJvd3MsXG4gICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlRnJvbVJlbGF0aW9uKSxcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVUb1JlbGF0aW9uKVxuICAgICk7XG5cbiAgICAvLyByZWNhbGN1bGF0ZSBzaXplcy9ldGNcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG5cbiAgICBpZiAodGhpcy5fcm93cyAmJiB0aGlzLl9ncm91cFJvd3NCeSkge1xuICAgICAgLy8gSWYgYSBjb2x1bW4gaGFzIGJlZW4gc3BlY2lmaWVkIGluIF9ncm91cFJvd3NCeSBjcmVhdGVkIGEgbmV3IGFycmF5IHdpdGggdGhlIGRhdGEgZ3JvdXBlZCBieSB0aGF0IHJvd1xuICAgICAgdGhpcy5ncm91cGVkUm93cyA9IHRoaXMuZ3JvdXBBcnJheUJ5KHRoaXMuX3Jvd3MsIHRoaXMuX2dyb3VwUm93c0J5KTtcbiAgICB9XG5cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJvd3MuXG4gICAqL1xuICBnZXQgcm93cygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgYXR0cmlidXRlIGFsbG93cyB0aGUgdXNlciB0byBzZXQgdGhlIG5hbWUgb2YgdGhlIGNvbHVtbiB0byBncm91cCB0aGUgZGF0YSB3aXRoXG4gICAqL1xuICBASW5wdXQoKSBzZXQgZ3JvdXBSb3dzQnkodmFsOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLl9ncm91cFJvd3NCeSA9IHZhbDtcbiAgICAgIGlmICh0aGlzLl9yb3dzICYmIHRoaXMuX2dyb3VwUm93c0J5KSB7XG4gICAgICAgIC8vIGNyZXRlcyBhIG5ldyBhcnJheSB3aXRoIHRoZSBkYXRhIGdyb3VwZWRcbiAgICAgICAgdGhpcy5ncm91cGVkUm93cyA9IHRoaXMuZ3JvdXBBcnJheUJ5KHRoaXMuX3Jvd3MsIHRoaXMuX2dyb3VwUm93c0J5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgZ3JvdXBSb3dzQnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwUm93c0J5O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgYXR0cmlidXRlIGFsbG93cyB0aGUgdXNlciB0byBzZXQgYSBncm91cGVkIGFycmF5IGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICAgKiAgW1xuICAgKiAgICB7Z3JvdXBpZD0xfSBbXG4gICAqICAgICAge2lkPTEgbmFtZT1cInRlc3QxXCJ9LFxuICAgKiAgICAgIHtpZD0yIG5hbWU9XCJ0ZXN0MlwifSxcbiAgICogICAgICB7aWQ9MyBuYW1lPVwidGVzdDNcIn1cbiAgICogICAgXX0sXG4gICAqICAgIHtncm91cGlkPTI+W1xuICAgKiAgICAgIHtpZD00IG5hbWU9XCJ0ZXN0NFwifSxcbiAgICogICAgICB7aWQ9NSBuYW1lPVwidGVzdDVcIn0sXG4gICAqICAgICAge2lkPTYgbmFtZT1cInRlc3Q2XCJ9XG4gICAqICAgIF19XG4gICAqICBdXG4gICAqL1xuICBASW5wdXQoKSBncm91cGVkUm93czogYW55W107XG5cbiAgQElucHV0KCkgZXhwYW5kYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBDb2x1bW5zIHRvIGJlIGRpc3BsYXllZC5cbiAgICovXG4gIEBJbnB1dCgpIHNldCBjb2x1bW5zKHZhbDogVGFibGVDb2x1bW5bXSkge1xuICAgIHZhbCA9IFtcbiAgICAgIC4uLih0aGlzLmV4cGFuZGFibGVcbiAgICAgICAgPyBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHdpZHRoOiA1MCxcbiAgICAgICAgICAgICAgcHJvcDogJ2ljZS1leHBhbmRhYmxlJyxcbiAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgIHJlc2l6ZWFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICBjYW5BdXRvUmVzaXplOiBmYWxzZSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICA6IFtdKSxcbiAgICAgIC4uLnZhbFxuICAgIF07XG4gICAgaWYgKHZhbCkge1xuICAgICAgdGhpcy5faW50ZXJuYWxDb2x1bW5zID0gWy4uLnZhbF07XG4gICAgICBzZXRDb2x1bW5EZWZhdWx0cyh0aGlzLl9pbnRlcm5hbENvbHVtbnMpO1xuICAgICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb2x1bW5zID0gdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29sdW1ucy5cbiAgICovXG4gIGdldCBjb2x1bW5zKCk6IFRhYmxlQ29sdW1uW10ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3Qgb2Ygcm93IG9iamVjdHMgdGhhdCBzaG91bGQgYmVcbiAgICogcmVwcmVzZW50ZWQgYXMgc2VsZWN0ZWQgaW4gdGhlIGdyaWQuXG4gICAqIERlZmF1bHQgdmFsdWU6IGBbXWBcbiAgICovXG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBhbnlbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBFbmFibGUgdmVydGljYWwgc2Nyb2xsYmFyc1xuICAgKi9cbiAgQElucHV0KCkgc2Nyb2xsYmFyVjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBFbmFibGUgaG9yeiBzY3JvbGxiYXJzXG4gICAqL1xuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSByb3cgaGVpZ2h0OyB3aGljaCBpcyBuZWNlc3NhcnlcbiAgICogdG8gY2FsY3VsYXRlIHRoZSBoZWlnaHQgZm9yIHRoZSBsYXp5IHJlbmRlcmluZy5cbiAgICovXG4gIEBJbnB1dCgpIHJvd0hlaWdodDogbnVtYmVyIHwgJ2F1dG8nIHwgKChyb3c/OiBhbnkpID0+IG51bWJlcikgPSAzMDtcblxuICAvKipcbiAgICogVHlwZSBvZiBjb2x1bW4gd2lkdGggZGlzdHJpYnV0aW9uIGZvcm11bGEuXG4gICAqIEV4YW1wbGU6IGZsZXgsIGZvcmNlLCBzdGFuZGFyZFxuICAgKi9cbiAgQElucHV0KCkgY29sdW1uTW9kZTogQ29sdW1uTW9kZSA9IENvbHVtbk1vZGUuc3RhbmRhcmQ7XG5cbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGhlYWRlciBoZWlnaHQgaW4gcGl4ZWxzLlxuICAgKiBQYXNzIGEgZmFsc2V5IGZvciBubyBoZWFkZXJcbiAgICovXG4gIEBJbnB1dCgpIGhlYWRlckhlaWdodDogYW55ID0gMzA7XG5cbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGZvb3RlciBoZWlnaHQgaW4gcGl4ZWxzLlxuICAgKiBQYXNzIGZhbHNleSBmb3Igbm8gZm9vdGVyXG4gICAqL1xuICBASW5wdXQoKSBmb290ZXJIZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIElmIHRoZSB0YWJsZSBzaG91bGQgdXNlIGV4dGVybmFsIHBhZ2luZ1xuICAgKiBvdGhlcndpc2UgaXRzIGFzc3VtZWQgdGhhdCBhbGwgZGF0YSBpcyBwcmVsb2FkZWQuXG4gICAqL1xuICBASW5wdXQoKSBleHRlcm5hbFBhZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgdGFibGUgc2hvdWxkIHVzZSBleHRlcm5hbCBzb3J0aW5nIG9yXG4gICAqIHRoZSBidWlsdC1pbiBiYXNpYyBzb3J0aW5nLlxuICAgKi9cbiAgQElucHV0KCkgZXh0ZXJuYWxTb3J0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBwYWdlIHNpemUgdG8gYmUgc2hvd24uXG4gICAqIERlZmF1bHQgdmFsdWU6IGB1bmRlZmluZWRgXG4gICAqL1xuICBASW5wdXQoKSBzZXQgbGltaXQodmFsOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9saW1pdCA9IHZhbDtcblxuICAgIC8vIHJlY2FsY3VsYXRlIHNpemVzL2V0Y1xuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsaW1pdC5cbiAgICovXG4gIGdldCBsaW1pdCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9saW1pdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgdG90YWwgY291bnQgb2YgYWxsIHJvd3MuXG4gICAqIERlZmF1bHQgdmFsdWU6IGAwYFxuICAgKi9cbiAgQElucHV0KCkgc2V0IGNvdW50KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY291bnQgPSB2YWw7XG5cbiAgICAvLyByZWNhbGN1bGF0ZSBzaXplcy9ldGNcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY291bnQuXG4gICAqL1xuICBnZXQgY291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY291bnQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgb2Zmc2V0ICggcGFnZSAtIDEgKSBzaG93bi5cbiAgICogRGVmYXVsdCB2YWx1ZTogYDBgXG4gICAqL1xuICBASW5wdXQoKSBzZXQgb2Zmc2V0KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fb2Zmc2V0ID0gdmFsO1xuICB9XG4gIGdldCBvZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5fb2Zmc2V0LCBNYXRoLmNlaWwodGhpcy5yb3dDb3VudCAvIHRoaXMucGFnZVNpemUpIC0gMSksIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhlIGxpbmVhciBsb2FkaW5nIGJhci5cbiAgICogRGVmYXVsdCB2YWx1ZTogYGZhbHNlYFxuICAgKi9cbiAgQElucHV0KCkgbG9hZGluZ0luZGljYXRvcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHJvdyBzZWxlY3Rpb24uIE9wdGlvbnMgYXJlOlxuICAgKlxuICAgKiAgLSBgc2luZ2xlYFxuICAgKiAgLSBgbXVsdGlgXG4gICAqICAtIGBjaGVja2JveGBcbiAgICogIC0gYG11bHRpQ2xpY2tgXG4gICAqICAtIGBjZWxsYFxuICAgKlxuICAgKiBGb3Igbm8gc2VsZWN0aW9uIHBhc3MgYSBgZmFsc2V5YC5cbiAgICogRGVmYXVsdCB2YWx1ZTogYHVuZGVmaW5lZGBcbiAgICovXG4gIEBJbnB1dCgpIHNlbGVjdGlvblR5cGU6IFNlbGVjdGlvblR5cGU7XG5cbiAgLyoqXG4gICAqIEVuYWJsZS9EaXNhYmxlIGFiaWxpdHkgdG8gcmUtb3JkZXIgY29sdW1uc1xuICAgKiBieSBkcmFnZ2luZyB0aGVtLlxuICAgKi9cbiAgQElucHV0KCkgcmVvcmRlcmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBTd2FwIGNvbHVtbnMgb24gcmUtb3JkZXIgY29sdW1ucyBvclxuICAgKiBtb3ZlIHRoZW0uXG4gICAqL1xuICBASW5wdXQoKSBzd2FwQ29sdW1uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHNvcnRpbmdcbiAgICovXG4gIEBJbnB1dCgpIHNvcnRUeXBlOiBTb3J0VHlwZSA9IFNvcnRUeXBlLnNpbmdsZTtcblxuICAvKipcbiAgICogQXJyYXkgb2Ygc29ydGVkIGNvbHVtbnMgYnkgcHJvcGVydHkgYW5kIHR5cGUuXG4gICAqIERlZmF1bHQgdmFsdWU6IGBbXWBcbiAgICovXG4gIEBJbnB1dCgpIHNvcnRzOiBhbnlbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBDc3MgY2xhc3Mgb3ZlcnJpZGVzXG4gICAqL1xuICBASW5wdXQoKSBjc3NDbGFzc2VzOiBhbnkgPSB7XG4gICAgc29ydEFzY2VuZGluZzogJ2RhdGF0YWJsZS1pY29uLXVwJyxcbiAgICBzb3J0RGVzY2VuZGluZzogJ2RhdGF0YWJsZS1pY29uLWRvd24nLFxuICAgIHBhZ2VyTGVmdEFycm93OiAnZGF0YXRhYmxlLWljb24tbGVmdCcsXG4gICAgcGFnZXJSaWdodEFycm93OiAnZGF0YXRhYmxlLWljb24tcmlnaHQnLFxuICAgIHBhZ2VyUHJldmlvdXM6ICdkYXRhdGFibGUtaWNvbi1wcmV2JyxcbiAgICBwYWdlck5leHQ6ICdkYXRhdGFibGUtaWNvbi1za2lwJ1xuICB9O1xuXG4gIC8qKlxuICAgKiBNZXNzYWdlIG92ZXJyaWRlcyBmb3IgbG9jYWxpemF0aW9uXG4gICAqXG4gICAqIGVtcHR5TWVzc2FnZSAgICAgW2RlZmF1bHRdID0gJ05vIGRhdGEgdG8gZGlzcGxheSdcbiAgICogdG90YWxNZXNzYWdlICAgICBbZGVmYXVsdF0gPSAndG90YWwnXG4gICAqIHNlbGVjdGVkTWVzc2FnZSAgW2RlZmF1bHRdID0gJ3NlbGVjdGVkJ1xuICAgKi9cbiAgQElucHV0KCkgbWVzc2FnZXM6IGFueSA9IHtcbiAgICAvLyBNZXNzYWdlIHRvIHNob3cgd2hlbiBhcnJheSBpcyBwcmVzZW50ZWRcbiAgICAvLyBidXQgY29udGFpbnMgbm8gdmFsdWVzXG4gICAgZW1wdHlNZXNzYWdlOiAnTm8gZGF0YSB0byBkaXNwbGF5JyxcblxuICAgIC8vIEZvb3RlciB0b3RhbCBtZXNzYWdlXG4gICAgdG90YWxNZXNzYWdlOiAndG90YWwnLFxuXG4gICAgLy8gRm9vdGVyIHNlbGVjdGVkIG1lc3NhZ2VcbiAgICBzZWxlY3RlZE1lc3NhZ2U6ICdzZWxlY3RlZCdcbiAgfTtcblxuICAvKipcbiAgICogUm93IHNwZWNpZmljIGNsYXNzZXMuXG4gICAqIFNpbWlsYXIgaW1wbGVtZW50YXRpb24gdG8gbmdDbGFzcy5cbiAgICpcbiAgICogIFtyb3dDbGFzc109XCInZmlyc3Qgc2Vjb25kJ1wiXG4gICAqICBbcm93Q2xhc3NdPVwieyAnZmlyc3QnOiB0cnVlLCAnc2Vjb25kJzogdHJ1ZSwgJ3RoaXJkJzogZmFsc2UgfVwiXG4gICAqL1xuICBASW5wdXQoKSByb3dDbGFzczogYW55O1xuXG4gIC8qKlxuICAgKiBBIGJvb2xlYW4vZnVuY3Rpb24geW91IGNhbiB1c2UgdG8gY2hlY2sgd2hldGhlciB5b3Ugd2FudFxuICAgKiB0byBzZWxlY3QgYSBwYXJ0aWN1bGFyIHJvdyBiYXNlZCBvbiBhIGNyaXRlcmlhLiBFeGFtcGxlOlxuICAgKlxuICAgKiAgICAoc2VsZWN0aW9uKSA9PiB7XG4gICAqICAgICAgcmV0dXJuIHNlbGVjdGlvbiAhPT0gJ0V0aGVsIFByaWNlJztcbiAgICogICAgfVxuICAgKi9cbiAgQElucHV0KCkgc2VsZWN0Q2hlY2s6IGFueTtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB5b3UgY2FuIHVzZSB0byBjaGVjayB3aGV0aGVyIHlvdSB3YW50XG4gICAqIHRvIHNob3cgdGhlIGNoZWNrYm94IGZvciBhIHBhcnRpY3VsYXIgcm93IGJhc2VkIG9uIGEgY3JpdGVyaWEuIEV4YW1wbGU6XG4gICAqXG4gICAqICAgIChyb3csIGNvbHVtbiwgdmFsdWUpID0+IHtcbiAgICogICAgICByZXR1cm4gcm93Lm5hbWUgIT09ICdFdGhlbCBQcmljZSc7XG4gICAqICAgIH1cbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXlDaGVjazogKHJvdzogYW55LCBjb2x1bW4/OiBhbnksIHZhbHVlPzogYW55KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGJvb2xlYW4geW91IGNhbiB1c2UgdG8gc2V0IHRoZSBkZXRhdWx0IGJlaGF2aW91ciBvZiByb3dzIGFuZCBncm91cHNcbiAgICogd2hldGhlciB0aGV5IHdpbGwgc3RhcnQgZXhwYW5kZWQgb3Igbm90LiBJZiBvbW1pdGVkIHRoZSBkZWZhdWx0IGlzIE5PVCBleHBhbmRlZC5cbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGdyb3VwRXhwYW5zaW9uRGVmYXVsdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBQcm9wZXJ0eSB0byB3aGljaCB5b3UgY2FuIHVzZSBmb3IgY3VzdG9tIHRyYWNraW5nIG9mIHJvd3MuXG4gICAqIEV4YW1wbGU6ICduYW1lJ1xuICAgKi9cbiAgQElucHV0KCkgdHJhY2tCeVByb3A6IHN0cmluZztcblxuICAvKipcbiAgICogUHJvcGVydHkgdG8gd2hpY2ggeW91IGNhbiB1c2UgZm9yIGRldGVybWluaW5nIHNlbGVjdCBhbGxcbiAgICogcm93cyBvbiBjdXJyZW50IHBhZ2Ugb3Igbm90LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgRGF0YXRhYmxlQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKSBzZWxlY3RBbGxSb3dzT25QYWdlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBmb3Igcm93IHZpcnR1YWxpemF0aW9uIG9uIC8gb2ZmXG4gICAqL1xuICBASW5wdXQoKSB2aXJ0dWFsaXphdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRyZWUgZnJvbSByZWxhdGlvblxuICAgKi9cbiAgQElucHV0KCkgdHJlZUZyb21SZWxhdGlvbjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUcmVlIHRvIHJlbGF0aW9uXG4gICAqL1xuICBASW5wdXQoKSB0cmVlVG9SZWxhdGlvbjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgZm9yIHN3aXRjaGluZyBzdW1tYXJ5IHJvdyBvbiAvIG9mZlxuICAgKi9cbiAgQElucHV0KCkgc3VtbWFyeVJvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGhlaWdodCBvZiBzdW1tYXJ5IHJvd1xuICAgKi9cbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodDogbnVtYmVyID0gMzA7XG5cbiAgLyoqXG4gICAqIEEgcHJvcGVydHkgaG9sZHMgYSBzdW1tYXJ5IHJvdyBwb3NpdGlvbjogdG9wL2JvdHRvbVxuICAgKi9cbiAgQElucHV0KCkgc3VtbWFyeVBvc2l0aW9uOiBzdHJpbmcgPSAndG9wJztcblxuICAvKipcbiAgICogQm9keSB3YXMgc2Nyb2xsZWQgdHlwaWNhbGx5IGluIGEgYHNjcm9sbGJhclY6dHJ1ZWAgc2NlbmFyaW8uXG4gICAqL1xuICBAT3V0cHV0KCkgc2Nyb2xsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQSBjZWxsIG9yIHJvdyB3YXMgZm9jdXNlZCB2aWEga2V5Ym9hcmQgb3IgbW91c2UgY2xpY2suXG4gICAqL1xuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBBIGNlbGwgb3Igcm93IHdhcyBzZWxlY3RlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDb2x1bW4gc29ydCB3YXMgaW52b2tlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBzb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogSWNlIGNvbHVtbiBmaWx0ZXIgd2FzIGludm9rZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgZmlsdGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogVGhlIHRhYmxlIHdhcyBwYWdlZCBlaXRoZXIgdHJpZ2dlcmVkIGJ5IHRoZSBwYWdlciBvciB0aGUgYm9keSBzY3JvbGwuXG4gICAqL1xuICBAT3V0cHV0KCkgcGFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENvbHVtbnMgd2VyZSByZS1vcmRlcmVkLlxuICAgKi9cbiAgQE91dHB1dCgpIHJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDb2x1bW4gd2FzIHJlc2l6ZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVzaXplOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogVGhlIGNvbnRleHQgbWVudSB3YXMgaW52b2tlZCBvbiB0aGUgdGFibGUuXG4gICAqIHR5cGUgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGhlYWRlciBvciB0aGUgYm9keSB3YXMgY2xpY2tlZC5cbiAgICogY29udGVudCBjb250YWlucyBlaXRoZXIgdGhlIGNvbHVtbiBvciB0aGUgcm93IHRoYXQgd2FzIGNsaWNrZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgdGFibGVDb250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgdHlwZTogQ29udGV4dG1lbnVUeXBlOyBjb250ZW50OiBhbnkgfT4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBBIHJvdyB3YXMgZXhwYW5kZWQgb3QgY29sbGFwc2VkIGZvciB0cmVlXG4gICAqL1xuICBAT3V0cHV0KCkgdHJlZUFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIGlmIHRoZSBoZWFkZXIgaGVpZ2h0IGlmIGZpeGVkIGhlaWdodC5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZml4ZWQtaGVhZGVyJylcbiAgZ2V0IGlzRml4ZWRIZWFkZXIoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaGVhZGVySGVpZ2h0OiBudW1iZXIgfCBzdHJpbmcgPSB0aGlzLmhlYWRlckhlaWdodDtcbiAgICByZXR1cm4gdHlwZW9mIGhlYWRlckhlaWdodCA9PT0gJ3N0cmluZycgPyA8c3RyaW5nPmhlYWRlckhlaWdodCAhPT0gJ2F1dG8nIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50IGlmXG4gICAqIHRoZSByb3cgaGVpZ2h0cyBhcmUgZml4ZWQgaGVpZ2h0cy5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZml4ZWQtcm93JylcbiAgZ2V0IGlzRml4ZWRSb3coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucm93SGVpZ2h0ICE9PSAnYXV0byc7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBlbGVtZW50IGlmXG4gICAqIHZlcnRpY2FsIHNjcm9sbGluZyBpcyBlbmFibGVkLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zY3JvbGwtdmVydGljYWwnKVxuICBnZXQgaXNWZXJ0U2Nyb2xsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNjcm9sbGJhclY7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBlbGVtZW50IGlmXG4gICAqIHZpcnR1YWxpemF0aW9uIGlzIGVuYWJsZWQuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnZpcnR1YWxpemVkJylcbiAgZ2V0IGlzVmlydHVhbGl6ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmlydHVhbGl6YXRpb247XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudFxuICAgKiBpZiB0aGUgaG9yemlvbnRhbCBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2Nyb2xsLWhvcnonKVxuICBnZXQgaXNIb3JTY3JvbGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsYmFySDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGVsZW1lbnQgaXMgc2VsZWN0YWJsZS5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2VsZWN0YWJsZScpXG4gIGdldCBpc1NlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgaXMgY2hlY2tib3ggc2VsZWN0aW9uLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jaGVja2JveC1zZWxlY3Rpb24nKVxuICBnZXQgaXNDaGVja2JveFNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLmNoZWNrYm94O1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgaWYgY2VsbCBzZWxlY3Rpb24uXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNlbGwtc2VsZWN0aW9uJylcbiAgZ2V0IGlzQ2VsbFNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLmNlbGw7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBpZiBzaW5nbGUgc2VsZWN0LlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaW5nbGUtc2VsZWN0aW9uJylcbiAgZ2V0IGlzU2luZ2xlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuc2luZ2xlO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhZGRlZCB0byByb290IGVsZW1lbnQgaWYgbXVsaXQgc2VsZWN0XG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm11bHRpLXNlbGVjdGlvbicpXG4gIGdldCBpc011bHRpU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGk7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFkZGVkIHRvIHJvb3QgZWxlbWVudCBpZiBtdWxpdCBjbGljayBzZWxlY3RcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MubXVsdGktY2xpY2stc2VsZWN0aW9uJylcbiAgZ2V0IGlzTXVsdGlDbGlja1NlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLm11bHRpQ2xpY2s7XG4gIH1cblxuICAvKipcbiAgICogQ29sdW1uIHRlbXBsYXRlcyBnYXRoZXJlZCBmcm9tIGBDb250ZW50Q2hpbGRyZW5gXG4gICAqIGlmIGRlc2NyaWJlZCBpbiB5b3VyIG1hcmt1cC5cbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlKVxuICBzZXQgY29sdW1uVGVtcGxhdGVzKHZhbDogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZT4pIHtcbiAgICB0aGlzLl9jb2x1bW5UZW1wbGF0ZXMgPSB2YWw7XG4gICAgdGhpcy50cmFuc2xhdGVDb2x1bW5zKHZhbCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29sdW1uIHRlbXBsYXRlcy5cbiAgICovXG4gIGdldCBjb2x1bW5UZW1wbGF0ZXMoKTogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5UZW1wbGF0ZXM7XG4gIH1cblxuICAvKipcbiAgICogUm93IERldGFpbCB0ZW1wbGF0ZXMgZ2F0aGVyZWQgZnJvbSB0aGUgQ29udGVudENoaWxkXG4gICAqL1xuICBAQ29udGVudENoaWxkKERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHJvd0RldGFpbDogRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBHcm91cCBIZWFkZXIgdGVtcGxhdGVzIGdhdGhlcmVkIGZyb20gdGhlIENvbnRlbnRDaGlsZFxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGdyb3VwSGVhZGVyOiBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZTtcblxuICAvKipcbiAgICogRm9vdGVyIHRlbXBsYXRlIGdhdGhlcmVkIGZyb20gdGhlIENvbnRlbnRDaGlsZFxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBmb290ZXI6IERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZTtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBib2R5IGNvbXBvbmVudCBmb3IgbWFudWFsbHlcbiAgICogaW52b2tpbmcgZnVuY3Rpb25zIG9uIHRoZSBib2R5LlxuICAgKi9cbiAgQFZpZXdDaGlsZChEYXRhVGFibGVCb2R5Q29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgYm9keUNvbXBvbmVudDogRGF0YVRhYmxlQm9keUNvbXBvbmVudDtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBoZWFkZXIgY29tcG9uZW50IGZvciBtYW51YWxseVxuICAgKiBpbnZva2luZyBmdW5jdGlvbnMgb24gdGhlIGhlYWRlci5cbiAgICpcbiAgICogQG1lbWJlck9mIERhdGF0YWJsZUNvbXBvbmVudFxuICAgKi9cbiAgQFZpZXdDaGlsZChEYXRhVGFibGVIZWFkZXJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBoZWFkZXJDb21wb25lbnQ6IERhdGFUYWJsZUhlYWRlckNvbXBvbmVudDtcblxuICAvKipcbiAgICogUmV0dXJucyBpZiBhbGwgcm93cyBhcmUgc2VsZWN0ZWQuXG4gICAqL1xuICBnZXQgYWxsUm93c1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIGxldCBhbGxSb3dzU2VsZWN0ZWQgPSB0aGlzLnJvd3MgJiYgdGhpcy5zZWxlY3RlZCAmJiB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gdGhpcy5yb3dzLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLnNlbGVjdEFsbFJvd3NPblBhZ2UpIHtcbiAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLmJvZHlDb21wb25lbnQuaW5kZXhlcztcbiAgICAgIGNvbnN0IHJvd3NPblBhZ2UgPSBpbmRleGVzLmxhc3QgLSBpbmRleGVzLmZpcnN0O1xuICAgICAgYWxsUm93c1NlbGVjdGVkID0gdGhpcy5zZWxlY3RlZC5sZW5ndGggPT09IHJvd3NPblBhZ2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5yb3dzICYmIHRoaXMucm93cy5sZW5ndGggIT09IDAgJiYgYWxsUm93c1NlbGVjdGVkO1xuICB9XG5cbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIF9pbm5lcldpZHRoOiBudW1iZXI7XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIGJvZHlIZWlnaHQ6IG51bWJlcjtcbiAgcm93Q291bnQ6IG51bWJlciA9IDA7XG4gIHJvd0RpZmZlcjogS2V5VmFsdWVEaWZmZXI8e30sIHt9PjtcblxuICBfb2Zmc2V0WCA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIF9saW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBfY291bnQ6IG51bWJlciA9IDA7XG4gIF9vZmZzZXQ6IG51bWJlciA9IDA7XG4gIF9yb3dzOiBhbnlbXTtcbiAgX2dyb3VwUm93c0J5OiBzdHJpbmc7XG4gIF9pbnRlcm5hbFJvd3M6IGFueVtdO1xuICBfaW50ZXJuYWxDb2x1bW5zOiBUYWJsZUNvbHVtbltdO1xuICBfY29sdW1uczogVGFibGVDb2x1bW5bXTtcbiAgX2NvbHVtblRlbXBsYXRlczogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZT47XG4gIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICByZXNpemVTZW5zb3I6IFJlc2l6ZVNlbnNvcjtcbiAgcmVjYWxjdWxhdGUkID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAU2tpcFNlbGYoKSBwcml2YXRlIHNjcm9sbGJhckhlbHBlcjogU2Nyb2xsYmFySGVscGVyLFxuICAgIEBTa2lwU2VsZigpIHByaXZhdGUgZGltZW5zaW9uc0hlbHBlcjogRGltZW5zaW9uc0hlbHBlcixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICBwcml2YXRlIGNvbHVtbkNoYW5nZXNTZXJ2aWNlOiBDb2x1bW5DaGFuZ2VzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdjb25maWd1cmF0aW9uJykgcHJpdmF0ZSBjb25maWd1cmF0aW9uOiBJTmd4RGF0YXRhYmxlQ29uZmlnXG4gICkge1xuICAgIC8vIGdldCByZWYgdG8gZWxtIGZvciBtZWFzdXJpbmdcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5yb3dEaWZmZXIgPSBkaWZmZXJzLmZpbmQoe30pLmNyZWF0ZSgpO1xuXG4gICAgLy8gYXBwbHkgZ2xvYmFsIHNldHRpbmdzIGZyb20gTW9kdWxlLmZvclJvb3RcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uICYmIHRoaXMuY29uZmlndXJhdGlvbi5tZXNzYWdlcykge1xuICAgICAgdGhpcy5tZXNzYWdlcyA9IHsgLi4udGhpcy5jb25maWd1cmF0aW9uLm1lc3NhZ2VzIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGRhdGEtYm91bmRcbiAgICogcHJvcGVydGllcyBvZiBhIGRpcmVjdGl2ZSBhcmUgaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBuZWVkIHRvIGNhbGwgdGhpcyBpbW1lZGlhdGx5IHRvIHNpemVcbiAgICAvLyBpZiB0aGUgdGFibGUgaXMgaGlkZGVuIHRoZSB2aXNpYmlsaXR5XG4gICAgLy8gbGlzdGVuZXIgd2lsbCBpbnZva2UgdGhpcyBpdHNlbGYgdXBvbiBzaG93XG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICAgIGlmIChSZXNpemVTZW5zb3IpIHtcbiAgICAgIHRoaXMucmVzaXplU2Vuc29yID0gbmV3IFJlc2l6ZVNlbnNvcih0aGlzLmVsZW1lbnQsICgpID0+IHRoaXMucmVjYWxjdWxhdGUkLm5leHQoKSk7XG4gICAgfVxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucmVjYWxjdWxhdGUkXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRocm90dGxlVGltZSgyNTAsIGFzeW5jU2NoZWR1bGVyLCB7IGxlYWRpbmc6IHRydWUsIHRyYWlsaW5nOiB0cnVlIH0pLFxuICAgICAgICAgIGRlbGF5KDEwMClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVjYWxjdWxhdGUoKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGEgY29tcG9uZW50J3NcbiAgICogdmlldyBoYXMgYmVlbiBmdWxseSBpbml0aWFsaXplZC5cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZXh0ZXJuYWxTb3J0aW5nKSB7XG4gICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcbiAgICB9XG5cbiAgICAvLyB0aGlzIGhhcyB0byBiZSBkb25lIHRvIHByZXZlbnQgdGhlIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAvLyB0cmVlIGZyb20gZnJlYWtpbmcgb3V0IGJlY2F1c2Ugd2UgYXJlIHJlYWRqdXN0aW5nXG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcblxuICAgICAgLy8gZW1pdCBwYWdlIGZvciB2aXJ0dWFsIHNlcnZlci1zaWRlIGtpY2tvZmZcbiAgICAgIGlmICh0aGlzLmV4dGVybmFsUGFnaW5nICYmIHRoaXMuc2Nyb2xsYmFyVikge1xuICAgICAgICB0aGlzLnBhZ2UuZW1pdCh7XG4gICAgICAgICAgY291bnQ6IHRoaXMuY291bnQsXG4gICAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICAgICAgb2Zmc2V0OiAwXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGEgY29tcG9uZW50J3NcbiAgICogY29udGVudCBoYXMgYmVlbiBmdWxseSBpbml0aWFsaXplZC5cbiAgICovXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLmNvbHVtblRlbXBsYXRlcy5jaGFuZ2VzLnN1YnNjcmliZSh2ID0+IHRoaXMudHJhbnNsYXRlQ29sdW1ucyh2KSk7XG4gICAgdGhpcy5saXN0ZW5Gb3JDb2x1bW5JbnB1dENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgYmUgdXNlZCB3aGVuIGRpc3BsYXlpbmcgb3Igc2VsZWN0aW5nIHJvd3MuXG4gICAqIHdoZW4gdHJhY2tpbmcvY29tcGFyaW5nIHRoZW0sIHdlJ2xsIHVzZSB0aGUgdmFsdWUgb2YgdGhpcyBmbixcbiAgICpcbiAgICogKGBmbih4KSA9PT0gZm4oeSlgIGluc3RlYWQgb2YgYHggPT09IHlgKVxuICAgKi9cbiAgQElucHV0KCkgcm93SWRlbnRpdHk6ICh4OiBhbnkpID0+IGFueSA9ICh4OiBhbnkpID0+IHtcbiAgICBpZiAodGhpcy5fZ3JvdXBSb3dzQnkpIHtcbiAgICAgIC8vIGVhY2ggZ3JvdXAgaW4gZ3JvdXBlZFJvd3MgYXJlIHN0b3JlZCBhcyB7a2V5LCB2YWx1ZTogW3Jvd3NdfSxcbiAgICAgIC8vIHdoZXJlIGtleSBpcyB0aGUgZ3JvdXBSb3dzQnkgaW5kZXhcbiAgICAgIHJldHVybiB4LmtleTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGVzIHRoZSB0ZW1wbGF0ZXMgdG8gdGhlIGNvbHVtbiBvYmplY3RzXG4gICAqL1xuICB0cmFuc2xhdGVDb2x1bW5zKHZhbDogYW55KSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgY29uc3QgYXJyID0gdmFsLnRvQXJyYXkoKTtcbiAgICAgIGlmIChhcnIubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IHRyYW5zbGF0ZVRlbXBsYXRlcyhhcnIpO1xuICAgICAgICBzZXRDb2x1bW5EZWZhdWx0cyh0aGlzLl9pbnRlcm5hbENvbHVtbnMpO1xuICAgICAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucygpO1xuICAgICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hcCB3aXRoIHRoZSBkYXRhIGdyb3VwZWQgYnkgdGhlIHVzZXIgY2hvaWNlIG9mIGdyb3VwaW5nIGluZGV4XG4gICAqXG4gICAqIEBwYXJhbSBvcmlnaW5hbEFycmF5IHRoZSBvcmlnaW5hbCBhcnJheSBwYXNzZWQgdmlhIHBhcmFtZXRlclxuICAgKiBAcGFyYW0gZ3JvdXBCeUluZGV4ICB0aGUgaW5kZXggb2YgdGhlIGNvbHVtbiB0byBncm91cCB0aGUgZGF0YSBieVxuICAgKi9cbiAgZ3JvdXBBcnJheUJ5KG9yaWdpbmFsQXJyYXk6IGFueSwgZ3JvdXBCeTogYW55KSB7XG4gICAgLy8gY3JlYXRlIGEgbWFwIHRvIGhvbGQgZ3JvdXBzIHdpdGggdGhlaXIgY29ycmVzcG9uZGluZyByZXN1bHRzXG4gICAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBpOiBudW1iZXIgPSAwO1xuXG4gICAgb3JpZ2luYWxBcnJheS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IGl0ZW1bZ3JvdXBCeV07XG4gICAgICBpZiAoIW1hcC5oYXMoa2V5KSkge1xuICAgICAgICBtYXAuc2V0KGtleSwgW2l0ZW1dKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5nZXQoa2V5KS5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWRkR3JvdXAgPSAoa2V5OiBhbnksIHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB7IGtleSwgdmFsdWUgfTtcbiAgICB9O1xuXG4gICAgLy8gY29udmVydCBtYXAgYmFjayB0byBhIHNpbXBsZSBhcnJheSBvZiBvYmplY3RzXG4gICAgcmV0dXJuIEFycmF5LmZyb20obWFwLCB4ID0+IGFkZEdyb3VwKHhbMF0sIHhbMV0pKTtcbiAgfVxuXG4gIC8qXG4gICAqIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gQW5ndWxhciBkaXJ0eSBjaGVja3MgYSBkaXJlY3RpdmUuXG4gICAqL1xuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucm93RGlmZmVyLmRpZmYodGhpcy5yb3dzKSkge1xuICAgICAgaWYgKCF0aGlzLmV4dGVybmFsU29ydGluZykge1xuICAgICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ludGVybmFsUm93cyA9IFsuLi50aGlzLnJvd3NdO1xuICAgICAgfVxuXG4gICAgICAvLyBhdXRvIGdyb3VwIGJ5IHBhcmVudCBvbiBuZXcgdXBkYXRlXG4gICAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBncm91cFJvd3NCeVBhcmVudHMoXG4gICAgICAgIHRoaXMuX2ludGVybmFsUm93cyxcbiAgICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZUZyb21SZWxhdGlvbiksXG4gICAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVUb1JlbGF0aW9uKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5yZWNhbGN1bGF0ZVBhZ2VzKCk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNhbGMncyB0aGUgc2l6ZXMgb2YgdGhlIGdyaWQuXG4gICAqXG4gICAqIFVwZGF0ZWQgYXV0b21hdGljYWxseSBvbiBjaGFuZ2VzIHRvOlxuICAgKlxuICAgKiAgLSBDb2x1bW5zXG4gICAqICAtIFJvd3NcbiAgICogIC0gUGFnaW5nIHJlbGF0ZWRcbiAgICpcbiAgICogQWxzbyBjYW4gYmUgbWFudWFsbHkgaW52b2tlZCBvciB1cG9uIHdpbmRvdyByZXNpemUuXG4gICAqL1xuICByZWNhbGN1bGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlY2FsY3VsYXRlRGltcygpO1xuICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY2FsdWxjYXRlcyB0aGUgY29sdW1uIHdpZHRocyBiYXNlZCBvbiBjb2x1bW4gd2lkdGhcbiAgICogZGlzdHJpYnV0aW9uIG1vZGUgYW5kIHNjcm9sbGJhciBvZmZzZXRzLlxuICAgKi9cbiAgcmVjYWxjdWxhdGVDb2x1bW5zKFxuICAgIGNvbHVtbnM6IGFueVtdID0gdGhpcy5faW50ZXJuYWxDb2x1bW5zLFxuICAgIGZvcmNlSWR4OiBudW1iZXIgPSAtMSxcbiAgICBhbGxvd0JsZWVkOiBib29sZWFuID0gdGhpcy5zY3JvbGxiYXJIXG4gICk6IGFueVtdIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWNvbHVtbnMpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICBsZXQgd2lkdGggPSB0aGlzLl9pbm5lcldpZHRoO1xuICAgIGlmICh0aGlzLnNjcm9sbGJhclYpIHtcbiAgICAgIHdpZHRoID0gd2lkdGggLSB0aGlzLnNjcm9sbGJhckhlbHBlci53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb2x1bW5Nb2RlID09PSBDb2x1bW5Nb2RlLmZvcmNlKSB7XG4gICAgICBmb3JjZUZpbGxDb2x1bW5XaWR0aHMoY29sdW1ucywgd2lkdGgsIGZvcmNlSWR4LCBhbGxvd0JsZWVkKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uTW9kZSA9PT0gQ29sdW1uTW9kZS5mbGV4KSB7XG4gICAgICBhZGp1c3RDb2x1bW5XaWR0aHMoY29sdW1ucywgd2lkdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY2FsY3VsYXRlcyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgdGFibGUgc2l6ZS5cbiAgICogSW50ZXJuYWxseSBjYWxscyB0aGUgcGFnZSBzaXplIGFuZCByb3cgY291bnQgY2FsY3MgdG9vLlxuICAgKlxuICAgKi9cbiAgcmVjYWxjdWxhdGVEaW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IGRpbXMgPSB0aGlzLmRpbWVuc2lvbnNIZWxwZXIuZ2V0RGltZW5zaW9ucyh0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuX2lubmVyV2lkdGggPSBNYXRoLmZsb29yKGRpbXMud2lkdGgpO1xuXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyVikge1xuICAgICAgbGV0IGhlaWdodCA9IGRpbXMuaGVpZ2h0O1xuICAgICAgaWYgKHRoaXMuaGVhZGVySGVpZ2h0KSBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmhlYWRlckhlaWdodDtcbiAgICAgIGlmICh0aGlzLmZvb3RlckhlaWdodCkgaGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5mb290ZXJIZWlnaHQ7XG4gICAgICB0aGlzLmJvZHlIZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy5yZWNhbGN1bGF0ZVBhZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBwYWdlcyBhZnRlciBhIHVwZGF0ZS5cbiAgICovXG4gIHJlY2FsY3VsYXRlUGFnZXMoKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlU2l6ZSA9IHRoaXMuY2FsY1BhZ2VTaXplKCk7XG4gICAgdGhpcy5yb3dDb3VudCA9IHRoaXMuY2FsY1Jvd0NvdW50KCk7XG4gIH1cblxuICAvKipcbiAgICogQm9keSB0cmlnZ2VyZWQgYSBwYWdlIGV2ZW50LlxuICAgKi9cbiAgb25Cb2R5UGFnZSh7IG9mZnNldCB9OiBhbnkpOiB2b2lkIHtcbiAgICAvLyBBdm9pZCBwYWdpbmF0aW9uIGNhbWluZyBmcm9tIGJvZHkgZXZlbnRzIGxpa2Ugc2Nyb2xsIHdoZW4gdGhlIHRhYmxlXG4gICAgLy8gaGFzIG5vIHZpcnR1YWxpemF0aW9uIGFuZCB0aGUgZXh0ZXJuYWwgcGFnaW5nIGlzIGVuYWJsZS5cbiAgICAvLyBUaGlzIG1lYW5zLCBsZXQncyB0aGUgZGV2ZWxvcGVyIGhhbmRsZSBwYWdpbmF0aW9uIGJ5IG15IGhpbShoZXIpIHNlbGZcbiAgICBpZiAodGhpcy5leHRlcm5hbFBhZ2luZyAmJiAhdGhpcy52aXJ0dWFsaXphdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgdGhpcy5wYWdlLmVtaXQoe1xuICAgICAgY291bnQ6IHRoaXMuY291bnQsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBib2R5IHRyaWdnZXJlZCBhIHNjcm9sbCBldmVudC5cbiAgICovXG4gIG9uQm9keVNjcm9sbChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX29mZnNldFgubmV4dChldmVudC5vZmZzZXRYKTtcbiAgICB0aGlzLnNjcm9sbC5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZm9vdGVyIHRyaWdnZXJlZCBhIHBhZ2UgZXZlbnQuXG4gICAqL1xuICBvbkZvb3RlclBhZ2UoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub2Zmc2V0ID0gZXZlbnQucGFnZSAtIDE7XG4gICAgdGhpcy5ib2R5Q29tcG9uZW50LnVwZGF0ZU9mZnNldFkodGhpcy5vZmZzZXQpO1xuXG4gICAgdGhpcy5wYWdlLmVtaXQoe1xuICAgICAgY291bnQ6IHRoaXMuY291bnQsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdCh7XG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBzaXplcyBvZiB0aGUgcGFnZVxuICAgKi9cbiAgY2FsY1BhZ2VTaXplKHZhbDogYW55W10gPSB0aGlzLnJvd3MpOiBudW1iZXIge1xuICAgIC8vIEtlZXAgdGhlIHBhZ2Ugc2l6ZSBjb25zdGFudCBldmVuIGlmIHRoZSByb3cgaGFzIGJlZW4gZXhwYW5kZWQuXG4gICAgLy8gVGhpcyBpcyBiZWNhdXNlIGFuIGV4cGFuZGVkIHJvdyBpcyBzdGlsbCBjb25zaWRlcmVkIHRvIGJlIGEgY2hpbGQgb2ZcbiAgICAvLyB0aGUgb3JpZ2luYWwgcm93LiAgSGVuY2UgY2FsY3VsYXRpb24gd291bGQgdXNlIHJvd0hlaWdodCBvbmx5LlxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbikge1xuICAgICAgY29uc3Qgc2l6ZSA9IE1hdGguY2VpbCh0aGlzLmJvZHlIZWlnaHQgLyAodGhpcy5yb3dIZWlnaHQgYXMgbnVtYmVyKSk7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoc2l6ZSwgMCk7XG4gICAgfVxuXG4gICAgLy8gaWYgbGltaXQgaXMgcGFzc2VkLCB3ZSBhcmUgcGFnaW5nXG4gICAgaWYgKHRoaXMubGltaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMubGltaXQ7XG4gICAgfVxuXG4gICAgLy8gb3RoZXJ3aXNlIHVzZSByb3cgbGVuZ3RoXG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gb3RoZXIgZW1wdHkgOihcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSByb3cgY291bnQuXG4gICAqL1xuICBjYWxjUm93Q291bnQodmFsOiBhbnlbXSA9IHRoaXMucm93cyk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmV4dGVybmFsUGFnaW5nKSB7XG4gICAgICBpZiAoIXZhbCkgcmV0dXJuIDA7XG5cbiAgICAgIGlmICh0aGlzLmdyb3VwZWRSb3dzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwZWRSb3dzLmxlbmd0aDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50cmVlRnJvbVJlbGF0aW9uICE9IG51bGwgJiYgdGhpcy50cmVlVG9SZWxhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbFJvd3MubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY291bnQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb250ZXh0bWVudSBldmVudC5cbiAgICovXG4gIG9uQ29sdW1uQ29udGV4dG1lbnUoeyBldmVudCwgY29sdW1uIH06IGFueSk6IHZvaWQge1xuICAgIHRoaXMudGFibGVDb250ZXh0bWVudS5lbWl0KHsgZXZlbnQsIHR5cGU6IENvbnRleHRtZW51VHlwZS5oZWFkZXIsIGNvbnRlbnQ6IGNvbHVtbiB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYm9keSB0cmlnZ2VyZWQgYSBjb250ZXh0bWVudSBldmVudC5cbiAgICovXG4gIG9uUm93Q29udGV4dG1lbnUoeyBldmVudCwgcm93IH06IGFueSk6IHZvaWQge1xuICAgIHRoaXMudGFibGVDb250ZXh0bWVudS5lbWl0KHsgZXZlbnQsIHR5cGU6IENvbnRleHRtZW51VHlwZS5ib2R5LCBjb250ZW50OiByb3cgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb2x1bW4gcmVzaXplIGV2ZW50LlxuICAgKi9cbiAgb25Db2x1bW5SZXNpemUoeyBjb2x1bW4sIG5ld1ZhbHVlIH06IGFueSk6IHZvaWQge1xuICAgIC8qIFNhZmFyaS9pT1MgMTAuMiB3b3JrYXJvdW5kICovXG4gICAgaWYgKGNvbHVtbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGlkeDogbnVtYmVyO1xuICAgIGNvbnN0IGNvbHMgPSB0aGlzLl9pbnRlcm5hbENvbHVtbnMubWFwKChjLCBpKSA9PiB7XG4gICAgICBjID0geyAuLi5jIH07XG5cbiAgICAgIGlmIChjLiQkaWQgPT09IGNvbHVtbi4kJGlkKSB7XG4gICAgICAgIGlkeCA9IGk7XG4gICAgICAgIGMud2lkdGggPSBuZXdWYWx1ZTtcblxuICAgICAgICAvLyBzZXQgdGhpcyBzbyB3ZSBjYW4gZm9yY2UgdGhlIGNvbHVtblxuICAgICAgICAvLyB3aWR0aCBkaXN0cmlidXRpb24gdG8gYmUgdG8gdGhpcyB2YWx1ZVxuICAgICAgICBjLiQkb2xkV2lkdGggPSBuZXdWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGM7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucyhjb2xzLCBpZHgpO1xuICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IGNvbHM7XG5cbiAgICB0aGlzLnJlc2l6ZS5lbWl0KHtcbiAgICAgIGNvbHVtbixcbiAgICAgIG5ld1ZhbHVlXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb2x1bW4gcmUtb3JkZXIgZXZlbnQuXG4gICAqL1xuICBvbkNvbHVtblJlb3JkZXIoeyBjb2x1bW4sIG5ld1ZhbHVlLCBwcmV2VmFsdWUgfTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY29scyA9IHRoaXMuX2ludGVybmFsQ29sdW1ucy5tYXAoYyA9PiB7XG4gICAgICByZXR1cm4geyAuLi5jIH07XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5zd2FwQ29sdW1ucykge1xuICAgICAgY29uc3QgcHJldkNvbCA9IGNvbHNbbmV3VmFsdWVdO1xuICAgICAgY29sc1tuZXdWYWx1ZV0gPSBjb2x1bW47XG4gICAgICBjb2xzW3ByZXZWYWx1ZV0gPSBwcmV2Q29sO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobmV3VmFsdWUgPiBwcmV2VmFsdWUpIHtcbiAgICAgICAgY29uc3QgbW92ZWRDb2wgPSBjb2xzW3ByZXZWYWx1ZV07XG4gICAgICAgIGZvciAobGV0IGkgPSBwcmV2VmFsdWU7IGkgPCBuZXdWYWx1ZTsgaSsrKSB7XG4gICAgICAgICAgY29sc1tpXSA9IGNvbHNbaSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIGNvbHNbbmV3VmFsdWVdID0gbW92ZWRDb2w7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtb3ZlZENvbCA9IGNvbHNbcHJldlZhbHVlXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHByZXZWYWx1ZTsgaSA+IG5ld1ZhbHVlOyBpLS0pIHtcbiAgICAgICAgICBjb2xzW2ldID0gY29sc1tpIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgY29sc1tuZXdWYWx1ZV0gPSBtb3ZlZENvbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSBjb2xzO1xuXG4gICAgdGhpcy5yZW9yZGVyLmVtaXQoe1xuICAgICAgY29sdW1uLFxuICAgICAgbmV3VmFsdWUsXG4gICAgICBwcmV2VmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ29sdW1uRmlsdGVyKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZpbHRlci5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaGVhZGVyIHRyaWdnZXJlZCBhIGNvbHVtbiBzb3J0IGV2ZW50LlxuICAgKi9cbiAgb25Db2x1bW5Tb3J0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAvLyBjbGVhbiBzZWxlY3RlZCByb3dzXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdCh7XG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnNvcnRzID0gZXZlbnQuc29ydHM7XG5cbiAgICAvLyB0aGlzIGNvdWxkIGJlIG9wdGltaXplZCBiZXR0ZXIgc2luY2UgaXQgd2lsbCByZXNvcnRcbiAgICAvLyB0aGUgcm93cyBhZ2FpbiBvbiB0aGUgJ3B1c2gnIGRldGVjdGlvbi4uLlxuICAgIGlmICh0aGlzLmV4dGVybmFsU29ydGluZyA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGRvbid0IHVzZSBub3JtYWwgc2V0dGVyIHNvIHdlIGRvbid0IHJlc29ydFxuICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XG4gICAgfVxuXG4gICAgLy8gYXV0byBncm91cCBieSBwYXJlbnQgb24gbmV3IHVwZGF0ZVxuICAgIHRoaXMuX2ludGVybmFsUm93cyA9IGdyb3VwUm93c0J5UGFyZW50cyhcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyxcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVGcm9tUmVsYXRpb24pLFxuICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZVRvUmVsYXRpb24pXG4gICAgKTtcblxuICAgIC8vIEFsd2F5cyBnbyB0byBmaXJzdCBwYWdlIHdoZW4gc29ydGluZyB0byBzZWUgdGhlIG5ld2x5IHNvcnRlZCBkYXRhXG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMuYm9keUNvbXBvbmVudC51cGRhdGVPZmZzZXRZKHRoaXMub2Zmc2V0KTtcbiAgICB0aGlzLnNvcnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGFsbCByb3cgc2VsZWN0aW9uXG4gICAqL1xuICBvbkhlYWRlclNlbGVjdChldmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xuICAgICAgLy8gYmVmb3JlIHdlIHNwbGljZSwgY2hrIGlmIHdlIGN1cnJlbnRseSBoYXZlIGFsbCBzZWxlY3RlZFxuICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLmJvZHlDb21wb25lbnQuaW5kZXhlcy5maXJzdDtcbiAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmJvZHlDb21wb25lbnQuaW5kZXhlcy5sYXN0O1xuICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gbGFzdCAtIGZpcnN0O1xuXG4gICAgICAvLyByZW1vdmUgYWxsIGV4aXN0aW5nIGVpdGhlciB3YXlcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcblxuICAgICAgLy8gZG8gdGhlIG9wcG9zaXRlIGhlcmVcbiAgICAgIGlmICghYWxsU2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnRoaXMuX2ludGVybmFsUm93cy5zbGljZShmaXJzdCwgbGFzdCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBiZWZvcmUgd2Ugc3BsaWNlLCBjaGsgaWYgd2UgY3VycmVudGx5IGhhdmUgYWxsIHNlbGVjdGVkXG4gICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSB0aGlzLnJvd3MubGVuZ3RoO1xuICAgICAgLy8gcmVtb3ZlIGFsbCBleGlzdGluZyBlaXRoZXIgd2F5XG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICAvLyBkbyB0aGUgb3Bwb3NpdGUgaGVyZVxuICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goLi4udGhpcy5yb3dzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQSByb3cgd2FzIHNlbGVjdGVkIGZyb20gYm9keVxuICAgKi9cbiAgb25Cb2R5U2VsZWN0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJvdyB3YXMgZXhwYW5kZWQgb3IgY29sbGFwc2VkIGZvciB0cmVlXG4gICAqL1xuICBvblRyZWVBY3Rpb24oZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IHJvdyA9IGV2ZW50LnJvdztcbiAgICAvLyBUT0RPOiBGb3IgZHVwbGljYXRlZCBpdGVtcyB0aGlzIHdpbGwgbm90IHdvcmtcbiAgICBjb25zdCByb3dJbmRleCA9IHRoaXMuX3Jvd3MuZmluZEluZGV4KHIgPT4gclt0aGlzLnRyZWVUb1JlbGF0aW9uXSA9PT0gZXZlbnQucm93W3RoaXMudHJlZVRvUmVsYXRpb25dKTtcbiAgICB0aGlzLnRyZWVBY3Rpb24uZW1pdCh7IHJvdywgcm93SW5kZXggfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgICBpZiAodGhpcy5yZXNpemVTZW5zb3IpIHtcbiAgICAgIHRoaXMucmVzaXplU2Vuc29yLmRldGFjaCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBsaXN0ZW4gZm9yIGNoYW5nZXMgdG8gaW5wdXQgYmluZGluZ3Mgb2YgYWxsIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSBhbmRcbiAgICogdHJpZ2dlciB0aGUgY29sdW1uVGVtcGxhdGVzLmNoYW5nZXMgb2JzZXJ2YWJsZSB0byBlbWl0XG4gICAqL1xuICBwcml2YXRlIGxpc3RlbkZvckNvbHVtbklucHV0Q2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNvbHVtbkNoYW5nZXNTZXJ2aWNlLmNvbHVtbklucHV0Q2hhbmdlcyQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uVGVtcGxhdGVzKSB7XG4gICAgICAgICAgdGhpcy5jb2x1bW5UZW1wbGF0ZXMubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc29ydEludGVybmFsUm93cygpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBzb3J0Um93cyh0aGlzLl9pbnRlcm5hbFJvd3MsIHRoaXMuX2ludGVybmFsQ29sdW1ucywgdGhpcy5zb3J0cyk7XG4gIH1cbn1cbiJdfQ==