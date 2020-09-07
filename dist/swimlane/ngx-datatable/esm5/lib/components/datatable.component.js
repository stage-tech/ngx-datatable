/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        this.recalculate$.pipe(throttleTime(100)).subscribe((/**
         * @return {?}
         */
        function () { return _this.recalculate(); }));
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
        this.recalculateDims();
        this.recalculateColumns();
        if (!((/** @type {?} */ (this.cd))).destroyed) {
            this.cd.detectChanges();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFFVCxlQUFlLEVBRWYsU0FBUyxFQUVULFdBQVcsRUFDWCxZQUFZLEVBRVosZUFBZSxFQUVmLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFFBQVEsRUFFUixRQUFRLEVBQ1IsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRW5GLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JF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Ozs7Ozs7SUFRN0IsaURBQXFDOzs7OztJQUtyQyw0Q0FBd0M7Ozs7O0lBS3hDLDhDQUFrQzs7Ozs7SUFLbEMsNENBQWdDOzs7OztJQUtoQyx3Q0FBcUM7Ozs7O0lBS3JDLDJDQUFvQzs7Ozs7SUFLcEMsNkNBQXlDOzs7OztJQUt6QyxvQ0FBeUQ7Ozs7O0lBS3pELHNDQUEyRDs7Ozs7SUFLM0Qsb0NBQXlEOzs7OztJQUt6RCxrQ0FBdUQ7Ozs7O0lBS3ZELG9DQUF5RDs7Ozs7SUFLekQsa0NBQXVEOzs7OztJQUt2RCxxQ0FBMEQ7Ozs7O0lBSzFELG9DQUF5RDs7Ozs7OztJQU96RCw4Q0FBaUg7Ozs7O0lBS2pILHdDQUE2RDs7Ozs7SUFtSDdELHVDQUN1Qzs7Ozs7SUFLdkMseUNBQzJDOzs7OztJQUszQyxvQ0FDaUM7Ozs7OztJQU1qQywyQ0FDc0M7Ozs7Ozs7O0lBUXRDLDZDQUMwQzs7SUFpQjFDLHFDQUFxQjs7SUFDckIseUNBQW9COztJQUNwQixzQ0FBaUI7O0lBQ2pCLHdDQUFtQjs7SUFDbkIsc0NBQXFCOztJQUNyQix1Q0FBa0M7O0lBRWxDLHNDQUFrQzs7SUFDbEMsb0NBQTJCOztJQUMzQixvQ0FBbUI7O0lBQ25CLHFDQUFvQjs7SUFDcEIsbUNBQWE7O0lBQ2IsMENBQXFCOztJQUNyQiwyQ0FBcUI7O0lBQ3JCLDhDQUFnQzs7SUFDaEMsc0NBQXdCOztJQUN4Qiw4Q0FBc0Q7O0lBQ3RELDRDQUFvQzs7SUFDcEMsMENBQTJCOztJQUMzQiwwQ0FBNkI7Ozs7Ozs7O0lBaUY3Qix5Q0FRRTs7Ozs7SUF0RkEsNkNBQW9EOzs7OztJQUNwRCw4Q0FBc0Q7Ozs7O0lBQ3RELGdDQUE2Qjs7Ozs7SUFHN0Isa0RBQWtEOzs7OztJQUNsRCwyQ0FBK0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgT25Jbml0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBEb0NoZWNrLFxyXG4gIEtleVZhbHVlRGlmZmVycyxcclxuICBLZXlWYWx1ZURpZmZlcixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBTa2lwU2VsZixcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgSW5qZWN0LFxyXG4gIFZpZXdSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLmRpcmVjdGl2ZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJTmd4RGF0YXRhYmxlQ29uZmlnIH0gZnJvbSAnLi4vbmd4LWRhdGF0YWJsZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBncm91cFJvd3NCeVBhcmVudHMsIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCB9IGZyb20gJy4uL3V0aWxzL3RyZWUnO1xyXG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcclxuaW1wb3J0IHsgc2V0Q29sdW1uRGVmYXVsdHMsIHRyYW5zbGF0ZVRlbXBsYXRlcyB9IGZyb20gJy4uL3V0aWxzL2NvbHVtbi1oZWxwZXInO1xyXG5pbXBvcnQgeyBDb2x1bW5Nb2RlIH0gZnJvbSAnLi4vdHlwZXMvY29sdW1uLW1vZGUudHlwZSc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XHJcbmltcG9ydCB7IFNvcnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvc29ydC50eXBlJztcclxuaW1wb3J0IHsgQ29udGV4dG1lbnVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvY29udGV4dG1lbnUudHlwZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlIH0gZnJvbSAnLi9yb3ctZGV0YWlsL3Jvdy1kZXRhaWwuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9mb290ZXIvZm9vdGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlDb21wb25lbnQgfSBmcm9tICcuL2JvZHkvYm9keS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2Nyb2xsYmFySGVscGVyIH0gZnJvbSAnLi4vc2VydmljZXMvc2Nyb2xsYmFyLWhlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29sdW1uQ2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb2x1bW4tY2hhbmdlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGltZW5zaW9uc0hlbHBlciB9IGZyb20gJy4uL3NlcnZpY2VzL2RpbWVuc2lvbnMtaGVscGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0aHJvdHRsZWFibGUgfSBmcm9tICcuLi91dGlscy90aHJvdHRsZSc7XHJcbmltcG9ydCB7IGZvcmNlRmlsbENvbHVtbldpZHRocywgYWRqdXN0Q29sdW1uV2lkdGhzIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XHJcbmltcG9ydCB7IHNvcnRSb3dzIH0gZnJvbSAnLi4vdXRpbHMvc29ydCc7XHJcbmltcG9ydCB7IFJlc2l6ZVNlbnNvciB9IGZyb20gJ2Nzcy1lbGVtZW50LXF1ZXJpZXMnO1xyXG5pbXBvcnQgeyB0aHJvdHRsZVRpbWUsIGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWRhdGF0YWJsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGF0YWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBzdHlsZVVybHM6IFsnLi9kYXRhdGFibGUuY29tcG9uZW50LnNjc3MnXSxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ25neC1kYXRhdGFibGUnXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YXRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrLCBBZnRlclZpZXdJbml0IHtcclxuICAvKipcclxuICAgKiBUZW1wbGF0ZSBmb3IgdGhlIHRhcmdldCBtYXJrZXIgb2YgZHJhZyB0YXJnZXQgY29sdW1ucy5cclxuICAgKi9cclxuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJUZW1wbGF0ZTogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBSb3dzIHRoYXQgYXJlIGRpc3BsYXllZCBpbiB0aGUgdGFibGUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IHJvd3ModmFsOiBhbnkpIHtcclxuICAgIHRoaXMuX3Jvd3MgPSB2YWw7XHJcblxyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBbLi4udmFsXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhdXRvIHNvcnQgb24gbmV3IHVwZGF0ZXNcclxuICAgIGlmICghdGhpcy5leHRlcm5hbFNvcnRpbmcpIHtcclxuICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXV0byBncm91cCBieSBwYXJlbnQgb24gbmV3IHVwZGF0ZVxyXG4gICAgdGhpcy5faW50ZXJuYWxSb3dzID0gZ3JvdXBSb3dzQnlQYXJlbnRzKFxyXG4gICAgICB0aGlzLl9pbnRlcm5hbFJvd3MsXHJcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVGcm9tUmVsYXRpb24pLFxyXG4gICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlVG9SZWxhdGlvbilcclxuICAgICk7XHJcblxyXG4gICAgLy8gcmVjYWxjdWxhdGUgc2l6ZXMvZXRjXHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuX3Jvd3MgJiYgdGhpcy5fZ3JvdXBSb3dzQnkpIHtcclxuICAgICAgLy8gSWYgYSBjb2x1bW4gaGFzIGJlZW4gc3BlY2lmaWVkIGluIF9ncm91cFJvd3NCeSBjcmVhdGVkIGEgbmV3IGFycmF5IHdpdGggdGhlIGRhdGEgZ3JvdXBlZCBieSB0aGF0IHJvd1xyXG4gICAgICB0aGlzLmdyb3VwZWRSb3dzID0gdGhpcy5ncm91cEFycmF5QnkodGhpcy5fcm93cywgdGhpcy5fZ3JvdXBSb3dzQnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSByb3dzLlxyXG4gICAqL1xyXG4gIGdldCByb3dzKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcm93cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgYXR0cmlidXRlIGFsbG93cyB0aGUgdXNlciB0byBzZXQgdGhlIG5hbWUgb2YgdGhlIGNvbHVtbiB0byBncm91cCB0aGUgZGF0YSB3aXRoXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IGdyb3VwUm93c0J5KHZhbDogc3RyaW5nKSB7XHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIHRoaXMuX2dyb3VwUm93c0J5ID0gdmFsO1xyXG4gICAgICBpZiAodGhpcy5fcm93cyAmJiB0aGlzLl9ncm91cFJvd3NCeSkge1xyXG4gICAgICAgIC8vIGNyZXRlcyBhIG5ldyBhcnJheSB3aXRoIHRoZSBkYXRhIGdyb3VwZWRcclxuICAgICAgICB0aGlzLmdyb3VwZWRSb3dzID0gdGhpcy5ncm91cEFycmF5QnkodGhpcy5fcm93cywgdGhpcy5fZ3JvdXBSb3dzQnkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgZ3JvdXBSb3dzQnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXBSb3dzQnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGF0dHJpYnV0ZSBhbGxvd3MgdGhlIHVzZXIgdG8gc2V0IGEgZ3JvdXBlZCBhcnJheSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDpcclxuICAgKiAgW1xyXG4gICAqICAgIHtncm91cGlkPTF9IFtcclxuICAgKiAgICAgIHtpZD0xIG5hbWU9XCJ0ZXN0MVwifSxcclxuICAgKiAgICAgIHtpZD0yIG5hbWU9XCJ0ZXN0MlwifSxcclxuICAgKiAgICAgIHtpZD0zIG5hbWU9XCJ0ZXN0M1wifVxyXG4gICAqICAgIF19LFxyXG4gICAqICAgIHtncm91cGlkPTI+W1xyXG4gICAqICAgICAge2lkPTQgbmFtZT1cInRlc3Q0XCJ9LFxyXG4gICAqICAgICAge2lkPTUgbmFtZT1cInRlc3Q1XCJ9LFxyXG4gICAqICAgICAge2lkPTYgbmFtZT1cInRlc3Q2XCJ9XHJcbiAgICogICAgXX1cclxuICAgKiAgXVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdyb3VwZWRSb3dzOiBhbnlbXTtcclxuXHJcbiAgQElucHV0KCkgZXhwYW5kYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBDb2x1bW5zIHRvIGJlIGRpc3BsYXllZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgY29sdW1ucyh2YWw6IFRhYmxlQ29sdW1uW10pIHtcclxuICAgIHZhbCA9IFtcclxuICAgICAgLi4uKHRoaXMuZXhwYW5kYWJsZVxyXG4gICAgICAgID8gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgIHByb3A6ICdpY2UtZXhwYW5kYWJsZScsXHJcbiAgICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgICAgcmVzaXplYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY2FuQXV0b1Jlc2l6ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIDogW10pLFxyXG4gICAgICAuLi52YWxcclxuICAgIF07XHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IFsuLi52YWxdO1xyXG4gICAgICBzZXRDb2x1bW5EZWZhdWx0cyh0aGlzLl9pbnRlcm5hbENvbHVtbnMpO1xyXG4gICAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NvbHVtbnMgPSB2YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGNvbHVtbnMuXHJcbiAgICovXHJcbiAgZ2V0IGNvbHVtbnMoKTogVGFibGVDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3Qgb2Ygcm93IG9iamVjdHMgdGhhdCBzaG91bGQgYmVcclxuICAgKiByZXByZXNlbnRlZCBhcyBzZWxlY3RlZCBpbiB0aGUgZ3JpZC5cclxuICAgKiBEZWZhdWx0IHZhbHVlOiBgW11gXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGFueVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSB2ZXJ0aWNhbCBzY3JvbGxiYXJzXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2Nyb2xsYmFyVjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgaG9yeiBzY3JvbGxiYXJzXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2Nyb2xsYmFySDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcm93IGhlaWdodDsgd2hpY2ggaXMgbmVjZXNzYXJ5XHJcbiAgICogdG8gY2FsY3VsYXRlIHRoZSBoZWlnaHQgZm9yIHRoZSBsYXp5IHJlbmRlcmluZy5cclxuICAgKi9cclxuICBASW5wdXQoKSByb3dIZWlnaHQ6IG51bWJlciB8ICdhdXRvJyB8ICgocm93PzogYW55KSA9PiBudW1iZXIpID0gMzA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFR5cGUgb2YgY29sdW1uIHdpZHRoIGRpc3RyaWJ1dGlvbiBmb3JtdWxhLlxyXG4gICAqIEV4YW1wbGU6IGZsZXgsIGZvcmNlLCBzdGFuZGFyZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbHVtbk1vZGU6IENvbHVtbk1vZGUgPSBDb2x1bW5Nb2RlLnN0YW5kYXJkO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWluaW11bSBoZWFkZXIgaGVpZ2h0IGluIHBpeGVscy5cclxuICAgKiBQYXNzIGEgZmFsc2V5IGZvciBubyBoZWFkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBoZWFkZXJIZWlnaHQ6IGFueSA9IDMwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWluaW11bSBmb290ZXIgaGVpZ2h0IGluIHBpeGVscy5cclxuICAgKiBQYXNzIGZhbHNleSBmb3Igbm8gZm9vdGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9vdGVySGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGUgdGFibGUgc2hvdWxkIHVzZSBleHRlcm5hbCBwYWdpbmdcclxuICAgKiBvdGhlcndpc2UgaXRzIGFzc3VtZWQgdGhhdCBhbGwgZGF0YSBpcyBwcmVsb2FkZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXh0ZXJuYWxQYWdpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdGhlIHRhYmxlIHNob3VsZCB1c2UgZXh0ZXJuYWwgc29ydGluZyBvclxyXG4gICAqIHRoZSBidWlsdC1pbiBiYXNpYyBzb3J0aW5nLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV4dGVybmFsU29ydGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcGFnZSBzaXplIHRvIGJlIHNob3duLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGB1bmRlZmluZWRgXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IGxpbWl0KHZhbDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLl9saW1pdCA9IHZhbDtcclxuXHJcbiAgICAvLyByZWNhbGN1bGF0ZSBzaXplcy9ldGNcclxuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGxpbWl0LlxyXG4gICAqL1xyXG4gIGdldCBsaW1pdCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpbWl0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRvdGFsIGNvdW50IG9mIGFsbCByb3dzLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGAwYFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCBjb3VudCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fY291bnQgPSB2YWw7XHJcblxyXG4gICAgLy8gcmVjYWxjdWxhdGUgc2l6ZXMvZXRjXHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBjb3VudC5cclxuICAgKi9cclxuICBnZXQgY291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9jb3VudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IG9mZnNldCAoIHBhZ2UgLSAxICkgc2hvd24uXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYDBgXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IG9mZnNldCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fb2Zmc2V0ID0gdmFsO1xyXG4gIH1cclxuICBnZXQgb2Zmc2V0KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5fb2Zmc2V0LCBNYXRoLmNlaWwodGhpcy5yb3dDb3VudCAvIHRoaXMucGFnZVNpemUpIC0gMSksIDApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyB0aGUgbGluZWFyIGxvYWRpbmcgYmFyLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGBmYWxzZWBcclxuICAgKi9cclxuICBASW5wdXQoKSBsb2FkaW5nSW5kaWNhdG9yOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFR5cGUgb2Ygcm93IHNlbGVjdGlvbi4gT3B0aW9ucyBhcmU6XHJcbiAgICpcclxuICAgKiAgLSBgc2luZ2xlYFxyXG4gICAqICAtIGBtdWx0aWBcclxuICAgKiAgLSBgY2hlY2tib3hgXHJcbiAgICogIC0gYG11bHRpQ2xpY2tgXHJcbiAgICogIC0gYGNlbGxgXHJcbiAgICpcclxuICAgKiBGb3Igbm8gc2VsZWN0aW9uIHBhc3MgYSBgZmFsc2V5YC5cclxuICAgKiBEZWZhdWx0IHZhbHVlOiBgdW5kZWZpbmVkYFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlbGVjdGlvblR5cGU6IFNlbGVjdGlvblR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZS9EaXNhYmxlIGFiaWxpdHkgdG8gcmUtb3JkZXIgY29sdW1uc1xyXG4gICAqIGJ5IGRyYWdnaW5nIHRoZW0uXHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVvcmRlcmFibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBTd2FwIGNvbHVtbnMgb24gcmUtb3JkZXIgY29sdW1ucyBvclxyXG4gICAqIG1vdmUgdGhlbS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzd2FwQ29sdW1uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0eXBlIG9mIHNvcnRpbmdcclxuICAgKi9cclxuICBASW5wdXQoKSBzb3J0VHlwZTogU29ydFR5cGUgPSBTb3J0VHlwZS5zaW5nbGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFycmF5IG9mIHNvcnRlZCBjb2x1bW5zIGJ5IHByb3BlcnR5IGFuZCB0eXBlLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGBbXWBcclxuICAgKi9cclxuICBASW5wdXQoKSBzb3J0czogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3NzIGNsYXNzIG92ZXJyaWRlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNzc0NsYXNzZXM6IGFueSA9IHtcclxuICAgIHNvcnRBc2NlbmRpbmc6ICdkYXRhdGFibGUtaWNvbi11cCcsXHJcbiAgICBzb3J0RGVzY2VuZGluZzogJ2RhdGF0YWJsZS1pY29uLWRvd24nLFxyXG4gICAgcGFnZXJMZWZ0QXJyb3c6ICdkYXRhdGFibGUtaWNvbi1sZWZ0JyxcclxuICAgIHBhZ2VyUmlnaHRBcnJvdzogJ2RhdGF0YWJsZS1pY29uLXJpZ2h0JyxcclxuICAgIHBhZ2VyUHJldmlvdXM6ICdkYXRhdGFibGUtaWNvbi1wcmV2JyxcclxuICAgIHBhZ2VyTmV4dDogJ2RhdGF0YWJsZS1pY29uLXNraXAnXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWVzc2FnZSBvdmVycmlkZXMgZm9yIGxvY2FsaXphdGlvblxyXG4gICAqXHJcbiAgICogZW1wdHlNZXNzYWdlICAgICBbZGVmYXVsdF0gPSAnTm8gZGF0YSB0byBkaXNwbGF5J1xyXG4gICAqIHRvdGFsTWVzc2FnZSAgICAgW2RlZmF1bHRdID0gJ3RvdGFsJ1xyXG4gICAqIHNlbGVjdGVkTWVzc2FnZSAgW2RlZmF1bHRdID0gJ3NlbGVjdGVkJ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1lc3NhZ2VzOiBhbnkgPSB7XHJcbiAgICAvLyBNZXNzYWdlIHRvIHNob3cgd2hlbiBhcnJheSBpcyBwcmVzZW50ZWRcclxuICAgIC8vIGJ1dCBjb250YWlucyBubyB2YWx1ZXNcclxuICAgIGVtcHR5TWVzc2FnZTogJ05vIGRhdGEgdG8gZGlzcGxheScsXHJcblxyXG4gICAgLy8gRm9vdGVyIHRvdGFsIG1lc3NhZ2VcclxuICAgIHRvdGFsTWVzc2FnZTogJ3RvdGFsJyxcclxuXHJcbiAgICAvLyBGb290ZXIgc2VsZWN0ZWQgbWVzc2FnZVxyXG4gICAgc2VsZWN0ZWRNZXNzYWdlOiAnc2VsZWN0ZWQnXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogUm93IHNwZWNpZmljIGNsYXNzZXMuXHJcbiAgICogU2ltaWxhciBpbXBsZW1lbnRhdGlvbiB0byBuZ0NsYXNzLlxyXG4gICAqXHJcbiAgICogIFtyb3dDbGFzc109XCInZmlyc3Qgc2Vjb25kJ1wiXHJcbiAgICogIFtyb3dDbGFzc109XCJ7ICdmaXJzdCc6IHRydWUsICdzZWNvbmQnOiB0cnVlLCAndGhpcmQnOiBmYWxzZSB9XCJcclxuICAgKi9cclxuICBASW5wdXQoKSByb3dDbGFzczogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBBIGJvb2xlYW4vZnVuY3Rpb24geW91IGNhbiB1c2UgdG8gY2hlY2sgd2hldGhlciB5b3Ugd2FudFxyXG4gICAqIHRvIHNlbGVjdCBhIHBhcnRpY3VsYXIgcm93IGJhc2VkIG9uIGEgY3JpdGVyaWEuIEV4YW1wbGU6XHJcbiAgICpcclxuICAgKiAgICAoc2VsZWN0aW9uKSA9PiB7XHJcbiAgICogICAgICByZXR1cm4gc2VsZWN0aW9uICE9PSAnRXRoZWwgUHJpY2UnO1xyXG4gICAqICAgIH1cclxuICAgKi9cclxuICBASW5wdXQoKSBzZWxlY3RDaGVjazogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBBIGZ1bmN0aW9uIHlvdSBjYW4gdXNlIHRvIGNoZWNrIHdoZXRoZXIgeW91IHdhbnRcclxuICAgKiB0byBzaG93IHRoZSBjaGVja2JveCBmb3IgYSBwYXJ0aWN1bGFyIHJvdyBiYXNlZCBvbiBhIGNyaXRlcmlhLiBFeGFtcGxlOlxyXG4gICAqXHJcbiAgICogICAgKHJvdywgY29sdW1uLCB2YWx1ZSkgPT4ge1xyXG4gICAqICAgICAgcmV0dXJuIHJvdy5uYW1lICE9PSAnRXRoZWwgUHJpY2UnO1xyXG4gICAqICAgIH1cclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNwbGF5Q2hlY2s6IChyb3c6IGFueSwgY29sdW1uPzogYW55LCB2YWx1ZT86IGFueSkgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBib29sZWFuIHlvdSBjYW4gdXNlIHRvIHNldCB0aGUgZGV0YXVsdCBiZWhhdmlvdXIgb2Ygcm93cyBhbmQgZ3JvdXBzXHJcbiAgICogd2hldGhlciB0aGV5IHdpbGwgc3RhcnQgZXhwYW5kZWQgb3Igbm90LiBJZiBvbW1pdGVkIHRoZSBkZWZhdWx0IGlzIE5PVCBleHBhbmRlZC5cclxuICAgKlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdyb3VwRXhwYW5zaW9uRGVmYXVsdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBQcm9wZXJ0eSB0byB3aGljaCB5b3UgY2FuIHVzZSBmb3IgY3VzdG9tIHRyYWNraW5nIG9mIHJvd3MuXHJcbiAgICogRXhhbXBsZTogJ25hbWUnXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHJhY2tCeVByb3A6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogUHJvcGVydHkgdG8gd2hpY2ggeW91IGNhbiB1c2UgZm9yIGRldGVybWluaW5nIHNlbGVjdCBhbGxcclxuICAgKiByb3dzIG9uIGN1cnJlbnQgcGFnZSBvciBub3QuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgRGF0YXRhYmxlQ29tcG9uZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VsZWN0QWxsUm93c09uUGFnZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgZm9yIHJvdyB2aXJ0dWFsaXphdGlvbiBvbiAvIG9mZlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZpcnR1YWxpemF0aW9uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVHJlZSBmcm9tIHJlbGF0aW9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHJlZUZyb21SZWxhdGlvbjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUcmVlIHRvIHJlbGF0aW9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHJlZVRvUmVsYXRpb246IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGZvciBzd2l0Y2hpbmcgc3VtbWFyeSByb3cgb24gLyBvZmZcclxuICAgKi9cclxuICBASW5wdXQoKSBzdW1tYXJ5Um93OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgaGVpZ2h0IG9mIHN1bW1hcnkgcm93XHJcbiAgICovXHJcbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodDogbnVtYmVyID0gMzA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcHJvcGVydHkgaG9sZHMgYSBzdW1tYXJ5IHJvdyBwb3NpdGlvbjogdG9wL2JvdHRvbVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN1bW1hcnlQb3NpdGlvbjogc3RyaW5nID0gJ3RvcCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEJvZHkgd2FzIHNjcm9sbGVkIHR5cGljYWxseSBpbiBhIGBzY3JvbGxiYXJWOnRydWVgIHNjZW5hcmlvLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzY3JvbGw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBBIGNlbGwgb3Igcm93IHdhcyBmb2N1c2VkIHZpYSBrZXlib2FyZCBvciBtb3VzZSBjbGljay5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBBIGNlbGwgb3Igcm93IHdhcyBzZWxlY3RlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29sdW1uIHNvcnQgd2FzIGludm9rZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBJY2UgY29sdW1uIGZpbHRlciB3YXMgaW52b2tlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgZmlsdGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRhYmxlIHdhcyBwYWdlZCBlaXRoZXIgdHJpZ2dlcmVkIGJ5IHRoZSBwYWdlciBvciB0aGUgYm9keSBzY3JvbGwuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBDb2x1bW5zIHdlcmUgcmUtb3JkZXJlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbHVtbiB3YXMgcmVzaXplZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVzaXplOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnRleHQgbWVudSB3YXMgaW52b2tlZCBvbiB0aGUgdGFibGUuXHJcbiAgICogdHlwZSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgaGVhZGVyIG9yIHRoZSBib2R5IHdhcyBjbGlja2VkLlxyXG4gICAqIGNvbnRlbnQgY29udGFpbnMgZWl0aGVyIHRoZSBjb2x1bW4gb3IgdGhlIHJvdyB0aGF0IHdhcyBjbGlja2VkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSB0YWJsZUNvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyB0eXBlOiBDb250ZXh0bWVudVR5cGU7IGNvbnRlbnQ6IGFueSB9PihmYWxzZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcm93IHdhcyBleHBhbmRlZCBvdCBjb2xsYXBzZWQgZm9yIHRyZWVcclxuICAgKi9cclxuICBAT3V0cHV0KCkgdHJlZUFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIGlmIHRoZSBoZWFkZXIgaGVpZ2h0IGlmIGZpeGVkIGhlaWdodC5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZpeGVkLWhlYWRlcicpXHJcbiAgZ2V0IGlzRml4ZWRIZWFkZXIoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBoZWFkZXJIZWlnaHQ6IG51bWJlciB8IHN0cmluZyA9IHRoaXMuaGVhZGVySGVpZ2h0O1xyXG4gICAgcmV0dXJuIHR5cGVvZiBoZWFkZXJIZWlnaHQgPT09ICdzdHJpbmcnID8gPHN0cmluZz5oZWFkZXJIZWlnaHQgIT09ICdhdXRvJyA6IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50IGlmXHJcbiAgICogdGhlIHJvdyBoZWlnaHRzIGFyZSBmaXhlZCBoZWlnaHRzLlxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZml4ZWQtcm93JylcclxuICBnZXQgaXNGaXhlZFJvdygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnJvd0hlaWdodCAhPT0gJ2F1dG8nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBlbGVtZW50IGlmXHJcbiAgICogdmVydGljYWwgc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zY3JvbGwtdmVydGljYWwnKVxyXG4gIGdldCBpc1ZlcnRTY3JvbGwoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxiYXJWO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBlbGVtZW50IGlmXHJcbiAgICogdmlydHVhbGl6YXRpb24gaXMgZW5hYmxlZC5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnZpcnR1YWxpemVkJylcclxuICBnZXQgaXNWaXJ0dWFsaXplZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnZpcnR1YWxpemF0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudFxyXG4gICAqIGlmIHRoZSBob3J6aW9udGFsIHNjcm9sbGluZyBpcyBlbmFibGVkLlxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2Nyb2xsLWhvcnonKVxyXG4gIGdldCBpc0hvclNjcm9sbCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNjcm9sbGJhckg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGVsZW1lbnQgaXMgc2VsZWN0YWJsZS5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGFibGUnKVxyXG4gIGdldCBpc1NlbGVjdGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGlzIGNoZWNrYm94IHNlbGVjdGlvbi5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNoZWNrYm94LXNlbGVjdGlvbicpXHJcbiAgZ2V0IGlzQ2hlY2tib3hTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLmNoZWNrYm94O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBpZiBjZWxsIHNlbGVjdGlvbi5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNlbGwtc2VsZWN0aW9uJylcclxuICBnZXQgaXNDZWxsU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5jZWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBpZiBzaW5nbGUgc2VsZWN0LlxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2luZ2xlLXNlbGVjdGlvbicpXHJcbiAgZ2V0IGlzU2luZ2xlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5zaW5nbGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYWRkZWQgdG8gcm9vdCBlbGVtZW50IGlmIG11bGl0IHNlbGVjdFxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MubXVsdGktc2VsZWN0aW9uJylcclxuICBnZXQgaXNNdWx0aVNlbGVjdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYWRkZWQgdG8gcm9vdCBlbGVtZW50IGlmIG11bGl0IGNsaWNrIHNlbGVjdFxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MubXVsdGktY2xpY2stc2VsZWN0aW9uJylcclxuICBnZXQgaXNNdWx0aUNsaWNrU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5tdWx0aUNsaWNrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29sdW1uIHRlbXBsYXRlcyBnYXRoZXJlZCBmcm9tIGBDb250ZW50Q2hpbGRyZW5gXHJcbiAgICogaWYgZGVzY3JpYmVkIGluIHlvdXIgbWFya3VwLlxyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlKVxyXG4gIHNldCBjb2x1bW5UZW1wbGF0ZXModmFsOiBRdWVyeUxpc3Q8RGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlPikge1xyXG4gICAgdGhpcy5fY29sdW1uVGVtcGxhdGVzID0gdmFsO1xyXG4gICAgdGhpcy50cmFuc2xhdGVDb2x1bW5zKHZhbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjb2x1bW4gdGVtcGxhdGVzLlxyXG4gICAqL1xyXG4gIGdldCBjb2x1bW5UZW1wbGF0ZXMoKTogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtblRlbXBsYXRlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvdyBEZXRhaWwgdGVtcGxhdGVzIGdhdGhlcmVkIGZyb20gdGhlIENvbnRlbnRDaGlsZFxyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICByb3dEZXRhaWw6IERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogR3JvdXAgSGVhZGVyIHRlbXBsYXRlcyBnYXRoZXJlZCBmcm9tIHRoZSBDb250ZW50Q2hpbGRcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkKERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICBncm91cEhlYWRlcjogRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvb3RlciB0ZW1wbGF0ZSBnYXRoZXJlZCBmcm9tIHRoZSBDb250ZW50Q2hpbGRcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkKERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgZm9vdGVyOiBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgYm9keSBjb21wb25lbnQgZm9yIG1hbnVhbGx5XHJcbiAgICogaW52b2tpbmcgZnVuY3Rpb25zIG9uIHRoZSBib2R5LlxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoRGF0YVRhYmxlQm9keUNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgYm9keUNvbXBvbmVudDogRGF0YVRhYmxlQm9keUNvbXBvbmVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBoZWFkZXIgY29tcG9uZW50IGZvciBtYW51YWxseVxyXG4gICAqIGludm9raW5nIGZ1bmN0aW9ucyBvbiB0aGUgaGVhZGVyLlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIERhdGF0YWJsZUNvbXBvbmVudFxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICBoZWFkZXJDb21wb25lbnQ6IERhdGFUYWJsZUhlYWRlckNvbXBvbmVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBpZiBhbGwgcm93cyBhcmUgc2VsZWN0ZWQuXHJcbiAgICovXHJcbiAgZ2V0IGFsbFJvd3NTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgIGxldCBhbGxSb3dzU2VsZWN0ZWQgPSB0aGlzLnJvd3MgJiYgdGhpcy5zZWxlY3RlZCAmJiB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gdGhpcy5yb3dzLmxlbmd0aDtcclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RBbGxSb3dzT25QYWdlKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLmJvZHlDb21wb25lbnQuaW5kZXhlcztcclxuICAgICAgY29uc3Qgcm93c09uUGFnZSA9IGluZGV4ZXMubGFzdCAtIGluZGV4ZXMuZmlyc3Q7XHJcbiAgICAgIGFsbFJvd3NTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSByb3dzT25QYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkICYmIHRoaXMucm93cyAmJiB0aGlzLnJvd3MubGVuZ3RoICE9PSAwICYmIGFsbFJvd3NTZWxlY3RlZDtcclxuICB9XHJcblxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIF9pbm5lcldpZHRoOiBudW1iZXI7XHJcbiAgcGFnZVNpemU6IG51bWJlcjtcclxuICBib2R5SGVpZ2h0OiBudW1iZXI7XHJcbiAgcm93Q291bnQ6IG51bWJlciA9IDA7XHJcbiAgcm93RGlmZmVyOiBLZXlWYWx1ZURpZmZlcjx7fSwge30+O1xyXG5cclxuICBfb2Zmc2V0WCA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XHJcbiAgX2xpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gIF9vZmZzZXQ6IG51bWJlciA9IDA7XHJcbiAgX3Jvd3M6IGFueVtdO1xyXG4gIF9ncm91cFJvd3NCeTogc3RyaW5nO1xyXG4gIF9pbnRlcm5hbFJvd3M6IGFueVtdO1xyXG4gIF9pbnRlcm5hbENvbHVtbnM6IFRhYmxlQ29sdW1uW107XHJcbiAgX2NvbHVtbnM6IFRhYmxlQ29sdW1uW107XHJcbiAgX2NvbHVtblRlbXBsYXRlczogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZT47XHJcbiAgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgcmVzaXplU2Vuc29yOiBSZXNpemVTZW5zb3I7XHJcbiAgcmVjYWxjdWxhdGUkID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2tpcFNlbGYoKSBwcml2YXRlIHNjcm9sbGJhckhlbHBlcjogU2Nyb2xsYmFySGVscGVyLFxyXG4gICAgQFNraXBTZWxmKCkgcHJpdmF0ZSBkaW1lbnNpb25zSGVscGVyOiBEaW1lbnNpb25zSGVscGVyLFxyXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxyXG4gICAgcHJpdmF0ZSBjb2x1bW5DaGFuZ2VzU2VydmljZTogQ29sdW1uQ2hhbmdlc1NlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdjb25maWd1cmF0aW9uJykgcHJpdmF0ZSBjb25maWd1cmF0aW9uOiBJTmd4RGF0YXRhYmxlQ29uZmlnXHJcbiAgKSB7XHJcbiAgICAvLyBnZXQgcmVmIHRvIGVsbSBmb3IgbWVhc3VyaW5nXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLnJvd0RpZmZlciA9IGRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XHJcblxyXG4gICAgLy8gYXBwbHkgZ2xvYmFsIHNldHRpbmdzIGZyb20gTW9kdWxlLmZvclJvb3RcclxuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24gJiYgdGhpcy5jb25maWd1cmF0aW9uLm1lc3NhZ2VzKSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZXMgPSB7IC4uLnRoaXMuY29uZmlndXJhdGlvbi5tZXNzYWdlcyB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZFxyXG4gICAqIHByb3BlcnRpZXMgb2YgYSBkaXJlY3RpdmUgYXJlIGluaXRpYWxpemVkLlxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gbmVlZCB0byBjYWxsIHRoaXMgaW1tZWRpYXRseSB0byBzaXplXHJcbiAgICAvLyBpZiB0aGUgdGFibGUgaXMgaGlkZGVuIHRoZSB2aXNpYmlsaXR5XHJcbiAgICAvLyBsaXN0ZW5lciB3aWxsIGludm9rZSB0aGlzIGl0c2VsZiB1cG9uIHNob3dcclxuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcclxuICAgIGlmIChSZXNpemVTZW5zb3IpIHtcclxuICAgICAgdGhpcy5yZXNpemVTZW5zb3IgPSBuZXcgUmVzaXplU2Vuc29yKHRoaXMuZWxlbWVudCwgKCkgPT4gdGhpcy5yZWNhbGN1bGF0ZSQubmV4dCgpKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVjYWxjdWxhdGUkLnBpcGUodGhyb3R0bGVUaW1lKDEwMCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlY2FsY3VsYXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgYSBjb21wb25lbnQnc1xyXG4gICAqIHZpZXcgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuXHJcbiAgICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmV4dGVybmFsU29ydGluZykge1xyXG4gICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIGhhcyB0byBiZSBkb25lIHRvIHByZXZlbnQgdGhlIGNoYW5nZSBkZXRlY3Rpb25cclxuICAgIC8vIHRyZWUgZnJvbSBmcmVha2luZyBvdXQgYmVjYXVzZSB3ZSBhcmUgcmVhZGp1c3RpbmdcclxuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xyXG5cclxuICAgICAgLy8gZW1pdCBwYWdlIGZvciB2aXJ0dWFsIHNlcnZlci1zaWRlIGtpY2tvZmZcclxuICAgICAgaWYgKHRoaXMuZXh0ZXJuYWxQYWdpbmcgJiYgdGhpcy5zY3JvbGxiYXJWKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmVtaXQoe1xyXG4gICAgICAgICAgY291bnQ6IHRoaXMuY291bnQsXHJcbiAgICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcclxuICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxyXG4gICAgICAgICAgb2Zmc2V0OiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgYSBjb21wb25lbnQnc1xyXG4gICAqIGNvbnRlbnQgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuXHJcbiAgICovXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgdGhpcy5jb2x1bW5UZW1wbGF0ZXMuY2hhbmdlcy5zdWJzY3JpYmUodiA9PiB0aGlzLnRyYW5zbGF0ZUNvbHVtbnModikpO1xyXG4gICAgdGhpcy5saXN0ZW5Gb3JDb2x1bW5JbnB1dENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgd2lsbCBiZSB1c2VkIHdoZW4gZGlzcGxheWluZyBvciBzZWxlY3Rpbmcgcm93cy5cclxuICAgKiB3aGVuIHRyYWNraW5nL2NvbXBhcmluZyB0aGVtLCB3ZSdsbCB1c2UgdGhlIHZhbHVlIG9mIHRoaXMgZm4sXHJcbiAgICpcclxuICAgKiAoYGZuKHgpID09PSBmbih5KWAgaW5zdGVhZCBvZiBgeCA9PT0geWApXHJcbiAgICovXHJcbiAgQElucHV0KCkgcm93SWRlbnRpdHk6ICh4OiBhbnkpID0+IGFueSA9ICh4OiBhbnkpID0+IHtcclxuICAgIGlmICh0aGlzLl9ncm91cFJvd3NCeSkge1xyXG4gICAgICAvLyBlYWNoIGdyb3VwIGluIGdyb3VwZWRSb3dzIGFyZSBzdG9yZWQgYXMge2tleSwgdmFsdWU6IFtyb3dzXX0sXHJcbiAgICAgIC8vIHdoZXJlIGtleSBpcyB0aGUgZ3JvdXBSb3dzQnkgaW5kZXhcclxuICAgICAgcmV0dXJuIHgua2V5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlcyB0aGUgdGVtcGxhdGVzIHRvIHRoZSBjb2x1bW4gb2JqZWN0c1xyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUNvbHVtbnModmFsOiBhbnkpIHtcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgY29uc3QgYXJyID0gdmFsLnRvQXJyYXkoKTtcclxuICAgICAgaWYgKGFyci5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSB0cmFuc2xhdGVUZW1wbGF0ZXMoYXJyKTtcclxuICAgICAgICBzZXRDb2x1bW5EZWZhdWx0cyh0aGlzLl9pbnRlcm5hbENvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKCk7XHJcbiAgICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG1hcCB3aXRoIHRoZSBkYXRhIGdyb3VwZWQgYnkgdGhlIHVzZXIgY2hvaWNlIG9mIGdyb3VwaW5nIGluZGV4XHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3JpZ2luYWxBcnJheSB0aGUgb3JpZ2luYWwgYXJyYXkgcGFzc2VkIHZpYSBwYXJhbWV0ZXJcclxuICAgKiBAcGFyYW0gZ3JvdXBCeUluZGV4ICB0aGUgaW5kZXggb2YgdGhlIGNvbHVtbiB0byBncm91cCB0aGUgZGF0YSBieVxyXG4gICAqL1xyXG4gIGdyb3VwQXJyYXlCeShvcmlnaW5hbEFycmF5OiBhbnksIGdyb3VwQnk6IGFueSkge1xyXG4gICAgLy8gY3JlYXRlIGEgbWFwIHRvIGhvbGQgZ3JvdXBzIHdpdGggdGhlaXIgY29ycmVzcG9uZGluZyByZXN1bHRzXHJcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XHJcbiAgICBsZXQgaTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBvcmlnaW5hbEFycmF5LmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBpdGVtW2dyb3VwQnldO1xyXG4gICAgICBpZiAoIW1hcC5oYXMoa2V5KSkge1xyXG4gICAgICAgIG1hcC5zZXQoa2V5LCBbaXRlbV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1hcC5nZXQoa2V5KS5wdXNoKGl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICAgIGkrKztcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGFkZEdyb3VwID0gKGtleTogYW55LCB2YWx1ZTogYW55KSA9PiB7XHJcbiAgICAgIHJldHVybiB7IGtleSwgdmFsdWUgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gY29udmVydCBtYXAgYmFjayB0byBhIHNpbXBsZSBhcnJheSBvZiBvYmplY3RzXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShtYXAsIHggPT4gYWRkR3JvdXAoeFswXSwgeFsxXSkpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIEFuZ3VsYXIgZGlydHkgY2hlY2tzIGEgZGlyZWN0aXZlLlxyXG4gICAqL1xyXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJvd0RpZmZlci5kaWZmKHRoaXMucm93cykpIHtcclxuICAgICAgaWYgKCF0aGlzLmV4dGVybmFsU29ydGluZykge1xyXG4gICAgICAgIHRoaXMuc29ydEludGVybmFsUm93cygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2ludGVybmFsUm93cyA9IFsuLi50aGlzLnJvd3NdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhdXRvIGdyb3VwIGJ5IHBhcmVudCBvbiBuZXcgdXBkYXRlXHJcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyA9IGdyb3VwUm93c0J5UGFyZW50cyhcclxuICAgICAgICB0aGlzLl9pbnRlcm5hbFJvd3MsXHJcbiAgICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZUZyb21SZWxhdGlvbiksXHJcbiAgICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZVRvUmVsYXRpb24pXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLnJlY2FsY3VsYXRlUGFnZXMoKTtcclxuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY2FsYydzIHRoZSBzaXplcyBvZiB0aGUgZ3JpZC5cclxuICAgKlxyXG4gICAqIFVwZGF0ZWQgYXV0b21hdGljYWxseSBvbiBjaGFuZ2VzIHRvOlxyXG4gICAqXHJcbiAgICogIC0gQ29sdW1uc1xyXG4gICAqICAtIFJvd3NcclxuICAgKiAgLSBQYWdpbmcgcmVsYXRlZFxyXG4gICAqXHJcbiAgICogQWxzbyBjYW4gYmUgbWFudWFsbHkgaW52b2tlZCBvciB1cG9uIHdpbmRvdyByZXNpemUuXHJcbiAgICovXHJcbiAgcmVjYWxjdWxhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlRGltcygpO1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoKTtcclxuICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XHJcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWx1bGNhdGVzIHRoZSBjb2x1bW4gd2lkdGhzIGJhc2VkIG9uIGNvbHVtbiB3aWR0aFxyXG4gICAqIGRpc3RyaWJ1dGlvbiBtb2RlIGFuZCBzY3JvbGxiYXIgb2Zmc2V0cy5cclxuICAgKi9cclxuICByZWNhbGN1bGF0ZUNvbHVtbnMoXHJcbiAgICBjb2x1bW5zOiBhbnlbXSA9IHRoaXMuX2ludGVybmFsQ29sdW1ucyxcclxuICAgIGZvcmNlSWR4OiBudW1iZXIgPSAtMSxcclxuICAgIGFsbG93QmxlZWQ6IGJvb2xlYW4gPSB0aGlzLnNjcm9sbGJhckhcclxuICApOiBhbnlbXSB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAoIWNvbHVtbnMpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgbGV0IHdpZHRoID0gdGhpcy5faW5uZXJXaWR0aDtcclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYpIHtcclxuICAgICAgd2lkdGggPSB3aWR0aCAtIHRoaXMuc2Nyb2xsYmFySGVscGVyLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbHVtbk1vZGUgPT09IENvbHVtbk1vZGUuZm9yY2UpIHtcclxuICAgICAgZm9yY2VGaWxsQ29sdW1uV2lkdGhzKGNvbHVtbnMsIHdpZHRoLCBmb3JjZUlkeCwgYWxsb3dCbGVlZCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uTW9kZSA9PT0gQ29sdW1uTW9kZS5mbGV4KSB7XHJcbiAgICAgIGFkanVzdENvbHVtbldpZHRocyhjb2x1bW5zLCB3aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWNhbGN1bGF0ZXMgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIHRhYmxlIHNpemUuXHJcbiAgICogSW50ZXJuYWxseSBjYWxscyB0aGUgcGFnZSBzaXplIGFuZCByb3cgY291bnQgY2FsY3MgdG9vLlxyXG4gICAqXHJcbiAgICovXHJcbiAgcmVjYWxjdWxhdGVEaW1zKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGltcyA9IHRoaXMuZGltZW5zaW9uc0hlbHBlci5nZXREaW1lbnNpb25zKHRoaXMuZWxlbWVudCk7XHJcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gTWF0aC5mbG9vcihkaW1zLndpZHRoKTtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XHJcbiAgICAgIGxldCBoZWlnaHQgPSBkaW1zLmhlaWdodDtcclxuICAgICAgaWYgKHRoaXMuaGVhZGVySGVpZ2h0KSBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmhlYWRlckhlaWdodDtcclxuICAgICAgaWYgKHRoaXMuZm9vdGVySGVpZ2h0KSBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmZvb3RlckhlaWdodDtcclxuICAgICAgdGhpcy5ib2R5SGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVjYWxjdWxhdGVQYWdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBwYWdlcyBhZnRlciBhIHVwZGF0ZS5cclxuICAgKi9cclxuICByZWNhbGN1bGF0ZVBhZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9IHRoaXMuY2FsY1BhZ2VTaXplKCk7XHJcbiAgICB0aGlzLnJvd0NvdW50ID0gdGhpcy5jYWxjUm93Q291bnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJvZHkgdHJpZ2dlcmVkIGEgcGFnZSBldmVudC5cclxuICAgKi9cclxuICBvbkJvZHlQYWdlKHsgb2Zmc2V0IH06IGFueSk6IHZvaWQge1xyXG4gICAgLy8gQXZvaWQgcGFnaW5hdGlvbiBjYW1pbmcgZnJvbSBib2R5IGV2ZW50cyBsaWtlIHNjcm9sbCB3aGVuIHRoZSB0YWJsZVxyXG4gICAgLy8gaGFzIG5vIHZpcnR1YWxpemF0aW9uIGFuZCB0aGUgZXh0ZXJuYWwgcGFnaW5nIGlzIGVuYWJsZS5cclxuICAgIC8vIFRoaXMgbWVhbnMsIGxldCdzIHRoZSBkZXZlbG9wZXIgaGFuZGxlIHBhZ2luYXRpb24gYnkgbXkgaGltKGhlcikgc2VsZlxyXG4gICAgaWYgKHRoaXMuZXh0ZXJuYWxQYWdpbmcgJiYgIXRoaXMudmlydHVhbGl6YXRpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG5cclxuICAgIHRoaXMucGFnZS5lbWl0KHtcclxuICAgICAgY291bnQ6IHRoaXMuY291bnQsXHJcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxyXG4gICAgICBsaW1pdDogdGhpcy5saW1pdCxcclxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgYm9keSB0cmlnZ2VyZWQgYSBzY3JvbGwgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Cb2R5U2Nyb2xsKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9vZmZzZXRYLm5leHQoZXZlbnQub2Zmc2V0WCk7XHJcbiAgICB0aGlzLnNjcm9sbC5lbWl0KGV2ZW50KTtcclxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZvb3RlciB0cmlnZ2VyZWQgYSBwYWdlIGV2ZW50LlxyXG4gICAqL1xyXG4gIG9uRm9vdGVyUGFnZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLm9mZnNldCA9IGV2ZW50LnBhZ2UgLSAxO1xyXG4gICAgdGhpcy5ib2R5Q29tcG9uZW50LnVwZGF0ZU9mZnNldFkodGhpcy5vZmZzZXQpO1xyXG5cclxuICAgIHRoaXMucGFnZS5lbWl0KHtcclxuICAgICAgY291bnQ6IHRoaXMuY291bnQsXHJcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxyXG4gICAgICBsaW1pdDogdGhpcy5saW1pdCxcclxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XHJcbiAgICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xyXG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBzaXplcyBvZiB0aGUgcGFnZVxyXG4gICAqL1xyXG4gIGNhbGNQYWdlU2l6ZSh2YWw6IGFueVtdID0gdGhpcy5yb3dzKTogbnVtYmVyIHtcclxuICAgIC8vIEtlZXAgdGhlIHBhZ2Ugc2l6ZSBjb25zdGFudCBldmVuIGlmIHRoZSByb3cgaGFzIGJlZW4gZXhwYW5kZWQuXHJcbiAgICAvLyBUaGlzIGlzIGJlY2F1c2UgYW4gZXhwYW5kZWQgcm93IGlzIHN0aWxsIGNvbnNpZGVyZWQgdG8gYmUgYSBjaGlsZCBvZlxyXG4gICAgLy8gdGhlIG9yaWdpbmFsIHJvdy4gIEhlbmNlIGNhbGN1bGF0aW9uIHdvdWxkIHVzZSByb3dIZWlnaHQgb25seS5cclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbikge1xyXG4gICAgICBjb25zdCBzaXplID0gTWF0aC5jZWlsKHRoaXMuYm9keUhlaWdodCAvICh0aGlzLnJvd0hlaWdodCBhcyBudW1iZXIpKTtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KHNpemUsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGxpbWl0IGlzIHBhc3NlZCwgd2UgYXJlIHBhZ2luZ1xyXG4gICAgaWYgKHRoaXMubGltaXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5saW1pdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvdGhlcndpc2UgdXNlIHJvdyBsZW5ndGhcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb3RoZXIgZW1wdHkgOihcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyB0aGUgcm93IGNvdW50LlxyXG4gICAqL1xyXG4gIGNhbGNSb3dDb3VudCh2YWw6IGFueVtdID0gdGhpcy5yb3dzKTogbnVtYmVyIHtcclxuICAgIGlmICghdGhpcy5leHRlcm5hbFBhZ2luZykge1xyXG4gICAgICBpZiAoIXZhbCkgcmV0dXJuIDA7XHJcblxyXG4gICAgICBpZiAodGhpcy5ncm91cGVkUm93cykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwZWRSb3dzLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRyZWVGcm9tUmVsYXRpb24gIT0gbnVsbCAmJiB0aGlzLnRyZWVUb1JlbGF0aW9uICE9IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxSb3dzLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmNvdW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb250ZXh0bWVudSBldmVudC5cclxuICAgKi9cclxuICBvbkNvbHVtbkNvbnRleHRtZW51KHsgZXZlbnQsIGNvbHVtbiB9OiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMudGFibGVDb250ZXh0bWVudS5lbWl0KHsgZXZlbnQsIHR5cGU6IENvbnRleHRtZW51VHlwZS5oZWFkZXIsIGNvbnRlbnQ6IGNvbHVtbiB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBib2R5IHRyaWdnZXJlZCBhIGNvbnRleHRtZW51IGV2ZW50LlxyXG4gICAqL1xyXG4gIG9uUm93Q29udGV4dG1lbnUoeyBldmVudCwgcm93IH06IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy50YWJsZUNvbnRleHRtZW51LmVtaXQoeyBldmVudCwgdHlwZTogQ29udGV4dG1lbnVUeXBlLmJvZHksIGNvbnRlbnQ6IHJvdyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWFkZXIgdHJpZ2dlcmVkIGEgY29sdW1uIHJlc2l6ZSBldmVudC5cclxuICAgKi9cclxuICBvbkNvbHVtblJlc2l6ZSh7IGNvbHVtbiwgbmV3VmFsdWUgfTogYW55KTogdm9pZCB7XHJcbiAgICAvKiBTYWZhcmkvaU9TIDEwLjIgd29ya2Fyb3VuZCAqL1xyXG4gICAgaWYgKGNvbHVtbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaWR4OiBudW1iZXI7XHJcbiAgICBjb25zdCBjb2xzID0gdGhpcy5faW50ZXJuYWxDb2x1bW5zLm1hcCgoYywgaSkgPT4ge1xyXG4gICAgICBjID0geyAuLi5jIH07XHJcblxyXG4gICAgICBpZiAoYy4kJGlkID09PSBjb2x1bW4uJCRpZCkge1xyXG4gICAgICAgIGlkeCA9IGk7XHJcbiAgICAgICAgYy53aWR0aCA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhpcyBzbyB3ZSBjYW4gZm9yY2UgdGhlIGNvbHVtblxyXG4gICAgICAgIC8vIHdpZHRoIGRpc3RyaWJ1dGlvbiB0byBiZSB0byB0aGlzIHZhbHVlXHJcbiAgICAgICAgYy4kJG9sZFdpZHRoID0gbmV3VmFsdWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBjO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoY29scywgaWR4KTtcclxuICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IGNvbHM7XHJcblxyXG4gICAgdGhpcy5yZXNpemUuZW1pdCh7XHJcbiAgICAgIGNvbHVtbixcclxuICAgICAgbmV3VmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb2x1bW4gcmUtb3JkZXIgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Db2x1bW5SZW9yZGVyKHsgY29sdW1uLCBuZXdWYWx1ZSwgcHJldlZhbHVlIH06IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgY29scyA9IHRoaXMuX2ludGVybmFsQ29sdW1ucy5tYXAoYyA9PiB7XHJcbiAgICAgIHJldHVybiB7IC4uLmMgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnN3YXBDb2x1bW5zKSB7XHJcbiAgICAgIGNvbnN0IHByZXZDb2wgPSBjb2xzW25ld1ZhbHVlXTtcclxuICAgICAgY29sc1tuZXdWYWx1ZV0gPSBjb2x1bW47XHJcbiAgICAgIGNvbHNbcHJldlZhbHVlXSA9IHByZXZDb2w7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobmV3VmFsdWUgPiBwcmV2VmFsdWUpIHtcclxuICAgICAgICBjb25zdCBtb3ZlZENvbCA9IGNvbHNbcHJldlZhbHVlXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gcHJldlZhbHVlOyBpIDwgbmV3VmFsdWU7IGkrKykge1xyXG4gICAgICAgICAgY29sc1tpXSA9IGNvbHNbaSArIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb2xzW25ld1ZhbHVlXSA9IG1vdmVkQ29sO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG1vdmVkQ29sID0gY29sc1twcmV2VmFsdWVdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBwcmV2VmFsdWU7IGkgPiBuZXdWYWx1ZTsgaS0tKSB7XHJcbiAgICAgICAgICBjb2xzW2ldID0gY29sc1tpIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbHNbbmV3VmFsdWVdID0gbW92ZWRDb2w7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSBjb2xzO1xyXG5cclxuICAgIHRoaXMucmVvcmRlci5lbWl0KHtcclxuICAgICAgY29sdW1uLFxyXG4gICAgICBuZXdWYWx1ZSxcclxuICAgICAgcHJldlZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uQ29sdW1uRmlsdGVyKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuZmlsdGVyLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb2x1bW4gc29ydCBldmVudC5cclxuICAgKi9cclxuICBvbkNvbHVtblNvcnQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gY2xlYW4gc2VsZWN0ZWQgcm93c1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XHJcbiAgICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xyXG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc29ydHMgPSBldmVudC5zb3J0cztcclxuXHJcbiAgICAvLyB0aGlzIGNvdWxkIGJlIG9wdGltaXplZCBiZXR0ZXIgc2luY2UgaXQgd2lsbCByZXNvcnRcclxuICAgIC8vIHRoZSByb3dzIGFnYWluIG9uIHRoZSAncHVzaCcgZGV0ZWN0aW9uLi4uXHJcbiAgICBpZiAodGhpcy5leHRlcm5hbFNvcnRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgIC8vIGRvbid0IHVzZSBub3JtYWwgc2V0dGVyIHNvIHdlIGRvbid0IHJlc29ydFxyXG4gICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhdXRvIGdyb3VwIGJ5IHBhcmVudCBvbiBuZXcgdXBkYXRlXHJcbiAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBncm91cFJvd3NCeVBhcmVudHMoXHJcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyxcclxuICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZUZyb21SZWxhdGlvbiksXHJcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVUb1JlbGF0aW9uKVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBBbHdheXMgZ28gdG8gZmlyc3QgcGFnZSB3aGVuIHNvcnRpbmcgdG8gc2VlIHRoZSBuZXdseSBzb3J0ZWQgZGF0YVxyXG4gICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgdGhpcy5ib2R5Q29tcG9uZW50LnVwZGF0ZU9mZnNldFkodGhpcy5vZmZzZXQpO1xyXG4gICAgdGhpcy5zb3J0LmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIGFsbCByb3cgc2VsZWN0aW9uXHJcbiAgICovXHJcbiAgb25IZWFkZXJTZWxlY3QoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xyXG4gICAgICAvLyBiZWZvcmUgd2Ugc3BsaWNlLCBjaGsgaWYgd2UgY3VycmVudGx5IGhhdmUgYWxsIHNlbGVjdGVkXHJcbiAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5ib2R5Q29tcG9uZW50LmluZGV4ZXMuZmlyc3Q7XHJcbiAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmJvZHlDb21wb25lbnQuaW5kZXhlcy5sYXN0O1xyXG4gICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSBsYXN0IC0gZmlyc3Q7XHJcblxyXG4gICAgICAvLyByZW1vdmUgYWxsIGV4aXN0aW5nIGVpdGhlciB3YXlcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xyXG5cclxuICAgICAgLy8gZG8gdGhlIG9wcG9zaXRlIGhlcmVcclxuICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi50aGlzLl9pbnRlcm5hbFJvd3Muc2xpY2UoZmlyc3QsIGxhc3QpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gYmVmb3JlIHdlIHNwbGljZSwgY2hrIGlmIHdlIGN1cnJlbnRseSBoYXZlIGFsbCBzZWxlY3RlZFxyXG4gICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSB0aGlzLnJvd3MubGVuZ3RoO1xyXG4gICAgICAvLyByZW1vdmUgYWxsIGV4aXN0aW5nIGVpdGhlciB3YXlcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xyXG4gICAgICAvLyBkbyB0aGUgb3Bwb3NpdGUgaGVyZVxyXG4gICAgICBpZiAoIWFsbFNlbGVjdGVkKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnRoaXMucm93cyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHtcclxuICAgICAgc2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSByb3cgd2FzIHNlbGVjdGVkIGZyb20gYm9keVxyXG4gICAqL1xyXG4gIG9uQm9keVNlbGVjdChldmVudDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcm93IHdhcyBleHBhbmRlZCBvciBjb2xsYXBzZWQgZm9yIHRyZWVcclxuICAgKi9cclxuICBvblRyZWVBY3Rpb24oZXZlbnQ6IGFueSkge1xyXG4gICAgY29uc3Qgcm93ID0gZXZlbnQucm93O1xyXG4gICAgLy8gVE9ETzogRm9yIGR1cGxpY2F0ZWQgaXRlbXMgdGhpcyB3aWxsIG5vdCB3b3JrXHJcbiAgICBjb25zdCByb3dJbmRleCA9IHRoaXMuX3Jvd3MuZmluZEluZGV4KHIgPT4gclt0aGlzLnRyZWVUb1JlbGF0aW9uXSA9PT0gZXZlbnQucm93W3RoaXMudHJlZVRvUmVsYXRpb25dKTtcclxuICAgIHRoaXMudHJlZUFjdGlvbi5lbWl0KHsgcm93LCByb3dJbmRleCB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSk7XHJcbiAgICBpZiAodGhpcy5yZXNpemVTZW5zb3IpIHtcclxuICAgICAgdGhpcy5yZXNpemVTZW5zb3IuZGV0YWNoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsaXN0ZW4gZm9yIGNoYW5nZXMgdG8gaW5wdXQgYmluZGluZ3Mgb2YgYWxsIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSBhbmRcclxuICAgKiB0cmlnZ2VyIHRoZSBjb2x1bW5UZW1wbGF0ZXMuY2hhbmdlcyBvYnNlcnZhYmxlIHRvIGVtaXRcclxuICAgKi9cclxuICBwcml2YXRlIGxpc3RlbkZvckNvbHVtbklucHV0Q2hhbmdlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5jb2x1bW5DaGFuZ2VzU2VydmljZS5jb2x1bW5JbnB1dENoYW5nZXMkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uVGVtcGxhdGVzKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbHVtblRlbXBsYXRlcy5ub3RpZnlPbkNoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzb3J0SW50ZXJuYWxSb3dzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5faW50ZXJuYWxSb3dzID0gc29ydFJvd3ModGhpcy5faW50ZXJuYWxSb3dzLCB0aGlzLl9pbnRlcm5hbENvbHVtbnMsIHRoaXMuc29ydHMpO1xyXG4gIH1cclxufVxyXG4iXX0=