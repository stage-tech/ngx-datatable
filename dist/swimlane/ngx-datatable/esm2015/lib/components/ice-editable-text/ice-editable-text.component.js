import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
export class EditableTextComponent {
  constructor() {
    this.editing = false;
    this.active = false;
    this.align = 'left';
    this.editOnSpace = true;
    this.editOnClick = true;
    this.focusOnEnter = true;
    this.editOnFocus = false;
    this.disabled = false;
    this.errorText = '';
    this.focus = new EventEmitter();
    this.toggleEditing = new EventEmitter();
    this.toggleActive = new EventEmitter();
    this.update = new EventEmitter();
  }
  emitUpdate(newText) {
    if (!this.disabled) {
      this.update.emit(newText);
    }
  }
  emitToggleEditing($event) {
    $event.stopPropagation();
    if (!this.disabled) {
      this.editing = !this.editing;
    }
  }
  emitFocus() {
    if (this.focus) {
      this.focus.emit(null);
    }
  }
  emitToggleActive($event) {
    $event.stopPropagation();
    if (!this.disabled) {
      this.active = !this.active;
    }
  }
  ngAfterViewInit() {
    this.inputEl.changes.subscribe(d => {
      return d.last && d.last.nativeElement.focus();
    });
    if (this.value == null) {
      this.value =
        this.content &&
        this.content.nativeElement.childNodes.length > 0 &&
        this.content.nativeElement.childNodes[0].data;
    }
  }
}
EditableTextComponent.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'ice-editable-text',
        template:
          '<button\r\n  class="button-as-text mb-0"\r\n  #contentWrapper\r\n  *ngIf="!editing"\r\n  [disabled]="disabled"\r\n  [class.active]="active"\r\n  (keyup.space)="editOnSpace && emitToggleEditing($event)"\r\n  (focus)="emitFocus(); editOnFocus && emitToggleEditing($event)"\r\n  (click)="emitToggleActive($event); editOnClick && emitToggleEditing($event)"\r\n>\r\n  <ng-content></ng-content>\r\n</button>\r\n<div *ngIf="editing" class="editable-text-container">\r\n  <div>\r\n    <input\r\n      type="text"\r\n      class="editable-text-input"\r\n      #inputElement\r\n      [disabled]="disabled"\r\n      [class.active]="active"\r\n      [value]="value"\r\n      (keyup.escape)="emitToggleEditing($event)"\r\n      (keyup.enter)="emitUpdate(inputElement.value)"\r\n      (change)="emitUpdate(inputElement.value)"\r\n      (blur)="emitToggleEditing($event)"\r\n    />\r\n  </div>\r\n</div>\r\n<div *ngIf="errorText" class="editable-text-container ice-pt-10">\r\n  <label class="ice-error-msg">{{ errorText }}</label>\r\n</div>\r\n',
        encapsulation: ViewEncapsulation.None,
        host: {
          class: 'ice-editable-text'
        },
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [
          '.ice-editable-text .inherit-all{all:inherit}.ice-editable-text .active{background-color:hsla(0,0%,100%,.3)!important}.ice-editable-text .button-as-text{background:inherit;border:none;border-bottom:1px dashed #aaa!important;border-radius:.2rem;color:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;margin:inherit;min-height:20px;min-width:50px;padding:inherit;text-align:inherit}.ice-editable-text .button-as-text:hover{background-color:hsla(0,0%,100%,.2)!important}.ice-editable-text .editable-text-input{border-bottom:1px dashed #aaa!important}'
        ]
      }
    ]
  }
];
EditableTextComponent.propDecorators = {
  align: [{ type: Input }],
  editOnSpace: [{ type: Input }],
  editOnClick: [{ type: Input }],
  focusOnEnter: [{ type: Input }],
  editOnFocus: [{ type: Input }],
  disabled: [{ type: Input }],
  value: [{ type: Input }],
  errorText: [{ type: Input }],
  focus: [{ type: Output }],
  toggleEditing: [{ type: Output }],
  toggleActive: [{ type: Output }],
  update: [{ type: Output }],
  inputEl: [{ type: ViewChildren, args: ['inputElement'] }],
  content: [{ type: ViewChild, args: ['contentWrapper', { static: false }] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaWNlLWVkaXRhYmxlLXRleHQvaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBWXZCLE1BQU0sT0FBTyxxQkFBcUI7SUFWbEM7UUFXRSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFTixVQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2QsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDakMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3pDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN4QyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQXlDaEQsQ0FBQztJQXJDQyxVQUFVLENBQUMsT0FBTztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxNQUFNO1FBQ3RCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBTTtRQUNyQixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLO2dCQUNSLElBQUksQ0FBQyxPQUFPO29CQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNqRDtJQUNILENBQUM7OztZQWpFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsMmpDQUFpRDtnQkFFakQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsbUJBQW1CO2lCQUMzQjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7OztvQkFLRSxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7b0JBQ0wsTUFBTTs0QkFDTixNQUFNOzJCQUNOLE1BQU07cUJBQ04sTUFBTTtzQkFDTixZQUFZLFNBQUMsY0FBYztzQkFDM0IsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q2hpbGRyZW4sXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWNlLWVkaXRhYmxlLXRleHQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnaWNlLWVkaXRhYmxlLXRleHQnXHJcbiAgfSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRWRpdGFibGVUZXh0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgZWRpdGluZyA9IGZhbHNlO1xyXG4gIGFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBhbGlnbiA9ICdsZWZ0JztcclxuICBASW5wdXQoKSBlZGl0T25TcGFjZSA9IHRydWU7XHJcbiAgQElucHV0KCkgZWRpdE9uQ2xpY2sgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGZvY3VzT25FbnRlciA9IHRydWU7XHJcbiAgQElucHV0KCkgZWRpdE9uRm9jdXMgPSBmYWxzZTtcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZXJyb3JUZXh0ID0gJyc7XHJcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gIEBPdXRwdXQoKSB0b2dnbGVFZGl0aW5nID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gIEBPdXRwdXQoKSB0b2dnbGVBY3RpdmUgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgQE91dHB1dCgpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gIEBWaWV3Q2hpbGRyZW4oJ2lucHV0RWxlbWVudCcpIGlucHV0RWw7XHJcbiAgQFZpZXdDaGlsZCgnY29udGVudFdyYXBwZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGVudDogRWxlbWVudFJlZjtcclxuXHJcbiAgZW1pdFVwZGF0ZShuZXdUZXh0KSB7XHJcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy51cGRhdGUuZW1pdChuZXdUZXh0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVtaXRUb2dnbGVFZGl0aW5nKCRldmVudCkge1xyXG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuZWRpdGluZyA9ICF0aGlzLmVkaXRpbmc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbWl0Rm9jdXMoKSB7XHJcbiAgICBpZiAodGhpcy5mb2N1cykge1xyXG4gICAgICB0aGlzLmZvY3VzLmVtaXQobnVsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbWl0VG9nZ2xlQWN0aXZlKCRldmVudCkge1xyXG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5pbnB1dEVsLmNoYW5nZXMuc3Vic2NyaWJlKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZC5sYXN0ICYmIGQubGFzdC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9XHJcbiAgICAgICAgdGhpcy5jb250ZW50ICYmXHJcbiAgICAgICAgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlc1swXS5kYXRhO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
