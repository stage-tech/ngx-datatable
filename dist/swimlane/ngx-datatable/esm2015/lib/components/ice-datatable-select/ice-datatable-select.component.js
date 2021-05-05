import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
export class DatatableSelectComponent {
  constructor() {
    this.editing = false;
    this.active = false;
    this.rows = [];
    this.align = 'left';
    this.focusOnEnter = false;
    this.editOnFocus = false;
    this.selectDisabled = false;
    this.update = new EventEmitter();
    this.currentClass = 'initial';
  }
  set options(options) {
    if (!this._options) {
      this.currentClass = (options.find(option => option.value === this.value) || { class: 'none' }).class;
      this._options = options;
    }
  }
  set value(value) {
    this.currentClass = (this._options.find(option => option.value === value) || { class: 'none' }).class;
    this._value = value;
  }
  get value() {
    return this._value;
  }
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
DatatableSelectComponent.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'ice-datatable-row-select',
        template:
          '<select *ngIf="_options" style="width: 100%;" [ngClass]="currentClass" #selectElement (change)="emitUpdate(selectElement.value)" [(ngModel)]="value" [disabled]="selectDisabled">\r\n      <option *ngFor="let item of _options" [value]="item.value" [disabled]="item.disabled" [ngClass]="item.class || \'black\'">{{ item.label }}</option>\r\n</select>\r\n\r\n\r\n <!-- <mat-form-field appearance="fill">\r\n  <mat-select>\r\n    <ng-container *ngFor="let item of options">\r\n    <mat-option  [value]="item.value">{{ item.label }}</mat-option>\r\n  </ng-container>\r\n  </mat-select>\r\n</mat-form-field> -->\r\n',
        changeDetection: ChangeDetectionStrategy.OnPush
      }
    ]
  }
];
DatatableSelectComponent.propDecorators = {
  align: [{ type: Input }],
  focusOnEnter: [{ type: Input }],
  defaultValue: [{ type: Input }],
  editOnFocus: [{ type: Input }],
  selectDisabled: [{ type: Input }],
  title: [{ type: Input }],
  update: [{ type: Output }],
  options: [{ type: Input }],
  default: [{ type: Input }],
  value: [{ type: Input }],
  selectEl: [{ type: ViewChildren, args: ['selectElement'] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWRhdGF0YWJsZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaWNlLWRhdGF0YWJsZS1zZWxlY3QvaWNlLWRhdGF0YWJsZS1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3RILE1BQU0sT0FBTyx3QkFBd0I7SUFMckM7UUFNRSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRUQsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXRCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBZ0I5QyxpQkFBWSxHQUFHLFNBQVMsQ0FBQztJQWlCM0IsQ0FBQztJQWhDQyxJQUFhLE9BQU8sQ0FBQyxPQUFPO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDckcsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQsSUFBYSxLQUFLLENBQUMsS0FBSztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RHLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQU1ELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUNoQztRQUNELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsUUFBUTtRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3pHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7OztZQWhERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsb29CQUFvRDtnQkFDcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztvQkFNRSxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7b0JBQ0wsS0FBSztxQkFDTCxNQUFNO3NCQUNOLEtBQUs7c0JBTUwsS0FBSztvQkFDTCxLQUFLO3VCQU9MLFlBQVksU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpY2UtZGF0YXRhYmxlLXJvdy1zZWxlY3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pY2UtZGF0YXRhYmxlLXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgZWRpdGluZyA9IGZhbHNlO1xyXG4gIGFjdGl2ZSA9IGZhbHNlO1xyXG4gIHJvd3MgPSBbXTtcclxuXHJcbiAgQElucHV0KCkgYWxpZ24gPSAnbGVmdCc7XHJcbiAgQElucHV0KCkgZm9jdXNPbkVudGVyID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGVmYXVsdFZhbHVlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZWRpdE9uRm9jdXMgPSBmYWxzZTtcclxuICBASW5wdXQoKSBzZWxlY3REaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRpdGxlO1xyXG4gIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zKSB7XHJcbiAgICBpZiAoIXRoaXMuX29wdGlvbnMpIHtcclxuICAgICAgdGhpcy5jdXJyZW50Q2xhc3MgPSAob3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHRoaXMudmFsdWUpIHx8IHsgY2xhc3M6ICdub25lJyB9KS5jbGFzcztcclxuICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIEBJbnB1dCgpIGRlZmF1bHQ6IHN0cmluZztcclxuICBASW5wdXQoKSBzZXQgdmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMuY3VycmVudENsYXNzID0gKHRoaXMuX29wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSB2YWx1ZSkgfHwgeyBjbGFzczogJ25vbmUnIH0pLmNsYXNzO1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IHZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBAVmlld0NoaWxkcmVuKCdzZWxlY3RFbGVtZW50Jykgc2VsZWN0RWw7XHJcbiAgY3VycmVudENsYXNzID0gJ2luaXRpYWwnO1xyXG4gIF9vcHRpb25zO1xyXG4gIF92YWx1ZTtcclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy51cGRhdGUuZW1pdCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVtaXRVcGRhdGUobmV3VmFsdWUpIHtcclxuICAgIHRoaXMuY3VycmVudENsYXNzID0gKHRoaXMuX29wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBuZXdWYWx1ZSkgfHwgeyBjbGFzczogJ25vbmUnIH0pLmNsYXNzO1xyXG4gICAgdGhpcy51cGRhdGUuZW1pdChuZXdWYWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
