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
var DatatableComponent = /** @class */ (function () {
    function DatatableComponent(scrollbarHelper, dimensionsHelper, cd, element, differs, columnChangesService, configuration) {
        var _this = this;
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
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
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
    };
    /**
     * Window resize handler to update sizes.
     */
    /**
     * Window resize handler to update sizes.
     * @return {?}
     */
    DatatableComponent.prototype.onWindowResize = /**
     * Window resize handler to update sizes.
     * @return {?}
     */
    function () {
        this.recalculate();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUVmLFNBQVMsRUFFVCxXQUFXLEVBQ1gsWUFBWSxFQUVaLGVBQWUsRUFFZixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixRQUFRLEVBRVIsUUFBUSxFQUNSLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVuRixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JF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Qjs7Ozs7Ozs7SUFRN0IsaURBQXFDOzs7OztJQUtyQyw0Q0FBd0M7Ozs7O0lBS3hDLDhDQUFrQzs7Ozs7SUFLbEMsNENBQWdDOzs7OztJQUtoQyx3Q0FBcUM7Ozs7O0lBS3JDLDJDQUFvQzs7Ozs7SUFLcEMsNkNBQXlDOzs7OztJQUt6QyxvQ0FBeUQ7Ozs7O0lBS3pELHNDQUEyRDs7Ozs7SUFLM0Qsb0NBQXlEOzs7OztJQUt6RCxrQ0FBdUQ7Ozs7O0lBS3ZELGtDQUF1RDs7Ozs7SUFLdkQscUNBQTBEOzs7OztJQUsxRCxvQ0FBeUQ7Ozs7Ozs7SUFPekQsOENBQWlIOzs7OztJQUtqSCx3Q0FBNkQ7Ozs7O0lBbUg3RCx1Q0FDdUM7Ozs7O0lBS3ZDLHlDQUMyQzs7Ozs7SUFLM0Msb0NBQ2lDOzs7Ozs7SUFNakMsMkNBQ3NDOzs7Ozs7OztJQVF0Qyw2Q0FDMEM7O0lBaUIxQyxxQ0FBcUI7O0lBQ3JCLHlDQUFvQjs7SUFDcEIsc0NBQWlCOztJQUNqQix3Q0FBbUI7O0lBQ25CLHNDQUFxQjs7SUFDckIsdUNBQWtDOztJQUVsQyxzQ0FBa0M7O0lBQ2xDLG9DQUEyQjs7SUFDM0Isb0NBQW1COztJQUNuQixxQ0FBb0I7O0lBQ3BCLG1DQUFhOztJQUNiLDBDQUFxQjs7SUFDckIsMkNBQXFCOztJQUNyQiw4Q0FBZ0M7O0lBQ2hDLHNDQUF3Qjs7SUFDeEIsOENBQXNEOztJQUN0RCw0Q0FBb0M7Ozs7Ozs7O0lBNkVwQyx5Q0FRRTs7Ozs7SUFsRkEsNkNBQW9EOzs7OztJQUNwRCw4Q0FBc0Q7Ozs7O0lBQ3RELGdDQUE2Qjs7Ozs7SUFHN0Isa0RBQWtEOzs7OztJQUNsRCwyQ0FBK0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgT25Jbml0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBEb0NoZWNrLFxyXG4gIEtleVZhbHVlRGlmZmVycyxcclxuICBLZXlWYWx1ZURpZmZlcixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBTa2lwU2VsZixcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgSW5qZWN0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vYm9keS9ib2R5LWdyb3VwLWhlYWRlci5kaXJlY3RpdmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSU5neERhdGF0YWJsZUNvbmZpZyB9IGZyb20gJy4uL25neC1kYXRhdGFibGUubW9kdWxlJztcclxuaW1wb3J0IHsgZ3JvdXBSb3dzQnlQYXJlbnRzLCBvcHRpb25hbEdldHRlckZvclByb3AgfSBmcm9tICcuLi91dGlscy90cmVlJztcclxuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XHJcbmltcG9ydCB7IHNldENvbHVtbkRlZmF1bHRzLCB0cmFuc2xhdGVUZW1wbGF0ZXMgfSBmcm9tICcuLi91dGlscy9jb2x1bW4taGVscGVyJztcclxuaW1wb3J0IHsgQ29sdW1uTW9kZSB9IGZyb20gJy4uL3R5cGVzL2NvbHVtbi1tb2RlLnR5cGUnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vdHlwZXMvc2VsZWN0aW9uLnR5cGUnO1xyXG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uL3R5cGVzL3NvcnQudHlwZSc7XHJcbmltcG9ydCB7IENvbnRleHRtZW51VHlwZSB9IGZyb20gJy4uL3R5cGVzL2NvbnRleHRtZW51LnR5cGUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSB9IGZyb20gJy4vcm93LWRldGFpbC9yb3ctZGV0YWlsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSB9IGZyb20gJy4vZm9vdGVyL2Zvb3Rlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9ib2R5L2JvZHkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNjcm9sbGJhckhlbHBlciB9IGZyb20gJy4uL3NlcnZpY2VzL3Njcm9sbGJhci1oZWxwZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbHVtbkNoYW5nZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY29sdW1uLWNoYW5nZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IERpbWVuc2lvbnNIZWxwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9kaW1lbnNpb25zLWhlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGhyb3R0bGVhYmxlIH0gZnJvbSAnLi4vdXRpbHMvdGhyb3R0bGUnO1xyXG5pbXBvcnQgeyBmb3JjZUZpbGxDb2x1bW5XaWR0aHMsIGFkanVzdENvbHVtbldpZHRocyB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xyXG5pbXBvcnQgeyBzb3J0Um93cyB9IGZyb20gJy4uL3V0aWxzL3NvcnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtZGF0YXRhYmxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGF0YXRhYmxlLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHN0eWxlVXJsczogWycuL2RhdGF0YWJsZS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbmd4LWRhdGF0YWJsZSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhdGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQge1xyXG4gIC8qKlxyXG4gICAqIFRlbXBsYXRlIGZvciB0aGUgdGFyZ2V0IG1hcmtlciBvZiBkcmFnIHRhcmdldCBjb2x1bW5zLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRhcmdldE1hcmtlclRlbXBsYXRlOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvd3MgdGhhdCBhcmUgZGlzcGxheWVkIGluIHRoZSB0YWJsZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgcm93cyh2YWw6IGFueSkge1xyXG4gICAgdGhpcy5fcm93cyA9IHZhbDtcclxuXHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyA9IFsuLi52YWxdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF1dG8gc29ydCBvbiBuZXcgdXBkYXRlc1xyXG4gICAgaWYgKCF0aGlzLmV4dGVybmFsU29ydGluZykge1xyXG4gICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhdXRvIGdyb3VwIGJ5IHBhcmVudCBvbiBuZXcgdXBkYXRlXHJcbiAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBncm91cFJvd3NCeVBhcmVudHMoXHJcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyxcclxuICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZUZyb21SZWxhdGlvbiksXHJcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVUb1JlbGF0aW9uKVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyByZWNhbGN1bGF0ZSBzaXplcy9ldGNcclxuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5fcm93cyAmJiB0aGlzLl9ncm91cFJvd3NCeSkge1xyXG4gICAgICAvLyBJZiBhIGNvbHVtbiBoYXMgYmVlbiBzcGVjaWZpZWQgaW4gX2dyb3VwUm93c0J5IGNyZWF0ZWQgYSBuZXcgYXJyYXkgd2l0aCB0aGUgZGF0YSBncm91cGVkIGJ5IHRoYXQgcm93XHJcbiAgICAgIHRoaXMuZ3JvdXBlZFJvd3MgPSB0aGlzLmdyb3VwQXJyYXlCeSh0aGlzLl9yb3dzLCB0aGlzLl9ncm91cFJvd3NCeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHJvd3MuXHJcbiAgICovXHJcbiAgZ2V0IHJvd3MoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9yb3dzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBhdHRyaWJ1dGUgYWxsb3dzIHRoZSB1c2VyIHRvIHNldCB0aGUgbmFtZSBvZiB0aGUgY29sdW1uIHRvIGdyb3VwIHRoZSBkYXRhIHdpdGhcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgZ3JvdXBSb3dzQnkodmFsOiBzdHJpbmcpIHtcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgdGhpcy5fZ3JvdXBSb3dzQnkgPSB2YWw7XHJcbiAgICAgIGlmICh0aGlzLl9yb3dzICYmIHRoaXMuX2dyb3VwUm93c0J5KSB7XHJcbiAgICAgICAgLy8gY3JldGVzIGEgbmV3IGFycmF5IHdpdGggdGhlIGRhdGEgZ3JvdXBlZFxyXG4gICAgICAgIHRoaXMuZ3JvdXBlZFJvd3MgPSB0aGlzLmdyb3VwQXJyYXlCeSh0aGlzLl9yb3dzLCB0aGlzLl9ncm91cFJvd3NCeSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBncm91cFJvd3NCeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9ncm91cFJvd3NCeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgYXR0cmlidXRlIGFsbG93cyB0aGUgdXNlciB0byBzZXQgYSBncm91cGVkIGFycmF5IGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxyXG4gICAqICBbXHJcbiAgICogICAge2dyb3VwaWQ9MX0gW1xyXG4gICAqICAgICAge2lkPTEgbmFtZT1cInRlc3QxXCJ9LFxyXG4gICAqICAgICAge2lkPTIgbmFtZT1cInRlc3QyXCJ9LFxyXG4gICAqICAgICAge2lkPTMgbmFtZT1cInRlc3QzXCJ9XHJcbiAgICogICAgXX0sXHJcbiAgICogICAge2dyb3VwaWQ9Mj5bXHJcbiAgICogICAgICB7aWQ9NCBuYW1lPVwidGVzdDRcIn0sXHJcbiAgICogICAgICB7aWQ9NSBuYW1lPVwidGVzdDVcIn0sXHJcbiAgICogICAgICB7aWQ9NiBuYW1lPVwidGVzdDZcIn1cclxuICAgKiAgICBdfVxyXG4gICAqICBdXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ3JvdXBlZFJvd3M6IGFueVtdO1xyXG5cclxuICAvKipcclxuICAgKiBDb2x1bW5zIHRvIGJlIGRpc3BsYXllZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgY29sdW1ucyh2YWw6IFRhYmxlQ29sdW1uW10pIHtcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgdGhpcy5faW50ZXJuYWxDb2x1bW5zID0gWy4uLnZhbF07XHJcbiAgICAgIHNldENvbHVtbkRlZmF1bHRzKHRoaXMuX2ludGVybmFsQ29sdW1ucyk7XHJcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY29sdW1ucy5cclxuICAgKi9cclxuICBnZXQgY29sdW1ucygpOiBUYWJsZUNvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdCBvZiByb3cgb2JqZWN0cyB0aGF0IHNob3VsZCBiZVxyXG4gICAqIHJlcHJlc2VudGVkIGFzIHNlbGVjdGVkIGluIHRoZSBncmlkLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGBbXWBcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWxlY3RlZDogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIHZlcnRpY2FsIHNjcm9sbGJhcnNcclxuICAgKi9cclxuICBASW5wdXQoKSBzY3JvbGxiYXJWOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBob3J6IHNjcm9sbGJhcnNcclxuICAgKi9cclxuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSByb3cgaGVpZ2h0OyB3aGljaCBpcyBuZWNlc3NhcnlcclxuICAgKiB0byBjYWxjdWxhdGUgdGhlIGhlaWdodCBmb3IgdGhlIGxhenkgcmVuZGVyaW5nLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvd0hlaWdodDogbnVtYmVyIHwgJ2F1dG8nIHwgKChyb3c/OiBhbnkpID0+IG51bWJlcikgPSAzMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZSBvZiBjb2x1bW4gd2lkdGggZGlzdHJpYnV0aW9uIGZvcm11bGEuXHJcbiAgICogRXhhbXBsZTogZmxleCwgZm9yY2UsIHN0YW5kYXJkXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29sdW1uTW9kZTogQ29sdW1uTW9kZSA9IENvbHVtbk1vZGUuc3RhbmRhcmQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtaW5pbXVtIGhlYWRlciBoZWlnaHQgaW4gcGl4ZWxzLlxyXG4gICAqIFBhc3MgYSBmYWxzZXkgZm9yIG5vIGhlYWRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGhlYWRlckhlaWdodDogYW55ID0gMzA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtaW5pbXVtIGZvb3RlciBoZWlnaHQgaW4gcGl4ZWxzLlxyXG4gICAqIFBhc3MgZmFsc2V5IGZvciBubyBmb290ZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBmb290ZXJIZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRoZSB0YWJsZSBzaG91bGQgdXNlIGV4dGVybmFsIHBhZ2luZ1xyXG4gICAqIG90aGVyd2lzZSBpdHMgYXNzdW1lZCB0aGF0IGFsbCBkYXRhIGlzIHByZWxvYWRlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBleHRlcm5hbFBhZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGUgdGFibGUgc2hvdWxkIHVzZSBleHRlcm5hbCBzb3J0aW5nIG9yXHJcbiAgICogdGhlIGJ1aWx0LWluIGJhc2ljIHNvcnRpbmcuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXh0ZXJuYWxTb3J0aW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwYWdlIHNpemUgdG8gYmUgc2hvd24uXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYHVuZGVmaW5lZGBcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgbGltaXQodmFsOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMuX2xpbWl0ID0gdmFsO1xyXG5cclxuICAgIC8vIHJlY2FsY3VsYXRlIHNpemVzL2V0Y1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbGltaXQuXHJcbiAgICovXHJcbiAgZ2V0IGxpbWl0KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGltaXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgdG90YWwgY291bnQgb2YgYWxsIHJvd3MuXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYDBgXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IGNvdW50KHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9jb3VudCA9IHZhbDtcclxuXHJcbiAgICAvLyByZWNhbGN1bGF0ZSBzaXplcy9ldGNcclxuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGNvdW50LlxyXG4gICAqL1xyXG4gIGdldCBjb3VudCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgb2Zmc2V0ICggcGFnZSAtIDEgKSBzaG93bi5cclxuICAgKiBEZWZhdWx0IHZhbHVlOiBgMGBcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgb2Zmc2V0KHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9vZmZzZXQgPSB2YWw7XHJcbiAgfVxyXG4gIGdldCBvZmZzZXQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih0aGlzLl9vZmZzZXQsIE1hdGguY2VpbCh0aGlzLnJvd0NvdW50IC8gdGhpcy5wYWdlU2l6ZSkgLSAxKSwgMCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IHRoZSBsaW5lYXIgbG9hZGluZyBiYXIuXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYGZhbHNlYFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxvYWRpbmdJbmRpY2F0b3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZSBvZiByb3cgc2VsZWN0aW9uLiBPcHRpb25zIGFyZTpcclxuICAgKlxyXG4gICAqICAtIGBzaW5nbGVgXHJcbiAgICogIC0gYG11bHRpYFxyXG4gICAqICAtIGBjaGVja2JveGBcclxuICAgKiAgLSBgbXVsdGlDbGlja2BcclxuICAgKiAgLSBgY2VsbGBcclxuICAgKlxyXG4gICAqIEZvciBubyBzZWxlY3Rpb24gcGFzcyBhIGBmYWxzZXlgLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGB1bmRlZmluZWRgXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlL0Rpc2FibGUgYWJpbGl0eSB0byByZS1vcmRlciBjb2x1bW5zXHJcbiAgICogYnkgZHJhZ2dpbmcgdGhlbS5cclxuICAgKi9cclxuICBASW5wdXQoKSByZW9yZGVyYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN3YXAgY29sdW1ucyBvbiByZS1vcmRlciBjb2x1bW5zIG9yXHJcbiAgICogbW92ZSB0aGVtLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN3YXBDb2x1bW5zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHR5cGUgb2Ygc29ydGluZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNvcnRUeXBlOiBTb3J0VHlwZSA9IFNvcnRUeXBlLnNpbmdsZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQXJyYXkgb2Ygc29ydGVkIGNvbHVtbnMgYnkgcHJvcGVydHkgYW5kIHR5cGUuXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYFtdYFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNvcnRzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBDc3MgY2xhc3Mgb3ZlcnJpZGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgY3NzQ2xhc3NlczogYW55ID0ge1xyXG4gICAgc29ydEFzY2VuZGluZzogJ2RhdGF0YWJsZS1pY29uLXVwJyxcclxuICAgIHNvcnREZXNjZW5kaW5nOiAnZGF0YXRhYmxlLWljb24tZG93bicsXHJcbiAgICBwYWdlckxlZnRBcnJvdzogJ2RhdGF0YWJsZS1pY29uLWxlZnQnLFxyXG4gICAgcGFnZXJSaWdodEFycm93OiAnZGF0YXRhYmxlLWljb24tcmlnaHQnLFxyXG4gICAgcGFnZXJQcmV2aW91czogJ2RhdGF0YWJsZS1pY29uLXByZXYnLFxyXG4gICAgcGFnZXJOZXh0OiAnZGF0YXRhYmxlLWljb24tc2tpcCdcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXNzYWdlIG92ZXJyaWRlcyBmb3IgbG9jYWxpemF0aW9uXHJcbiAgICpcclxuICAgKiBlbXB0eU1lc3NhZ2UgICAgIFtkZWZhdWx0XSA9ICdObyBkYXRhIHRvIGRpc3BsYXknXHJcbiAgICogdG90YWxNZXNzYWdlICAgICBbZGVmYXVsdF0gPSAndG90YWwnXHJcbiAgICogc2VsZWN0ZWRNZXNzYWdlICBbZGVmYXVsdF0gPSAnc2VsZWN0ZWQnXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVzc2FnZXM6IGFueSA9IHtcclxuICAgIC8vIE1lc3NhZ2UgdG8gc2hvdyB3aGVuIGFycmF5IGlzIHByZXNlbnRlZFxyXG4gICAgLy8gYnV0IGNvbnRhaW5zIG5vIHZhbHVlc1xyXG4gICAgZW1wdHlNZXNzYWdlOiAnTm8gZGF0YSB0byBkaXNwbGF5JyxcclxuXHJcbiAgICAvLyBGb290ZXIgdG90YWwgbWVzc2FnZVxyXG4gICAgdG90YWxNZXNzYWdlOiAndG90YWwnLFxyXG5cclxuICAgIC8vIEZvb3RlciBzZWxlY3RlZCBtZXNzYWdlXHJcbiAgICBzZWxlY3RlZE1lc3NhZ2U6ICdzZWxlY3RlZCdcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSb3cgc3BlY2lmaWMgY2xhc3Nlcy5cclxuICAgKiBTaW1pbGFyIGltcGxlbWVudGF0aW9uIHRvIG5nQ2xhc3MuXHJcbiAgICpcclxuICAgKiAgW3Jvd0NsYXNzXT1cIidmaXJzdCBzZWNvbmQnXCJcclxuICAgKiAgW3Jvd0NsYXNzXT1cInsgJ2ZpcnN0JzogdHJ1ZSwgJ3NlY29uZCc6IHRydWUsICd0aGlyZCc6IGZhbHNlIH1cIlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvd0NsYXNzOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgYm9vbGVhbi9mdW5jdGlvbiB5b3UgY2FuIHVzZSB0byBjaGVjayB3aGV0aGVyIHlvdSB3YW50XHJcbiAgICogdG8gc2VsZWN0IGEgcGFydGljdWxhciByb3cgYmFzZWQgb24gYSBjcml0ZXJpYS4gRXhhbXBsZTpcclxuICAgKlxyXG4gICAqICAgIChzZWxlY3Rpb24pID0+IHtcclxuICAgKiAgICAgIHJldHVybiBzZWxlY3Rpb24gIT09ICdFdGhlbCBQcmljZSc7XHJcbiAgICogICAgfVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlbGVjdENoZWNrOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZnVuY3Rpb24geW91IGNhbiB1c2UgdG8gY2hlY2sgd2hldGhlciB5b3Ugd2FudFxyXG4gICAqIHRvIHNob3cgdGhlIGNoZWNrYm94IGZvciBhIHBhcnRpY3VsYXIgcm93IGJhc2VkIG9uIGEgY3JpdGVyaWEuIEV4YW1wbGU6XHJcbiAgICpcclxuICAgKiAgICAocm93LCBjb2x1bW4sIHZhbHVlKSA9PiB7XHJcbiAgICogICAgICByZXR1cm4gcm93Lm5hbWUgIT09ICdFdGhlbCBQcmljZSc7XHJcbiAgICogICAgfVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlDaGVjazogKHJvdzogYW55LCBjb2x1bW4/OiBhbnksIHZhbHVlPzogYW55KSA9PiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGJvb2xlYW4geW91IGNhbiB1c2UgdG8gc2V0IHRoZSBkZXRhdWx0IGJlaGF2aW91ciBvZiByb3dzIGFuZCBncm91cHNcclxuICAgKiB3aGV0aGVyIHRoZXkgd2lsbCBzdGFydCBleHBhbmRlZCBvciBub3QuIElmIG9tbWl0ZWQgdGhlIGRlZmF1bHQgaXMgTk9UIGV4cGFuZGVkLlxyXG4gICAqXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ3JvdXBFeHBhbnNpb25EZWZhdWx0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb3BlcnR5IHRvIHdoaWNoIHlvdSBjYW4gdXNlIGZvciBjdXN0b20gdHJhY2tpbmcgb2Ygcm93cy5cclxuICAgKiBFeGFtcGxlOiAnbmFtZSdcclxuICAgKi9cclxuICBASW5wdXQoKSB0cmFja0J5UHJvcDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBQcm9wZXJ0eSB0byB3aGljaCB5b3UgY2FuIHVzZSBmb3IgZGV0ZXJtaW5pbmcgc2VsZWN0IGFsbFxyXG4gICAqIHJvd3Mgb24gY3VycmVudCBwYWdlIG9yIG5vdC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBEYXRhdGFibGVDb21wb25lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWxlY3RBbGxSb3dzT25QYWdlID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBmb3Igcm93IHZpcnR1YWxpemF0aW9uIG9uIC8gb2ZmXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlydHVhbGl6YXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUcmVlIGZyb20gcmVsYXRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSB0cmVlRnJvbVJlbGF0aW9uOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyZWUgdG8gcmVsYXRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSB0cmVlVG9SZWxhdGlvbjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgZm9yIHN3aXRjaGluZyBzdW1tYXJ5IHJvdyBvbiAvIG9mZlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN1bW1hcnlSb3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBoZWlnaHQgb2Ygc3VtbWFyeSByb3dcclxuICAgKi9cclxuICBASW5wdXQoKSBzdW1tYXJ5SGVpZ2h0OiBudW1iZXIgPSAzMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBwcm9wZXJ0eSBob2xkcyBhIHN1bW1hcnkgcm93IHBvc2l0aW9uOiB0b3AvYm90dG9tXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3VtbWFyeVBvc2l0aW9uOiBzdHJpbmcgPSAndG9wJztcclxuXHJcbiAgLyoqXHJcbiAgICogQm9keSB3YXMgc2Nyb2xsZWQgdHlwaWNhbGx5IGluIGEgYHNjcm9sbGJhclY6dHJ1ZWAgc2NlbmFyaW8uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNjcm9sbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY2VsbCBvciByb3cgd2FzIGZvY3VzZWQgdmlhIGtleWJvYXJkIG9yIG1vdXNlIGNsaWNrLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY2VsbCBvciByb3cgd2FzIHNlbGVjdGVkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBDb2x1bW4gc29ydCB3YXMgaW52b2tlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0YWJsZSB3YXMgcGFnZWQgZWl0aGVyIHRyaWdnZXJlZCBieSB0aGUgcGFnZXIgb3IgdGhlIGJvZHkgc2Nyb2xsLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwYWdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29sdW1ucyB3ZXJlIHJlLW9yZGVyZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBDb2x1bW4gd2FzIHJlc2l6ZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc2l6ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb250ZXh0IG1lbnUgd2FzIGludm9rZWQgb24gdGhlIHRhYmxlLlxyXG4gICAqIHR5cGUgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGhlYWRlciBvciB0aGUgYm9keSB3YXMgY2xpY2tlZC5cclxuICAgKiBjb250ZW50IGNvbnRhaW5zIGVpdGhlciB0aGUgY29sdW1uIG9yIHRoZSByb3cgdGhhdCB3YXMgY2xpY2tlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgdGFibGVDb250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgdHlwZTogQ29udGV4dG1lbnVUeXBlOyBjb250ZW50OiBhbnkgfT4oZmFsc2UpO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJvdyB3YXMgZXhwYW5kZWQgb3QgY29sbGFwc2VkIGZvciB0cmVlXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHRyZWVBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCBpZiB0aGUgaGVhZGVyIGhlaWdodCBpZiBmaXhlZCBoZWlnaHQuXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5maXhlZC1oZWFkZXInKVxyXG4gIGdldCBpc0ZpeGVkSGVhZGVyKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgaGVhZGVySGVpZ2h0OiBudW1iZXIgfCBzdHJpbmcgPSB0aGlzLmhlYWRlckhlaWdodDtcclxuICAgIHJldHVybiB0eXBlb2YgaGVhZGVySGVpZ2h0ID09PSAnc3RyaW5nJyA/IDxzdHJpbmc+aGVhZGVySGVpZ2h0ICE9PSAnYXV0bycgOiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZlxyXG4gICAqIHRoZSByb3cgaGVpZ2h0cyBhcmUgZml4ZWQgaGVpZ2h0cy5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZpeGVkLXJvdycpXHJcbiAgZ2V0IGlzRml4ZWRSb3coKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5yb3dIZWlnaHQgIT09ICdhdXRvJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgZWxlbWVudCBpZlxyXG4gICAqIHZlcnRpY2FsIHNjcm9sbGluZyBpcyBlbmFibGVkLlxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2Nyb2xsLXZlcnRpY2FsJylcclxuICBnZXQgaXNWZXJ0U2Nyb2xsKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsYmFyVjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgZWxlbWVudCBpZlxyXG4gICAqIHZpcnR1YWxpemF0aW9uIGlzIGVuYWJsZWQuXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy52aXJ0dWFsaXplZCcpXHJcbiAgZ2V0IGlzVmlydHVhbGl6ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy52aXJ0dWFsaXphdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnRcclxuICAgKiBpZiB0aGUgaG9yemlvbnRhbCBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNjcm9sbC1ob3J6JylcclxuICBnZXQgaXNIb3JTY3JvbGwoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxiYXJIO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBlbGVtZW50IGlzIHNlbGVjdGFibGUuXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RhYmxlJylcclxuICBnZXQgaXNTZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBpcyBjaGVja2JveCBzZWxlY3Rpb24uXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jaGVja2JveC1zZWxlY3Rpb24nKVxyXG4gIGdldCBpc0NoZWNrYm94U2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5jaGVja2JveDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgaWYgY2VsbCBzZWxlY3Rpb24uXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jZWxsLXNlbGVjdGlvbicpXHJcbiAgZ2V0IGlzQ2VsbFNlbGVjdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2VsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgaWYgc2luZ2xlIHNlbGVjdC5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpbmdsZS1zZWxlY3Rpb24nKVxyXG4gIGdldCBpc1NpbmdsZVNlbGVjdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuc2luZ2xlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFkZGVkIHRvIHJvb3QgZWxlbWVudCBpZiBtdWxpdCBzZWxlY3RcclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm11bHRpLXNlbGVjdGlvbicpXHJcbiAgZ2V0IGlzTXVsdGlTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLm11bHRpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFkZGVkIHRvIHJvb3QgZWxlbWVudCBpZiBtdWxpdCBjbGljayBzZWxlY3RcclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm11bHRpLWNsaWNrLXNlbGVjdGlvbicpXHJcbiAgZ2V0IGlzTXVsdGlDbGlja1NlbGVjdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGlDbGljaztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbHVtbiB0ZW1wbGF0ZXMgZ2F0aGVyZWQgZnJvbSBgQ29udGVudENoaWxkcmVuYFxyXG4gICAqIGlmIGRlc2NyaWJlZCBpbiB5b3VyIG1hcmt1cC5cclxuICAgKi9cclxuICBAQ29udGVudENoaWxkcmVuKERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSlcclxuICBzZXQgY29sdW1uVGVtcGxhdGVzKHZhbDogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZT4pIHtcclxuICAgIHRoaXMuX2NvbHVtblRlbXBsYXRlcyA9IHZhbDtcclxuICAgIHRoaXMudHJhbnNsYXRlQ29sdW1ucyh2YWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY29sdW1uIHRlbXBsYXRlcy5cclxuICAgKi9cclxuICBnZXQgY29sdW1uVGVtcGxhdGVzKCk6IFF1ZXJ5TGlzdDxEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmU+IHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5UZW1wbGF0ZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3cgRGV0YWlsIHRlbXBsYXRlcyBnYXRoZXJlZCBmcm9tIHRoZSBDb250ZW50Q2hpbGRcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkKERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgcm93RGV0YWlsOiBEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdyb3VwIEhlYWRlciB0ZW1wbGF0ZXMgZ2F0aGVyZWQgZnJvbSB0aGUgQ29udGVudENoaWxkXHJcbiAgICovXHJcbiAgQENvbnRlbnRDaGlsZChEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgZ3JvdXBIZWFkZXI6IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBGb290ZXIgdGVtcGxhdGUgZ2F0aGVyZWQgZnJvbSB0aGUgQ29udGVudENoaWxkXHJcbiAgICovXHJcbiAgQENvbnRlbnRDaGlsZChEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gIGZvb3RlcjogRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGJvZHkgY29tcG9uZW50IGZvciBtYW51YWxseVxyXG4gICAqIGludm9raW5nIGZ1bmN0aW9ucyBvbiB0aGUgYm9keS5cclxuICAgKi9cclxuICBAVmlld0NoaWxkKERhdGFUYWJsZUJvZHlDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gIGJvZHlDb21wb25lbnQ6IERhdGFUYWJsZUJvZHlDb21wb25lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgaGVhZGVyIGNvbXBvbmVudCBmb3IgbWFudWFsbHlcclxuICAgKiBpbnZva2luZyBmdW5jdGlvbnMgb24gdGhlIGhlYWRlci5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBEYXRhdGFibGVDb21wb25lbnRcclxuICAgKi9cclxuICBAVmlld0NoaWxkKERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgaGVhZGVyQ29tcG9uZW50OiBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgaWYgYWxsIHJvd3MgYXJlIHNlbGVjdGVkLlxyXG4gICAqL1xyXG4gIGdldCBhbGxSb3dzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgYWxsUm93c1NlbGVjdGVkID0gdGhpcy5yb3dzICYmIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggPT09IHRoaXMucm93cy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xyXG4gICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5ib2R5Q29tcG9uZW50LmluZGV4ZXM7XHJcbiAgICAgIGNvbnN0IHJvd3NPblBhZ2UgPSBpbmRleGVzLmxhc3QgLSBpbmRleGVzLmZpcnN0O1xyXG4gICAgICBhbGxSb3dzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gcm93c09uUGFnZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiB0aGlzLnJvd3MgJiYgdGhpcy5yb3dzLmxlbmd0aCAhPT0gMCAmJiBhbGxSb3dzU2VsZWN0ZWQ7XHJcbiAgfVxyXG5cclxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBfaW5uZXJXaWR0aDogbnVtYmVyO1xyXG4gIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgYm9keUhlaWdodDogbnVtYmVyO1xyXG4gIHJvd0NvdW50OiBudW1iZXIgPSAwO1xyXG4gIHJvd0RpZmZlcjogS2V5VmFsdWVEaWZmZXI8e30sIHt9PjtcclxuXHJcbiAgX29mZnNldFggPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xyXG4gIF9saW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gIF9jb3VudDogbnVtYmVyID0gMDtcclxuICBfb2Zmc2V0OiBudW1iZXIgPSAwO1xyXG4gIF9yb3dzOiBhbnlbXTtcclxuICBfZ3JvdXBSb3dzQnk6IHN0cmluZztcclxuICBfaW50ZXJuYWxSb3dzOiBhbnlbXTtcclxuICBfaW50ZXJuYWxDb2x1bW5zOiBUYWJsZUNvbHVtbltdO1xyXG4gIF9jb2x1bW5zOiBUYWJsZUNvbHVtbltdO1xyXG4gIF9jb2x1bW5UZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmU+O1xyXG4gIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTa2lwU2VsZigpIHByaXZhdGUgc2Nyb2xsYmFySGVscGVyOiBTY3JvbGxiYXJIZWxwZXIsXHJcbiAgICBAU2tpcFNlbGYoKSBwcml2YXRlIGRpbWVuc2lvbnNIZWxwZXI6IERpbWVuc2lvbnNIZWxwZXIsXHJcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgICBwcml2YXRlIGNvbHVtbkNoYW5nZXNTZXJ2aWNlOiBDb2x1bW5DaGFuZ2VzU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2NvbmZpZ3VyYXRpb24nKSBwcml2YXRlIGNvbmZpZ3VyYXRpb246IElOZ3hEYXRhdGFibGVDb25maWdcclxuICApIHtcclxuICAgIC8vIGdldCByZWYgdG8gZWxtIGZvciBtZWFzdXJpbmdcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMucm93RGlmZmVyID0gZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcclxuXHJcbiAgICAvLyBhcHBseSBnbG9iYWwgc2V0dGluZ3MgZnJvbSBNb2R1bGUuZm9yUm9vdFxyXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbiAmJiB0aGlzLmNvbmZpZ3VyYXRpb24ubWVzc2FnZXMpIHtcclxuICAgICAgdGhpcy5tZXNzYWdlcyA9IHsgLi4udGhpcy5jb25maWd1cmF0aW9uLm1lc3NhZ2VzIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBkYXRhLWJvdW5kXHJcbiAgICogcHJvcGVydGllcyBvZiBhIGRpcmVjdGl2ZSBhcmUgaW5pdGlhbGl6ZWQuXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyBuZWVkIHRvIGNhbGwgdGhpcyBpbW1lZGlhdGx5IHRvIHNpemVcclxuICAgIC8vIGlmIHRoZSB0YWJsZSBpcyBoaWRkZW4gdGhlIHZpc2liaWxpdHlcclxuICAgIC8vIGxpc3RlbmVyIHdpbGwgaW52b2tlIHRoaXMgaXRzZWxmIHVwb24gc2hvd1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgYSBjb21wb25lbnQnc1xyXG4gICAqIHZpZXcgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuXHJcbiAgICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmV4dGVybmFsU29ydGluZykge1xyXG4gICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIGhhcyB0byBiZSBkb25lIHRvIHByZXZlbnQgdGhlIGNoYW5nZSBkZXRlY3Rpb25cclxuICAgIC8vIHRyZWUgZnJvbSBmcmVha2luZyBvdXQgYmVjYXVzZSB3ZSBhcmUgcmVhZGp1c3RpbmdcclxuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xyXG5cclxuICAgICAgLy8gZW1pdCBwYWdlIGZvciB2aXJ0dWFsIHNlcnZlci1zaWRlIGtpY2tvZmZcclxuICAgICAgaWYgKHRoaXMuZXh0ZXJuYWxQYWdpbmcgJiYgdGhpcy5zY3JvbGxiYXJWKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmVtaXQoe1xyXG4gICAgICAgICAgY291bnQ6IHRoaXMuY291bnQsXHJcbiAgICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcclxuICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxyXG4gICAgICAgICAgb2Zmc2V0OiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgYSBjb21wb25lbnQnc1xyXG4gICAqIGNvbnRlbnQgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuXHJcbiAgICovXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgdGhpcy5jb2x1bW5UZW1wbGF0ZXMuY2hhbmdlcy5zdWJzY3JpYmUodiA9PiB0aGlzLnRyYW5zbGF0ZUNvbHVtbnModikpO1xyXG4gICAgdGhpcy5saXN0ZW5Gb3JDb2x1bW5JbnB1dENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgd2lsbCBiZSB1c2VkIHdoZW4gZGlzcGxheWluZyBvciBzZWxlY3Rpbmcgcm93cy5cclxuICAgKiB3aGVuIHRyYWNraW5nL2NvbXBhcmluZyB0aGVtLCB3ZSdsbCB1c2UgdGhlIHZhbHVlIG9mIHRoaXMgZm4sXHJcbiAgICpcclxuICAgKiAoYGZuKHgpID09PSBmbih5KWAgaW5zdGVhZCBvZiBgeCA9PT0geWApXHJcbiAgICovXHJcbiAgQElucHV0KCkgcm93SWRlbnRpdHk6ICh4OiBhbnkpID0+IGFueSA9ICh4OiBhbnkpID0+IHtcclxuICAgIGlmICh0aGlzLl9ncm91cFJvd3NCeSkge1xyXG4gICAgICAvLyBlYWNoIGdyb3VwIGluIGdyb3VwZWRSb3dzIGFyZSBzdG9yZWQgYXMge2tleSwgdmFsdWU6IFtyb3dzXX0sXHJcbiAgICAgIC8vIHdoZXJlIGtleSBpcyB0aGUgZ3JvdXBSb3dzQnkgaW5kZXhcclxuICAgICAgcmV0dXJuIHgua2V5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlcyB0aGUgdGVtcGxhdGVzIHRvIHRoZSBjb2x1bW4gb2JqZWN0c1xyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUNvbHVtbnModmFsOiBhbnkpIHtcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgY29uc3QgYXJyID0gdmFsLnRvQXJyYXkoKTtcclxuICAgICAgaWYgKGFyci5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSB0cmFuc2xhdGVUZW1wbGF0ZXMoYXJyKTtcclxuICAgICAgICBzZXRDb2x1bW5EZWZhdWx0cyh0aGlzLl9pbnRlcm5hbENvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKCk7XHJcbiAgICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG1hcCB3aXRoIHRoZSBkYXRhIGdyb3VwZWQgYnkgdGhlIHVzZXIgY2hvaWNlIG9mIGdyb3VwaW5nIGluZGV4XHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3JpZ2luYWxBcnJheSB0aGUgb3JpZ2luYWwgYXJyYXkgcGFzc2VkIHZpYSBwYXJhbWV0ZXJcclxuICAgKiBAcGFyYW0gZ3JvdXBCeUluZGV4ICB0aGUgaW5kZXggb2YgdGhlIGNvbHVtbiB0byBncm91cCB0aGUgZGF0YSBieVxyXG4gICAqL1xyXG4gIGdyb3VwQXJyYXlCeShvcmlnaW5hbEFycmF5OiBhbnksIGdyb3VwQnk6IGFueSkge1xyXG4gICAgLy8gY3JlYXRlIGEgbWFwIHRvIGhvbGQgZ3JvdXBzIHdpdGggdGhlaXIgY29ycmVzcG9uZGluZyByZXN1bHRzXHJcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XHJcbiAgICBsZXQgaTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBvcmlnaW5hbEFycmF5LmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBpdGVtW2dyb3VwQnldO1xyXG4gICAgICBpZiAoIW1hcC5oYXMoa2V5KSkge1xyXG4gICAgICAgIG1hcC5zZXQoa2V5LCBbaXRlbV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1hcC5nZXQoa2V5KS5wdXNoKGl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICAgIGkrKztcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGFkZEdyb3VwID0gKGtleTogYW55LCB2YWx1ZTogYW55KSA9PiB7XHJcbiAgICAgIHJldHVybiB7IGtleSwgdmFsdWUgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gY29udmVydCBtYXAgYmFjayB0byBhIHNpbXBsZSBhcnJheSBvZiBvYmplY3RzXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShtYXAsIHggPT4gYWRkR3JvdXAoeFswXSwgeFsxXSkpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIEFuZ3VsYXIgZGlydHkgY2hlY2tzIGEgZGlyZWN0aXZlLlxyXG4gICAqL1xyXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJvd0RpZmZlci5kaWZmKHRoaXMucm93cykpIHtcclxuICAgICAgaWYgKCF0aGlzLmV4dGVybmFsU29ydGluZykge1xyXG4gICAgICAgIHRoaXMuc29ydEludGVybmFsUm93cygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2ludGVybmFsUm93cyA9IFsuLi50aGlzLnJvd3NdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhdXRvIGdyb3VwIGJ5IHBhcmVudCBvbiBuZXcgdXBkYXRlXHJcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyA9IGdyb3VwUm93c0J5UGFyZW50cyhcclxuICAgICAgICB0aGlzLl9pbnRlcm5hbFJvd3MsXHJcbiAgICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZUZyb21SZWxhdGlvbiksXHJcbiAgICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZVRvUmVsYXRpb24pXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLnJlY2FsY3VsYXRlUGFnZXMoKTtcclxuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY2FsYydzIHRoZSBzaXplcyBvZiB0aGUgZ3JpZC5cclxuICAgKlxyXG4gICAqIFVwZGF0ZWQgYXV0b21hdGljYWxseSBvbiBjaGFuZ2VzIHRvOlxyXG4gICAqXHJcbiAgICogIC0gQ29sdW1uc1xyXG4gICAqICAtIFJvd3NcclxuICAgKiAgLSBQYWdpbmcgcmVsYXRlZFxyXG4gICAqXHJcbiAgICogQWxzbyBjYW4gYmUgbWFudWFsbHkgaW52b2tlZCBvciB1cG9uIHdpbmRvdyByZXNpemUuXHJcbiAgICovXHJcbiAgcmVjYWxjdWxhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlRGltcygpO1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpbmRvdyByZXNpemUgaGFuZGxlciB0byB1cGRhdGUgc2l6ZXMuXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXHJcbiAgQHRocm90dGxlYWJsZSg1KVxyXG4gIG9uV2luZG93UmVzaXplKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWx1bGNhdGVzIHRoZSBjb2x1bW4gd2lkdGhzIGJhc2VkIG9uIGNvbHVtbiB3aWR0aFxyXG4gICAqIGRpc3RyaWJ1dGlvbiBtb2RlIGFuZCBzY3JvbGxiYXIgb2Zmc2V0cy5cclxuICAgKi9cclxuICByZWNhbGN1bGF0ZUNvbHVtbnMoXHJcbiAgICBjb2x1bW5zOiBhbnlbXSA9IHRoaXMuX2ludGVybmFsQ29sdW1ucyxcclxuICAgIGZvcmNlSWR4OiBudW1iZXIgPSAtMSxcclxuICAgIGFsbG93QmxlZWQ6IGJvb2xlYW4gPSB0aGlzLnNjcm9sbGJhckhcclxuICApOiBhbnlbXSB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAoIWNvbHVtbnMpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgbGV0IHdpZHRoID0gdGhpcy5faW5uZXJXaWR0aDtcclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYpIHtcclxuICAgICAgd2lkdGggPSB3aWR0aCAtIHRoaXMuc2Nyb2xsYmFySGVscGVyLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbHVtbk1vZGUgPT09IENvbHVtbk1vZGUuZm9yY2UpIHtcclxuICAgICAgZm9yY2VGaWxsQ29sdW1uV2lkdGhzKGNvbHVtbnMsIHdpZHRoLCBmb3JjZUlkeCwgYWxsb3dCbGVlZCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uTW9kZSA9PT0gQ29sdW1uTW9kZS5mbGV4KSB7XHJcbiAgICAgIGFkanVzdENvbHVtbldpZHRocyhjb2x1bW5zLCB3aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWNhbGN1bGF0ZXMgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIHRhYmxlIHNpemUuXHJcbiAgICogSW50ZXJuYWxseSBjYWxscyB0aGUgcGFnZSBzaXplIGFuZCByb3cgY291bnQgY2FsY3MgdG9vLlxyXG4gICAqXHJcbiAgICovXHJcbiAgcmVjYWxjdWxhdGVEaW1zKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGltcyA9IHRoaXMuZGltZW5zaW9uc0hlbHBlci5nZXREaW1lbnNpb25zKHRoaXMuZWxlbWVudCk7XHJcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gTWF0aC5mbG9vcihkaW1zLndpZHRoKTtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XHJcbiAgICAgIGxldCBoZWlnaHQgPSBkaW1zLmhlaWdodDtcclxuICAgICAgaWYgKHRoaXMuaGVhZGVySGVpZ2h0KSBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmhlYWRlckhlaWdodDtcclxuICAgICAgaWYgKHRoaXMuZm9vdGVySGVpZ2h0KSBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmZvb3RlckhlaWdodDtcclxuICAgICAgdGhpcy5ib2R5SGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVjYWxjdWxhdGVQYWdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBwYWdlcyBhZnRlciBhIHVwZGF0ZS5cclxuICAgKi9cclxuICByZWNhbGN1bGF0ZVBhZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9IHRoaXMuY2FsY1BhZ2VTaXplKCk7XHJcbiAgICB0aGlzLnJvd0NvdW50ID0gdGhpcy5jYWxjUm93Q291bnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJvZHkgdHJpZ2dlcmVkIGEgcGFnZSBldmVudC5cclxuICAgKi9cclxuICBvbkJvZHlQYWdlKHsgb2Zmc2V0IH06IGFueSk6IHZvaWQge1xyXG4gICAgLy8gQXZvaWQgcGFnaW5hdGlvbiBjYW1pbmcgZnJvbSBib2R5IGV2ZW50cyBsaWtlIHNjcm9sbCB3aGVuIHRoZSB0YWJsZVxyXG4gICAgLy8gaGFzIG5vIHZpcnR1YWxpemF0aW9uIGFuZCB0aGUgZXh0ZXJuYWwgcGFnaW5nIGlzIGVuYWJsZS5cclxuICAgIC8vIFRoaXMgbWVhbnMsIGxldCdzIHRoZSBkZXZlbG9wZXIgaGFuZGxlIHBhZ2luYXRpb24gYnkgbXkgaGltKGhlcikgc2VsZlxyXG4gICAgaWYgKHRoaXMuZXh0ZXJuYWxQYWdpbmcgJiYgIXRoaXMudmlydHVhbGl6YXRpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG5cclxuICAgIHRoaXMucGFnZS5lbWl0KHtcclxuICAgICAgY291bnQ6IHRoaXMuY291bnQsXHJcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxyXG4gICAgICBsaW1pdDogdGhpcy5saW1pdCxcclxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgYm9keSB0cmlnZ2VyZWQgYSBzY3JvbGwgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Cb2R5U2Nyb2xsKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9vZmZzZXRYLm5leHQoZXZlbnQub2Zmc2V0WCk7XHJcbiAgICB0aGlzLnNjcm9sbC5lbWl0KGV2ZW50KTtcclxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZvb3RlciB0cmlnZ2VyZWQgYSBwYWdlIGV2ZW50LlxyXG4gICAqL1xyXG4gIG9uRm9vdGVyUGFnZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLm9mZnNldCA9IGV2ZW50LnBhZ2UgLSAxO1xyXG4gICAgdGhpcy5ib2R5Q29tcG9uZW50LnVwZGF0ZU9mZnNldFkodGhpcy5vZmZzZXQpO1xyXG5cclxuICAgIHRoaXMucGFnZS5lbWl0KHtcclxuICAgICAgY291bnQ6IHRoaXMuY291bnQsXHJcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxyXG4gICAgICBsaW1pdDogdGhpcy5saW1pdCxcclxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XHJcbiAgICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xyXG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBzaXplcyBvZiB0aGUgcGFnZVxyXG4gICAqL1xyXG4gIGNhbGNQYWdlU2l6ZSh2YWw6IGFueVtdID0gdGhpcy5yb3dzKTogbnVtYmVyIHtcclxuICAgIC8vIEtlZXAgdGhlIHBhZ2Ugc2l6ZSBjb25zdGFudCBldmVuIGlmIHRoZSByb3cgaGFzIGJlZW4gZXhwYW5kZWQuXHJcbiAgICAvLyBUaGlzIGlzIGJlY2F1c2UgYW4gZXhwYW5kZWQgcm93IGlzIHN0aWxsIGNvbnNpZGVyZWQgdG8gYmUgYSBjaGlsZCBvZlxyXG4gICAgLy8gdGhlIG9yaWdpbmFsIHJvdy4gIEhlbmNlIGNhbGN1bGF0aW9uIHdvdWxkIHVzZSByb3dIZWlnaHQgb25seS5cclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbikge1xyXG4gICAgICBjb25zdCBzaXplID0gTWF0aC5jZWlsKHRoaXMuYm9keUhlaWdodCAvICh0aGlzLnJvd0hlaWdodCBhcyBudW1iZXIpKTtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KHNpemUsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGxpbWl0IGlzIHBhc3NlZCwgd2UgYXJlIHBhZ2luZ1xyXG4gICAgaWYgKHRoaXMubGltaXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5saW1pdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvdGhlcndpc2UgdXNlIHJvdyBsZW5ndGhcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb3RoZXIgZW1wdHkgOihcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyB0aGUgcm93IGNvdW50LlxyXG4gICAqL1xyXG4gIGNhbGNSb3dDb3VudCh2YWw6IGFueVtdID0gdGhpcy5yb3dzKTogbnVtYmVyIHtcclxuICAgIGlmICghdGhpcy5leHRlcm5hbFBhZ2luZykge1xyXG4gICAgICBpZiAoIXZhbCkgcmV0dXJuIDA7XHJcblxyXG4gICAgICBpZiAodGhpcy5ncm91cGVkUm93cykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwZWRSb3dzLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRyZWVGcm9tUmVsYXRpb24gIT0gbnVsbCAmJiB0aGlzLnRyZWVUb1JlbGF0aW9uICE9IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxSb3dzLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmNvdW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb250ZXh0bWVudSBldmVudC5cclxuICAgKi9cclxuICBvbkNvbHVtbkNvbnRleHRtZW51KHsgZXZlbnQsIGNvbHVtbiB9OiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMudGFibGVDb250ZXh0bWVudS5lbWl0KHsgZXZlbnQsIHR5cGU6IENvbnRleHRtZW51VHlwZS5oZWFkZXIsIGNvbnRlbnQ6IGNvbHVtbiB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBib2R5IHRyaWdnZXJlZCBhIGNvbnRleHRtZW51IGV2ZW50LlxyXG4gICAqL1xyXG4gIG9uUm93Q29udGV4dG1lbnUoeyBldmVudCwgcm93IH06IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy50YWJsZUNvbnRleHRtZW51LmVtaXQoeyBldmVudCwgdHlwZTogQ29udGV4dG1lbnVUeXBlLmJvZHksIGNvbnRlbnQ6IHJvdyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWFkZXIgdHJpZ2dlcmVkIGEgY29sdW1uIHJlc2l6ZSBldmVudC5cclxuICAgKi9cclxuICBvbkNvbHVtblJlc2l6ZSh7IGNvbHVtbiwgbmV3VmFsdWUgfTogYW55KTogdm9pZCB7XHJcbiAgICAvKiBTYWZhcmkvaU9TIDEwLjIgd29ya2Fyb3VuZCAqL1xyXG4gICAgaWYgKGNvbHVtbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaWR4OiBudW1iZXI7XHJcbiAgICBjb25zdCBjb2xzID0gdGhpcy5faW50ZXJuYWxDb2x1bW5zLm1hcCgoYywgaSkgPT4ge1xyXG4gICAgICBjID0geyAuLi5jIH07XHJcblxyXG4gICAgICBpZiAoYy4kJGlkID09PSBjb2x1bW4uJCRpZCkge1xyXG4gICAgICAgIGlkeCA9IGk7XHJcbiAgICAgICAgYy53aWR0aCA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhpcyBzbyB3ZSBjYW4gZm9yY2UgdGhlIGNvbHVtblxyXG4gICAgICAgIC8vIHdpZHRoIGRpc3RyaWJ1dGlvbiB0byBiZSB0byB0aGlzIHZhbHVlXHJcbiAgICAgICAgYy4kJG9sZFdpZHRoID0gbmV3VmFsdWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBjO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoY29scywgaWR4KTtcclxuICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IGNvbHM7XHJcblxyXG4gICAgdGhpcy5yZXNpemUuZW1pdCh7XHJcbiAgICAgIGNvbHVtbixcclxuICAgICAgbmV3VmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb2x1bW4gcmUtb3JkZXIgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Db2x1bW5SZW9yZGVyKHsgY29sdW1uLCBuZXdWYWx1ZSwgcHJldlZhbHVlIH06IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgY29scyA9IHRoaXMuX2ludGVybmFsQ29sdW1ucy5tYXAoYyA9PiB7XHJcbiAgICAgIHJldHVybiB7IC4uLmMgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnN3YXBDb2x1bW5zKSB7XHJcbiAgICAgIGNvbnN0IHByZXZDb2wgPSBjb2xzW25ld1ZhbHVlXTtcclxuICAgICAgY29sc1tuZXdWYWx1ZV0gPSBjb2x1bW47XHJcbiAgICAgIGNvbHNbcHJldlZhbHVlXSA9IHByZXZDb2w7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobmV3VmFsdWUgPiBwcmV2VmFsdWUpIHtcclxuICAgICAgICBjb25zdCBtb3ZlZENvbCA9IGNvbHNbcHJldlZhbHVlXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gcHJldlZhbHVlOyBpIDwgbmV3VmFsdWU7IGkrKykge1xyXG4gICAgICAgICAgY29sc1tpXSA9IGNvbHNbaSArIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb2xzW25ld1ZhbHVlXSA9IG1vdmVkQ29sO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG1vdmVkQ29sID0gY29sc1twcmV2VmFsdWVdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBwcmV2VmFsdWU7IGkgPiBuZXdWYWx1ZTsgaS0tKSB7XHJcbiAgICAgICAgICBjb2xzW2ldID0gY29sc1tpIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbHNbbmV3VmFsdWVdID0gbW92ZWRDb2w7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSBjb2xzO1xyXG5cclxuICAgIHRoaXMucmVvcmRlci5lbWl0KHtcclxuICAgICAgY29sdW1uLFxyXG4gICAgICBuZXdWYWx1ZSxcclxuICAgICAgcHJldlZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWFkZXIgdHJpZ2dlcmVkIGEgY29sdW1uIHNvcnQgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Db2x1bW5Tb3J0KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIGNsZWFuIHNlbGVjdGVkIHJvd3NcclxuICAgIGlmICh0aGlzLnNlbGVjdEFsbFJvd3NPblBhZ2UpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xyXG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHtcclxuICAgICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvcnRzID0gZXZlbnQuc29ydHM7XHJcblxyXG4gICAgLy8gdGhpcyBjb3VsZCBiZSBvcHRpbWl6ZWQgYmV0dGVyIHNpbmNlIGl0IHdpbGwgcmVzb3J0XHJcbiAgICAvLyB0aGUgcm93cyBhZ2FpbiBvbiB0aGUgJ3B1c2gnIGRldGVjdGlvbi4uLlxyXG4gICAgaWYgKHRoaXMuZXh0ZXJuYWxTb3J0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAvLyBkb24ndCB1c2Ugbm9ybWFsIHNldHRlciBzbyB3ZSBkb24ndCByZXNvcnRcclxuICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXV0byBncm91cCBieSBwYXJlbnQgb24gbmV3IHVwZGF0ZVxyXG4gICAgdGhpcy5faW50ZXJuYWxSb3dzID0gZ3JvdXBSb3dzQnlQYXJlbnRzKFxyXG4gICAgICB0aGlzLl9pbnRlcm5hbFJvd3MsXHJcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVGcm9tUmVsYXRpb24pLFxyXG4gICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlVG9SZWxhdGlvbilcclxuICAgICk7XHJcblxyXG4gICAgLy8gQWx3YXlzIGdvIHRvIGZpcnN0IHBhZ2Ugd2hlbiBzb3J0aW5nIHRvIHNlZSB0aGUgbmV3bHkgc29ydGVkIGRhdGFcclxuICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgIHRoaXMuYm9keUNvbXBvbmVudC51cGRhdGVPZmZzZXRZKHRoaXMub2Zmc2V0KTtcclxuICAgIHRoaXMuc29ydC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSBhbGwgcm93IHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIG9uSGVhZGVyU2VsZWN0KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdEFsbFJvd3NPblBhZ2UpIHtcclxuICAgICAgLy8gYmVmb3JlIHdlIHNwbGljZSwgY2hrIGlmIHdlIGN1cnJlbnRseSBoYXZlIGFsbCBzZWxlY3RlZFxyXG4gICAgICBjb25zdCBmaXJzdCA9IHRoaXMuYm9keUNvbXBvbmVudC5pbmRleGVzLmZpcnN0O1xyXG4gICAgICBjb25zdCBsYXN0ID0gdGhpcy5ib2R5Q29tcG9uZW50LmluZGV4ZXMubGFzdDtcclxuICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gbGFzdCAtIGZpcnN0O1xyXG5cclxuICAgICAgLy8gcmVtb3ZlIGFsbCBleGlzdGluZyBlaXRoZXIgd2F5XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcclxuXHJcbiAgICAgIC8vIGRvIHRoZSBvcHBvc2l0ZSBoZXJlXHJcbiAgICAgIGlmICghYWxsU2VsZWN0ZWQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goLi4udGhpcy5faW50ZXJuYWxSb3dzLnNsaWNlKGZpcnN0LCBsYXN0KSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGJlZm9yZSB3ZSBzcGxpY2UsIGNoayBpZiB3ZSBjdXJyZW50bHkgaGF2ZSBhbGwgc2VsZWN0ZWRcclxuICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gdGhpcy5yb3dzLmxlbmd0aDtcclxuICAgICAgLy8gcmVtb3ZlIGFsbCBleGlzdGluZyBlaXRoZXIgd2F5XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcclxuICAgICAgLy8gZG8gdGhlIG9wcG9zaXRlIGhlcmVcclxuICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi50aGlzLnJvd3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3QuZW1pdCh7XHJcbiAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcm93IHdhcyBzZWxlY3RlZCBmcm9tIGJvZHlcclxuICAgKi9cclxuICBvbkJvZHlTZWxlY3QoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIHJvdyB3YXMgZXhwYW5kZWQgb3IgY29sbGFwc2VkIGZvciB0cmVlXHJcbiAgICovXHJcbiAgb25UcmVlQWN0aW9uKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IHJvdyA9IGV2ZW50LnJvdztcclxuICAgIC8vIFRPRE86IEZvciBkdXBsaWNhdGVkIGl0ZW1zIHRoaXMgd2lsbCBub3Qgd29ya1xyXG4gICAgY29uc3Qgcm93SW5kZXggPSB0aGlzLl9yb3dzLmZpbmRJbmRleChyID0+IHJbdGhpcy50cmVlVG9SZWxhdGlvbl0gPT09IGV2ZW50LnJvd1t0aGlzLnRyZWVUb1JlbGF0aW9uXSk7XHJcbiAgICB0aGlzLnRyZWVBY3Rpb24uZW1pdCh7IHJvdywgcm93SW5kZXggfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbGlzdGVuIGZvciBjaGFuZ2VzIHRvIGlucHV0IGJpbmRpbmdzIG9mIGFsbCBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUgYW5kXHJcbiAgICogdHJpZ2dlciB0aGUgY29sdW1uVGVtcGxhdGVzLmNoYW5nZXMgb2JzZXJ2YWJsZSB0byBlbWl0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JDb2x1bW5JbnB1dENoYW5nZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuY29sdW1uQ2hhbmdlc1NlcnZpY2UuY29sdW1uSW5wdXRDaGFuZ2VzJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbHVtblRlbXBsYXRlcykge1xyXG4gICAgICAgICAgdGhpcy5jb2x1bW5UZW1wbGF0ZXMubm90aWZ5T25DaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc29ydEludGVybmFsUm93cygpOiB2b2lkIHtcclxuICAgIHRoaXMuX2ludGVybmFsUm93cyA9IHNvcnRSb3dzKHRoaXMuX2ludGVybmFsUm93cywgdGhpcy5faW50ZXJuYWxDb2x1bW5zLCB0aGlzLnNvcnRzKTtcclxuICB9XHJcbn1cclxuIl19