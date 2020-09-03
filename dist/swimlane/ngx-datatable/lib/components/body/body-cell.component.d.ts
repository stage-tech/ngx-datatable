import { ChangeDetectorRef, EventEmitter, ElementRef, ViewContainerRef, OnDestroy, DoCheck } from '@angular/core';
import { TableColumn } from '../../types/table-column.type';
import { SortDirection } from '../../types/sort-direction.type';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
export declare type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';
export declare class DataTableBodyCellComponent implements DoCheck, OnDestroy {
    private cd;
    private sanitizer;
    displayCheck: (row: any, column?: TableColumn, value?: any) => boolean;
    rowDetail: any;
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
    _isEditable: {
        [a: string]: Observable<boolean>;
    };
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
    private _rowDetail;
    private _group;
    private _rowHeight;
    private _rowIndex;
    private _expanded;
    private _element;
    private _treeStatus;
    constructor(element: ElementRef, cd: ChangeDetectorRef, sanitizer: DomSanitizer);
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
    selectFieldValue(row: any, prop: any): any;
    onClickRowActionButton(event: any, field: any, row: any): void;
    sanatizeHtml(html: string): string;
    isEditable(field: any, row: any): Observable<boolean>;
    updateSelect(field: any, row: any, newValue: any): void;
    editField(field: any, row: any, newValue: any): void;
    toggleExpandRow(row: any, event: any): void;
    onClickField(row: any, action: any, event: any): void;
}
