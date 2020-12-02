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
    function DataTableBodyCellComponent(element, cd, sanitizer, changeDetectorRef) {
        this.cd = cd;
        this.sanitizer = sanitizer;
        this.changeDetectorRef = changeDetectorRef;
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
            if (this.isFocused && !this.column.icons) {
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
    DataTableBodyCellComponent.prototype.middleclickEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.which === 2) {
            this.activate.emit({
                type: 'middleclick',
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
            return row["" + field.tooltip] || field.tooltip;
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
            return iconsArray.length > 1 && row[iconsArray[0]] ? row[iconsArray[0]][iconsArray[1]] : row[icons];
        }
        return null;
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
        if (row[field.prop] !== newValue) {
            row[field.prop] = newValue;
            if (field.onEdit) {
                field.onEdit(row);
            }
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
    /**
     * @param {?} row
     * @param {?} action
     * @param {?} event
     * @return {?}
     */
    DataTableBodyCellComponent.prototype.onClickField = /**
     * @param {?} row
     * @param {?} action
     * @param {?} event
     * @return {?}
     */
    function (row, action, event) {
        if (row && action) {
            event.preventDefault();
            event.stopPropagation();
            action(row);
        }
    };
    DataTableBodyCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-body-cell',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div\n      class=\"datatable-body-cell-label\"\n      style=\"display: flex; align-items:center; height: 100%;\"\n      [style.margin-left.px]=\"calcLeftMargin(column, row)\"\n    >\n      <a\n        *ngIf=\"column?.prop === 'ice-expandable' && row?.detail?.length > 0\"\n        href=\"javascript:void(0)\"\n        [class.datatable-icon-down]=\"!expanded\"\n        [class.datatable-icon-up]=\"expanded\"\n        style=\"font-size: 18px; display: flex; align-items: center;\"\n        title=\"Expand/Collapse Row\"\n        (dblclick)=\"toggleExpandRow(row, $event)\"\n        (click)=\"toggleExpandRow(row, $event)\"\n      >\n      </a>\n      <ng-container *ngIf=\"column?.prop !== 'ice-expandable'\">\n        <label\n          *ngIf=\"column.checkboxable && (!displayCheck || displayCheck(row, column, value))\"\n          class=\"datatable-checkbox\"\n        >\n          <input type=\"checkbox\" [checked]=\"isSelected\" (click)=\"onCheckboxChange($event)\" />\n        </label>\n        <ng-container *ngIf=\"column.isTreeColumn\">\n          <button\n            *ngIf=\"!column.treeToggleTemplate\"\n            class=\"datatable-tree-button\"\n            [disabled]=\"treeStatus === 'disabled'\"\n            (click)=\"onTreeAction()\"\n          >\n            <span>\n              <i *ngIf=\"treeStatus === 'loading'\" class=\"icon datatable-icon-collapse\"></i>\n              <i *ngIf=\"treeStatus === 'collapsed'\" class=\"icon datatable-icon-up\"></i>\n              <i *ngIf=\"treeStatus === 'expanded' || treeStatus === 'disabled'\" class=\"icon datatable-icon-down\"></i>\n            </span>\n          </button>\n          <ng-template\n            *ngIf=\"column.treeToggleTemplate\"\n            [ngTemplateOutlet]=\"column.treeToggleTemplate\"\n            [ngTemplateOutletContext]=\"{ cellContext: cellContext }\"\n          >\n          </ng-template>\n        </ng-container>\n\n        <div\n          *ngIf=\"column.icons && getIcons(row, column.icons)\"\n          style=\"display: flex; flex-direction: column; margin-right: 10px;\"\n        >\n          <mat-icon\n            *ngFor=\"let i of getIcons(row, column.icons)\"\n            [innerHTML]=\"i.icon\"\n            [matTooltip]=\"i.text\"\n            (click)=\"\n              !!i.onClickAction\n                ? onClickField(row, column.onClickAction || column.action, $event)\n                : i.action && i.action(row)\n            \"\n            [style.cursor]=\"i.action ? 'pointer' : 'auto'\"\n            class=\"{{ i.class }} mat-icon material-icons ice-ml-10\"\n          ></mat-icon>\n        </div>\n\n        <mat-icon\n          *ngIf=\"\n            column.iconCustomTooltipHtmlText &&\n            column.prop &&\n            selectFieldValue(row, column.iconCustomTooltipHtmlText) as customHtml\n          \"\n          iceCustomHtmlToolTip\n          [iceTooltipHtmlText]=\"sanatizeHtml(customHtml)\"\n          [duration]=\"1500\"\n          class=\"material-icons\"\n          [ngClass]=\"column.prop && selectFieldValue(row, column.iconColor)\"\n          >priority_high</mat-icon\n        >\n\n        <mat-icon\n          *ngIf=\"column.prop && row[column.prop.toString() + 'InfoTooltip']\"\n          [matTooltip]=\"column.prop && row[column.prop.toString() + 'InfoTooltip']\"\n          class=\"mat-icon material-icons\"\n          >info</mat-icon\n        >\n\n        <mat-icon\n          *ngIf=\"column.prop && row[column.prop.toString() + 'Excluded']\"\n          [matTooltip]=\"column.prop && row[column.prop.toString() + 'Excluded']\"\n          class=\"mat-icon material-icons\"\n          >block</mat-icon\n        >\n\n        <span\n          *ngIf=\"\n            !column.actionButtonIcon &&\n            !column.cellTemplate &&\n            (!column.selectOptions || (column.hideIfEmpty && column.hideIfEmpty(row))) &&\n            (!column.editable || !(isEditable(column, row) | async))\n          \"\n          class=\"ice-data-table-row\"\n          iceCustomHtmlToolTip\n          [iceTooltipHtmlText]=\"getTooltipValue(value, row, column)\"\n          [showToolTipOnTextOverflow]=\"true\"\n          [showToolTip]=\"hasToShowToolTip(row, column)\"\n          [innerHTML]=\"value\"\n          (click)=\"onClickField(row, column.onClickAction || column.action, $event)\"\n        ></span>\n\n        <button\n          *ngIf=\"column.actionButtonIcon && !(column.hideActionButton && column.hideActionButton(row) | async)\"\n          mat-icon-button\n          [matTooltip]=\"column.actionButtonTooltip\"\n          (click)=\"onClickRowActionButton($event, column, row)\"\n        >\n          <mat-icon class=\"mat-icon material-icons\">{{ column.actionButtonIcon }}</mat-icon>\n        </button>\n\n        <ice-datatable-row-select\n          style=\"width:100%;\"\n          [ngClass]=\"column.cellClass\"\n          (update)=\"updateSelect(column, row, $event)\"\n          [options]=\"column.selectOptions(row)\"\n          [value]=\"value\"\n          [defaultValue]=\"column.defaultValue\"\n          [selectDisabled]=\"column.disabled\"\n          *ngIf=\"column.selectOptions && !(column.hideIfEmpty && column.hideIfEmpty(row))\"\n        ></ice-datatable-row-select>\n\n        <ng-container *ngIf=\"!column.selectOptions && (column.editable && isEditable(column, row) | async)\">\n          <mat-icon class=\"mat-icon material-icons\" *ngIf=\"!column.hideEditIcon\">edit</mat-icon>\n          <ice-editable-text\n            [ngClass]=\"column.cellClass\"\n            (update)=\"editField(column, row, $event)\"\n            [errorText]=\"selectFieldValue(row, column.errorMessageField)\"\n            [value]=\"value\"\n          >\n            {{ value }}\n          </ice-editable-text>\n        </ng-container>\n\n        <ng-template\n          #cellTemplate\n          *ngIf=\"column.cellTemplate\"\n          [ngTemplateOutlet]=\"column.cellTemplate\"\n          [ngTemplateOutletContext]=\"cellContext\"\n        >\n        </ng-template>\n      </ng-container>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    DataTableBodyCellComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: DomSanitizer },
        { type: ChangeDetectorRef }
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
        middleclickEvent: [{ type: HostListener, args: ['mouseup', ['$event'],] }],
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
    /**
     * @type {?}
     * @private
     */
    DataTableBodyCellComponent.prototype.changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9ib2R5LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osVUFBVSxFQUNWLGdCQUFnQixFQUdoQix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUl0QztJQWlYRSxvQ0FDRSxPQUFtQixFQUNYLEVBQXFCLEVBQ3JCLFNBQXVCLEVBQ3ZCLGlCQUFvQztRQUZwQyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUE5R3BDLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFzRTdELGdCQUFXLEdBQXlDLEVBQUUsQ0FBQztRQUl2RCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHVCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsZUFBVSxHQUFH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QUFFLENBQUMsUUFBUSxDQUFDO21DQWNoQyxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOzZCQWdCbEMsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFjbkMsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUF1SnJDLGlDQUFDO0NBQUEsQUF6bUJELElBeW1CQztTQWhkWSwwQkFBMEI7OztJQUNyQyxrREFBZ0Y7O0lBNkdoRiw4Q0FBMkQ7O0lBRTNELGdEQUE2RDs7SUFFN0Qsa0RBQytCOztJQW1FL0IsaURBQXVEOztJQUN2RCxvREFBb0I7O0lBQ3BCLDJDQUFXOztJQUNYLDZDQUF1Qjs7SUFDdkIsK0NBQWtCOztJQUNsQix3REFBc0Q7O0lBQ3RELGdEQUFvRDs7SUFFcEQsaURBWUU7Ozs7O0lBRUYsaURBQTZCOzs7OztJQUM3Qiw0Q0FBc0I7Ozs7O0lBQ3RCLDZDQUE2Qjs7Ozs7SUFDN0IsMENBQWtCOzs7OztJQUNsQixnREFBd0I7Ozs7O0lBQ3hCLDRDQUFvQjs7Ozs7SUFDcEIsZ0RBQTJCOzs7OztJQUMzQiwrQ0FBMEI7Ozs7O0lBQzFCLCtDQUEyQjs7Ozs7SUFDM0IsOENBQXNCOzs7OztJQUN0QixpREFBZ0M7Ozs7O0lBSTlCLHdDQUE2Qjs7Ozs7SUFDN0IsK0NBQStCOzs7OztJQUMvQix1REFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBQaXBlVHJhbnNmb3JtLFxuICBIb3N0QmluZGluZyxcbiAgVmlld0NoaWxkLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgRWxlbWVudFJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgT25EZXN0cm95LFxuICBEb0NoZWNrLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuLi8uLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XG5pbXBvcnQgeyBNb3VzZUV2ZW50LCBLZXlib2FyZEV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LWRpcmVjdGlvbi50eXBlJztcbmltcG9ydCB7IEtleXMgfSBmcm9tICcuLi8uLi91dGlscy9rZXlzJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IHR5cGUgVHJlZVN0YXR1cyA9ICdjb2xsYXBzZWQnIHwgJ2V4cGFuZGVkJyB8ICdsb2FkaW5nJyB8ICdkaXNhYmxlZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1ib2R5LWNlbGwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWxcIlxuICAgICAgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGhlaWdodDogMTAwJTtcIlxuICAgICAgW3N0eWxlLm1hcmdpbi1sZWZ0LnB4XT1cImNhbGNMZWZ0TWFyZ2luKGNvbHVtbiwgcm93KVwiXG4gICAgPlxuICAgICAgPGFcbiAgICAgICAgKm5nSWY9XCJjb2x1bW4/LnByb3AgPT09ICdpY2UtZXhwYW5kYWJsZScgJiYgcm93Py5kZXRhaWw/Lmxlbmd0aCA+IDBcIlxuICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcbiAgICAgICAgW2NsYXNzLmRhdGF0YWJsZS1pY29uLWRvd25dPVwiIWV4cGFuZGVkXCJcbiAgICAgICAgW2NsYXNzLmRhdGF0YWJsZS1pY29uLXVwXT1cImV4cGFuZGVkXCJcbiAgICAgICAgc3R5bGU9XCJmb250LXNpemU6IDE4cHg7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCJcbiAgICAgICAgdGl0bGU9XCJFeHBhbmQvQ29sbGFwc2UgUm93XCJcbiAgICAgICAgKGRibGNsaWNrKT1cInRvZ2dsZUV4cGFuZFJvdyhyb3csICRldmVudClcIlxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kUm93KHJvdywgJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICA8L2E+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uPy5wcm9wICE9PSAnaWNlLWV4cGFuZGFibGUnXCI+XG4gICAgICAgIDxsYWJlbFxuICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmNoZWNrYm94YWJsZSAmJiAoIWRpc3BsYXlDaGVjayB8fCBkaXNwbGF5Q2hlY2socm93LCBjb2x1bW4sIHZhbHVlKSlcIlxuICAgICAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLWNoZWNrYm94XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkXCIgKGNsaWNrKT1cIm9uQ2hlY2tib3hDaGFuZ2UoJGV2ZW50KVwiIC8+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4uaXNUcmVlQ29sdW1uXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgKm5nSWY9XCIhY29sdW1uLnRyZWVUb2dnbGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICBjbGFzcz1cImRhdGF0YWJsZS10cmVlLWJ1dHRvblwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwidHJlZVN0YXR1cyA9PT0gJ2Rpc2FibGVkJ1wiXG4gICAgICAgICAgICAoY2xpY2spPVwib25UcmVlQWN0aW9uKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICA8aSAqbmdJZj1cInRyZWVTdGF0dXMgPT09ICdsb2FkaW5nJ1wiIGNsYXNzPVwiaWNvbiBkYXRhdGFibGUtaWNvbi1jb2xsYXBzZVwiPjwvaT5cbiAgICAgICAgICAgICAgPGkgKm5nSWY9XCJ0cmVlU3RhdHVzID09PSAnY29sbGFwc2VkJ1wiIGNsYXNzPVwiaWNvbiBkYXRhdGFibGUtaWNvbi11cFwiPjwvaT5cbiAgICAgICAgICAgICAgPGkgKm5nSWY9XCJ0cmVlU3RhdHVzID09PSAnZXhwYW5kZWQnIHx8IHRyZWVTdGF0dXMgPT09ICdkaXNhYmxlZCdcIiBjbGFzcz1cImljb24gZGF0YXRhYmxlLWljb24tZG93blwiPjwvaT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgICpuZ0lmPVwiY29sdW1uLnRyZWVUb2dnbGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4udHJlZVRvZ2dsZVRlbXBsYXRlXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGNlbGxDb250ZXh0OiBjZWxsQ29udGV4dCB9XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmljb25zICYmIGdldEljb25zKHJvdywgY29sdW1uLmljb25zKVwiXG4gICAgICAgICAgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBtYXJnaW4tcmlnaHQ6IDEwcHg7XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGkgb2YgZ2V0SWNvbnMocm93LCBjb2x1bW4uaWNvbnMpXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwiaS5pY29uXCJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImkudGV4dFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiXG4gICAgICAgICAgICAgICEhaS5vbkNsaWNrQWN0aW9uXG4gICAgICAgICAgICAgICAgPyBvbkNsaWNrRmllbGQocm93LCBjb2x1bW4ub25DbGlja0FjdGlvbiB8fCBjb2x1bW4uYWN0aW9uLCAkZXZlbnQpXG4gICAgICAgICAgICAgICAgOiBpLmFjdGlvbiAmJiBpLmFjdGlvbihyb3cpXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgW3N0eWxlLmN1cnNvcl09XCJpLmFjdGlvbiA/ICdwb2ludGVyJyA6ICdhdXRvJ1wiXG4gICAgICAgICAgICBjbGFzcz1cInt7IGkuY2xhc3MgfX0gbWF0LWljb24gbWF0ZXJpYWwtaWNvbnMgaWNlLW1sLTEwXCJcbiAgICAgICAgICA+PC9tYXQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPG1hdC1pY29uXG4gICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgIGNvbHVtbi5pY29uQ3VzdG9tVG9vbHRpcEh0bWxUZXh0ICYmXG4gICAgICAgICAgICBjb2x1bW4ucHJvcCAmJlxuICAgICAgICAgICAgc2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5pY29uQ3VzdG9tVG9vbHRpcEh0bWxUZXh0KSBhcyBjdXN0b21IdG1sXG4gICAgICAgICAgXCJcbiAgICAgICAgICBpY2VDdXN0b21IdG1sVG9vbFRpcFxuICAgICAgICAgIFtpY2VUb29sdGlwSHRtbFRleHRdPVwic2FuYXRpemVIdG1sKGN1c3RvbUh0bWwpXCJcbiAgICAgICAgICBbZHVyYXRpb25dPVwiMTUwMFwiXG4gICAgICAgICAgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLnByb3AgJiYgc2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5pY29uQ29sb3IpXCJcbiAgICAgICAgICA+cHJpb3JpdHlfaGlnaDwvbWF0LWljb25cbiAgICAgICAgPlxuXG4gICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICpuZ0lmPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnSW5mb1Rvb2x0aXAnXVwiXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnSW5mb1Rvb2x0aXAnXVwiXG4gICAgICAgICAgY2xhc3M9XCJtYXQtaWNvbiBtYXRlcmlhbC1pY29uc1wiXG4gICAgICAgICAgPmluZm88L21hdC1pY29uXG4gICAgICAgID5cblxuICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0V4Y2x1ZGVkJ11cIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0V4Y2x1ZGVkJ11cIlxuICAgICAgICAgIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIlxuICAgICAgICAgID5ibG9jazwvbWF0LWljb25cbiAgICAgICAgPlxuXG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICFjb2x1bW4uYWN0aW9uQnV0dG9uSWNvbiAmJlxuICAgICAgICAgICAgIWNvbHVtbi5jZWxsVGVtcGxhdGUgJiZcbiAgICAgICAgICAgICghY29sdW1uLnNlbGVjdE9wdGlvbnMgfHwgKGNvbHVtbi5oaWRlSWZFbXB0eSAmJiBjb2x1bW4uaGlkZUlmRW1wdHkocm93KSkpICYmXG4gICAgICAgICAgICAoIWNvbHVtbi5lZGl0YWJsZSB8fCAhKGlzRWRpdGFibGUoY29sdW1uLCByb3cpIHwgYXN5bmMpKVxuICAgICAgICAgIFwiXG4gICAgICAgICAgY2xhc3M9XCJpY2UtZGF0YS10YWJsZS1yb3dcIlxuICAgICAgICAgIGljZUN1c3RvbUh0bWxUb29sVGlwXG4gICAgICAgICAgW2ljZVRvb2x0aXBIdG1sVGV4dF09XCJnZXRUb29sdGlwVmFsdWUodmFsdWUsIHJvdywgY29sdW1uKVwiXG4gICAgICAgICAgW3Nob3dUb29sVGlwT25UZXh0T3ZlcmZsb3ddPVwidHJ1ZVwiXG4gICAgICAgICAgW3Nob3dUb29sVGlwXT1cImhhc1RvU2hvd1Rvb2xUaXAocm93LCBjb2x1bW4pXCJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cInZhbHVlXCJcbiAgICAgICAgICAoY2xpY2spPVwib25DbGlja0ZpZWxkKHJvdywgY29sdW1uLm9uQ2xpY2tBY3Rpb24gfHwgY29sdW1uLmFjdGlvbiwgJGV2ZW50KVwiXG4gICAgICAgID48L3NwYW4+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmFjdGlvbkJ1dHRvbkljb24gJiYgIShjb2x1bW4uaGlkZUFjdGlvbkJ1dHRvbiAmJiBjb2x1bW4uaGlkZUFjdGlvbkJ1dHRvbihyb3cpIHwgYXN5bmMpXCJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJjb2x1bW4uYWN0aW9uQnV0dG9uVG9vbHRpcFwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tSb3dBY3Rpb25CdXR0b24oJGV2ZW50LCBjb2x1bW4sIHJvdylcIlxuICAgICAgICA+XG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIj57eyBjb2x1bW4uYWN0aW9uQnV0dG9uSWNvbiB9fTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxpY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3RcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOjEwMCU7XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJjb2x1bW4uY2VsbENsYXNzXCJcbiAgICAgICAgICAodXBkYXRlKT1cInVwZGF0ZVNlbGVjdChjb2x1bW4sIHJvdywgJGV2ZW50KVwiXG4gICAgICAgICAgW29wdGlvbnNdPVwiY29sdW1uLnNlbGVjdE9wdGlvbnMocm93KVwiXG4gICAgICAgICAgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICAgICAgICBbZGVmYXVsdFZhbHVlXT1cImNvbHVtbi5kZWZhdWx0VmFsdWVcIlxuICAgICAgICAgIFtzZWxlY3REaXNhYmxlZF09XCJjb2x1bW4uZGlzYWJsZWRcIlxuICAgICAgICAgICpuZ0lmPVwiY29sdW1uLnNlbGVjdE9wdGlvbnMgJiYgIShjb2x1bW4uaGlkZUlmRW1wdHkgJiYgY29sdW1uLmhpZGVJZkVtcHR5KHJvdykpXCJcbiAgICAgICAgPjwvaWNlLWRhdGF0YWJsZS1yb3ctc2VsZWN0PlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY29sdW1uLnNlbGVjdE9wdGlvbnMgJiYgKGNvbHVtbi5lZGl0YWJsZSAmJiBpc0VkaXRhYmxlKGNvbHVtbiwgcm93KSB8IGFzeW5jKVwiPlxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCIgKm5nSWY9XCIhY29sdW1uLmhpZGVFZGl0SWNvblwiPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgIDxpY2UtZWRpdGFibGUtdGV4dFxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLmNlbGxDbGFzc1wiXG4gICAgICAgICAgICAodXBkYXRlKT1cImVkaXRGaWVsZChjb2x1bW4sIHJvdywgJGV2ZW50KVwiXG4gICAgICAgICAgICBbZXJyb3JUZXh0XT1cInNlbGVjdEZpZWxkVmFsdWUocm93LCBjb2x1bW4uZXJyb3JNZXNzYWdlRmllbGQpXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgdmFsdWUgfX1cbiAgICAgICAgICA8L2ljZS1lZGl0YWJsZS10ZXh0PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAjY2VsbFRlbXBsYXRlXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY2VsbENvbnRleHRcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCb2R5Q2VsbENvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGRpc3BsYXlDaGVjazogKHJvdzogYW55LCBjb2x1bW4/OiBUYWJsZUNvbHVtbiwgdmFsdWU/OiBhbnkpID0+IGJvb2xlYW47XG5cbiAgQElucHV0KCkgc2V0IHJvd0RldGFpbChyb3dEZXRhaWw6IGFueSkge1xuICAgIHRoaXMuX3Jvd0RldGFpbCA9IHJvd0RldGFpbDtcbiAgfVxuXG4gIGdldCByb3dEZXRhaWwoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fcm93RGV0YWlsO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGdyb3VwKGdyb3VwOiBhbnkpIHtcbiAgICB0aGlzLl9ncm91cCA9IGdyb3VwO1xuICAgIHRoaXMuY2VsbENvbnRleHQuZ3JvdXAgPSBncm91cDtcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBncm91cCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXA7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcm93SGVpZ2h0KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcm93SGVpZ2h0ID0gdmFsO1xuICAgIHRoaXMuY2VsbENvbnRleHQucm93SGVpZ2h0ID0gdmFsO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHJvd0hlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcm93SGVpZ2h0O1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGlzU2VsZWN0ZWQodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IHZhbDtcbiAgICB0aGlzLmNlbGxDb250ZXh0LmlzU2VsZWN0ZWQgPSB2YWw7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdGVkO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGV4cGFuZGVkKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsO1xuICAgIHRoaXMuY2VsbENvbnRleHQuZXhwYW5kZWQgPSB2YWw7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcm93SW5kZXgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yb3dJbmRleCA9IHZhbDtcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvd0luZGV4ID0gdmFsO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHJvd0luZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd0luZGV4O1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGNvbHVtbihjb2x1bW46IFRhYmxlQ29sdW1uKSB7XG4gICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xuICAgIHRoaXMuY2VsbENvbnRleHQuY29sdW1uID0gY29sdW1uO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGNvbHVtbigpOiBUYWJsZUNvbHVtbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbjtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCByb3cocm93OiBhbnkpIHtcbiAgICB0aGlzLl9yb3cgPSByb3c7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5yb3cgPSByb3c7XG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgcm93KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3JvdztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzb3J0cyh2YWw6IGFueVtdKSB7XG4gICAgdGhpcy5fc29ydHMgPSB2YWw7XG4gICAgdGhpcy5jYWxjU29ydERpciA9IHRoaXMuY2FsY1NvcnREaXIodmFsKTtcbiAgfVxuXG4gIGdldCBzb3J0cygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRzO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHRyZWVTdGF0dXMoc3RhdHVzOiBUcmVlU3RhdHVzKSB7XG4gICAgaWYgKHN0YXR1cyAhPT0gJ2NvbGxhcHNlZCcgJiYgc3RhdHVzICE9PSAnZXhwYW5kZWQnICYmIHN0YXR1cyAhPT0gJ2xvYWRpbmcnICYmIHN0YXR1cyAhPT0gJ2Rpc2FibGVkJykge1xuICAgICAgdGhpcy5fdHJlZVN0YXR1cyA9ICdjb2xsYXBzZWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90cmVlU3RhdHVzID0gc3RhdHVzO1xuICAgIH1cbiAgICB0aGlzLmNlbGxDb250ZXh0LnRyZWVTdGF0dXMgPSB0aGlzLl90cmVlU3RhdHVzO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHRyZWVTdGF0dXMoKTogVHJlZVN0YXR1cyB7XG4gICAgcmV0dXJuIHRoaXMuX3RyZWVTdGF0dXM7XG4gIH1cblxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdjZWxsVGVtcGxhdGUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBjZWxsVGVtcGxhdGU6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjb2x1bW5Dc3NDbGFzc2VzKCk6IGFueSB7XG4gICAgbGV0IGNscyA9ICdkYXRhdGFibGUtYm9keS1jZWxsJztcbiAgICBpZiAodGhpcy5jb2x1bW4uY2VsbENsYXNzKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmNlbGxDbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY2xzICs9ICcgJyArIHRoaXMuY29sdW1uLmNlbGxDbGFzcztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmNlbGxDbGFzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmNvbHVtbi5jZWxsQ2xhc3Moe1xuICAgICAgICAgIHJvdzogdGhpcy5yb3csXG4gICAgICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNscyArPSByZXM7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocmVzKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgICAgICAgICAgaWYgKHJlc1trXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjbHMgKz0gYCAke2t9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLnNvcnREaXIpIHtcbiAgICAgIGNscyArPSAnIHNvcnQtYWN0aXZlJztcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNGb2N1c2VkICYmICF0aGlzLmNvbHVtbi5pY29ucykge1xuICAgICAgY2xzICs9ICcgYWN0aXZlJztcbiAgICB9XG4gICAgaWYgKHRoaXMuc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5hc2MpIHtcbiAgICAgIGNscyArPSAnIHNvcnQtYXNjJztcbiAgICB9XG4gICAgaWYgKHRoaXMuc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5kZXNjKSB7XG4gICAgICBjbHMgKz0gJyBzb3J0LWRlc2MnO1xuICAgIH1cbiAgICByZXR1cm4gY2xzO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC5weCcpXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi53aWR0aDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWluV2lkdGgucHgnKVxuICBnZXQgbWluV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWluV2lkdGg7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1heFdpZHRoLnB4JylcbiAgZ2V0IG1heFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1heFdpZHRoO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKVxuICBnZXQgaGVpZ2h0KCk6IHN0cmluZyB8IG51bWJlciB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5yb3dIZWlnaHQ7XG4gICAgaWYgKGlzTmFOKGhlaWdodCkpIHtcbiAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgfVxuICAgIHJldHVybiBoZWlnaHQgKyAncHgnO1xuICB9XG4gIF9pc0VkaXRhYmxlOiB7IFthOiBzdHJpbmddOiBPYnNlcnZhYmxlPGJvb2xlYW4+IH0gPSB7fTtcbiAgc2FuaXRpemVkVmFsdWU6IGFueTtcbiAgdmFsdWU6IGFueTtcbiAgc29ydERpcjogU29ydERpcmVjdGlvbjtcbiAgaXNGb2N1c2VkID0gZmFsc2U7XG4gIG9uQ2hlY2tib3hDaGFuZ2VGbiA9IHRoaXMub25DaGVja2JveENoYW5nZS5iaW5kKHRoaXMpO1xuICBhY3RpdmF0ZUZuID0gdGhpcy5hY3RpdmF0ZS5lbWl0LmJpbmQodGhpcy5hY3RpdmF0ZSk7XG5cbiAgY2VsbENvbnRleHQ6IGFueSA9IHtcbiAgICBvbkNoZWNrYm94Q2hhbmdlRm46IHRoaXMub25DaGVja2JveENoYW5nZUZuLFxuICAgIGFjdGl2YXRlRm46IHRoaXMuYWN0aXZhdGVGbixcbiAgICByb3c6IHRoaXMucm93LFxuICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICBpc1NlbGVjdGVkOiB0aGlzLmlzU2VsZWN0ZWQsXG4gICAgcm93SW5kZXg6IHRoaXMucm93SW5kZXgsXG4gICAgdHJlZVN0YXR1czogdGhpcy50cmVlU3RhdHVzLFxuICAgIG9uVHJlZUFjdGlvbjogdGhpcy5vblRyZWVBY3Rpb24uYmluZCh0aGlzKVxuICB9O1xuXG4gIHByaXZhdGUgX2lzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX3NvcnRzOiBhbnlbXTtcbiAgcHJpdmF0ZSBfY29sdW1uOiBUYWJsZUNvbHVtbjtcbiAgcHJpdmF0ZSBfcm93OiBhbnk7XG4gIHByaXZhdGUgX3Jvd0RldGFpbDogYW55O1xuICBwcml2YXRlIF9ncm91cDogYW55O1xuICBwcml2YXRlIF9yb3dIZWlnaHQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfcm93SW5kZXg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfZXhwYW5kZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2VsZW1lbnQ6IGFueTtcbiAgcHJpdmF0ZSBfdHJlZVN0YXR1czogVHJlZVN0YXR1cztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jZWxsVGVtcGxhdGUpIHtcbiAgICAgIHRoaXMuY2VsbFRlbXBsYXRlLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tWYWx1ZVVwZGF0ZXMoKTogdm9pZCB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG5cbiAgICBpZiAoIXRoaXMucm93IHx8ICF0aGlzLmNvbHVtbikge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdmFsID0gdGhpcy5jb2x1bW4uJCR2YWx1ZUdldHRlcih0aGlzLnJvdywgdGhpcy5jb2x1bW4ucHJvcCk7XG4gICAgICBjb25zdCB1c2VyUGlwZTogUGlwZVRyYW5zZm9ybSA9IHRoaXMuY29sdW1uLnBpcGU7XG5cbiAgICAgIGlmICh1c2VyUGlwZSkge1xuICAgICAgICB2YWx1ZSA9IHVzZXJQaXBlLnRyYW5zZm9ybSh2YWwpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5jZWxsQ29udGV4dC52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5zYW5pdGl6ZWRWYWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB0aGlzLnN0cmlwSHRtbCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBvbkZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XG4gICAgICB0eXBlOiAnY2xpY2snLFxuICAgICAgZXZlbnQsXG4gICAgICByb3c6IHRoaXMucm93LFxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnLCBbJyRldmVudCddKVxuICBtaWRkbGVjbGlja0V2ZW50KGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LndoaWNoID09PSAyKSB7XG4gICAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgICB0eXBlOiAnbWlkZGxlY2xpY2snLFxuICAgICAgICBldmVudCxcbiAgICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXG4gICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICBjZWxsRWxlbWVudDogdGhpcy5fZWxlbWVudFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZGJsY2xpY2snLCBbJyRldmVudCddKVxuICBvbkRibENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcbiAgICAgIHR5cGU6ICdkYmxjbGljaycsXG4gICAgICBldmVudCxcbiAgICAgIHJvdzogdGhpcy5yb3csXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXG4gICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICBjZWxsRWxlbWVudDogdGhpcy5fZWxlbWVudFxuICAgIH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgIGNvbnN0IGlzVGFyZ2V0Q2VsbCA9IGV2ZW50LnRhcmdldCA9PT0gdGhpcy5fZWxlbWVudDtcblxuICAgIGNvbnN0IGlzQWN0aW9uID1cbiAgICAgIGtleUNvZGUgPT09IEtleXMucmV0dXJuIHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLmRvd24gfHxcbiAgICAgIGtleUNvZGUgPT09IEtleXMudXAgfHxcbiAgICAgIGtleUNvZGUgPT09IEtleXMubGVmdCB8fFxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5yaWdodDtcblxuICAgIGlmIChpc0FjdGlvbiAmJiBpc1RhcmdldENlbGwpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcbiAgICAgICAgdHlwZTogJ2tleWRvd24nLFxuICAgICAgICBldmVudCxcbiAgICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXG4gICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICBjZWxsRWxlbWVudDogdGhpcy5fZWxlbWVudFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25DaGVja2JveENoYW5nZShldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcbiAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICBldmVudCxcbiAgICAgIHJvdzogdGhpcy5yb3csXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXG4gICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICBjZWxsRWxlbWVudDogdGhpcy5fZWxlbWVudCxcbiAgICAgIHRyZWVTdGF0dXM6ICdjb2xsYXBzZWQnXG4gICAgfSk7XG4gIH1cblxuICBjYWxjU29ydERpcihzb3J0czogYW55W10pOiBhbnkge1xuICAgIGlmICghc29ydHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzb3J0ID0gc29ydHMuZmluZCgoczogYW55KSA9PiB7XG4gICAgICByZXR1cm4gcy5wcm9wID09PSB0aGlzLmNvbHVtbi5wcm9wO1xuICAgIH0pO1xuXG4gICAgaWYgKHNvcnQpIHtcbiAgICAgIHJldHVybiBzb3J0LmRpcjtcbiAgICB9XG4gIH1cblxuICBzdHJpcEh0bWwoaHRtbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWh0bWwucmVwbGFjZSkge1xuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIHJldHVybiBodG1sLnJlcGxhY2UoLzxcXC8/W14+XSsoPnwkKS9nLCAnJyk7XG4gIH1cblxuICBvblRyZWVBY3Rpb24oKSB7XG4gICAgdGhpcy50cmVlQWN0aW9uLmVtaXQodGhpcy5yb3cpO1xuICB9XG5cbiAgY2FsY0xlZnRNYXJnaW4oY29sdW1uOiBhbnksIHJvdzogYW55KSB7XG4gICAgY29uc3QgbGV2ZWxJbmRlbnQgPSBjb2x1bW4udHJlZUxldmVsSW5kZW50ICE9IG51bGwgPyBjb2x1bW4udHJlZUxldmVsSW5kZW50IDogNTA7XG4gICAgcmV0dXJuIGNvbHVtbi5pc1RyZWVDb2x1bW4gPyByb3cubGV2ZWwgKiBsZXZlbEluZGVudCA6IDA7XG4gIH1cblxuICBoYXNUb1Nob3dUb29sVGlwKHJvdywgZmllbGQpIHtcbiAgICByZXR1cm4gcm93ICYmIGZpZWxkICYmIGZpZWxkLnRvb2x0aXAgJiYgZmllbGQudG9vbHRpcC5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0VG9vbHRpcFZhbHVlKHZhbHVlLCByb3csIGZpZWxkKSB7XG4gICAgaWYgKHJvdyAmJiBmaWVsZCAmJiBmaWVsZC50b29sdGlwICYmIGZpZWxkLnRvb2x0aXAubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHJvd1tgJHtmaWVsZC50b29sdGlwfWBdIHx8IGZpZWxkLnRvb2x0aXA7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGdldEljb25zKHJvdywgaWNvbnMpIHtcbiAgICBpZiAocm93ICYmIGljb25zKSB7XG4gICAgICBjb25zdCBpY29uc0FycmF5ID0gaWNvbnMuc3BsaXQoJy4nKTtcbiAgICAgIHJldHVybiBpY29uc0FycmF5Lmxlbmd0aCA+IDEgJiYgcm93W2ljb25zQXJyYXlbMF1dID8gcm93W2ljb25zQXJyYXlbMF1dW2ljb25zQXJyYXlbMV1dIDogcm93W2ljb25zXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzZWxlY3RGaWVsZFZhbHVlKHJvdywgcHJvcCkge1xuICAgIGlmIChyb3cgJiYgcHJvcCkge1xuICAgICAgY29uc3QgcHJvcEFycmF5ID0gcHJvcC5zcGxpdCgnLicpO1xuICAgICAgcmV0dXJuIHByb3BBcnJheS5sZW5ndGggPiAxICYmIHJvd1twcm9wQXJyYXlbMF1dID8gcm93W3Byb3BBcnJheVswXV1bcHJvcEFycmF5WzFdXSA6IHJvd1twcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuICcgJztcbiAgfVxuXG4gIG9uQ2xpY2tSb3dBY3Rpb25CdXR0b24oZXZlbnQsIGZpZWxkLCByb3cpIHtcbiAgICBpZiAoZmllbGQgJiYgcm93KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBmaWVsZC5hY3Rpb24ocm93KTtcbiAgICB9XG4gIH1cblxuICBzYW5hdGl6ZUh0bWwoaHRtbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGh0bWwpIGFzIHN0cmluZztcbiAgfVxuXG4gIGlzRWRpdGFibGUoZmllbGQ6IGFueSwgcm93OiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAoZmllbGQgJiYgcm93KSB7XG4gICAgICBpZiAoIXRoaXMuX2lzRWRpdGFibGVbZmllbGQucHJvcCArIHJvdy5pZF0pIHtcbiAgICAgICAgdGhpcy5faXNFZGl0YWJsZVtmaWVsZC5wcm9wICsgcm93LmlkXSA9IGZpZWxkLmVkaXRhYmxlKHJvdyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5faXNFZGl0YWJsZVtmaWVsZC5wcm9wICsgcm93LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgfVxuXG4gIHVwZGF0ZVNlbGVjdChmaWVsZCwgcm93OiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICBpZiAocm93W2ZpZWxkLnByb3BdICE9PSBuZXdWYWx1ZSkge1xuICAgICAgcm93W2ZpZWxkLnByb3BdID0gbmV3VmFsdWU7XG4gICAgICBpZiAoZmllbGQub25FZGl0KSB7XG4gICAgICAgIGZpZWxkLm9uRWRpdChyb3cpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVkaXRGaWVsZChmaWVsZCwgcm93OiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICBmaWVsZC5vbkVkaXQoeyAuLi5yb3csIFtmaWVsZC5wcm9wXTogbmV3VmFsdWUgfSk7XG4gIH1cblxuICB0b2dnbGVFeHBhbmRSb3cocm93LCBldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMucm93RGV0YWlsKSB7XG4gICAgICB0aGlzLnJvd0RldGFpbC50b2dnbGVFeHBhbmRSb3cocm93KTtcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrRmllbGQocm93LCBhY3Rpb24sIGV2ZW50KSB7XG4gICAgaWYgKHJvdyAmJiBhY3Rpb24pIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgYWN0aW9uKHJvdyk7XG4gICAgfVxuICB9XG59XG4iXX0=