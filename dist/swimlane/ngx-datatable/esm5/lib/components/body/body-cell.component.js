/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, ViewChild, ChangeDetectorRef, Output, EventEmitter, HostListener, ElementRef, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { MouseEvent, KeyboardEvent } from '../../events';
import { SortDirection } from '../../types/sort-direction.type';
import { Keys } from '../../utils/keys';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
var DataTableBodyCellComponent = /** @class */ (function () {
    function DataTableBodyCellComponent(element, cd, sanitizer) {
        this.cd = cd;
        this.sanitizer = sanitizer;
        this.activate = new EventEmitter();
        this.treeAction = new EventEmitter();
        this._isEditable = {};
        this.isFocused = false;
        this.onCheckboxChangeFn = this.onCheckboxChange.bind(this);
        this.activateFn = this.activate.emit.bind(this.activate);
        this.cellContext = {
            onCheckboxChangeFn: this.onCheckboxChangeFn,
            activateFn: this.activateFn,
            row: this.row,
            group: this.group,
            value: this.value,
            column: this.column,
            rowHeight: this.rowHeight,
            isSelected: this.isSelected,
            rowIndex: this.rowIndex,
            treeStatus: this.treeStatus,
            onTreeAction: this.onTreeAction.bind(this)
        };
        this._element = element.nativeElement;
    }
    Object.defineProperty(DataTableBodyCellComponent.prototype, "rowDetail", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rowDetail;
        },
        set: /**
         * @param {?} rowDetail
         * @return {?}
         */
        function (rowDetail) {
            this._rowDetail = rowDetail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "group", {
        get: /**
         * @return {?}
         */
        function () {
            return this._group;
        },
        set: /**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            this._group = group;
            this.cellContext.group = group;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "rowHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rowHeight;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._rowHeight = val;
            this.cellContext.rowHeight = val;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSelected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isSelected;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._isSelected = val;
            this.cellContext.isSelected = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._expanded = val;
            this.cellContext.expanded = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "rowIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rowIndex;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._rowIndex = val;
            this.cellContext.rowIndex = val;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "column", {
        get: /**
         * @return {?}
         */
        function () {
            return this._column;
        },
        set: /**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            this._column = column;
            this.cellContext.column = column;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "row", {
        get: /**
         * @return {?}
         */
        function () {
            return this._row;
        },
        set: /**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            this._row = row;
            this.cellContext.row = row;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "sorts", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sorts;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._sorts = val;
            this.calcSortDir = this.calcSortDir(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "treeStatus", {
        get: /**
         * @return {?}
         */
        function () {
            return this._treeStatus;
        },
        set: /**
         * @param {?} status
         * @return {?}
         */
        function (status) {
            if (status !== 'collapsed' && status !== 'expanded' && status !== 'loading' && status !== 'disabled') {
                this._treeStatus = 'collapsed';
            }
            else {
                this._treeStatus = status;
            }
            this.cellContext.treeStatus = this._treeStatus;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "columnCssClasses", {
        get: /**
         * @return {?}
         */
        function () {
            var e_1, _a;
            /** @type {?} */
            var cls = 'datatable-body-cell';
            if (this.column.cellClass) {
                if (typeof this.column.cellClass === 'string') {
                    cls += ' ' + this.column.cellClass;
                }
                else if (typeof this.column.cellClass === 'function') {
                    /** @type {?} */
                    var res = this.column.cellClass({
                        row: this.row,
                        group: this.group,
                        column: this.column,
                        value: this.value,
                        rowHeight: this.rowHeight
                    });
                    if (typeof res === 'string') {
                        cls += res;
                    }
                    else if (typeof res === 'object') {
                        /** @type {?} */
                        var keys = Object.keys(res);
                        try {
                            for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                                var k = keys_1_1.value;
                                if (res[k] === true) {
                                    cls += " " + k;
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
            }
            if (!this.sortDir) {
                cls += ' sort-active';
            }
            if (this.isFocused) {
                cls += ' active';
            }
            if (this.sortDir === SortDirection.asc) {
                cls += ' sort-asc';
            }
            if (this.sortDir === SortDirection.desc) {
                cls += ' sort-desc';
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "width", {
        get: /**
         * @return {?}
         */
        function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "minWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.column.minWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "maxWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.column.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "height", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var height = this.rowHeight;
            if (isNaN(height)) {
                return height;
            }
            return height + 'px';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        this.checkValueUpdates();
    };
    /**
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.cellTemplate) {
            this.cellTemplate.clear();
        }
    };
    /**
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.checkValueUpdates = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = '';
        if (!this.row || !this.column) {
            value = '';
        }
        else {
            /** @type {?} */
            var val = this.column.$$valueGetter(this.row, this.column.prop);
            /** @type {?} */
            var userPipe = this.column.pipe;
            if (userPipe) {
                value = userPipe.transform(val);
            }
            else if (value !== undefined) {
                value = val;
            }
        }
        if (this.value !== value) {
            this.value = value;
            this.cellContext.value = value;
            this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
            this.cd.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.isFocused = true;
    };
    /**
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.isFocused = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.activate.emit({
            type: 'click',
            event: event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.onDblClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.activate.emit({
            type: 'dblclick',
            event: event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyCode = event.keyCode;
        /** @type {?} */
        var isTargetCell = event.target === this._element;
        /** @type {?} */
        var isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetCell) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                group: this.group,
                rowHeight: this.rowHeight,
                column: this.column,
                value: this.value,
                cellElement: this._element
            });
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.onCheckboxChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.activate.emit({
            type: 'checkbox',
            event: event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element,
            treeStatus: 'collapsed'
        });
    };
    /**
     * @param {?} sorts
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.calcSortDir = /**
     * @param {?} sorts
     * @return {?}
     */
    function (sorts) {
        var _this = this;
        if (!sorts) {
            return;
        }
        /** @type {?} */
        var sort = sorts.find((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            return s.prop === _this.column.prop;
        }));
        if (sort) {
            return sort.dir;
        }
    };
    /**
     * @param {?} html
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.stripHtml = /**
     * @param {?} html
     * @return {?}
     */
    function (html) {
        if (!html.replace) {
            return html;
        }
        return html.replace(/<\/?[^>]+(>|$)/g, '');
    };
    /**
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.onTreeAction = /**
     * @return {?}
     */
    function () {
        this.treeAction.emit(this.row);
    };
    /**
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.calcLeftMargin = /**
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    function (column, row) {
        /** @type {?} */
        var levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
        return column.isTreeColumn ? row.level * levelIndent : 0;
    };
    /**
     * @param {?} row
     * @param {?} field
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.hasToShowToolTip = /**
     * @param {?} row
     * @param {?} field
     * @return {?}
     */
    function (row, field) {
        return row && field && field.tooltip && field.tooltip.length > 0;
    };
    /**
     * @param {?} value
     * @param {?} row
     * @param {?} field
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.getTooltipValue = /**
     * @param {?} value
     * @param {?} row
     * @param {?} field
     * @return {?}
     */
    function (value, row, field) {
        if (row && field && field.tooltip && field.tooltip.length > 0) {
            return row["" + field.tooltip];
        }
        return value;
    };
    /**
     * @param {?} row
     * @param {?} icons
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.getIcons = /**
     * @param {?} row
     * @param {?} icons
     * @return {?}
     */
    function (row, icons) {
        if (row && icons) {
            /** @type {?} */
            var iconsArray = icons.split('.');
            return iconsArray.length > 1 && row[iconsArray[0]] ? row[iconsArray[0]][iconsArray[1]] || [] : row[icons] || [];
        }
        return [];
    };
    /**
     * @param {?} row
     * @param {?} prop
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.selectFieldValue = /**
     * @param {?} row
     * @param {?} prop
     * @return {?}
     */
    function (row, prop) {
        if (row && prop) {
            /** @type {?} */
            var propArray = prop.split('.');
            return propArray.length > 1 && row[propArray[0]] ? row[propArray[0]][propArray[1]] : row[prop];
        }
        return ' ';
    };
    /**
     * @param {?} event
     * @param {?} field
     * @param {?} row
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.onClickRowActionButton = /**
     * @param {?} event
     * @param {?} field
     * @param {?} row
     * @return {?}
     */
    function (event, field, row) {
        if (field && row) {
            event.preventDefault();
            event.stopPropagation();
            field.action(row);
        }
    };
    /**
     * @param {?} html
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.sanatizeHtml = /**
     * @param {?} html
     * @return {?}
     */
    function (html) {
        return (/** @type {?} */ (this.sanitizer.bypassSecurityTrustHtml(html)));
    };
    /**
     * @param {?} field
     * @param {?} row
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.isEditable = /**
     * @param {?} field
     * @param {?} row
     * @return {?}
     */
    function (field, row) {
        if (field && row) {
            if (!this._isEditable[field.prop + row.id]) {
                this._isEditable[field.prop + row.id] = field.editable(row);
            }
            return this._isEditable[field.prop + row.id];
        }
        return of(false);
    };
    /**
     * @param {?} field
     * @param {?} row
     * @param {?} newValue
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.updateSelect = /**
     * @param {?} field
     * @param {?} row
     * @param {?} newValue
     * @return {?}
     */
    function (field, row, newValue) {
        row[field.prop] = newValue;
        if (field.onEdit) {
            field.onEdit(row);
        }
    };
    /**
     * @param {?} field
     * @param {?} row
     * @param {?} newValue
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.editField = /**
     * @param {?} field
     * @param {?} row
     * @param {?} newValue
     * @return {?}
     */
    function (field, row, newValue) {
        var _a;
        field.onEdit(tslib_1.__assign({}, row, (_a = {}, _a[field.prop] = newValue, _a)));
    };
    /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.toggleExpandRow = /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    function (row, event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.rowDetail) {
            this.rowDetail.toggleExpandRow(row);
        }
    };
    DataTableBodyCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-body-cell',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div\n      class=\"datatable-body-cell-label\"\n      style=\"display: flex; align-items:center; height: 100%;\"\n      [style.margin-left.px]=\"calcLeftMargin(column, row)\"\n    >\n      <a\n        *ngIf=\"column?.prop === 'ice-expandable' && row?.detail?.length > 0\"\n        href=\"javascript:void(0)\"\n        [class.datatable-icon-down]=\"!expanded\"\n        [class.datatable-icon-up]=\"expanded\"\n        style=\"font-size: 18px; display: flex; align-items: center;\"\n        title=\"Expand/Collapse Row\"\n        (click)=\"toggleExpandRow(row, $event)\"\n      >\n      </a>\n      <ng-container *ngIf=\"column?.prop !== 'ice-expandable'\">\n        <label\n          *ngIf=\"column.checkboxable && (!displayCheck || displayCheck(row, column, value))\"\n          class=\"datatable-checkbox\"\n        >\n          <input type=\"checkbox\" [checked]=\"isSelected\" (click)=\"onCheckboxChange($event)\" />\n        </label>\n        <ng-container *ngIf=\"column.isTreeColumn\">\n          <button\n            *ngIf=\"!column.treeToggleTemplate\"\n            class=\"datatable-tree-button\"\n            [disabled]=\"treeStatus === 'disabled'\"\n            (click)=\"onTreeAction()\"\n          >\n            <span>\n              <i *ngIf=\"treeStatus === 'loading'\" class=\"icon datatable-icon-collapse\"></i>\n              <i *ngIf=\"treeStatus === 'collapsed'\" class=\"icon datatable-icon-up\"></i>\n              <i *ngIf=\"treeStatus === 'expanded' || treeStatus === 'disabled'\" class=\"icon datatable-icon-down\"></i>\n            </span>\n          </button>\n          <ng-template\n            *ngIf=\"column.treeToggleTemplate\"\n            [ngTemplateOutlet]=\"column.treeToggleTemplate\"\n            [ngTemplateOutletContext]=\"{ cellContext: cellContext }\"\n          >\n          </ng-template>\n        </ng-container>\n\n        <div *ngIf=\"column.icons as icons\" style=\"display: flex; flex-direction: column; margin-right: 10px;\">\n          <mat-icon\n            *ngFor=\"let i of getIcons(row, icons)\"\n            [innerHTML]=\"i.icon\"\n            [matTooltip]=\"i.text\"\n            class=\"{{ i.class }} mat-icon material-icons ice-ml-10\"\n          ></mat-icon>\n        </div>\n\n        <mat-icon\n          *ngIf=\"\n            column.iconCustomTooltipHtmlText &&\n            column.prop &&\n            selectFieldValue(row, column.iconCustomTooltipHtmlText) as customHtml\n          \"\n          iceCustomHtmlToolTip\n          [iceTooltipHtmlText]=\"sanatizeHtml(customHtml)\"\n          [duration]=\"1500\"\n          class=\"material-icons\"\n          [ngClass]=\"column.prop && selectFieldValue(row, column.iconColor)\"\n          >priority_high</mat-icon\n        >\n\n        <mat-icon\n          *ngIf=\"column.prop && row[column.prop.toString() + 'InfoTooltip']\"\n          [matTooltip]=\"column.prop && row[column.prop.toString() + 'InfoTooltip']\"\n          class=\"mat-icon material-icons\"\n          >info</mat-icon\n        >\n\n        <mat-icon\n          *ngIf=\"column.prop && row[column.prop.toString() + 'Excluded']\"\n          [matTooltip]=\"column.prop && row[column.prop.toString() + 'Excluded']\"\n          class=\"mat-icon material-icons\"\n          >block</mat-icon\n        >\n\n        <h4\n          *ngIf=\"\n            !column.actionButtonIcon &&\n            !column.cellTemplate &&\n            !column.selectOptions &&\n            (!column.editable || !(isEditable(column, row) | async))\n          \"\n          class=\"ice-data-table-row\"\n          iceCustomHtmlToolTip\n          [iceTooltipHtmlText]=\"getTooltipValue(value, row, column)\"\n          [showToolTipOnTextOverflow]=\"true\"\n          [showToolTip]=\"hasToShowToolTip(row, column)\"\n          [innerHTML]=\"value\"\n        ></h4>\n\n        <button\n          *ngIf=\"column.actionButtonIcon && !(column.hideActionButton && column.hideActionButton(row) | async)\"\n          mat-icon-button\n          [matTooltip]=\"column.actionButtonTooltip\"\n          (click)=\"onClickRowActionButton($event, column, row)\"\n        >\n          <mat-icon class=\"mat-icon material-icons\">{{ column.actionButtonIcon }}</mat-icon>\n        </button>\n\n        <ice-datatable-row-select\n          style=\"margin-top: 18px\"\n          [options]=\"column.selectOptions\"\n          [ngClass]=\"column.cellClass\"\n          (update)=\"updateSelect(column, row, $event)\"\n          [value]=\"value || column.defaultValue\"\n          [selectDisabled]=\"column.disabled\"\n          *ngIf=\"column.selectOptions && !(column.hideIfEmpty && column.disabled && value === '')\"\n        ></ice-datatable-row-select>\n\n        <ng-container *ngIf=\"!column.selectOptions && (column.editable && isEditable(column, row) | async)\">\n          <mat-icon class=\"mat-icon material-icons\" *ngIf=\"!column.hideEditIcon\">edit</mat-icon>\n          <ice-editable-text\n            [ngClass]=\"column.cellClass\"\n            (update)=\"editField(column, row, $event)\"\n            [errorText]=\"selectFieldValue(row, column.errorMessageField)\"\n            [value]=\"value\"\n          >\n            {{ value }}\n          </ice-editable-text>\n        </ng-container>\n\n        <ng-template\n          #cellTemplate\n          *ngIf=\"column.cellTemplate\"\n          [ngTemplateOutlet]=\"column.cellTemplate\"\n          [ngTemplateOutletContext]=\"cellContext\"\n        >\n        </ng-template>\n      </ng-container>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    DataTableBodyCellComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: DomSanitizer }
    ]; };
    DataTableBodyCellComponent.propDecorators = {
        displayCheck: [{ type: Input }],
        rowDetail: [{ type: Input }],
        group: [{ type: Input }],
        rowHeight: [{ type: Input }],
        isSelected: [{ type: Input }],
        expanded: [{ type: Input }],
        rowIndex: [{ type: Input }],
        column: [{ type: Input }],
        row: [{ type: Input }],
        sorts: [{ type: Input }],
        treeStatus: [{ type: Input }],
        activate: [{ type: Output }],
        treeAction: [{ type: Output }],
        cellTemplate: [{ type: ViewChild, args: ['cellTemplate', { read: ViewContainerRef, static: true },] }],
        columnCssClasses: [{ type: HostBinding, args: ['class',] }],
        width: [{ type: HostBinding, args: ['style.width.px',] }],
        minWidth: [{ type: HostBinding, args: ['style.minWidth.px',] }],
        maxWidth: [{ type: HostBinding, args: ['style.maxWidth.px',] }],
        height: [{ type: HostBinding, args: ['style.height',] }],
        onFocus: [{ type: HostListener, args: ['focus',] }],
        onBlur: [{ type: HostListener, args: ['blur',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        onDblClick: [{ type: HostListener, args: ['dblclick', ['$event'],] }],
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return DataTableBodyCellComponent;
}());
export { DataTableBodyCellComponent };
if (false) {
    /** @type {?} */
    DataTableBodyCellComponent.prototype.displayCheck;
    /** @type {?} */
    DataTableBodyCellComponent.prototype.activate;
    /** @type {?} */
    DataTableBodyCellComponent.prototype.treeAction;
    /** @type {?} */
    DataTableBodyCellComponent.prototype.cellTemplate;
    /** @type {?} */
    DataTableBodyCellComponent.prototype._isEditable;
    /** @type {?} */
    DataTableBodyCellComponent.prototype.sanitizedValue;
    /** @type {?} */
    DataTableBodyCellComponent.prototype.value;
    /** @type {?} */
    DataTableBodyCellComponent.prototype.sortDir;
    /** @type {?} */
    DataTableBodyCellComponent.prototype.isFocused;
    /** @type {?} */
    DataTableBodyCellComponent.prototype.onCheckboxChangeFn;
    /** @type {?} */
    DataTableBodyCellComponent.prototype.activateFn;
    /** @type {?} */
    DataTableBodyCellComponent.prototype.cellContext;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._isSelected;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._sorts;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._column;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._row;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._rowDetail;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._group;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._rowHeight;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._rowIndex;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._expanded;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype._treeStatus;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9ib2R5LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osVUFBVSxFQUNWLGdCQUFnQixFQUdoQix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUl0QztJQXNXRSxvQ0FBWSxPQUFtQixFQUFVLEVBQXFCLEVBQVUsU0FBdUI7UUFBdEQsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBM0dyRixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBdUU3RCxnQkFBVyxHQUF5QyxFQUFFLENBQUM7UUFJdkQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQix1QkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELGVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxD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QUFDLE9BQU87d0JBMkNuQixXQUFXLFNBQUMsZ0JBQWdCOzJCQUs1QixXQUFXLFNBQUMsbUJBQW1COzJCQUsvQixXQUFXLFNBQUMsbUJBQW1CO3lCQUsvQixXQUFXLFNBQUMsY0FBYzswQkFnRjFCLFlBQVksU0FBQyxPQUFPO3lCQUtwQixZQUFZLFNBQUMsTUFBTTswQkFLbkIsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs2QkFjaEMsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFjbkMsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUE0SXJDLGlDQUFDO0NBQUEsQUE5akJELElBOGpCQztTQWpiWSwwQkFBMEI7OztJQUNyQyxrREFBZ0Y7O0lBNkdoRiw4Q0FBMkQ7O0lBRTNELGdEQUE2RDs7SUFFN0Qsa0RBQytCOztJQW9FL0IsaURBQXVEOztJQUN2RCxvREFBb0I7O0lBQ3BCLDJDQUFXOztJQUNYLDZDQUF1Qjs7SUFDdkIsK0NBQWtCOztJQUNsQix3REFBc0Q7O0lBQ3RELGdEQUFvRDs7SUFFcEQsaURBWUU7Ozs7O0lBRUYsaURBQTZCOzs7OztJQUM3Qiw0Q0FBc0I7Ozs7O0lBQ3RCLDZDQUE2Qjs7Ozs7SUFDN0IsMENBQWtCOzs7OztJQUNsQixnREFBd0I7Ozs7O0lBQ3hCLDRDQUFvQjs7Ozs7SUFDcEIsZ0RBQTJCOzs7OztJQUMzQiwrQ0FBMEI7Ozs7O0lBQzFCLCtDQUEyQjs7Ozs7SUFDM0IsOENBQXNCOzs7OztJQUN0QixpREFBZ0M7Ozs7O0lBRUMsd0NBQTZCOzs7OztJQUFFLCtDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIFBpcGVUcmFuc2Zvcm0sXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgVmlld0NoaWxkLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBPbkRlc3Ryb3ksXHJcbiAgRG9DaGVjayxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuLi8uLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XHJcbmltcG9ydCB7IE1vdXNlRXZlbnQsIEtleWJvYXJkRXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudHMnO1xyXG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vdHlwZXMvc29ydC1kaXJlY3Rpb24udHlwZSc7XHJcbmltcG9ydCB7IEtleXMgfSBmcm9tICcuLi8uLi91dGlscy9rZXlzJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgdHlwZSBUcmVlU3RhdHVzID0gJ2NvbGxhcHNlZCcgfCAnZXhwYW5kZWQnIHwgJ2xvYWRpbmcnIHwgJ2Rpc2FibGVkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWJvZHktY2VsbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJkYXRhdGFibGUtYm9keS1jZWxsLWxhYmVsXCJcclxuICAgICAgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGhlaWdodDogMTAwJTtcIlxyXG4gICAgICBbc3R5bGUubWFyZ2luLWxlZnQucHhdPVwiY2FsY0xlZnRNYXJnaW4oY29sdW1uLCByb3cpXCJcclxuICAgID5cclxuICAgICAgPGFcclxuICAgICAgICAqbmdJZj1cImNvbHVtbj8ucHJvcCA9PT0gJ2ljZS1leHBhbmRhYmxlJyAmJiByb3c/LmRldGFpbD8ubGVuZ3RoID4gMFwiXHJcbiAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXHJcbiAgICAgICAgW2NsYXNzLmRhdGF0YWJsZS1pY29uLWRvd25dPVwiIWV4cGFuZGVkXCJcclxuICAgICAgICBbY2xhc3MuZGF0YXRhYmxlLWljb24tdXBdPVwiZXhwYW5kZWRcIlxyXG4gICAgICAgIHN0eWxlPVwiZm9udC1zaXplOiAxOHB4OyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyO1wiXHJcbiAgICAgICAgdGl0bGU9XCJFeHBhbmQvQ29sbGFwc2UgUm93XCJcclxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kUm93KHJvdywgJGV2ZW50KVwiXHJcbiAgICAgID5cclxuICAgICAgPC9hPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uPy5wcm9wICE9PSAnaWNlLWV4cGFuZGFibGUnXCI+XHJcbiAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5jaGVja2JveGFibGUgJiYgKCFkaXNwbGF5Q2hlY2sgfHwgZGlzcGxheUNoZWNrKHJvdywgY29sdW1uLCB2YWx1ZSkpXCJcclxuICAgICAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLWNoZWNrYm94XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZFwiIChjbGljayk9XCJvbkNoZWNrYm94Q2hhbmdlKCRldmVudClcIiAvPlxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbi5pc1RyZWVDb2x1bW5cIj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgKm5nSWY9XCIhY29sdW1uLnRyZWVUb2dnbGVUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLXRyZWUtYnV0dG9uXCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cInRyZWVTdGF0dXMgPT09ICdkaXNhYmxlZCdcIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwib25UcmVlQWN0aW9uKClcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICA8aSAqbmdJZj1cInRyZWVTdGF0dXMgPT09ICdsb2FkaW5nJ1wiIGNsYXNzPVwiaWNvbiBkYXRhdGFibGUtaWNvbi1jb2xsYXBzZVwiPjwvaT5cclxuICAgICAgICAgICAgICA8aSAqbmdJZj1cInRyZWVTdGF0dXMgPT09ICdjb2xsYXBzZWQnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLXVwXCI+PC9pPlxyXG4gICAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2V4cGFuZGVkJyB8fCB0cmVlU3RhdHVzID09PSAnZGlzYWJsZWQnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLWRvd25cIj48L2k+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICAgICAgICpuZ0lmPVwiY29sdW1uLnRyZWVUb2dnbGVUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbi50cmVlVG9nZ2xlVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBjZWxsQ29udGV4dDogY2VsbENvbnRleHQgfVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiY29sdW1uLmljb25zIGFzIGljb25zXCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBtYXJnaW4tcmlnaHQ6IDEwcHg7XCI+XHJcbiAgICAgICAgICA8bWF0LWljb25cclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGkgb2YgZ2V0SWNvbnMocm93LCBpY29ucylcIlxyXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cImkuaWNvblwiXHJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImkudGV4dFwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwie3sgaS5jbGFzcyB9fSBtYXQtaWNvbiBtYXRlcmlhbC1pY29ucyBpY2UtbWwtMTBcIlxyXG4gICAgICAgICAgPjwvbWF0LWljb24+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxtYXQtaWNvblxyXG4gICAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICAgY29sdW1uLmljb25DdXN0b21Ub29sdGlwSHRtbFRleHQgJiZcclxuICAgICAgICAgICAgY29sdW1uLnByb3AgJiZcclxuICAgICAgICAgICAgc2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5pY29uQ3VzdG9tVG9vbHRpcEh0bWxUZXh0KSBhcyBjdXN0b21IdG1sXHJcbiAgICAgICAgICBcIlxyXG4gICAgICAgICAgaWNlQ3VzdG9tSHRtbFRvb2xUaXBcclxuICAgICAgICAgIFtpY2VUb29sdGlwSHRtbFRleHRdPVwic2FuYXRpemVIdG1sKGN1c3RvbUh0bWwpXCJcclxuICAgICAgICAgIFtkdXJhdGlvbl09XCIxNTAwXCJcclxuICAgICAgICAgIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLnByb3AgJiYgc2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5pY29uQ29sb3IpXCJcclxuICAgICAgICAgID5wcmlvcml0eV9oaWdoPC9tYXQtaWNvblxyXG4gICAgICAgID5cclxuXHJcbiAgICAgICAgPG1hdC1pY29uXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0luZm9Ub29sdGlwJ11cIlxyXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnSW5mb1Rvb2x0aXAnXVwiXHJcbiAgICAgICAgICBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCJcclxuICAgICAgICAgID5pbmZvPC9tYXQtaWNvblxyXG4gICAgICAgID5cclxuXHJcbiAgICAgICAgPG1hdC1pY29uXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0V4Y2x1ZGVkJ11cIlxyXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnRXhjbHVkZWQnXVwiXHJcbiAgICAgICAgICBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCJcclxuICAgICAgICAgID5ibG9jazwvbWF0LWljb25cclxuICAgICAgICA+XHJcblxyXG4gICAgICAgIDxoNFxyXG4gICAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICAgIWNvbHVtbi5hY3Rpb25CdXR0b25JY29uICYmXHJcbiAgICAgICAgICAgICFjb2x1bW4uY2VsbFRlbXBsYXRlICYmXHJcbiAgICAgICAgICAgICFjb2x1bW4uc2VsZWN0T3B0aW9ucyAmJlxyXG4gICAgICAgICAgICAoIWNvbHVtbi5lZGl0YWJsZSB8fCAhKGlzRWRpdGFibGUoY29sdW1uLCByb3cpIHwgYXN5bmMpKVxyXG4gICAgICAgICAgXCJcclxuICAgICAgICAgIGNsYXNzPVwiaWNlLWRhdGEtdGFibGUtcm93XCJcclxuICAgICAgICAgIGljZUN1c3RvbUh0bWxUb29sVGlwXHJcbiAgICAgICAgICBbaWNlVG9vbHRpcEh0bWxUZXh0XT1cImdldFRvb2x0aXBWYWx1ZSh2YWx1ZSwgcm93LCBjb2x1bW4pXCJcclxuICAgICAgICAgIFtzaG93VG9vbFRpcE9uVGV4dE92ZXJmbG93XT1cInRydWVcIlxyXG4gICAgICAgICAgW3Nob3dUb29sVGlwXT1cImhhc1RvU2hvd1Rvb2xUaXAocm93LCBjb2x1bW4pXCJcclxuICAgICAgICAgIFtpbm5lckhUTUxdPVwidmFsdWVcIlxyXG4gICAgICAgID48L2g0PlxyXG5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5hY3Rpb25CdXR0b25JY29uICYmICEoY29sdW1uLmhpZGVBY3Rpb25CdXR0b24gJiYgY29sdW1uLmhpZGVBY3Rpb25CdXR0b24ocm93KSB8IGFzeW5jKVwiXHJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cclxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImNvbHVtbi5hY3Rpb25CdXR0b25Ub29sdGlwXCJcclxuICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrUm93QWN0aW9uQnV0dG9uKCRldmVudCwgY29sdW1uLCByb3cpXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaWNvbiBtYXRlcmlhbC1pY29uc1wiPnt7IGNvbHVtbi5hY3Rpb25CdXR0b25JY29uIH19PC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGljZS1kYXRhdGFibGUtcm93LXNlbGVjdFxyXG4gICAgICAgICAgc3R5bGU9XCJtYXJnaW4tdG9wOiAxOHB4XCJcclxuICAgICAgICAgIFtvcHRpb25zXT1cImNvbHVtbi5zZWxlY3RPcHRpb25zXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cImNvbHVtbi5jZWxsQ2xhc3NcIlxyXG4gICAgICAgICAgKHVwZGF0ZSk9XCJ1cGRhdGVTZWxlY3QoY29sdW1uLCByb3csICRldmVudClcIlxyXG4gICAgICAgICAgW3ZhbHVlXT1cInZhbHVlIHx8IGNvbHVtbi5kZWZhdWx0VmFsdWVcIlxyXG4gICAgICAgICAgW3NlbGVjdERpc2FibGVkXT1cImNvbHVtbi5kaXNhYmxlZFwiXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5zZWxlY3RPcHRpb25zICYmICEoY29sdW1uLmhpZGVJZkVtcHR5ICYmIGNvbHVtbi5kaXNhYmxlZCAmJiB2YWx1ZSA9PT0gJycpXCJcclxuICAgICAgICA+PC9pY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3Q+XHJcblxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY29sdW1uLnNlbGVjdE9wdGlvbnMgJiYgKGNvbHVtbi5lZGl0YWJsZSAmJiBpc0VkaXRhYmxlKGNvbHVtbiwgcm93KSB8IGFzeW5jKVwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIiAqbmdJZj1cIiFjb2x1bW4uaGlkZUVkaXRJY29uXCI+ZWRpdDwvbWF0LWljb24+XHJcbiAgICAgICAgICA8aWNlLWVkaXRhYmxlLXRleHRcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLmNlbGxDbGFzc1wiXHJcbiAgICAgICAgICAgICh1cGRhdGUpPVwiZWRpdEZpZWxkKGNvbHVtbiwgcm93LCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgW2Vycm9yVGV4dF09XCJzZWxlY3RGaWVsZFZhbHVlKHJvdywgY29sdW1uLmVycm9yTWVzc2FnZUZpZWxkKVwiXHJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt7IHZhbHVlIH19XHJcbiAgICAgICAgICA8L2ljZS1lZGl0YWJsZS10ZXh0PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICAgICNjZWxsVGVtcGxhdGVcclxuICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmNlbGxUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcclxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjZWxsQ29udGV4dFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlQm9keUNlbGxDb21wb25lbnQgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlDaGVjazogKHJvdzogYW55LCBjb2x1bW4/OiBUYWJsZUNvbHVtbiwgdmFsdWU/OiBhbnkpID0+IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIHNldCByb3dEZXRhaWwocm93RGV0YWlsOiBhbnkpIHtcclxuICAgIHRoaXMuX3Jvd0RldGFpbCA9IHJvd0RldGFpbDtcclxuICB9XHJcblxyXG4gIGdldCByb3dEZXRhaWwoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9yb3dEZXRhaWw7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgZ3JvdXAoZ3JvdXA6IGFueSkge1xyXG4gICAgdGhpcy5fZ3JvdXAgPSBncm91cDtcclxuICAgIHRoaXMuY2VsbENvbnRleHQuZ3JvdXAgPSBncm91cDtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZ3JvdXAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXA7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgcm93SGVpZ2h0KHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9yb3dIZWlnaHQgPSB2YWw7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvd0hlaWdodCA9IHZhbDtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93SGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd0hlaWdodDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBpc1NlbGVjdGVkKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IHZhbDtcclxuICAgIHRoaXMuY2VsbENvbnRleHQuaXNTZWxlY3RlZCA9IHZhbDtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdGVkO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGV4cGFuZGVkKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZXhwYW5kZWQgPSB2YWw7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LmV4cGFuZGVkID0gdmFsO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCByb3dJbmRleCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fcm93SW5kZXggPSB2YWw7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvd0luZGV4ID0gdmFsO1xyXG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCByb3dJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd0luZGV4O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGNvbHVtbihjb2x1bW46IFRhYmxlQ29sdW1uKSB7XHJcbiAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LmNvbHVtbiA9IGNvbHVtbjtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY29sdW1uKCk6IFRhYmxlQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW47XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgcm93KHJvdzogYW55KSB7XHJcbiAgICB0aGlzLl9yb3cgPSByb3c7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvdyA9IHJvdztcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93KCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcm93O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IHNvcnRzKHZhbDogYW55W10pIHtcclxuICAgIHRoaXMuX3NvcnRzID0gdmFsO1xyXG4gICAgdGhpcy5jYWxjU29ydERpciA9IHRoaXMuY2FsY1NvcnREaXIodmFsKTtcclxuICB9XHJcblxyXG4gIGdldCBzb3J0cygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc29ydHM7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgdHJlZVN0YXR1cyhzdGF0dXM6IFRyZWVTdGF0dXMpIHtcclxuICAgIGlmIChzdGF0dXMgIT09ICdjb2xsYXBzZWQnICYmIHN0YXR1cyAhPT0gJ2V4cGFuZGVkJyAmJiBzdGF0dXMgIT09ICdsb2FkaW5nJyAmJiBzdGF0dXMgIT09ICdkaXNhYmxlZCcpIHtcclxuICAgICAgdGhpcy5fdHJlZVN0YXR1cyA9ICdjb2xsYXBzZWQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fdHJlZVN0YXR1cyA9IHN0YXR1cztcclxuICAgIH1cclxuICAgIHRoaXMuY2VsbENvbnRleHQudHJlZVN0YXR1cyA9IHRoaXMuX3RyZWVTdGF0dXM7XHJcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRyZWVTdGF0dXMoKTogVHJlZVN0YXR1cyB7XHJcbiAgICByZXR1cm4gdGhpcy5fdHJlZVN0YXR1cztcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnY2VsbFRlbXBsYXRlJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcclxuICBjZWxsVGVtcGxhdGU6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxyXG4gIGdldCBjb2x1bW5Dc3NDbGFzc2VzKCk6IGFueSB7XHJcbiAgICBsZXQgY2xzID0gJ2RhdGF0YWJsZS1ib2R5LWNlbGwnO1xyXG4gICAgaWYgKHRoaXMuY29sdW1uLmNlbGxDbGFzcykge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmNlbGxDbGFzcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBjbHMgKz0gJyAnICsgdGhpcy5jb2x1bW4uY2VsbENsYXNzO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5jZWxsQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmNvbHVtbi5jZWxsQ2xhc3Moe1xyXG4gICAgICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxyXG4gICAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGNscyArPSByZXM7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcyk7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xyXG4gICAgICAgICAgICBpZiAocmVzW2tdID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgY2xzICs9IGAgJHtrfWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zb3J0RGlyKSB7XHJcbiAgICAgIGNscyArPSAnIHNvcnQtYWN0aXZlJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzRm9jdXNlZCkge1xyXG4gICAgICBjbHMgKz0gJyBhY3RpdmUnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5hc2MpIHtcclxuICAgICAgY2xzICs9ICcgc29ydC1hc2MnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5kZXNjKSB7XHJcbiAgICAgIGNscyArPSAnIHNvcnQtZGVzYyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNscztcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxyXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLndpZHRoO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5taW5XaWR0aC5weCcpXHJcbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWluV2lkdGg7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1heFdpZHRoLnB4JylcclxuICBnZXQgbWF4V2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbi5tYXhXaWR0aDtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JylcclxuICBnZXQgaGVpZ2h0KCk6IHN0cmluZyB8IG51bWJlciB7XHJcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnJvd0hlaWdodDtcclxuICAgIGlmIChpc05hTihoZWlnaHQpKSB7XHJcbiAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVpZ2h0ICsgJ3B4JztcclxuICB9XHJcbiAgX2lzRWRpdGFibGU6IHsgW2E6IHN0cmluZ106IE9ic2VydmFibGU8Ym9vbGVhbj4gfSA9IHt9O1xyXG4gIHNhbml0aXplZFZhbHVlOiBhbnk7XHJcbiAgdmFsdWU6IGFueTtcclxuICBzb3J0RGlyOiBTb3J0RGlyZWN0aW9uO1xyXG4gIGlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gIG9uQ2hlY2tib3hDaGFuZ2VGbiA9IHRoaXMub25DaGVja2JveENoYW5nZS5iaW5kKHRoaXMpO1xyXG4gIGFjdGl2YXRlRm4gPSB0aGlzLmFjdGl2YXRlLmVtaXQuYmluZCh0aGlzLmFjdGl2YXRlKTtcclxuXHJcbiAgY2VsbENvbnRleHQ6IGFueSA9IHtcclxuICAgIG9uQ2hlY2tib3hDaGFuZ2VGbjogdGhpcy5vbkNoZWNrYm94Q2hhbmdlRm4sXHJcbiAgICBhY3RpdmF0ZUZuOiB0aGlzLmFjdGl2YXRlRm4sXHJcbiAgICByb3c6IHRoaXMucm93LFxyXG4gICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXHJcbiAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxyXG4gICAgaXNTZWxlY3RlZDogdGhpcy5pc1NlbGVjdGVkLFxyXG4gICAgcm93SW5kZXg6IHRoaXMucm93SW5kZXgsXHJcbiAgICB0cmVlU3RhdHVzOiB0aGlzLnRyZWVTdGF0dXMsXHJcbiAgICBvblRyZWVBY3Rpb246IHRoaXMub25UcmVlQWN0aW9uLmJpbmQodGhpcylcclxuICB9O1xyXG5cclxuICBwcml2YXRlIF9pc1NlbGVjdGVkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgX3NvcnRzOiBhbnlbXTtcclxuICBwcml2YXRlIF9jb2x1bW46IFRhYmxlQ29sdW1uO1xyXG4gIHByaXZhdGUgX3JvdzogYW55O1xyXG4gIHByaXZhdGUgX3Jvd0RldGFpbDogYW55O1xyXG4gIHByaXZhdGUgX2dyb3VwOiBhbnk7XHJcbiAgcHJpdmF0ZSBfcm93SGVpZ2h0OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfcm93SW5kZXg6IG51bWJlcjtcclxuICBwcml2YXRlIF9leHBhbmRlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIF9lbGVtZW50OiBhbnk7XHJcbiAgcHJpdmF0ZSBfdHJlZVN0YXR1czogVHJlZVN0YXR1cztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XHJcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNlbGxUZW1wbGF0ZSkge1xyXG4gICAgICB0aGlzLmNlbGxUZW1wbGF0ZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tWYWx1ZVVwZGF0ZXMoKTogdm9pZCB7XHJcbiAgICBsZXQgdmFsdWUgPSAnJztcclxuXHJcbiAgICBpZiAoIXRoaXMucm93IHx8ICF0aGlzLmNvbHVtbikge1xyXG4gICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdmFsID0gdGhpcy5jb2x1bW4uJCR2YWx1ZUdldHRlcih0aGlzLnJvdywgdGhpcy5jb2x1bW4ucHJvcCk7XHJcbiAgICAgIGNvbnN0IHVzZXJQaXBlOiBQaXBlVHJhbnNmb3JtID0gdGhpcy5jb2x1bW4ucGlwZTtcclxuXHJcbiAgICAgIGlmICh1c2VyUGlwZSkge1xyXG4gICAgICAgIHZhbHVlID0gdXNlclBpcGUudHJhbnNmb3JtKHZhbCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHZhbHVlID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5jZWxsQ29udGV4dC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLnNhbml0aXplZFZhbHVlID0gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHRoaXMuc3RyaXBIdG1sKHZhbHVlKSA6IHZhbHVlO1xyXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxyXG4gIG9uRm9jdXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdibHVyJylcclxuICBvbkJsdXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XHJcbiAgICAgIHR5cGU6ICdjbGljaycsXHJcbiAgICAgIGV2ZW50LFxyXG4gICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcclxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJywgWyckZXZlbnQnXSlcclxuICBvbkRibENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xyXG4gICAgICB0eXBlOiAnZGJsY2xpY2snLFxyXG4gICAgICBldmVudCxcclxuICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXHJcbiAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXHJcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICBjZWxsRWxlbWVudDogdGhpcy5fZWxlbWVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xyXG4gICAgY29uc3QgaXNUYXJnZXRDZWxsID0gZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9lbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGlzQWN0aW9uID1cclxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5yZXR1cm4gfHxcclxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5kb3duIHx8XHJcbiAgICAgIGtleUNvZGUgPT09IEtleXMudXAgfHxcclxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5sZWZ0IHx8XHJcbiAgICAgIGtleUNvZGUgPT09IEtleXMucmlnaHQ7XHJcblxyXG4gICAgaWYgKGlzQWN0aW9uICYmIGlzVGFyZ2V0Q2VsbCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XHJcbiAgICAgICAgdHlwZTogJ2tleWRvd24nLFxyXG4gICAgICAgIGV2ZW50LFxyXG4gICAgICAgIHJvdzogdGhpcy5yb3csXHJcbiAgICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXHJcbiAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcclxuICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DaGVja2JveENoYW5nZShldmVudDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xyXG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICBldmVudCxcclxuICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXHJcbiAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXHJcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICBjZWxsRWxlbWVudDogdGhpcy5fZWxlbWVudCxcclxuICAgICAgdHJlZVN0YXR1czogJ2NvbGxhcHNlZCdcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2FsY1NvcnREaXIoc29ydHM6IGFueVtdKTogYW55IHtcclxuICAgIGlmICghc29ydHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNvcnQgPSBzb3J0cy5maW5kKChzOiBhbnkpID0+IHtcclxuICAgICAgcmV0dXJuIHMucHJvcCA9PT0gdGhpcy5jb2x1bW4ucHJvcDtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChzb3J0KSB7XHJcbiAgICAgIHJldHVybiBzb3J0LmRpcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0cmlwSHRtbChodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKCFodG1sLnJlcGxhY2UpIHtcclxuICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC88XFwvP1tePl0rKD58JCkvZywgJycpO1xyXG4gIH1cclxuXHJcbiAgb25UcmVlQWN0aW9uKCkge1xyXG4gICAgdGhpcy50cmVlQWN0aW9uLmVtaXQodGhpcy5yb3cpO1xyXG4gIH1cclxuXHJcbiAgY2FsY0xlZnRNYXJnaW4oY29sdW1uOiBhbnksIHJvdzogYW55KSB7XHJcbiAgICBjb25zdCBsZXZlbEluZGVudCA9IGNvbHVtbi50cmVlTGV2ZWxJbmRlbnQgIT0gbnVsbCA/IGNvbHVtbi50cmVlTGV2ZWxJbmRlbnQgOiA1MDtcclxuICAgIHJldHVybiBjb2x1bW4uaXNUcmVlQ29sdW1uID8gcm93LmxldmVsICogbGV2ZWxJbmRlbnQgOiAwO1xyXG4gIH1cclxuXHJcbiAgaGFzVG9TaG93VG9vbFRpcChyb3csIGZpZWxkKSB7XHJcbiAgICByZXR1cm4gcm93ICYmIGZpZWxkICYmIGZpZWxkLnRvb2x0aXAgJiYgZmllbGQudG9vbHRpcC5sZW5ndGggPiAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9vbHRpcFZhbHVlKHZhbHVlLCByb3csIGZpZWxkKSB7XHJcbiAgICBpZiAocm93ICYmIGZpZWxkICYmIGZpZWxkLnRvb2x0aXAgJiYgZmllbGQudG9vbHRpcC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiByb3dbYCR7ZmllbGQudG9vbHRpcH1gXTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldEljb25zKHJvdywgaWNvbnMpIHtcclxuICAgIGlmIChyb3cgJiYgaWNvbnMpIHtcclxuICAgICAgY29uc3QgaWNvbnNBcnJheSA9IGljb25zLnNwbGl0KCcuJyk7XHJcbiAgICAgIHJldHVybiBpY29uc0FycmF5Lmxlbmd0aCA+IDEgJiYgcm93W2ljb25zQXJyYXlbMF1dID8gcm93W2ljb25zQXJyYXlbMF1dW2ljb25zQXJyYXlbMV1dIHx8IFtdIDogcm93W2ljb25zXSB8fCBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIHNlbGVjdEZpZWxkVmFsdWUocm93LCBwcm9wKSB7XHJcbiAgICBpZiAocm93ICYmIHByb3ApIHtcclxuICAgICAgY29uc3QgcHJvcEFycmF5ID0gcHJvcC5zcGxpdCgnLicpO1xyXG4gICAgICByZXR1cm4gcHJvcEFycmF5Lmxlbmd0aCA+IDEgJiYgcm93W3Byb3BBcnJheVswXV0gPyByb3dbcHJvcEFycmF5WzBdXVtwcm9wQXJyYXlbMV1dIDogcm93W3Byb3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcgJztcclxuICB9XHJcblxyXG4gIG9uQ2xpY2tSb3dBY3Rpb25CdXR0b24oZXZlbnQsIGZpZWxkLCByb3cpIHtcclxuICAgIGlmIChmaWVsZCAmJiByb3cpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGZpZWxkLmFjdGlvbihyb3cpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2FuYXRpemVIdG1sKGh0bWw6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGh0bWwpIGFzIHN0cmluZztcclxuICB9XHJcblxyXG4gIGlzRWRpdGFibGUoZmllbGQ6IGFueSwgcm93OiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIGlmIChmaWVsZCAmJiByb3cpIHtcclxuICAgICAgaWYgKCF0aGlzLl9pc0VkaXRhYmxlW2ZpZWxkLnByb3AgKyByb3cuaWRdKSB7XHJcbiAgICAgICAgdGhpcy5faXNFZGl0YWJsZVtmaWVsZC5wcm9wICsgcm93LmlkXSA9IGZpZWxkLmVkaXRhYmxlKHJvdyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX2lzRWRpdGFibGVbZmllbGQucHJvcCArIHJvdy5pZF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2YoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU2VsZWN0KGZpZWxkLCByb3c6IGFueSwgbmV3VmFsdWU6IGFueSkge1xyXG4gICAgcm93W2ZpZWxkLnByb3BdID0gbmV3VmFsdWU7XHJcbiAgICBpZiAoZmllbGQub25FZGl0KSB7XHJcbiAgICAgIGZpZWxkLm9uRWRpdChyb3cpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWRpdEZpZWxkKGZpZWxkLCByb3c6IGFueSwgbmV3VmFsdWU6IGFueSkge1xyXG4gICAgZmllbGQub25FZGl0KHsgLi4ucm93LCBbZmllbGQucHJvcF06IG5ld1ZhbHVlIH0pO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRXhwYW5kUm93KHJvdywgZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGlmICh0aGlzLnJvd0RldGFpbCkge1xyXG4gICAgICB0aGlzLnJvd0RldGFpbC50b2dnbGVFeHBhbmRSb3cocm93KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19