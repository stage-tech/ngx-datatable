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
                    template: "\n    <div\n      class=\"datatable-body-cell-label\"\n      style=\"display: flex; align-items:center; height: 100%;\"\n      [style.margin-left.px]=\"calcLeftMargin(column, row)\"\n    >\n      <a\n        *ngIf=\"column?.prop === 'ice-expandable' && row?.detail?.length > 0\"\n        href=\"javascript:void(0)\"\n        [class.datatable-icon-down]=\"!expanded\"\n        [class.datatable-icon-up]=\"expanded\"\n        style=\"font-size: 18px; display: flex; align-items: center;\"\n        title=\"Expand/Collapse Row\"\n        (dblclick)=\"toggleExpandRow(row, $event)\"\n        (click)=\"toggleExpandRow(row, $event)\"\n      >\n      </a>\n      <ng-container *ngIf=\"column?.prop !== 'ice-expandable'\">\n        <label\n          *ngIf=\"column.checkboxable && (!displayCheck || displayCheck(row, column, value))\"\n          class=\"datatable-checkbox\"\n        >\n          <input type=\"checkbox\" [checked]=\"isSelected\" (click)=\"onCheckboxChange($event)\" />\n        </label>\n        <ng-container *ngIf=\"column.isTreeColumn\">\n          <button\n            *ngIf=\"!column.treeToggleTemplate\"\n            class=\"datatable-tree-button\"\n            [disabled]=\"treeStatus === 'disabled'\"\n            (click)=\"onTreeAction()\"\n          >\n            <span>\n              <i *ngIf=\"treeStatus === 'loading'\" class=\"icon datatable-icon-collapse\"></i>\n              <i *ngIf=\"treeStatus === 'collapsed'\" class=\"icon datatable-icon-up\"></i>\n              <i *ngIf=\"treeStatus === 'expanded' || treeStatus === 'disabled'\" class=\"icon datatable-icon-down\"></i>\n            </span>\n          </button>\n          <ng-template\n            *ngIf=\"column.treeToggleTemplate\"\n            [ngTemplateOutlet]=\"column.treeToggleTemplate\"\n            [ngTemplateOutletContext]=\"{ cellContext: cellContext }\"\n          >\n          </ng-template>\n        </ng-container>\n\n        <div *ngIf=\"column.icons as icons\" style=\"display: flex; flex-direction: column; margin-right: 10px;\">\n          <mat-icon\n            *ngFor=\"let i of getIcons(row, icons)\"\n            [innerHTML]=\"i.icon\"\n            [matTooltip]=\"i.text\"\n            (click)=\"\n              !!i.onClickAction\n                ? onClickField(row, column.onClickAction || column.action, $event)\n                : i.action && i.action(row)\n            \"\n            [style.cursor]=\"i.action ? 'pointer' : 'auto'\"\n            class=\"{{ i.class }} mat-icon material-icons ice-ml-10\"\n          ></mat-icon>\n        </div>\n\n        <mat-icon\n          *ngIf=\"\n            column.iconCustomTooltipHtmlText &&\n            column.prop &&\n            selectFieldValue(row, column.iconCustomTooltipHtmlText) as customHtml\n          \"\n          iceCustomHtmlToolTip\n          [iceTooltipHtmlText]=\"sanatizeHtml(customHtml)\"\n          [duration]=\"1500\"\n          class=\"material-icons\"\n          [ngClass]=\"column.prop && selectFieldValue(row, column.iconColor)\"\n          >priority_high</mat-icon\n        >\n\n        <mat-icon\n          *ngIf=\"column.prop && row[column.prop.toString() + 'InfoTooltip']\"\n          [matTooltip]=\"column.prop && row[column.prop.toString() + 'InfoTooltip']\"\n          class=\"mat-icon material-icons\"\n          >info</mat-icon\n        >\n\n        <mat-icon\n          *ngIf=\"column.prop && row[column.prop.toString() + 'Excluded']\"\n          [matTooltip]=\"column.prop && row[column.prop.toString() + 'Excluded']\"\n          class=\"mat-icon material-icons\"\n          >block</mat-icon\n        >\n\n        <span\n          *ngIf=\"\n            !column.actionButtonIcon &&\n            !column.cellTemplate &&\n            !column.selectOptions &&\n            (!column.editable || !(isEditable(column, row) | async))\n          \"\n          class=\"ice-data-table-row\"\n          iceCustomHtmlToolTip\n          [iceTooltipHtmlText]=\"getTooltipValue(value, row, column)\"\n          [showToolTipOnTextOverflow]=\"true\"\n          [showToolTip]=\"hasToShowToolTip(row, column)\"\n          [innerHTML]=\"value\"\n          (click)=\"onClickField(row, column.onClickAction || column.action, $event)\"\n        ></span>\n\n        <button\n          *ngIf=\"column.actionButtonIcon && !(column.hideActionButton && column.hideActionButton(row) | async)\"\n          mat-icon-button\n          [matTooltip]=\"column.actionButtonTooltip\"\n          (click)=\"onClickRowActionButton($event, column, row)\"\n        >\n          <mat-icon class=\"mat-icon material-icons\">{{ column.actionButtonIcon }}</mat-icon>\n        </button>\n\n        <ice-datatable-row-select\n          style=\"margin-top: 18px\"\n          [options]=\"column.selectOptions\"\n          [ngClass]=\"column.cellClass\"\n          (update)=\"updateSelect(column, row, $event)\"\n          [value]=\"value\"\n          [defaultValue]=\"column.defaultValue\"\n          [selectDisabled]=\"column.disabled\"\n          *ngIf=\"column.selectOptions && !(column.hideIfEmpty && column.disabled && value === '')\"\n        ></ice-datatable-row-select>\n\n        <ng-container *ngIf=\"!column.selectOptions && (column.editable && isEditable(column, row) | async)\">\n          <mat-icon class=\"mat-icon material-icons\" *ngIf=\"!column.hideEditIcon\">edit</mat-icon>\n          <ice-editable-text\n            [ngClass]=\"column.cellClass\"\n            (update)=\"editField(column, row, $event)\"\n            [errorText]=\"selectFieldValue(row, column.errorMessageField)\"\n            [value]=\"value\"\n          >\n            {{ value }}\n          </ice-editable-text>\n        </ng-container>\n\n        <ng-template\n          #cellTemplate\n          *ngIf=\"column.cellTemplate\"\n          [ngTemplateOutlet]=\"column.cellTemplate\"\n          [ngTemplateOutletContext]=\"cellContext\"\n        >\n        </ng-template>\n      </ng-container>\n    </div>\n  "
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9ib2R5LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osVUFBVSxFQUNWLGdCQUFnQixFQUdoQix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUl0QztJQStXRSxvQ0FBWSxPQUFtQixFQUFVLEVBQXFCLEVBQVUsU0FBdUI7UUFBdEQsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBM0dyRixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBdUU3RCxnQkFBVyxHQUF5QyxFQUFFLENBQUM7UUFJdkQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQix1QkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELGVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxD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USxDQUFDOztJQXFKckMsaUNBQUM7Q0FBQSxBQWhtQkQsSUFnbUJDO1NBMWNZLDBCQUEwQjs7O0lBQ3JDLGtEQUFnRjs7SUE2R2hGLDhDQUEyRDs7SUFFM0QsZ0RBQTZEOztJQUU3RCxrREFDK0I7O0lBb0UvQixpREFBdUQ7O0lBQ3ZELG9EQUFvQjs7SUFDcEIsMkNBQVc7O0lBQ1gsNkNBQXVCOztJQUN2QiwrQ0FBa0I7O0lBQ2xCLHdEQUFzRDs7SUFDdEQsZ0RBQW9EOztJQUVwRCxpREFZRTs7Ozs7SUFFRixpREFBNkI7Ozs7O0lBQzdCLDRDQUFzQjs7Ozs7SUFDdEIsNkNBQTZCOzs7OztJQUM3QiwwQ0FBa0I7Ozs7O0lBQ2xCLGdEQUF3Qjs7Ozs7SUFDeEIsNENBQW9COzs7OztJQUNwQixnREFBMkI7Ozs7O0lBQzNCLCtDQUEwQjs7Ozs7SUFDMUIsK0NBQTJCOzs7OztJQUMzQiw4Q0FBc0I7Ozs7O0lBQ3RCLGlEQUFnQzs7Ozs7SUFFQyx3Q0FBNkI7Ozs7O0lBQUUsK0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgUGlwZVRyYW5zZm9ybSxcbiAgSG9zdEJpbmRpbmcsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE9uRGVzdHJveSxcbiAgRG9DaGVjayxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xuaW1wb3J0IHsgTW91c2VFdmVudCwgS2V5Ym9hcmRFdmVudCB9IGZyb20gJy4uLy4uL2V2ZW50cyc7XG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vdHlwZXMvc29ydC1kaXJlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBLZXlzIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5cyc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCB0eXBlIFRyZWVTdGF0dXMgPSAnY29sbGFwc2VkJyB8ICdleHBhbmRlZCcgfCAnbG9hZGluZycgfCAnZGlzYWJsZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtYm9keS1jZWxsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJkYXRhdGFibGUtYm9keS1jZWxsLWxhYmVsXCJcbiAgICAgIHN0eWxlPVwiZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBoZWlnaHQ6IDEwMCU7XCJcbiAgICAgIFtzdHlsZS5tYXJnaW4tbGVmdC5weF09XCJjYWxjTGVmdE1hcmdpbihjb2x1bW4sIHJvdylcIlxuICAgID5cbiAgICAgIDxhXG4gICAgICAgICpuZ0lmPVwiY29sdW1uPy5wcm9wID09PSAnaWNlLWV4cGFuZGFibGUnICYmIHJvdz8uZGV0YWlsPy5sZW5ndGggPiAwXCJcbiAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgIFtjbGFzcy5kYXRhdGFibGUtaWNvbi1kb3duXT1cIiFleHBhbmRlZFwiXG4gICAgICAgIFtjbGFzcy5kYXRhdGFibGUtaWNvbi11cF09XCJleHBhbmRlZFwiXG4gICAgICAgIHN0eWxlPVwiZm9udC1zaXplOiAxOHB4OyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyO1wiXG4gICAgICAgIHRpdGxlPVwiRXhwYW5kL0NvbGxhcHNlIFJvd1wiXG4gICAgICAgIChkYmxjbGljayk9XCJ0b2dnbGVFeHBhbmRSb3cocm93LCAkZXZlbnQpXCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZFJvdyhyb3csICRldmVudClcIlxuICAgICAgPlxuICAgICAgPC9hPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbj8ucHJvcCAhPT0gJ2ljZS1leHBhbmRhYmxlJ1wiPlxuICAgICAgICA8bGFiZWxcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5jaGVja2JveGFibGUgJiYgKCFkaXNwbGF5Q2hlY2sgfHwgZGlzcGxheUNoZWNrKHJvdywgY29sdW1uLCB2YWx1ZSkpXCJcbiAgICAgICAgICBjbGFzcz1cImRhdGF0YWJsZS1jaGVja2JveFwiXG4gICAgICAgID5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZFwiIChjbGljayk9XCJvbkNoZWNrYm94Q2hhbmdlKCRldmVudClcIiAvPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmlzVHJlZUNvbHVtblwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICpuZ0lmPVwiIWNvbHVtbi50cmVlVG9nZ2xlVGVtcGxhdGVcIlxuICAgICAgICAgICAgY2xhc3M9XCJkYXRhdGFibGUtdHJlZS1idXR0b25cIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cInRyZWVTdGF0dXMgPT09ICdkaXNhYmxlZCdcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uVHJlZUFjdGlvbigpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgPGkgKm5nSWY9XCJ0cmVlU3RhdHVzID09PSAnbG9hZGluZydcIiBjbGFzcz1cImljb24gZGF0YXRhYmxlLWljb24tY29sbGFwc2VcIj48L2k+XG4gICAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2NvbGxhcHNlZCdcIiBjbGFzcz1cImljb24gZGF0YXRhYmxlLWljb24tdXBcIj48L2k+XG4gICAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2V4cGFuZGVkJyB8fCB0cmVlU3RhdHVzID09PSAnZGlzYWJsZWQnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLWRvd25cIj48L2k+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICAqbmdJZj1cImNvbHVtbi50cmVlVG9nZ2xlVGVtcGxhdGVcIlxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLnRyZWVUb2dnbGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBjZWxsQ29udGV4dDogY2VsbENvbnRleHQgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxkaXYgKm5nSWY9XCJjb2x1bW4uaWNvbnMgYXMgaWNvbnNcIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IG1hcmdpbi1yaWdodDogMTBweDtcIj5cbiAgICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpIG9mIGdldEljb25zKHJvdywgaWNvbnMpXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwiaS5pY29uXCJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImkudGV4dFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiXG4gICAgICAgICAgICAgICEhaS5vbkNsaWNrQWN0aW9uXG4gICAgICAgICAgICAgICAgPyBvbkNsaWNrRmllbGQocm93LCBjb2x1bW4ub25DbGlja0FjdGlvbiB8fCBjb2x1bW4uYWN0aW9uLCAkZXZlbnQpXG4gICAgICAgICAgICAgICAgOiBpLmFjdGlvbiAmJiBpLmFjdGlvbihyb3cpXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgW3N0eWxlLmN1cnNvcl09XCJpLmFjdGlvbiA/ICdwb2ludGVyJyA6ICdhdXRvJ1wiXG4gICAgICAgICAgICBjbGFzcz1cInt7IGkuY2xhc3MgfX0gbWF0LWljb24gbWF0ZXJpYWwtaWNvbnMgaWNlLW1sLTEwXCJcbiAgICAgICAgICA+PC9tYXQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPG1hdC1pY29uXG4gICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgIGNvbHVtbi5pY29uQ3VzdG9tVG9vbHRpcEh0bWxUZXh0ICYmXG4gICAgICAgICAgICBjb2x1bW4ucHJvcCAmJlxuICAgICAgICAgICAgc2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5pY29uQ3VzdG9tVG9vbHRpcEh0bWxUZXh0KSBhcyBjdXN0b21IdG1sXG4gICAgICAgICAgXCJcbiAgICAgICAgICBpY2VDdXN0b21IdG1sVG9vbFRpcFxuICAgICAgICAgIFtpY2VUb29sdGlwSHRtbFRleHRdPVwic2FuYXRpemVIdG1sKGN1c3RvbUh0bWwpXCJcbiAgICAgICAgICBbZHVyYXRpb25dPVwiMTUwMFwiXG4gICAgICAgICAgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLnByb3AgJiYgc2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5pY29uQ29sb3IpXCJcbiAgICAgICAgICA+cHJpb3JpdHlfaGlnaDwvbWF0LWljb25cbiAgICAgICAgPlxuXG4gICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICpuZ0lmPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnSW5mb1Rvb2x0aXAnXVwiXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnSW5mb1Rvb2x0aXAnXVwiXG4gICAgICAgICAgY2xhc3M9XCJtYXQtaWNvbiBtYXRlcmlhbC1pY29uc1wiXG4gICAgICAgICAgPmluZm88L21hdC1pY29uXG4gICAgICAgID5cblxuICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0V4Y2x1ZGVkJ11cIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0V4Y2x1ZGVkJ11cIlxuICAgICAgICAgIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIlxuICAgICAgICAgID5ibG9jazwvbWF0LWljb25cbiAgICAgICAgPlxuXG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICFjb2x1bW4uYWN0aW9uQnV0dG9uSWNvbiAmJlxuICAgICAgICAgICAgIWNvbHVtbi5jZWxsVGVtcGxhdGUgJiZcbiAgICAgICAgICAgICFjb2x1bW4uc2VsZWN0T3B0aW9ucyAmJlxuICAgICAgICAgICAgKCFjb2x1bW4uZWRpdGFibGUgfHwgIShpc0VkaXRhYmxlKGNvbHVtbiwgcm93KSB8IGFzeW5jKSlcbiAgICAgICAgICBcIlxuICAgICAgICAgIGNsYXNzPVwiaWNlLWRhdGEtdGFibGUtcm93XCJcbiAgICAgICAgICBpY2VDdXN0b21IdG1sVG9vbFRpcFxuICAgICAgICAgIFtpY2VUb29sdGlwSHRtbFRleHRdPVwiZ2V0VG9vbHRpcFZhbHVlKHZhbHVlLCByb3csIGNvbHVtbilcIlxuICAgICAgICAgIFtzaG93VG9vbFRpcE9uVGV4dE92ZXJmbG93XT1cInRydWVcIlxuICAgICAgICAgIFtzaG93VG9vbFRpcF09XCJoYXNUb1Nob3dUb29sVGlwKHJvdywgY29sdW1uKVwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJ2YWx1ZVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tGaWVsZChyb3csIGNvbHVtbi5vbkNsaWNrQWN0aW9uIHx8IGNvbHVtbi5hY3Rpb24sICRldmVudClcIlxuICAgICAgICA+PC9zcGFuPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5hY3Rpb25CdXR0b25JY29uICYmICEoY29sdW1uLmhpZGVBY3Rpb25CdXR0b24gJiYgY29sdW1uLmhpZGVBY3Rpb25CdXR0b24ocm93KSB8IGFzeW5jKVwiXG4gICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLmFjdGlvbkJ1dHRvblRvb2x0aXBcIlxuICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrUm93QWN0aW9uQnV0dG9uKCRldmVudCwgY29sdW1uLCByb3cpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCI+e3sgY29sdW1uLmFjdGlvbkJ1dHRvbkljb24gfX08L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8aWNlLWRhdGF0YWJsZS1yb3ctc2VsZWN0XG4gICAgICAgICAgc3R5bGU9XCJtYXJnaW4tdG9wOiAxOHB4XCJcbiAgICAgICAgICBbb3B0aW9uc109XCJjb2x1bW4uc2VsZWN0T3B0aW9uc1wiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLmNlbGxDbGFzc1wiXG4gICAgICAgICAgKHVwZGF0ZSk9XCJ1cGRhdGVTZWxlY3QoY29sdW1uLCByb3csICRldmVudClcIlxuICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgW2RlZmF1bHRWYWx1ZV09XCJjb2x1bW4uZGVmYXVsdFZhbHVlXCJcbiAgICAgICAgICBbc2VsZWN0RGlzYWJsZWRdPVwiY29sdW1uLmRpc2FibGVkXCJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5zZWxlY3RPcHRpb25zICYmICEoY29sdW1uLmhpZGVJZkVtcHR5ICYmIGNvbHVtbi5kaXNhYmxlZCAmJiB2YWx1ZSA9PT0gJycpXCJcbiAgICAgICAgPjwvaWNlLWRhdGF0YWJsZS1yb3ctc2VsZWN0PlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY29sdW1uLnNlbGVjdE9wdGlvbnMgJiYgKGNvbHVtbi5lZGl0YWJsZSAmJiBpc0VkaXRhYmxlKGNvbHVtbiwgcm93KSB8IGFzeW5jKVwiPlxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCIgKm5nSWY9XCIhY29sdW1uLmhpZGVFZGl0SWNvblwiPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgIDxpY2UtZWRpdGFibGUtdGV4dFxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLmNlbGxDbGFzc1wiXG4gICAgICAgICAgICAodXBkYXRlKT1cImVkaXRGaWVsZChjb2x1bW4sIHJvdywgJGV2ZW50KVwiXG4gICAgICAgICAgICBbZXJyb3JUZXh0XT1cInNlbGVjdEZpZWxkVmFsdWUocm93LCBjb2x1bW4uZXJyb3JNZXNzYWdlRmllbGQpXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgdmFsdWUgfX1cbiAgICAgICAgICA8L2ljZS1lZGl0YWJsZS10ZXh0PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAjY2VsbFRlbXBsYXRlXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY2VsbENvbnRleHRcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCb2R5Q2VsbENvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGRpc3BsYXlDaGVjazogKHJvdzogYW55LCBjb2x1bW4/OiBUYWJsZUNvbHVtbiwgdmFsdWU/OiBhbnkpID0+IGJvb2xlYW47XG5cbiAgQElucHV0KCkgc2V0IHJvd0RldGFpbChyb3dEZXRhaWw6IGFueSkge1xuICAgIHRoaXMuX3Jvd0RldGFpbCA9IHJvd0RldGFpbDtcbiAgfVxuXG4gIGdldCByb3dEZXRhaWwoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fcm93RGV0YWlsO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGdyb3VwKGdyb3VwOiBhbnkpIHtcbiAgICB0aGlzLl9ncm91cCA9IGdyb3VwO1xuICAgIHRoaXMuY2VsbENvbnRleHQuZ3JvdXAgPSBncm91cDtcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBncm91cCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXA7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcm93SGVpZ2h0KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcm93SGVpZ2h0ID0gdmFsO1xuICAgIHRoaXMuY2VsbENvbnRleHQucm93SGVpZ2h0ID0gdmFsO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHJvd0hlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcm93SGVpZ2h0O1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGlzU2VsZWN0ZWQodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IHZhbDtcbiAgICB0aGlzLmNlbGxDb250ZXh0LmlzU2VsZWN0ZWQgPSB2YWw7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdGVkO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGV4cGFuZGVkKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsO1xuICAgIHRoaXMuY2VsbENvbnRleHQuZXhwYW5kZWQgPSB2YWw7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcm93SW5kZXgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yb3dJbmRleCA9IHZhbDtcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvd0luZGV4ID0gdmFsO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHJvd0luZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd0luZGV4O1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGNvbHVtbihjb2x1bW46IFRhYmxlQ29sdW1uKSB7XG4gICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xuICAgIHRoaXMuY2VsbENvbnRleHQuY29sdW1uID0gY29sdW1uO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGNvbHVtbigpOiBUYWJsZUNvbHVtbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbjtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCByb3cocm93OiBhbnkpIHtcbiAgICB0aGlzLl9yb3cgPSByb3c7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5yb3cgPSByb3c7XG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgcm93KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3JvdztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzb3J0cyh2YWw6IGFueVtdKSB7XG4gICAgdGhpcy5fc29ydHMgPSB2YWw7XG4gICAgdGhpcy5jYWxjU29ydERpciA9IHRoaXMuY2FsY1NvcnREaXIodmFsKTtcbiAgfVxuXG4gIGdldCBzb3J0cygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRzO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHRyZWVTdGF0dXMoc3RhdHVzOiBUcmVlU3RhdHVzKSB7XG4gICAgaWYgKHN0YXR1cyAhPT0gJ2NvbGxhcHNlZCcgJiYgc3RhdHVzICE9PSAnZXhwYW5kZWQnICYmIHN0YXR1cyAhPT0gJ2xvYWRpbmcnICYmIHN0YXR1cyAhPT0gJ2Rpc2FibGVkJykge1xuICAgICAgdGhpcy5fdHJlZVN0YXR1cyA9ICdjb2xsYXBzZWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90cmVlU3RhdHVzID0gc3RhdHVzO1xuICAgIH1cbiAgICB0aGlzLmNlbGxDb250ZXh0LnRyZWVTdGF0dXMgPSB0aGlzLl90cmVlU3RhdHVzO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHRyZWVTdGF0dXMoKTogVHJlZVN0YXR1cyB7XG4gICAgcmV0dXJuIHRoaXMuX3RyZWVTdGF0dXM7XG4gIH1cblxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdjZWxsVGVtcGxhdGUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBjZWxsVGVtcGxhdGU6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjb2x1bW5Dc3NDbGFzc2VzKCk6IGFueSB7XG4gICAgbGV0IGNscyA9ICdkYXRhdGFibGUtYm9keS1jZWxsJztcbiAgICBpZiAodGhpcy5jb2x1bW4uY2VsbENsYXNzKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmNlbGxDbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY2xzICs9ICcgJyArIHRoaXMuY29sdW1uLmNlbGxDbGFzcztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmNlbGxDbGFzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmNvbHVtbi5jZWxsQ2xhc3Moe1xuICAgICAgICAgIHJvdzogdGhpcy5yb3csXG4gICAgICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNscyArPSByZXM7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocmVzKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgICAgICAgICAgaWYgKHJlc1trXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjbHMgKz0gYCAke2t9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLnNvcnREaXIpIHtcbiAgICAgIGNscyArPSAnIHNvcnQtYWN0aXZlJztcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNGb2N1c2VkKSB7XG4gICAgICBjbHMgKz0gJyBhY3RpdmUnO1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0RGlyID09PSBTb3J0RGlyZWN0aW9uLmFzYykge1xuICAgICAgY2xzICs9ICcgc29ydC1hc2MnO1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0RGlyID09PSBTb3J0RGlyZWN0aW9uLmRlc2MpIHtcbiAgICAgIGNscyArPSAnIHNvcnQtZGVzYyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNscztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ud2lkdGg7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbldpZHRoLnB4JylcbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1pbldpZHRoO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXhXaWR0aC5weCcpXG4gIGdldCBtYXhXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5tYXhXaWR0aDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JylcbiAgZ2V0IGhlaWdodCgpOiBzdHJpbmcgfCBudW1iZXIge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMucm93SGVpZ2h0O1xuICAgIGlmIChpc05hTihoZWlnaHQpKSB7XG4gICAgICByZXR1cm4gaGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gaGVpZ2h0ICsgJ3B4JztcbiAgfVxuICBfaXNFZGl0YWJsZTogeyBbYTogc3RyaW5nXTogT2JzZXJ2YWJsZTxib29sZWFuPiB9ID0ge307XG4gIHNhbml0aXplZFZhbHVlOiBhbnk7XG4gIHZhbHVlOiBhbnk7XG4gIHNvcnREaXI6IFNvcnREaXJlY3Rpb247XG4gIGlzRm9jdXNlZCA9IGZhbHNlO1xuICBvbkNoZWNrYm94Q2hhbmdlRm4gPSB0aGlzLm9uQ2hlY2tib3hDaGFuZ2UuYmluZCh0aGlzKTtcbiAgYWN0aXZhdGVGbiA9IHRoaXMuYWN0aXZhdGUuZW1pdC5iaW5kKHRoaXMuYWN0aXZhdGUpO1xuXG4gIGNlbGxDb250ZXh0OiBhbnkgPSB7XG4gICAgb25DaGVja2JveENoYW5nZUZuOiB0aGlzLm9uQ2hlY2tib3hDaGFuZ2VGbixcbiAgICBhY3RpdmF0ZUZuOiB0aGlzLmFjdGl2YXRlRm4sXG4gICAgcm93OiB0aGlzLnJvdyxcbiAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXG4gICAgaXNTZWxlY3RlZDogdGhpcy5pc1NlbGVjdGVkLFxuICAgIHJvd0luZGV4OiB0aGlzLnJvd0luZGV4LFxuICAgIHRyZWVTdGF0dXM6IHRoaXMudHJlZVN0YXR1cyxcbiAgICBvblRyZWVBY3Rpb246IHRoaXMub25UcmVlQWN0aW9uLmJpbmQodGhpcylcbiAgfTtcblxuICBwcml2YXRlIF9pc1NlbGVjdGVkOiBib29sZWFuO1xuICBwcml2YXRlIF9zb3J0czogYW55W107XG4gIHByaXZhdGUgX2NvbHVtbjogVGFibGVDb2x1bW47XG4gIHByaXZhdGUgX3JvdzogYW55O1xuICBwcml2YXRlIF9yb3dEZXRhaWw6IGFueTtcbiAgcHJpdmF0ZSBfZ3JvdXA6IGFueTtcbiAgcHJpdmF0ZSBfcm93SGVpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgX3Jvd0luZGV4OiBudW1iZXI7XG4gIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuO1xuICBwcml2YXRlIF9lbGVtZW50OiBhbnk7XG4gIHByaXZhdGUgX3RyZWVTdGF0dXM6IFRyZWVTdGF0dXM7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNlbGxUZW1wbGF0ZSkge1xuICAgICAgdGhpcy5jZWxsVGVtcGxhdGUuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxuICBjaGVja1ZhbHVlVXBkYXRlcygpOiB2b2lkIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcblxuICAgIGlmICghdGhpcy5yb3cgfHwgIXRoaXMuY29sdW1uKSB7XG4gICAgICB2YWx1ZSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWwgPSB0aGlzLmNvbHVtbi4kJHZhbHVlR2V0dGVyKHRoaXMucm93LCB0aGlzLmNvbHVtbi5wcm9wKTtcbiAgICAgIGNvbnN0IHVzZXJQaXBlOiBQaXBlVHJhbnNmb3JtID0gdGhpcy5jb2x1bW4ucGlwZTtcblxuICAgICAgaWYgKHVzZXJQaXBlKSB7XG4gICAgICAgIHZhbHVlID0gdXNlclBpcGUudHJhbnNmb3JtKHZhbCk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLmNlbGxDb250ZXh0LnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnNhbml0aXplZFZhbHVlID0gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHRoaXMuc3RyaXBIdG1sKHZhbHVlKSA6IHZhbHVlO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIG9uRm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIG9uQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcbiAgICAgIHR5cGU6ICdjbGljaycsXG4gICAgICBldmVudCxcbiAgICAgIHJvdzogdGhpcy5yb3csXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXG4gICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICBjZWxsRWxlbWVudDogdGhpcy5fZWxlbWVudFxuICAgIH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2V1cCcsIFsnJGV2ZW50J10pXG4gIG1pZGRsZWNsaWNrRXZlbnQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQud2hpY2ggPT09IDIpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XG4gICAgICAgIHR5cGU6ICdtaWRkbGVjbGljaycsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICByb3c6IHRoaXMucm93LFxuICAgICAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkYmxjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uRGJsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgdHlwZTogJ2RibGNsaWNrJyxcbiAgICAgIGV2ZW50LFxuICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgY29uc3QgaXNUYXJnZXRDZWxsID0gZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9lbGVtZW50O1xuXG4gICAgY29uc3QgaXNBY3Rpb24gPVxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5yZXR1cm4gfHxcbiAgICAgIGtleUNvZGUgPT09IEtleXMuZG93biB8fFxuICAgICAga2V5Q29kZSA9PT0gS2V5cy51cCB8fFxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5sZWZ0IHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLnJpZ2h0O1xuXG4gICAgaWYgKGlzQWN0aW9uICYmIGlzVGFyZ2V0Q2VsbCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgICB0eXBlOiAna2V5ZG93bicsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICByb3c6IHRoaXMucm93LFxuICAgICAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkNoZWNrYm94Q2hhbmdlKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgIGV2ZW50LFxuICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50LFxuICAgICAgdHJlZVN0YXR1czogJ2NvbGxhcHNlZCdcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGNTb3J0RGlyKHNvcnRzOiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKCFzb3J0cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNvcnQgPSBzb3J0cy5maW5kKChzOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiBzLnByb3AgPT09IHRoaXMuY29sdW1uLnByb3A7XG4gICAgfSk7XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgcmV0dXJuIHNvcnQuZGlyO1xuICAgIH1cbiAgfVxuXG4gIHN0cmlwSHRtbChodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghaHRtbC5yZXBsYWNlKSB7XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvPFxcLz9bXj5dKyg+fCQpL2csICcnKTtcbiAgfVxuXG4gIG9uVHJlZUFjdGlvbigpIHtcbiAgICB0aGlzLnRyZWVBY3Rpb24uZW1pdCh0aGlzLnJvdyk7XG4gIH1cblxuICBjYWxjTGVmdE1hcmdpbihjb2x1bW46IGFueSwgcm93OiBhbnkpIHtcbiAgICBjb25zdCBsZXZlbEluZGVudCA9IGNvbHVtbi50cmVlTGV2ZWxJbmRlbnQgIT0gbnVsbCA/IGNvbHVtbi50cmVlTGV2ZWxJbmRlbnQgOiA1MDtcbiAgICByZXR1cm4gY29sdW1uLmlzVHJlZUNvbHVtbiA/IHJvdy5sZXZlbCAqIGxldmVsSW5kZW50IDogMDtcbiAgfVxuXG4gIGhhc1RvU2hvd1Rvb2xUaXAocm93LCBmaWVsZCkge1xuICAgIHJldHVybiByb3cgJiYgZmllbGQgJiYgZmllbGQudG9vbHRpcCAmJiBmaWVsZC50b29sdGlwLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXRUb29sdGlwVmFsdWUodmFsdWUsIHJvdywgZmllbGQpIHtcbiAgICBpZiAocm93ICYmIGZpZWxkICYmIGZpZWxkLnRvb2x0aXAgJiYgZmllbGQudG9vbHRpcC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gcm93W2Ake2ZpZWxkLnRvb2x0aXB9YF0gfHwgZmllbGQudG9vbHRpcDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZ2V0SWNvbnMocm93LCBpY29ucykge1xuICAgIGlmIChyb3cgJiYgaWNvbnMpIHtcbiAgICAgIGNvbnN0IGljb25zQXJyYXkgPSBpY29ucy5zcGxpdCgnLicpO1xuICAgICAgcmV0dXJuIGljb25zQXJyYXkubGVuZ3RoID4gMSAmJiByb3dbaWNvbnNBcnJheVswXV0gPyByb3dbaWNvbnNBcnJheVswXV1baWNvbnNBcnJheVsxXV0gfHwgW10gOiByb3dbaWNvbnNdIHx8IFtdO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBzZWxlY3RGaWVsZFZhbHVlKHJvdywgcHJvcCkge1xuICAgIGlmIChyb3cgJiYgcHJvcCkge1xuICAgICAgY29uc3QgcHJvcEFycmF5ID0gcHJvcC5zcGxpdCgnLicpO1xuICAgICAgcmV0dXJuIHByb3BBcnJheS5sZW5ndGggPiAxICYmIHJvd1twcm9wQXJyYXlbMF1dID8gcm93W3Byb3BBcnJheVswXV1bcHJvcEFycmF5WzFdXSA6IHJvd1twcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuICcgJztcbiAgfVxuXG4gIG9uQ2xpY2tSb3dBY3Rpb25CdXR0b24oZXZlbnQsIGZpZWxkLCByb3cpIHtcbiAgICBpZiAoZmllbGQgJiYgcm93KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBmaWVsZC5hY3Rpb24ocm93KTtcbiAgICB9XG4gIH1cblxuICBzYW5hdGl6ZUh0bWwoaHRtbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGh0bWwpIGFzIHN0cmluZztcbiAgfVxuXG4gIGlzRWRpdGFibGUoZmllbGQ6IGFueSwgcm93OiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAoZmllbGQgJiYgcm93KSB7XG4gICAgICBpZiAoIXRoaXMuX2lzRWRpdGFibGVbZmllbGQucHJvcCArIHJvdy5pZF0pIHtcbiAgICAgICAgdGhpcy5faXNFZGl0YWJsZVtmaWVsZC5wcm9wICsgcm93LmlkXSA9IGZpZWxkLmVkaXRhYmxlKHJvdyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5faXNFZGl0YWJsZVtmaWVsZC5wcm9wICsgcm93LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgfVxuXG4gIHVwZGF0ZVNlbGVjdChmaWVsZCwgcm93OiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICByb3dbZmllbGQucHJvcF0gPSBuZXdWYWx1ZTtcbiAgICBpZiAoZmllbGQub25FZGl0KSB7XG4gICAgICBmaWVsZC5vbkVkaXQocm93KTtcbiAgICB9XG4gIH1cblxuICBlZGl0RmllbGQoZmllbGQsIHJvdzogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgZmllbGQub25FZGl0KHsgLi4ucm93LCBbZmllbGQucHJvcF06IG5ld1ZhbHVlIH0pO1xuICB9XG5cbiAgdG9nZ2xlRXhwYW5kUm93KHJvdywgZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLnJvd0RldGFpbCkge1xuICAgICAgdGhpcy5yb3dEZXRhaWwudG9nZ2xlRXhwYW5kUm93KHJvdyk7XG4gICAgfVxuICB9XG5cbiAgb25DbGlja0ZpZWxkKHJvdywgYWN0aW9uLCBldmVudCkge1xuICAgIGlmIChyb3cgJiYgYWN0aW9uKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGFjdGlvbihyb3cpO1xuICAgIH1cbiAgfVxufVxuIl19