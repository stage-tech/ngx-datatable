import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
export declare class EditableTextComponent implements AfterViewInit {
    editing: boolean;
    active: boolean;
    align: string;
    editOnSpace: boolean;
    editOnClick: boolean;
    focusOnEnter: boolean;
    editOnFocus: boolean;
    disabled: boolean;
    value: string;
    errorText: string;
    focus: EventEmitter<null>;
    toggleEditing: EventEmitter<null>;
    toggleActive: EventEmitter<null>;
    update: EventEmitter<string>;
    inputEl: any;
    content: ElementRef;
    emitUpdate(newText: any): void;
    emitToggleEditing($event: any): void;
    emitFocus(): void;
    emitToggleActive($event: any): void;
    ngAfterViewInit(): void;
}
