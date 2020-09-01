import { EventEmitter, OnInit } from '@angular/core';
export declare class DatatableSelectComponent implements OnInit {
    editing: boolean;
    active: boolean;
    rows: any[];
    align: string;
    focusOnEnter: boolean;
    editOnFocus: boolean;
    selectDisabled: boolean;
    update: EventEmitter<string>;
    options: any[];
    default: string;
    value: string;
    selectEl: any;
    ngOnInit(): void;
    emitUpdate(newValue: any): void;
}
