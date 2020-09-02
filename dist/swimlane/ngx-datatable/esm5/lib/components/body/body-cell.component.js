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
    DataTableBodyCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-body-cell',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"datatable-body-cell-label\" style=\"display: flex;\" [style.margin-left.px]=\"calcLeftMargin(column, row)\">\n      <label\n        *ngIf=\"column.checkboxable && (!displayCheck || displayCheck(row, column, value))\"\n        class=\"datatable-checkbox\"\n      >\n        <input type=\"checkbox\" [checked]=\"isSelected\" (click)=\"onCheckboxChange($event)\" />\n      </label>\n      <ng-container *ngIf=\"column.isTreeColumn\">\n        <button\n          *ngIf=\"!column.treeToggleTemplate\"\n          class=\"datatable-tree-button\"\n          [disabled]=\"treeStatus === 'disabled'\"\n          (click)=\"onTreeAction()\"\n        >\n          <span>\n            <i *ngIf=\"treeStatus === 'loading'\" class=\"icon datatable-icon-collapse\"></i>\n            <i *ngIf=\"treeStatus === 'collapsed'\" class=\"icon datatable-icon-up\"></i>\n            <i *ngIf=\"treeStatus === 'expanded' || treeStatus === 'disabled'\" class=\"icon datatable-icon-down\"></i>\n          </span>\n        </button>\n        <ng-template\n          *ngIf=\"column.treeToggleTemplate\"\n          [ngTemplateOutlet]=\"column.treeToggleTemplate\"\n          [ngTemplateOutletContext]=\"{ cellContext: cellContext }\"\n        >\n        </ng-template>\n      </ng-container>\n\n      <h4\n        *ngIf=\"\n          !column.actionButtonIcon &&\n          !column.cellTemplate &&\n          !column.selectOptions &&\n          (!column.editable || !(isEditable(column, row) | async))\n        \"\n        class=\"ice-data-table-row\"\n        iceCustomHtmlToolTip\n        [iceTooltipHtmlText]=\"getTooltipValue(value, row, column)\"\n        [showToolTipOnTextOverflow]=\"true\"\n        [showToolTip]=\"hasToShowToolTip(row, column)\"\n        [innerHTML]=\"value\"\n      ></h4>\n\n      <div *ngIf=\"column.icons as icons\" fxLayout=\"column\">\n        <mat-icon\n          *ngFor=\"let i of getIcons(row, icons)\"\n          [innerHTML]=\"i.icon\"\n          [matTooltip]=\"i.text\"\n          class=\"{{ i.class }} mat-icon material-icons ice-ml-10\"\n        ></mat-icon>\n      </div>\n\n      <mat-icon\n        *ngIf=\"\n          column.iconCustomTooltipHtmlText &&\n          column.prop &&\n          selectFieldValue(row, column.iconCustomTooltipHtmlText) as customHtml\n        \"\n        iceCustomHtmlToolTip\n        [iceTooltipHtmlText]=\"sanatizeHtml(customHtml)\"\n        [duration]=\"1500\"\n        class=\"material-icons\"\n        [ngClass]=\"column.prop && selectFieldValue(row, column.iconColor)\"\n        >priority_high</mat-icon\n      >\n\n      <mat-icon\n        *ngIf=\"column.prop && row[column.prop.toString() + 'InfoTooltip']\"\n        [matTooltip]=\"column.prop && row[column.prop.toString() + 'InfoTooltip']\"\n        class=\"mat-icon material-icons\"\n        >info</mat-icon\n      >\n\n      <mat-icon\n        *ngIf=\"column.prop && row[column.prop.toString() + 'Excluded']\"\n        [matTooltip]=\"column.prop && row[column.prop.toString() + 'Excluded']\"\n        class=\"mat-icon material-icons\"\n        >block</mat-icon\n      >\n\n      <button\n        *ngIf=\"column.actionButtonIcon && !(column.hideActionButton && column.hideActionButton(row) | async)\"\n        mat-icon-button\n        [matTooltip]=\"column.actionButtonTooltip\"\n        (click)=\"onClickRowActionButton($event, column, row)\"\n      >\n        <mat-icon class=\"mat-icon material-icons\">{{ column.actionButtonIcon }}</mat-icon>\n      </button>\n\n      <ice-datatable-row-select\n        style=\"margin-top: 18px\"\n        [options]=\"column.selectOptions\"\n        [ngClass]=\"column.cellClass\"\n        (update)=\"updateSelect(column, row, $event)\"\n        [value]=\"value || column.defaultValue\"\n        [selectDisabled]=\"column.disabled\"\n        *ngIf=\"column.selectOptions && !(column.hideIfEmpty && column.disabled && value === '')\"\n      ></ice-datatable-row-select>\n\n      <ng-container *ngIf=\"!column.selectOptions && (column.editable && isEditable(column, row) | async)\">\n        <mat-icon class=\"mat-icon material-icons\" *ngIf=\"!column.hideEditIcon\">edit</mat-icon>\n        <ice-editable-text\n          [ngClass]=\"column.cellClass\"\n          (update)=\"editField(column, row, $event)\"\n          [errorText]=\"selectFieldValue(row, column.errorMessageField)\"\n          [value]=\"value\"\n        >\n          {{ value }}\n        </ice-editable-text>\n      </ng-container>\n\n      <ng-template\n        #cellTemplate\n        *ngIf=\"column.cellTemplate\"\n        [ngTemplateOutlet]=\"column.cellTemplate\"\n        [ngTemplateOutletContext]=\"cellContext\"\n      >\n      </ng-template>\n    </div>\n  "
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9ib2R5LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osVUFBVSxFQUNWLGdCQUFnQixFQUdoQix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUl0QztJQTZVRSxvQ0FBWSxPQUFtQixFQUFVLEVBQXFCLEVBQVUsU0FBdUI7UUFBdEQsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBMUdyRixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBdUU3RCxnQkFBVyxHQUF5QyxFQUFFLENBQUM7UUFJdkQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQix1QkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELGVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxD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Z0RBQTZEOztJQUU3RCxrREFDK0I7O0lBb0UvQixpREFBdUQ7O0lBQ3ZELG9EQUFvQjs7SUFDcEIsMkNBQVc7O0lBQ1gsNkNBQXVCOztJQUN2QiwrQ0FBa0I7O0lBQ2xCLHdEQUFzRDs7SUFDdEQsZ0RBQW9EOztJQUVwRCxpREFZRTs7Ozs7SUFFRixpREFBNkI7Ozs7O0lBQzdCLDRDQUFzQjs7Ozs7SUFDdEIsNkNBQTZCOzs7OztJQUM3QiwwQ0FBa0I7Ozs7O0lBQ2xCLDRDQUFvQjs7Ozs7SUFDcEIsZ0RBQTJCOzs7OztJQUMzQiwrQ0FBMEI7Ozs7O0lBQzFCLCtDQUEyQjs7Ozs7SUFDM0IsOENBQXNCOzs7OztJQUN0QixpREFBZ0M7Ozs7O0lBRUMsd0NBQTZCOzs7OztJQUFFLCtDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIFBpcGVUcmFuc2Zvcm0sXG4gIEhvc3RCaW5kaW5nLFxuICBWaWV3Q2hpbGQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBPbkRlc3Ryb3ksXG4gIERvQ2hlY2ssXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uLy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcbmltcG9ydCB7IE1vdXNlRXZlbnQsIEtleWJvYXJkRXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudHMnO1xuaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQtZGlyZWN0aW9uLnR5cGUnO1xuaW1wb3J0IHsgS2V5cyB9IGZyb20gJy4uLy4uL3V0aWxzL2tleXMnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgdHlwZSBUcmVlU3RhdHVzID0gJ2NvbGxhcHNlZCcgfCAnZXhwYW5kZWQnIHwgJ2xvYWRpbmcnIHwgJ2Rpc2FibGVkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWJvZHktY2VsbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJkYXRhdGFibGUtYm9keS1jZWxsLWxhYmVsXCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4O1wiIFtzdHlsZS5tYXJnaW4tbGVmdC5weF09XCJjYWxjTGVmdE1hcmdpbihjb2x1bW4sIHJvdylcIj5cbiAgICAgIDxsYWJlbFxuICAgICAgICAqbmdJZj1cImNvbHVtbi5jaGVja2JveGFibGUgJiYgKCFkaXNwbGF5Q2hlY2sgfHwgZGlzcGxheUNoZWNrKHJvdywgY29sdW1uLCB2YWx1ZSkpXCJcbiAgICAgICAgY2xhc3M9XCJkYXRhdGFibGUtY2hlY2tib3hcIlxuICAgICAgPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZFwiIChjbGljayk9XCJvbkNoZWNrYm94Q2hhbmdlKCRldmVudClcIiAvPlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4uaXNUcmVlQ29sdW1uXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAqbmdJZj1cIiFjb2x1bW4udHJlZVRvZ2dsZVRlbXBsYXRlXCJcbiAgICAgICAgICBjbGFzcz1cImRhdGF0YWJsZS10cmVlLWJ1dHRvblwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cInRyZWVTdGF0dXMgPT09ICdkaXNhYmxlZCdcIlxuICAgICAgICAgIChjbGljayk9XCJvblRyZWVBY3Rpb24oKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2xvYWRpbmcnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLWNvbGxhcHNlXCI+PC9pPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJ0cmVlU3RhdHVzID09PSAnY29sbGFwc2VkJ1wiIGNsYXNzPVwiaWNvbiBkYXRhdGFibGUtaWNvbi11cFwiPjwvaT5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2V4cGFuZGVkJyB8fCB0cmVlU3RhdHVzID09PSAnZGlzYWJsZWQnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLWRvd25cIj48L2k+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW4udHJlZVRvZ2dsZVRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4udHJlZVRvZ2dsZVRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBjZWxsQ29udGV4dDogY2VsbENvbnRleHQgfVwiXG4gICAgICAgID5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8aDRcbiAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAhY29sdW1uLmFjdGlvbkJ1dHRvbkljb24gJiZcbiAgICAgICAgICAhY29sdW1uLmNlbGxUZW1wbGF0ZSAmJlxuICAgICAgICAgICFjb2x1bW4uc2VsZWN0T3B0aW9ucyAmJlxuICAgICAgICAgICghY29sdW1uLmVkaXRhYmxlIHx8ICEoaXNFZGl0YWJsZShjb2x1bW4sIHJvdykgfCBhc3luYykpXG4gICAgICAgIFwiXG4gICAgICAgIGNsYXNzPVwiaWNlLWRhdGEtdGFibGUtcm93XCJcbiAgICAgICAgaWNlQ3VzdG9tSHRtbFRvb2xUaXBcbiAgICAgICAgW2ljZVRvb2x0aXBIdG1sVGV4dF09XCJnZXRUb29sdGlwVmFsdWUodmFsdWUsIHJvdywgY29sdW1uKVwiXG4gICAgICAgIFtzaG93VG9vbFRpcE9uVGV4dE92ZXJmbG93XT1cInRydWVcIlxuICAgICAgICBbc2hvd1Rvb2xUaXBdPVwiaGFzVG9TaG93VG9vbFRpcChyb3csIGNvbHVtbilcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cInZhbHVlXCJcbiAgICAgID48L2g0PlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwiY29sdW1uLmljb25zIGFzIGljb25zXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgPG1hdC1pY29uXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGkgb2YgZ2V0SWNvbnMocm93LCBpY29ucylcIlxuICAgICAgICAgIFtpbm5lckhUTUxdPVwiaS5pY29uXCJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpLnRleHRcIlxuICAgICAgICAgIGNsYXNzPVwie3sgaS5jbGFzcyB9fSBtYXQtaWNvbiBtYXRlcmlhbC1pY29ucyBpY2UtbWwtMTBcIlxuICAgICAgICA+PC9tYXQtaWNvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8bWF0LWljb25cbiAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICBjb2x1bW4uaWNvbkN1c3RvbVRvb2x0aXBIdG1sVGV4dCAmJlxuICAgICAgICAgIGNvbHVtbi5wcm9wICYmXG4gICAgICAgICAgc2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5pY29uQ3VzdG9tVG9vbHRpcEh0bWxUZXh0KSBhcyBjdXN0b21IdG1sXG4gICAgICAgIFwiXG4gICAgICAgIGljZUN1c3RvbUh0bWxUb29sVGlwXG4gICAgICAgIFtpY2VUb29sdGlwSHRtbFRleHRdPVwic2FuYXRpemVIdG1sKGN1c3RvbUh0bWwpXCJcbiAgICAgICAgW2R1cmF0aW9uXT1cIjE1MDBcIlxuICAgICAgICBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLnByb3AgJiYgc2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5pY29uQ29sb3IpXCJcbiAgICAgICAgPnByaW9yaXR5X2hpZ2g8L21hdC1pY29uXG4gICAgICA+XG5cbiAgICAgIDxtYXQtaWNvblxuICAgICAgICAqbmdJZj1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0luZm9Ub29sdGlwJ11cIlxuICAgICAgICBbbWF0VG9vbHRpcF09XCJjb2x1bW4ucHJvcCAmJiByb3dbY29sdW1uLnByb3AudG9TdHJpbmcoKSArICdJbmZvVG9vbHRpcCddXCJcbiAgICAgICAgY2xhc3M9XCJtYXQtaWNvbiBtYXRlcmlhbC1pY29uc1wiXG4gICAgICAgID5pbmZvPC9tYXQtaWNvblxuICAgICAgPlxuXG4gICAgICA8bWF0LWljb25cbiAgICAgICAgKm5nSWY9XCJjb2x1bW4ucHJvcCAmJiByb3dbY29sdW1uLnByb3AudG9TdHJpbmcoKSArICdFeGNsdWRlZCddXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnRXhjbHVkZWQnXVwiXG4gICAgICAgIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIlxuICAgICAgICA+YmxvY2s8L21hdC1pY29uXG4gICAgICA+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJjb2x1bW4uYWN0aW9uQnV0dG9uSWNvbiAmJiAhKGNvbHVtbi5oaWRlQWN0aW9uQnV0dG9uICYmIGNvbHVtbi5oaWRlQWN0aW9uQnV0dG9uKHJvdykgfCBhc3luYylcIlxuICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLmFjdGlvbkJ1dHRvblRvb2x0aXBcIlxuICAgICAgICAoY2xpY2spPVwib25DbGlja1Jvd0FjdGlvbkJ1dHRvbigkZXZlbnQsIGNvbHVtbiwgcm93KVwiXG4gICAgICA+XG4gICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCI+e3sgY29sdW1uLmFjdGlvbkJ1dHRvbkljb24gfX08L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDxpY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3RcbiAgICAgICAgc3R5bGU9XCJtYXJnaW4tdG9wOiAxOHB4XCJcbiAgICAgICAgW29wdGlvbnNdPVwiY29sdW1uLnNlbGVjdE9wdGlvbnNcIlxuICAgICAgICBbbmdDbGFzc109XCJjb2x1bW4uY2VsbENsYXNzXCJcbiAgICAgICAgKHVwZGF0ZSk9XCJ1cGRhdGVTZWxlY3QoY29sdW1uLCByb3csICRldmVudClcIlxuICAgICAgICBbdmFsdWVdPVwidmFsdWUgfHwgY29sdW1uLmRlZmF1bHRWYWx1ZVwiXG4gICAgICAgIFtzZWxlY3REaXNhYmxlZF09XCJjb2x1bW4uZGlzYWJsZWRcIlxuICAgICAgICAqbmdJZj1cImNvbHVtbi5zZWxlY3RPcHRpb25zICYmICEoY29sdW1uLmhpZGVJZkVtcHR5ICYmIGNvbHVtbi5kaXNhYmxlZCAmJiB2YWx1ZSA9PT0gJycpXCJcbiAgICAgID48L2ljZS1kYXRhdGFibGUtcm93LXNlbGVjdD5cblxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjb2x1bW4uc2VsZWN0T3B0aW9ucyAmJiAoY29sdW1uLmVkaXRhYmxlICYmIGlzRWRpdGFibGUoY29sdW1uLCByb3cpIHwgYXN5bmMpXCI+XG4gICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCIgKm5nSWY9XCIhY29sdW1uLmhpZGVFZGl0SWNvblwiPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICA8aWNlLWVkaXRhYmxlLXRleHRcbiAgICAgICAgICBbbmdDbGFzc109XCJjb2x1bW4uY2VsbENsYXNzXCJcbiAgICAgICAgICAodXBkYXRlKT1cImVkaXRGaWVsZChjb2x1bW4sIHJvdywgJGV2ZW50KVwiXG4gICAgICAgICAgW2Vycm9yVGV4dF09XCJzZWxlY3RGaWVsZFZhbHVlKHJvdywgY29sdW1uLmVycm9yTWVzc2FnZUZpZWxkKVwiXG4gICAgICAgICAgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IHZhbHVlIH19XG4gICAgICAgIDwvaWNlLWVkaXRhYmxlLXRleHQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICNjZWxsVGVtcGxhdGVcbiAgICAgICAgKm5nSWY9XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLmNlbGxUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjZWxsQ29udGV4dFwiXG4gICAgICA+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUJvZHlDZWxsQ29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZGlzcGxheUNoZWNrOiAocm93OiBhbnksIGNvbHVtbj86IFRhYmxlQ29sdW1uLCB2YWx1ZT86IGFueSkgPT4gYm9vbGVhbjtcblxuICBASW5wdXQoKSBzZXQgZ3JvdXAoZ3JvdXA6IGFueSkge1xuICAgIHRoaXMuX2dyb3VwID0gZ3JvdXA7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5ncm91cCA9IGdyb3VwO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGdyb3VwKCkge1xuICAgIHJldHVybiB0aGlzLl9ncm91cDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCByb3dIZWlnaHQodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yb3dIZWlnaHQgPSB2YWw7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5yb3dIZWlnaHQgPSB2YWw7XG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgcm93SGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dIZWlnaHQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgaXNTZWxlY3RlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc1NlbGVjdGVkID0gdmFsO1xuICAgIHRoaXMuY2VsbENvbnRleHQuaXNTZWxlY3RlZCA9IHZhbDtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGlzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2VsZWN0ZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZXhwYW5kZWQodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZXhwYW5kZWQgPSB2YWw7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5leHBhbmRlZCA9IHZhbDtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCByb3dJbmRleCh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3Jvd0luZGV4ID0gdmFsO1xuICAgIHRoaXMuY2VsbENvbnRleHQucm93SW5kZXggPSB2YWw7XG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgcm93SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcm93SW5kZXg7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgY29sdW1uKGNvbHVtbjogVGFibGVDb2x1bW4pIHtcbiAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XG4gICAgdGhpcy5jZWxsQ29udGV4dC5jb2x1bW4gPSBjb2x1bW47XG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgY29sdW1uKCk6IFRhYmxlQ29sdW1uIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHJvdyhyb3c6IGFueSkge1xuICAgIHRoaXMuX3JvdyA9IHJvdztcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvdyA9IHJvdztcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCByb3coKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fcm93O1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNvcnRzKHZhbDogYW55W10pIHtcbiAgICB0aGlzLl9zb3J0cyA9IHZhbDtcbiAgICB0aGlzLmNhbGNTb3J0RGlyID0gdGhpcy5jYWxjU29ydERpcih2YWwpO1xuICB9XG5cbiAgZ2V0IHNvcnRzKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydHM7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgdHJlZVN0YXR1cyhzdGF0dXM6IFRyZWVTdGF0dXMpIHtcbiAgICBpZiAoc3RhdHVzICE9PSAnY29sbGFwc2VkJyAmJiBzdGF0dXMgIT09ICdleHBhbmRlZCcgJiYgc3RhdHVzICE9PSAnbG9hZGluZycgJiYgc3RhdHVzICE9PSAnZGlzYWJsZWQnKSB7XG4gICAgICB0aGlzLl90cmVlU3RhdHVzID0gJ2NvbGxhcHNlZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RyZWVTdGF0dXMgPSBzdGF0dXM7XG4gICAgfVxuICAgIHRoaXMuY2VsbENvbnRleHQudHJlZVN0YXR1cyA9IHRoaXMuX3RyZWVTdGF0dXM7XG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgdHJlZVN0YXR1cygpOiBUcmVlU3RhdHVzIHtcbiAgICByZXR1cm4gdGhpcy5fdHJlZVN0YXR1cztcbiAgfVxuXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpIHRyZWVBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2NlbGxUZW1wbGF0ZScsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIGNlbGxUZW1wbGF0ZTogVmlld0NvbnRhaW5lclJlZjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGNvbHVtbkNzc0NsYXNzZXMoKTogYW55IHtcbiAgICBsZXQgY2xzID0gJ2RhdGF0YWJsZS1ib2R5LWNlbGwnO1xuICAgIGlmICh0aGlzLmNvbHVtbi5jZWxsQ2xhc3MpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5jb2x1bW4uY2VsbENsYXNzID09PSAnc3RyaW5nJykge1xuICAgICAgICBjbHMgKz0gJyAnICsgdGhpcy5jb2x1bW4uY2VsbENsYXNzO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jb2x1bW4uY2VsbENsYXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuY29sdW1uLmNlbGxDbGFzcyh7XG4gICAgICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgICAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY2xzICs9IHJlcztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyZXMpO1xuICAgICAgICAgIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgICAgICAgICBpZiAocmVzW2tdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGNscyArPSBgICR7a31gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuc29ydERpcikge1xuICAgICAgY2xzICs9ICcgc29ydC1hY3RpdmUnO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0ZvY3VzZWQpIHtcbiAgICAgIGNscyArPSAnIGFjdGl2ZSc7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uYXNjKSB7XG4gICAgICBjbHMgKz0gJyBzb3J0LWFzYyc7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uZGVzYykge1xuICAgICAgY2xzICs9ICcgc29ydC1kZXNjJztcbiAgICB9XG5cbiAgICByZXR1cm4gY2xzO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC5weCcpXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi53aWR0aDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWluV2lkdGgucHgnKVxuICBnZXQgbWluV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWluV2lkdGg7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1heFdpZHRoLnB4JylcbiAgZ2V0IG1heFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1heFdpZHRoO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKVxuICBnZXQgaGVpZ2h0KCk6IHN0cmluZyB8IG51bWJlciB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5yb3dIZWlnaHQ7XG4gICAgaWYgKGlzTmFOKGhlaWdodCkpIHtcbiAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgfVxuICAgIHJldHVybiBoZWlnaHQgKyAncHgnO1xuICB9XG4gIF9pc0VkaXRhYmxlOiB7IFthOiBzdHJpbmddOiBPYnNlcnZhYmxlPGJvb2xlYW4+IH0gPSB7fTtcbiAgc2FuaXRpemVkVmFsdWU6IGFueTtcbiAgdmFsdWU6IGFueTtcbiAgc29ydERpcjogU29ydERpcmVjdGlvbjtcbiAgaXNGb2N1c2VkID0gZmFsc2U7XG4gIG9uQ2hlY2tib3hDaGFuZ2VGbiA9IHRoaXMub25DaGVja2JveENoYW5nZS5iaW5kKHRoaXMpO1xuICBhY3RpdmF0ZUZuID0gdGhpcy5hY3RpdmF0ZS5lbWl0LmJpbmQodGhpcy5hY3RpdmF0ZSk7XG5cbiAgY2VsbENvbnRleHQ6IGFueSA9IHtcbiAgICBvbkNoZWNrYm94Q2hhbmdlRm46IHRoaXMub25DaGVja2JveENoYW5nZUZuLFxuICAgIGFjdGl2YXRlRm46IHRoaXMuYWN0aXZhdGVGbixcbiAgICByb3c6IHRoaXMucm93LFxuICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICBpc1NlbGVjdGVkOiB0aGlzLmlzU2VsZWN0ZWQsXG4gICAgcm93SW5kZXg6IHRoaXMucm93SW5kZXgsXG4gICAgdHJlZVN0YXR1czogdGhpcy50cmVlU3RhdHVzLFxuICAgIG9uVHJlZUFjdGlvbjogdGhpcy5vblRyZWVBY3Rpb24uYmluZCh0aGlzKVxuICB9O1xuXG4gIHByaXZhdGUgX2lzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX3NvcnRzOiBhbnlbXTtcbiAgcHJpdmF0ZSBfY29sdW1uOiBUYWJsZUNvbHVtbjtcbiAgcHJpdmF0ZSBfcm93OiBhbnk7XG4gIHByaXZhdGUgX2dyb3VwOiBhbnk7XG4gIHByaXZhdGUgX3Jvd0hlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIF9yb3dJbmRleDogbnVtYmVyO1xuICBwcml2YXRlIF9leHBhbmRlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfZWxlbWVudDogYW55O1xuICBwcml2YXRlIF90cmVlU3RhdHVzOiBUcmVlU3RhdHVzO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jZWxsVGVtcGxhdGUpIHtcbiAgICAgIHRoaXMuY2VsbFRlbXBsYXRlLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tWYWx1ZVVwZGF0ZXMoKTogdm9pZCB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG5cbiAgICBpZiAoIXRoaXMucm93IHx8ICF0aGlzLmNvbHVtbikge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdmFsID0gdGhpcy5jb2x1bW4uJCR2YWx1ZUdldHRlcih0aGlzLnJvdywgdGhpcy5jb2x1bW4ucHJvcCk7XG4gICAgICBjb25zdCB1c2VyUGlwZTogUGlwZVRyYW5zZm9ybSA9IHRoaXMuY29sdW1uLnBpcGU7XG5cbiAgICAgIGlmICh1c2VyUGlwZSkge1xuICAgICAgICB2YWx1ZSA9IHVzZXJQaXBlLnRyYW5zZm9ybSh2YWwpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5jZWxsQ29udGV4dC52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5zYW5pdGl6ZWRWYWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB0aGlzLnN0cmlwSHRtbCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBvbkZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XG4gICAgICB0eXBlOiAnY2xpY2snLFxuICAgICAgZXZlbnQsXG4gICAgICByb3c6IHRoaXMucm93LFxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25EYmxDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XG4gICAgICB0eXBlOiAnZGJsY2xpY2snLFxuICAgICAgZXZlbnQsXG4gICAgICByb3c6IHRoaXMucm93LFxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICBjb25zdCBpc1RhcmdldENlbGwgPSBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQ7XG5cbiAgICBjb25zdCBpc0FjdGlvbiA9XG4gICAgICBrZXlDb2RlID09PSBLZXlzLnJldHVybiB8fFxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5kb3duIHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLnVwIHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLmxlZnQgfHxcbiAgICAgIGtleUNvZGUgPT09IEtleXMucmlnaHQ7XG5cbiAgICBpZiAoaXNBY3Rpb24gJiYgaXNUYXJnZXRDZWxsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XG4gICAgICAgIHR5cGU6ICdrZXlkb3duJyxcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIHJvdzogdGhpcy5yb3csXG4gICAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxuICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2hlY2tib3hDaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgZXZlbnQsXG4gICAgICByb3c6IHRoaXMucm93LFxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnQsXG4gICAgICB0cmVlU3RhdHVzOiAnY29sbGFwc2VkJ1xuICAgIH0pO1xuICB9XG5cbiAgY2FsY1NvcnREaXIoc29ydHM6IGFueVtdKTogYW55IHtcbiAgICBpZiAoIXNvcnRzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc29ydCA9IHNvcnRzLmZpbmQoKHM6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHMucHJvcCA9PT0gdGhpcy5jb2x1bW4ucHJvcDtcbiAgICB9KTtcblxuICAgIGlmIChzb3J0KSB7XG4gICAgICByZXR1cm4gc29ydC5kaXI7XG4gICAgfVxuICB9XG5cbiAgc3RyaXBIdG1sKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFodG1sLnJlcGxhY2UpIHtcbiAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC88XFwvP1tePl0rKD58JCkvZywgJycpO1xuICB9XG5cbiAgb25UcmVlQWN0aW9uKCkge1xuICAgIHRoaXMudHJlZUFjdGlvbi5lbWl0KHRoaXMucm93KTtcbiAgfVxuXG4gIGNhbGNMZWZ0TWFyZ2luKGNvbHVtbjogYW55LCByb3c6IGFueSkge1xuICAgIGNvbnN0IGxldmVsSW5kZW50ID0gY29sdW1uLnRyZWVMZXZlbEluZGVudCAhPSBudWxsID8gY29sdW1uLnRyZWVMZXZlbEluZGVudCA6IDUwO1xuICAgIHJldHVybiBjb2x1bW4uaXNUcmVlQ29sdW1uID8gcm93LmxldmVsICogbGV2ZWxJbmRlbnQgOiAwO1xuICB9XG5cbiAgaGFzVG9TaG93VG9vbFRpcChyb3csIGZpZWxkKSB7XG4gICAgcmV0dXJuIHJvdyAmJiBmaWVsZCAmJiBmaWVsZC50b29sdGlwICYmIGZpZWxkLnRvb2x0aXAubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldFRvb2x0aXBWYWx1ZSh2YWx1ZSwgcm93LCBmaWVsZCkge1xuICAgIGlmIChyb3cgJiYgZmllbGQgJiYgZmllbGQudG9vbHRpcCAmJiBmaWVsZC50b29sdGlwLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiByb3dbYCR7ZmllbGQudG9vbHRpcH1gXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZ2V0SWNvbnMocm93LCBpY29ucykge1xuICAgIGlmIChyb3cgJiYgaWNvbnMpIHtcbiAgICAgIGNvbnN0IGljb25zQXJyYXkgPSBpY29ucy5zcGxpdCgnLicpO1xuICAgICAgcmV0dXJuIGljb25zQXJyYXkubGVuZ3RoID4gMSAmJiByb3dbaWNvbnNBcnJheVswXV0gPyByb3dbaWNvbnNBcnJheVswXV1baWNvbnNBcnJheVsxXV0gfHwgW10gOiByb3dbaWNvbnNdIHx8IFtdO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBzZWxlY3RGaWVsZFZhbHVlKHJvdywgcHJvcCkge1xuICAgIGlmIChyb3cgJiYgcHJvcCkge1xuICAgICAgY29uc3QgcHJvcEFycmF5ID0gcHJvcC5zcGxpdCgnLicpO1xuICAgICAgcmV0dXJuIHByb3BBcnJheS5sZW5ndGggPiAxICYmIHJvd1twcm9wQXJyYXlbMF1dID8gcm93W3Byb3BBcnJheVswXV1bcHJvcEFycmF5WzFdXSA6IHJvd1twcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuICcgJztcbiAgfVxuXG4gIG9uQ2xpY2tSb3dBY3Rpb25CdXR0b24oZXZlbnQsIGZpZWxkLCByb3cpIHtcbiAgICBpZiAoZmllbGQgJiYgcm93KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBmaWVsZC5hY3Rpb24ocm93KTtcbiAgICB9XG4gIH1cblxuICBzYW5hdGl6ZUh0bWwoaHRtbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGh0bWwpIGFzIHN0cmluZztcbiAgfVxuXG4gIGlzRWRpdGFibGUoZmllbGQ6IGFueSwgcm93OiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAoZmllbGQgJiYgcm93KSB7XG4gICAgICBpZiAoIXRoaXMuX2lzRWRpdGFibGVbZmllbGQucHJvcCArIHJvdy5pZF0pIHtcbiAgICAgICAgdGhpcy5faXNFZGl0YWJsZVtmaWVsZC5wcm9wICsgcm93LmlkXSA9IGZpZWxkLmVkaXRhYmxlKHJvdyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5faXNFZGl0YWJsZVtmaWVsZC5wcm9wICsgcm93LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgfVxuXG4gIHVwZGF0ZVNlbGVjdChmaWVsZCwgcm93OiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICByb3dbZmllbGQucHJvcF0gPSBuZXdWYWx1ZTtcbiAgICBpZiAoZmllbGQub25FZGl0KSB7XG4gICAgICBmaWVsZC5vbkVkaXQocm93KTtcbiAgICB9XG4gIH1cblxuICBlZGl0RmllbGQoZmllbGQsIHJvdzogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgZmllbGQub25FZGl0KHsgLi4ucm93LCBbZmllbGQucHJvcF06IG5ld1ZhbHVlIH0pO1xuICB9XG59XG4iXX0=