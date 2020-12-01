/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DatatableComponent = /** @class */ (function () {
    function DatatableComponent(scrollbarHelper, dimensionsHelper, cd, element, differs, columnChangesService, configuration) {
        var _this = this;
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
        function (x) {
            if (_this._groupRowsBy) {
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
            this.messages = tslib_1.__assign({}, this.configuration.messages);
        }
    }
    Object.defineProperty(DatatableComponent.prototype, "rows", {
        /**
         * Gets the rows.
         */
        get: /**
         * Gets the rows.
         * @return {?}
         */
        function () {
            return this._rows;
        },
        /**
         * Rows that are displayed in the table.
         */
        set: /**
         * Rows that are displayed in the table.
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._rows = val;
            if (val) {
                this._internalRows = tslib_1.__spread(val);
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "groupRowsBy", {
        get: /**
         * @return {?}
         */
        function () {
            return this._groupRowsBy;
        },
        /**
         * This attribute allows the user to set the name of the column to group the data with
         */
        set: /**
         * This attribute allows the user to set the name of the column to group the data with
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val) {
                this._groupRowsBy = val;
                if (this._rows && this._groupRowsBy) {
                    // cretes a new array with the data grouped
                    this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columns", {
        /**
         * Get the columns.
         */
        get: /**
         * Get the columns.
         * @return {?}
         */
        function () {
            return this._columns;
        },
        /**
         * Columns to be displayed.
         */
        set: /**
         * Columns to be displayed.
         * @param {?} val
         * @return {?}
         */
        function (val) {
            val = tslib_1.__spread((this.expandable
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
                : []), val);
            if (val) {
                this._internalColumns = tslib_1.__spread(val);
                setColumnDefaults(this._internalColumns);
                this.recalculateColumns();
            }
            this._columns = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "limit", {
        /**
         * Gets the limit.
         */
        get: /**
         * Gets the limit.
         * @return {?}
         */
        function () {
            return this._limit;
        },
        /**
         * The page size to be shown.
         * Default value: `undefined`
         */
        set: /**
         * The page size to be shown.
         * Default value: `undefined`
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._limit = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "count", {
        /**
         * Gets the count.
         */
        get: /**
         * Gets the count.
         * @return {?}
         */
        function () {
            return this._count;
        },
        /**
         * The total count of all rows.
         * Default value: `0`
         */
        set: /**
         * The total count of all rows.
         * Default value: `0`
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._count = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "offset", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
        },
        /**
         * The current offset ( page - 1 ) shown.
         * Default value: `0`
         */
        set: /**
         * The current offset ( page - 1 ) shown.
         * Default value: `0`
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._offset = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedHeader", {
        /**
         * CSS class applied if the header height if fixed height.
         */
        get: /**
         * CSS class applied if the header height if fixed height.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var headerHeight = this.headerHeight;
            return typeof headerHeight === 'string' ? (/** @type {?} */ (headerHeight)) !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedRow", {
        /**
         * CSS class applied to the root element if
         * the row heights are fixed heights.
         */
        get: /**
         * CSS class applied to the root element if
         * the row heights are fixed heights.
         * @return {?}
         */
        function () {
            return this.rowHeight !== 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVertScroll", {
        /**
         * CSS class applied to root element if
         * vertical scrolling is enabled.
         */
        get: /**
         * CSS class applied to root element if
         * vertical scrolling is enabled.
         * @return {?}
         */
        function () {
            return this.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVirtualized", {
        /**
         * CSS class applied to root element if
         * virtualization is enabled.
         */
        get: /**
         * CSS class applied to root element if
         * virtualization is enabled.
         * @return {?}
         */
        function () {
            return this.virtualization;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isHorScroll", {
        /**
         * CSS class applied to the root element
         * if the horziontal scrolling is enabled.
         */
        get: /**
         * CSS class applied to the root element
         * if the horziontal scrolling is enabled.
         * @return {?}
         */
        function () {
            return this.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSelectable", {
        /**
         * CSS class applied to root element is selectable.
         */
        get: /**
         * CSS class applied to root element is selectable.
         * @return {?}
         */
        function () {
            return this.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCheckboxSelection", {
        /**
         * CSS class applied to root is checkbox selection.
         */
        get: /**
         * CSS class applied to root is checkbox selection.
         * @return {?}
         */
        function () {
            return this.selectionType === SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCellSelection", {
        /**
         * CSS class applied to root if cell selection.
         */
        get: /**
         * CSS class applied to root if cell selection.
         * @return {?}
         */
        function () {
            return this.selectionType === SelectionType.cell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSingleSelection", {
        /**
         * CSS class applied to root if single select.
         */
        get: /**
         * CSS class applied to root if single select.
         * @return {?}
         */
        function () {
            return this.selectionType === SelectionType.single;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiSelection", {
        /**
         * CSS class added to root element if mulit select
         */
        get: /**
         * CSS class added to root element if mulit select
         * @return {?}
         */
        function () {
            return this.selectionType === SelectionType.multi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiClickSelection", {
        /**
         * CSS class added to root element if mulit click select
         */
        get: /**
         * CSS class added to root element if mulit click select
         * @return {?}
         */
        function () {
            return this.selectionType === SelectionType.multiClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columnTemplates", {
        /**
         * Returns the column templates.
         */
        get: /**
         * Returns the column templates.
         * @return {?}
         */
        function () {
            return this._columnTemplates;
        },
        /**
         * Column templates gathered from `ContentChildren`
         * if described in your markup.
         */
        set: /**
         * Column templates gathered from `ContentChildren`
         * if described in your markup.
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._columnTemplates = val;
            this.translateColumns(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "allRowsSelected", {
        /**
         * Returns if all rows are selected.
         */
        get: /**
         * Returns if all rows are selected.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var allRowsSelected = this.rows && this.selected && this.selected.length === this.rows.length;
            if (this.selectAllRowsOnPage) {
                /** @type {?} */
                var indexes = this.bodyComponent.indexes;
                /** @type {?} */
                var rowsOnPage = indexes.last - indexes.first;
                allRowsSelected = this.selected.length === rowsOnPage;
            }
            return this.selected && this.rows && this.rows.length !== 0 && allRowsSelected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     */
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     * @return {?}
     */
    DatatableComponent.prototype.ngOnInit = /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     * @return {?}
     */
    function () {
        var _this = this;
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
        if (ResizeSensor) {
            this.resizeSensor = new ResizeSensor(this.element, (/**
             * @return {?}
             */
            function () { return _this.recalculate$.next(); }));
        }
        this._subscriptions.push(this.recalculate$
            .pipe(throttleTime(250, asyncScheduler, { leading: true, trailing: true }), delay(100))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.recalculate(); })));
    };
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     */
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     * @return {?}
     */
    DatatableComponent.prototype.ngAfterViewInit = /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     * @return {?}
     */
    function () {
        var _this = this;
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
        function () {
            _this.recalculate();
            // emit page for virtual server-side kickoff
            if (_this.externalPaging && _this.scrollbarV) {
                _this.page.emit({
                    count: _this.count,
                    pageSize: _this.pageSize,
                    limit: _this.limit,
                    offset: 0
                });
            }
        }));
    };
    /**
     * Lifecycle hook that is called after a component's
     * content has been fully initialized.
     */
    /**
     * Lifecycle hook that is called after a component's
     * content has been fully initialized.
     * @return {?}
     */
    DatatableComponent.prototype.ngAfterContentInit = /**
     * Lifecycle hook that is called after a component's
     * content has been fully initialized.
     * @return {?}
     */
    function () {
        var _this = this;
        this.columnTemplates.changes.subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return _this.translateColumns(v); }));
        this.listenForColumnInputChanges();
    };
    /**
     * Translates the templates to the column objects
     */
    /**
     * Translates the templates to the column objects
     * @param {?} val
     * @return {?}
     */
    DatatableComponent.prototype.translateColumns = /**
     * Translates the templates to the column objects
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (val) {
            /** @type {?} */
            var arr = val.toArray();
            if (arr.length) {
                this._internalColumns = translateTemplates(arr);
                setColumnDefaults(this._internalColumns);
                this.recalculateColumns();
                this.sortInternalRows();
                this.cd.markForCheck();
            }
        }
    };
    /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param originalArray the original array passed via parameter
     * @param groupByIndex  the index of the column to group the data by
     */
    /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param {?} originalArray the original array passed via parameter
     * @param {?} groupBy
     * @return {?}
     */
    DatatableComponent.prototype.groupArrayBy = /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param {?} originalArray the original array passed via parameter
     * @param {?} groupBy
     * @return {?}
     */
    function (originalArray, groupBy) {
        // create a map to hold groups with their corresponding results
        /** @type {?} */
        var map = new Map();
        /** @type {?} */
        var i = 0;
        originalArray.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var key = item[groupBy];
            if (!map.has(key)) {
                map.set(key, [item]);
            }
            else {
                map.get(key).push(item);
            }
            i++;
        }));
        /** @type {?} */
        var addGroup = (/**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        function (key, value) {
            return { key: key, value: value };
        });
        // convert map back to a simple array of objects
        return Array.from(map, (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return addGroup(x[0], x[1]); }));
    };
    /*
     * Lifecycle hook that is called when Angular dirty checks a directive.
     */
    /*
       * Lifecycle hook that is called when Angular dirty checks a directive.
       */
    /**
     * @return {?}
     */
    DatatableComponent.prototype.ngDoCheck = /*
       * Lifecycle hook that is called when Angular dirty checks a directive.
       */
    /**
     * @return {?}
     */
    function () {
        if (this.rowDiffer.diff(this.rows)) {
            if (!this.externalSorting) {
                this.sortInternalRows();
            }
            else {
                this._internalRows = tslib_1.__spread(this.rows);
            }
            // auto group by parent on new update
            this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
            this.recalculatePages();
            this.cd.markForCheck();
        }
    };
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
     */
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
    DatatableComponent.prototype.recalculate = /**
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
    function () {
        var _this = this;
        this.recalculateDims();
        this.recalculateColumns();
        requestAnimationFrame((/**
         * @return {?}
         */
        function () {
            if (!((/** @type {?} */ (_this.cd))).destroyed) {
                _this.cd.detectChanges();
            }
        }));
    };
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     */
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     * @param {?=} columns
     * @param {?=} forceIdx
     * @param {?=} allowBleed
     * @return {?}
     */
    DatatableComponent.prototype.recalculateColumns = /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     * @param {?=} columns
     * @param {?=} forceIdx
     * @param {?=} allowBleed
     * @return {?}
     */
    function (columns, forceIdx, allowBleed) {
        if (columns === void 0) { columns = this._internalColumns; }
        if (forceIdx === void 0) { forceIdx = -1; }
        if (allowBleed === void 0) { allowBleed = this.scrollbarH; }
        if (!columns)
            return undefined;
        /** @type {?} */
        var width = this._innerWidth;
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
    };
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     */
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     * @return {?}
     */
    DatatableComponent.prototype.recalculateDims = /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var dims = this.dimensionsHelper.getDimensions(this.element);
        this._innerWidth = Math.floor(dims.width);
        if (this.scrollbarV) {
            /** @type {?} */
            var height = dims.height;
            if (this.headerHeight)
                height = height - this.headerHeight;
            if (this.footerHeight)
                height = height - this.footerHeight;
            this.bodyHeight = height;
        }
        this.recalculatePages();
    };
    /**
     * Recalculates the pages after a update.
     */
    /**
     * Recalculates the pages after a update.
     * @return {?}
     */
    DatatableComponent.prototype.recalculatePages = /**
     * Recalculates the pages after a update.
     * @return {?}
     */
    function () {
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    };
    /**
     * Body triggered a page event.
     */
    /**
     * Body triggered a page event.
     * @param {?} __0
     * @return {?}
     */
    DatatableComponent.prototype.onBodyPage = /**
     * Body triggered a page event.
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var offset = _a.offset;
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
    };
    /**
     * The body triggered a scroll event.
     */
    /**
     * The body triggered a scroll event.
     * @param {?} event
     * @return {?}
     */
    DatatableComponent.prototype.onBodyScroll = /**
     * The body triggered a scroll event.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._offsetX.next(event.offsetX);
        this.scroll.emit(event);
        this.cd.detectChanges();
    };
    /**
     * The footer triggered a page event.
     */
    /**
     * The footer triggered a page event.
     * @param {?} event
     * @return {?}
     */
    DatatableComponent.prototype.onFooterPage = /**
     * The footer triggered a page event.
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * Recalculates the sizes of the page
     */
    /**
     * Recalculates the sizes of the page
     * @param {?=} val
     * @return {?}
     */
    DatatableComponent.prototype.calcPageSize = /**
     * Recalculates the sizes of the page
     * @param {?=} val
     * @return {?}
     */
    function (val) {
        if (val === void 0) { val = this.rows; }
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            var size = Math.ceil(this.bodyHeight / ((/** @type {?} */ (this.rowHeight))));
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
    };
    /**
     * Calculates the row count.
     */
    /**
     * Calculates the row count.
     * @param {?=} val
     * @return {?}
     */
    DatatableComponent.prototype.calcRowCount = /**
     * Calculates the row count.
     * @param {?=} val
     * @return {?}
     */
    function (val) {
        if (val === void 0) { val = this.rows; }
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
    };
    /**
     * The header triggered a contextmenu event.
     */
    /**
     * The header triggered a contextmenu event.
     * @param {?} __0
     * @return {?}
     */
    DatatableComponent.prototype.onColumnContextmenu = /**
     * The header triggered a contextmenu event.
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var event = _a.event, column = _a.column;
        this.tableContextmenu.emit({ event: event, type: ContextmenuType.header, content: column });
    };
    /**
     * The body triggered a contextmenu event.
     */
    /**
     * The body triggered a contextmenu event.
     * @param {?} __0
     * @return {?}
     */
    DatatableComponent.prototype.onRowContextmenu = /**
     * The body triggered a contextmenu event.
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var event = _a.event, row = _a.row;
        this.tableContextmenu.emit({ event: event, type: ContextmenuType.body, content: row });
    };
    /**
     * The header triggered a column resize event.
     */
    /**
     * The header triggered a column resize event.
     * @param {?} __0
     * @return {?}
     */
    DatatableComponent.prototype.onColumnResize = /**
     * The header triggered a column resize event.
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var column = _a.column, newValue = _a.newValue;
        /* Safari/iOS 10.2 workaround */
        if (column === undefined) {
            return;
        }
        /** @type {?} */
        var idx;
        /** @type {?} */
        var cols = this._internalColumns.map((/**
         * @param {?} c
         * @param {?} i
         * @return {?}
         */
        function (c, i) {
            c = tslib_1.__assign({}, c);
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
            column: column,
            newValue: newValue
        });
    };
    /**
     * The header triggered a column re-order event.
     */
    /**
     * The header triggered a column re-order event.
     * @param {?} __0
     * @return {?}
     */
    DatatableComponent.prototype.onColumnReorder = /**
     * The header triggered a column re-order event.
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var column = _a.column, newValue = _a.newValue, prevValue = _a.prevValue;
        /** @type {?} */
        var cols = this._internalColumns.map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            return tslib_1.__assign({}, c);
        }));
        if (this.swapColumns) {
            /** @type {?} */
            var prevCol = cols[newValue];
            cols[newValue] = column;
            cols[prevValue] = prevCol;
        }
        else {
            if (newValue > prevValue) {
                /** @type {?} */
                var movedCol = cols[prevValue];
                for (var i = prevValue; i < newValue; i++) {
                    cols[i] = cols[i + 1];
                }
                cols[newValue] = movedCol;
            }
            else {
                /** @type {?} */
                var movedCol = cols[prevValue];
                for (var i = prevValue; i > newValue; i--) {
                    cols[i] = cols[i - 1];
                }
                cols[newValue] = movedCol;
            }
        }
        this._internalColumns = cols;
        this.reorder.emit({
            column: column,
            newValue: newValue,
            prevValue: prevValue
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DatatableComponent.prototype.onColumnFilter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.filter.emit(event);
    };
    /**
     * The header triggered a column sort event.
     */
    /**
     * The header triggered a column sort event.
     * @param {?} event
     * @return {?}
     */
    DatatableComponent.prototype.onColumnSort = /**
     * The header triggered a column sort event.
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * Toggle all row selection
     */
    /**
     * Toggle all row selection
     * @param {?} event
     * @return {?}
     */
    DatatableComponent.prototype.onHeaderSelect = /**
     * Toggle all row selection
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _a, _b;
        if (this.selectAllRowsOnPage) {
            // before we splice, chk if we currently have all selected
            /** @type {?} */
            var first = this.bodyComponent.indexes.first;
            /** @type {?} */
            var last = this.bodyComponent.indexes.last;
            /** @type {?} */
            var allSelected = this.selected.length === last - first;
            // remove all existing either way
            this.selected = [];
            // do the opposite here
            if (!allSelected) {
                (_a = this.selected).push.apply(_a, tslib_1.__spread(this._internalRows.slice(first, last)));
            }
        }
        else {
            // before we splice, chk if we currently have all selected
            /** @type {?} */
            var allSelected = this.selected.length === this.rows.length;
            // remove all existing either way
            this.selected = [];
            // do the opposite here
            if (!allSelected) {
                (_b = this.selected).push.apply(_b, tslib_1.__spread(this.rows));
            }
        }
        this.select.emit({
            selected: this.selected
        });
    };
    /**
     * A row was selected from body
     */
    /**
     * A row was selected from body
     * @param {?} event
     * @return {?}
     */
    DatatableComponent.prototype.onBodySelect = /**
     * A row was selected from body
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.select.emit(event);
    };
    /**
     * A row was expanded or collapsed for tree
     */
    /**
     * A row was expanded or collapsed for tree
     * @param {?} event
     * @return {?}
     */
    DatatableComponent.prototype.onTreeAction = /**
     * A row was expanded or collapsed for tree
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var row = event.row;
        // TODO: For duplicated items this will not work
        /** @type {?} */
        var rowIndex = this._rows.findIndex((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return r[_this.treeToRelation] === event.row[_this.treeToRelation]; }));
        this.treeAction.emit({ row: row, rowIndex: rowIndex });
    };
    /**
     * @return {?}
     */
    DatatableComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscriptions.forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        function (subscription) { return subscription.unsubscribe(); }));
        if (this.resizeSensor) {
            this.resizeSensor.detach();
        }
    };
    /**
     * listen for changes to input bindings of all DataTableColumnDirective and
     * trigger the columnTemplates.changes observable to emit
     */
    /**
     * listen for changes to input bindings of all DataTableColumnDirective and
     * trigger the columnTemplates.changes observable to emit
     * @private
     * @return {?}
     */
    DatatableComponent.prototype.listenForColumnInputChanges = /**
     * listen for changes to input bindings of all DataTableColumnDirective and
     * trigger the columnTemplates.changes observable to emit
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscriptions.push(this.columnChangesService.columnInputChanges$.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.columnTemplates) {
                _this.columnTemplates.notifyOnChanges();
            }
        })));
    };
    /**
     * @private
     * @return {?}
     */
    DatatableComponent.prototype.sortInternalRows = /**
     * @private
     * @return {?}
     */
    function () {
        this._internalRows = sortRows(this._internalRows, this._internalColumns, this.sorts);
    };
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
    DatatableComponent.ctorParameters = function () { return [
        { type: ScrollbarHelper, decorators: [{ type: SkipSelf }] },
        { type: DimensionsHelper, decorators: [{ type: SkipSelf }] },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: KeyValueDiffers },
        { type: ColumnChangesService },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['configuration',] }] }
    ]; };
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
    return DatatableComponent;
}());
export { DatatableComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFFVCxlQUFlLEVBRWYsU0FBUyxFQUVULFdBQVcsRUFDWCxZQUFZLEVBRVosZUFBZSxFQUVmLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFFBQVEsRUFFUixRQUFRLEVBQ1IsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRW5GLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFOUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIs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O0lBQ3RELGdDQUE2Qjs7Ozs7SUFHN0Isa0RBQWtEOzs7OztJQUNsRCwyQ0FBK0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgT25Jbml0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBEb0NoZWNrLFxyXG4gIEtleVZhbHVlRGlmZmVycyxcclxuICBLZXlWYWx1ZURpZmZlcixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBTa2lwU2VsZixcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgSW5qZWN0LFxyXG4gIFZpZXdSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLmRpcmVjdGl2ZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgU3ViamVjdCwgYXN5bmNTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSU5neERhdGF0YWJsZUNvbmZpZyB9IGZyb20gJy4uL25neC1kYXRhdGFibGUubW9kdWxlJztcclxuaW1wb3J0IHsgZ3JvdXBSb3dzQnlQYXJlbnRzLCBvcHRpb25hbEdldHRlckZvclByb3AgfSBmcm9tICcuLi91dGlscy90cmVlJztcclxuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XHJcbmltcG9ydCB7IHNldENvbHVtbkRlZmF1bHRzLCB0cmFuc2xhdGVUZW1wbGF0ZXMgfSBmcm9tICcuLi91dGlscy9jb2x1bW4taGVscGVyJztcclxuaW1wb3J0IHsgQ29sdW1uTW9kZSB9IGZyb20gJy4uL3R5cGVzL2NvbHVtbi1tb2RlLnR5cGUnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vdHlwZXMvc2VsZWN0aW9uLnR5cGUnO1xyXG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uL3R5cGVzL3NvcnQudHlwZSc7XHJcbmltcG9ydCB7IENvbnRleHRtZW51VHlwZSB9IGZyb20gJy4uL3R5cGVzL2NvbnRleHRtZW51LnR5cGUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSB9IGZyb20gJy4vcm93LWRldGFpbC9yb3ctZGV0YWlsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSB9IGZyb20gJy4vZm9vdGVyL2Zvb3Rlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9ib2R5L2JvZHkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNjcm9sbGJhckhlbHBlciB9IGZyb20gJy4uL3NlcnZpY2VzL3Njcm9sbGJhci1oZWxwZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbHVtbkNoYW5nZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY29sdW1uLWNoYW5nZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IERpbWVuc2lvbnNIZWxwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9kaW1lbnNpb25zLWhlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGhyb3R0bGVhYmxlIH0gZnJvbSAnLi4vdXRpbHMvdGhyb3R0bGUnO1xyXG5pbXBvcnQgeyBmb3JjZUZpbGxDb2x1bW5XaWR0aHMsIGFkanVzdENvbHVtbldpZHRocyB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xyXG5pbXBvcnQgeyBzb3J0Um93cyB9IGZyb20gJy4uL3V0aWxzL3NvcnQnO1xyXG5pbXBvcnQgeyBSZXNpemVTZW5zb3IgfSBmcm9tICdjc3MtZWxlbWVudC1xdWVyaWVzJztcclxuaW1wb3J0IHsgdGhyb3R0bGVUaW1lLCBkZWJvdW5jZVRpbWUsIGRlbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtZGF0YXRhYmxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGF0YXRhYmxlLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHN0eWxlVXJsczogWycuL2RhdGF0YWJsZS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbmd4LWRhdGF0YWJsZSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhdGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQge1xyXG4gIC8qKlxyXG4gICAqIFRlbXBsYXRlIGZvciB0aGUgdGFyZ2V0IG1hcmtlciBvZiBkcmFnIHRhcmdldCBjb2x1bW5zLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRhcmdldE1hcmtlclRlbXBsYXRlOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvd3MgdGhhdCBhcmUgZGlzcGxheWVkIGluIHRoZSB0YWJsZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgcm93cyh2YWw6IGFueSkge1xyXG4gICAgdGhpcy5fcm93cyA9IHZhbDtcclxuXHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyA9IFsuLi52YWxdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF1dG8gc29ydCBvbiBuZXcgdXBkYXRlc1xyXG4gICAgaWYgKCF0aGlzLmV4dGVybmFsU29ydGluZykge1xyXG4gICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhdXRvIGdyb3VwIGJ5IHBhcmVudCBvbiBuZXcgdXBkYXRlXHJcbiAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBncm91cFJvd3NCeVBhcmVudHMoXHJcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyxcclxuICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZUZyb21SZWxhdGlvbiksXHJcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVUb1JlbGF0aW9uKVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyByZWNhbGN1bGF0ZSBzaXplcy9ldGNcclxuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5fcm93cyAmJiB0aGlzLl9ncm91cFJvd3NCeSkge1xyXG4gICAgICAvLyBJZiBhIGNvbHVtbiBoYXMgYmVlbiBzcGVjaWZpZWQgaW4gX2dyb3VwUm93c0J5IGNyZWF0ZWQgYSBuZXcgYXJyYXkgd2l0aCB0aGUgZGF0YSBncm91cGVkIGJ5IHRoYXQgcm93XHJcbiAgICAgIHRoaXMuZ3JvdXBlZFJvd3MgPSB0aGlzLmdyb3VwQXJyYXlCeSh0aGlzLl9yb3dzLCB0aGlzLl9ncm91cFJvd3NCeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHJvd3MuXHJcbiAgICovXHJcbiAgZ2V0IHJvd3MoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9yb3dzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBhdHRyaWJ1dGUgYWxsb3dzIHRoZSB1c2VyIHRvIHNldCB0aGUgbmFtZSBvZiB0aGUgY29sdW1uIHRvIGdyb3VwIHRoZSBkYXRhIHdpdGhcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgZ3JvdXBSb3dzQnkodmFsOiBzdHJpbmcpIHtcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgdGhpcy5fZ3JvdXBSb3dzQnkgPSB2YWw7XHJcbiAgICAgIGlmICh0aGlzLl9yb3dzICYmIHRoaXMuX2dyb3VwUm93c0J5KSB7XHJcbiAgICAgICAgLy8gY3JldGVzIGEgbmV3IGFycmF5IHdpdGggdGhlIGRhdGEgZ3JvdXBlZFxyXG4gICAgICAgIHRoaXMuZ3JvdXBlZFJvd3MgPSB0aGlzLmdyb3VwQXJyYXlCeSh0aGlzLl9yb3dzLCB0aGlzLl9ncm91cFJvd3NCeSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBncm91cFJvd3NCeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9ncm91cFJvd3NCeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgYXR0cmlidXRlIGFsbG93cyB0aGUgdXNlciB0byBzZXQgYSBncm91cGVkIGFycmF5IGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxyXG4gICAqICBbXHJcbiAgICogICAge2dyb3VwaWQ9MX0gW1xyXG4gICAqICAgICAge2lkPTEgbmFtZT1cInRlc3QxXCJ9LFxyXG4gICAqICAgICAge2lkPTIgbmFtZT1cInRlc3QyXCJ9LFxyXG4gICAqICAgICAge2lkPTMgbmFtZT1cInRlc3QzXCJ9XHJcbiAgICogICAgXX0sXHJcbiAgICogICAge2dyb3VwaWQ9Mj5bXHJcbiAgICogICAgICB7aWQ9NCBuYW1lPVwidGVzdDRcIn0sXHJcbiAgICogICAgICB7aWQ9NSBuYW1lPVwidGVzdDVcIn0sXHJcbiAgICogICAgICB7aWQ9NiBuYW1lPVwidGVzdDZcIn1cclxuICAgKiAgICBdfVxyXG4gICAqICBdXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ3JvdXBlZFJvd3M6IGFueVtdO1xyXG5cclxuICBASW5wdXQoKSBleHBhbmRhYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbHVtbnMgdG8gYmUgZGlzcGxheWVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCBjb2x1bW5zKHZhbDogVGFibGVDb2x1bW5bXSkge1xyXG4gICAgdmFsID0gW1xyXG4gICAgICAuLi4odGhpcy5leHBhbmRhYmxlXHJcbiAgICAgICAgPyBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgICAgcHJvcDogJ2ljZS1leHBhbmRhYmxlJyxcclxuICAgICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgICByZXNpemVhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICBjYW5BdXRvUmVzaXplOiBmYWxzZSxcclxuICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgOiBbXSksXHJcbiAgICAgIC4uLnZhbFxyXG4gICAgXTtcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgdGhpcy5faW50ZXJuYWxDb2x1bW5zID0gWy4uLnZhbF07XHJcbiAgICAgIHNldENvbHVtbkRlZmF1bHRzKHRoaXMuX2ludGVybmFsQ29sdW1ucyk7XHJcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY29sdW1ucy5cclxuICAgKi9cclxuICBnZXQgY29sdW1ucygpOiBUYWJsZUNvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdCBvZiByb3cgb2JqZWN0cyB0aGF0IHNob3VsZCBiZVxyXG4gICAqIHJlcHJlc2VudGVkIGFzIHNlbGVjdGVkIGluIHRoZSBncmlkLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGBbXWBcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWxlY3RlZDogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIHZlcnRpY2FsIHNjcm9sbGJhcnNcclxuICAgKi9cclxuICBASW5wdXQoKSBzY3JvbGxiYXJWOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBob3J6IHNjcm9sbGJhcnNcclxuICAgKi9cclxuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSByb3cgaGVpZ2h0OyB3aGljaCBpcyBuZWNlc3NhcnlcclxuICAgKiB0byBjYWxjdWxhdGUgdGhlIGhlaWdodCBmb3IgdGhlIGxhenkgcmVuZGVyaW5nLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvd0hlaWdodDogbnVtYmVyIHwgJ2F1dG8nIHwgKChyb3c/OiBhbnkpID0+IG51bWJlcikgPSAzMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZSBvZiBjb2x1bW4gd2lkdGggZGlzdHJpYnV0aW9uIGZvcm11bGEuXHJcbiAgICogRXhhbXBsZTogZmxleCwgZm9yY2UsIHN0YW5kYXJkXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29sdW1uTW9kZTogQ29sdW1uTW9kZSA9IENvbHVtbk1vZGUuc3RhbmRhcmQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtaW5pbXVtIGhlYWRlciBoZWlnaHQgaW4gcGl4ZWxzLlxyXG4gICAqIFBhc3MgYSBmYWxzZXkgZm9yIG5vIGhlYWRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGhlYWRlckhlaWdodDogYW55ID0gMzA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtaW5pbXVtIGZvb3RlciBoZWlnaHQgaW4gcGl4ZWxzLlxyXG4gICAqIFBhc3MgZmFsc2V5IGZvciBubyBmb290ZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBmb290ZXJIZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRoZSB0YWJsZSBzaG91bGQgdXNlIGV4dGVybmFsIHBhZ2luZ1xyXG4gICAqIG90aGVyd2lzZSBpdHMgYXNzdW1lZCB0aGF0IGFsbCBkYXRhIGlzIHByZWxvYWRlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBleHRlcm5hbFBhZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGUgdGFibGUgc2hvdWxkIHVzZSBleHRlcm5hbCBzb3J0aW5nIG9yXHJcbiAgICogdGhlIGJ1aWx0LWluIGJhc2ljIHNvcnRpbmcuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXh0ZXJuYWxTb3J0aW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwYWdlIHNpemUgdG8gYmUgc2hvd24uXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYHVuZGVmaW5lZGBcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgbGltaXQodmFsOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMuX2xpbWl0ID0gdmFsO1xyXG5cclxuICAgIC8vIHJlY2FsY3VsYXRlIHNpemVzL2V0Y1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbGltaXQuXHJcbiAgICovXHJcbiAgZ2V0IGxpbWl0KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGltaXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgdG90YWwgY291bnQgb2YgYWxsIHJvd3MuXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYDBgXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IGNvdW50KHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9jb3VudCA9IHZhbDtcclxuXHJcbiAgICAvLyByZWNhbGN1bGF0ZSBzaXplcy9ldGNcclxuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGNvdW50LlxyXG4gICAqL1xyXG4gIGdldCBjb3VudCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgb2Zmc2V0ICggcGFnZSAtIDEgKSBzaG93bi5cclxuICAgKiBEZWZhdWx0IHZhbHVlOiBgMGBcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgb2Zmc2V0KHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9vZmZzZXQgPSB2YWw7XHJcbiAgfVxyXG4gIGdldCBvZmZzZXQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih0aGlzLl9vZmZzZXQsIE1hdGguY2VpbCh0aGlzLnJvd0NvdW50IC8gdGhpcy5wYWdlU2l6ZSkgLSAxKSwgMCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IHRoZSBsaW5lYXIgbG9hZGluZyBiYXIuXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYGZhbHNlYFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxvYWRpbmdJbmRpY2F0b3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZSBvZiByb3cgc2VsZWN0aW9uLiBPcHRpb25zIGFyZTpcclxuICAgKlxyXG4gICAqICAtIGBzaW5nbGVgXHJcbiAgICogIC0gYG11bHRpYFxyXG4gICAqICAtIGBjaGVja2JveGBcclxuICAgKiAgLSBgbXVsdGlDbGlja2BcclxuICAgKiAgLSBgY2VsbGBcclxuICAgKlxyXG4gICAqIEZvciBubyBzZWxlY3Rpb24gcGFzcyBhIGBmYWxzZXlgLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGB1bmRlZmluZWRgXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlL0Rpc2FibGUgYWJpbGl0eSB0byByZS1vcmRlciBjb2x1bW5zXHJcbiAgICogYnkgZHJhZ2dpbmcgdGhlbS5cclxuICAgKi9cclxuICBASW5wdXQoKSByZW9yZGVyYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN3YXAgY29sdW1ucyBvbiByZS1vcmRlciBjb2x1bW5zIG9yXHJcbiAgICogbW92ZSB0aGVtLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN3YXBDb2x1bW5zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHR5cGUgb2Ygc29ydGluZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNvcnRUeXBlOiBTb3J0VHlwZSA9IFNvcnRUeXBlLnNpbmdsZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQXJyYXkgb2Ygc29ydGVkIGNvbHVtbnMgYnkgcHJvcGVydHkgYW5kIHR5cGUuXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYFtdYFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNvcnRzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBDc3MgY2xhc3Mgb3ZlcnJpZGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgY3NzQ2xhc3NlczogYW55ID0ge1xyXG4gICAgc29ydEFzY2VuZGluZzogJ2RhdGF0YWJsZS1pY29uLXVwJyxcclxuICAgIHNvcnREZXNjZW5kaW5nOiAnZGF0YXRhYmxlLWljb24tZG93bicsXHJcbiAgICBwYWdlckxlZnRBcnJvdzogJ2RhdGF0YWJsZS1pY29uLWxlZnQnLFxyXG4gICAgcGFnZXJSaWdodEFycm93OiAnZGF0YXRhYmxlLWljb24tcmlnaHQnLFxyXG4gICAgcGFnZXJQcmV2aW91czogJ2RhdGF0YWJsZS1pY29uLXByZXYnLFxyXG4gICAgcGFnZXJOZXh0OiAnZGF0YXRhYmxlLWljb24tc2tpcCdcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXNzYWdlIG92ZXJyaWRlcyBmb3IgbG9jYWxpemF0aW9uXHJcbiAgICpcclxuICAgKiBlbXB0eU1lc3NhZ2UgICAgIFtkZWZhdWx0XSA9ICdObyBkYXRhIHRvIGRpc3BsYXknXHJcbiAgICogdG90YWxNZXNzYWdlICAgICBbZGVmYXVsdF0gPSAndG90YWwnXHJcbiAgICogc2VsZWN0ZWRNZXNzYWdlICBbZGVmYXVsdF0gPSAnc2VsZWN0ZWQnXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVzc2FnZXM6IGFueSA9IHtcclxuICAgIC8vIE1lc3NhZ2UgdG8gc2hvdyB3aGVuIGFycmF5IGlzIHByZXNlbnRlZFxyXG4gICAgLy8gYnV0IGNvbnRhaW5zIG5vIHZhbHVlc1xyXG4gICAgZW1wdHlNZXNzYWdlOiAnTm8gZGF0YSB0byBkaXNwbGF5JyxcclxuXHJcbiAgICAvLyBGb290ZXIgdG90YWwgbWVzc2FnZVxyXG4gICAgdG90YWxNZXNzYWdlOiAndG90YWwnLFxyXG5cclxuICAgIC8vIEZvb3RlciBzZWxlY3RlZCBtZXNzYWdlXHJcbiAgICBzZWxlY3RlZE1lc3NhZ2U6ICdzZWxlY3RlZCdcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSb3cgc3BlY2lmaWMgY2xhc3Nlcy5cclxuICAgKiBTaW1pbGFyIGltcGxlbWVudGF0aW9uIHRvIG5nQ2xhc3MuXHJcbiAgICpcclxuICAgKiAgW3Jvd0NsYXNzXT1cIidmaXJzdCBzZWNvbmQnXCJcclxuICAgKiAgW3Jvd0NsYXNzXT1cInsgJ2ZpcnN0JzogdHJ1ZSwgJ3NlY29uZCc6IHRydWUsICd0aGlyZCc6IGZhbHNlIH1cIlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvd0NsYXNzOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgYm9vbGVhbi9mdW5jdGlvbiB5b3UgY2FuIHVzZSB0byBjaGVjayB3aGV0aGVyIHlvdSB3YW50XHJcbiAgICogdG8gc2VsZWN0IGEgcGFydGljdWxhciByb3cgYmFzZWQgb24gYSBjcml0ZXJpYS4gRXhhbXBsZTpcclxuICAgKlxyXG4gICAqICAgIChzZWxlY3Rpb24pID0+IHtcclxuICAgKiAgICAgIHJldHVybiBzZWxlY3Rpb24gIT09ICdFdGhlbCBQcmljZSc7XHJcbiAgICogICAgfVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlbGVjdENoZWNrOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZnVuY3Rpb24geW91IGNhbiB1c2UgdG8gY2hlY2sgd2hldGhlciB5b3Ugd2FudFxyXG4gICAqIHRvIHNob3cgdGhlIGNoZWNrYm94IGZvciBhIHBhcnRpY3VsYXIgcm93IGJhc2VkIG9uIGEgY3JpdGVyaWEuIEV4YW1wbGU6XHJcbiAgICpcclxuICAgKiAgICAocm93LCBjb2x1bW4sIHZhbHVlKSA9PiB7XHJcbiAgICogICAgICByZXR1cm4gcm93Lm5hbWUgIT09ICdFdGhlbCBQcmljZSc7XHJcbiAgICogICAgfVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlDaGVjazogKHJvdzogYW55LCBjb2x1bW4/OiBhbnksIHZhbHVlPzogYW55KSA9PiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGJvb2xlYW4geW91IGNhbiB1c2UgdG8gc2V0IHRoZSBkZXRhdWx0IGJlaGF2aW91ciBvZiByb3dzIGFuZCBncm91cHNcclxuICAgKiB3aGV0aGVyIHRoZXkgd2lsbCBzdGFydCBleHBhbmRlZCBvciBub3QuIElmIG9tbWl0ZWQgdGhlIGRlZmF1bHQgaXMgTk9UIGV4cGFuZGVkLlxyXG4gICAqXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ3JvdXBFeHBhbnNpb25EZWZhdWx0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb3BlcnR5IHRvIHdoaWNoIHlvdSBjYW4gdXNlIGZvciBjdXN0b20gdHJhY2tpbmcgb2Ygcm93cy5cclxuICAgKiBFeGFtcGxlOiAnbmFtZSdcclxuICAgKi9cclxuICBASW5wdXQoKSB0cmFja0J5UHJvcDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBQcm9wZXJ0eSB0byB3aGljaCB5b3UgY2FuIHVzZSBmb3IgZGV0ZXJtaW5pbmcgc2VsZWN0IGFsbFxyXG4gICAqIHJvd3Mgb24gY3VycmVudCBwYWdlIG9yIG5vdC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBEYXRhdGFibGVDb21wb25lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWxlY3RBbGxSb3dzT25QYWdlID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBmb3Igcm93IHZpcnR1YWxpemF0aW9uIG9uIC8gb2ZmXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlydHVhbGl6YXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUcmVlIGZyb20gcmVsYXRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSB0cmVlRnJvbVJlbGF0aW9uOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyZWUgdG8gcmVsYXRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSB0cmVlVG9SZWxhdGlvbjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgZm9yIHN3aXRjaGluZyBzdW1tYXJ5IHJvdyBvbiAvIG9mZlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN1bW1hcnlSb3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBoZWlnaHQgb2Ygc3VtbWFyeSByb3dcclxuICAgKi9cclxuICBASW5wdXQoKSBzdW1tYXJ5SGVpZ2h0OiBudW1iZXIgPSAzMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBwcm9wZXJ0eSBob2xkcyBhIHN1bW1hcnkgcm93IHBvc2l0aW9uOiB0b3AvYm90dG9tXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3VtbWFyeVBvc2l0aW9uOiBzdHJpbmcgPSAndG9wJztcclxuXHJcbiAgLyoqXHJcbiAgICogQm9keSB3YXMgc2Nyb2xsZWQgdHlwaWNhbGx5IGluIGEgYHNjcm9sbGJhclY6dHJ1ZWAgc2NlbmFyaW8uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNjcm9sbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY2VsbCBvciByb3cgd2FzIGZvY3VzZWQgdmlhIGtleWJvYXJkIG9yIG1vdXNlIGNsaWNrLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY2VsbCBvciByb3cgd2FzIHNlbGVjdGVkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBDb2x1bW4gc29ydCB3YXMgaW52b2tlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEljZSBjb2x1bW4gZmlsdGVyIHdhcyBpbnZva2VkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBmaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGFibGUgd2FzIHBhZ2VkIGVpdGhlciB0cmlnZ2VyZWQgYnkgdGhlIHBhZ2VyIG9yIHRoZSBib2R5IHNjcm9sbC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcGFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbHVtbnMgd2VyZSByZS1vcmRlcmVkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZW9yZGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29sdW1uIHdhcyByZXNpemVkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29udGV4dCBtZW51IHdhcyBpbnZva2VkIG9uIHRoZSB0YWJsZS5cclxuICAgKiB0eXBlIGluZGljYXRlcyB3aGV0aGVyIHRoZSBoZWFkZXIgb3IgdGhlIGJvZHkgd2FzIGNsaWNrZWQuXHJcbiAgICogY29udGVudCBjb250YWlucyBlaXRoZXIgdGhlIGNvbHVtbiBvciB0aGUgcm93IHRoYXQgd2FzIGNsaWNrZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHRhYmxlQ29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IE1vdXNlRXZlbnQ7IHR5cGU6IENvbnRleHRtZW51VHlwZTsgY29udGVudDogYW55IH0+KGZhbHNlKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByb3cgd2FzIGV4cGFuZGVkIG90IGNvbGxhcHNlZCBmb3IgdHJlZVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgaWYgdGhlIGhlYWRlciBoZWlnaHQgaWYgZml4ZWQgaGVpZ2h0LlxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZml4ZWQtaGVhZGVyJylcclxuICBnZXQgaXNGaXhlZEhlYWRlcigpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGhlYWRlckhlaWdodDogbnVtYmVyIHwgc3RyaW5nID0gdGhpcy5oZWFkZXJIZWlnaHQ7XHJcbiAgICByZXR1cm4gdHlwZW9mIGhlYWRlckhlaWdodCA9PT0gJ3N0cmluZycgPyA8c3RyaW5nPmhlYWRlckhlaWdodCAhPT0gJ2F1dG8nIDogdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWZcclxuICAgKiB0aGUgcm93IGhlaWdodHMgYXJlIGZpeGVkIGhlaWdodHMuXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5maXhlZC1yb3cnKVxyXG4gIGdldCBpc0ZpeGVkUm93KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucm93SGVpZ2h0ICE9PSAnYXV0byc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGVsZW1lbnQgaWZcclxuICAgKiB2ZXJ0aWNhbCBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNjcm9sbC12ZXJ0aWNhbCcpXHJcbiAgZ2V0IGlzVmVydFNjcm9sbCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNjcm9sbGJhclY7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGVsZW1lbnQgaWZcclxuICAgKiB2aXJ0dWFsaXphdGlvbiBpcyBlbmFibGVkLlxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MudmlydHVhbGl6ZWQnKVxyXG4gIGdldCBpc1ZpcnR1YWxpemVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmlydHVhbGl6YXRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50XHJcbiAgICogaWYgdGhlIGhvcnppb250YWwgc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zY3JvbGwtaG9yeicpXHJcbiAgZ2V0IGlzSG9yU2Nyb2xsKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsYmFySDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgZWxlbWVudCBpcyBzZWxlY3RhYmxlLlxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2VsZWN0YWJsZScpXHJcbiAgZ2V0IGlzU2VsZWN0YWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgaXMgY2hlY2tib3ggc2VsZWN0aW9uLlxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2hlY2tib3gtc2VsZWN0aW9uJylcclxuICBnZXQgaXNDaGVja2JveFNlbGVjdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2hlY2tib3g7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGlmIGNlbGwgc2VsZWN0aW9uLlxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2VsbC1zZWxlY3Rpb24nKVxyXG4gIGdldCBpc0NlbGxTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLmNlbGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGlmIHNpbmdsZSBzZWxlY3QuXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaW5nbGUtc2VsZWN0aW9uJylcclxuICBnZXQgaXNTaW5nbGVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLnNpbmdsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhZGRlZCB0byByb290IGVsZW1lbnQgaWYgbXVsaXQgc2VsZWN0XHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tdWx0aS1zZWxlY3Rpb24nKVxyXG4gIGdldCBpc011bHRpU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5tdWx0aTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhZGRlZCB0byByb290IGVsZW1lbnQgaWYgbXVsaXQgY2xpY2sgc2VsZWN0XHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tdWx0aS1jbGljay1zZWxlY3Rpb24nKVxyXG4gIGdldCBpc011bHRpQ2xpY2tTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLm11bHRpQ2xpY2s7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb2x1bW4gdGVtcGxhdGVzIGdhdGhlcmVkIGZyb20gYENvbnRlbnRDaGlsZHJlbmBcclxuICAgKiBpZiBkZXNjcmliZWQgaW4geW91ciBtYXJrdXAuXHJcbiAgICovXHJcbiAgQENvbnRlbnRDaGlsZHJlbihEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUpXHJcbiAgc2V0IGNvbHVtblRlbXBsYXRlcyh2YWw6IFF1ZXJ5TGlzdDxEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmU+KSB7XHJcbiAgICB0aGlzLl9jb2x1bW5UZW1wbGF0ZXMgPSB2YWw7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZUNvbHVtbnModmFsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMuXHJcbiAgICovXHJcbiAgZ2V0IGNvbHVtblRlbXBsYXRlcygpOiBRdWVyeUxpc3Q8RGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uVGVtcGxhdGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm93IERldGFpbCB0ZW1wbGF0ZXMgZ2F0aGVyZWQgZnJvbSB0aGUgQ29udGVudENoaWxkXHJcbiAgICovXHJcbiAgQENvbnRlbnRDaGlsZChEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gIHJvd0RldGFpbDogRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBHcm91cCBIZWFkZXIgdGVtcGxhdGVzIGdhdGhlcmVkIGZyb20gdGhlIENvbnRlbnRDaGlsZFxyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gIGdyb3VwSGVhZGVyOiBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9vdGVyIHRlbXBsYXRlIGdhdGhlcmVkIGZyb20gdGhlIENvbnRlbnRDaGlsZFxyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICBmb290ZXI6IERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBib2R5IGNvbXBvbmVudCBmb3IgbWFudWFsbHlcclxuICAgKiBpbnZva2luZyBmdW5jdGlvbnMgb24gdGhlIGJvZHkuXHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZChEYXRhVGFibGVCb2R5Q29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICBib2R5Q29tcG9uZW50OiBEYXRhVGFibGVCb2R5Q29tcG9uZW50O1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGhlYWRlciBjb21wb25lbnQgZm9yIG1hbnVhbGx5XHJcbiAgICogaW52b2tpbmcgZnVuY3Rpb25zIG9uIHRoZSBoZWFkZXIuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgRGF0YXRhYmxlQ29tcG9uZW50XHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZChEYXRhVGFibGVIZWFkZXJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gIGhlYWRlckNvbXBvbmVudDogRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50O1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIGFsbCByb3dzIGFyZSBzZWxlY3RlZC5cclxuICAgKi9cclxuICBnZXQgYWxsUm93c1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGFsbFJvd3NTZWxlY3RlZCA9IHRoaXMucm93cyAmJiB0aGlzLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSB0aGlzLnJvd3MubGVuZ3RoO1xyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdEFsbFJvd3NPblBhZ2UpIHtcclxuICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMuYm9keUNvbXBvbmVudC5pbmRleGVzO1xyXG4gICAgICBjb25zdCByb3dzT25QYWdlID0gaW5kZXhlcy5sYXN0IC0gaW5kZXhlcy5maXJzdDtcclxuICAgICAgYWxsUm93c1NlbGVjdGVkID0gdGhpcy5zZWxlY3RlZC5sZW5ndGggPT09IHJvd3NPblBhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5yb3dzICYmIHRoaXMucm93cy5sZW5ndGggIT09IDAgJiYgYWxsUm93c1NlbGVjdGVkO1xyXG4gIH1cclxuXHJcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgX2lubmVyV2lkdGg6IG51bWJlcjtcclxuICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gIGJvZHlIZWlnaHQ6IG51bWJlcjtcclxuICByb3dDb3VudDogbnVtYmVyID0gMDtcclxuICByb3dEaWZmZXI6IEtleVZhbHVlRGlmZmVyPHt9LCB7fT47XHJcblxyXG4gIF9vZmZzZXRYID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcclxuICBfbGltaXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuICBfY291bnQ6IG51bWJlciA9IDA7XHJcbiAgX29mZnNldDogbnVtYmVyID0gMDtcclxuICBfcm93czogYW55W107XHJcbiAgX2dyb3VwUm93c0J5OiBzdHJpbmc7XHJcbiAgX2ludGVybmFsUm93czogYW55W107XHJcbiAgX2ludGVybmFsQ29sdW1uczogVGFibGVDb2x1bW5bXTtcclxuICBfY29sdW1uczogVGFibGVDb2x1bW5bXTtcclxuICBfY29sdW1uVGVtcGxhdGVzOiBRdWVyeUxpc3Q8RGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlPjtcclxuICBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICByZXNpemVTZW5zb3I6IFJlc2l6ZVNlbnNvcjtcclxuICByZWNhbGN1bGF0ZSQgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTa2lwU2VsZigpIHByaXZhdGUgc2Nyb2xsYmFySGVscGVyOiBTY3JvbGxiYXJIZWxwZXIsXHJcbiAgICBAU2tpcFNlbGYoKSBwcml2YXRlIGRpbWVuc2lvbnNIZWxwZXI6IERpbWVuc2lvbnNIZWxwZXIsXHJcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgICBwcml2YXRlIGNvbHVtbkNoYW5nZXNTZXJ2aWNlOiBDb2x1bW5DaGFuZ2VzU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2NvbmZpZ3VyYXRpb24nKSBwcml2YXRlIGNvbmZpZ3VyYXRpb246IElOZ3hEYXRhdGFibGVDb25maWdcclxuICApIHtcclxuICAgIC8vIGdldCByZWYgdG8gZWxtIGZvciBtZWFzdXJpbmdcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMucm93RGlmZmVyID0gZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcclxuXHJcbiAgICAvLyBhcHBseSBnbG9iYWwgc2V0dGluZ3MgZnJvbSBNb2R1bGUuZm9yUm9vdFxyXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbiAmJiB0aGlzLmNvbmZpZ3VyYXRpb24ubWVzc2FnZXMpIHtcclxuICAgICAgdGhpcy5tZXNzYWdlcyA9IHsgLi4udGhpcy5jb25maWd1cmF0aW9uLm1lc3NhZ2VzIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBkYXRhLWJvdW5kXHJcbiAgICogcHJvcGVydGllcyBvZiBhIGRpcmVjdGl2ZSBhcmUgaW5pdGlhbGl6ZWQuXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyBuZWVkIHRvIGNhbGwgdGhpcyBpbW1lZGlhdGx5IHRvIHNpemVcclxuICAgIC8vIGlmIHRoZSB0YWJsZSBpcyBoaWRkZW4gdGhlIHZpc2liaWxpdHlcclxuICAgIC8vIGxpc3RlbmVyIHdpbGwgaW52b2tlIHRoaXMgaXRzZWxmIHVwb24gc2hvd1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xyXG4gICAgaWYgKFJlc2l6ZVNlbnNvcikge1xyXG4gICAgICB0aGlzLnJlc2l6ZVNlbnNvciA9IG5ldyBSZXNpemVTZW5zb3IodGhpcy5lbGVtZW50LCAoKSA9PiB0aGlzLnJlY2FsY3VsYXRlJC5uZXh0KCkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLnJlY2FsY3VsYXRlJFxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgdGhyb3R0bGVUaW1lKDI1MCwgYXN5bmNTY2hlZHVsZXIsIHsgbGVhZGluZzogdHJ1ZSwgdHJhaWxpbmc6IHRydWUgfSksXHJcbiAgICAgICAgICBkZWxheSgxMDApXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWNhbGN1bGF0ZSgpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGEgY29tcG9uZW50J3NcclxuICAgKiB2aWV3IGhhcyBiZWVuIGZ1bGx5IGluaXRpYWxpemVkLlxyXG4gICAqL1xyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5leHRlcm5hbFNvcnRpbmcpIHtcclxuICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcyBoYXMgdG8gYmUgZG9uZSB0byBwcmV2ZW50IHRoZSBjaGFuZ2UgZGV0ZWN0aW9uXHJcbiAgICAvLyB0cmVlIGZyb20gZnJlYWtpbmcgb3V0IGJlY2F1c2Ugd2UgYXJlIHJlYWRqdXN0aW5nXHJcbiAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcclxuXHJcbiAgICAgIC8vIGVtaXQgcGFnZSBmb3IgdmlydHVhbCBzZXJ2ZXItc2lkZSBraWNrb2ZmXHJcbiAgICAgIGlmICh0aGlzLmV4dGVybmFsUGFnaW5nICYmIHRoaXMuc2Nyb2xsYmFyVikge1xyXG4gICAgICAgIHRoaXMucGFnZS5lbWl0KHtcclxuICAgICAgICAgIGNvdW50OiB0aGlzLmNvdW50LFxyXG4gICAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXHJcbiAgICAgICAgICBsaW1pdDogdGhpcy5saW1pdCxcclxuICAgICAgICAgIG9mZnNldDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGEgY29tcG9uZW50J3NcclxuICAgKiBjb250ZW50IGhhcyBiZWVuIGZ1bGx5IGluaXRpYWxpemVkLlxyXG4gICAqL1xyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIHRoaXMuY29sdW1uVGVtcGxhdGVzLmNoYW5nZXMuc3Vic2NyaWJlKHYgPT4gdGhpcy50cmFuc2xhdGVDb2x1bW5zKHYpKTtcclxuICAgIHRoaXMubGlzdGVuRm9yQ29sdW1uSW5wdXRDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIHdpbGwgYmUgdXNlZCB3aGVuIGRpc3BsYXlpbmcgb3Igc2VsZWN0aW5nIHJvd3MuXHJcbiAgICogd2hlbiB0cmFja2luZy9jb21wYXJpbmcgdGhlbSwgd2UnbGwgdXNlIHRoZSB2YWx1ZSBvZiB0aGlzIGZuLFxyXG4gICAqXHJcbiAgICogKGBmbih4KSA9PT0gZm4oeSlgIGluc3RlYWQgb2YgYHggPT09IHlgKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvd0lkZW50aXR5OiAoeDogYW55KSA9PiBhbnkgPSAoeDogYW55KSA9PiB7XHJcbiAgICBpZiAodGhpcy5fZ3JvdXBSb3dzQnkpIHtcclxuICAgICAgLy8gZWFjaCBncm91cCBpbiBncm91cGVkUm93cyBhcmUgc3RvcmVkIGFzIHtrZXksIHZhbHVlOiBbcm93c119LFxyXG4gICAgICAvLyB3aGVyZSBrZXkgaXMgdGhlIGdyb3VwUm93c0J5IGluZGV4XHJcbiAgICAgIHJldHVybiB4LmtleTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZXMgdGhlIHRlbXBsYXRlcyB0byB0aGUgY29sdW1uIG9iamVjdHNcclxuICAgKi9cclxuICB0cmFuc2xhdGVDb2x1bW5zKHZhbDogYW55KSB7XHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIGNvbnN0IGFyciA9IHZhbC50b0FycmF5KCk7XHJcbiAgICAgIGlmIChhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5faW50ZXJuYWxDb2x1bW5zID0gdHJhbnNsYXRlVGVtcGxhdGVzKGFycik7XHJcbiAgICAgICAgc2V0Q29sdW1uRGVmYXVsdHModGhpcy5faW50ZXJuYWxDb2x1bW5zKTtcclxuICAgICAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucygpO1xyXG4gICAgICAgIHRoaXMuc29ydEludGVybmFsUm93cygpO1xyXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBtYXAgd2l0aCB0aGUgZGF0YSBncm91cGVkIGJ5IHRoZSB1c2VyIGNob2ljZSBvZiBncm91cGluZyBpbmRleFxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9yaWdpbmFsQXJyYXkgdGhlIG9yaWdpbmFsIGFycmF5IHBhc3NlZCB2aWEgcGFyYW1ldGVyXHJcbiAgICogQHBhcmFtIGdyb3VwQnlJbmRleCAgdGhlIGluZGV4IG9mIHRoZSBjb2x1bW4gdG8gZ3JvdXAgdGhlIGRhdGEgYnlcclxuICAgKi9cclxuICBncm91cEFycmF5Qnkob3JpZ2luYWxBcnJheTogYW55LCBncm91cEJ5OiBhbnkpIHtcclxuICAgIC8vIGNyZWF0ZSBhIG1hcCB0byBob2xkIGdyb3VwcyB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmcgcmVzdWx0c1xyXG4gICAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xyXG4gICAgbGV0IGk6IG51bWJlciA9IDA7XHJcblxyXG4gICAgb3JpZ2luYWxBcnJheS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgY29uc3Qga2V5ID0gaXRlbVtncm91cEJ5XTtcclxuICAgICAgaWYgKCFtYXAuaGFzKGtleSkpIHtcclxuICAgICAgICBtYXAuc2V0KGtleSwgW2l0ZW1dKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBtYXAuZ2V0KGtleSkucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgICBpKys7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBhZGRHcm91cCA9IChrZXk6IGFueSwgdmFsdWU6IGFueSkgPT4ge1xyXG4gICAgICByZXR1cm4geyBrZXksIHZhbHVlIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGNvbnZlcnQgbWFwIGJhY2sgdG8gYSBzaW1wbGUgYXJyYXkgb2Ygb2JqZWN0c1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20obWFwLCB4ID0+IGFkZEdyb3VwKHhbMF0sIHhbMV0pKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBBbmd1bGFyIGRpcnR5IGNoZWNrcyBhIGRpcmVjdGl2ZS5cclxuICAgKi9cclxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yb3dEaWZmZXIuZGlmZih0aGlzLnJvd3MpKSB7XHJcbiAgICAgIGlmICghdGhpcy5leHRlcm5hbFNvcnRpbmcpIHtcclxuICAgICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBbLi4udGhpcy5yb3dzXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXV0byBncm91cCBieSBwYXJlbnQgb24gbmV3IHVwZGF0ZVxyXG4gICAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBncm91cFJvd3NCeVBhcmVudHMoXHJcbiAgICAgICAgdGhpcy5faW50ZXJuYWxSb3dzLFxyXG4gICAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVGcm9tUmVsYXRpb24pLFxyXG4gICAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVUb1JlbGF0aW9uKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5yZWNhbGN1bGF0ZVBhZ2VzKCk7XHJcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWNhbGMncyB0aGUgc2l6ZXMgb2YgdGhlIGdyaWQuXHJcbiAgICpcclxuICAgKiBVcGRhdGVkIGF1dG9tYXRpY2FsbHkgb24gY2hhbmdlcyB0bzpcclxuICAgKlxyXG4gICAqICAtIENvbHVtbnNcclxuICAgKiAgLSBSb3dzXHJcbiAgICogIC0gUGFnaW5nIHJlbGF0ZWRcclxuICAgKlxyXG4gICAqIEFsc28gY2FuIGJlIG1hbnVhbGx5IGludm9rZWQgb3IgdXBvbiB3aW5kb3cgcmVzaXplLlxyXG4gICAqL1xyXG4gIHJlY2FsY3VsYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZURpbXMoKTtcclxuICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKCk7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICBpZiAoISh0aGlzLmNkIGFzIFZpZXdSZWYpLmRlc3Ryb3llZCkge1xyXG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY2FsdWxjYXRlcyB0aGUgY29sdW1uIHdpZHRocyBiYXNlZCBvbiBjb2x1bW4gd2lkdGhcclxuICAgKiBkaXN0cmlidXRpb24gbW9kZSBhbmQgc2Nyb2xsYmFyIG9mZnNldHMuXHJcbiAgICovXHJcbiAgcmVjYWxjdWxhdGVDb2x1bW5zKFxyXG4gICAgY29sdW1uczogYW55W10gPSB0aGlzLl9pbnRlcm5hbENvbHVtbnMsXHJcbiAgICBmb3JjZUlkeDogbnVtYmVyID0gLTEsXHJcbiAgICBhbGxvd0JsZWVkOiBib29sZWFuID0gdGhpcy5zY3JvbGxiYXJIXHJcbiAgKTogYW55W10gfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKCFjb2x1bW5zKSByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgIGxldCB3aWR0aCA9IHRoaXMuX2lubmVyV2lkdGg7XHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XHJcbiAgICAgIHdpZHRoID0gd2lkdGggLSB0aGlzLnNjcm9sbGJhckhlbHBlci53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb2x1bW5Nb2RlID09PSBDb2x1bW5Nb2RlLmZvcmNlKSB7XHJcbiAgICAgIGZvcmNlRmlsbENvbHVtbldpZHRocyhjb2x1bW5zLCB3aWR0aCwgZm9yY2VJZHgsIGFsbG93QmxlZWQpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbHVtbk1vZGUgPT09IENvbHVtbk1vZGUuZmxleCkge1xyXG4gICAgICBhZGp1c3RDb2x1bW5XaWR0aHMoY29sdW1ucywgd2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBkaW1lbnNpb25zIG9mIHRoZSB0YWJsZSBzaXplLlxyXG4gICAqIEludGVybmFsbHkgY2FsbHMgdGhlIHBhZ2Ugc2l6ZSBhbmQgcm93IGNvdW50IGNhbGNzIHRvby5cclxuICAgKlxyXG4gICAqL1xyXG4gIHJlY2FsY3VsYXRlRGltcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRpbXMgPSB0aGlzLmRpbWVuc2lvbnNIZWxwZXIuZ2V0RGltZW5zaW9ucyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IE1hdGguZmxvb3IoZGltcy53aWR0aCk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyVikge1xyXG4gICAgICBsZXQgaGVpZ2h0ID0gZGltcy5oZWlnaHQ7XHJcbiAgICAgIGlmICh0aGlzLmhlYWRlckhlaWdodCkgaGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5oZWFkZXJIZWlnaHQ7XHJcbiAgICAgIGlmICh0aGlzLmZvb3RlckhlaWdodCkgaGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5mb290ZXJIZWlnaHQ7XHJcbiAgICAgIHRoaXMuYm9keUhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlUGFnZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY2FsY3VsYXRlcyB0aGUgcGFnZXMgYWZ0ZXIgYSB1cGRhdGUuXHJcbiAgICovXHJcbiAgcmVjYWxjdWxhdGVQYWdlcygpOiB2b2lkIHtcclxuICAgIHRoaXMucGFnZVNpemUgPSB0aGlzLmNhbGNQYWdlU2l6ZSgpO1xyXG4gICAgdGhpcy5yb3dDb3VudCA9IHRoaXMuY2FsY1Jvd0NvdW50KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCb2R5IHRyaWdnZXJlZCBhIHBhZ2UgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Cb2R5UGFnZSh7IG9mZnNldCB9OiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIEF2b2lkIHBhZ2luYXRpb24gY2FtaW5nIGZyb20gYm9keSBldmVudHMgbGlrZSBzY3JvbGwgd2hlbiB0aGUgdGFibGVcclxuICAgIC8vIGhhcyBubyB2aXJ0dWFsaXphdGlvbiBhbmQgdGhlIGV4dGVybmFsIHBhZ2luZyBpcyBlbmFibGUuXHJcbiAgICAvLyBUaGlzIG1lYW5zLCBsZXQncyB0aGUgZGV2ZWxvcGVyIGhhbmRsZSBwYWdpbmF0aW9uIGJ5IG15IGhpbShoZXIpIHNlbGZcclxuICAgIGlmICh0aGlzLmV4dGVybmFsUGFnaW5nICYmICF0aGlzLnZpcnR1YWxpemF0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuXHJcbiAgICB0aGlzLnBhZ2UuZW1pdCh7XHJcbiAgICAgIGNvdW50OiB0aGlzLmNvdW50LFxyXG4gICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcclxuICAgICAgbGltaXQ6IHRoaXMubGltaXQsXHJcbiAgICAgIG9mZnNldDogdGhpcy5vZmZzZXRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGJvZHkgdHJpZ2dlcmVkIGEgc2Nyb2xsIGV2ZW50LlxyXG4gICAqL1xyXG4gIG9uQm9keVNjcm9sbChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fb2Zmc2V0WC5uZXh0KGV2ZW50Lm9mZnNldFgpO1xyXG4gICAgdGhpcy5zY3JvbGwuZW1pdChldmVudCk7XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmb290ZXIgdHJpZ2dlcmVkIGEgcGFnZSBldmVudC5cclxuICAgKi9cclxuICBvbkZvb3RlclBhZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5vZmZzZXQgPSBldmVudC5wYWdlIC0gMTtcclxuICAgIHRoaXMuYm9keUNvbXBvbmVudC51cGRhdGVPZmZzZXRZKHRoaXMub2Zmc2V0KTtcclxuXHJcbiAgICB0aGlzLnBhZ2UuZW1pdCh7XHJcbiAgICAgIGNvdW50OiB0aGlzLmNvdW50LFxyXG4gICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcclxuICAgICAgbGltaXQ6IHRoaXMubGltaXQsXHJcbiAgICAgIG9mZnNldDogdGhpcy5vZmZzZXRcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdEFsbFJvd3NPblBhZ2UpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xyXG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHtcclxuICAgICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY2FsY3VsYXRlcyB0aGUgc2l6ZXMgb2YgdGhlIHBhZ2VcclxuICAgKi9cclxuICBjYWxjUGFnZVNpemUodmFsOiBhbnlbXSA9IHRoaXMucm93cyk6IG51bWJlciB7XHJcbiAgICAvLyBLZWVwIHRoZSBwYWdlIHNpemUgY29uc3RhbnQgZXZlbiBpZiB0aGUgcm93IGhhcyBiZWVuIGV4cGFuZGVkLlxyXG4gICAgLy8gVGhpcyBpcyBiZWNhdXNlIGFuIGV4cGFuZGVkIHJvdyBpcyBzdGlsbCBjb25zaWRlcmVkIHRvIGJlIGEgY2hpbGQgb2ZcclxuICAgIC8vIHRoZSBvcmlnaW5hbCByb3cuICBIZW5jZSBjYWxjdWxhdGlvbiB3b3VsZCB1c2Ugcm93SGVpZ2h0IG9ubHkuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWICYmIHRoaXMudmlydHVhbGl6YXRpb24pIHtcclxuICAgICAgY29uc3Qgc2l6ZSA9IE1hdGguY2VpbCh0aGlzLmJvZHlIZWlnaHQgLyAodGhpcy5yb3dIZWlnaHQgYXMgbnVtYmVyKSk7XHJcbiAgICAgIHJldHVybiBNYXRoLm1heChzaXplLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiBsaW1pdCBpcyBwYXNzZWQsIHdlIGFyZSBwYWdpbmdcclxuICAgIGlmICh0aGlzLmxpbWl0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGltaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb3RoZXJ3aXNlIHVzZSByb3cgbGVuZ3RoXHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIHJldHVybiB2YWwubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG90aGVyIGVtcHR5IDooXHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZXMgdGhlIHJvdyBjb3VudC5cclxuICAgKi9cclxuICBjYWxjUm93Q291bnQodmFsOiBhbnlbXSA9IHRoaXMucm93cyk6IG51bWJlciB7XHJcbiAgICBpZiAoIXRoaXMuZXh0ZXJuYWxQYWdpbmcpIHtcclxuICAgICAgaWYgKCF2YWwpIHJldHVybiAwO1xyXG5cclxuICAgICAgaWYgKHRoaXMuZ3JvdXBlZFJvd3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ncm91cGVkUm93cy5sZW5ndGg7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50cmVlRnJvbVJlbGF0aW9uICE9IG51bGwgJiYgdGhpcy50cmVlVG9SZWxhdGlvbiAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsUm93cy5sZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb3VudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWFkZXIgdHJpZ2dlcmVkIGEgY29udGV4dG1lbnUgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Db2x1bW5Db250ZXh0bWVudSh7IGV2ZW50LCBjb2x1bW4gfTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnRhYmxlQ29udGV4dG1lbnUuZW1pdCh7IGV2ZW50LCB0eXBlOiBDb250ZXh0bWVudVR5cGUuaGVhZGVyLCBjb250ZW50OiBjb2x1bW4gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgYm9keSB0cmlnZ2VyZWQgYSBjb250ZXh0bWVudSBldmVudC5cclxuICAgKi9cclxuICBvblJvd0NvbnRleHRtZW51KHsgZXZlbnQsIHJvdyB9OiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMudGFibGVDb250ZXh0bWVudS5lbWl0KHsgZXZlbnQsIHR5cGU6IENvbnRleHRtZW51VHlwZS5ib2R5LCBjb250ZW50OiByb3cgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgaGVhZGVyIHRyaWdnZXJlZCBhIGNvbHVtbiByZXNpemUgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Db2x1bW5SZXNpemUoeyBjb2x1bW4sIG5ld1ZhbHVlIH06IGFueSk6IHZvaWQge1xyXG4gICAgLyogU2FmYXJpL2lPUyAxMC4yIHdvcmthcm91bmQgKi9cclxuICAgIGlmIChjb2x1bW4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlkeDogbnVtYmVyO1xyXG4gICAgY29uc3QgY29scyA9IHRoaXMuX2ludGVybmFsQ29sdW1ucy5tYXAoKGMsIGkpID0+IHtcclxuICAgICAgYyA9IHsgLi4uYyB9O1xyXG5cclxuICAgICAgaWYgKGMuJCRpZCA9PT0gY29sdW1uLiQkaWQpIHtcclxuICAgICAgICBpZHggPSBpO1xyXG4gICAgICAgIGMud2lkdGggPSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoaXMgc28gd2UgY2FuIGZvcmNlIHRoZSBjb2x1bW5cclxuICAgICAgICAvLyB3aWR0aCBkaXN0cmlidXRpb24gdG8gYmUgdG8gdGhpcyB2YWx1ZVxyXG4gICAgICAgIGMuJCRvbGRXaWR0aCA9IG5ld1ZhbHVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYztcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKGNvbHMsIGlkeCk7XHJcbiAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSBjb2xzO1xyXG5cclxuICAgIHRoaXMucmVzaXplLmVtaXQoe1xyXG4gICAgICBjb2x1bW4sXHJcbiAgICAgIG5ld1ZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWFkZXIgdHJpZ2dlcmVkIGEgY29sdW1uIHJlLW9yZGVyIGV2ZW50LlxyXG4gICAqL1xyXG4gIG9uQ29sdW1uUmVvcmRlcih7IGNvbHVtbiwgbmV3VmFsdWUsIHByZXZWYWx1ZSB9OiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbHMgPSB0aGlzLl9pbnRlcm5hbENvbHVtbnMubWFwKGMgPT4ge1xyXG4gICAgICByZXR1cm4geyAuLi5jIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5zd2FwQ29sdW1ucykge1xyXG4gICAgICBjb25zdCBwcmV2Q29sID0gY29sc1tuZXdWYWx1ZV07XHJcbiAgICAgIGNvbHNbbmV3VmFsdWVdID0gY29sdW1uO1xyXG4gICAgICBjb2xzW3ByZXZWYWx1ZV0gPSBwcmV2Q29sO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKG5ld1ZhbHVlID4gcHJldlZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgbW92ZWRDb2wgPSBjb2xzW3ByZXZWYWx1ZV07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHByZXZWYWx1ZTsgaSA8IG5ld1ZhbHVlOyBpKyspIHtcclxuICAgICAgICAgIGNvbHNbaV0gPSBjb2xzW2kgKyAxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29sc1tuZXdWYWx1ZV0gPSBtb3ZlZENvbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBtb3ZlZENvbCA9IGNvbHNbcHJldlZhbHVlXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gcHJldlZhbHVlOyBpID4gbmV3VmFsdWU7IGktLSkge1xyXG4gICAgICAgICAgY29sc1tpXSA9IGNvbHNbaSAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb2xzW25ld1ZhbHVlXSA9IG1vdmVkQ29sO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faW50ZXJuYWxDb2x1bW5zID0gY29scztcclxuXHJcbiAgICB0aGlzLnJlb3JkZXIuZW1pdCh7XHJcbiAgICAgIGNvbHVtbixcclxuICAgICAgbmV3VmFsdWUsXHJcbiAgICAgIHByZXZWYWx1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkNvbHVtbkZpbHRlcihldmVudDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmZpbHRlci5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWFkZXIgdHJpZ2dlcmVkIGEgY29sdW1uIHNvcnQgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Db2x1bW5Tb3J0KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIGNsZWFuIHNlbGVjdGVkIHJvd3NcclxuICAgIGlmICh0aGlzLnNlbGVjdEFsbFJvd3NPblBhZ2UpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xyXG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHtcclxuICAgICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvcnRzID0gZXZlbnQuc29ydHM7XHJcblxyXG4gICAgLy8gdGhpcyBjb3VsZCBiZSBvcHRpbWl6ZWQgYmV0dGVyIHNpbmNlIGl0IHdpbGwgcmVzb3J0XHJcbiAgICAvLyB0aGUgcm93cyBhZ2FpbiBvbiB0aGUgJ3B1c2gnIGRldGVjdGlvbi4uLlxyXG4gICAgaWYgKHRoaXMuZXh0ZXJuYWxTb3J0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAvLyBkb24ndCB1c2Ugbm9ybWFsIHNldHRlciBzbyB3ZSBkb24ndCByZXNvcnRcclxuICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXV0byBncm91cCBieSBwYXJlbnQgb24gbmV3IHVwZGF0ZVxyXG4gICAgdGhpcy5faW50ZXJuYWxSb3dzID0gZ3JvdXBSb3dzQnlQYXJlbnRzKFxyXG4gICAgICB0aGlzLl9pbnRlcm5hbFJvd3MsXHJcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVGcm9tUmVsYXRpb24pLFxyXG4gICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlVG9SZWxhdGlvbilcclxuICAgICk7XHJcblxyXG4gICAgLy8gQWx3YXlzIGdvIHRvIGZpcnN0IHBhZ2Ugd2hlbiBzb3J0aW5nIHRvIHNlZSB0aGUgbmV3bHkgc29ydGVkIGRhdGFcclxuICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgIHRoaXMuYm9keUNvbXBvbmVudC51cGRhdGVPZmZzZXRZKHRoaXMub2Zmc2V0KTtcclxuICAgIHRoaXMuc29ydC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSBhbGwgcm93IHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIG9uSGVhZGVyU2VsZWN0KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdEFsbFJvd3NPblBhZ2UpIHtcclxuICAgICAgLy8gYmVmb3JlIHdlIHNwbGljZSwgY2hrIGlmIHdlIGN1cnJlbnRseSBoYXZlIGFsbCBzZWxlY3RlZFxyXG4gICAgICBjb25zdCBmaXJzdCA9IHRoaXMuYm9keUNvbXBvbmVudC5pbmRleGVzLmZpcnN0O1xyXG4gICAgICBjb25zdCBsYXN0ID0gdGhpcy5ib2R5Q29tcG9uZW50LmluZGV4ZXMubGFzdDtcclxuICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gbGFzdCAtIGZpcnN0O1xyXG5cclxuICAgICAgLy8gcmVtb3ZlIGFsbCBleGlzdGluZyBlaXRoZXIgd2F5XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcclxuXHJcbiAgICAgIC8vIGRvIHRoZSBvcHBvc2l0ZSBoZXJlXHJcbiAgICAgIGlmICghYWxsU2VsZWN0ZWQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goLi4udGhpcy5faW50ZXJuYWxSb3dzLnNsaWNlKGZpcnN0LCBsYXN0KSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGJlZm9yZSB3ZSBzcGxpY2UsIGNoayBpZiB3ZSBjdXJyZW50bHkgaGF2ZSBhbGwgc2VsZWN0ZWRcclxuICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gdGhpcy5yb3dzLmxlbmd0aDtcclxuICAgICAgLy8gcmVtb3ZlIGFsbCBleGlzdGluZyBlaXRoZXIgd2F5XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcclxuICAgICAgLy8gZG8gdGhlIG9wcG9zaXRlIGhlcmVcclxuICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi50aGlzLnJvd3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3QuZW1pdCh7XHJcbiAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcm93IHdhcyBzZWxlY3RlZCBmcm9tIGJvZHlcclxuICAgKi9cclxuICBvbkJvZHlTZWxlY3QoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIHJvdyB3YXMgZXhwYW5kZWQgb3IgY29sbGFwc2VkIGZvciB0cmVlXHJcbiAgICovXHJcbiAgb25UcmVlQWN0aW9uKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IHJvdyA9IGV2ZW50LnJvdztcclxuICAgIC8vIFRPRE86IEZvciBkdXBsaWNhdGVkIGl0ZW1zIHRoaXMgd2lsbCBub3Qgd29ya1xyXG4gICAgY29uc3Qgcm93SW5kZXggPSB0aGlzLl9yb3dzLmZpbmRJbmRleChyID0+IHJbdGhpcy50cmVlVG9SZWxhdGlvbl0gPT09IGV2ZW50LnJvd1t0aGlzLnRyZWVUb1JlbGF0aW9uXSk7XHJcbiAgICB0aGlzLnRyZWVBY3Rpb24uZW1pdCh7IHJvdywgcm93SW5kZXggfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgaWYgKHRoaXMucmVzaXplU2Vuc29yKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU2Vuc29yLmRldGFjaCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbGlzdGVuIGZvciBjaGFuZ2VzIHRvIGlucHV0IGJpbmRpbmdzIG9mIGFsbCBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUgYW5kXHJcbiAgICogdHJpZ2dlciB0aGUgY29sdW1uVGVtcGxhdGVzLmNoYW5nZXMgb2JzZXJ2YWJsZSB0byBlbWl0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JDb2x1bW5JbnB1dENoYW5nZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuY29sdW1uQ2hhbmdlc1NlcnZpY2UuY29sdW1uSW5wdXRDaGFuZ2VzJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbHVtblRlbXBsYXRlcykge1xyXG4gICAgICAgICAgdGhpcy5jb2x1bW5UZW1wbGF0ZXMubm90aWZ5T25DaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc29ydEludGVybmFsUm93cygpOiB2b2lkIHtcclxuICAgIHRoaXMuX2ludGVybmFsUm93cyA9IHNvcnRSb3dzKHRoaXMuX2ludGVybmFsUm93cywgdGhpcy5faW50ZXJuYWxDb2x1bW5zLCB0aGlzLnNvcnRzKTtcclxuICB9XHJcbn1cclxuIl19