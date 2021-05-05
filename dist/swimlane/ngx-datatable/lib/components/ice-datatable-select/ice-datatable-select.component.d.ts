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
  set options(options: any);
  default: string;
  set value(value: any);
  get value(): any;
  selectEl: any;
  currentClass: string;
  _options: any;
  _value: any;
  ngOnInit(): void;
  emitUpdate(newValue: any): void;
}
