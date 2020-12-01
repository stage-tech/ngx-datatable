import { EventEmitter, OnInit } from '@angular/core';
export declare class DatatableSelectComponent implements OnInit {
    editing: boolean;
    active: boolean;
    rows: any[];
    align: string;
    focusOnEnter: boolean;
    defaultValue: string;
    editOnFocus: boolean;
    selectDisabled: boolean;
    title: any;
    update: EventEmitter<string>;
    options: any;
    default: string;
    value: any;
    selectEl: any;
    currentClass: string;
    _options: any;
    _value: any;
    ngOnInit(): void;
    emitUpdate(newValue: any): void;
}
