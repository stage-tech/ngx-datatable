/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
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
    /**
     * @param {?} newText
     * @return {?}
     */
    emitUpdate(newText) {
        if (!this.disabled) {
            this.update.emit(newText);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    emitToggleEditing($event) {
        $event.stopPropagation();
        if (!this.disabled) {
            this.editing = !this.editing;
        }
    }
    /**
     * @return {?}
     */
    emitFocus() {
        if (this.focus) {
            this.focus.emit(null);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    emitToggleActive($event) {
        $event.stopPropagation();
        if (!this.disabled) {
            this.active = !this.active;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.inputEl.changes.subscribe((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            return d.last && d.last.nativeElement.focus();
        }));
        if (this.value == null) {
            this.value =
                this.content &&
                    this.content.nativeElement.childNodes.length > 0 &&
                    this.content.nativeElement.childNodes[0].data;
        }
    }
}
EditableTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'ice-editable-text',
                template: "<button\r\n  class=\"button-as-text mb-0\"\r\n  #contentWrapper\r\n  *ngIf=\"!editing\"\r\n  [disabled]=\"disabled\"\r\n  [class.active]=\"active\"\r\n  (keyup.space)=\"editOnSpace && emitToggleEditing($event)\"\r\n  (focus)=\"emitFocus(); editOnFocus && emitToggleEditing($event)\"\r\n  (click)=\"emitToggleActive($event); editOnClick && emitToggleEditing($event)\"\r\n>\r\n  <ng-content></ng-content>\r\n</button>\r\n<div *ngIf=\"editing\" class=\"editable-text-container\">\r\n  <div>\r\n    <input\r\n      type=\"text\"\r\n      class=\"editable-text-input\"\r\n      #inputElement\r\n      [disabled]=\"disabled\"\r\n      [class.active]=\"active\"\r\n      [value]=\"value\"\r\n      (keyup.escape)=\"emitToggleEditing($event)\"\r\n      (keyup.enter)=\"emitUpdate(inputElement.value)\"\r\n      (change)=\"emitUpdate(inputElement.value)\"\r\n      (blur)=\"emitToggleEditing($event)\"\r\n    />\r\n  </div>\r\n</div>\r\n<div *ngIf=\"errorText\" class=\"editable-text-container ice-pt-10\">\r\n  <label class=\"ice-error-msg\">{{ errorText }}</label>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                host: {
                    class: 'ice-editable-text'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ice-editable-text .inherit-all{all:inherit}.ice-editable-text .active{background-color:rgba(255,255,255,.3)!important}.ice-editable-text .button-as-text{border:none;background:inherit;padding:inherit;margin:inherit;color:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;text-align:inherit;border-radius:.2rem;border-bottom:1px dashed #aaa!important;min-width:50px;min-height:20px}.ice-editable-text .button-as-text:hover{background-color:rgba(255,255,255,.2)!important}.ice-editable-text .editable-text-input{border-bottom:1px dashed #aaa!important}"]
            }] }
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
    inputEl: [{ type: ViewChildren, args: ['inputElement',] }],
    content: [{ type: ViewChild, args: ['contentWrapper', { static: false },] }]
};
if (false) {
    /** @type {?} */
    EditableTextComponent.prototype.editing;
    /** @type {?} */
    EditableTextComponent.prototype.active;
    /** @type {?} */
    EditableTextComponent.prototype.align;
    /** @type {?} */
    EditableTextComponent.prototype.editOnSpace;
    /** @type {?} */
    EditableTextComponent.prototype.editOnClick;
    /** @type {?} */
    EditableTextComponent.prototype.focusOnEnter;
    /** @type {?} */
    EditableTextComponent.prototype.editOnFocus;
    /** @type {?} */
    EditableTextComponent.prototype.disabled;
    /** @type {?} */
    EditableTextComponent.prototype.value;
    /** @type {?} */
    EditableTextComponent.prototype.errorText;
    /** @type {?} */
    EditableTextComponent.prototype.focus;
    /** @type {?} */
    EditableTextComponent.prototype.toggleEditing;
    /** @type {?} */
    EditableTextComponent.prototype.toggleActive;
    /** @type {?} */
    EditableTextComponent.prototype.update;
    /** @type {?} */
    EditableTextComponent.prototype.inputEl;
    /** @type {?} */
    EditableTextComponent.prototype.content;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pY2UtZWRpdGFibGUtdGV4dC9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQVl2QixNQUFNLE9BQU8scUJBQXFCO0lBVmxDO1FBV0UsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRU4sVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNkLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN6QyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDeEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUF5Q2hELENBQUM7Ozs7O0lBckNDLFVBQVUsQ0FBQyxPQUFPO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxNQUFNO1FBQ3RCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUM5QjtJQUNILENBQUM7Ozs7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLE1BQU07UUFDckIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakMsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hELENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSztnQkFDUixJQUFJLENBQUMsT0FBTztvQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDakQ7SUFDSCxDQUFDOzs7WUFqRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDJqQ0FBaUQ7Z0JBRWpELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG1CQUFtQjtpQkFDM0I7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7b0JBS0UsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLO29CQUNMLE1BQU07NEJBQ04sTUFBTTsyQkFDTixNQUFNO3FCQUNOLE1BQU07c0JBQ04sWUFBWSxTQUFDLGNBQWM7c0JBQzNCLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Ozs7SUFoQjlDLHdDQUFnQjs7SUFDaEIsdUNBQWU7O0lBRWYsc0NBQXdCOztJQUN4Qiw0Q0FBNEI7O0lBQzVCLDRDQUE0Qjs7SUFDNUIsNkNBQTZCOztJQUM3Qiw0Q0FBNkI7O0lBQzdCLHlDQUEwQjs7SUFDMUIsc0NBQXVCOztJQUN2QiwwQ0FBd0I7O0lBQ3hCLHNDQUEyQzs7SUFDM0MsOENBQW1EOztJQUNuRCw2Q0FBa0Q7O0lBQ2xELHVDQUE4Qzs7SUFDOUMsd0NBQXNDOztJQUN0Qyx3Q0FBb0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0NoaWxkcmVuLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ljZS1lZGl0YWJsZS10ZXh0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ljZS1lZGl0YWJsZS10ZXh0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ2ljZS1lZGl0YWJsZS10ZXh0J1xyXG4gIH0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEVkaXRhYmxlVGV4dENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIGVkaXRpbmcgPSBmYWxzZTtcclxuICBhY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgYWxpZ24gPSAnbGVmdCc7XHJcbiAgQElucHV0KCkgZWRpdE9uU3BhY2UgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGVkaXRPbkNsaWNrID0gdHJ1ZTtcclxuICBASW5wdXQoKSBmb2N1c09uRW50ZXIgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGVkaXRPbkZvY3VzID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGVycm9yVGV4dCA9ICcnO1xyXG4gIEBPdXRwdXQoKSBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICBAT3V0cHV0KCkgdG9nZ2xlRWRpdGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICBAT3V0cHV0KCkgdG9nZ2xlQWN0aXZlID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBAVmlld0NoaWxkcmVuKCdpbnB1dEVsZW1lbnQnKSBpbnB1dEVsO1xyXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnRXcmFwcGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGVtaXRVcGRhdGUobmV3VGV4dCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlLmVtaXQobmV3VGV4dCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbWl0VG9nZ2xlRWRpdGluZygkZXZlbnQpIHtcclxuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmVkaXRpbmcgPSAhdGhpcy5lZGl0aW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW1pdEZvY3VzKCkge1xyXG4gICAgaWYgKHRoaXMuZm9jdXMpIHtcclxuICAgICAgdGhpcy5mb2N1cy5lbWl0KG51bGwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW1pdFRvZ2dsZUFjdGl2ZSgkZXZlbnQpIHtcclxuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuaW5wdXRFbC5jaGFuZ2VzLnN1YnNjcmliZShkID0+IHtcclxuICAgICAgcmV0dXJuIGQubGFzdCAmJiBkLmxhc3QubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy52YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPVxyXG4gICAgICAgIHRoaXMuY29udGVudCAmJlxyXG4gICAgICAgIHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgIHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXNbMF0uZGF0YTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19