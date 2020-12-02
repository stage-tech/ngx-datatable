/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, HostBinding, ViewChild, ChangeDetectorRef, Output, EventEmitter, HostListener, ElementRef, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { MouseEvent, KeyboardEvent } from '../../events';
import { SortDirection } from '../../types/sort-direction.type';
import { Keys } from '../../utils/keys';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
export class DataTableBodyCellComponent {
    /**
     * @param {?} element
     * @param {?} cd
     * @param {?} sanitizer
     * @param {?} changeDetectorRef
     */
    constructor(element, cd, sanitizer, changeDetectorRef) {
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
    /**
     * @param {?} rowDetail
     * @return {?}
     */
    set rowDetail(rowDetail) {
        this._rowDetail = rowDetail;
    }
    /**
     * @return {?}
     */
    get rowDetail() {
        return this._rowDetail;
    }
    /**
     * @param {?} group
     * @return {?}
     */
    set group(group) {
        this._group = group;
        this.cellContext.group = group;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get group() {
        return this._group;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set rowHeight(val) {
        this._rowHeight = val;
        this.cellContext.rowHeight = val;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get rowHeight() {
        return this._rowHeight;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set isSelected(val) {
        this._isSelected = val;
        this.cellContext.isSelected = val;
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get isSelected() {
        return this._isSelected;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set expanded(val) {
        this._expanded = val;
        this.cellContext.expanded = val;
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set rowIndex(val) {
        this._rowIndex = val;
        this.cellContext.rowIndex = val;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get rowIndex() {
        return this._rowIndex;
    }
    /**
     * @param {?} column
     * @return {?}
     */
    set column(column) {
        this._column = column;
        this.cellContext.column = column;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get column() {
        return this._column;
    }
    /**
     * @param {?} row
     * @return {?}
     */
    set row(row) {
        this._row = row;
        this.cellContext.row = row;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get row() {
        return this._row;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set sorts(val) {
        this._sorts = val;
        this.calcSortDir = this.calcSortDir(val);
    }
    /**
     * @return {?}
     */
    get sorts() {
        return this._sorts;
    }
    /**
     * @param {?} status
     * @return {?}
     */
    set treeStatus(status) {
        if (status !== 'collapsed' && status !== 'expanded' && status !== 'loading' && status !== 'disabled') {
            this._treeStatus = 'collapsed';
        }
        else {
            this._treeStatus = status;
        }
        this.cellContext.treeStatus = this._treeStatus;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get treeStatus() {
        return this._treeStatus;
    }
    /**
     * @return {?}
     */
    get columnCssClasses() {
        /** @type {?} */
        let cls = 'datatable-body-cell';
        if (this.column.cellClass) {
            if (typeof this.column.cellClass === 'string') {
                cls += ' ' + this.column.cellClass;
            }
            else if (typeof this.column.cellClass === 'function') {
                /** @type {?} */
                const res = this.column.cellClass({
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
                    const keys = Object.keys(res);
                    for (const k of keys) {
                        if (res[k] === true) {
                            cls += ` ${k}`;
                        }
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
    }
    /**
     * @return {?}
     */
    get width() {
        return this.column.width;
    }
    /**
     * @return {?}
     */
    get minWidth() {
        return this.column.minWidth;
    }
    /**
     * @return {?}
     */
    get maxWidth() {
        return this.column.maxWidth;
    }
    /**
     * @return {?}
     */
    get height() {
        /** @type {?} */
        const height = this.rowHeight;
        if (isNaN(height)) {
            return height;
        }
        return height + 'px';
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.checkValueUpdates();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.cellTemplate) {
            this.cellTemplate.clear();
        }
    }
    /**
     * @return {?}
     */
    checkValueUpdates() {
        /** @type {?} */
        let value = '';
        if (!this.row || !this.column) {
            value = '';
        }
        else {
            /** @type {?} */
            const val = this.column.$$valueGetter(this.row, this.column.prop);
            /** @type {?} */
            const userPipe = this.column.pipe;
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
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.isFocused = true;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.isFocused = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this.activate.emit({
            type: 'click',
            event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    middleclickEvent(event) {
        if (event.which === 2) {
            this.activate.emit({
                type: 'middleclick',
                event,
                row: this.row,
                group: this.group,
                rowHeight: this.rowHeight,
                column: this.column,
                value: this.value,
                cellElement: this._element
            });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDblClick(event) {
        this.activate.emit({
            type: 'dblclick',
            event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */
        const isTargetCell = event.target === this._element;
        /** @type {?} */
        const isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetCell) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event,
                row: this.row,
                group: this.group,
                rowHeight: this.rowHeight,
                column: this.column,
                value: this.value,
                cellElement: this._element
            });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onCheckboxChange(event) {
        this.activate.emit({
            type: 'checkbox',
            event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element,
            treeStatus: 'collapsed'
        });
    }
    /**
     * @param {?} sorts
     * @return {?}
     */
    calcSortDir(sorts) {
        if (!sorts) {
            return;
        }
        /** @type {?} */
        const sort = sorts.find((/**
         * @param {?} s
         * @return {?}
         */
        (s) => {
            return s.prop === this.column.prop;
        }));
        if (sort) {
            return sort.dir;
        }
    }
    /**
     * @param {?} html
     * @return {?}
     */
    stripHtml(html) {
        if (!html.replace) {
            return html;
        }
        return html.replace(/<\/?[^>]+(>|$)/g, '');
    }
    /**
     * @return {?}
     */
    onTreeAction() {
        this.treeAction.emit(this.row);
    }
    /**
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    calcLeftMargin(column, row) {
        /** @type {?} */
        const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
        return column.isTreeColumn ? row.level * levelIndent : 0;
    }
    /**
     * @param {?} row
     * @param {?} field
     * @return {?}
     */
    hasToShowToolTip(row, field) {
        return row && field && field.tooltip && field.tooltip.length > 0;
    }
    /**
     * @param {?} value
     * @param {?} row
     * @param {?} field
     * @return {?}
     */
    getTooltipValue(value, row, field) {
        if (row && field && field.tooltip && field.tooltip.length > 0) {
            return row[`${field.tooltip}`] || field.tooltip;
        }
        return value;
    }
    /**
     * @param {?} row
     * @param {?} icons
     * @return {?}
     */
    getIcons(row, icons) {
        if (row && icons) {
            /** @type {?} */
            const iconsArray = icons.split('.');
            return iconsArray.length > 1 && row[iconsArray[0]] ? row[iconsArray[0]][iconsArray[1]] || [] : row[icons] || [];
        }
        return null;
    }
    /**
     * @param {?} row
     * @param {?} prop
     * @return {?}
     */
    selectFieldValue(row, prop) {
        if (row && prop) {
            /** @type {?} */
            const propArray = prop.split('.');
            return propArray.length > 1 && row[propArray[0]] ? row[propArray[0]][propArray[1]] : row[prop];
        }
        return ' ';
    }
    /**
     * @param {?} event
     * @param {?} field
     * @param {?} row
     * @return {?}
     */
    onClickRowActionButton(event, field, row) {
        if (field && row) {
            event.preventDefault();
            event.stopPropagation();
            field.action(row);
        }
    }
    /**
     * @param {?} html
     * @return {?}
     */
    sanatizeHtml(html) {
        return (/** @type {?} */ (this.sanitizer.bypassSecurityTrustHtml(html)));
    }
    /**
     * @param {?} field
     * @param {?} row
     * @return {?}
     */
    isEditable(field, row) {
        if (field && row) {
            if (!this._isEditable[field.prop + row.id]) {
                this._isEditable[field.prop + row.id] = field.editable(row);
            }
            return this._isEditable[field.prop + row.id];
        }
        return of(false);
    }
    /**
     * @param {?} field
     * @param {?} row
     * @param {?} newValue
     * @return {?}
     */
    updateSelect(field, row, newValue) {
        if (row[field.prop] !== newValue) {
            row[field.prop] = newValue;
            if (field.onEdit) {
                field.onEdit(row);
            }
        }
    }
    /**
     * @param {?} field
     * @param {?} row
     * @param {?} newValue
     * @return {?}
     */
    editField(field, row, newValue) {
        field.onEdit(Object.assign({}, row, { [field.prop]: newValue }));
    }
    /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    toggleExpandRow(row, event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.rowDetail) {
            this.rowDetail.toggleExpandRow(row);
        }
    }
    /**
     * @param {?} row
     * @param {?} action
     * @param {?} event
     * @return {?}
     */
    onClickField(row, action, event) {
        if (row && action) {
            event.preventDefault();
            event.stopPropagation();
            action(row);
        }
    }
}
DataTableBodyCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-body-cell',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div
      class="datatable-body-cell-label"
      style="display: flex; align-items:center; height: 100%;"
      [style.margin-left.px]="calcLeftMargin(column, row)"
    >
      <a
        *ngIf="column?.prop === 'ice-expandable' && row?.detail?.length > 0"
        href="javascript:void(0)"
        [class.datatable-icon-down]="!expanded"
        [class.datatable-icon-up]="expanded"
        style="font-size: 18px; display: flex; align-items: center;"
        title="Expand/Collapse Row"
        (dblclick)="toggleExpandRow(row, $event)"
        (click)="toggleExpandRow(row, $event)"
      >
      </a>
      <ng-container *ngIf="column?.prop !== 'ice-expandable'">
        <label
          *ngIf="column.checkboxable && (!displayCheck || displayCheck(row, column, value))"
          class="datatable-checkbox"
        >
          <input type="checkbox" [checked]="isSelected" (click)="onCheckboxChange($event)" />
        </label>
        <ng-container *ngIf="column.isTreeColumn">
          <button
            *ngIf="!column.treeToggleTemplate"
            class="datatable-tree-button"
            [disabled]="treeStatus === 'disabled'"
            (click)="onTreeAction()"
          >
            <span>
              <i *ngIf="treeStatus === 'loading'" class="icon datatable-icon-collapse"></i>
              <i *ngIf="treeStatus === 'collapsed'" class="icon datatable-icon-up"></i>
              <i *ngIf="treeStatus === 'expanded' || treeStatus === 'disabled'" class="icon datatable-icon-down"></i>
            </span>
          </button>
          <ng-template
            *ngIf="column.treeToggleTemplate"
            [ngTemplateOutlet]="column.treeToggleTemplate"
            [ngTemplateOutletContext]="{ cellContext: cellContext }"
          >
          </ng-template>
        </ng-container>

        <div
          *ngIf="column.icons && getIcons(row, column.icons)"
          style="display: flex; flex-direction: column; margin-right: 10px;"
        >
          <mat-icon
            *ngFor="let i of getIcons(row, column.icons)"
            [innerHTML]="i.icon"
            [matTooltip]="i.text"
            (click)="
              !!i.onClickAction
                ? onClickField(row, column.onClickAction || column.action, $event)
                : i.action && i.action(row)
            "
            [style.cursor]="i.action ? 'pointer' : 'auto'"
            class="{{ i.class }} mat-icon material-icons ice-ml-10"
          ></mat-icon>
        </div>

        <mat-icon
          *ngIf="
            column.iconCustomTooltipHtmlText &&
            column.prop &&
            selectFieldValue(row, column.iconCustomTooltipHtmlText) as customHtml
          "
          iceCustomHtmlToolTip
          [iceTooltipHtmlText]="sanatizeHtml(customHtml)"
          [duration]="1500"
          class="material-icons"
          [ngClass]="column.prop && selectFieldValue(row, column.iconColor)"
          >priority_high</mat-icon
        >

        <mat-icon
          *ngIf="column.prop && row[column.prop.toString() + 'InfoTooltip']"
          [matTooltip]="column.prop && row[column.prop.toString() + 'InfoTooltip']"
          class="mat-icon material-icons"
          >info</mat-icon
        >

        <mat-icon
          *ngIf="column.prop && row[column.prop.toString() + 'Excluded']"
          [matTooltip]="column.prop && row[column.prop.toString() + 'Excluded']"
          class="mat-icon material-icons"
          >block</mat-icon
        >

        <span
          *ngIf="
            !column.actionButtonIcon &&
            !column.cellTemplate &&
            (!column.selectOptions || (column.hideIfEmpty && column.hideIfEmpty(row))) &&
            (!column.editable || !(isEditable(column, row) | async))
          "
          class="ice-data-table-row"
          iceCustomHtmlToolTip
          [iceTooltipHtmlText]="getTooltipValue(value, row, column)"
          [showToolTipOnTextOverflow]="true"
          [showToolTip]="hasToShowToolTip(row, column)"
          [innerHTML]="value"
          (click)="onClickField(row, column.onClickAction || column.action, $event)"
        ></span>

        <button
          *ngIf="column.actionButtonIcon && !(column.hideActionButton && column.hideActionButton(row) | async)"
          mat-icon-button
          [matTooltip]="column.actionButtonTooltip"
          (click)="onClickRowActionButton($event, column, row)"
        >
          <mat-icon class="mat-icon material-icons">{{ column.actionButtonIcon }}</mat-icon>
        </button>

        <ice-datatable-row-select
          style="width:100%;"
          [ngClass]="column.cellClass"
          (update)="updateSelect(column, row, $event)"
          [options]="column.selectOptions(row)"
          [value]="value"
          [defaultValue]="column.defaultValue"
          [selectDisabled]="column.disabled"
          *ngIf="column.selectOptions && !(column.hideIfEmpty && column.hideIfEmpty(row))"
        ></ice-datatable-row-select>

        <ng-container *ngIf="!column.selectOptions && (column.editable && isEditable(column, row) | async)">
          <mat-icon class="mat-icon material-icons" *ngIf="!column.hideEditIcon">edit</mat-icon>
          <ice-editable-text
            [ngClass]="column.cellClass"
            (update)="editField(column, row, $event)"
            [errorText]="selectFieldValue(row, column.errorMessageField)"
            [value]="value"
          >
            {{ value }}
          </ice-editable-text>
        </ng-container>

        <ng-template
          #cellTemplate
          *ngIf="column.cellTemplate"
          [ngTemplateOutlet]="column.cellTemplate"
          [ngTemplateOutletContext]="cellContext"
        >
        </ng-template>
      </ng-container>
    </div>
  `
            }] }
];
/** @nocollapse */
DataTableBodyCellComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9ib2R5LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsZ0JBQWdCLEVBR2hCLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBNkp0QyxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7O0lBd05yQyxZQUNFLE9BQW1CLEVBQ1gsRUFBcUIsRUFDckIsU0FBdUIsRUFDdkIsaUJBQW9DO1FBRnBDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQTlHcEMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXNFN0QsZ0JBQVcsR0FBeUMsRUFBRSxDQUFDO1FBSXZELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENB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Q0FBdUI7O0lBQ3ZCLCtDQUFrQjs7SUFDbEIsd0RBQXNEOztJQUN0RCxnREFBb0Q7O0lBRXBELGlEQVlFOzs7OztJQUVGLGlEQUE2Qjs7Ozs7SUFDN0IsNENBQXNCOzs7OztJQUN0Qiw2Q0FBNkI7Ozs7O0lBQzdCLDBDQUFrQjs7Ozs7SUFDbEIsZ0RBQXdCOzs7OztJQUN4Qiw0Q0FBb0I7Ozs7O0lBQ3BCLGdEQUEyQjs7Ozs7SUFDM0IsK0NBQTBCOzs7OztJQUMxQiwrQ0FBMkI7Ozs7O0lBQzNCLDhDQUFzQjs7Ozs7SUFDdEIsaURBQWdDOzs7OztJQUk5Qix3Q0FBNkI7Ozs7O0lBQzdCLCtDQUErQjs7Ozs7SUFDL0IsdURBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgUGlwZVRyYW5zZm9ybSxcbiAgSG9zdEJpbmRpbmcsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE9uRGVzdHJveSxcbiAgRG9DaGVjayxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xuaW1wb3J0IHsgTW91c2VFdmVudCwgS2V5Ym9hcmRFdmVudCB9IGZyb20gJy4uLy4uL2V2ZW50cyc7XG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vdHlwZXMvc29ydC1kaXJlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBLZXlzIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5cyc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCB0eXBlIFRyZWVTdGF0dXMgPSAnY29sbGFwc2VkJyB8ICdleHBhbmRlZCcgfCAnbG9hZGluZycgfCAnZGlzYWJsZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtYm9keS1jZWxsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJkYXRhdGFibGUtYm9keS1jZWxsLWxhYmVsXCJcbiAgICAgIHN0eWxlPVwiZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBoZWlnaHQ6IDEwMCU7XCJcbiAgICAgIFtzdHlsZS5tYXJnaW4tbGVmdC5weF09XCJjYWxjTGVmdE1hcmdpbihjb2x1bW4sIHJvdylcIlxuICAgID5cbiAgICAgIDxhXG4gICAgICAgICpuZ0lmPVwiY29sdW1uPy5wcm9wID09PSAnaWNlLWV4cGFuZGFibGUnICYmIHJvdz8uZGV0YWlsPy5sZW5ndGggPiAwXCJcbiAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgIFtjbGFzcy5kYXRhdGFibGUtaWNvbi1kb3duXT1cIiFleHBhbmRlZFwiXG4gICAgICAgIFtjbGFzcy5kYXRhdGFibGUtaWNvbi11cF09XCJleHBhbmRlZFwiXG4gICAgICAgIHN0eWxlPVwiZm9udC1zaXplOiAxOHB4OyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyO1wiXG4gICAgICAgIHRpdGxlPVwiRXhwYW5kL0NvbGxhcHNlIFJvd1wiXG4gICAgICAgIChkYmxjbGljayk9XCJ0b2dnbGVFeHBhbmRSb3cocm93LCAkZXZlbnQpXCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZFJvdyhyb3csICRldmVudClcIlxuICAgICAgPlxuICAgICAgPC9hPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbj8ucHJvcCAhPT0gJ2ljZS1leHBhbmRhYmxlJ1wiPlxuICAgICAgICA8bGFiZWxcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5jaGVja2JveGFibGUgJiYgKCFkaXNwbGF5Q2hlY2sgfHwgZGlzcGxheUNoZWNrKHJvdywgY29sdW1uLCB2YWx1ZSkpXCJcbiAgICAgICAgICBjbGFzcz1cImRhdGF0YWJsZS1jaGVja2JveFwiXG4gICAgICAgID5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZFwiIChjbGljayk9XCJvbkNoZWNrYm94Q2hhbmdlKCRldmVudClcIiAvPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmlzVHJlZUNvbHVtblwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICpuZ0lmPVwiIWNvbHVtbi50cmVlVG9nZ2xlVGVtcGxhdGVcIlxuICAgICAgICAgICAgY2xhc3M9XCJkYXRhdGFibGUtdHJlZS1idXR0b25cIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cInRyZWVTdGF0dXMgPT09ICdkaXNhYmxlZCdcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uVHJlZUFjdGlvbigpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgPGkgKm5nSWY9XCJ0cmVlU3RhdHVzID09PSAnbG9hZGluZydcIiBjbGFzcz1cImljb24gZGF0YXRhYmxlLWljb24tY29sbGFwc2VcIj48L2k+XG4gICAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2NvbGxhcHNlZCdcIiBjbGFzcz1cImljb24gZGF0YXRhYmxlLWljb24tdXBcIj48L2k+XG4gICAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2V4cGFuZGVkJyB8fCB0cmVlU3RhdHVzID09PSAnZGlzYWJsZWQnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLWRvd25cIj48L2k+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICAqbmdJZj1cImNvbHVtbi50cmVlVG9nZ2xlVGVtcGxhdGVcIlxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLnRyZWVUb2dnbGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBjZWxsQ29udGV4dDogY2VsbENvbnRleHQgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5pY29ucyAmJiBnZXRJY29ucyhyb3csIGNvbHVtbi5pY29ucylcIlxuICAgICAgICAgIHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgbWFyZ2luLXJpZ2h0OiAxMHB4O1wiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpIG9mIGdldEljb25zKHJvdywgY29sdW1uLmljb25zKVwiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cImkuaWNvblwiXG4gICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpLnRleHRcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIlxuICAgICAgICAgICAgICAhIWkub25DbGlja0FjdGlvblxuICAgICAgICAgICAgICAgID8gb25DbGlja0ZpZWxkKHJvdywgY29sdW1uLm9uQ2xpY2tBY3Rpb24gfHwgY29sdW1uLmFjdGlvbiwgJGV2ZW50KVxuICAgICAgICAgICAgICAgIDogaS5hY3Rpb24gJiYgaS5hY3Rpb24ocm93KVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIFtzdHlsZS5jdXJzb3JdPVwiaS5hY3Rpb24gPyAncG9pbnRlcicgOiAnYXV0bydcIlxuICAgICAgICAgICAgY2xhc3M9XCJ7eyBpLmNsYXNzIH19IG1hdC1pY29uIG1hdGVyaWFsLWljb25zIGljZS1tbC0xMFwiXG4gICAgICAgICAgPjwvbWF0LWljb24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICBjb2x1bW4uaWNvbkN1c3RvbVRvb2x0aXBIdG1sVGV4dCAmJlxuICAgICAgICAgICAgY29sdW1uLnByb3AgJiZcbiAgICAgICAgICAgIHNlbGVjdEZpZWxkVmFsdWUocm93LCBjb2x1bW4uaWNvbkN1c3RvbVRvb2x0aXBIdG1sVGV4dCkgYXMgY3VzdG9tSHRtbFxuICAgICAgICAgIFwiXG4gICAgICAgICAgaWNlQ3VzdG9tSHRtbFRvb2xUaXBcbiAgICAgICAgICBbaWNlVG9vbHRpcEh0bWxUZXh0XT1cInNhbmF0aXplSHRtbChjdXN0b21IdG1sKVwiXG4gICAgICAgICAgW2R1cmF0aW9uXT1cIjE1MDBcIlxuICAgICAgICAgIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cImNvbHVtbi5wcm9wICYmIHNlbGVjdEZpZWxkVmFsdWUocm93LCBjb2x1bW4uaWNvbkNvbG9yKVwiXG4gICAgICAgICAgPnByaW9yaXR5X2hpZ2g8L21hdC1pY29uXG4gICAgICAgID5cblxuICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0luZm9Ub29sdGlwJ11cIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0luZm9Ub29sdGlwJ11cIlxuICAgICAgICAgIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIlxuICAgICAgICAgID5pbmZvPC9tYXQtaWNvblxuICAgICAgICA+XG5cbiAgICAgICAgPG1hdC1pY29uXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW4ucHJvcCAmJiByb3dbY29sdW1uLnByb3AudG9TdHJpbmcoKSArICdFeGNsdWRlZCddXCJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJjb2x1bW4ucHJvcCAmJiByb3dbY29sdW1uLnByb3AudG9TdHJpbmcoKSArICdFeGNsdWRlZCddXCJcbiAgICAgICAgICBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCJcbiAgICAgICAgICA+YmxvY2s8L21hdC1pY29uXG4gICAgICAgID5cblxuICAgICAgICA8c3BhblxuICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAhY29sdW1uLmFjdGlvbkJ1dHRvbkljb24gJiZcbiAgICAgICAgICAgICFjb2x1bW4uY2VsbFRlbXBsYXRlICYmXG4gICAgICAgICAgICAoIWNvbHVtbi5zZWxlY3RPcHRpb25zIHx8IChjb2x1bW4uaGlkZUlmRW1wdHkgJiYgY29sdW1uLmhpZGVJZkVtcHR5KHJvdykpKSAmJlxuICAgICAgICAgICAgKCFjb2x1bW4uZWRpdGFibGUgfHwgIShpc0VkaXRhYmxlKGNvbHVtbiwgcm93KSB8IGFzeW5jKSlcbiAgICAgICAgICBcIlxuICAgICAgICAgIGNsYXNzPVwiaWNlLWRhdGEtdGFibGUtcm93XCJcbiAgICAgICAgICBpY2VDdXN0b21IdG1sVG9vbFRpcFxuICAgICAgICAgIFtpY2VUb29sdGlwSHRtbFRleHRdPVwiZ2V0VG9vbHRpcFZhbHVlKHZhbHVlLCByb3csIGNvbHVtbilcIlxuICAgICAgICAgIFtzaG93VG9vbFRpcE9uVGV4dE92ZXJmbG93XT1cInRydWVcIlxuICAgICAgICAgIFtzaG93VG9vbFRpcF09XCJoYXNUb1Nob3dUb29sVGlwKHJvdywgY29sdW1uKVwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJ2YWx1ZVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tGaWVsZChyb3csIGNvbHVtbi5vbkNsaWNrQWN0aW9uIHx8IGNvbHVtbi5hY3Rpb24sICRldmVudClcIlxuICAgICAgICA+PC9zcGFuPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5hY3Rpb25CdXR0b25JY29uICYmICEoY29sdW1uLmhpZGVBY3Rpb25CdXR0b24gJiYgY29sdW1uLmhpZGVBY3Rpb25CdXR0b24ocm93KSB8IGFzeW5jKVwiXG4gICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLmFjdGlvbkJ1dHRvblRvb2x0aXBcIlxuICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrUm93QWN0aW9uQnV0dG9uKCRldmVudCwgY29sdW1uLCByb3cpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCI+e3sgY29sdW1uLmFjdGlvbkJ1dHRvbkljb24gfX08L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8aWNlLWRhdGF0YWJsZS1yb3ctc2VsZWN0XG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLmNlbGxDbGFzc1wiXG4gICAgICAgICAgKHVwZGF0ZSk9XCJ1cGRhdGVTZWxlY3QoY29sdW1uLCByb3csICRldmVudClcIlxuICAgICAgICAgIFtvcHRpb25zXT1cImNvbHVtbi5zZWxlY3RPcHRpb25zKHJvdylcIlxuICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgW2RlZmF1bHRWYWx1ZV09XCJjb2x1bW4uZGVmYXVsdFZhbHVlXCJcbiAgICAgICAgICBbc2VsZWN0RGlzYWJsZWRdPVwiY29sdW1uLmRpc2FibGVkXCJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5zZWxlY3RPcHRpb25zICYmICEoY29sdW1uLmhpZGVJZkVtcHR5ICYmIGNvbHVtbi5oaWRlSWZFbXB0eShyb3cpKVwiXG4gICAgICAgID48L2ljZS1kYXRhdGFibGUtcm93LXNlbGVjdD5cblxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNvbHVtbi5zZWxlY3RPcHRpb25zICYmIChjb2x1bW4uZWRpdGFibGUgJiYgaXNFZGl0YWJsZShjb2x1bW4sIHJvdykgfCBhc3luYylcIj5cbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaWNvbiBtYXRlcmlhbC1pY29uc1wiICpuZ0lmPVwiIWNvbHVtbi5oaWRlRWRpdEljb25cIj5lZGl0PC9tYXQtaWNvbj5cbiAgICAgICAgICA8aWNlLWVkaXRhYmxlLXRleHRcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImNvbHVtbi5jZWxsQ2xhc3NcIlxuICAgICAgICAgICAgKHVwZGF0ZSk9XCJlZGl0RmllbGQoY29sdW1uLCByb3csICRldmVudClcIlxuICAgICAgICAgICAgW2Vycm9yVGV4dF09XCJzZWxlY3RGaWVsZFZhbHVlKHJvdywgY29sdW1uLmVycm9yTWVzc2FnZUZpZWxkKVwiXG4gICAgICAgICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IHZhbHVlIH19XG4gICAgICAgICAgPC9pY2UtZWRpdGFibGUtdGV4dD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgI2NlbGxUZW1wbGF0ZVxuICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmNlbGxUZW1wbGF0ZVwiXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLmNlbGxUZW1wbGF0ZVwiXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNlbGxDb250ZXh0XCJcbiAgICAgICAgPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlQm9keUNlbGxDb21wb25lbnQgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBkaXNwbGF5Q2hlY2s6IChyb3c6IGFueSwgY29sdW1uPzogVGFibGVDb2x1bW4sIHZhbHVlPzogYW55KSA9PiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHNldCByb3dEZXRhaWwocm93RGV0YWlsOiBhbnkpIHtcbiAgICB0aGlzLl9yb3dEZXRhaWwgPSByb3dEZXRhaWw7XG4gIH1cblxuICBnZXQgcm93RGV0YWlsKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd0RldGFpbDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBncm91cChncm91cDogYW55KSB7XG4gICAgdGhpcy5fZ3JvdXAgPSBncm91cDtcbiAgICB0aGlzLmNlbGxDb250ZXh0Lmdyb3VwID0gZ3JvdXA7XG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgZ3JvdXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHJvd0hlaWdodCh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3Jvd0hlaWdodCA9IHZhbDtcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvd0hlaWdodCA9IHZhbDtcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCByb3dIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd0hlaWdodDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBpc1NlbGVjdGVkKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzU2VsZWN0ZWQgPSB2YWw7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5pc1NlbGVjdGVkID0gdmFsO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNTZWxlY3RlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBleHBhbmRlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9leHBhbmRlZCA9IHZhbDtcbiAgICB0aGlzLmNlbGxDb250ZXh0LmV4cGFuZGVkID0gdmFsO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgZXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHJvd0luZGV4KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcm93SW5kZXggPSB2YWw7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5yb3dJbmRleCA9IHZhbDtcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCByb3dJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9yb3dJbmRleDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBjb2x1bW4oY29sdW1uOiBUYWJsZUNvbHVtbikge1xuICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLmNlbGxDb250ZXh0LmNvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBjb2x1bW4oKTogVGFibGVDb2x1bW4ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW47XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcm93KHJvdzogYW55KSB7XG4gICAgdGhpcy5fcm93ID0gcm93O1xuICAgIHRoaXMuY2VsbENvbnRleHQucm93ID0gcm93O1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHJvdygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9yb3c7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc29ydHModmFsOiBhbnlbXSkge1xuICAgIHRoaXMuX3NvcnRzID0gdmFsO1xuICAgIHRoaXMuY2FsY1NvcnREaXIgPSB0aGlzLmNhbGNTb3J0RGlyKHZhbCk7XG4gIH1cblxuICBnZXQgc29ydHMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9zb3J0cztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB0cmVlU3RhdHVzKHN0YXR1czogVHJlZVN0YXR1cykge1xuICAgIGlmIChzdGF0dXMgIT09ICdjb2xsYXBzZWQnICYmIHN0YXR1cyAhPT0gJ2V4cGFuZGVkJyAmJiBzdGF0dXMgIT09ICdsb2FkaW5nJyAmJiBzdGF0dXMgIT09ICdkaXNhYmxlZCcpIHtcbiAgICAgIHRoaXMuX3RyZWVTdGF0dXMgPSAnY29sbGFwc2VkJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdHJlZVN0YXR1cyA9IHN0YXR1cztcbiAgICB9XG4gICAgdGhpcy5jZWxsQ29udGV4dC50cmVlU3RhdHVzID0gdGhpcy5fdHJlZVN0YXR1cztcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCB0cmVlU3RhdHVzKCk6IFRyZWVTdGF0dXMge1xuICAgIHJldHVybiB0aGlzLl90cmVlU3RhdHVzO1xuICB9XG5cbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdHJlZUFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnY2VsbFRlbXBsYXRlJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgY2VsbFRlbXBsYXRlOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgY29sdW1uQ3NzQ2xhc3NlcygpOiBhbnkge1xuICAgIGxldCBjbHMgPSAnZGF0YXRhYmxlLWJvZHktY2VsbCc7XG4gICAgaWYgKHRoaXMuY29sdW1uLmNlbGxDbGFzcykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5jZWxsQ2xhc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNscyArPSAnICcgKyB0aGlzLmNvbHVtbi5jZWxsQ2xhc3M7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5jZWxsQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5jb2x1bW4uY2VsbENsYXNzKHtcbiAgICAgICAgICByb3c6IHRoaXMucm93LFxuICAgICAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjbHMgKz0gcmVzO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcyk7XG4gICAgICAgICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICAgICAgICAgIGlmIChyZXNba10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY2xzICs9IGAgJHtrfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGhpcy5zb3J0RGlyKSB7XG4gICAgICBjbHMgKz0gJyBzb3J0LWFjdGl2ZSc7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRm9jdXNlZCAmJiAhdGhpcy5jb2x1bW4uaWNvbnMpIHtcbiAgICAgIGNscyArPSAnIGFjdGl2ZSc7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uYXNjKSB7XG4gICAgICBjbHMgKz0gJyBzb3J0LWFzYyc7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uZGVzYykge1xuICAgICAgY2xzICs9ICcgc29ydC1kZXNjJztcbiAgICB9XG4gICAgcmV0dXJuIGNscztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ud2lkdGg7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbldpZHRoLnB4JylcbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1pbldpZHRoO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXhXaWR0aC5weCcpXG4gIGdldCBtYXhXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5tYXhXaWR0aDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JylcbiAgZ2V0IGhlaWdodCgpOiBzdHJpbmcgfCBudW1iZXIge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMucm93SGVpZ2h0O1xuICAgIGlmIChpc05hTihoZWlnaHQpKSB7XG4gICAgICByZXR1cm4gaGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gaGVpZ2h0ICsgJ3B4JztcbiAgfVxuICBfaXNFZGl0YWJsZTogeyBbYTogc3RyaW5nXTogT2JzZXJ2YWJsZTxib29sZWFuPiB9ID0ge307XG4gIHNhbml0aXplZFZhbHVlOiBhbnk7XG4gIHZhbHVlOiBhbnk7XG4gIHNvcnREaXI6IFNvcnREaXJlY3Rpb247XG4gIGlzRm9jdXNlZCA9IGZhbHNlO1xuICBvbkNoZWNrYm94Q2hhbmdlRm4gPSB0aGlzLm9uQ2hlY2tib3hDaGFuZ2UuYmluZCh0aGlzKTtcbiAgYWN0aXZhdGVGbiA9IHRoaXMuYWN0aXZhdGUuZW1pdC5iaW5kKHRoaXMuYWN0aXZhdGUpO1xuXG4gIGNlbGxDb250ZXh0OiBhbnkgPSB7XG4gICAgb25DaGVja2JveENoYW5nZUZuOiB0aGlzLm9uQ2hlY2tib3hDaGFuZ2VGbixcbiAgICBhY3RpdmF0ZUZuOiB0aGlzLmFjdGl2YXRlRm4sXG4gICAgcm93OiB0aGlzLnJvdyxcbiAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXG4gICAgaXNTZWxlY3RlZDogdGhpcy5pc1NlbGVjdGVkLFxuICAgIHJvd0luZGV4OiB0aGlzLnJvd0luZGV4LFxuICAgIHRyZWVTdGF0dXM6IHRoaXMudHJlZVN0YXR1cyxcbiAgICBvblRyZWVBY3Rpb246IHRoaXMub25UcmVlQWN0aW9uLmJpbmQodGhpcylcbiAgfTtcblxuICBwcml2YXRlIF9pc1NlbGVjdGVkOiBib29sZWFuO1xuICBwcml2YXRlIF9zb3J0czogYW55W107XG4gIHByaXZhdGUgX2NvbHVtbjogVGFibGVDb2x1bW47XG4gIHByaXZhdGUgX3JvdzogYW55O1xuICBwcml2YXRlIF9yb3dEZXRhaWw6IGFueTtcbiAgcHJpdmF0ZSBfZ3JvdXA6IGFueTtcbiAgcHJpdmF0ZSBfcm93SGVpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgX3Jvd0luZGV4OiBudW1iZXI7XG4gIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuO1xuICBwcml2YXRlIF9lbGVtZW50OiBhbnk7XG4gIHByaXZhdGUgX3RyZWVTdGF0dXM6IFRyZWVTdGF0dXM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2VsbFRlbXBsYXRlKSB7XG4gICAgICB0aGlzLmNlbGxUZW1wbGF0ZS5jbGVhcigpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrVmFsdWVVcGRhdGVzKCk6IHZvaWQge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLnJvdyB8fCAhdGhpcy5jb2x1bW4pIHtcbiAgICAgIHZhbHVlID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMuY29sdW1uLiQkdmFsdWVHZXR0ZXIodGhpcy5yb3csIHRoaXMuY29sdW1uLnByb3ApO1xuICAgICAgY29uc3QgdXNlclBpcGU6IFBpcGVUcmFuc2Zvcm0gPSB0aGlzLmNvbHVtbi5waXBlO1xuXG4gICAgICBpZiAodXNlclBpcGUpIHtcbiAgICAgICAgdmFsdWUgPSB1c2VyUGlwZS50cmFuc2Zvcm0odmFsKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2VsbENvbnRleHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2FuaXRpemVkVmFsdWUgPSB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdGhpcy5zdHJpcEh0bWwodmFsdWUpIDogdmFsdWU7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgb25Gb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCk6IHZvaWQge1xuICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgdHlwZTogJ2NsaWNrJyxcbiAgICAgIGV2ZW50LFxuICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJywgWyckZXZlbnQnXSlcbiAgbWlkZGxlY2xpY2tFdmVudChldmVudCkge1xuICAgIGlmIChldmVudC53aGljaCA9PT0gMikge1xuICAgICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcbiAgICAgICAgdHlwZTogJ21pZGRsZWNsaWNrJyxcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIHJvdzogdGhpcy5yb3csXG4gICAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxuICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25EYmxDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XG4gICAgICB0eXBlOiAnZGJsY2xpY2snLFxuICAgICAgZXZlbnQsXG4gICAgICByb3c6IHRoaXMucm93LFxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICBjb25zdCBpc1RhcmdldENlbGwgPSBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQ7XG5cbiAgICBjb25zdCBpc0FjdGlvbiA9XG4gICAgICBrZXlDb2RlID09PSBLZXlzLnJldHVybiB8fFxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5kb3duIHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLnVwIHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLmxlZnQgfHxcbiAgICAgIGtleUNvZGUgPT09IEtleXMucmlnaHQ7XG5cbiAgICBpZiAoaXNBY3Rpb24gJiYgaXNUYXJnZXRDZWxsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XG4gICAgICAgIHR5cGU6ICdrZXlkb3duJyxcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIHJvdzogdGhpcy5yb3csXG4gICAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxuICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2hlY2tib3hDaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgZXZlbnQsXG4gICAgICByb3c6IHRoaXMucm93LFxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnQsXG4gICAgICB0cmVlU3RhdHVzOiAnY29sbGFwc2VkJ1xuICAgIH0pO1xuICB9XG5cbiAgY2FsY1NvcnREaXIoc29ydHM6IGFueVtdKTogYW55IHtcbiAgICBpZiAoIXNvcnRzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc29ydCA9IHNvcnRzLmZpbmQoKHM6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHMucHJvcCA9PT0gdGhpcy5jb2x1bW4ucHJvcDtcbiAgICB9KTtcblxuICAgIGlmIChzb3J0KSB7XG4gICAgICByZXR1cm4gc29ydC5kaXI7XG4gICAgfVxuICB9XG5cbiAgc3RyaXBIdG1sKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFodG1sLnJlcGxhY2UpIHtcbiAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC88XFwvP1tePl0rKD58JCkvZywgJycpO1xuICB9XG5cbiAgb25UcmVlQWN0aW9uKCkge1xuICAgIHRoaXMudHJlZUFjdGlvbi5lbWl0KHRoaXMucm93KTtcbiAgfVxuXG4gIGNhbGNMZWZ0TWFyZ2luKGNvbHVtbjogYW55LCByb3c6IGFueSkge1xuICAgIGNvbnN0IGxldmVsSW5kZW50ID0gY29sdW1uLnRyZWVMZXZlbEluZGVudCAhPSBudWxsID8gY29sdW1uLnRyZWVMZXZlbEluZGVudCA6IDUwO1xuICAgIHJldHVybiBjb2x1bW4uaXNUcmVlQ29sdW1uID8gcm93LmxldmVsICogbGV2ZWxJbmRlbnQgOiAwO1xuICB9XG5cbiAgaGFzVG9TaG93VG9vbFRpcChyb3csIGZpZWxkKSB7XG4gICAgcmV0dXJuIHJvdyAmJiBmaWVsZCAmJiBmaWVsZC50b29sdGlwICYmIGZpZWxkLnRvb2x0aXAubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldFRvb2x0aXBWYWx1ZSh2YWx1ZSwgcm93LCBmaWVsZCkge1xuICAgIGlmIChyb3cgJiYgZmllbGQgJiYgZmllbGQudG9vbHRpcCAmJiBmaWVsZC50b29sdGlwLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiByb3dbYCR7ZmllbGQudG9vbHRpcH1gXSB8fCBmaWVsZC50b29sdGlwO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBnZXRJY29ucyhyb3csIGljb25zKSB7XG4gICAgaWYgKHJvdyAmJiBpY29ucykge1xuICAgICAgY29uc3QgaWNvbnNBcnJheSA9IGljb25zLnNwbGl0KCcuJyk7XG4gICAgICByZXR1cm4gaWNvbnNBcnJheS5sZW5ndGggPiAxICYmIHJvd1tpY29uc0FycmF5WzBdXSA/IHJvd1tpY29uc0FycmF5WzBdXVtpY29uc0FycmF5WzFdXSB8fCBbXSA6IHJvd1tpY29uc10gfHwgW107XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2VsZWN0RmllbGRWYWx1ZShyb3csIHByb3ApIHtcbiAgICBpZiAocm93ICYmIHByb3ApIHtcbiAgICAgIGNvbnN0IHByb3BBcnJheSA9IHByb3Auc3BsaXQoJy4nKTtcbiAgICAgIHJldHVybiBwcm9wQXJyYXkubGVuZ3RoID4gMSAmJiByb3dbcHJvcEFycmF5WzBdXSA/IHJvd1twcm9wQXJyYXlbMF1dW3Byb3BBcnJheVsxXV0gOiByb3dbcHJvcF07XG4gICAgfVxuICAgIHJldHVybiAnICc7XG4gIH1cblxuICBvbkNsaWNrUm93QWN0aW9uQnV0dG9uKGV2ZW50LCBmaWVsZCwgcm93KSB7XG4gICAgaWYgKGZpZWxkICYmIHJvdykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZmllbGQuYWN0aW9uKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgc2FuYXRpemVIdG1sKGh0bWw6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sKSBhcyBzdHJpbmc7XG4gIH1cblxuICBpc0VkaXRhYmxlKGZpZWxkOiBhbnksIHJvdzogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgaWYgKGZpZWxkICYmIHJvdykge1xuICAgICAgaWYgKCF0aGlzLl9pc0VkaXRhYmxlW2ZpZWxkLnByb3AgKyByb3cuaWRdKSB7XG4gICAgICAgIHRoaXMuX2lzRWRpdGFibGVbZmllbGQucHJvcCArIHJvdy5pZF0gPSBmaWVsZC5lZGl0YWJsZShyb3cpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2lzRWRpdGFibGVbZmllbGQucHJvcCArIHJvdy5pZF07XG4gICAgfVxuICAgIHJldHVybiBvZihmYWxzZSk7XG4gIH1cblxuICB1cGRhdGVTZWxlY3QoZmllbGQsIHJvdzogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgaWYgKHJvd1tmaWVsZC5wcm9wXSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHJvd1tmaWVsZC5wcm9wXSA9IG5ld1ZhbHVlO1xuICAgICAgaWYgKGZpZWxkLm9uRWRpdCkge1xuICAgICAgICBmaWVsZC5vbkVkaXQocm93KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlZGl0RmllbGQoZmllbGQsIHJvdzogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgZmllbGQub25FZGl0KHsgLi4ucm93LCBbZmllbGQucHJvcF06IG5ld1ZhbHVlIH0pO1xuICB9XG5cbiAgdG9nZ2xlRXhwYW5kUm93KHJvdywgZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLnJvd0RldGFpbCkge1xuICAgICAgdGhpcy5yb3dEZXRhaWwudG9nZ2xlRXhwYW5kUm93KHJvdyk7XG4gICAgfVxuICB9XG5cbiAgb25DbGlja0ZpZWxkKHJvdywgYWN0aW9uLCBldmVudCkge1xuICAgIGlmIChyb3cgJiYgYWN0aW9uKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGFjdGlvbihyb3cpO1xuICAgIH1cbiAgfVxufVxuIl19