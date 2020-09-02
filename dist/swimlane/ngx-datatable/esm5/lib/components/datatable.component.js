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
    Object.defineProperty(DatatableComponent.prototype, "expandable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expandable;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._expandable = val;
            this.columns = this._columns;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUVmLFNBQVMsRUFFVCxXQUFXLEVBQ1gsWUFBWSxFQUVaLGVBQWUsRUFFZixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixRQUFRLEVBRVIsUUFBUSxFQUNSLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVuRixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JF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bkIsc0NBQXFCOztJQUNyQix1Q0FBa0M7O0lBRWxDLHNDQUFrQzs7SUFDbEMsb0NBQTJCOztJQUMzQixvQ0FBbUI7O0lBQ25CLHFDQUFvQjs7SUFDcEIsbUNBQWE7O0lBQ2IsMENBQXFCOztJQUNyQiwyQ0FBcUI7O0lBQ3JCLDhDQUFnQzs7SUFDaEMsc0NBQXdCOztJQUN4Qix5Q0FBcUI7O0lBQ3JCLDhDQUFzRDs7SUFDdEQsNENBQW9DOzs7Ozs7OztJQTZFcEMseUNBUUU7Ozs7O0lBbEZBLDZDQUFvRDs7Ozs7SUFDcEQsOENBQXNEOzs7OztJQUN0RCxnQ0FBNkI7Ozs7O0lBRzdCLGtEQUFrRDs7Ozs7SUFDbEQsMkNBQStFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIFZpZXdDaGlsZCxcbiAgSG9zdExpc3RlbmVyLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICBBZnRlclZpZXdJbml0LFxuICBIb3N0QmluZGluZyxcbiAgQ29udGVudENoaWxkLFxuICBEb0NoZWNrLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIEtleVZhbHVlRGlmZmVyLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBTa2lwU2VsZixcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vYm9keS9ib2R5LWdyb3VwLWhlYWRlci5kaXJlY3RpdmUnO1xuXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSU5neERhdGF0YWJsZUNvbmZpZyB9IGZyb20gJy4uL25neC1kYXRhdGFibGUubW9kdWxlJztcbmltcG9ydCB7IGdyb3VwUm93c0J5UGFyZW50cywgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wIH0gZnJvbSAnLi4vdXRpbHMvdHJlZSc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcbmltcG9ydCB7IHNldENvbHVtbkRlZmF1bHRzLCB0cmFuc2xhdGVUZW1wbGF0ZXMgfSBmcm9tICcuLi91dGlscy9jb2x1bW4taGVscGVyJztcbmltcG9ydCB7IENvbHVtbk1vZGUgfSBmcm9tICcuLi90eXBlcy9jb2x1bW4tbW9kZS50eXBlJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uL3R5cGVzL3NvcnQudHlwZSc7XG5pbXBvcnQgeyBDb250ZXh0bWVudVR5cGUgfSBmcm9tICcuLi90eXBlcy9jb250ZXh0bWVudS50eXBlJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSB9IGZyb20gJy4vcm93LWRldGFpbC9yb3ctZGV0YWlsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2Zvb3Rlci9mb290ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlDb21wb25lbnQgfSBmcm9tICcuL2JvZHkvYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JvbGxiYXJIZWxwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9zY3JvbGxiYXItaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sdW1uQ2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb2x1bW4tY2hhbmdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnNIZWxwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9kaW1lbnNpb25zLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IHRocm90dGxlYWJsZSB9IGZyb20gJy4uL3V0aWxzL3Rocm90dGxlJztcbmltcG9ydCB7IGZvcmNlRmlsbENvbHVtbldpZHRocywgYWRqdXN0Q29sdW1uV2lkdGhzIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XG5pbXBvcnQgeyBzb3J0Um93cyB9IGZyb20gJy4uL3V0aWxzL3NvcnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZGF0YXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGF0YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi9kYXRhdGFibGUuY29tcG9uZW50LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbmd4LWRhdGF0YWJsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhdGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQge1xuICAvKipcbiAgICogVGVtcGxhdGUgZm9yIHRoZSB0YXJnZXQgbWFya2VyIG9mIGRyYWcgdGFyZ2V0IGNvbHVtbnMuXG4gICAqL1xuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJUZW1wbGF0ZTogYW55O1xuXG4gIC8qKlxuICAgKiBSb3dzIHRoYXQgYXJlIGRpc3BsYXllZCBpbiB0aGUgdGFibGUuXG4gICAqL1xuICBASW5wdXQoKSBzZXQgcm93cyh2YWw6IGFueSkge1xuICAgIHRoaXMuX3Jvd3MgPSB2YWw7XG5cbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBbLi4udmFsXTtcbiAgICB9XG5cbiAgICAvLyBhdXRvIHNvcnQgb24gbmV3IHVwZGF0ZXNcbiAgICBpZiAoIXRoaXMuZXh0ZXJuYWxTb3J0aW5nKSB7XG4gICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcbiAgICB9XG5cbiAgICAvLyBhdXRvIGdyb3VwIGJ5IHBhcmVudCBvbiBuZXcgdXBkYXRlXG4gICAgdGhpcy5faW50ZXJuYWxSb3dzID0gZ3JvdXBSb3dzQnlQYXJlbnRzKFxuICAgICAgdGhpcy5faW50ZXJuYWxSb3dzLFxuICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZUZyb21SZWxhdGlvbiksXG4gICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlVG9SZWxhdGlvbilcbiAgICApO1xuXG4gICAgLy8gcmVjYWxjdWxhdGUgc2l6ZXMvZXRjXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuXG4gICAgaWYgKHRoaXMuX3Jvd3MgJiYgdGhpcy5fZ3JvdXBSb3dzQnkpIHtcbiAgICAgIC8vIElmIGEgY29sdW1uIGhhcyBiZWVuIHNwZWNpZmllZCBpbiBfZ3JvdXBSb3dzQnkgY3JlYXRlZCBhIG5ldyBhcnJheSB3aXRoIHRoZSBkYXRhIGdyb3VwZWQgYnkgdGhhdCByb3dcbiAgICAgIHRoaXMuZ3JvdXBlZFJvd3MgPSB0aGlzLmdyb3VwQXJyYXlCeSh0aGlzLl9yb3dzLCB0aGlzLl9ncm91cFJvd3NCeSk7XG4gICAgfVxuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSByb3dzLlxuICAgKi9cbiAgZ2V0IHJvd3MoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fcm93cztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGF0dHJpYnV0ZSBhbGxvd3MgdGhlIHVzZXIgdG8gc2V0IHRoZSBuYW1lIG9mIHRoZSBjb2x1bW4gdG8gZ3JvdXAgdGhlIGRhdGEgd2l0aFxuICAgKi9cbiAgQElucHV0KCkgc2V0IGdyb3VwUm93c0J5KHZhbDogc3RyaW5nKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgdGhpcy5fZ3JvdXBSb3dzQnkgPSB2YWw7XG4gICAgICBpZiAodGhpcy5fcm93cyAmJiB0aGlzLl9ncm91cFJvd3NCeSkge1xuICAgICAgICAvLyBjcmV0ZXMgYSBuZXcgYXJyYXkgd2l0aCB0aGUgZGF0YSBncm91cGVkXG4gICAgICAgIHRoaXMuZ3JvdXBlZFJvd3MgPSB0aGlzLmdyb3VwQXJyYXlCeSh0aGlzLl9yb3dzLCB0aGlzLl9ncm91cFJvd3NCeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IGdyb3VwUm93c0J5KCkge1xuICAgIHJldHVybiB0aGlzLl9ncm91cFJvd3NCeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGF0dHJpYnV0ZSBhbGxvd3MgdGhlIHVzZXIgdG8gc2V0IGEgZ3JvdXBlZCBhcnJheSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDpcbiAgICogIFtcbiAgICogICAge2dyb3VwaWQ9MX0gW1xuICAgKiAgICAgIHtpZD0xIG5hbWU9XCJ0ZXN0MVwifSxcbiAgICogICAgICB7aWQ9MiBuYW1lPVwidGVzdDJcIn0sXG4gICAqICAgICAge2lkPTMgbmFtZT1cInRlc3QzXCJ9XG4gICAqICAgIF19LFxuICAgKiAgICB7Z3JvdXBpZD0yPltcbiAgICogICAgICB7aWQ9NCBuYW1lPVwidGVzdDRcIn0sXG4gICAqICAgICAge2lkPTUgbmFtZT1cInRlc3Q1XCJ9LFxuICAgKiAgICAgIHtpZD02IG5hbWU9XCJ0ZXN0NlwifVxuICAgKiAgICBdfVxuICAgKiAgXVxuICAgKi9cbiAgQElucHV0KCkgZ3JvdXBlZFJvd3M6IGFueVtdO1xuXG4gIEBJbnB1dCgpIHNldCBleHBhbmRhYmxlKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2V4cGFuZGFibGUgPSB2YWw7XG4gICAgdGhpcy5jb2x1bW5zID0gdGhpcy5fY29sdW1ucztcbiAgfVxuXG4gIGdldCBleHBhbmRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9leHBhbmRhYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbHVtbnMgdG8gYmUgZGlzcGxheWVkLlxuICAgKi9cbiAgQElucHV0KCkgc2V0IGNvbHVtbnModmFsOiBUYWJsZUNvbHVtbltdKSB7XG4gICAgdmFsID0gW1xuICAgICAgLi4uKHRoaXMuZXhwYW5kYWJsZVxuICAgICAgICA/IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDUwLFxuICAgICAgICAgICAgICBwcm9wOiAnaWNlLWV4cGFuZGFibGUnLFxuICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgcmVzaXplYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIGNhbkF1dG9SZXNpemU6IGZhbHNlLFxuICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIDogW10pLFxuICAgICAgLi4udmFsXG4gICAgXTtcbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSBbLi4udmFsXTtcbiAgICAgIHNldENvbHVtbkRlZmF1bHRzKHRoaXMuX2ludGVybmFsQ29sdW1ucyk7XG4gICAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucygpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbHVtbnMgPSB2YWw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb2x1bW5zLlxuICAgKi9cbiAgZ2V0IGNvbHVtbnMoKTogVGFibGVDb2x1bW5bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiByb3cgb2JqZWN0cyB0aGF0IHNob3VsZCBiZVxuICAgKiByZXByZXNlbnRlZCBhcyBzZWxlY3RlZCBpbiB0aGUgZ3JpZC5cbiAgICogRGVmYXVsdCB2YWx1ZTogYFtdYFxuICAgKi9cbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGFueVtdID0gW107XG5cbiAgLyoqXG4gICAqIEVuYWJsZSB2ZXJ0aWNhbCBzY3JvbGxiYXJzXG4gICAqL1xuICBASW5wdXQoKSBzY3JvbGxiYXJWOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEVuYWJsZSBob3J6IHNjcm9sbGJhcnNcbiAgICovXG4gIEBJbnB1dCgpIHNjcm9sbGJhckg6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHJvdyBoZWlnaHQ7IHdoaWNoIGlzIG5lY2Vzc2FyeVxuICAgKiB0byBjYWxjdWxhdGUgdGhlIGhlaWdodCBmb3IgdGhlIGxhenkgcmVuZGVyaW5nLlxuICAgKi9cbiAgQElucHV0KCkgcm93SGVpZ2h0OiBudW1iZXIgfCAnYXV0bycgfCAoKHJvdz86IGFueSkgPT4gbnVtYmVyKSA9IDMwO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIGNvbHVtbiB3aWR0aCBkaXN0cmlidXRpb24gZm9ybXVsYS5cbiAgICogRXhhbXBsZTogZmxleCwgZm9yY2UsIHN0YW5kYXJkXG4gICAqL1xuICBASW5wdXQoKSBjb2x1bW5Nb2RlOiBDb2x1bW5Nb2RlID0gQ29sdW1uTW9kZS5zdGFuZGFyZDtcblxuICAvKipcbiAgICogVGhlIG1pbmltdW0gaGVhZGVyIGhlaWdodCBpbiBwaXhlbHMuXG4gICAqIFBhc3MgYSBmYWxzZXkgZm9yIG5vIGhlYWRlclxuICAgKi9cbiAgQElucHV0KCkgaGVhZGVySGVpZ2h0OiBhbnkgPSAzMDtcblxuICAvKipcbiAgICogVGhlIG1pbmltdW0gZm9vdGVyIGhlaWdodCBpbiBwaXhlbHMuXG4gICAqIFBhc3MgZmFsc2V5IGZvciBubyBmb290ZXJcbiAgICovXG4gIEBJbnB1dCgpIGZvb3RlckhlaWdodDogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogSWYgdGhlIHRhYmxlIHNob3VsZCB1c2UgZXh0ZXJuYWwgcGFnaW5nXG4gICAqIG90aGVyd2lzZSBpdHMgYXNzdW1lZCB0aGF0IGFsbCBkYXRhIGlzIHByZWxvYWRlZC5cbiAgICovXG4gIEBJbnB1dCgpIGV4dGVybmFsUGFnaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIElmIHRoZSB0YWJsZSBzaG91bGQgdXNlIGV4dGVybmFsIHNvcnRpbmcgb3JcbiAgICogdGhlIGJ1aWx0LWluIGJhc2ljIHNvcnRpbmcuXG4gICAqL1xuICBASW5wdXQoKSBleHRlcm5hbFNvcnRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHBhZ2Ugc2l6ZSB0byBiZSBzaG93bi5cbiAgICogRGVmYXVsdCB2YWx1ZTogYHVuZGVmaW5lZGBcbiAgICovXG4gIEBJbnB1dCgpIHNldCBsaW1pdCh2YWw6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2xpbWl0ID0gdmFsO1xuXG4gICAgLy8gcmVjYWxjdWxhdGUgc2l6ZXMvZXRjXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxpbWl0LlxuICAgKi9cbiAgZ2V0IGxpbWl0KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbWl0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB0b3RhbCBjb3VudCBvZiBhbGwgcm93cy5cbiAgICogRGVmYXVsdCB2YWx1ZTogYDBgXG4gICAqL1xuICBASW5wdXQoKSBzZXQgY291bnQodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb3VudCA9IHZhbDtcblxuICAgIC8vIHJlY2FsY3VsYXRlIHNpemVzL2V0Y1xuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjb3VudC5cbiAgICovXG4gIGdldCBjb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBvZmZzZXQgKCBwYWdlIC0gMSApIHNob3duLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgMGBcbiAgICovXG4gIEBJbnB1dCgpIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9vZmZzZXQgPSB2YWw7XG4gIH1cbiAgZ2V0IG9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih0aGlzLl9vZmZzZXQsIE1hdGguY2VpbCh0aGlzLnJvd0NvdW50IC8gdGhpcy5wYWdlU2l6ZSkgLSAxKSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGUgbGluZWFyIGxvYWRpbmcgYmFyLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgZmFsc2VgXG4gICAqL1xuICBASW5wdXQoKSBsb2FkaW5nSW5kaWNhdG9yOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2Ygcm93IHNlbGVjdGlvbi4gT3B0aW9ucyBhcmU6XG4gICAqXG4gICAqICAtIGBzaW5nbGVgXG4gICAqICAtIGBtdWx0aWBcbiAgICogIC0gYGNoZWNrYm94YFxuICAgKiAgLSBgbXVsdGlDbGlja2BcbiAgICogIC0gYGNlbGxgXG4gICAqXG4gICAqIEZvciBubyBzZWxlY3Rpb24gcGFzcyBhIGBmYWxzZXlgLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgdW5kZWZpbmVkYFxuICAgKi9cbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcblxuICAvKipcbiAgICogRW5hYmxlL0Rpc2FibGUgYWJpbGl0eSB0byByZS1vcmRlciBjb2x1bW5zXG4gICAqIGJ5IGRyYWdnaW5nIHRoZW0uXG4gICAqL1xuICBASW5wdXQoKSByZW9yZGVyYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFN3YXAgY29sdW1ucyBvbiByZS1vcmRlciBjb2x1bW5zIG9yXG4gICAqIG1vdmUgdGhlbS5cbiAgICovXG4gIEBJbnB1dCgpIHN3YXBDb2x1bW5zOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2Ygc29ydGluZ1xuICAgKi9cbiAgQElucHV0KCkgc29ydFR5cGU6IFNvcnRUeXBlID0gU29ydFR5cGUuc2luZ2xlO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBzb3J0ZWQgY29sdW1ucyBieSBwcm9wZXJ0eSBhbmQgdHlwZS5cbiAgICogRGVmYXVsdCB2YWx1ZTogYFtdYFxuICAgKi9cbiAgQElucHV0KCkgc29ydHM6IGFueVtdID0gW107XG5cbiAgLyoqXG4gICAqIENzcyBjbGFzcyBvdmVycmlkZXNcbiAgICovXG4gIEBJbnB1dCgpIGNzc0NsYXNzZXM6IGFueSA9IHtcbiAgICBzb3J0QXNjZW5kaW5nOiAnZGF0YXRhYmxlLWljb24tdXAnLFxuICAgIHNvcnREZXNjZW5kaW5nOiAnZGF0YXRhYmxlLWljb24tZG93bicsXG4gICAgcGFnZXJMZWZ0QXJyb3c6ICdkYXRhdGFibGUtaWNvbi1sZWZ0JyxcbiAgICBwYWdlclJpZ2h0QXJyb3c6ICdkYXRhdGFibGUtaWNvbi1yaWdodCcsXG4gICAgcGFnZXJQcmV2aW91czogJ2RhdGF0YWJsZS1pY29uLXByZXYnLFxuICAgIHBhZ2VyTmV4dDogJ2RhdGF0YWJsZS1pY29uLXNraXAnXG4gIH07XG5cbiAgLyoqXG4gICAqIE1lc3NhZ2Ugb3ZlcnJpZGVzIGZvciBsb2NhbGl6YXRpb25cbiAgICpcbiAgICogZW1wdHlNZXNzYWdlICAgICBbZGVmYXVsdF0gPSAnTm8gZGF0YSB0byBkaXNwbGF5J1xuICAgKiB0b3RhbE1lc3NhZ2UgICAgIFtkZWZhdWx0XSA9ICd0b3RhbCdcbiAgICogc2VsZWN0ZWRNZXNzYWdlICBbZGVmYXVsdF0gPSAnc2VsZWN0ZWQnXG4gICAqL1xuICBASW5wdXQoKSBtZXNzYWdlczogYW55ID0ge1xuICAgIC8vIE1lc3NhZ2UgdG8gc2hvdyB3aGVuIGFycmF5IGlzIHByZXNlbnRlZFxuICAgIC8vIGJ1dCBjb250YWlucyBubyB2YWx1ZXNcbiAgICBlbXB0eU1lc3NhZ2U6ICdObyBkYXRhIHRvIGRpc3BsYXknLFxuXG4gICAgLy8gRm9vdGVyIHRvdGFsIG1lc3NhZ2VcbiAgICB0b3RhbE1lc3NhZ2U6ICd0b3RhbCcsXG5cbiAgICAvLyBGb290ZXIgc2VsZWN0ZWQgbWVzc2FnZVxuICAgIHNlbGVjdGVkTWVzc2FnZTogJ3NlbGVjdGVkJ1xuICB9O1xuXG4gIC8qKlxuICAgKiBSb3cgc3BlY2lmaWMgY2xhc3Nlcy5cbiAgICogU2ltaWxhciBpbXBsZW1lbnRhdGlvbiB0byBuZ0NsYXNzLlxuICAgKlxuICAgKiAgW3Jvd0NsYXNzXT1cIidmaXJzdCBzZWNvbmQnXCJcbiAgICogIFtyb3dDbGFzc109XCJ7ICdmaXJzdCc6IHRydWUsICdzZWNvbmQnOiB0cnVlLCAndGhpcmQnOiBmYWxzZSB9XCJcbiAgICovXG4gIEBJbnB1dCgpIHJvd0NsYXNzOiBhbnk7XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbi9mdW5jdGlvbiB5b3UgY2FuIHVzZSB0byBjaGVjayB3aGV0aGVyIHlvdSB3YW50XG4gICAqIHRvIHNlbGVjdCBhIHBhcnRpY3VsYXIgcm93IGJhc2VkIG9uIGEgY3JpdGVyaWEuIEV4YW1wbGU6XG4gICAqXG4gICAqICAgIChzZWxlY3Rpb24pID0+IHtcbiAgICogICAgICByZXR1cm4gc2VsZWN0aW9uICE9PSAnRXRoZWwgUHJpY2UnO1xuICAgKiAgICB9XG4gICAqL1xuICBASW5wdXQoKSBzZWxlY3RDaGVjazogYW55O1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHlvdSBjYW4gdXNlIHRvIGNoZWNrIHdoZXRoZXIgeW91IHdhbnRcbiAgICogdG8gc2hvdyB0aGUgY2hlY2tib3ggZm9yIGEgcGFydGljdWxhciByb3cgYmFzZWQgb24gYSBjcml0ZXJpYS4gRXhhbXBsZTpcbiAgICpcbiAgICogICAgKHJvdywgY29sdW1uLCB2YWx1ZSkgPT4ge1xuICAgKiAgICAgIHJldHVybiByb3cubmFtZSAhPT0gJ0V0aGVsIFByaWNlJztcbiAgICogICAgfVxuICAgKi9cbiAgQElucHV0KCkgZGlzcGxheUNoZWNrOiAocm93OiBhbnksIGNvbHVtbj86IGFueSwgdmFsdWU/OiBhbnkpID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiB5b3UgY2FuIHVzZSB0byBzZXQgdGhlIGRldGF1bHQgYmVoYXZpb3VyIG9mIHJvd3MgYW5kIGdyb3Vwc1xuICAgKiB3aGV0aGVyIHRoZXkgd2lsbCBzdGFydCBleHBhbmRlZCBvciBub3QuIElmIG9tbWl0ZWQgdGhlIGRlZmF1bHQgaXMgTk9UIGV4cGFuZGVkLlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgZ3JvdXBFeHBhbnNpb25EZWZhdWx0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFByb3BlcnR5IHRvIHdoaWNoIHlvdSBjYW4gdXNlIGZvciBjdXN0b20gdHJhY2tpbmcgb2Ygcm93cy5cbiAgICogRXhhbXBsZTogJ25hbWUnXG4gICAqL1xuICBASW5wdXQoKSB0cmFja0J5UHJvcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBQcm9wZXJ0eSB0byB3aGljaCB5b3UgY2FuIHVzZSBmb3IgZGV0ZXJtaW5pbmcgc2VsZWN0IGFsbFxuICAgKiByb3dzIG9uIGN1cnJlbnQgcGFnZSBvciBub3QuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBEYXRhdGFibGVDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpIHNlbGVjdEFsbFJvd3NPblBhZ2UgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBmbGFnIGZvciByb3cgdmlydHVhbGl6YXRpb24gb24gLyBvZmZcbiAgICovXG4gIEBJbnB1dCgpIHZpcnR1YWxpemF0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVHJlZSBmcm9tIHJlbGF0aW9uXG4gICAqL1xuICBASW5wdXQoKSB0cmVlRnJvbVJlbGF0aW9uOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRyZWUgdG8gcmVsYXRpb25cbiAgICovXG4gIEBJbnB1dCgpIHRyZWVUb1JlbGF0aW9uOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBmb3Igc3dpdGNoaW5nIHN1bW1hcnkgcm93IG9uIC8gb2ZmXG4gICAqL1xuICBASW5wdXQoKSBzdW1tYXJ5Um93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgaGVpZ2h0IG9mIHN1bW1hcnkgcm93XG4gICAqL1xuICBASW5wdXQoKSBzdW1tYXJ5SGVpZ2h0OiBudW1iZXIgPSAzMDtcblxuICAvKipcbiAgICogQSBwcm9wZXJ0eSBob2xkcyBhIHN1bW1hcnkgcm93IHBvc2l0aW9uOiB0b3AvYm90dG9tXG4gICAqL1xuICBASW5wdXQoKSBzdW1tYXJ5UG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xuXG4gIC8qKlxuICAgKiBCb2R5IHdhcyBzY3JvbGxlZCB0eXBpY2FsbHkgaW4gYSBgc2Nyb2xsYmFyVjp0cnVlYCBzY2VuYXJpby5cbiAgICovXG4gIEBPdXRwdXQoKSBzY3JvbGw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBBIGNlbGwgb3Igcm93IHdhcyBmb2N1c2VkIHZpYSBrZXlib2FyZCBvciBtb3VzZSBjbGljay5cbiAgICovXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEEgY2VsbCBvciByb3cgd2FzIHNlbGVjdGVkLlxuICAgKi9cbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENvbHVtbiBzb3J0IHdhcyBpbnZva2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFibGUgd2FzIHBhZ2VkIGVpdGhlciB0cmlnZ2VyZWQgYnkgdGhlIHBhZ2VyIG9yIHRoZSBib2R5IHNjcm9sbC5cbiAgICovXG4gIEBPdXRwdXQoKSBwYWdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ29sdW1ucyB3ZXJlIHJlLW9yZGVyZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENvbHVtbiB3YXMgcmVzaXplZC5cbiAgICovXG4gIEBPdXRwdXQoKSByZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBUaGUgY29udGV4dCBtZW51IHdhcyBpbnZva2VkIG9uIHRoZSB0YWJsZS5cbiAgICogdHlwZSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgaGVhZGVyIG9yIHRoZSBib2R5IHdhcyBjbGlja2VkLlxuICAgKiBjb250ZW50IGNvbnRhaW5zIGVpdGhlciB0aGUgY29sdW1uIG9yIHRoZSByb3cgdGhhdCB3YXMgY2xpY2tlZC5cbiAgICovXG4gIEBPdXRwdXQoKSB0YWJsZUNvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyB0eXBlOiBDb250ZXh0bWVudVR5cGU7IGNvbnRlbnQ6IGFueSB9PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEEgcm93IHdhcyBleHBhbmRlZCBvdCBjb2xsYXBzZWQgZm9yIHRyZWVcbiAgICovXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgaWYgdGhlIGhlYWRlciBoZWlnaHQgaWYgZml4ZWQgaGVpZ2h0LlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5maXhlZC1oZWFkZXInKVxuICBnZXQgaXNGaXhlZEhlYWRlcigpOiBib29sZWFuIHtcbiAgICBjb25zdCBoZWFkZXJIZWlnaHQ6IG51bWJlciB8IHN0cmluZyA9IHRoaXMuaGVhZGVySGVpZ2h0O1xuICAgIHJldHVybiB0eXBlb2YgaGVhZGVySGVpZ2h0ID09PSAnc3RyaW5nJyA/IDxzdHJpbmc+aGVhZGVySGVpZ2h0ICE9PSAnYXV0bycgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWZcbiAgICogdGhlIHJvdyBoZWlnaHRzIGFyZSBmaXhlZCBoZWlnaHRzLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5maXhlZC1yb3cnKVxuICBnZXQgaXNGaXhlZFJvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yb3dIZWlnaHQgIT09ICdhdXRvJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGVsZW1lbnQgaWZcbiAgICogdmVydGljYWwgc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNjcm9sbC12ZXJ0aWNhbCcpXG4gIGdldCBpc1ZlcnRTY3JvbGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsYmFyVjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGVsZW1lbnQgaWZcbiAgICogdmlydHVhbGl6YXRpb24gaXMgZW5hYmxlZC5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MudmlydHVhbGl6ZWQnKVxuICBnZXQgaXNWaXJ0dWFsaXplZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy52aXJ0dWFsaXphdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50XG4gICAqIGlmIHRoZSBob3J6aW9udGFsIHNjcm9sbGluZyBpcyBlbmFibGVkLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zY3JvbGwtaG9yeicpXG4gIGdldCBpc0hvclNjcm9sbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxiYXJIO1xuICB9XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgZWxlbWVudCBpcyBzZWxlY3RhYmxlLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RhYmxlJylcbiAgZ2V0IGlzU2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBpcyBjaGVja2JveCBzZWxlY3Rpb24uXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNoZWNrYm94LXNlbGVjdGlvbicpXG4gIGdldCBpc0NoZWNrYm94U2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2hlY2tib3g7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBpZiBjZWxsIHNlbGVjdGlvbi5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2VsbC1zZWxlY3Rpb24nKVxuICBnZXQgaXNDZWxsU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2VsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCB0byByb290IGlmIHNpbmdsZSBzZWxlY3QuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpbmdsZS1zZWxlY3Rpb24nKVxuICBnZXQgaXNTaW5nbGVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5zaW5nbGU7XG4gIH1cblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFkZGVkIHRvIHJvb3QgZWxlbWVudCBpZiBtdWxpdCBzZWxlY3RcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MubXVsdGktc2VsZWN0aW9uJylcbiAgZ2V0IGlzTXVsdGlTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5tdWx0aTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYWRkZWQgdG8gcm9vdCBlbGVtZW50IGlmIG11bGl0IGNsaWNrIHNlbGVjdFxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tdWx0aS1jbGljay1zZWxlY3Rpb24nKVxuICBnZXQgaXNNdWx0aUNsaWNrU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGlDbGljaztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb2x1bW4gdGVtcGxhdGVzIGdhdGhlcmVkIGZyb20gYENvbnRlbnRDaGlsZHJlbmBcbiAgICogaWYgZGVzY3JpYmVkIGluIHlvdXIgbWFya3VwLlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUpXG4gIHNldCBjb2x1bW5UZW1wbGF0ZXModmFsOiBRdWVyeUxpc3Q8RGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlPikge1xuICAgIHRoaXMuX2NvbHVtblRlbXBsYXRlcyA9IHZhbDtcbiAgICB0aGlzLnRyYW5zbGF0ZUNvbHVtbnModmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb2x1bW4gdGVtcGxhdGVzLlxuICAgKi9cbiAgZ2V0IGNvbHVtblRlbXBsYXRlcygpOiBRdWVyeUxpc3Q8RGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtblRlbXBsYXRlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3cgRGV0YWlsIHRlbXBsYXRlcyBnYXRoZXJlZCBmcm9tIHRoZSBDb250ZW50Q2hpbGRcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcm93RGV0YWlsOiBEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmU7XG5cbiAgLyoqXG4gICAqIEdyb3VwIEhlYWRlciB0ZW1wbGF0ZXMgZ2F0aGVyZWQgZnJvbSB0aGUgQ29udGVudENoaWxkXG4gICAqL1xuICBAQ29udGVudENoaWxkKERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgZ3JvdXBIZWFkZXI6IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBGb290ZXIgdGVtcGxhdGUgZ2F0aGVyZWQgZnJvbSB0aGUgQ29udGVudENoaWxkXG4gICAqL1xuICBAQ29udGVudENoaWxkKERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGZvb3RlcjogRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGJvZHkgY29tcG9uZW50IGZvciBtYW51YWxseVxuICAgKiBpbnZva2luZyBmdW5jdGlvbnMgb24gdGhlIGJvZHkuXG4gICAqL1xuICBAVmlld0NoaWxkKERhdGFUYWJsZUJvZHlDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBib2R5Q29tcG9uZW50OiBEYXRhVGFibGVCb2R5Q29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGhlYWRlciBjb21wb25lbnQgZm9yIG1hbnVhbGx5XG4gICAqIGludm9raW5nIGZ1bmN0aW9ucyBvbiB0aGUgaGVhZGVyLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgRGF0YXRhYmxlQ29tcG9uZW50XG4gICAqL1xuICBAVmlld0NoaWxkKERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGhlYWRlckNvbXBvbmVudDogRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGlmIGFsbCByb3dzIGFyZSBzZWxlY3RlZC5cbiAgICovXG4gIGdldCBhbGxSb3dzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgbGV0IGFsbFJvd3NTZWxlY3RlZCA9IHRoaXMucm93cyAmJiB0aGlzLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSB0aGlzLnJvd3MubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xuICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMuYm9keUNvbXBvbmVudC5pbmRleGVzO1xuICAgICAgY29uc3Qgcm93c09uUGFnZSA9IGluZGV4ZXMubGFzdCAtIGluZGV4ZXMuZmlyc3Q7XG4gICAgICBhbGxSb3dzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gcm93c09uUGFnZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiB0aGlzLnJvd3MgJiYgdGhpcy5yb3dzLmxlbmd0aCAhPT0gMCAmJiBhbGxSb3dzU2VsZWN0ZWQ7XG4gIH1cblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgX2lubmVyV2lkdGg6IG51bWJlcjtcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgYm9keUhlaWdodDogbnVtYmVyO1xuICByb3dDb3VudDogbnVtYmVyID0gMDtcbiAgcm93RGlmZmVyOiBLZXlWYWx1ZURpZmZlcjx7fSwge30+O1xuXG4gIF9vZmZzZXRYID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgX2xpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIF9jb3VudDogbnVtYmVyID0gMDtcbiAgX29mZnNldDogbnVtYmVyID0gMDtcbiAgX3Jvd3M6IGFueVtdO1xuICBfZ3JvdXBSb3dzQnk6IHN0cmluZztcbiAgX2ludGVybmFsUm93czogYW55W107XG4gIF9pbnRlcm5hbENvbHVtbnM6IFRhYmxlQ29sdW1uW107XG4gIF9jb2x1bW5zOiBUYWJsZUNvbHVtbltdO1xuICBfZXhwYW5kYWJsZTogYm9vbGVhbjtcbiAgX2NvbHVtblRlbXBsYXRlczogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZT47XG4gIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBTa2lwU2VsZigpIHByaXZhdGUgc2Nyb2xsYmFySGVscGVyOiBTY3JvbGxiYXJIZWxwZXIsXG4gICAgQFNraXBTZWxmKCkgcHJpdmF0ZSBkaW1lbnNpb25zSGVscGVyOiBEaW1lbnNpb25zSGVscGVyLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgIHByaXZhdGUgY29sdW1uQ2hhbmdlc1NlcnZpY2U6IENvbHVtbkNoYW5nZXNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2NvbmZpZ3VyYXRpb24nKSBwcml2YXRlIGNvbmZpZ3VyYXRpb246IElOZ3hEYXRhdGFibGVDb25maWdcbiAgKSB7XG4gICAgLy8gZ2V0IHJlZiB0byBlbG0gZm9yIG1lYXN1cmluZ1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnJvd0RpZmZlciA9IGRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XG5cbiAgICAvLyBhcHBseSBnbG9iYWwgc2V0dGluZ3MgZnJvbSBNb2R1bGUuZm9yUm9vdFxuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24gJiYgdGhpcy5jb25maWd1cmF0aW9uLm1lc3NhZ2VzKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzID0geyAuLi50aGlzLmNvbmZpZ3VyYXRpb24ubWVzc2FnZXMgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZFxuICAgKiBwcm9wZXJ0aWVzIG9mIGEgZGlyZWN0aXZlIGFyZSBpbml0aWFsaXplZC5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIG5lZWQgdG8gY2FsbCB0aGlzIGltbWVkaWF0bHkgdG8gc2l6ZVxuICAgIC8vIGlmIHRoZSB0YWJsZSBpcyBoaWRkZW4gdGhlIHZpc2liaWxpdHlcbiAgICAvLyBsaXN0ZW5lciB3aWxsIGludm9rZSB0aGlzIGl0c2VsZiB1cG9uIHNob3dcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgYSBjb21wb25lbnQnc1xuICAgKiB2aWV3IGhhcyBiZWVuIGZ1bGx5IGluaXRpYWxpemVkLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5leHRlcm5hbFNvcnRpbmcpIHtcbiAgICAgIHRoaXMuc29ydEludGVybmFsUm93cygpO1xuICAgIH1cblxuICAgIC8vIHRoaXMgaGFzIHRvIGJlIGRvbmUgdG8gcHJldmVudCB0aGUgY2hhbmdlIGRldGVjdGlvblxuICAgIC8vIHRyZWUgZnJvbSBmcmVha2luZyBvdXQgYmVjYXVzZSB3ZSBhcmUgcmVhZGp1c3RpbmdcbiAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuXG4gICAgICAvLyBlbWl0IHBhZ2UgZm9yIHZpcnR1YWwgc2VydmVyLXNpZGUga2lja29mZlxuICAgICAgaWYgKHRoaXMuZXh0ZXJuYWxQYWdpbmcgJiYgdGhpcy5zY3JvbGxiYXJWKSB7XG4gICAgICAgIHRoaXMucGFnZS5lbWl0KHtcbiAgICAgICAgICBjb3VudDogdGhpcy5jb3VudCxcbiAgICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgICAgICBvZmZzZXQ6IDBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgYSBjb21wb25lbnQnc1xuICAgKiBjb250ZW50IGhhcyBiZWVuIGZ1bGx5IGluaXRpYWxpemVkLlxuICAgKi9cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuY29sdW1uVGVtcGxhdGVzLmNoYW5nZXMuc3Vic2NyaWJlKHYgPT4gdGhpcy50cmFuc2xhdGVDb2x1bW5zKHYpKTtcbiAgICB0aGlzLmxpc3RlbkZvckNvbHVtbklucHV0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBiZSB1c2VkIHdoZW4gZGlzcGxheWluZyBvciBzZWxlY3Rpbmcgcm93cy5cbiAgICogd2hlbiB0cmFja2luZy9jb21wYXJpbmcgdGhlbSwgd2UnbGwgdXNlIHRoZSB2YWx1ZSBvZiB0aGlzIGZuLFxuICAgKlxuICAgKiAoYGZuKHgpID09PSBmbih5KWAgaW5zdGVhZCBvZiBgeCA9PT0geWApXG4gICAqL1xuICBASW5wdXQoKSByb3dJZGVudGl0eTogKHg6IGFueSkgPT4gYW55ID0gKHg6IGFueSkgPT4ge1xuICAgIGlmICh0aGlzLl9ncm91cFJvd3NCeSkge1xuICAgICAgLy8gZWFjaCBncm91cCBpbiBncm91cGVkUm93cyBhcmUgc3RvcmVkIGFzIHtrZXksIHZhbHVlOiBbcm93c119LFxuICAgICAgLy8gd2hlcmUga2V5IGlzIHRoZSBncm91cFJvd3NCeSBpbmRleFxuICAgICAgcmV0dXJuIHgua2V5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZXMgdGhlIHRlbXBsYXRlcyB0byB0aGUgY29sdW1uIG9iamVjdHNcbiAgICovXG4gIHRyYW5zbGF0ZUNvbHVtbnModmFsOiBhbnkpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICBjb25zdCBhcnIgPSB2YWwudG9BcnJheSgpO1xuICAgICAgaWYgKGFyci5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxDb2x1bW5zID0gdHJhbnNsYXRlVGVtcGxhdGVzKGFycik7XG4gICAgICAgIHNldENvbHVtbkRlZmF1bHRzKHRoaXMuX2ludGVybmFsQ29sdW1ucyk7XG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuc29ydEludGVybmFsUm93cygpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWFwIHdpdGggdGhlIGRhdGEgZ3JvdXBlZCBieSB0aGUgdXNlciBjaG9pY2Ugb2YgZ3JvdXBpbmcgaW5kZXhcbiAgICpcbiAgICogQHBhcmFtIG9yaWdpbmFsQXJyYXkgdGhlIG9yaWdpbmFsIGFycmF5IHBhc3NlZCB2aWEgcGFyYW1ldGVyXG4gICAqIEBwYXJhbSBncm91cEJ5SW5kZXggIHRoZSBpbmRleCBvZiB0aGUgY29sdW1uIHRvIGdyb3VwIHRoZSBkYXRhIGJ5XG4gICAqL1xuICBncm91cEFycmF5Qnkob3JpZ2luYWxBcnJheTogYW55LCBncm91cEJ5OiBhbnkpIHtcbiAgICAvLyBjcmVhdGUgYSBtYXAgdG8gaG9sZCBncm91cHMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nIHJlc3VsdHNcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGk6IG51bWJlciA9IDA7XG5cbiAgICBvcmlnaW5hbEFycmF5LmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gaXRlbVtncm91cEJ5XTtcbiAgICAgIGlmICghbWFwLmhhcyhrZXkpKSB7XG4gICAgICAgIG1hcC5zZXQoa2V5LCBbaXRlbV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLmdldChrZXkpLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfSk7XG5cbiAgICBjb25zdCBhZGRHcm91cCA9IChrZXk6IGFueSwgdmFsdWU6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHsga2V5LCB2YWx1ZSB9O1xuICAgIH07XG5cbiAgICAvLyBjb252ZXJ0IG1hcCBiYWNrIHRvIGEgc2ltcGxlIGFycmF5IG9mIG9iamVjdHNcbiAgICByZXR1cm4gQXJyYXkuZnJvbShtYXAsIHggPT4gYWRkR3JvdXAoeFswXSwgeFsxXSkpO1xuICB9XG5cbiAgLypcbiAgICogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBBbmd1bGFyIGRpcnR5IGNoZWNrcyBhIGRpcmVjdGl2ZS5cbiAgICovXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yb3dEaWZmZXIuZGlmZih0aGlzLnJvd3MpKSB7XG4gICAgICBpZiAoIXRoaXMuZXh0ZXJuYWxTb3J0aW5nKSB7XG4gICAgICAgIHRoaXMuc29ydEludGVybmFsUm93cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxSb3dzID0gWy4uLnRoaXMucm93c107XG4gICAgICB9XG5cbiAgICAgIC8vIGF1dG8gZ3JvdXAgYnkgcGFyZW50IG9uIG5ldyB1cGRhdGVcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyA9IGdyb3VwUm93c0J5UGFyZW50cyhcbiAgICAgICAgdGhpcy5faW50ZXJuYWxSb3dzLFxuICAgICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlRnJvbVJlbGF0aW9uKSxcbiAgICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZVRvUmVsYXRpb24pXG4gICAgICApO1xuXG4gICAgICB0aGlzLnJlY2FsY3VsYXRlUGFnZXMoKTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlY2FsYydzIHRoZSBzaXplcyBvZiB0aGUgZ3JpZC5cbiAgICpcbiAgICogVXBkYXRlZCBhdXRvbWF0aWNhbGx5IG9uIGNoYW5nZXMgdG86XG4gICAqXG4gICAqICAtIENvbHVtbnNcbiAgICogIC0gUm93c1xuICAgKiAgLSBQYWdpbmcgcmVsYXRlZFxuICAgKlxuICAgKiBBbHNvIGNhbiBiZSBtYW51YWxseSBpbnZva2VkIG9yIHVwb24gd2luZG93IHJlc2l6ZS5cbiAgICovXG4gIHJlY2FsY3VsYXRlKCk6IHZvaWQge1xuICAgIHRoaXMucmVjYWxjdWxhdGVEaW1zKCk7XG4gICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaW5kb3cgcmVzaXplIGhhbmRsZXIgdG8gdXBkYXRlIHNpemVzLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIEB0aHJvdHRsZWFibGUoNSlcbiAgb25XaW5kb3dSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY2FsdWxjYXRlcyB0aGUgY29sdW1uIHdpZHRocyBiYXNlZCBvbiBjb2x1bW4gd2lkdGhcbiAgICogZGlzdHJpYnV0aW9uIG1vZGUgYW5kIHNjcm9sbGJhciBvZmZzZXRzLlxuICAgKi9cbiAgcmVjYWxjdWxhdGVDb2x1bW5zKFxuICAgIGNvbHVtbnM6IGFueVtdID0gdGhpcy5faW50ZXJuYWxDb2x1bW5zLFxuICAgIGZvcmNlSWR4OiBudW1iZXIgPSAtMSxcbiAgICBhbGxvd0JsZWVkOiBib29sZWFuID0gdGhpcy5zY3JvbGxiYXJIXG4gICk6IGFueVtdIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWNvbHVtbnMpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICBsZXQgd2lkdGggPSB0aGlzLl9pbm5lcldpZHRoO1xuICAgIGlmICh0aGlzLnNjcm9sbGJhclYpIHtcbiAgICAgIHdpZHRoID0gd2lkdGggLSB0aGlzLnNjcm9sbGJhckhlbHBlci53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb2x1bW5Nb2RlID09PSBDb2x1bW5Nb2RlLmZvcmNlKSB7XG4gICAgICBmb3JjZUZpbGxDb2x1bW5XaWR0aHMoY29sdW1ucywgd2lkdGgsIGZvcmNlSWR4LCBhbGxvd0JsZWVkKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uTW9kZSA9PT0gQ29sdW1uTW9kZS5mbGV4KSB7XG4gICAgICBhZGp1c3RDb2x1bW5XaWR0aHMoY29sdW1ucywgd2lkdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY2FsY3VsYXRlcyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgdGFibGUgc2l6ZS5cbiAgICogSW50ZXJuYWxseSBjYWxscyB0aGUgcGFnZSBzaXplIGFuZCByb3cgY291bnQgY2FsY3MgdG9vLlxuICAgKlxuICAgKi9cbiAgcmVjYWxjdWxhdGVEaW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IGRpbXMgPSB0aGlzLmRpbWVuc2lvbnNIZWxwZXIuZ2V0RGltZW5zaW9ucyh0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuX2lubmVyV2lkdGggPSBNYXRoLmZsb29yKGRpbXMud2lkdGgpO1xuXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyVikge1xuICAgICAgbGV0IGhlaWdodCA9IGRpbXMuaGVpZ2h0O1xuICAgICAgaWYgKHRoaXMuaGVhZGVySGVpZ2h0KSBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmhlYWRlckhlaWdodDtcbiAgICAgIGlmICh0aGlzLmZvb3RlckhlaWdodCkgaGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5mb290ZXJIZWlnaHQ7XG4gICAgICB0aGlzLmJvZHlIZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy5yZWNhbGN1bGF0ZVBhZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBwYWdlcyBhZnRlciBhIHVwZGF0ZS5cbiAgICovXG4gIHJlY2FsY3VsYXRlUGFnZXMoKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlU2l6ZSA9IHRoaXMuY2FsY1BhZ2VTaXplKCk7XG4gICAgdGhpcy5yb3dDb3VudCA9IHRoaXMuY2FsY1Jvd0NvdW50KCk7XG4gIH1cblxuICAvKipcbiAgICogQm9keSB0cmlnZ2VyZWQgYSBwYWdlIGV2ZW50LlxuICAgKi9cbiAgb25Cb2R5UGFnZSh7IG9mZnNldCB9OiBhbnkpOiB2b2lkIHtcbiAgICAvLyBBdm9pZCBwYWdpbmF0aW9uIGNhbWluZyBmcm9tIGJvZHkgZXZlbnRzIGxpa2Ugc2Nyb2xsIHdoZW4gdGhlIHRhYmxlXG4gICAgLy8gaGFzIG5vIHZpcnR1YWxpemF0aW9uIGFuZCB0aGUgZXh0ZXJuYWwgcGFnaW5nIGlzIGVuYWJsZS5cbiAgICAvLyBUaGlzIG1lYW5zLCBsZXQncyB0aGUgZGV2ZWxvcGVyIGhhbmRsZSBwYWdpbmF0aW9uIGJ5IG15IGhpbShoZXIpIHNlbGZcbiAgICBpZiAodGhpcy5leHRlcm5hbFBhZ2luZyAmJiAhdGhpcy52aXJ0dWFsaXphdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgdGhpcy5wYWdlLmVtaXQoe1xuICAgICAgY291bnQ6IHRoaXMuY291bnQsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBib2R5IHRyaWdnZXJlZCBhIHNjcm9sbCBldmVudC5cbiAgICovXG4gIG9uQm9keVNjcm9sbChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX29mZnNldFgubmV4dChldmVudC5vZmZzZXRYKTtcbiAgICB0aGlzLnNjcm9sbC5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZm9vdGVyIHRyaWdnZXJlZCBhIHBhZ2UgZXZlbnQuXG4gICAqL1xuICBvbkZvb3RlclBhZ2UoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub2Zmc2V0ID0gZXZlbnQucGFnZSAtIDE7XG4gICAgdGhpcy5ib2R5Q29tcG9uZW50LnVwZGF0ZU9mZnNldFkodGhpcy5vZmZzZXQpO1xuXG4gICAgdGhpcy5wYWdlLmVtaXQoe1xuICAgICAgY291bnQ6IHRoaXMuY291bnQsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdCh7XG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBzaXplcyBvZiB0aGUgcGFnZVxuICAgKi9cbiAgY2FsY1BhZ2VTaXplKHZhbDogYW55W10gPSB0aGlzLnJvd3MpOiBudW1iZXIge1xuICAgIC8vIEtlZXAgdGhlIHBhZ2Ugc2l6ZSBjb25zdGFudCBldmVuIGlmIHRoZSByb3cgaGFzIGJlZW4gZXhwYW5kZWQuXG4gICAgLy8gVGhpcyBpcyBiZWNhdXNlIGFuIGV4cGFuZGVkIHJvdyBpcyBzdGlsbCBjb25zaWRlcmVkIHRvIGJlIGEgY2hpbGQgb2ZcbiAgICAvLyB0aGUgb3JpZ2luYWwgcm93LiAgSGVuY2UgY2FsY3VsYXRpb24gd291bGQgdXNlIHJvd0hlaWdodCBvbmx5LlxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbikge1xuICAgICAgY29uc3Qgc2l6ZSA9IE1hdGguY2VpbCh0aGlzLmJvZHlIZWlnaHQgLyAodGhpcy5yb3dIZWlnaHQgYXMgbnVtYmVyKSk7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoc2l6ZSwgMCk7XG4gICAgfVxuXG4gICAgLy8gaWYgbGltaXQgaXMgcGFzc2VkLCB3ZSBhcmUgcGFnaW5nXG4gICAgaWYgKHRoaXMubGltaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMubGltaXQ7XG4gICAgfVxuXG4gICAgLy8gb3RoZXJ3aXNlIHVzZSByb3cgbGVuZ3RoXG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gb3RoZXIgZW1wdHkgOihcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSByb3cgY291bnQuXG4gICAqL1xuICBjYWxjUm93Q291bnQodmFsOiBhbnlbXSA9IHRoaXMucm93cyk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmV4dGVybmFsUGFnaW5nKSB7XG4gICAgICBpZiAoIXZhbCkgcmV0dXJuIDA7XG5cbiAgICAgIGlmICh0aGlzLmdyb3VwZWRSb3dzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwZWRSb3dzLmxlbmd0aDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50cmVlRnJvbVJlbGF0aW9uICE9IG51bGwgJiYgdGhpcy50cmVlVG9SZWxhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbFJvd3MubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY291bnQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb250ZXh0bWVudSBldmVudC5cbiAgICovXG4gIG9uQ29sdW1uQ29udGV4dG1lbnUoeyBldmVudCwgY29sdW1uIH06IGFueSk6IHZvaWQge1xuICAgIHRoaXMudGFibGVDb250ZXh0bWVudS5lbWl0KHsgZXZlbnQsIHR5cGU6IENvbnRleHRtZW51VHlwZS5oZWFkZXIsIGNvbnRlbnQ6IGNvbHVtbiB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYm9keSB0cmlnZ2VyZWQgYSBjb250ZXh0bWVudSBldmVudC5cbiAgICovXG4gIG9uUm93Q29udGV4dG1lbnUoeyBldmVudCwgcm93IH06IGFueSk6IHZvaWQge1xuICAgIHRoaXMudGFibGVDb250ZXh0bWVudS5lbWl0KHsgZXZlbnQsIHR5cGU6IENvbnRleHRtZW51VHlwZS5ib2R5LCBjb250ZW50OiByb3cgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb2x1bW4gcmVzaXplIGV2ZW50LlxuICAgKi9cbiAgb25Db2x1bW5SZXNpemUoeyBjb2x1bW4sIG5ld1ZhbHVlIH06IGFueSk6IHZvaWQge1xuICAgIC8qIFNhZmFyaS9pT1MgMTAuMiB3b3JrYXJvdW5kICovXG4gICAgaWYgKGNvbHVtbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGlkeDogbnVtYmVyO1xuICAgIGNvbnN0IGNvbHMgPSB0aGlzLl9pbnRlcm5hbENvbHVtbnMubWFwKChjLCBpKSA9PiB7XG4gICAgICBjID0geyAuLi5jIH07XG5cbiAgICAgIGlmIChjLiQkaWQgPT09IGNvbHVtbi4kJGlkKSB7XG4gICAgICAgIGlkeCA9IGk7XG4gICAgICAgIGMud2lkdGggPSBuZXdWYWx1ZTtcblxuICAgICAgICAvLyBzZXQgdGhpcyBzbyB3ZSBjYW4gZm9yY2UgdGhlIGNvbHVtblxuICAgICAgICAvLyB3aWR0aCBkaXN0cmlidXRpb24gdG8gYmUgdG8gdGhpcyB2YWx1ZVxuICAgICAgICBjLiQkb2xkV2lkdGggPSBuZXdWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGM7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucyhjb2xzLCBpZHgpO1xuICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IGNvbHM7XG5cbiAgICB0aGlzLnJlc2l6ZS5lbWl0KHtcbiAgICAgIGNvbHVtbixcbiAgICAgIG5ld1ZhbHVlXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb2x1bW4gcmUtb3JkZXIgZXZlbnQuXG4gICAqL1xuICBvbkNvbHVtblJlb3JkZXIoeyBjb2x1bW4sIG5ld1ZhbHVlLCBwcmV2VmFsdWUgfTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY29scyA9IHRoaXMuX2ludGVybmFsQ29sdW1ucy5tYXAoYyA9PiB7XG4gICAgICByZXR1cm4geyAuLi5jIH07XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5zd2FwQ29sdW1ucykge1xuICAgICAgY29uc3QgcHJldkNvbCA9IGNvbHNbbmV3VmFsdWVdO1xuICAgICAgY29sc1tuZXdWYWx1ZV0gPSBjb2x1bW47XG4gICAgICBjb2xzW3ByZXZWYWx1ZV0gPSBwcmV2Q29sO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobmV3VmFsdWUgPiBwcmV2VmFsdWUpIHtcbiAgICAgICAgY29uc3QgbW92ZWRDb2wgPSBjb2xzW3ByZXZWYWx1ZV07XG4gICAgICAgIGZvciAobGV0IGkgPSBwcmV2VmFsdWU7IGkgPCBuZXdWYWx1ZTsgaSsrKSB7XG4gICAgICAgICAgY29sc1tpXSA9IGNvbHNbaSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIGNvbHNbbmV3VmFsdWVdID0gbW92ZWRDb2w7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtb3ZlZENvbCA9IGNvbHNbcHJldlZhbHVlXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHByZXZWYWx1ZTsgaSA+IG5ld1ZhbHVlOyBpLS0pIHtcbiAgICAgICAgICBjb2xzW2ldID0gY29sc1tpIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgY29sc1tuZXdWYWx1ZV0gPSBtb3ZlZENvbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSBjb2xzO1xuXG4gICAgdGhpcy5yZW9yZGVyLmVtaXQoe1xuICAgICAgY29sdW1uLFxuICAgICAgbmV3VmFsdWUsXG4gICAgICBwcmV2VmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaGVhZGVyIHRyaWdnZXJlZCBhIGNvbHVtbiBzb3J0IGV2ZW50LlxuICAgKi9cbiAgb25Db2x1bW5Tb3J0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAvLyBjbGVhbiBzZWxlY3RlZCByb3dzXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdCh7XG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnNvcnRzID0gZXZlbnQuc29ydHM7XG5cbiAgICAvLyB0aGlzIGNvdWxkIGJlIG9wdGltaXplZCBiZXR0ZXIgc2luY2UgaXQgd2lsbCByZXNvcnRcbiAgICAvLyB0aGUgcm93cyBhZ2FpbiBvbiB0aGUgJ3B1c2gnIGRldGVjdGlvbi4uLlxuICAgIGlmICh0aGlzLmV4dGVybmFsU29ydGluZyA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGRvbid0IHVzZSBub3JtYWwgc2V0dGVyIHNvIHdlIGRvbid0IHJlc29ydFxuICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XG4gICAgfVxuXG4gICAgLy8gYXV0byBncm91cCBieSBwYXJlbnQgb24gbmV3IHVwZGF0ZVxuICAgIHRoaXMuX2ludGVybmFsUm93cyA9IGdyb3VwUm93c0J5UGFyZW50cyhcbiAgICAgIHRoaXMuX2ludGVybmFsUm93cyxcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVGcm9tUmVsYXRpb24pLFxuICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZVRvUmVsYXRpb24pXG4gICAgKTtcblxuICAgIC8vIEFsd2F5cyBnbyB0byBmaXJzdCBwYWdlIHdoZW4gc29ydGluZyB0byBzZWUgdGhlIG5ld2x5IHNvcnRlZCBkYXRhXG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMuYm9keUNvbXBvbmVudC51cGRhdGVPZmZzZXRZKHRoaXMub2Zmc2V0KTtcbiAgICB0aGlzLnNvcnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGFsbCByb3cgc2VsZWN0aW9uXG4gICAqL1xuICBvbkhlYWRlclNlbGVjdChldmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xuICAgICAgLy8gYmVmb3JlIHdlIHNwbGljZSwgY2hrIGlmIHdlIGN1cnJlbnRseSBoYXZlIGFsbCBzZWxlY3RlZFxuICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLmJvZHlDb21wb25lbnQuaW5kZXhlcy5maXJzdDtcbiAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmJvZHlDb21wb25lbnQuaW5kZXhlcy5sYXN0O1xuICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gbGFzdCAtIGZpcnN0O1xuXG4gICAgICAvLyByZW1vdmUgYWxsIGV4aXN0aW5nIGVpdGhlciB3YXlcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcblxuICAgICAgLy8gZG8gdGhlIG9wcG9zaXRlIGhlcmVcbiAgICAgIGlmICghYWxsU2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnRoaXMuX2ludGVybmFsUm93cy5zbGljZShmaXJzdCwgbGFzdCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBiZWZvcmUgd2Ugc3BsaWNlLCBjaGsgaWYgd2UgY3VycmVudGx5IGhhdmUgYWxsIHNlbGVjdGVkXG4gICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSB0aGlzLnJvd3MubGVuZ3RoO1xuICAgICAgLy8gcmVtb3ZlIGFsbCBleGlzdGluZyBlaXRoZXIgd2F5XG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICAvLyBkbyB0aGUgb3Bwb3NpdGUgaGVyZVxuICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goLi4udGhpcy5yb3dzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQSByb3cgd2FzIHNlbGVjdGVkIGZyb20gYm9keVxuICAgKi9cbiAgb25Cb2R5U2VsZWN0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJvdyB3YXMgZXhwYW5kZWQgb3IgY29sbGFwc2VkIGZvciB0cmVlXG4gICAqL1xuICBvblRyZWVBY3Rpb24oZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IHJvdyA9IGV2ZW50LnJvdztcbiAgICAvLyBUT0RPOiBGb3IgZHVwbGljYXRlZCBpdGVtcyB0aGlzIHdpbGwgbm90IHdvcmtcbiAgICBjb25zdCByb3dJbmRleCA9IHRoaXMuX3Jvd3MuZmluZEluZGV4KHIgPT4gclt0aGlzLnRyZWVUb1JlbGF0aW9uXSA9PT0gZXZlbnQucm93W3RoaXMudHJlZVRvUmVsYXRpb25dKTtcbiAgICB0aGlzLnRyZWVBY3Rpb24uZW1pdCh7IHJvdywgcm93SW5kZXggfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBsaXN0ZW4gZm9yIGNoYW5nZXMgdG8gaW5wdXQgYmluZGluZ3Mgb2YgYWxsIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSBhbmRcbiAgICogdHJpZ2dlciB0aGUgY29sdW1uVGVtcGxhdGVzLmNoYW5nZXMgb2JzZXJ2YWJsZSB0byBlbWl0XG4gICAqL1xuICBwcml2YXRlIGxpc3RlbkZvckNvbHVtbklucHV0Q2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNvbHVtbkNoYW5nZXNTZXJ2aWNlLmNvbHVtbklucHV0Q2hhbmdlcyQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uVGVtcGxhdGVzKSB7XG4gICAgICAgICAgdGhpcy5jb2x1bW5UZW1wbGF0ZXMubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc29ydEludGVybmFsUm93cygpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBzb3J0Um93cyh0aGlzLl9pbnRlcm5hbFJvd3MsIHRoaXMuX2ludGVybmFsQ29sdW1ucywgdGhpcy5zb3J0cyk7XG4gIH1cbn1cbiJdfQ==