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
}
DataTableBodyCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-body-cell',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="datatable-body-cell-label" [style.margin-left.px]="calcLeftMargin(column, row)">
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

      <h4
        *ngIf="
          !column.icons &&
          !column.iconCustomTooltipHtmlText &&
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
      ></h4>

      <div *ngIf="column.icons as icons" fxLayout="column">
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
        [value]="value || column.defaultValue"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9ib2R5LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsZ0JBQWdCLEVBR2hCLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBbUl0QyxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7SUFnTnJDLFlBQVksT0FBbUIsRUFBVSxFQUFxQixFQUFVLFNBQXVCO1FBQXRELE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYztRQTFHckYsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXVFN0QsZ0JBQVcsR0FBeUMsRUFBRSxDQUFDO1FBSXZELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxlQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJ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OztJQUVDLHdDQUE2Qjs7Ozs7SUFBRSwrQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBQaXBlVHJhbnNmb3JtLFxuICBIb3N0QmluZGluZyxcbiAgVmlld0NoaWxkLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgRWxlbWVudFJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgT25EZXN0cm95LFxuICBEb0NoZWNrLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuLi8uLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XG5pbXBvcnQgeyBNb3VzZUV2ZW50LCBLZXlib2FyZEV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LWRpcmVjdGlvbi50eXBlJztcbmltcG9ydCB7IEtleXMgfSBmcm9tICcuLi8uLi91dGlscy9rZXlzJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IHR5cGUgVHJlZVN0YXR1cyA9ICdjb2xsYXBzZWQnIHwgJ2V4cGFuZGVkJyB8ICdsb2FkaW5nJyB8ICdkaXNhYmxlZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1ib2R5LWNlbGwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbFwiIFtzdHlsZS5tYXJnaW4tbGVmdC5weF09XCJjYWxjTGVmdE1hcmdpbihjb2x1bW4sIHJvdylcIj5cbiAgICAgIDxsYWJlbFxuICAgICAgICAqbmdJZj1cImNvbHVtbi5jaGVja2JveGFibGUgJiYgKCFkaXNwbGF5Q2hlY2sgfHwgZGlzcGxheUNoZWNrKHJvdywgY29sdW1uLCB2YWx1ZSkpXCJcbiAgICAgICAgY2xhc3M9XCJkYXRhdGFibGUtY2hlY2tib3hcIlxuICAgICAgPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZFwiIChjbGljayk9XCJvbkNoZWNrYm94Q2hhbmdlKCRldmVudClcIiAvPlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4uaXNUcmVlQ29sdW1uXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAqbmdJZj1cIiFjb2x1bW4udHJlZVRvZ2dsZVRlbXBsYXRlXCJcbiAgICAgICAgICBjbGFzcz1cImRhdGF0YWJsZS10cmVlLWJ1dHRvblwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cInRyZWVTdGF0dXMgPT09ICdkaXNhYmxlZCdcIlxuICAgICAgICAgIChjbGljayk9XCJvblRyZWVBY3Rpb24oKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2xvYWRpbmcnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLWNvbGxhcHNlXCI+PC9pPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJ0cmVlU3RhdHVzID09PSAnY29sbGFwc2VkJ1wiIGNsYXNzPVwiaWNvbiBkYXRhdGFibGUtaWNvbi11cFwiPjwvaT5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2V4cGFuZGVkJyB8fCB0cmVlU3RhdHVzID09PSAnZGlzYWJsZWQnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLWRvd25cIj48L2k+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW4udHJlZVRvZ2dsZVRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4udHJlZVRvZ2dsZVRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBjZWxsQ29udGV4dDogY2VsbENvbnRleHQgfVwiXG4gICAgICAgID5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8aDRcbiAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAhY29sdW1uLmljb25zICYmXG4gICAgICAgICAgIWNvbHVtbi5pY29uQ3VzdG9tVG9vbHRpcEh0bWxUZXh0ICYmXG4gICAgICAgICAgIWNvbHVtbi5hY3Rpb25CdXR0b25JY29uICYmXG4gICAgICAgICAgIWNvbHVtbi5jZWxsVGVtcGxhdGUgJiZcbiAgICAgICAgICAhY29sdW1uLnNlbGVjdE9wdGlvbnMgJiZcbiAgICAgICAgICAoIWNvbHVtbi5lZGl0YWJsZSB8fCAhKGlzRWRpdGFibGUoY29sdW1uLCByb3cpIHwgYXN5bmMpKVxuICAgICAgICBcIlxuICAgICAgICBjbGFzcz1cImljZS1kYXRhLXRhYmxlLXJvd1wiXG4gICAgICAgIGljZUN1c3RvbUh0bWxUb29sVGlwXG4gICAgICAgIFtpY2VUb29sdGlwSHRtbFRleHRdPVwiZ2V0VG9vbHRpcFZhbHVlKHZhbHVlLCByb3csIGNvbHVtbilcIlxuICAgICAgICBbc2hvd1Rvb2xUaXBPblRleHRPdmVyZmxvd109XCJ0cnVlXCJcbiAgICAgICAgW3Nob3dUb29sVGlwXT1cImhhc1RvU2hvd1Rvb2xUaXAocm93LCBjb2x1bW4pXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJ2YWx1ZVwiXG4gICAgICA+PC9oND5cblxuICAgICAgPGRpdiAqbmdJZj1cImNvbHVtbi5pY29ucyBhcyBpY29uc1wiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpIG9mIGdldEljb25zKHJvdywgaWNvbnMpXCJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cImkuaWNvblwiXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiaS50ZXh0XCJcbiAgICAgICAgICBjbGFzcz1cInt7IGkuY2xhc3MgfX0gbWF0LWljb24gbWF0ZXJpYWwtaWNvbnMgaWNlLW1sLTEwXCJcbiAgICAgICAgPjwvbWF0LWljb24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPG1hdC1pY29uXG4gICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgY29sdW1uLmljb25DdXN0b21Ub29sdGlwSHRtbFRleHQgJiZcbiAgICAgICAgICBjb2x1bW4ucHJvcCAmJlxuICAgICAgICAgIHNlbGVjdEZpZWxkVmFsdWUocm93LCBjb2x1bW4uaWNvbkN1c3RvbVRvb2x0aXBIdG1sVGV4dCkgYXMgY3VzdG9tSHRtbFxuICAgICAgICBcIlxuICAgICAgICBpY2VDdXN0b21IdG1sVG9vbFRpcFxuICAgICAgICBbaWNlVG9vbHRpcEh0bWxUZXh0XT1cInNhbmF0aXplSHRtbChjdXN0b21IdG1sKVwiXG4gICAgICAgIFtkdXJhdGlvbl09XCIxNTAwXCJcbiAgICAgICAgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiXG4gICAgICAgIFtuZ0NsYXNzXT1cImNvbHVtbi5wcm9wICYmIHNlbGVjdEZpZWxkVmFsdWUocm93LCBjb2x1bW4uaWNvbkNvbG9yKVwiXG4gICAgICAgID5wcmlvcml0eV9oaWdoPC9tYXQtaWNvblxuICAgICAgPlxuXG4gICAgICA8bWF0LWljb25cbiAgICAgICAgKm5nSWY9XCJjb2x1bW4ucHJvcCAmJiByb3dbY29sdW1uLnByb3AudG9TdHJpbmcoKSArICdJbmZvVG9vbHRpcCddXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnSW5mb1Rvb2x0aXAnXVwiXG4gICAgICAgIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIlxuICAgICAgICA+aW5mbzwvbWF0LWljb25cbiAgICAgID5cblxuICAgICAgPG1hdC1pY29uXG4gICAgICAgICpuZ0lmPVwiY29sdW1uLnByb3AgJiYgcm93W2NvbHVtbi5wcm9wLnRvU3RyaW5nKCkgKyAnRXhjbHVkZWQnXVwiXG4gICAgICAgIFttYXRUb29sdGlwXT1cImNvbHVtbi5wcm9wICYmIHJvd1tjb2x1bW4ucHJvcC50b1N0cmluZygpICsgJ0V4Y2x1ZGVkJ11cIlxuICAgICAgICBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCJcbiAgICAgICAgPmJsb2NrPC9tYXQtaWNvblxuICAgICAgPlxuXG4gICAgICA8YnV0dG9uXG4gICAgICAgICpuZ0lmPVwiY29sdW1uLmFjdGlvbkJ1dHRvbkljb24gJiYgIShjb2x1bW4uaGlkZUFjdGlvbkJ1dHRvbiAmJiBjb2x1bW4uaGlkZUFjdGlvbkJ1dHRvbihyb3cpIHwgYXN5bmMpXCJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgIFttYXRUb29sdGlwXT1cImNvbHVtbi5hY3Rpb25CdXR0b25Ub29sdGlwXCJcbiAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tSb3dBY3Rpb25CdXR0b24oJGV2ZW50LCBjb2x1bW4sIHJvdylcIlxuICAgICAgPlxuICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaWNvbiBtYXRlcmlhbC1pY29uc1wiPnt7IGNvbHVtbi5hY3Rpb25CdXR0b25JY29uIH19PC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8aWNlLWRhdGF0YWJsZS1yb3ctc2VsZWN0XG4gICAgICAgIHN0eWxlPVwibWFyZ2luLXRvcDogMThweFwiXG4gICAgICAgIFtvcHRpb25zXT1cImNvbHVtbi5zZWxlY3RPcHRpb25zXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLmNlbGxDbGFzc1wiXG4gICAgICAgICh1cGRhdGUpPVwidXBkYXRlU2VsZWN0KGNvbHVtbiwgcm93LCAkZXZlbnQpXCJcbiAgICAgICAgW3ZhbHVlXT1cInZhbHVlIHx8IGNvbHVtbi5kZWZhdWx0VmFsdWVcIlxuICAgICAgICBbc2VsZWN0RGlzYWJsZWRdPVwiY29sdW1uLmRpc2FibGVkXCJcbiAgICAgICAgKm5nSWY9XCJjb2x1bW4uc2VsZWN0T3B0aW9ucyAmJiAhKGNvbHVtbi5oaWRlSWZFbXB0eSAmJiBjb2x1bW4uZGlzYWJsZWQgJiYgdmFsdWUgPT09ICcnKVwiXG4gICAgICA+PC9pY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3Q+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY29sdW1uLnNlbGVjdE9wdGlvbnMgJiYgKGNvbHVtbi5lZGl0YWJsZSAmJiBpc0VkaXRhYmxlKGNvbHVtbiwgcm93KSB8IGFzeW5jKVwiPlxuICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaWNvbiBtYXRlcmlhbC1pY29uc1wiICpuZ0lmPVwiIWNvbHVtbi5oaWRlRWRpdEljb25cIj5lZGl0PC9tYXQtaWNvbj5cbiAgICAgICAgPGljZS1lZGl0YWJsZS10ZXh0XG4gICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLmNlbGxDbGFzc1wiXG4gICAgICAgICAgKHVwZGF0ZSk9XCJlZGl0RmllbGQoY29sdW1uLCByb3csICRldmVudClcIlxuICAgICAgICAgIFtlcnJvclRleHRdPVwic2VsZWN0RmllbGRWYWx1ZShyb3csIGNvbHVtbi5lcnJvck1lc3NhZ2VGaWVsZClcIlxuICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyB2YWx1ZSB9fVxuICAgICAgICA8L2ljZS1lZGl0YWJsZS10ZXh0PlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAjY2VsbFRlbXBsYXRlXG4gICAgICAgICpuZ0lmPVwiY29sdW1uLmNlbGxUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbi5jZWxsVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY2VsbENvbnRleHRcIlxuICAgICAgPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCb2R5Q2VsbENvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGRpc3BsYXlDaGVjazogKHJvdzogYW55LCBjb2x1bW4/OiBUYWJsZUNvbHVtbiwgdmFsdWU/OiBhbnkpID0+IGJvb2xlYW47XG5cbiAgQElucHV0KCkgc2V0IGdyb3VwKGdyb3VwOiBhbnkpIHtcbiAgICB0aGlzLl9ncm91cCA9IGdyb3VwO1xuICAgIHRoaXMuY2VsbENvbnRleHQuZ3JvdXAgPSBncm91cDtcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBncm91cCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXA7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcm93SGVpZ2h0KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcm93SGVpZ2h0ID0gdmFsO1xuICAgIHRoaXMuY2VsbENvbnRleHQucm93SGVpZ2h0ID0gdmFsO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHJvd0hlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcm93SGVpZ2h0O1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGlzU2VsZWN0ZWQodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IHZhbDtcbiAgICB0aGlzLmNlbGxDb250ZXh0LmlzU2VsZWN0ZWQgPSB2YWw7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdGVkO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGV4cGFuZGVkKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsO1xuICAgIHRoaXMuY2VsbENvbnRleHQuZXhwYW5kZWQgPSB2YWw7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcm93SW5kZXgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yb3dJbmRleCA9IHZhbDtcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvd0luZGV4ID0gdmFsO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHJvd0luZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd0luZGV4O1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGNvbHVtbihjb2x1bW46IFRhYmxlQ29sdW1uKSB7XG4gICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xuICAgIHRoaXMuY2VsbENvbnRleHQuY29sdW1uID0gY29sdW1uO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGNvbHVtbigpOiBUYWJsZUNvbHVtbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbjtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCByb3cocm93OiBhbnkpIHtcbiAgICB0aGlzLl9yb3cgPSByb3c7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5yb3cgPSByb3c7XG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgcm93KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3JvdztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzb3J0cyh2YWw6IGFueVtdKSB7XG4gICAgdGhpcy5fc29ydHMgPSB2YWw7XG4gICAgdGhpcy5jYWxjU29ydERpciA9IHRoaXMuY2FsY1NvcnREaXIodmFsKTtcbiAgfVxuXG4gIGdldCBzb3J0cygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRzO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHRyZWVTdGF0dXMoc3RhdHVzOiBUcmVlU3RhdHVzKSB7XG4gICAgaWYgKHN0YXR1cyAhPT0gJ2NvbGxhcHNlZCcgJiYgc3RhdHVzICE9PSAnZXhwYW5kZWQnICYmIHN0YXR1cyAhPT0gJ2xvYWRpbmcnICYmIHN0YXR1cyAhPT0gJ2Rpc2FibGVkJykge1xuICAgICAgdGhpcy5fdHJlZVN0YXR1cyA9ICdjb2xsYXBzZWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90cmVlU3RhdHVzID0gc3RhdHVzO1xuICAgIH1cbiAgICB0aGlzLmNlbGxDb250ZXh0LnRyZWVTdGF0dXMgPSB0aGlzLl90cmVlU3RhdHVzO1xuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHRyZWVTdGF0dXMoKTogVHJlZVN0YXR1cyB7XG4gICAgcmV0dXJuIHRoaXMuX3RyZWVTdGF0dXM7XG4gIH1cblxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdjZWxsVGVtcGxhdGUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBjZWxsVGVtcGxhdGU6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjb2x1bW5Dc3NDbGFzc2VzKCk6IGFueSB7XG4gICAgbGV0IGNscyA9ICdkYXRhdGFibGUtYm9keS1jZWxsJztcbiAgICBpZiAodGhpcy5jb2x1bW4uY2VsbENsYXNzKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmNlbGxDbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY2xzICs9ICcgJyArIHRoaXMuY29sdW1uLmNlbGxDbGFzcztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmNlbGxDbGFzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmNvbHVtbi5jZWxsQ2xhc3Moe1xuICAgICAgICAgIHJvdzogdGhpcy5yb3csXG4gICAgICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNscyArPSByZXM7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocmVzKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgICAgICAgICAgaWYgKHJlc1trXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjbHMgKz0gYCAke2t9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLnNvcnREaXIpIHtcbiAgICAgIGNscyArPSAnIHNvcnQtYWN0aXZlJztcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNGb2N1c2VkKSB7XG4gICAgICBjbHMgKz0gJyBhY3RpdmUnO1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0RGlyID09PSBTb3J0RGlyZWN0aW9uLmFzYykge1xuICAgICAgY2xzICs9ICcgc29ydC1hc2MnO1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0RGlyID09PSBTb3J0RGlyZWN0aW9uLmRlc2MpIHtcbiAgICAgIGNscyArPSAnIHNvcnQtZGVzYyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNscztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ud2lkdGg7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbldpZHRoLnB4JylcbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1pbldpZHRoO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXhXaWR0aC5weCcpXG4gIGdldCBtYXhXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5tYXhXaWR0aDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JylcbiAgZ2V0IGhlaWdodCgpOiBzdHJpbmcgfCBudW1iZXIge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMucm93SGVpZ2h0O1xuICAgIGlmIChpc05hTihoZWlnaHQpKSB7XG4gICAgICByZXR1cm4gaGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gaGVpZ2h0ICsgJ3B4JztcbiAgfVxuICBfaXNFZGl0YWJsZTogeyBbYTogc3RyaW5nXTogT2JzZXJ2YWJsZTxib29sZWFuPiB9ID0ge307XG4gIHNhbml0aXplZFZhbHVlOiBhbnk7XG4gIHZhbHVlOiBhbnk7XG4gIHNvcnREaXI6IFNvcnREaXJlY3Rpb247XG4gIGlzRm9jdXNlZCA9IGZhbHNlO1xuICBvbkNoZWNrYm94Q2hhbmdlRm4gPSB0aGlzLm9uQ2hlY2tib3hDaGFuZ2UuYmluZCh0aGlzKTtcbiAgYWN0aXZhdGVGbiA9IHRoaXMuYWN0aXZhdGUuZW1pdC5iaW5kKHRoaXMuYWN0aXZhdGUpO1xuXG4gIGNlbGxDb250ZXh0OiBhbnkgPSB7XG4gICAgb25DaGVja2JveENoYW5nZUZuOiB0aGlzLm9uQ2hlY2tib3hDaGFuZ2VGbixcbiAgICBhY3RpdmF0ZUZuOiB0aGlzLmFjdGl2YXRlRm4sXG4gICAgcm93OiB0aGlzLnJvdyxcbiAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXG4gICAgaXNTZWxlY3RlZDogdGhpcy5pc1NlbGVjdGVkLFxuICAgIHJvd0luZGV4OiB0aGlzLnJvd0luZGV4LFxuICAgIHRyZWVTdGF0dXM6IHRoaXMudHJlZVN0YXR1cyxcbiAgICBvblRyZWVBY3Rpb246IHRoaXMub25UcmVlQWN0aW9uLmJpbmQodGhpcylcbiAgfTtcblxuICBwcml2YXRlIF9pc1NlbGVjdGVkOiBib29sZWFuO1xuICBwcml2YXRlIF9zb3J0czogYW55W107XG4gIHByaXZhdGUgX2NvbHVtbjogVGFibGVDb2x1bW47XG4gIHByaXZhdGUgX3JvdzogYW55O1xuICBwcml2YXRlIF9ncm91cDogYW55O1xuICBwcml2YXRlIF9yb3dIZWlnaHQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfcm93SW5kZXg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfZXhwYW5kZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2VsZW1lbnQ6IGFueTtcbiAgcHJpdmF0ZSBfdHJlZVN0YXR1czogVHJlZVN0YXR1cztcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2VsbFRlbXBsYXRlKSB7XG4gICAgICB0aGlzLmNlbGxUZW1wbGF0ZS5jbGVhcigpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrVmFsdWVVcGRhdGVzKCk6IHZvaWQge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLnJvdyB8fCAhdGhpcy5jb2x1bW4pIHtcbiAgICAgIHZhbHVlID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMuY29sdW1uLiQkdmFsdWVHZXR0ZXIodGhpcy5yb3csIHRoaXMuY29sdW1uLnByb3ApO1xuICAgICAgY29uc3QgdXNlclBpcGU6IFBpcGVUcmFuc2Zvcm0gPSB0aGlzLmNvbHVtbi5waXBlO1xuXG4gICAgICBpZiAodXNlclBpcGUpIHtcbiAgICAgICAgdmFsdWUgPSB1c2VyUGlwZS50cmFuc2Zvcm0odmFsKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2VsbENvbnRleHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2FuaXRpemVkVmFsdWUgPSB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdGhpcy5zdHJpcEh0bWwodmFsdWUpIDogdmFsdWU7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgb25Gb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCk6IHZvaWQge1xuICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgdHlwZTogJ2NsaWNrJyxcbiAgICAgIGV2ZW50LFxuICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkYmxjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uRGJsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgdHlwZTogJ2RibGNsaWNrJyxcbiAgICAgIGV2ZW50LFxuICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgY29uc3QgaXNUYXJnZXRDZWxsID0gZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9lbGVtZW50O1xuXG4gICAgY29uc3QgaXNBY3Rpb24gPVxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5yZXR1cm4gfHxcbiAgICAgIGtleUNvZGUgPT09IEtleXMuZG93biB8fFxuICAgICAga2V5Q29kZSA9PT0gS2V5cy51cCB8fFxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5sZWZ0IHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLnJpZ2h0O1xuXG4gICAgaWYgKGlzQWN0aW9uICYmIGlzVGFyZ2V0Q2VsbCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgICB0eXBlOiAna2V5ZG93bicsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICByb3c6IHRoaXMucm93LFxuICAgICAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkNoZWNrYm94Q2hhbmdlKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgIGV2ZW50LFxuICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50LFxuICAgICAgdHJlZVN0YXR1czogJ2NvbGxhcHNlZCdcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGNTb3J0RGlyKHNvcnRzOiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKCFzb3J0cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNvcnQgPSBzb3J0cy5maW5kKChzOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiBzLnByb3AgPT09IHRoaXMuY29sdW1uLnByb3A7XG4gICAgfSk7XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgcmV0dXJuIHNvcnQuZGlyO1xuICAgIH1cbiAgfVxuXG4gIHN0cmlwSHRtbChodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghaHRtbC5yZXBsYWNlKSB7XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvPFxcLz9bXj5dKyg+fCQpL2csICcnKTtcbiAgfVxuXG4gIG9uVHJlZUFjdGlvbigpIHtcbiAgICB0aGlzLnRyZWVBY3Rpb24uZW1pdCh0aGlzLnJvdyk7XG4gIH1cblxuICBjYWxjTGVmdE1hcmdpbihjb2x1bW46IGFueSwgcm93OiBhbnkpIHtcbiAgICBjb25zdCBsZXZlbEluZGVudCA9IGNvbHVtbi50cmVlTGV2ZWxJbmRlbnQgIT0gbnVsbCA/IGNvbHVtbi50cmVlTGV2ZWxJbmRlbnQgOiA1MDtcbiAgICByZXR1cm4gY29sdW1uLmlzVHJlZUNvbHVtbiA/IHJvdy5sZXZlbCAqIGxldmVsSW5kZW50IDogMDtcbiAgfVxuXG4gIGhhc1RvU2hvd1Rvb2xUaXAocm93LCBmaWVsZCkge1xuICAgIHJldHVybiByb3cgJiYgZmllbGQgJiYgZmllbGQudG9vbHRpcCAmJiBmaWVsZC50b29sdGlwLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXRUb29sdGlwVmFsdWUodmFsdWUsIHJvdywgZmllbGQpIHtcbiAgICBpZiAocm93ICYmIGZpZWxkICYmIGZpZWxkLnRvb2x0aXAgJiYgZmllbGQudG9vbHRpcC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gcm93W2Ake2ZpZWxkLnRvb2x0aXB9YF07XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGdldEljb25zKHJvdywgaWNvbnMpIHtcbiAgICBpZiAocm93ICYmIGljb25zKSB7XG4gICAgICBjb25zdCBpY29uc0FycmF5ID0gaWNvbnMuc3BsaXQoJy4nKTtcbiAgICAgIHJldHVybiBpY29uc0FycmF5Lmxlbmd0aCA+IDEgJiYgcm93W2ljb25zQXJyYXlbMF1dID8gcm93W2ljb25zQXJyYXlbMF1dW2ljb25zQXJyYXlbMV1dIHx8IFtdIDogcm93W2ljb25zXSB8fCBbXTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgc2VsZWN0RmllbGRWYWx1ZShyb3csIHByb3ApIHtcbiAgICBpZiAocm93ICYmIHByb3ApIHtcbiAgICAgIGNvbnN0IHByb3BBcnJheSA9IHByb3Auc3BsaXQoJy4nKTtcbiAgICAgIHJldHVybiBwcm9wQXJyYXkubGVuZ3RoID4gMSAmJiByb3dbcHJvcEFycmF5WzBdXSA/IHJvd1twcm9wQXJyYXlbMF1dW3Byb3BBcnJheVsxXV0gOiByb3dbcHJvcF07XG4gICAgfVxuICAgIHJldHVybiAnICc7XG4gIH1cblxuICBvbkNsaWNrUm93QWN0aW9uQnV0dG9uKGV2ZW50LCBmaWVsZCwgcm93KSB7XG4gICAgaWYgKGZpZWxkICYmIHJvdykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZmllbGQuYWN0aW9uKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgc2FuYXRpemVIdG1sKGh0bWw6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sKSBhcyBzdHJpbmc7XG4gIH1cblxuICBpc0VkaXRhYmxlKGZpZWxkOiBhbnksIHJvdzogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgaWYgKGZpZWxkICYmIHJvdykge1xuICAgICAgaWYgKCF0aGlzLl9pc0VkaXRhYmxlW2ZpZWxkLnByb3AgKyByb3cuaWRdKSB7XG4gICAgICAgIHRoaXMuX2lzRWRpdGFibGVbZmllbGQucHJvcCArIHJvdy5pZF0gPSBmaWVsZC5lZGl0YWJsZShyb3cpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2lzRWRpdGFibGVbZmllbGQucHJvcCArIHJvdy5pZF07XG4gICAgfVxuICAgIHJldHVybiBvZihmYWxzZSk7XG4gIH1cblxuICB1cGRhdGVTZWxlY3QoZmllbGQsIHJvdzogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgcm93W2ZpZWxkLnByb3BdID0gbmV3VmFsdWU7XG4gICAgaWYgKGZpZWxkLm9uRWRpdCkge1xuICAgICAgZmllbGQub25FZGl0KHJvdyk7XG4gICAgfVxuICB9XG5cbiAgZWRpdEZpZWxkKGZpZWxkLCByb3c6IGFueSwgbmV3VmFsdWU6IGFueSkge1xuICAgIGZpZWxkLm9uRWRpdCh7IC4uLnJvdywgW2ZpZWxkLnByb3BdOiBuZXdWYWx1ZSB9KTtcbiAgfVxufVxuIl19