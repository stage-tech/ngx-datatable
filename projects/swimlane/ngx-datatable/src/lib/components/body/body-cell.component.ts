import {
  Component,
  Input,
  PipeTransform,
  HostBinding,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewContainerRef,
  OnDestroy,
  DoCheck,
  ChangeDetectionStrategy
} from '@angular/core';

import { TableColumn } from '../../types/table-column.type';
import { MouseEvent, KeyboardEvent } from '../../events';
import { SortDirection } from '../../types/sort-direction.type';
import { Keys } from '../../utils/keys';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

export type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';

@Component({
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
            (click)="i.action && i.action(row)"
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
          (click)="onClickField(row, column.onClickAction || column.action, $event)"
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
})
export class DataTableBodyCellComponent implements DoCheck, OnDestroy {
  @Input() displayCheck: (row: any, column?: TableColumn, value?: any) => boolean;

  @Input() set rowDetail(rowDetail: any) {
    this._rowDetail = rowDetail;
  }

  get rowDetail(): any {
    return this._rowDetail;
  }

  @Input() set group(group: any) {
    this._group = group;
    this.cellContext.group = group;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get group() {
    return this._group;
  }

  @Input() set rowHeight(val: number) {
    this._rowHeight = val;
    this.cellContext.rowHeight = val;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get rowHeight() {
    return this._rowHeight;
  }

  @Input() set isSelected(val: boolean) {
    this._isSelected = val;
    this.cellContext.isSelected = val;
    this.cd.markForCheck();
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  @Input() set expanded(val: boolean) {
    this._expanded = val;
    this.cellContext.expanded = val;
    this.cd.markForCheck();
  }

  get expanded(): boolean {
    return this._expanded;
  }

  @Input() set rowIndex(val: number) {
    this._rowIndex = val;
    this.cellContext.rowIndex = val;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get rowIndex(): number {
    return this._rowIndex;
  }

  @Input() set column(column: TableColumn) {
    this._column = column;
    this.cellContext.column = column;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get column(): TableColumn {
    return this._column;
  }

  @Input() set row(row: any) {
    this._row = row;
    this.cellContext.row = row;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get row(): any {
    return this._row;
  }

  @Input() set sorts(val: any[]) {
    this._sorts = val;
    this.calcSortDir = this.calcSortDir(val);
  }

  get sorts(): any[] {
    return this._sorts;
  }

  @Input() set treeStatus(status: TreeStatus) {
    if (status !== 'collapsed' && status !== 'expanded' && status !== 'loading' && status !== 'disabled') {
      this._treeStatus = 'collapsed';
    } else {
      this._treeStatus = status;
    }
    this.cellContext.treeStatus = this._treeStatus;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get treeStatus(): TreeStatus {
    return this._treeStatus;
  }

  @Output() activate: EventEmitter<any> = new EventEmitter();

  @Output() treeAction: EventEmitter<any> = new EventEmitter();

  @ViewChild('cellTemplate', { read: ViewContainerRef, static: true })
  cellTemplate: ViewContainerRef;

  @HostBinding('class')
  get columnCssClasses(): any {
    let cls = 'datatable-body-cell';
    if (this.column.cellClass) {
      if (typeof this.column.cellClass === 'string') {
        cls += ' ' + this.column.cellClass;
      } else if (typeof this.column.cellClass === 'function') {
        const res = this.column.cellClass({
          row: this.row,
          group: this.group,
          column: this.column,
          value: this.value,
          rowHeight: this.rowHeight
        });

        if (typeof res === 'string') {
          cls += res;
        } else if (typeof res === 'object') {
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

  @HostBinding('style.width.px')
  get width(): number {
    return this.column.width;
  }

  @HostBinding('style.minWidth.px')
  get minWidth(): number {
    return this.column.minWidth;
  }

  @HostBinding('style.maxWidth.px')
  get maxWidth(): number {
    return this.column.maxWidth;
  }

  @HostBinding('style.height')
  get height(): string | number {
    const height = this.rowHeight;
    if (isNaN(height)) {
      return height;
    }
    return height + 'px';
  }
  _isEditable: { [a: string]: Observable<boolean> } = {};
  sanitizedValue: any;
  value: any;
  sortDir: SortDirection;
  isFocused = false;
  onCheckboxChangeFn = this.onCheckboxChange.bind(this);
  activateFn = this.activate.emit.bind(this.activate);

  cellContext: any = {
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

  private _isSelected: boolean;
  private _sorts: any[];
  private _column: TableColumn;
  private _row: any;
  private _rowDetail: any;
  private _group: any;
  private _rowHeight: number;
  private _rowIndex: number;
  private _expanded: boolean;
  private _element: any;
  private _treeStatus: TreeStatus;

  constructor(element: ElementRef, private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) {
    this._element = element.nativeElement;
  }

  ngDoCheck(): void {
    this.checkValueUpdates();
  }

  ngOnDestroy(): void {
    if (this.cellTemplate) {
      this.cellTemplate.clear();
    }
  }

  checkValueUpdates(): void {
    let value = '';

    if (!this.row || !this.column) {
      value = '';
    } else {
      const val = this.column.$$valueGetter(this.row, this.column.prop);
      const userPipe: PipeTransform = this.column.pipe;

      if (userPipe) {
        value = userPipe.transform(val);
      } else if (value !== undefined) {
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

  @HostListener('focus')
  onFocus(): void {
    this.isFocused = true;
  }

  @HostListener('blur')
  onBlur(): void {
    this.isFocused = false;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
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

  @HostListener('mouseup', ['$event'])
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

  @HostListener('dblclick', ['$event'])
  onDblClick(event: MouseEvent): void {
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

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isTargetCell = event.target === this._element;

    const isAction =
      keyCode === Keys.return ||
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

  onCheckboxChange(event: any): void {
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

  calcSortDir(sorts: any[]): any {
    if (!sorts) {
      return;
    }

    const sort = sorts.find((s: any) => {
      return s.prop === this.column.prop;
    });

    if (sort) {
      return sort.dir;
    }
  }

  stripHtml(html: string): string {
    if (!html.replace) {
      return html;
    }
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  onTreeAction() {
    this.treeAction.emit(this.row);
  }

  calcLeftMargin(column: any, row: any) {
    const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? row.level * levelIndent : 0;
  }

  hasToShowToolTip(row, field) {
    return row && field && field.tooltip && field.tooltip.length > 0;
  }

  getTooltipValue(value, row, field) {
    if (row && field && field.tooltip && field.tooltip.length > 0) {
      return row[`${field.tooltip}`] || field.tooltip;
    }
    return value;
  }

  getIcons(row, icons) {
    if (row && icons) {
      const iconsArray = icons.split('.');
      return iconsArray.length > 1 && row[iconsArray[0]] ? row[iconsArray[0]][iconsArray[1]] || [] : row[icons] || [];
    }
    return [];
  }

  selectFieldValue(row, prop) {
    if (row && prop) {
      const propArray = prop.split('.');
      return propArray.length > 1 && row[propArray[0]] ? row[propArray[0]][propArray[1]] : row[prop];
    }
    return ' ';
  }

  onClickRowActionButton(event, field, row) {
    if (field && row) {
      event.preventDefault();
      event.stopPropagation();
      field.action(row);
    }
  }

  sanatizeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html) as string;
  }

  isEditable(field: any, row: any): Observable<boolean> {
    if (field && row) {
      if (!this._isEditable[field.prop + row.id]) {
        this._isEditable[field.prop + row.id] = field.editable(row);
      }
      return this._isEditable[field.prop + row.id];
    }
    return of(false);
  }

  updateSelect(field, row: any, newValue: any) {
    row[field.prop] = newValue;
    if (field.onEdit) {
      field.onEdit(row);
    }
  }

  editField(field, row: any, newValue: any) {
    field.onEdit({ ...row, [field.prop]: newValue });
  }

  toggleExpandRow(row, event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.rowDetail) {
      this.rowDetail.toggleExpandRow(row);
    }
  }

  onClickField(row, action, event) {
    if (row && action) {
      event.preventDefault();
      event.stopPropagation();

      action(row);
    }
  }
}
