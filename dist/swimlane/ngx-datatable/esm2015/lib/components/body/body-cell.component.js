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
     */
    constructor(element, cd, sanitizer) {
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
            return row[`${field.tooltip}`];
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
        return [];
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
        row[field.prop] = newValue;
        if (field.onEdit) {
            field.onEdit(row);
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

        <div *ngIf="column.icons as icons" style="display: flex; flex-direction: column; margin-right: 10px;">
          <mat-icon
            *ngFor="let i of getIcons(row, icons)"
            [innerHTML]="i.icon"
            [matTooltip]="i.text"
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

        <h4
          *ngIf="
            !column.actionButtonIcon &&
            !column.cellTemplate &&
            !column.selectOptions &&
            (!column.editable || !(isEditable(column, row) | async))
          "
          class="ice-data-table-row"
          iceCustomHtmlToolTip
          [iceTooltipHtmlText]="getTooltipValue(value, row, column)"
          [showToolTipOnTextOverflow]="true"
          [showToolTip]="hasToShowToolTip(row, column)"
          [innerHTML]="value"
          (click)="onClickField(row, column.onClickAction, $event)"
        ></h4>

        <button
          *ngIf="column.actionButtonIcon && !(column.hideActionButton && column.hideActionButton(row) | async)"
          mat-icon-button
          [matTooltip]="column.actionButtonTooltip"
          (click)="onClickRowActionButton($event, column, row)"
        >
          <mat-icon class="mat-icon material-icons">{{ column.actionButtonIcon }}</mat-icon>
        </button>

        <ice-datatable-row-select
          style="margin-top: 18px"
          [options]="column.selectOptions"
          [ngClass]="column.cellClass"
          (update)="updateSelect(column, row, $event)"
          [value]="value"
          [defaultValue]="column.defaultValue"
          [selectDisabled]="column.disabled"
          *ngIf="column.selectOptions && !(column.hideIfEmpty && column.disabled && value === '')"
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
    { type: DomSanitizer }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9ib2R5LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsZ0JBQWdCLEVBR2hCLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBb0p0QyxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7SUF5TnJDLFlBQVksT0FBbUIsRUFBVSxFQUFxQixFQUFVLFNBQXVCO1FBQXRELE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYztRQTNHckYsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXVFN0QsZ0JBQVcsR0FBeUMsRUFBRSxDQUFDO1FBSXZELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxlQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwRCxnQkFBVyxHQUFRO1lBQ2pCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDM0MsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQzNDLENBQUM7UUFlQSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUF4TkQsSUFBYSxTQUFTLENBQUMsU0FBYztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRUQsSUFBYSxLQUFLLENBQUMsS0FBVTtRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsSUFBYSxTQUFTLENBQUMsR0FBVztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRUQsSUFBYSxVQUFVLENBQUMsR0FBWTtRQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDbEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQsSUFBYSxRQUFRLENBQUMsR0FBWTtRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDaEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsSUFBYSxRQUFRLENBQUMsR0FBVztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsSUFBYSxNQUFNLENBQUMsTUFBbUI7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELElBQWEsR0FBRyxDQUFDLEdBQVE7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDOzs7OztJQUVELElBQWEsS0FBSyxDQUFDLEdBQVU7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFRCxJQUFhLFVBQVUsQ0FBQyxNQUFrQjtRQUN4QyxJQUFJLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxVQUFVLEVBQUU7WUFDcEcsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7OztJQVNELElBQ0ksZ0JBQWdCOztZQUNkLEdBQUcsR0FBRyxxQkFBcUI7UUFDL0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUN6QixJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUM3QyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQ3BDO2lCQUFNLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7O3NCQUNoRCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQ2hDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztvQkFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7aUJBQzFCLENBQUM7Z0JBRUYsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7b0JBQzNCLEdBQUcsSUFBSSxHQUFHLENBQUM7aUJBQ1o7cUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7OzBCQUM1QixJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQzdCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO3dCQUNwQixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7NEJBQ25CLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO3lCQUNoQjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixHQUFHLElBQUksY0FBYyxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLEdBQUcsSUFBSSxTQUFTLENBQUM7U0FDbEI7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssYUFBYSxDQUFDLEdBQUcsRUFBRTtZQUN0QyxHQUFHLElBQUksV0FBVyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDdkMsR0FBRyxJQUFJLFlBQVksQ0FBQztTQUNyQjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7OztJQUVELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELElBQ0ksTUFBTTs7Y0FDRixNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVM7UUFDN0IsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakIsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUNELE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDOzs7O0lBdUNELFNBQVM7UUFDUCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQUVELGlCQUFpQjs7WUFDWCxLQUFLLEdBQUcsRUFBRTtRQUVkLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM3QixLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ1o7YUFBTTs7a0JBQ0MsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7O2tCQUMzRCxRQUFRLEdBQWtCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUVoRCxJQUFJLFFBQVEsRUFBRTtnQkFDWixLQUFLLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQztpQkFBTSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzlCLEtBQUssR0FBRyxHQUFHLENBQUM7YUFDYjtTQUNGO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtZQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUM1RixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7OztJQUdELE9BQU87UUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDOzs7O0lBR0QsTUFBTTtRQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBR0QsT0FBTyxDQUFDLEtBQWlCO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSztZQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFHRCxnQkFBZ0IsQ0FBQyxLQUFLO1FBQ3BCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksRUFBRSxhQUFhO2dCQUNuQixLQUFLO2dCQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztnQkFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUTthQUMzQixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7O0lBR0QsVUFBVSxDQUFDLEtBQWlCO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUksRUFBRSxVQUFVO1lBQ2hCLEtBQUs7WUFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBR0QsU0FBUyxDQUFDLEtBQW9COztjQUN0QixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87O2NBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxRQUFROztjQUU3QyxRQUFRLEdBQ1osT0FBTyxLQUFLLElBQUksQ0FBQyxNQUFNO1lBQ3ZCLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSTtZQUNyQixPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDbkIsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJO1lBQ3JCLE9BQU8sS0FBSyxJQUFJLENBQUMsS0FBSztRQUV4QixJQUFJLFFBQVEsSUFBSSxZQUFZLEVBQUU7WUFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDakIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSztnQkFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0JBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDM0IsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLEtBQVU7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDakIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsS0FBSztZQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDMUIsVUFBVSxFQUFFLFdBQVc7U0FDeEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBWTtRQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTztTQUNSOztjQUVLLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSTs7OztRQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDakMsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3JDLENBQUMsRUFBQztRQUVGLElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsSUFBWTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7OztJQUVELGNBQWMsQ0FBQyxNQUFXLEVBQUUsR0FBUTs7Y0FDNUIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2hGLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsS0FBSztRQUN6QixPQUFPLEdBQUcsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Ozs7OztJQUVELGVBQWUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUs7UUFDL0IsSUFBSSxHQUFHLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdELE9BQU8sR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDaEM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7OztJQUVELFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSztRQUNqQixJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7O2tCQUNWLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNuQyxPQUFPLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNqSDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUk7UUFDeEIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFOztrQkFDVCxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDakMsT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hHO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzs7Ozs7O0lBRUQsc0JBQXNCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHO1FBQ3RDLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRTtZQUNoQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFZO1FBQ3ZCLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBVSxDQUFDO0lBQ2hFLENBQUM7Ozs7OztJQUVELFVBQVUsQ0FBQyxLQUFVLEVBQUUsR0FBUTtRQUM3QixJQUFJLEtBQUssSUFBSSxHQUFHLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM3RDtZQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QztRQUNELE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7Ozs7Ozs7SUFFRCxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQVEsRUFBRSxRQUFhO1FBQ3pDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNoQixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQzs7Ozs7OztJQUVELFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBUSxFQUFFLFFBQWE7UUFDdEMsS0FBSyxDQUFDLE1BQU0sbUJBQU0sR0FBRyxJQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsSUFBRyxDQUFDO0lBQ25ELENBQUM7Ozs7OztJQUVELGVBQWUsQ0FBQyxHQUFHLEVBQUUsS0FBSztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7Ozs7Ozs7SUFFRCxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLO1FBQzdCLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUNqQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7O1lBemxCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJJVDthQUNGOzs7O1lBL0pDLFVBQVU7WUFKVixpQkFBaUI7WUFlVixZQUFZOzs7MkJBc0psQixLQUFLO3dCQUVMLEtBQUs7b0JBUUwsS0FBSzt3QkFXTCxLQUFLO3lCQVdMLEtBQUs7dUJBVUwsS0FBSzt1QkFVTCxLQUFLO3FCQVdMLEtBQUs7a0JBV0wsS0FBSztvQkFXTCxLQUFLO3lCQVNMLEtBQUs7dUJBZUwsTUFBTTt5QkFFTixNQUFNOzJCQUVOLFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTsrQkFHbEUsV0FBVyxTQUFDLE9BQU87b0JBMkNuQixXQUFXLFNBQUMsZ0JBQWdCO3VCQUs1QixXQUFXLFNBQUMsbUJBQW1CO3VCQUsvQixXQUFXLFNBQUMsbUJBQW1CO3FCQUsvQixXQUFXLFNBQUMsY0FBYztzQkFnRjFCLFlBQVksU0FBQyxPQUFPO3FCQUtwQixZQUFZLFNBQUMsTUFBTTtzQkFLbkIsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzsrQkFjaEMsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzt5QkFnQmxDLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBY25DLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUFwVG5DLGtEQUFnRjs7SUE2R2hGLDhDQUEyRDs7SUFFM0QsZ0RBQTZEOztJQUU3RCxrREFDK0I7O0lBb0UvQixpREFBdUQ7O0lBQ3ZELG9EQUFvQjs7SUFDcEIsMkNBQVc7O0lBQ1gsNkNBQXVCOztJQUN2QiwrQ0FBa0I7O0lBQ2xCLHdEQUFzRDs7SUFDdEQsZ0RBQW9EOztJQUVwRCxpREFZRTs7Ozs7SUFFRixpREFBNkI7Ozs7O0lBQzdCLDRDQUFzQjs7Ozs7SUFDdEIsNkNBQTZCOzs7OztJQUM3QiwwQ0FBa0I7Ozs7O0lBQ2xCLGdEQUF3Qjs7Ozs7SUFDeEIsNENBQW9COzs7OztJQUNwQixnREFBMkI7Ozs7O0lBQzNCLCtDQUEwQjs7Ozs7SUFDMUIsK0NBQTJCOzs7OztJQUMzQiw4Q0FBc0I7Ozs7O0lBQ3RCLGlEQUFnQzs7Ozs7SUFFQyx3Q0FBNkI7Ozs7O0lBQUUsK0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgUGlwZVRyYW5zZm9ybSxcclxuICBIb3N0QmluZGluZyxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIE9uRGVzdHJveSxcclxuICBEb0NoZWNrLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uLy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcclxuaW1wb3J0IHsgTW91c2VFdmVudCwgS2V5Ym9hcmRFdmVudCB9IGZyb20gJy4uLy4uL2V2ZW50cyc7XHJcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LWRpcmVjdGlvbi50eXBlJztcclxuaW1wb3J0IHsgS2V5cyB9IGZyb20gJy4uLy4uL3V0aWxzL2tleXMnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCB0eXBlIFRyZWVTdGF0dXMgPSAnY29sbGFwc2VkJyB8ICdleHBhbmRlZCcgfCAnbG9hZGluZycgfCAnZGlzYWJsZWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtYm9keS1jZWxsJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWxcIlxyXG4gICAgICBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsgaGVpZ2h0OiAxMDAlO1wiXHJcbiAgICAgIFtzdHlsZS5tYXJnaW4tbGVmdC5weF09XCJjYWxjTGVmdE1hcmdpbihjb2x1bW4sIHJvdylcIlxyXG4gICAgPlxyXG4gICAgICA8YVxyXG4gICAgICAgICpuZ0lmPVwiY29sdW1uPy5wcm9wID09PSAnaWNlLWV4cGFuZGFibGUnICYmIHJvdz8uZGV0YWlsPy5sZW5ndGggPiAwXCJcclxuICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcclxuICAgICAgICBbY2xhc3MuZGF0YXRhYmxlLWljb24tZG93bl09XCIhZXhwYW5kZWRcIlxyXG4gICAgICAgIFtjbGFzcy5kYXRhdGFibGUtaWNvbi11cF09XCJleHBhbmRlZFwiXHJcbiAgICAgICAgc3R5bGU9XCJmb250LXNpemU6IDE4cHg7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCJcclxuICAgICAgICB0aXRsZT1cIkV4cGFuZC9Db2xsYXBzZSBSb3dcIlxyXG4gICAgICAgIChkYmxjbGljayk9XCJ0b2dnbGVFeHBhbmRSb3cocm93LCAkZXZlbnQpXCJcclxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kUm93KHJvdywgJGV2ZW50KVwiXHJcbiAgICAgID5cclxuICAgICAgPC9hPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uPy5wcm9wICE9PSAnaWNlLWV4cGFuZGFibGUnXCI+XHJcbiAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5jaGVja2JveGFibGUgJiYgKCFkaXNwbGF5Q2hlY2sgfHwgZGlzcGxheUNoZWNrKHJvdywgY29sdW1uLCB2YWx1ZSkpXCJcclxuICAgICAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLWNoZWNrYm94XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZFwiIChjbGljayk9XCJvbkNoZWNrYm94Q2hhbmdlKCRldmVudClcIiAvPlxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbi5pc1RyZWVDb2x1bW5cIj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgKm5nSWY9XCIhY29sdW1uLnRyZWVUb2dnbGVUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLXRyZWUtYnV0dG9uXCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cInRyZWVTdGF0dXMgPT09ICdkaXNhYmxlZCdcIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwib25UcmVlQWN0aW9uKClcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICA8aSAqbmdJZj1cInRyZWVTdGF0dXMgPT09ICdsb2FkaW5nJ1wiIGNsYXNzPVwiaWNvbiBkYXRhdGFibGUtaWNvbi1jb2xsYXBzZVwiPjwvaT5cclxuICAgICAgICAgICAgICA8aSAqbmdJZj1cInRyZWVTdGF0dXMgPT09ICdjb2xsYXBzZWQnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLXVwXCI+PC9pPlxyXG4gICAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2V4cGFuZGVkJyB8fCB0cmVlU3RhdHVzID09PSAnZGlzYWJsZWQnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLWRvd25cIj48L2k+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICAgICAgICpuZ0lmPVwiY29sdW1uLnRyZWVUb2dnbGVUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbi50cmVlVG9nZ2xlVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBjZWxsQ29udGV4dDogY2VsbENvbnRleHQgfVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiY29sdW1uLmljb25zIGFzIGljb25zXCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBtYXJnaW4tcmlnaHQ6IDEwcHg7XCI+XHJcbiAgICAgICAgICA8bWF0LWljb25cclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGkgb2YgZ2V0SWNvbnMocm93LCBpY29ucylcIlxyXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cImkuaWNvblwiXHJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImkudGV4dFwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwie3sgaS5jbGFzcyB9fSBtYXQtaWNvbiBtYXRlcmlhbC1pY29ucyBpY2UtbWwtMTBcIlxyXG4gICAgICAgICAgPjwvbWF0LWljb24+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxtYXQtaWNvblxyXG4gICAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICAgY29sdW1uLmljb25DdXN0b21Ub29sdGlwSHRtbFRleHQgJiZcclxuICAgICAgICAgICAgY29sdW1uLnByb3AgJiZcclxuICAgICAgICAgICAgc2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5pY29uQ3VzdG9tVG9vbHRpcEh0bWxUZXh0KSBhcyBjdXN0b21IdG1sXHJcbiAgICAgICAgICBcIlxyXG4gICAgICAgICAgaWNlQ3VzdG9tSHRtbFRvb2xUaXBcclxuICAgICAgICAgIFtpY2VUb29sdGlwSHRtbFRleHRdPVwic2FuYXRpemVIdG1sKGN1c3RvbUh0bWwpXCJcclxuICAgICAgICAgIFtkdXJhdGlvbl09XCIxNTAwXCJcclxuICAgICAgICAgIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLnByb3AgJiYgc2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5pY29uQ29sb3IpXCJcclxuICAgICAgICAgID5wcmlvcml0eV9oaWdoPC9tYXQtaWNvblxyXG4gICAgICAgID5cclxuXHJcbiAgICAgICAgPG1hdC1pY29uXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0luZm9Ub29sdGlwJ11cIlxyXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnSW5mb1Rvb2x0aXAnXVwiXHJcbiAgICAgICAgICBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCJcclxuICAgICAgICAgID5pbmZvPC9tYXQtaWNvblxyXG4gICAgICAgID5cclxuXHJcbiAgICAgICAgPG1hdC1pY29uXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0V4Y2x1ZGVkJ11cIlxyXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnRXhjbHVkZWQnXVwiXHJcbiAgICAgICAgICBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCJcclxuICAgICAgICAgID5ibG9jazwvbWF0LWljb25cclxuICAgICAgICA+XHJcblxyXG4gICAgICAgIDxoNFxyXG4gICAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICAgIWNvbHVtbi5hY3Rpb25CdXR0b25JY29uICYmXHJcbiAgICAgICAgICAgICFjb2x1bW4uY2VsbFRlbXBsYXRlICYmXHJcbiAgICAgICAgICAgICFjb2x1bW4uc2VsZWN0T3B0aW9ucyAmJlxyXG4gICAgICAgICAgICAoIWNvbHVtbi5lZGl0YWJsZSB8fCAhKGlzRWRpdGFibGUoY29sdW1uLCByb3cpIHwgYXN5bmMpKVxyXG4gICAgICAgICAgXCJcclxuICAgICAgICAgIGNsYXNzPVwiaWNlLWRhdGEtdGFibGUtcm93XCJcclxuICAgICAgICAgIGljZUN1c3RvbUh0bWxUb29sVGlwXHJcbiAgICAgICAgICBbaWNlVG9vbHRpcEh0bWxUZXh0XT1cImdldFRvb2x0aXBWYWx1ZSh2YWx1ZSwgcm93LCBjb2x1bW4pXCJcclxuICAgICAgICAgIFtzaG93VG9vbFRpcE9uVGV4dE92ZXJmbG93XT1cInRydWVcIlxyXG4gICAgICAgICAgW3Nob3dUb29sVGlwXT1cImhhc1RvU2hvd1Rvb2xUaXAocm93LCBjb2x1bW4pXCJcclxuICAgICAgICAgIFtpbm5lckhUTUxdPVwidmFsdWVcIlxyXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tGaWVsZChyb3csIGNvbHVtbi5vbkNsaWNrQWN0aW9uLCAkZXZlbnQpXCJcclxuICAgICAgICA+PC9oND5cclxuXHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW4uYWN0aW9uQnV0dG9uSWNvbiAmJiAhKGNvbHVtbi5oaWRlQWN0aW9uQnV0dG9uICYmIGNvbHVtbi5oaWRlQWN0aW9uQnV0dG9uKHJvdykgfCBhc3luYylcIlxyXG4gICAgICAgICAgbWF0LWljb24tYnV0dG9uXHJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJjb2x1bW4uYWN0aW9uQnV0dG9uVG9vbHRpcFwiXHJcbiAgICAgICAgICAoY2xpY2spPVwib25DbGlja1Jvd0FjdGlvbkJ1dHRvbigkZXZlbnQsIGNvbHVtbiwgcm93KVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIj57eyBjb2x1bW4uYWN0aW9uQnV0dG9uSWNvbiB9fTwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgIDxpY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3RcclxuICAgICAgICAgIHN0eWxlPVwibWFyZ2luLXRvcDogMThweFwiXHJcbiAgICAgICAgICBbb3B0aW9uc109XCJjb2x1bW4uc2VsZWN0T3B0aW9uc1wiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJjb2x1bW4uY2VsbENsYXNzXCJcclxuICAgICAgICAgICh1cGRhdGUpPVwidXBkYXRlU2VsZWN0KGNvbHVtbiwgcm93LCAkZXZlbnQpXCJcclxuICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXHJcbiAgICAgICAgICBbZGVmYXVsdFZhbHVlXT1cImNvbHVtbi5kZWZhdWx0VmFsdWVcIlxyXG4gICAgICAgICAgW3NlbGVjdERpc2FibGVkXT1cImNvbHVtbi5kaXNhYmxlZFwiXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5zZWxlY3RPcHRpb25zICYmICEoY29sdW1uLmhpZGVJZkVtcHR5ICYmIGNvbHVtbi5kaXNhYmxlZCAmJiB2YWx1ZSA9PT0gJycpXCJcclxuICAgICAgICA+PC9pY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3Q+XHJcblxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY29sdW1uLnNlbGVjdE9wdGlvbnMgJiYgKGNvbHVtbi5lZGl0YWJsZSAmJiBpc0VkaXRhYmxlKGNvbHVtbiwgcm93KSB8IGFzeW5jKVwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIiAqbmdJZj1cIiFjb2x1bW4uaGlkZUVkaXRJY29uXCI+ZWRpdDwvbWF0LWljb24+XHJcbiAgICAgICAgICA8aWNlLWVkaXRhYmxlLXRleHRcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLmNlbGxDbGFzc1wiXHJcbiAgICAgICAgICAgICh1cGRhdGUpPVwiZWRpdEZpZWxkKGNvbHVtbiwgcm93LCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgW2Vycm9yVGV4dF09XCJzZWxlY3RGaWVsZFZhbHVlKHJvdywgY29sdW1uLmVycm9yTWVzc2FnZUZpZWxkKVwiXHJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt7IHZhbHVlIH19XHJcbiAgICAgICAgICA8L2ljZS1lZGl0YWJsZS10ZXh0PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICAgICNjZWxsVGVtcGxhdGVcclxuICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmNlbGxUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcclxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjZWxsQ29udGV4dFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlQm9keUNlbGxDb21wb25lbnQgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlDaGVjazogKHJvdzogYW55LCBjb2x1bW4/OiBUYWJsZUNvbHVtbiwgdmFsdWU/OiBhbnkpID0+IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIHNldCByb3dEZXRhaWwocm93RGV0YWlsOiBhbnkpIHtcclxuICAgIHRoaXMuX3Jvd0RldGFpbCA9IHJvd0RldGFpbDtcclxuICB9XHJcblxyXG4gIGdldCByb3dEZXRhaWwoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9yb3dEZXRhaWw7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgZ3JvdXAoZ3JvdXA6IGFueSkge1xyXG4gICAgdGhpcy5fZ3JvdXAgPSBncm91cDtcclxuICAgIHRoaXMuY2VsbENvbnRleHQuZ3JvdXAgPSBncm91cDtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZ3JvdXAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXA7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgcm93SGVpZ2h0KHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9yb3dIZWlnaHQgPSB2YWw7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvd0hlaWdodCA9IHZhbDtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93SGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd0hlaWdodDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBpc1NlbGVjdGVkKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IHZhbDtcclxuICAgIHRoaXMuY2VsbENvbnRleHQuaXNTZWxlY3RlZCA9IHZhbDtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdGVkO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGV4cGFuZGVkKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZXhwYW5kZWQgPSB2YWw7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LmV4cGFuZGVkID0gdmFsO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCByb3dJbmRleCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fcm93SW5kZXggPSB2YWw7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvd0luZGV4ID0gdmFsO1xyXG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCByb3dJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd0luZGV4O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGNvbHVtbihjb2x1bW46IFRhYmxlQ29sdW1uKSB7XHJcbiAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LmNvbHVtbiA9IGNvbHVtbjtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY29sdW1uKCk6IFRhYmxlQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW47XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgcm93KHJvdzogYW55KSB7XHJcbiAgICB0aGlzLl9yb3cgPSByb3c7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvdyA9IHJvdztcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93KCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcm93O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IHNvcnRzKHZhbDogYW55W10pIHtcclxuICAgIHRoaXMuX3NvcnRzID0gdmFsO1xyXG4gICAgdGhpcy5jYWxjU29ydERpciA9IHRoaXMuY2FsY1NvcnREaXIodmFsKTtcclxuICB9XHJcblxyXG4gIGdldCBzb3J0cygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc29ydHM7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgdHJlZVN0YXR1cyhzdGF0dXM6IFRyZWVTdGF0dXMpIHtcclxuICAgIGlmIChzdGF0dXMgIT09ICdjb2xsYXBzZWQnICYmIHN0YXR1cyAhPT0gJ2V4cGFuZGVkJyAmJiBzdGF0dXMgIT09ICdsb2FkaW5nJyAmJiBzdGF0dXMgIT09ICdkaXNhYmxlZCcpIHtcclxuICAgICAgdGhpcy5fdHJlZVN0YXR1cyA9ICdjb2xsYXBzZWQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fdHJlZVN0YXR1cyA9IHN0YXR1cztcclxuICAgIH1cclxuICAgIHRoaXMuY2VsbENvbnRleHQudHJlZVN0YXR1cyA9IHRoaXMuX3RyZWVTdGF0dXM7XHJcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRyZWVTdGF0dXMoKTogVHJlZVN0YXR1cyB7XHJcbiAgICByZXR1cm4gdGhpcy5fdHJlZVN0YXR1cztcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnY2VsbFRlbXBsYXRlJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcclxuICBjZWxsVGVtcGxhdGU6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxyXG4gIGdldCBjb2x1bW5Dc3NDbGFzc2VzKCk6IGFueSB7XHJcbiAgICBsZXQgY2xzID0gJ2RhdGF0YWJsZS1ib2R5LWNlbGwnO1xyXG4gICAgaWYgKHRoaXMuY29sdW1uLmNlbGxDbGFzcykge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmNlbGxDbGFzcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBjbHMgKz0gJyAnICsgdGhpcy5jb2x1bW4uY2VsbENsYXNzO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5jZWxsQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmNvbHVtbi5jZWxsQ2xhc3Moe1xyXG4gICAgICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxyXG4gICAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGNscyArPSByZXM7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcyk7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xyXG4gICAgICAgICAgICBpZiAocmVzW2tdID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgY2xzICs9IGAgJHtrfWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zb3J0RGlyKSB7XHJcbiAgICAgIGNscyArPSAnIHNvcnQtYWN0aXZlJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzRm9jdXNlZCkge1xyXG4gICAgICBjbHMgKz0gJyBhY3RpdmUnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5hc2MpIHtcclxuICAgICAgY2xzICs9ICcgc29ydC1hc2MnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5kZXNjKSB7XHJcbiAgICAgIGNscyArPSAnIHNvcnQtZGVzYyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNscztcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxyXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLndpZHRoO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5taW5XaWR0aC5weCcpXHJcbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWluV2lkdGg7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1heFdpZHRoLnB4JylcclxuICBnZXQgbWF4V2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbi5tYXhXaWR0aDtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JylcclxuICBnZXQgaGVpZ2h0KCk6IHN0cmluZyB8IG51bWJlciB7XHJcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnJvd0hlaWdodDtcclxuICAgIGlmIChpc05hTihoZWlnaHQpKSB7XHJcbiAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVpZ2h0ICsgJ3B4JztcclxuICB9XHJcbiAgX2lzRWRpdGFibGU6IHsgW2E6IHN0cmluZ106IE9ic2VydmFibGU8Ym9vbGVhbj4gfSA9IHt9O1xyXG4gIHNhbml0aXplZFZhbHVlOiBhbnk7XHJcbiAgdmFsdWU6IGFueTtcclxuICBzb3J0RGlyOiBTb3J0RGlyZWN0aW9uO1xyXG4gIGlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gIG9uQ2hlY2tib3hDaGFuZ2VGbiA9IHRoaXMub25DaGVja2JveENoYW5nZS5iaW5kKHRoaXMpO1xyXG4gIGFjdGl2YXRlRm4gPSB0aGlzLmFjdGl2YXRlLmVtaXQuYmluZCh0aGlzLmFjdGl2YXRlKTtcclxuXHJcbiAgY2VsbENvbnRleHQ6IGFueSA9IHtcclxuICAgIG9uQ2hlY2tib3hDaGFuZ2VGbjogdGhpcy5vbkNoZWNrYm94Q2hhbmdlRm4sXHJcbiAgICBhY3RpdmF0ZUZuOiB0aGlzLmFjdGl2YXRlRm4sXHJcbiAgICByb3c6IHRoaXMucm93LFxyXG4gICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXHJcbiAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxyXG4gICAgaXNTZWxlY3RlZDogdGhpcy5pc1NlbGVjdGVkLFxyXG4gICAgcm93SW5kZXg6IHRoaXMucm93SW5kZXgsXHJcbiAgICB0cmVlU3RhdHVzOiB0aGlzLnRyZWVTdGF0dXMsXHJcbiAgICBvblRyZWVBY3Rpb246IHRoaXMub25UcmVlQWN0aW9uLmJpbmQodGhpcylcclxuICB9O1xyXG5cclxuICBwcml2YXRlIF9pc1NlbGVjdGVkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgX3NvcnRzOiBhbnlbXTtcclxuICBwcml2YXRlIF9jb2x1bW46IFRhYmxlQ29sdW1uO1xyXG4gIHByaXZhdGUgX3JvdzogYW55O1xyXG4gIHByaXZhdGUgX3Jvd0RldGFpbDogYW55O1xyXG4gIHByaXZhdGUgX2dyb3VwOiBhbnk7XHJcbiAgcHJpdmF0ZSBfcm93SGVpZ2h0OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfcm93SW5kZXg6IG51bWJlcjtcclxuICBwcml2YXRlIF9leHBhbmRlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIF9lbGVtZW50OiBhbnk7XHJcbiAgcHJpdmF0ZSBfdHJlZVN0YXR1czogVHJlZVN0YXR1cztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XHJcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNlbGxUZW1wbGF0ZSkge1xyXG4gICAgICB0aGlzLmNlbGxUZW1wbGF0ZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tWYWx1ZVVwZGF0ZXMoKTogdm9pZCB7XHJcbiAgICBsZXQgdmFsdWUgPSAnJztcclxuXHJcbiAgICBpZiAoIXRoaXMucm93IHx8ICF0aGlzLmNvbHVtbikge1xyXG4gICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdmFsID0gdGhpcy5jb2x1bW4uJCR2YWx1ZUdldHRlcih0aGlzLnJvdywgdGhpcy5jb2x1bW4ucHJvcCk7XHJcbiAgICAgIGNvbnN0IHVzZXJQaXBlOiBQaXBlVHJhbnNmb3JtID0gdGhpcy5jb2x1bW4ucGlwZTtcclxuXHJcbiAgICAgIGlmICh1c2VyUGlwZSkge1xyXG4gICAgICAgIHZhbHVlID0gdXNlclBpcGUudHJhbnNmb3JtKHZhbCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHZhbHVlID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5jZWxsQ29udGV4dC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLnNhbml0aXplZFZhbHVlID0gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHRoaXMuc3RyaXBIdG1sKHZhbHVlKSA6IHZhbHVlO1xyXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxyXG4gIG9uRm9jdXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdibHVyJylcclxuICBvbkJsdXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XHJcbiAgICAgIHR5cGU6ICdjbGljaycsXHJcbiAgICAgIGV2ZW50LFxyXG4gICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcclxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnLCBbJyRldmVudCddKVxyXG4gIG1pZGRsZWNsaWNrRXZlbnQoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC53aGljaCA9PT0gMikge1xyXG4gICAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xyXG4gICAgICAgIHR5cGU6ICdtaWRkbGVjbGljaycsXHJcbiAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgICBncm91cDogdGhpcy5ncm91cCxcclxuICAgICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxyXG4gICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkYmxjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgb25EYmxDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcclxuICAgICAgdHlwZTogJ2RibGNsaWNrJyxcclxuICAgICAgZXZlbnQsXHJcbiAgICAgIHJvdzogdGhpcy5yb3csXHJcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxyXG4gICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxyXG4gICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxyXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXHJcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcclxuICAgIGNvbnN0IGlzVGFyZ2V0Q2VsbCA9IGV2ZW50LnRhcmdldCA9PT0gdGhpcy5fZWxlbWVudDtcclxuXHJcbiAgICBjb25zdCBpc0FjdGlvbiA9XHJcbiAgICAgIGtleUNvZGUgPT09IEtleXMucmV0dXJuIHx8XHJcbiAgICAgIGtleUNvZGUgPT09IEtleXMuZG93biB8fFxyXG4gICAgICBrZXlDb2RlID09PSBLZXlzLnVwIHx8XHJcbiAgICAgIGtleUNvZGUgPT09IEtleXMubGVmdCB8fFxyXG4gICAgICBrZXlDb2RlID09PSBLZXlzLnJpZ2h0O1xyXG5cclxuICAgIGlmIChpc0FjdGlvbiAmJiBpc1RhcmdldENlbGwpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xyXG4gICAgICAgIHR5cGU6ICdrZXlkb3duJyxcclxuICAgICAgICBldmVudCxcclxuICAgICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxyXG4gICAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXHJcbiAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICBjZWxsRWxlbWVudDogdGhpcy5fZWxlbWVudFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQ2hlY2tib3hDaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcclxuICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgZXZlbnQsXHJcbiAgICAgIHJvdzogdGhpcy5yb3csXHJcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxyXG4gICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxyXG4gICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxyXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnQsXHJcbiAgICAgIHRyZWVTdGF0dXM6ICdjb2xsYXBzZWQnXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNhbGNTb3J0RGlyKHNvcnRzOiBhbnlbXSk6IGFueSB7XHJcbiAgICBpZiAoIXNvcnRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb3J0ID0gc29ydHMuZmluZCgoczogYW55KSA9PiB7XHJcbiAgICAgIHJldHVybiBzLnByb3AgPT09IHRoaXMuY29sdW1uLnByb3A7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoc29ydCkge1xyXG4gICAgICByZXR1cm4gc29ydC5kaXI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdHJpcEh0bWwoaHRtbDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICghaHRtbC5yZXBsYWNlKSB7XHJcbiAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvPFxcLz9bXj5dKyg+fCQpL2csICcnKTtcclxuICB9XHJcblxyXG4gIG9uVHJlZUFjdGlvbigpIHtcclxuICAgIHRoaXMudHJlZUFjdGlvbi5lbWl0KHRoaXMucm93KTtcclxuICB9XHJcblxyXG4gIGNhbGNMZWZ0TWFyZ2luKGNvbHVtbjogYW55LCByb3c6IGFueSkge1xyXG4gICAgY29uc3QgbGV2ZWxJbmRlbnQgPSBjb2x1bW4udHJlZUxldmVsSW5kZW50ICE9IG51bGwgPyBjb2x1bW4udHJlZUxldmVsSW5kZW50IDogNTA7XHJcbiAgICByZXR1cm4gY29sdW1uLmlzVHJlZUNvbHVtbiA/IHJvdy5sZXZlbCAqIGxldmVsSW5kZW50IDogMDtcclxuICB9XHJcblxyXG4gIGhhc1RvU2hvd1Rvb2xUaXAocm93LCBmaWVsZCkge1xyXG4gICAgcmV0dXJuIHJvdyAmJiBmaWVsZCAmJiBmaWVsZC50b29sdGlwICYmIGZpZWxkLnRvb2x0aXAubGVuZ3RoID4gMDtcclxuICB9XHJcblxyXG4gIGdldFRvb2x0aXBWYWx1ZSh2YWx1ZSwgcm93LCBmaWVsZCkge1xyXG4gICAgaWYgKHJvdyAmJiBmaWVsZCAmJiBmaWVsZC50b29sdGlwICYmIGZpZWxkLnRvb2x0aXAubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gcm93W2Ake2ZpZWxkLnRvb2x0aXB9YF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXRJY29ucyhyb3csIGljb25zKSB7XHJcbiAgICBpZiAocm93ICYmIGljb25zKSB7XHJcbiAgICAgIGNvbnN0IGljb25zQXJyYXkgPSBpY29ucy5zcGxpdCgnLicpO1xyXG4gICAgICByZXR1cm4gaWNvbnNBcnJheS5sZW5ndGggPiAxICYmIHJvd1tpY29uc0FycmF5WzBdXSA/IHJvd1tpY29uc0FycmF5WzBdXVtpY29uc0FycmF5WzFdXSB8fCBbXSA6IHJvd1tpY29uc10gfHwgW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBzZWxlY3RGaWVsZFZhbHVlKHJvdywgcHJvcCkge1xyXG4gICAgaWYgKHJvdyAmJiBwcm9wKSB7XHJcbiAgICAgIGNvbnN0IHByb3BBcnJheSA9IHByb3Auc3BsaXQoJy4nKTtcclxuICAgICAgcmV0dXJuIHByb3BBcnJheS5sZW5ndGggPiAxICYmIHJvd1twcm9wQXJyYXlbMF1dID8gcm93W3Byb3BBcnJheVswXV1bcHJvcEFycmF5WzFdXSA6IHJvd1twcm9wXTtcclxuICAgIH1cclxuICAgIHJldHVybiAnICc7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrUm93QWN0aW9uQnV0dG9uKGV2ZW50LCBmaWVsZCwgcm93KSB7XHJcbiAgICBpZiAoZmllbGQgJiYgcm93KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBmaWVsZC5hY3Rpb24ocm93KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhbmF0aXplSHRtbChodG1sOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sKSBhcyBzdHJpbmc7XHJcbiAgfVxyXG5cclxuICBpc0VkaXRhYmxlKGZpZWxkOiBhbnksIHJvdzogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICBpZiAoZmllbGQgJiYgcm93KSB7XHJcbiAgICAgIGlmICghdGhpcy5faXNFZGl0YWJsZVtmaWVsZC5wcm9wICsgcm93LmlkXSkge1xyXG4gICAgICAgIHRoaXMuX2lzRWRpdGFibGVbZmllbGQucHJvcCArIHJvdy5pZF0gPSBmaWVsZC5lZGl0YWJsZShyb3cpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9pc0VkaXRhYmxlW2ZpZWxkLnByb3AgKyByb3cuaWRdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNlbGVjdChmaWVsZCwgcm93OiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgIHJvd1tmaWVsZC5wcm9wXSA9IG5ld1ZhbHVlO1xyXG4gICAgaWYgKGZpZWxkLm9uRWRpdCkge1xyXG4gICAgICBmaWVsZC5vbkVkaXQocm93KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVkaXRGaWVsZChmaWVsZCwgcm93OiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgIGZpZWxkLm9uRWRpdCh7IC4uLnJvdywgW2ZpZWxkLnByb3BdOiBuZXdWYWx1ZSB9KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUV4cGFuZFJvdyhyb3csIGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBpZiAodGhpcy5yb3dEZXRhaWwpIHtcclxuICAgICAgdGhpcy5yb3dEZXRhaWwudG9nZ2xlRXhwYW5kUm93KHJvdyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrRmllbGQocm93LCBhY3Rpb24sIGV2ZW50KSB7XHJcbiAgICBpZiAocm93ICYmIGFjdGlvbikge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgIGFjdGlvbihyb3cpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=