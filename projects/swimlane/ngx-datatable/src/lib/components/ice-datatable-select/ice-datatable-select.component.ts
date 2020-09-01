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
  @Input() editOnFocus = false;
  @Input() selectDisabled = false;
  @Output() update = new EventEmitter<string>();
  @Input() options = [];
  @Input() default: string;
  @Input() value: string;
  @ViewChildren('selectElement') selectEl;

  ngOnInit() {
    if (this.value) {
      this.update.emit(this.value);
    }
  }

  emitUpdate(newValue) {
    this.update.emit(newValue);
  }
}
