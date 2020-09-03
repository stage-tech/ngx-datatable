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
            column
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxZQUFZLEVBQ1osTUFBTSxFQUNOLFdBQVcsRUFDWCxZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQTJEaEUsTUFBTSxPQUFPLDRCQUE0Qjs7OztJQStIdkMsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFoRi9CLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLENBQXFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQTREekQsV0FBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR2hDLGFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLGdCQUFXLEdB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0NUO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsdUJBQXVCO2lCQUMvQjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQWpFQyxpQkFBaUI7Ozt1QkFtRWhCLEtBQUs7Z0NBQ0wsS0FBSztpQ0FDTCxLQUFLO3VCQUVMLEtBQUs7bUNBQ0wsS0FBSztrQ0FDTCxLQUFLOzhCQUlMLEtBQUs7NEJBUUwsS0FBSztxQkFFTCxLQUFLOzJCQVVMLFdBQVcsU0FBQyxpQkFBaUIsY0FDN0IsS0FBSztvQkFHTCxLQUFLO21CQVlMLE1BQU07cUJBQ04sTUFBTTtnQ0FDTixNQUFNO3FCQUNOLE1BQU07K0JBRU4sV0FBVyxTQUFDLE9BQU87bUJBaUNuQixXQUFXLFNBQUMsWUFBWTt1QkFNeEIsV0FBVyxTQUFDLG1CQUFtQjt1QkFLL0IsV0FBVyxTQUFDLG1CQUFtQjtvQkFLL0IsV0FBVyxTQUFDLGdCQUFnQjs0QkE0QjVCLFlBQVksU0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUFoSXZDLGdEQUE0Qjs7SUFDNUIseURBQW1DOztJQUNuQywwREFBb0M7O0lBRXBDLGdEQUEyQjs7SUFDM0IsNERBQW1DOztJQUNuQywyREFBa0M7O0lBRWxDLHdEQUEwQjs7SUFVMUIscURBQXNDOztJQVl0QyxvREFFcUI7O0lBY3JCLDRDQUF1RDs7SUFDdkQsOENBQXlEOztJQUN6RCx5REFBMEY7O0lBQzFGLDhDQUF5RDs7SUE0RHpELDhDQUFnQzs7SUFDaEMsaURBQWtCOztJQUNsQiwrQ0FBdUI7O0lBQ3ZCLGdEQUE4Qzs7SUFDOUMsbURBQWlCOztJQUVqQixtREFNRTs7Ozs7SUFFRiwrQ0FBNkI7Ozs7O0lBQzdCLDhDQUFzQjs7Ozs7SUFFViwwQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uLy4uL2V2ZW50cyc7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQudHlwZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvc2VsZWN0aW9uLnR5cGUnO1xuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuLi8uLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XG5pbXBvcnQgeyBuZXh0U29ydERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3NvcnQnO1xuaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQtZGlyZWN0aW9uLnR5cGUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1oZWFkZXItY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImRhdGF0YWJsZS1oZWFkZXItY2VsbC10ZW1wbGF0ZS13cmFwXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmZpbHRlclwiPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJmaWx0ZXItaGVhZGVyXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbHVtbi5uYW1lXCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZmlsdGVyQ2FjaGVbY29sdW1uLnByb3BdXCJcbiAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInNldEZpbHRlcihjb2x1bW4ucHJvcClcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgbWF0LWJ1dHRvblxuICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJDYWNoZVtjb2x1bW4ucHJvcF1cIlxuICAgICAgICAgICAgbWF0U3VmZml4XG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJDbGVhclwiXG4gICAgICAgICAgICAoY2xpY2spPVwicmVzZXRGaWx0ZXIoY29sdW1uLnByb3ApXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaWNvbiBtYXRlcmlhbC1pY29uc1wiPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24+XG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWljb24gbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwib25Tb3J0KClcIj5zb3J0PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY29sdW1uLmZpbHRlclwiPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAqbmdJZj1cImlzVGFyZ2V0XCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YXJnZXRNYXJrZXJUZW1wbGF0ZVwiXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInRhcmdldE1hcmtlckNvbnRleHRcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxsYWJlbCAqbmdJZj1cImlzQ2hlY2tib3hhYmxlXCIgY2xhc3M9XCJkYXRhdGFibGUtY2hlY2tib3hcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiYWxsUm93c1NlbGVjdGVkXCIgKGNoYW5nZSk9XCJzZWxlY3QuZW1pdCghYWxsUm93c1NlbGVjdGVkKVwiIC8+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIWNvbHVtbi5oZWFkZXJUZW1wbGF0ZVwiIGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1jZWxsLXdyYXBwZXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGF0YWJsZS1oZWFkZXItY2VsbC1sYWJlbCBkcmFnZ2FibGVcIiAoY2xpY2spPVwib25Tb3J0KClcIiBbaW5uZXJIVE1MXT1cIm5hbWVcIj4gPC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4uaGVhZGVyVGVtcGxhdGVcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjZWxsQ29udGV4dFwiXG4gICAgICAgID5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPHNwYW4gKGNsaWNrKT1cIm9uU29ydCgpXCIgW2NsYXNzXT1cInNvcnRDbGFzc1wiPiA8L3NwYW4+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXJDZWxsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgc29ydFR5cGU6IFNvcnRUeXBlO1xuICBASW5wdXQoKSBzb3J0QXNjZW5kaW5nSWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBzb3J0RGVzY2VuZGluZ0ljb246IHN0cmluZztcblxuICBASW5wdXQoKSBpc1RhcmdldDogYm9vbGVhbjtcbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyVGVtcGxhdGU6IGFueTtcbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyQ29udGV4dDogYW55O1xuXG4gIF9hbGxSb3dzU2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgc2V0IGFsbFJvd3NTZWxlY3RlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2FsbFJvd3NTZWxlY3RlZCA9IHZhbHVlO1xuICAgIHRoaXMuY2VsbENvbnRleHQuYWxsUm93c1NlbGVjdGVkID0gdmFsdWU7XG4gIH1cbiAgZ2V0IGFsbFJvd3NTZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsUm93c1NlbGVjdGVkO1xuICB9XG5cbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcblxuICBASW5wdXQoKSBzZXQgY29sdW1uKGNvbHVtbjogVGFibGVDb2x1bW4pIHtcbiAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XG4gICAgdGhpcy5jZWxsQ29udGV4dC5jb2x1bW4gPSBjb2x1bW47XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBjb2x1bW4oKTogVGFibGVDb2x1bW4ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW47XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpXG4gIEBJbnB1dCgpXG4gIGhlYWRlckhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHNldCBzb3J0cyh2YWw6IGFueVtdKSB7XG4gICAgdGhpcy5fc29ydHMgPSB2YWw7XG4gICAgdGhpcy5zb3J0RGlyID0gdGhpcy5jYWxjU29ydERpcih2YWwpO1xuICAgIHRoaXMuY2VsbENvbnRleHQuc29ydERpciA9IHRoaXMuc29ydERpcjtcbiAgICB0aGlzLnNvcnRDbGFzcyA9IHRoaXMuY2FsY1NvcnRDbGFzcyh0aGlzLnNvcnREaXIpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgc29ydHMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9zb3J0cztcbiAgfVxuXG4gIEBPdXRwdXQoKSBzb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjb2x1bW5Db250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgY29sdW1uOiBhbnkgfT4oZmFsc2UpO1xuICBAT3V0cHV0KCkgZmlsdGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGNvbHVtbkNzc0NsYXNzZXMoKTogYW55IHtcbiAgICBsZXQgY2xzID0gJ2RhdGF0YWJsZS1oZWFkZXItY2VsbCc7XG5cbiAgICBpZiAodGhpcy5jb2x1bW4uc29ydGFibGUpIGNscyArPSAnIHNvcnRhYmxlJztcbiAgICBpZiAodGhpcy5jb2x1bW4ucmVzaXplYWJsZSkgY2xzICs9ICcgcmVzaXplYWJsZSc7XG4gICAgaWYgKHRoaXMuY29sdW1uLmhlYWRlckNsYXNzKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmhlYWRlckNsYXNzID09PSAnc3RyaW5nJykge1xuICAgICAgICBjbHMgKz0gJyAnICsgdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3M7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcyh7XG4gICAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjbHMgKz0gcmVzO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcyk7XG4gICAgICAgICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICAgICAgICAgIGlmIChyZXNba10gPT09IHRydWUpIGNscyArPSBgICR7a31gO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNvcnREaXIgPSB0aGlzLnNvcnREaXI7XG4gICAgaWYgKHNvcnREaXIpIHtcbiAgICAgIGNscyArPSBgIHNvcnQtYWN0aXZlIHNvcnQtJHtzb3J0RGlyfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNscztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci50aXRsZScpXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gZ3VhcmFudGVlZCB0byBoYXZlIGEgdmFsdWUgYnkgc2V0Q29sdW1uRGVmYXVsdHMoKSBpbiBjb2x1bW4taGVscGVyLnRzXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLmhlYWRlclRlbXBsYXRlID09PSB1bmRlZmluZWQgPyB0aGlzLmNvbHVtbi5uYW1lIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5taW5XaWR0aC5weCcpXG4gIGdldCBtaW5XaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5taW5XaWR0aDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWF4V2lkdGgucHgnKVxuICBnZXQgbWF4V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWF4V2lkdGg7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLnB4JylcbiAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLndpZHRoO1xuICB9XG5cbiAgZ2V0IGlzQ2hlY2tib3hhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5jaGVja2JveGFibGUgJiYgdGhpcy5jb2x1bW4uaGVhZGVyQ2hlY2tib3hhYmxlICYmIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5jaGVja2JveDtcbiAgfVxuXG4gIHNvcnRGbiA9IHRoaXMub25Tb3J0LmJpbmQodGhpcyk7XG4gIHNvcnRDbGFzczogc3RyaW5nO1xuICBzb3J0RGlyOiBTb3J0RGlyZWN0aW9uO1xuICBzZWxlY3RGbiA9IHRoaXMuc2VsZWN0LmVtaXQuYmluZCh0aGlzLnNlbGVjdCk7XG4gIGZpbHRlckNhY2hlID0ge307XG5cbiAgY2VsbENvbnRleHQ6IGFueSA9IHtcbiAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgIHNvcnREaXI6IHRoaXMuc29ydERpcixcbiAgICBzb3J0Rm46IHRoaXMuc29ydEZuLFxuICAgIGFsbFJvd3NTZWxlY3RlZDogdGhpcy5hbGxSb3dzU2VsZWN0ZWQsXG4gICAgc2VsZWN0Rm46IHRoaXMuc2VsZWN0Rm5cbiAgfTtcblxuICBwcml2YXRlIF9jb2x1bW46IFRhYmxlQ29sdW1uO1xuICBwcml2YXRlIF9zb3J0czogYW55W107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcignY29udGV4dG1lbnUnLCBbJyRldmVudCddKVxuICBvbkNvbnRleHRtZW51KCRldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuY29sdW1uQ29udGV4dG1lbnUuZW1pdCh7IGV2ZW50OiAkZXZlbnQsIGNvbHVtbjogdGhpcy5jb2x1bW4gfSk7XG4gIH1cblxuICBjYWxjU29ydERpcihzb3J0czogYW55W10pOiBhbnkge1xuICAgIGlmIChzb3J0cyAmJiB0aGlzLmNvbHVtbikge1xuICAgICAgY29uc3Qgc29ydCA9IHNvcnRzLmZpbmQoKHM6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gcy5wcm9wID09PSB0aGlzLmNvbHVtbi5wcm9wO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzb3J0KSByZXR1cm4gc29ydC5kaXI7XG4gICAgfVxuICB9XG5cbiAgb25Tb3J0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb2x1bW4uc29ydGFibGUpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld1ZhbHVlID0gbmV4dFNvcnREaXIodGhpcy5zb3J0VHlwZSwgdGhpcy5zb3J0RGlyKTtcbiAgICB0aGlzLnNvcnQuZW1pdCh7XG4gICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgICAgcHJldlZhbHVlOiB0aGlzLnNvcnREaXIsXG4gICAgICBuZXdWYWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgY2FsY1NvcnRDbGFzcyhzb3J0RGlyOiBTb3J0RGlyZWN0aW9uKTogc3RyaW5nIHtcbiAgICBpZiAoc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5hc2MpIHtcbiAgICAgIHJldHVybiBgc29ydC1idG4gc29ydC1hc2MgJHt0aGlzLnNvcnRBc2NlbmRpbmdJY29ufWA7XG4gICAgfSBlbHNlIGlmIChzb3J0RGlyID09PSBTb3J0RGlyZWN0aW9uLmRlc2MpIHtcbiAgICAgIHJldHVybiBgc29ydC1idG4gc29ydC1kZXNjICR7dGhpcy5zb3J0RGVzY2VuZGluZ0ljb259YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBzb3J0LWJ0bmA7XG4gICAgfVxuICB9XG5cbiAgc2V0RmlsdGVyKGNvbHVtbikge1xuICAgIHRoaXMuZmlsdGVyLmVtaXQoe1xuICAgICAgY29sdW1uXG4gICAgfSk7XG4gIH1cblxuICByZXNldEZpbHRlcihjb2x1bW4pIHtcbiAgICB0aGlzLmZpbHRlckNhY2hlW2NvbHVtbl0gPSAnJztcbiAgICB0aGlzLmZpbHRlci5lbWl0KHtcbiAgICAgIGNvbHVtblxuICAgIH0pO1xuICB9XG59XG4iXX0=