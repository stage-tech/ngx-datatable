import { ChangeDetectorRef, EventEmitter, ElementRef, ViewContainerRef, OnDestroy, DoCheck } from '@angular/core';
import { TableColumn } from '../../types/table-column.type';
import { SortDirection } from '../../types/sort-direction.type';
export declare type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';
export declare class DataTableBodyCellComponent implements DoCheck, OnDestroy {
    private cd;
    displayCheck: (row: any, column?: TableColumn, value?: any) => boolean;
    group: any;
    rowHeight: number;
    isSelected: boolean;
    expanded: boolean;
    rowIndex: number;
    column: TableColumn;
    row: any;
    sorts: any[];
    treeStatus: TreeStatus;
    activate: EventEmitter<any>;
    treeAction: EventEmitter<any>;
    cellTemplate: ViewContainerRef;
    readonly columnCssClasses: any;
    readonly width: number;
    readonly minWidth: number;
    readonly maxWidth: number;
    readonly height: string | number;
    sanitizedValue: any;
    value: any;
    sortDir: SortDirection;
    isFocused: boolean;
    onCheckboxChangeFn: any;
    activateFn: any;
    cellContext: any;
    private _isSelected;
    private _sorts;
    private _column;
    private _row;
    private _group;
    private _rowHeight;
    private _rowIndex;
    private _expanded;
    private _element;
    private _treeStatus;
    constructor(element: ElementRef, cd: ChangeDetectorRef);
    ngDoCheck(): void;
    ngOnDestroy(): void;
    checkValueUpdates(): void;
    onFocus(): void;
    onBlur(): void;
    onClick(event: MouseEvent): void;
    onDblClick(event: MouseEvent): void;
    onKeyDown(event: KeyboardEvent): void;
    onCheckboxChange(event: any): void;
    calcSortDir(sorts: any[]): any;
    stripHtml(html: string): string;
    onTreeAction(): void;
    calcLeftMargin(column: any, row: any): number;
    hasToShowToolTip(row: any, field: any): boolean;
    getTooltipValue(value: any, row: any, field: any): any;
    getIcons(row: any, icons: any): any;
}
