/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MouseEvent } from '../../events';
import { SortType } from '../../types/sort.type';
import { SelectionType } from '../../types/selection.type';
import { nextSortDir } from '../../utils/sort';
import { SortDirection } from '../../types/sort-direction.type';
export class DataTableHeaderCellComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
        this.sort = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
        this.filter = new EventEmitter();
        this.sortFn = this.onSort.bind(this);
        this.selectFn = this.select.emit.bind(this.select);
        this.filterCache = {};
        this.cellContext = {
            column: this.column,
            sortDir: this.sortDir,
            sortFn: this.sortFn,
            allRowsSelected: this.allRowsSelected,
            selectFn: this.selectFn
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set allRowsSelected(value) {
        this._allRowsSelected = value;
        this.cellContext.allRowsSelected = value;
    }
    /**
     * @return {?}
     */
    get allRowsSelected() {
        return this._allRowsSelected;
    }
    /**
     * @param {?} column
     * @return {?}
     */
    set column(column) {
        this._column = column;
        this.cellContext.column = column;
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get column() {
        return this._column;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set sorts(val) {
        this._sorts = val;
        this.sortDir = this.calcSortDir(val);
        this.cellContext.sortDir = this.sortDir;
        this.sortClass = this.calcSortClass(this.sortDir);
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get sorts() {
        return this._sorts;
    }
    /**
     * @return {?}
     */
    get columnCssClasses() {
        /** @type {?} */
        let cls = 'datatable-header-cell';
        if (this.column.sortable)
            cls += ' sortable';
        if (this.column.resizeable)
            cls += ' resizeable';
        if (this.column.headerClass) {
            if (typeof this.column.headerClass === 'string') {
                cls += ' ' + this.column.headerClass;
            }
            else if (typeof this.column.headerClass === 'function') {
                /** @type {?} */
                const res = this.column.headerClass({
                    column: this.column
                });
                if (typeof res === 'string') {
                    cls += res;
                }
                else if (typeof res === 'object') {
                    /** @type {?} */
                    const keys = Object.keys(res);
                    for (const k of keys) {
                        if (res[k] === true)
                            cls += ` ${k}`;
                    }
                }
            }
        }
        /** @type {?} */
        const sortDir = this.sortDir;
        if (sortDir) {
            cls += ` sort-active sort-${sortDir}`;
        }
        return cls;
    }
    /**
     * @return {?}
     */
    get name() {
        // guaranteed to have a value by setColumnDefaults() in column-helper.ts
        return this.column.headerTemplate === undefined ? this.column.name : undefined;
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
    get width() {
        return this.column.width;
    }
    /**
     * @return {?}
     */
    get isCheckboxable() {
        return this.column.checkboxable && this.column.headerCheckboxable && this.selectionType === SelectionType.checkbox;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onContextmenu($event) {
        this.columnContextmenu.emit({ event: $event, column: this.column });
    }
    /**
     * @param {?} sorts
     * @return {?}
     */
    calcSortDir(sorts) {
        if (sorts && this.column) {
            /** @type {?} */
            const sort = sorts.find((/**
             * @param {?} s
             * @return {?}
             */
            (s) => {
                return s.prop === this.column.prop;
            }));
            if (sort)
                return sort.dir;
        }
    }
    /**
     * @return {?}
     */
    onSort() {
        if (!this.column.sortable)
            return;
        /** @type {?} */
        const newValue = nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue
        });
    }
    /**
     * @param {?} sortDir
     * @return {?}
     */
    calcSortClass(sortDir) {
        if (sortDir === SortDirection.asc) {
            return `sort-btn sort-asc ${this.sortAscendingIcon}`;
        }
        else if (sortDir === SortDirection.desc) {
            return `sort-btn sort-desc ${this.sortDescendingIcon}`;
        }
        else {
            return `sort-btn`;
        }
    }
    /**
     * @param {?} column
     * @return {?}
     */
    setFilter(column) {
        this.filter.emit({
            column,
            value: this.filterCache[column]
        });
    }
    /**
     * @param {?} column
     * @return {?}
     */
    resetFilter(column) {
        this.filterCache[column] = '';
        this.filter.emit({
            column
        });
    }
}
DataTableHeaderCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-header-cell',
                template: `
    <div class="datatable-header-cell-template-wrap">
      <ng-container *ngIf="column.filter">
        <mat-form-field class="filter-header">
          <input
            matInput
            [placeholder]="column.name"
            [(ngModel)]="filterCache[column.prop]"
            (ngModelChange)="setFilter(column.prop)"
          />
          <button
            mat-button
            *ngIf="filterCache[column.prop]"
            matSuffix
            mat-icon-button
            aria-label="Clear"
            (click)="resetFilter(column.prop)"
          >
            <mat-icon class="mat-icon material-icons">close</mat-icon>
          </button>
        </mat-form-field>
        <button mat-icon-button>
          <mat-icon class="mat-icon material-icons" (click)="onSort()">sort</mat-icon>
        </button>
      </ng-container>
      <ng-container *ngIf="!column.filter">
        <ng-template
          *ngIf="isTarget"
          [ngTemplateOutlet]="targetMarkerTemplate"
          [ngTemplateOutletContext]="targetMarkerContext"
        >
        </ng-template>
        <label *ngIf="isCheckboxable" class="datatable-checkbox">
          <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit(!allRowsSelected)" />
        </label>
        <span *ngIf="!column.headerTemplate" class="datatable-header-cell-wrapper">
          <span class="datatable-header-cell-label draggable" (click)="onSort()" [innerHTML]="name"> </span>
        </span>
        <ng-template
          *ngIf="column.headerTemplate"
          [ngTemplateOutlet]="column.headerTemplate"
          [ngTemplateOutletContext]="cellContext"
        >
        </ng-template>
        <span (click)="onSort()" [class]="sortClass"> </span>
      </ng-container>
    </div>
  `,
                host: {
                    class: 'datatable-header-cell'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DataTableHeaderCellComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
DataTableHeaderCellComponent.propDecorators = {
    sortType: [{ type: Input }],
    sortAscendingIcon: [{ type: Input }],
    sortDescendingIcon: [{ type: Input }],
    isTarget: [{ type: Input }],
    targetMarkerTemplate: [{ type: Input }],
    targetMarkerContext: [{ type: Input }],
    allRowsSelected: [{ type: Input }],
    selectionType: [{ type: Input }],
    column: [{ type: Input }],
    headerHeight: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
    sorts: [{ type: Input }],
    sort: [{ type: Output }],
    select: [{ type: Output }],
    columnContextmenu: [{ type: Output }],
    filter: [{ type: Output }],
    columnCssClasses: [{ type: HostBinding, args: ['class',] }],
    name: [{ type: HostBinding, args: ['attr.title',] }],
    minWidth: [{ type: HostBinding, args: ['style.minWidth.px',] }],
    maxWidth: [{ type: HostBinding, args: ['style.maxWidth.px',] }],
    width: [{ type: HostBinding, args: ['style.width.px',] }],
    onContextmenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortType;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortAscendingIcon;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortDescendingIcon;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.isTarget;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.targetMarkerTemplate;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.targetMarkerContext;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype._allRowsSelected;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.selectionType;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.headerHeight;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sort;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.select;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.columnContextmenu;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.filter;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortFn;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortClass;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortDir;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.selectFn;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.filterCache;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.cellContext;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderCellComponent.prototype._column;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderCellComponent.prototype._sorts;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderCellComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxZQUFZLEVBQ1osTUFBTSxFQUNOLFdBQVcsRUFDWCxZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQTJEaEUsTUFBTSxPQUFPLDRCQUE0Qjs7OztJQStIdkMsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFoRi9CLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLENBQXFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQTREekQsV0FBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR2hDLGFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLGdCQUFXLEdB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ICBJbnB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudHMnO1xuaW1wb3J0IHsgU29ydFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LnR5cGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NlbGVjdGlvbi50eXBlJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xuaW1wb3J0IHsgbmV4dFNvcnREaXIgfSBmcm9tICcuLi8uLi91dGlscy9zb3J0JztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LWRpcmVjdGlvbi50eXBlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtaGVhZGVyLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWNlbGwtdGVtcGxhdGUtd3JhcFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbi5maWx0ZXJcIj5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZmlsdGVyLWhlYWRlclwiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbWF0SW5wdXRcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb2x1bW4ubmFtZVwiXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cImZpbHRlckNhY2hlW2NvbHVtbi5wcm9wXVwiXG4gICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJzZXRGaWx0ZXIoY29sdW1uLnByb3ApXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG1hdC1idXR0b25cbiAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyQ2FjaGVbY29sdW1uLnByb3BdXCJcbiAgICAgICAgICAgIG1hdFN1ZmZpeFxuICAgICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiQ2xlYXJcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInJlc2V0RmlsdGVyKGNvbHVtbi5wcm9wKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uPlxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1pY29uIG1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cIm9uU29ydCgpXCI+c29ydDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNvbHVtbi5maWx0ZXJcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgKm5nSWY9XCJpc1RhcmdldFwiXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFyZ2V0TWFya2VyVGVtcGxhdGVcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ0YXJnZXRNYXJrZXJDb250ZXh0XCJcbiAgICAgICAgPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJpc0NoZWNrYm94YWJsZVwiIGNsYXNzPVwiZGF0YXRhYmxlLWNoZWNrYm94XCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImFsbFJvd3NTZWxlY3RlZFwiIChjaGFuZ2UpPVwic2VsZWN0LmVtaXQoIWFsbFJvd3NTZWxlY3RlZClcIiAvPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIiFjb2x1bW4uaGVhZGVyVGVtcGxhdGVcIiBjbGFzcz1cImRhdGF0YWJsZS1oZWFkZXItY2VsbC13cmFwcGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWNlbGwtbGFiZWwgZHJhZ2dhYmxlXCIgKGNsaWNrKT1cIm9uU29ydCgpXCIgW2lubmVySFRNTF09XCJuYW1lXCI+IDwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi5oZWFkZXJUZW1wbGF0ZVwiXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLmhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY2VsbENvbnRleHRcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxzcGFuIChjbGljayk9XCJvblNvcnQoKVwiIFtjbGFzc109XCJzb3J0Q2xhc3NcIj4gPC9zcGFuPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2RhdGF0YWJsZS1oZWFkZXItY2VsbCdcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlSGVhZGVyQ2VsbENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNvcnRUeXBlOiBTb3J0VHlwZTtcbiAgQElucHV0KCkgc29ydEFzY2VuZGluZ0ljb246IHN0cmluZztcbiAgQElucHV0KCkgc29ydERlc2NlbmRpbmdJY29uOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgaXNUYXJnZXQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRhcmdldE1hcmtlclRlbXBsYXRlOiBhbnk7XG4gIEBJbnB1dCgpIHRhcmdldE1hcmtlckNvbnRleHQ6IGFueTtcblxuICBfYWxsUm93c1NlbGVjdGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHNldCBhbGxSb3dzU2VsZWN0ZWQodmFsdWUpIHtcbiAgICB0aGlzLl9hbGxSb3dzU2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICB0aGlzLmNlbGxDb250ZXh0LmFsbFJvd3NTZWxlY3RlZCA9IHZhbHVlO1xuICB9XG4gIGdldCBhbGxSb3dzU2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbFJvd3NTZWxlY3RlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNlbGVjdGlvblR5cGU6IFNlbGVjdGlvblR5cGU7XG5cbiAgQElucHV0KCkgc2V0IGNvbHVtbihjb2x1bW46IFRhYmxlQ29sdW1uKSB7XG4gICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xuICAgIHRoaXMuY2VsbENvbnRleHQuY29sdW1uID0gY29sdW1uO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgY29sdW1uKCk6IFRhYmxlQ29sdW1uIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQucHgnKVxuICBASW5wdXQoKVxuICBoZWFkZXJIZWlnaHQ6IG51bWJlcjtcblxuICBASW5wdXQoKSBzZXQgc29ydHModmFsOiBhbnlbXSkge1xuICAgIHRoaXMuX3NvcnRzID0gdmFsO1xuICAgIHRoaXMuc29ydERpciA9IHRoaXMuY2FsY1NvcnREaXIodmFsKTtcbiAgICB0aGlzLmNlbGxDb250ZXh0LnNvcnREaXIgPSB0aGlzLnNvcnREaXI7XG4gICAgdGhpcy5zb3J0Q2xhc3MgPSB0aGlzLmNhbGNTb3J0Q2xhc3ModGhpcy5zb3J0RGlyKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHNvcnRzKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydHM7XG4gIH1cblxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29sdW1uQ29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IE1vdXNlRXZlbnQ7IGNvbHVtbjogYW55IH0+KGZhbHNlKTtcbiAgQE91dHB1dCgpIGZpbHRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjb2x1bW5Dc3NDbGFzc2VzKCk6IGFueSB7XG4gICAgbGV0IGNscyA9ICdkYXRhdGFibGUtaGVhZGVyLWNlbGwnO1xuXG4gICAgaWYgKHRoaXMuY29sdW1uLnNvcnRhYmxlKSBjbHMgKz0gJyBzb3J0YWJsZSc7XG4gICAgaWYgKHRoaXMuY29sdW1uLnJlc2l6ZWFibGUpIGNscyArPSAnIHJlc2l6ZWFibGUnO1xuICAgIGlmICh0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY2xzICs9ICcgJyArIHRoaXMuY29sdW1uLmhlYWRlckNsYXNzO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3Moe1xuICAgICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY2xzICs9IHJlcztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyZXMpO1xuICAgICAgICAgIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgICAgICAgICBpZiAocmVzW2tdID09PSB0cnVlKSBjbHMgKz0gYCAke2t9YDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzb3J0RGlyID0gdGhpcy5zb3J0RGlyO1xuICAgIGlmIChzb3J0RGlyKSB7XG4gICAgICBjbHMgKz0gYCBzb3J0LWFjdGl2ZSBzb3J0LSR7c29ydERpcn1gO1xuICAgIH1cblxuICAgIHJldHVybiBjbHM7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGl0bGUnKVxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIGd1YXJhbnRlZWQgdG8gaGF2ZSBhIHZhbHVlIGJ5IHNldENvbHVtbkRlZmF1bHRzKCkgaW4gY29sdW1uLWhlbHBlci50c1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5oZWFkZXJUZW1wbGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5jb2x1bW4ubmFtZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWluV2lkdGgucHgnKVxuICBnZXQgbWluV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWluV2lkdGg7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1heFdpZHRoLnB4JylcbiAgZ2V0IG1heFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1heFdpZHRoO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC5weCcpXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi53aWR0aDtcbiAgfVxuXG4gIGdldCBpc0NoZWNrYm94YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4uY2hlY2tib3hhYmxlICYmIHRoaXMuY29sdW1uLmhlYWRlckNoZWNrYm94YWJsZSAmJiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2hlY2tib3g7XG4gIH1cblxuICBzb3J0Rm4gPSB0aGlzLm9uU29ydC5iaW5kKHRoaXMpO1xuICBzb3J0Q2xhc3M6IHN0cmluZztcbiAgc29ydERpcjogU29ydERpcmVjdGlvbjtcbiAgc2VsZWN0Rm4gPSB0aGlzLnNlbGVjdC5lbWl0LmJpbmQodGhpcy5zZWxlY3QpO1xuICBmaWx0ZXJDYWNoZSA9IHt9O1xuXG4gIGNlbGxDb250ZXh0OiBhbnkgPSB7XG4gICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICBzb3J0RGlyOiB0aGlzLnNvcnREaXIsXG4gICAgc29ydEZuOiB0aGlzLnNvcnRGbixcbiAgICBhbGxSb3dzU2VsZWN0ZWQ6IHRoaXMuYWxsUm93c1NlbGVjdGVkLFxuICAgIHNlbGVjdEZuOiB0aGlzLnNlbGVjdEZuXG4gIH07XG5cbiAgcHJpdmF0ZSBfY29sdW1uOiBUYWJsZUNvbHVtbjtcbiAgcHJpdmF0ZSBfc29ydHM6IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcbiAgb25Db250ZXh0bWVudSgkZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmNvbHVtbkNvbnRleHRtZW51LmVtaXQoeyBldmVudDogJGV2ZW50LCBjb2x1bW46IHRoaXMuY29sdW1uIH0pO1xuICB9XG5cbiAgY2FsY1NvcnREaXIoc29ydHM6IGFueVtdKTogYW55IHtcbiAgICBpZiAoc29ydHMgJiYgdGhpcy5jb2x1bW4pIHtcbiAgICAgIGNvbnN0IHNvcnQgPSBzb3J0cy5maW5kKChzOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHMucHJvcCA9PT0gdGhpcy5jb2x1bW4ucHJvcDtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc29ydCkgcmV0dXJuIHNvcnQuZGlyO1xuICAgIH1cbiAgfVxuXG4gIG9uU29ydCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29sdW1uLnNvcnRhYmxlKSByZXR1cm47XG5cbiAgICBjb25zdCBuZXdWYWx1ZSA9IG5leHRTb3J0RGlyKHRoaXMuc29ydFR5cGUsIHRoaXMuc29ydERpcik7XG4gICAgdGhpcy5zb3J0LmVtaXQoe1xuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgIHByZXZWYWx1ZTogdGhpcy5zb3J0RGlyLFxuICAgICAgbmV3VmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGNTb3J0Q2xhc3Moc29ydERpcjogU29ydERpcmVjdGlvbik6IHN0cmluZyB7XG4gICAgaWYgKHNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uYXNjKSB7XG4gICAgICByZXR1cm4gYHNvcnQtYnRuIHNvcnQtYXNjICR7dGhpcy5zb3J0QXNjZW5kaW5nSWNvbn1gO1xuICAgIH0gZWxzZSBpZiAoc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5kZXNjKSB7XG4gICAgICByZXR1cm4gYHNvcnQtYnRuIHNvcnQtZGVzYyAke3RoaXMuc29ydERlc2NlbmRpbmdJY29ufWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgc29ydC1idG5gO1xuICAgIH1cbiAgfVxuXG4gIHNldEZpbHRlcihjb2x1bW4pIHtcbiAgICB0aGlzLmZpbHRlci5lbWl0KHtcbiAgICAgIGNvbHVtbixcbiAgICAgIHZhbHVlOiB0aGlzLmZpbHRlckNhY2hlW2NvbHVtbl1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0RmlsdGVyKGNvbHVtbikge1xuICAgIHRoaXMuZmlsdGVyQ2FjaGVbY29sdW1uXSA9ICcnO1xuICAgIHRoaXMuZmlsdGVyLmVtaXQoe1xuICAgICAgY29sdW1uXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==