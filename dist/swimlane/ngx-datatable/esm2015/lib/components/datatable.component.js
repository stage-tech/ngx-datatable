/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, ElementRef, EventEmitter, ViewChild, ContentChildren, QueryList, HostBinding, ContentChild, KeyValueDiffers, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, SkipSelf, Optional, Inject } from '@angular/core';
import { DatatableGroupHeaderDirective } from './body/body-group-header.directive';
import { BehaviorSubject, Subject } from 'rxjs';
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
import { throttleTime } from 'rxjs/operators';
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
        this._subscriptions.push(this.recalculate$.pipe(throttleTime(100)).subscribe((/**
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
        if (!((/** @type {?} */ (this.cd))).destroyed) {
            this.cd.detectChanges();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxFQUVULGVBQWUsRUFFZixTQUFTLEVBRVQsV0FBVyxFQUNYLFlBQVksRUFFWixlQUFlLEVBRWYsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsUUFBUSxFQUVSLFFBQVEsRUFDUixNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbkYsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUs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Q0FDMEM7O0lBaUIxQyxxQ0FBcUI7O0lBQ3JCLHlDQUFvQjs7SUFDcEIsc0NBQWlCOztJQUNqQix3Q0FBbUI7O0lBQ25CLHNDQUFxQjs7SUFDckIsdUNBQWtDOztJQUVsQyxzQ0FBa0M7O0lBQ2xDLG9DQUEyQjs7SUFDM0Isb0NBQW1COztJQUNuQixxQ0FBb0I7O0lBQ3BCLG1DQUFhOztJQUNiLDBDQUFxQjs7SUFDckIsMkNBQXFCOztJQUNyQiw4Q0FBZ0M7O0lBQ2hDLHNDQUF3Qjs7SUFDeEIsOENBQXNEOztJQUN0RCw0Q0FBb0M7O0lBQ3BDLDBDQUEyQjs7SUFDM0IsMENBQTZCOzs7Ozs7OztJQWlGN0IseUNBUUU7Ozs7O0lBdEZBLDZDQUFvRDs7Ozs7SUFDcEQsOENBQXNEOzs7OztJQUN0RCxnQ0FBNkI7Ozs7O0lBRzdCLGtEQUFrRDs7Ozs7SUFDbEQsMkNBQStFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIFZpZXdDaGlsZCxcbiAgSG9zdExpc3RlbmVyLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICBBZnRlclZpZXdJbml0LFxuICBIb3N0QmluZGluZyxcbiAgQ29udGVudENoaWxkLFxuICBEb0NoZWNrLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIEtleVZhbHVlRGlmZmVyLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBTa2lwU2VsZixcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgSW5qZWN0LFxuICBWaWV3UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vYm9keS9ib2R5LWdyb3VwLWhlYWRlci5kaXJlY3RpdmUnO1xuXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSU5neERhdGF0YWJsZUNvbmZpZyB9IGZyb20gJy4uL25neC1kYXRhdGFibGUubW9kdWxlJztcbmltcG9ydCB7IGdyb3VwUm93c0J5UGFyZW50cywgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wIH0gZnJvbSAnLi4vdXRpbHMvdHJlZSc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcbmltcG9ydCB7IHNldENvbHVtbkRlZmF1bHRzLCB0cmFuc2xhdGVUZW1wbGF0ZXMgfSBmcm9tICcuLi91dGlscy9jb2x1bW4taGVscGVyJztcbmltcG9ydCB7IENvbHVtbk1vZGUgfSBmcm9tICcuLi90eXBlcy9jb2x1bW4tbW9kZS50eXBlJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uL3R5cGVzL3NvcnQudHlwZSc7XG5pbXBvcnQgeyBDb250ZXh0bWVudVR5cGUgfSBmcm9tICcuLi90eXBlcy9jb250ZXh0bWVudS50eXBlJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSB9IGZyb20gJy4vcm93LWRldGFpbC9yb3ctZGV0YWlsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2Zvb3Rlci9mb290ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlDb21wb25lbnQgfSBmcm9tICcuL2JvZHkvYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JvbGxiYXJIZWxwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9zY3JvbGxiYXItaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sdW1uQ2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb2x1bW4tY2hhbmdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnNIZWxwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9kaW1lbnNpb25zLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IHRocm90dGxlYWJsZSB9IGZyb20gJy4uL3V0aWxzL3Rocm90dGxlJztcbmltcG9ydCB7IGZvcmNlRmlsbENvbHVtbldpZHRocywgYWRqdXN0Q29sdW1uV2lkdGhzIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XG5pbXBvcnQgeyBzb3J0Um93cyB9IGZyb20gJy4uL3V0aWxzL3NvcnQnO1xuaW1wb3J0IHsgUmVzaXplU2Vuc29yIH0gZnJvbSAnY3NzLWVsZW1lbnQtcXVlcmllcyc7XG5pbXBvcnQgeyB0aHJvdHRsZVRpbWUsIGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWRhdGF0YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRhdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0YXRhYmxlLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25neC1kYXRhdGFibGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YXRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrLCBBZnRlclZpZXdJbml0IHtcbiAgLyoqXG4gICAqIFRlbXBsYXRlIGZvciB0aGUgdGFyZ2V0IG1hcmtlciBvZiBkcmFnIHRhcmdldCBjb2x1bW5zLlxuICAgKi9cbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyVGVtcGxhdGU6IGFueTtcblxuICAvKipcbiAgICogUm93cyB0aGF0IGFyZSBkaXNwbGF5ZWQgaW4gdGhlIHRhYmxlLlxuICAgKi9cbiAgQElucHV0KCkgc2V0IHJvd3ModmFsOiBhbnkpIHtcbiAgICB0aGlzLl9yb3dzID0gdmFsO1xuXG4gICAgaWYgKHZhbCkge1xuICAgICAgdGhpcy5faW50ZXJuYWxSb3dzID0gWy4uLnZhbF07XG4gICAgfVxuXG4gICAgLy8gYXV0byBzb3J0IG9uIG5ldyB1cGRhdGVzXG4gICAgaWYgKCF0aGlzLmV4dGVybmFsU29ydGluZykge1xuICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XG4gICAgfVxuXG4gICAgLy8gYXV0byBncm91cCBieSBwYXJlbnQgb24gbmV3IHVwZGF0ZVxuICAgIHRoaXMuX2ludGVybmFsUm93cyA9IGdyb3VwUm93c0J5UGFyZW50cyhcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyxcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVGcm9tUmVsYXRpb24pLFxuICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZVRvUmVsYXRpb24pXG4gICAgKTtcblxuICAgIC8vIHJlY2FsY3VsYXRlIHNpemVzL2V0Y1xuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcblxuICAgIGlmICh0aGlzLl9yb3dzICYmIHRoaXMuX2dyb3VwUm93c0J5KSB7XG4gICAgICAvLyBJZiBhIGNvbHVtbiBoYXMgYmVlbiBzcGVjaWZpZWQgaW4gX2dyb3VwUm93c0J5IGNyZWF0ZWQgYSBuZXcgYXJyYXkgd2l0aCB0aGUgZGF0YSBncm91cGVkIGJ5IHRoYXQgcm93XG4gICAgICB0aGlzLmdyb3VwZWRSb3dzID0gdGhpcy5ncm91cEFycmF5QnkodGhpcy5fcm93cywgdGhpcy5fZ3JvdXBSb3dzQnkpO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcm93cy5cbiAgICovXG4gIGdldCByb3dzKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBhdHRyaWJ1dGUgYWxsb3dzIHRoZSB1c2VyIHRvIHNldCB0aGUgbmFtZSBvZiB0aGUgY29sdW1uIHRvIGdyb3VwIHRoZSBkYXRhIHdpdGhcbiAgICovXG4gIEBJbnB1dCgpIHNldCBncm91cFJvd3NCeSh2YWw6IHN0cmluZykge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMuX2dyb3VwUm93c0J5ID0gdmFsO1xuICAgICAgaWYgKHRoaXMuX3Jvd3MgJiYgdGhpcy5fZ3JvdXBSb3dzQnkpIHtcbiAgICAgICAgLy8gY3JldGVzIGEgbmV3IGFycmF5IHdpdGggdGhlIGRhdGEgZ3JvdXBlZFxuICAgICAgICB0aGlzLmdyb3VwZWRSb3dzID0gdGhpcy5ncm91cEFycmF5QnkodGhpcy5fcm93cywgdGhpcy5fZ3JvdXBSb3dzQnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBncm91cFJvd3NCeSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXBSb3dzQnk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBhdHRyaWJ1dGUgYWxsb3dzIHRoZSB1c2VyIHRvIHNldCBhIGdyb3VwZWQgYXJyYXkgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG4gICAqICBbXG4gICAqICAgIHtncm91cGlkPTF9IFtcbiAgICogICAgICB7aWQ9MSBuYW1lPVwidGVzdDFcIn0sXG4gICAqICAgICAge2lkPTIgbmFtZT1cInRlc3QyXCJ9LFxuICAgKiAgICAgIHtpZD0zIG5hbWU9XCJ0ZXN0M1wifVxuICAgKiAgICBdfSxcbiAgICogICAge2dyb3VwaWQ9Mj5bXG4gICAqICAgICAge2lkPTQgbmFtZT1cInRlc3Q0XCJ9LFxuICAgKiAgICAgIHtpZD01IG5hbWU9XCJ0ZXN0NVwifSxcbiAgICogICAgICB7aWQ9NiBuYW1lPVwidGVzdDZcIn1cbiAgICogICAgXX1cbiAgICogIF1cbiAgICovXG4gIEBJbnB1dCgpIGdyb3VwZWRSb3dzOiBhbnlbXTtcblxuICBASW5wdXQoKSBleHBhbmRhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIENvbHVtbnMgdG8gYmUgZGlzcGxheWVkLlxuICAgKi9cbiAgQElucHV0KCkgc2V0IGNvbHVtbnModmFsOiBUYWJsZUNvbHVtbltdKSB7XG4gICAgdmFsID0gW1xuICAgICAgLi4uKHRoaXMuZXhwYW5kYWJsZVxuICAgICAgICA/IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDUwLFxuICAgICAgICAgICAgICBwcm9wOiAnaWNlLWV4cGFuZGFibGUnLFxuICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgcmVzaXplYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIGNhbkF1dG9SZXNpemU6IGZhbHNlLFxuICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIDogW10pLFxuICAgICAgLi4udmFsXG4gICAgXTtcbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSBbLi4udmFsXTtcbiAgICAgIHNldENvbHVtbkRlZmF1bHRzKHRoaXMuX2ludGVybmFsQ29sdW1ucyk7XG4gICAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucygpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbHVtbnMgPSB2YWw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb2x1bW5zLlxuICAgKi9cbiAgZ2V0IGNvbHVtbnMoKTogVGFibGVDb2x1bW5bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiByb3cgb2JqZWN0cyB0aGF0IHNob3VsZCBiZVxuICAgKiByZXByZXNlbnRlZCBhcyBzZWxlY3RlZCBpbiB0aGUgZ3JpZC5cbiAgICogRGVmYXVsdCB2YWx1ZTogYFtdYFxuICAgKi9cbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGFueVtdID0gW107XG5cbiAgLyoqXG4gICAqIEVuYWJsZSB2ZXJ0aWNhbCBzY3JvbGxiYXJzXG4gICAqL1xuICBASW5wdXQoKSBzY3JvbGxiYXJWOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEVuYWJsZSBob3J6IHNjcm9sbGJhcnNcbiAgICovXG4gIEBJbnB1dCgpIHNjcm9sbGJhckg6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHJvdyBoZWlnaHQ7IHdoaWNoIGlzIG5lY2Vzc2FyeVxuICAgKiB0byBjYWxjdWxhdGUgdGhlIGhlaWdodCBmb3IgdGhlIGxhenkgcmVuZGVyaW5nLlxuICAgKi9cbiAgQElucHV0KCkgcm93SGVpZ2h0OiBudW1iZXIgfCAnYXV0bycgfCAoKHJvdz86IGFueSkgPT4gbnVtYmVyKSA9IDMwO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIGNvbHVtbiB3aWR0aCBkaXN0cmlidXRpb24gZm9ybXVsYS5cbiAgICogRXhhbXBsZTogZmxleCwgZm9yY2UsIHN0YW5kYXJkXG4gICAqL1xuICBASW5wdXQoKSBjb2x1bW5Nb2RlOiBDb2x1bW5Nb2RlID0gQ29sdW1uTW9kZS5zdGFuZGFyZDtcblxuICAvKipcbiAgICogVGhlIG1pbmltdW0gaGVhZGVyIGhlaWdodCBpbiBwaXhlbHMuXG4gICAqIFBhc3MgYSBmYWxzZXkgZm9yIG5vIGhlYWRlclxuICAgKi9cbiAgQElucHV0KCkgaGVhZGVySGVpZ2h0OiBhbnkgPSAzMDtcblxuICAvKipcbiAgICogVGhlIG1pbmltdW0gZm9vdGVyIGhlaWdodCBpbiBwaXhlbHMuXG4gICAqIFBhc3MgZmFsc2V5IGZvciBubyBmb290ZXJcbiAgICovXG4gIEBJbnB1dCgpIGZvb3RlckhlaWdodDogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogSWYgdGhlIHRhYmxlIHNob3VsZCB1c2UgZXh0ZXJuYWwgcGFnaW5nXG4gICAqIG90aGVyd2lzZSBpdHMgYXNzdW1lZCB0aGF0IGFsbCBkYXRhIGlzIHByZWxvYWRlZC5cbiAgICovXG4gIEBJbnB1dCgpIGV4dGVybmFsUGFnaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIElmIHRoZSB0YWJsZSBzaG91bGQgdXNlIGV4dGVybmFsIHNvcnRpbmcgb3JcbiAgICogdGhlIGJ1aWx0LWluIGJhc2ljIHNvcnRpbmcuXG4gICAqL1xuICBASW5wdXQoKSBleHRlcm5hbFNvcnRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHBhZ2Ugc2l6ZSB0byBiZSBzaG93bi5cbiAgICogRGVmYXVsdCB2YWx1ZTogYHVuZGVmaW5lZGBcbiAgICovXG4gIEBJbnB1dCgpIHNldCBsaW1pdCh2YWw6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2xpbWl0ID0gdmFsO1xuXG4gICAgLy8gcmVjYWxjdWxhdGUgc2l6ZXMvZXRjXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxpbWl0LlxuICAgKi9cbiAgZ2V0IGxpbWl0KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbWl0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB0b3RhbCBjb3VudCBvZiBhbGwgcm93cy5cbiAgICogRGVmYXVsdCB2YWx1ZTogYDBgXG4gICAqL1xuICBASW5wdXQoKSBzZXQgY291bnQodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb3VudCA9IHZhbDtcblxuICAgIC8vIHJlY2FsY3VsYXRlIHNpemVzL2V0Y1xuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjb3VudC5cbiAgICovXG4gIGdldCBjb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBvZmZzZXQgKCBwYWdlIC0gMSApIHNob3duLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgMGBcbiAgICovXG4gIEBJbnB1dCgpIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9vZmZzZXQgPSB2YWw7XG4gIH1cbiAgZ2V0IG9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih0aGlzLl9vZmZzZXQsIE1hdGguY2VpbCh0aGlzLnJvd0NvdW50IC8gdGhpcy5wYWdlU2l6ZSkgLSAxKSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGUgbGluZWFyIGxvYWRpbmcgYmFyLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgZmFsc2VgXG4gICAqL1xuICBASW5wdXQoKSBsb2FkaW5nSW5kaWNhdG9yOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2Ygcm93IHNlbGVjdGlvbi4gT3B0aW9ucyBhcmU6XG4gICAqXG4gICAqICAtIGBzaW5nbGVgXG4gICAqICAtIGBtdWx0aWBcbiAgICogIC0gYGNoZWNrYm94YFxuICAgKiAgLSBgbXVsdGlDbGlja2BcbiAgICogIC0gYGNlbGxgXG4gICAqXG4gICAqIEZvciBubyBzZWxlY3Rpb24gcGFzcyBhIGBmYWxzZXlgLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgdW5kZWZpbmVkYFxuICAgKi9cbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcblxuICAvKipcbiAgICogRW5hYmxlL0Rpc2FibGUgYWJpbGl0eSB0byByZS1vcmRlciBjb2x1bW5zXG4gICAqIGJ5IGRyYWdnaW5nIHRoZW0uXG4gICAqL1xuICBASW5wdXQoKSByZW9yZGVyYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFN3YXAgY29sdW1ucyBvbiByZS1vcmRlciBjb2x1bW5zIG9yXG4gICAqIG1vdmUgdGhlbS5cbiAgICovXG4gIEBJbnB1dCgpIHN3YXBDb2x1bW5zOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2Ygc29ydGluZ1xuICAgKi9cbiAgQElucHV0KCkgc29ydFR5cGU6IFNvcnRUeXBlID0gU29ydFR5cGUuc2luZ2xlO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBzb3J0ZWQgY29sdW1ucyBieSBwcm9wZXJ0eSBhbmQgdHlwZS5cbiAgICogRGVmYXVsdCB2YWx1ZTogYFtdYFxuICAgKi9cbiAgQElucHV0KCkgc29ydHM6IGFueVtdID0gW107XG5cbiAgLyoqXG4gICAqIENzcyBjbGFzcyBvdmVycmlkZXNcbiAgICovXG4gIEBJbnB1dCgpIGNzc0NsYXNzZXM6IGFueSA9IHtcbiAgICBzb3J0QXNjZW5kaW5nOiAnZGF0YXRhYmxlLWljb24tdXAnLFxuICAgIHNvcnREZXNjZW5kaW5nOiAnZGF0YXRhYmxlLWljb24tZG93bicsXG4gICAgcGFnZXJMZWZ0QXJyb3c6ICdkYXRhdGFibGUtaWNvbi1sZWZ0JyxcbiAgICBwYWdlclJpZ2h0QXJyb3c6ICdkYXRhdGFibGUtaWNvbi1yaWdodCcsXG4gICAgcGFnZXJQcmV2aW91czogJ2RhdGF0YWJsZS1pY29uLXByZXYnLFxuICAgIHBhZ2VyTmV4dDogJ2RhdGF0YWJsZS1pY29uLXNraXAnXG4gIH07XG5cbiAgLyoqXG4gICAqIE1lc3NhZ2Ugb3ZlcnJpZGVzIGZvciBsb2NhbGl6YXRpb25cbiAgICpcbiAgICogZW1wdHlNZXNzYWdlICAgICBbZGVmYXVsdF0gPSAnTm8gZGF0YSB0byBkaXNwbGF5J1xuICAgKiB0b3RhbE1lc3NhZ2UgICAgIFtkZWZhdWx0XSA9ICd0b3RhbCdcbiAgICogc2VsZWN0ZWRNZXNzYWdlICBbZGVmYXVsdF0gPSAnc2VsZWN0ZWQnXG4gICAqL1xuICBASW5wdXQoKSBtZXNzYWdlczogYW55ID0ge1xuICAgIC8vIE1lc3NhZ2UgdG8gc2hvdyB3aGVuIGFycmF5IGlzIHByZXNlbnRlZFxuICAgIC8vIGJ1dCBjb250YWlucyBubyB2YWx1ZXNcbiAgICBlbXB0eU1lc3NhZ2U6ICdObyBkYXRhIHRvIGRpc3BsYXknLFxuXG4gICAgLy8gRm9vdGVyIHRvdGFsIG1lc3NhZ2VcbiAgICB0b3RhbE1lc3NhZ2U6ICd0b3RhbCcsXG5cbiAgICAvLyBGb290ZXIgc2VsZWN0ZWQgbWVzc2FnZVxuICAgIHNlbGVjdGVkTWVzc2FnZTogJ3NlbGVjdGVkJ1xuICB9O1xuXG4gIC8qKlxuICAgKiBSb3cgc3BlY2lmaWMgY2xhc3Nlcy5cbiAgICogU2ltaWxhciBpbXBsZW1lbnRhdGlvbiB0byBuZ0NsYXNzLlxuICAgKlxuICAgKiAgW3Jvd0NsYXNzXT1cIidmaXJzdCBzZWNvbmQnXCJcbiAgICogIFtyb3dDbGFzc109XCJ7ICdmaXJzdCc6IHRydWUsICdzZWNvbmQnOiB0cnVlLCAndGhpcmQnOiBmYWxzZSB9XCJcbiAgICovXG4gIEBJbnB1dCgpIHJvd0NsYXNzOiBhbnk7XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbi9mdW5jdGlvbiB5b3UgY2FuIHVzZSB0byBjaGVjayB3aGV0aGVyIHlvdSB3YW50XG4gICAqIHRvIHNlbGVjdCBhIHBhcnRpY3VsYXIgcm93IGJhc2VkIG9uIGEgY3JpdGVyaWEuIEV4YW1wbGU6XG4gICAqXG4gICAqICAgIChzZWxlY3Rpb24pID0+IHtcbiAgICogICAgICByZXR1cm4gc2VsZWN0aW9uICE9PSAnRXRoZWwgUHJpY2UnO1xuICAgKiAgICB9XG4gICAqL1xuICBASW5wdXQoKSBzZWxlY3RDaGVjazogYW55O1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHlvdSBjYW4gdXNlIHRvIGNoZWNrIHdoZXRoZXIgeW91IHdhbnRcbiAgICogdG8gc2hvdyB0aGUgY2hlY2tib3ggZm9yIGEgcGFydGljdWxhciByb3cgYmFzZWQgb24gYSBjcml0ZXJpYS4gRXhhbXBsZTpcbiAgICpcbiAgICogICAgKHJvdywgY29sdW1uLCB2YWx1ZSkgPT4ge1xuICAgKiAgICAgIHJldHVybiByb3cubmFtZSAhPT0gJ0V0aGVsIFByaWNlJztcbiAgICogICAgfVxuICAgKi9cbiAgQElucHV0KCkgZGlzcGxheUNoZWNrOiAocm93OiBhbnksIGNvbHVtbj86IGFueSwgdmFsdWU/OiBhbnkpID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiB5b3UgY2FuIHVzZSB0byBzZXQgdGhlIGRldGF1bHQgYmVoYXZpb3VyIG9mIHJvd3MgYW5kIGdyb3Vwc1xuICAgKiB3aGV0aGVyIHRoZXkgd2lsbCBzdGFydCBleHBhbmRlZCBvciBub3QuIElmIG9tbWl0ZWQgdGhlIGRlZmF1bHQgaXMgTk9UIGV4cGFuZGVkLlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgZ3JvdXBFeHBhbnNpb25EZWZhdWx0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFByb3BlcnR5IHRvIHdoaWNoIHlvdSBjYW4gdXNlIGZvciBjdXN0b20gdHJhY2tpbmcgb2Ygcm93cy5cbiAgICogRXhhbXBsZTogJ25hbWUnXG4gICAqL1xuICBASW5wdXQoKSB0cmFja0J5UHJvcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBQcm9wZXJ0eSB0byB3aGljaCB5b3UgY2FuIHVzZSBmb3IgZGV0ZXJtaW5pbmcgc2VsZWN0IGFsbFxuICAgKiByb3dzIG9uIGN1cnJlbnQgcGFnZSBvciBub3QuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBEYXRhdGFibGVDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpIHNlbGVjdEFsbFJvd3NPblBhZ2UgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBmbGFnIGZvciByb3cgdmlydHVhbGl6YXRpb24gb24gLyBvZmZcbiAgICovXG4gIEBJbnB1dCgpIHZpcnR1YWxpemF0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVHJlZSBmcm9tIHJlbGF0aW9uXG4gICAqL1xuICBASW5wdXQoKSB0cmVlRnJvbVJlbGF0aW9uOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRyZWUgdG8gcmVsYXRpb25cbiAgICovXG4gIEBJbnB1dCgpIHRyZWVUb1JlbGF0aW9uOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBmb3Igc3dpdGNoaW5nIHN1bW1hcnkgcm93IG9uIC8gb2ZmXG4gICAqL1xuICBASW5wdXQoKSBzdW1tYXJ5Um93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgaGVpZ2h0IG9mIHN1bW1hcnkgcm93XG4gICAqL1xuICBASW5wdXQoKSBzdW1tYXJ5SGVpZ2h0OiBudW1iZXIgPSAzMDtcblxuICAvKipcbiAgICogQSBwcm9wZXJ0eSBob2xkcyBhIHN1bW1hcnkgcm93IHBvc2l0aW9uOiB0b3AvYm90dG9tXG4gICAqL1xuICBASW5wdXQoKSBzdW1tYXJ5UG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xuXG4gIC8qKlxuICAgKiBCb2R5IHdhcyBzY3JvbGxlZCB0eXBpY2FsbHkgaW4gYSBgc2Nyb2xsYmFyVjp0cnVlYCBzY2VuYXJpby5cbiAgICovXG4gIEBPdXRwdXQoKSBzY3JvbGw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBBIGNlbGwgb3Igcm93IHdhcyBmb2N1c2VkIHZpYSBrZXlib2FyZCBvciBtb3VzZSBjbGljay5cbiAgICovXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEEgY2VsbCBvciByb3cgd2FzIHNlbGVjdGVkLlxuICAgKi9cbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENvbHVtbiBzb3J0IHdhcyBpbnZva2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBJY2UgY29sdW1uIGZpbHRlciB3YXMgaW52b2tlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBmaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFibGUgd2FzIHBhZ2VkIGVpdGhlciB0cmlnZ2VyZWQgYnkgdGhlIHBhZ2VyIG9yIHRoZSBib2R5IHNjcm9sbC5cbiAgICovXG4gIEBPdXRwdXQoKSBwYWdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ29sdW1ucyB3ZXJlIHJlLW9yZGVyZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENvbHVtbiB3YXMgcmVzaXplZC5cbiAgICovXG4gIEBPdXRwdXQoKSByZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBUaGUgY29udGV4dCBtZW51IHdhcyBpbnZva2VkIG9uIHRoZSB0YWJsZS5cbiAgICogdHlwZSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgaGVhZGVyIG9yIHRoZSBib2R5IHdhcyBjbGlja2VkLlxuICAgKiBjb250ZW50IGNvbnRhaW5zIGVpdGhlciB0aGUgY29sdW1uIG9yIHRoZSByb3cgdGhhdCB3YXMgY2xpY2tlZC5cbiAgICovXG4gIEBPdXRwdXQoKSB0YWJsZUNvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyB0eXBlOiBDb250ZXh0bWVudVR5cGU7IGNvbnRlbnQ6IGFueSB9PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEEgcm93IHdhcyBleHBhbmRlZCBvdCBjb2xsYXBzZWQgZm9yIHRyZWVcbiAgICovXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgaWYgdGhlIGhlYWRlciBoZWlnaHQgaWYgZml4ZWQgaGVpZ2h0LlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5maXhlZC1oZWFkZXInKVxuICBnZXQgaXNGaXhlZEhlYWRlcigpOiBib29sZWFuIHtcbiAgICBjb25zdCBoZWFkZXJIZWlnaHQ6IG51bWJlciB8IHN0cmluZyA9IHRoaXMuaGVhZGVySGVpZ2h0O1xuICAgIHJldHVybiB0eXBlb2YgaGVhZGVySGVpZ2h0ID09PSAnc3RyaW5nJyA/IDxzdHJpbmc+aGVhZGVySGVpZ2h0ICE9PSAnYXV0bycgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWZcbiAgICogdGhlIHJvdyBoZWlnaHRzIGFyZSBmaXhlZCBoZWlnaHRzLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5maXhlZC1yb3cnKVxuICBnZXQgaXNGaXhlZFJvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yb3dIZWlnaHQgIT09ICdhdXRvJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGVsZW1lbnQgaWZcbiAgICogdmVydGljYWwgc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNjcm9sbC12ZXJ0aWNhbCcpXG4gIGdldCBpc1ZlcnRTY3JvbGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsYmFyVjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGVsZW1lbnQgaWZcbiAgICogdmlydHVhbGl6YXRpb24gaXMgZW5hYmxlZC5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MudmlydHVhbGl6ZWQnKVxuICBnZXQgaXNWaXJ0dWFsaXplZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy52aXJ0dWFsaXphdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50XG4gICAqIGlmIHRoZSBob3J6aW9udGFsIHNjcm9sbGluZyBpcyBlbmFibGVkLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zY3JvbGwtaG9yeicpXG4gIGdldCBpc0hvclNjcm9sbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxiYXJIO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgZWxlbWVudCBpcyBzZWxlY3RhYmxlLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RhYmxlJylcbiAgZ2V0IGlzU2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBpcyBjaGVja2JveCBzZWxlY3Rpb24uXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNoZWNrYm94LXNlbGVjdGlvbicpXG4gIGdldCBpc0NoZWNrYm94U2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2hlY2tib3g7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBpZiBjZWxsIHNlbGVjdGlvbi5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2VsbC1zZWxlY3Rpb24nKVxuICBnZXQgaXNDZWxsU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2VsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGlmIHNpbmdsZSBzZWxlY3QuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpbmdsZS1zZWxlY3Rpb24nKVxuICBnZXQgaXNTaW5nbGVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5zaW5nbGU7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFkZGVkIHRvIHJvb3QgZWxlbWVudCBpZiBtdWxpdCBzZWxlY3RcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MubXVsdGktc2VsZWN0aW9uJylcbiAgZ2V0IGlzTXVsdGlTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5tdWx0aTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYWRkZWQgdG8gcm9vdCBlbGVtZW50IGlmIG11bGl0IGNsaWNrIHNlbGVjdFxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tdWx0aS1jbGljay1zZWxlY3Rpb24nKVxuICBnZXQgaXNNdWx0aUNsaWNrU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGlDbGljaztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb2x1bW4gdGVtcGxhdGVzIGdhdGhlcmVkIGZyb20gYENvbnRlbnRDaGlsZHJlbmBcbiAgICogaWYgZGVzY3JpYmVkIGluIHlvdXIgbWFya3VwLlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUpXG4gIHNldCBjb2x1bW5UZW1wbGF0ZXModmFsOiBRdWVyeUxpc3Q8RGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlPikge1xuICAgIHRoaXMuX2NvbHVtblRlbXBsYXRlcyA9IHZhbDtcbiAgICB0aGlzLnRyYW5zbGF0ZUNvbHVtbnModmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb2x1bW4gdGVtcGxhdGVzLlxuICAgKi9cbiAgZ2V0IGNvbHVtblRlbXBsYXRlcygpOiBRdWVyeUxpc3Q8RGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtblRlbXBsYXRlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3cgRGV0YWlsIHRlbXBsYXRlcyBnYXRoZXJlZCBmcm9tIHRoZSBDb250ZW50Q2hpbGRcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcm93RGV0YWlsOiBEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmU7XG5cbiAgLyoqXG4gICAqIEdyb3VwIEhlYWRlciB0ZW1wbGF0ZXMgZ2F0aGVyZWQgZnJvbSB0aGUgQ29udGVudENoaWxkXG4gICAqL1xuICBAQ29udGVudENoaWxkKERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgZ3JvdXBIZWFkZXI6IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBGb290ZXIgdGVtcGxhdGUgZ2F0aGVyZWQgZnJvbSB0aGUgQ29udGVudENoaWxkXG4gICAqL1xuICBAQ29udGVudENoaWxkKERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGZvb3RlcjogRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGJvZHkgY29tcG9uZW50IGZvciBtYW51YWxseVxuICAgKiBpbnZva2luZyBmdW5jdGlvbnMgb24gdGhlIGJvZHkuXG4gICAqL1xuICBAVmlld0NoaWxkKERhdGFUYWJsZUJvZHlDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBib2R5Q29tcG9uZW50OiBEYXRhVGFibGVCb2R5Q29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGhlYWRlciBjb21wb25lbnQgZm9yIG1hbnVhbGx5XG4gICAqIGludm9raW5nIGZ1bmN0aW9ucyBvbiB0aGUgaGVhZGVyLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgRGF0YXRhYmxlQ29tcG9uZW50XG4gICAqL1xuICBAVmlld0NoaWxkKERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGhlYWRlckNvbXBvbmVudDogRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGlmIGFsbCByb3dzIGFyZSBzZWxlY3RlZC5cbiAgICovXG4gIGdldCBhbGxSb3dzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgbGV0IGFsbFJvd3NTZWxlY3RlZCA9IHRoaXMucm93cyAmJiB0aGlzLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSB0aGlzLnJvd3MubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xuICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMuYm9keUNvbXBvbmVudC5pbmRleGVzO1xuICAgICAgY29uc3Qgcm93c09uUGFnZSA9IGluZGV4ZXMubGFzdCAtIGluZGV4ZXMuZmlyc3Q7XG4gICAgICBhbGxSb3dzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gcm93c09uUGFnZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiB0aGlzLnJvd3MgJiYgdGhpcy5yb3dzLmxlbmd0aCAhPT0gMCAmJiBhbGxSb3dzU2VsZWN0ZWQ7XG4gIH1cblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgX2lubmVyV2lkdGg6IG51bWJlcjtcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgYm9keUhlaWdodDogbnVtYmVyO1xuICByb3dDb3VudDogbnVtYmVyID0gMDtcbiAgcm93RGlmZmVyOiBLZXlWYWx1ZURpZmZlcjx7fSwge30+O1xuXG4gIF9vZmZzZXRYID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgX2xpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIF9jb3VudDogbnVtYmVyID0gMDtcbiAgX29mZnNldDogbnVtYmVyID0gMDtcbiAgX3Jvd3M6IGFueVtdO1xuICBfZ3JvdXBSb3dzQnk6IHN0cmluZztcbiAgX2ludGVybmFsUm93czogYW55W107XG4gIF9pbnRlcm5hbENvbHVtbnM6IFRhYmxlQ29sdW1uW107XG4gIF9jb2x1bW5zOiBUYWJsZUNvbHVtbltdO1xuICBfY29sdW1uVGVtcGxhdGVzOiBRdWVyeUxpc3Q8RGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlPjtcbiAgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHJlc2l6ZVNlbnNvcjogUmVzaXplU2Vuc29yO1xuICByZWNhbGN1bGF0ZSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBTa2lwU2VsZigpIHByaXZhdGUgc2Nyb2xsYmFySGVscGVyOiBTY3JvbGxiYXJIZWxwZXIsXG4gICAgQFNraXBTZWxmKCkgcHJpdmF0ZSBkaW1lbnNpb25zSGVscGVyOiBEaW1lbnNpb25zSGVscGVyLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgIHByaXZhdGUgY29sdW1uQ2hhbmdlc1NlcnZpY2U6IENvbHVtbkNoYW5nZXNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2NvbmZpZ3VyYXRpb24nKSBwcml2YXRlIGNvbmZpZ3VyYXRpb246IElOZ3hEYXRhdGFibGVDb25maWdcbiAgKSB7XG4gICAgLy8gZ2V0IHJlZiB0byBlbG0gZm9yIG1lYXN1cmluZ1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnJvd0RpZmZlciA9IGRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XG5cbiAgICAvLyBhcHBseSBnbG9iYWwgc2V0dGluZ3MgZnJvbSBNb2R1bGUuZm9yUm9vdFxuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24gJiYgdGhpcy5jb25maWd1cmF0aW9uLm1lc3NhZ2VzKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzID0geyAuLi50aGlzLmNvbmZpZ3VyYXRpb24ubWVzc2FnZXMgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZFxuICAgKiBwcm9wZXJ0aWVzIG9mIGEgZGlyZWN0aXZlIGFyZSBpbml0aWFsaXplZC5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIG5lZWQgdG8gY2FsbCB0aGlzIGltbWVkaWF0bHkgdG8gc2l6ZVxuICAgIC8vIGlmIHRoZSB0YWJsZSBpcyBoaWRkZW4gdGhlIHZpc2liaWxpdHlcbiAgICAvLyBsaXN0ZW5lciB3aWxsIGludm9rZSB0aGlzIGl0c2VsZiB1cG9uIHNob3dcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gICAgaWYgKFJlc2l6ZVNlbnNvcikge1xuICAgICAgdGhpcy5yZXNpemVTZW5zb3IgPSBuZXcgUmVzaXplU2Vuc29yKHRoaXMuZWxlbWVudCwgKCkgPT4gdGhpcy5yZWNhbGN1bGF0ZSQubmV4dCgpKTtcbiAgICB9XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMucmVjYWxjdWxhdGUkLnBpcGUodGhyb3R0bGVUaW1lKDEwMCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlY2FsY3VsYXRlKCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBhIGNvbXBvbmVudCdzXG4gICAqIHZpZXcgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmV4dGVybmFsU29ydGluZykge1xuICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XG4gICAgfVxuXG4gICAgLy8gdGhpcyBoYXMgdG8gYmUgZG9uZSB0byBwcmV2ZW50IHRoZSBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgLy8gdHJlZSBmcm9tIGZyZWFraW5nIG91dCBiZWNhdXNlIHdlIGFyZSByZWFkanVzdGluZ1xuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG5cbiAgICAgIC8vIGVtaXQgcGFnZSBmb3IgdmlydHVhbCBzZXJ2ZXItc2lkZSBraWNrb2ZmXG4gICAgICBpZiAodGhpcy5leHRlcm5hbFBhZ2luZyAmJiB0aGlzLnNjcm9sbGJhclYpIHtcbiAgICAgICAgdGhpcy5wYWdlLmVtaXQoe1xuICAgICAgICAgIGNvdW50OiB0aGlzLmNvdW50LFxuICAgICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgICAgIG9mZnNldDogMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBhIGNvbXBvbmVudCdzXG4gICAqIGNvbnRlbnQgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5jb2x1bW5UZW1wbGF0ZXMuY2hhbmdlcy5zdWJzY3JpYmUodiA9PiB0aGlzLnRyYW5zbGF0ZUNvbHVtbnModikpO1xuICAgIHRoaXMubGlzdGVuRm9yQ29sdW1uSW5wdXRDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyB3aWxsIGJlIHVzZWQgd2hlbiBkaXNwbGF5aW5nIG9yIHNlbGVjdGluZyByb3dzLlxuICAgKiB3aGVuIHRyYWNraW5nL2NvbXBhcmluZyB0aGVtLCB3ZSdsbCB1c2UgdGhlIHZhbHVlIG9mIHRoaXMgZm4sXG4gICAqXG4gICAqIChgZm4oeCkgPT09IGZuKHkpYCBpbnN0ZWFkIG9mIGB4ID09PSB5YClcbiAgICovXG4gIEBJbnB1dCgpIHJvd0lkZW50aXR5OiAoeDogYW55KSA9PiBhbnkgPSAoeDogYW55KSA9PiB7XG4gICAgaWYgKHRoaXMuX2dyb3VwUm93c0J5KSB7XG4gICAgICAvLyBlYWNoIGdyb3VwIGluIGdyb3VwZWRSb3dzIGFyZSBzdG9yZWQgYXMge2tleSwgdmFsdWU6IFtyb3dzXX0sXG4gICAgICAvLyB3aGVyZSBrZXkgaXMgdGhlIGdyb3VwUm93c0J5IGluZGV4XG4gICAgICByZXR1cm4geC5rZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVHJhbnNsYXRlcyB0aGUgdGVtcGxhdGVzIHRvIHRoZSBjb2x1bW4gb2JqZWN0c1xuICAgKi9cbiAgdHJhbnNsYXRlQ29sdW1ucyh2YWw6IGFueSkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIGNvbnN0IGFyciA9IHZhbC50b0FycmF5KCk7XG4gICAgICBpZiAoYXJyLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSB0cmFuc2xhdGVUZW1wbGF0ZXMoYXJyKTtcbiAgICAgICAgc2V0Q29sdW1uRGVmYXVsdHModGhpcy5faW50ZXJuYWxDb2x1bW5zKTtcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBtYXAgd2l0aCB0aGUgZGF0YSBncm91cGVkIGJ5IHRoZSB1c2VyIGNob2ljZSBvZiBncm91cGluZyBpbmRleFxuICAgKlxuICAgKiBAcGFyYW0gb3JpZ2luYWxBcnJheSB0aGUgb3JpZ2luYWwgYXJyYXkgcGFzc2VkIHZpYSBwYXJhbWV0ZXJcbiAgICogQHBhcmFtIGdyb3VwQnlJbmRleCAgdGhlIGluZGV4IG9mIHRoZSBjb2x1bW4gdG8gZ3JvdXAgdGhlIGRhdGEgYnlcbiAgICovXG4gIGdyb3VwQXJyYXlCeShvcmlnaW5hbEFycmF5OiBhbnksIGdyb3VwQnk6IGFueSkge1xuICAgIC8vIGNyZWF0ZSBhIG1hcCB0byBob2xkIGdyb3VwcyB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmcgcmVzdWx0c1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgaTogbnVtYmVyID0gMDtcblxuICAgIG9yaWdpbmFsQXJyYXkuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBpdGVtW2dyb3VwQnldO1xuICAgICAgaWYgKCFtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgbWFwLnNldChrZXksIFtpdGVtXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXAuZ2V0KGtleSkucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9KTtcblxuICAgIGNvbnN0IGFkZEdyb3VwID0gKGtleTogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgICByZXR1cm4geyBrZXksIHZhbHVlIH07XG4gICAgfTtcblxuICAgIC8vIGNvbnZlcnQgbWFwIGJhY2sgdG8gYSBzaW1wbGUgYXJyYXkgb2Ygb2JqZWN0c1xuICAgIHJldHVybiBBcnJheS5mcm9tKG1hcCwgeCA9PiBhZGRHcm91cCh4WzBdLCB4WzFdKSk7XG4gIH1cblxuICAvKlxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIEFuZ3VsYXIgZGlydHkgY2hlY2tzIGEgZGlyZWN0aXZlLlxuICAgKi9cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJvd0RpZmZlci5kaWZmKHRoaXMucm93cykpIHtcbiAgICAgIGlmICghdGhpcy5leHRlcm5hbFNvcnRpbmcpIHtcbiAgICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBbLi4udGhpcy5yb3dzXTtcbiAgICAgIH1cblxuICAgICAgLy8gYXV0byBncm91cCBieSBwYXJlbnQgb24gbmV3IHVwZGF0ZVxuICAgICAgdGhpcy5faW50ZXJuYWxSb3dzID0gZ3JvdXBSb3dzQnlQYXJlbnRzKFxuICAgICAgICB0aGlzLl9pbnRlcm5hbFJvd3MsXG4gICAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVGcm9tUmVsYXRpb24pLFxuICAgICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlVG9SZWxhdGlvbilcbiAgICAgICk7XG5cbiAgICAgIHRoaXMucmVjYWxjdWxhdGVQYWdlcygpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVjYWxjJ3MgdGhlIHNpemVzIG9mIHRoZSBncmlkLlxuICAgKlxuICAgKiBVcGRhdGVkIGF1dG9tYXRpY2FsbHkgb24gY2hhbmdlcyB0bzpcbiAgICpcbiAgICogIC0gQ29sdW1uc1xuICAgKiAgLSBSb3dzXG4gICAqICAtIFBhZ2luZyByZWxhdGVkXG4gICAqXG4gICAqIEFsc28gY2FuIGJlIG1hbnVhbGx5IGludm9rZWQgb3IgdXBvbiB3aW5kb3cgcmVzaXplLlxuICAgKi9cbiAgcmVjYWxjdWxhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5yZWNhbGN1bGF0ZURpbXMoKTtcbiAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucygpO1xuICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVjYWx1bGNhdGVzIHRoZSBjb2x1bW4gd2lkdGhzIGJhc2VkIG9uIGNvbHVtbiB3aWR0aFxuICAgKiBkaXN0cmlidXRpb24gbW9kZSBhbmQgc2Nyb2xsYmFyIG9mZnNldHMuXG4gICAqL1xuICByZWNhbGN1bGF0ZUNvbHVtbnMoXG4gICAgY29sdW1uczogYW55W10gPSB0aGlzLl9pbnRlcm5hbENvbHVtbnMsXG4gICAgZm9yY2VJZHg6IG51bWJlciA9IC0xLFxuICAgIGFsbG93QmxlZWQ6IGJvb2xlYW4gPSB0aGlzLnNjcm9sbGJhckhcbiAgKTogYW55W10gfCB1bmRlZmluZWQge1xuICAgIGlmICghY29sdW1ucykgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIGxldCB3aWR0aCA9IHRoaXMuX2lubmVyV2lkdGg7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyVikge1xuICAgICAgd2lkdGggPSB3aWR0aCAtIHRoaXMuc2Nyb2xsYmFySGVscGVyLndpZHRoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbHVtbk1vZGUgPT09IENvbHVtbk1vZGUuZm9yY2UpIHtcbiAgICAgIGZvcmNlRmlsbENvbHVtbldpZHRocyhjb2x1bW5zLCB3aWR0aCwgZm9yY2VJZHgsIGFsbG93QmxlZWQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb2x1bW5Nb2RlID09PSBDb2x1bW5Nb2RlLmZsZXgpIHtcbiAgICAgIGFkanVzdENvbHVtbldpZHRocyhjb2x1bW5zLCB3aWR0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH1cblxuICAvKipcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBkaW1lbnNpb25zIG9mIHRoZSB0YWJsZSBzaXplLlxuICAgKiBJbnRlcm5hbGx5IGNhbGxzIHRoZSBwYWdlIHNpemUgYW5kIHJvdyBjb3VudCBjYWxjcyB0b28uXG4gICAqXG4gICAqL1xuICByZWNhbGN1bGF0ZURpbXMoKTogdm9pZCB7XG4gICAgY29uc3QgZGltcyA9IHRoaXMuZGltZW5zaW9uc0hlbHBlci5nZXREaW1lbnNpb25zKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IE1hdGguZmxvb3IoZGltcy53aWR0aCk7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gZGltcy5oZWlnaHQ7XG4gICAgICBpZiAodGhpcy5oZWFkZXJIZWlnaHQpIGhlaWdodCA9IGhlaWdodCAtIHRoaXMuaGVhZGVySGVpZ2h0O1xuICAgICAgaWYgKHRoaXMuZm9vdGVySGVpZ2h0KSBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmZvb3RlckhlaWdodDtcbiAgICAgIHRoaXMuYm9keUhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICB0aGlzLnJlY2FsY3VsYXRlUGFnZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZXMgdGhlIHBhZ2VzIGFmdGVyIGEgdXBkYXRlLlxuICAgKi9cbiAgcmVjYWxjdWxhdGVQYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VTaXplID0gdGhpcy5jYWxjUGFnZVNpemUoKTtcbiAgICB0aGlzLnJvd0NvdW50ID0gdGhpcy5jYWxjUm93Q291bnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCb2R5IHRyaWdnZXJlZCBhIHBhZ2UgZXZlbnQuXG4gICAqL1xuICBvbkJvZHlQYWdlKHsgb2Zmc2V0IH06IGFueSk6IHZvaWQge1xuICAgIC8vIEF2b2lkIHBhZ2luYXRpb24gY2FtaW5nIGZyb20gYm9keSBldmVudHMgbGlrZSBzY3JvbGwgd2hlbiB0aGUgdGFibGVcbiAgICAvLyBoYXMgbm8gdmlydHVhbGl6YXRpb24gYW5kIHRoZSBleHRlcm5hbCBwYWdpbmcgaXMgZW5hYmxlLlxuICAgIC8vIFRoaXMgbWVhbnMsIGxldCdzIHRoZSBkZXZlbG9wZXIgaGFuZGxlIHBhZ2luYXRpb24gYnkgbXkgaGltKGhlcikgc2VsZlxuICAgIGlmICh0aGlzLmV4dGVybmFsUGFnaW5nICYmICF0aGlzLnZpcnR1YWxpemF0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICB0aGlzLnBhZ2UuZW1pdCh7XG4gICAgICBjb3VudDogdGhpcy5jb3VudCxcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJvZHkgdHJpZ2dlcmVkIGEgc2Nyb2xsIGV2ZW50LlxuICAgKi9cbiAgb25Cb2R5U2Nyb2xsKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5fb2Zmc2V0WC5uZXh0KGV2ZW50Lm9mZnNldFgpO1xuICAgIHRoaXMuc2Nyb2xsLmVtaXQoZXZlbnQpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmb290ZXIgdHJpZ2dlcmVkIGEgcGFnZSBldmVudC5cbiAgICovXG4gIG9uRm9vdGVyUGFnZShldmVudDogYW55KSB7XG4gICAgdGhpcy5vZmZzZXQgPSBldmVudC5wYWdlIC0gMTtcbiAgICB0aGlzLmJvZHlDb21wb25lbnQudXBkYXRlT2Zmc2V0WSh0aGlzLm9mZnNldCk7XG5cbiAgICB0aGlzLnBhZ2UuZW1pdCh7XG4gICAgICBjb3VudDogdGhpcy5jb3VudCxcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5zZWxlY3RBbGxSb3dzT25QYWdlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZXMgdGhlIHNpemVzIG9mIHRoZSBwYWdlXG4gICAqL1xuICBjYWxjUGFnZVNpemUodmFsOiBhbnlbXSA9IHRoaXMucm93cyk6IG51bWJlciB7XG4gICAgLy8gS2VlcCB0aGUgcGFnZSBzaXplIGNvbnN0YW50IGV2ZW4gaWYgdGhlIHJvdyBoYXMgYmVlbiBleHBhbmRlZC5cbiAgICAvLyBUaGlzIGlzIGJlY2F1c2UgYW4gZXhwYW5kZWQgcm93IGlzIHN0aWxsIGNvbnNpZGVyZWQgdG8gYmUgYSBjaGlsZCBvZlxuICAgIC8vIHRoZSBvcmlnaW5hbCByb3cuICBIZW5jZSBjYWxjdWxhdGlvbiB3b3VsZCB1c2Ugcm93SGVpZ2h0IG9ubHkuXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViAmJiB0aGlzLnZpcnR1YWxpemF0aW9uKSB7XG4gICAgICBjb25zdCBzaXplID0gTWF0aC5jZWlsKHRoaXMuYm9keUhlaWdodCAvICh0aGlzLnJvd0hlaWdodCBhcyBudW1iZXIpKTtcbiAgICAgIHJldHVybiBNYXRoLm1heChzaXplLCAwKTtcbiAgICB9XG5cbiAgICAvLyBpZiBsaW1pdCBpcyBwYXNzZWQsIHdlIGFyZSBwYWdpbmdcbiAgICBpZiAodGhpcy5saW1pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5saW1pdDtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgdXNlIHJvdyBsZW5ndGhcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvLyBvdGhlciBlbXB0eSA6KFxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHJvdyBjb3VudC5cbiAgICovXG4gIGNhbGNSb3dDb3VudCh2YWw6IGFueVtdID0gdGhpcy5yb3dzKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuZXh0ZXJuYWxQYWdpbmcpIHtcbiAgICAgIGlmICghdmFsKSByZXR1cm4gMDtcblxuICAgICAgaWYgKHRoaXMuZ3JvdXBlZFJvd3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBlZFJvd3MubGVuZ3RoO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnRyZWVGcm9tUmVsYXRpb24gIT0gbnVsbCAmJiB0aGlzLnRyZWVUb1JlbGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsUm93cy5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaGVhZGVyIHRyaWdnZXJlZCBhIGNvbnRleHRtZW51IGV2ZW50LlxuICAgKi9cbiAgb25Db2x1bW5Db250ZXh0bWVudSh7IGV2ZW50LCBjb2x1bW4gfTogYW55KTogdm9pZCB7XG4gICAgdGhpcy50YWJsZUNvbnRleHRtZW51LmVtaXQoeyBldmVudCwgdHlwZTogQ29udGV4dG1lbnVUeXBlLmhlYWRlciwgY29udGVudDogY29sdW1uIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBib2R5IHRyaWdnZXJlZCBhIGNvbnRleHRtZW51IGV2ZW50LlxuICAgKi9cbiAgb25Sb3dDb250ZXh0bWVudSh7IGV2ZW50LCByb3cgfTogYW55KTogdm9pZCB7XG4gICAgdGhpcy50YWJsZUNvbnRleHRtZW51LmVtaXQoeyBldmVudCwgdHlwZTogQ29udGV4dG1lbnVUeXBlLmJvZHksIGNvbnRlbnQ6IHJvdyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaGVhZGVyIHRyaWdnZXJlZCBhIGNvbHVtbiByZXNpemUgZXZlbnQuXG4gICAqL1xuICBvbkNvbHVtblJlc2l6ZSh7IGNvbHVtbiwgbmV3VmFsdWUgfTogYW55KTogdm9pZCB7XG4gICAgLyogU2FmYXJpL2lPUyAxMC4yIHdvcmthcm91bmQgKi9cbiAgICBpZiAoY29sdW1uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaWR4OiBudW1iZXI7XG4gICAgY29uc3QgY29scyA9IHRoaXMuX2ludGVybmFsQ29sdW1ucy5tYXAoKGMsIGkpID0+IHtcbiAgICAgIGMgPSB7IC4uLmMgfTtcblxuICAgICAgaWYgKGMuJCRpZCA9PT0gY29sdW1uLiQkaWQpIHtcbiAgICAgICAgaWR4ID0gaTtcbiAgICAgICAgYy53aWR0aCA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIC8vIHNldCB0aGlzIHNvIHdlIGNhbiBmb3JjZSB0aGUgY29sdW1uXG4gICAgICAgIC8vIHdpZHRoIGRpc3RyaWJ1dGlvbiB0byBiZSB0byB0aGlzIHZhbHVlXG4gICAgICAgIGMuJCRvbGRXaWR0aCA9IG5ld1ZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYztcbiAgICB9KTtcblxuICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKGNvbHMsIGlkeCk7XG4gICAgdGhpcy5faW50ZXJuYWxDb2x1bW5zID0gY29scztcblxuICAgIHRoaXMucmVzaXplLmVtaXQoe1xuICAgICAgY29sdW1uLFxuICAgICAgbmV3VmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaGVhZGVyIHRyaWdnZXJlZCBhIGNvbHVtbiByZS1vcmRlciBldmVudC5cbiAgICovXG4gIG9uQ29sdW1uUmVvcmRlcih7IGNvbHVtbiwgbmV3VmFsdWUsIHByZXZWYWx1ZSB9OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjb2xzID0gdGhpcy5faW50ZXJuYWxDb2x1bW5zLm1hcChjID0+IHtcbiAgICAgIHJldHVybiB7IC4uLmMgfTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnN3YXBDb2x1bW5zKSB7XG4gICAgICBjb25zdCBwcmV2Q29sID0gY29sc1tuZXdWYWx1ZV07XG4gICAgICBjb2xzW25ld1ZhbHVlXSA9IGNvbHVtbjtcbiAgICAgIGNvbHNbcHJldlZhbHVlXSA9IHByZXZDb2w7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChuZXdWYWx1ZSA+IHByZXZWYWx1ZSkge1xuICAgICAgICBjb25zdCBtb3ZlZENvbCA9IGNvbHNbcHJldlZhbHVlXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHByZXZWYWx1ZTsgaSA8IG5ld1ZhbHVlOyBpKyspIHtcbiAgICAgICAgICBjb2xzW2ldID0gY29sc1tpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgY29sc1tuZXdWYWx1ZV0gPSBtb3ZlZENvbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1vdmVkQ29sID0gY29sc1twcmV2VmFsdWVdO1xuICAgICAgICBmb3IgKGxldCBpID0gcHJldlZhbHVlOyBpID4gbmV3VmFsdWU7IGktLSkge1xuICAgICAgICAgIGNvbHNbaV0gPSBjb2xzW2kgLSAxXTtcbiAgICAgICAgfVxuICAgICAgICBjb2xzW25ld1ZhbHVlXSA9IG1vdmVkQ29sO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IGNvbHM7XG5cbiAgICB0aGlzLnJlb3JkZXIuZW1pdCh7XG4gICAgICBjb2x1bW4sXG4gICAgICBuZXdWYWx1ZSxcbiAgICAgIHByZXZWYWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgb25Db2x1bW5GaWx0ZXIoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZmlsdGVyLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBoZWFkZXIgdHJpZ2dlcmVkIGEgY29sdW1uIHNvcnQgZXZlbnQuXG4gICAqL1xuICBvbkNvbHVtblNvcnQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIC8vIGNsZWFuIHNlbGVjdGVkIHJvd3NcbiAgICBpZiAodGhpcy5zZWxlY3RBbGxSb3dzT25QYWdlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc29ydHMgPSBldmVudC5zb3J0cztcblxuICAgIC8vIHRoaXMgY291bGQgYmUgb3B0aW1pemVkIGJldHRlciBzaW5jZSBpdCB3aWxsIHJlc29ydFxuICAgIC8vIHRoZSByb3dzIGFnYWluIG9uIHRoZSAncHVzaCcgZGV0ZWN0aW9uLi4uXG4gICAgaWYgKHRoaXMuZXh0ZXJuYWxTb3J0aW5nID09PSBmYWxzZSkge1xuICAgICAgLy8gZG9uJ3QgdXNlIG5vcm1hbCBzZXR0ZXIgc28gd2UgZG9uJ3QgcmVzb3J0XG4gICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcbiAgICB9XG5cbiAgICAvLyBhdXRvIGdyb3VwIGJ5IHBhcmVudCBvbiBuZXcgdXBkYXRlXG4gICAgdGhpcy5faW50ZXJuYWxSb3dzID0gZ3JvdXBSb3dzQnlQYXJlbnRzKFxuICAgICAgdGhpcy5faW50ZXJuYWxSb3dzLFxuICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZUZyb21SZWxhdGlvbiksXG4gICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlVG9SZWxhdGlvbilcbiAgICApO1xuXG4gICAgLy8gQWx3YXlzIGdvIHRvIGZpcnN0IHBhZ2Ugd2hlbiBzb3J0aW5nIHRvIHNlZSB0aGUgbmV3bHkgc29ydGVkIGRhdGFcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgdGhpcy5ib2R5Q29tcG9uZW50LnVwZGF0ZU9mZnNldFkodGhpcy5vZmZzZXQpO1xuICAgIHRoaXMuc29ydC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgYWxsIHJvdyBzZWxlY3Rpb25cbiAgICovXG4gIG9uSGVhZGVyU2VsZWN0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RBbGxSb3dzT25QYWdlKSB7XG4gICAgICAvLyBiZWZvcmUgd2Ugc3BsaWNlLCBjaGsgaWYgd2UgY3VycmVudGx5IGhhdmUgYWxsIHNlbGVjdGVkXG4gICAgICBjb25zdCBmaXJzdCA9IHRoaXMuYm9keUNvbXBvbmVudC5pbmRleGVzLmZpcnN0O1xuICAgICAgY29uc3QgbGFzdCA9IHRoaXMuYm9keUNvbXBvbmVudC5pbmRleGVzLmxhc3Q7XG4gICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSBsYXN0IC0gZmlyc3Q7XG5cbiAgICAgIC8vIHJlbW92ZSBhbGwgZXhpc3RpbmcgZWl0aGVyIHdheVxuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuXG4gICAgICAvLyBkbyB0aGUgb3Bwb3NpdGUgaGVyZVxuICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goLi4udGhpcy5faW50ZXJuYWxSb3dzLnNsaWNlKGZpcnN0LCBsYXN0KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGJlZm9yZSB3ZSBzcGxpY2UsIGNoayBpZiB3ZSBjdXJyZW50bHkgaGF2ZSBhbGwgc2VsZWN0ZWRcbiAgICAgIGNvbnN0IGFsbFNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZC5sZW5ndGggPT09IHRoaXMucm93cy5sZW5ndGg7XG4gICAgICAvLyByZW1vdmUgYWxsIGV4aXN0aW5nIGVpdGhlciB3YXlcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgIC8vIGRvIHRoZSBvcHBvc2l0ZSBoZXJlXG4gICAgICBpZiAoIWFsbFNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi50aGlzLnJvd3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xuICAgICAgc2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWRcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJvdyB3YXMgc2VsZWN0ZWQgZnJvbSBib2R5XG4gICAqL1xuICBvbkJvZHlTZWxlY3QoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcm93IHdhcyBleHBhbmRlZCBvciBjb2xsYXBzZWQgZm9yIHRyZWVcbiAgICovXG4gIG9uVHJlZUFjdGlvbihldmVudDogYW55KSB7XG4gICAgY29uc3Qgcm93ID0gZXZlbnQucm93O1xuICAgIC8vIFRPRE86IEZvciBkdXBsaWNhdGVkIGl0ZW1zIHRoaXMgd2lsbCBub3Qgd29ya1xuICAgIGNvbnN0IHJvd0luZGV4ID0gdGhpcy5fcm93cy5maW5kSW5kZXgociA9PiByW3RoaXMudHJlZVRvUmVsYXRpb25dID09PSBldmVudC5yb3dbdGhpcy50cmVlVG9SZWxhdGlvbl0pO1xuICAgIHRoaXMudHJlZUFjdGlvbi5lbWl0KHsgcm93LCByb3dJbmRleCB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xuICAgIGlmICh0aGlzLnJlc2l6ZVNlbnNvcikge1xuICAgICAgdGhpcy5yZXNpemVTZW5zb3IuZGV0YWNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGxpc3RlbiBmb3IgY2hhbmdlcyB0byBpbnB1dCBiaW5kaW5ncyBvZiBhbGwgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIGFuZFxuICAgKiB0cmlnZ2VyIHRoZSBjb2x1bW5UZW1wbGF0ZXMuY2hhbmdlcyBvYnNlcnZhYmxlIHRvIGVtaXRcbiAgICovXG4gIHByaXZhdGUgbGlzdGVuRm9yQ29sdW1uSW5wdXRDaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY29sdW1uQ2hhbmdlc1NlcnZpY2UuY29sdW1uSW5wdXRDaGFuZ2VzJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5UZW1wbGF0ZXMpIHtcbiAgICAgICAgICB0aGlzLmNvbHVtblRlbXBsYXRlcy5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzb3J0SW50ZXJuYWxSb3dzKCk6IHZvaWQge1xuICAgIHRoaXMuX2ludGVybmFsUm93cyA9IHNvcnRSb3dzKHRoaXMuX2ludGVybmFsUm93cywgdGhpcy5faW50ZXJuYWxDb2x1bW5zLCB0aGlzLnNvcnRzKTtcbiAgfVxufVxuIl19