import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';

@Component({
  selector: 'ice-datatable-row-select',
  templateUrl: './ice-datatable-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableSelectComponent implements OnInit {
  editing = false;
  active = false;
  rows = [];

  @Input() align = 'left';
  @Input() focusOnEnter = false;
  @Input() defaultValue: string;
  @Input() editOnFocus = false;
  @Input() selectDisabled = false;
  @Input() title;
  @Output() update = new EventEmitter<string>();
  @Input() set options(options) {
    if (!this._options) {
      this.currentClass = (options.find(option => option.value === this.value) || { class: 'none' }).class;
      this._options = options;
    }
  }
  @Input() default: string;
  @Input() set value(value) {
    this.currentClass = (this._options.find(option => option.value === value) || { class: 'none' }).class;
    this._value = value;
  }
  get value() {
    return this._value;
  }
  @ViewChildren('selectElement') selectEl;
  currentClass = 'initial';
  _options;
  _value;

  ngOnInit() {
    if (!this.value) {
      this.value = this.defaultValue;
    }
    if (this.value) {
      this.update.emit(this.value);
    }
  }

  emitUpdate(newValue) {
    this.currentClass = (this._options.find(option => option.value === newValue) || { class: 'none' }).class;
    this.update.emit(newValue);
  }
}
