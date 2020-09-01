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
                template: "<button\n  class=\"button-as-text mb-0\"\n  #contentWrapper\n  *ngIf=\"!editing\"\n  [disabled]=\"disabled\"\n  [class.active]=\"active\"\n  (keyup.space)=\"editOnSpace && emitToggleEditing($event)\"\n  (focus)=\"emitFocus(); editOnFocus && emitToggleEditing($event)\"\n  (click)=\"emitToggleActive($event); editOnClick && emitToggleEditing($event)\"\n>\n  <ng-content></ng-content>\n</button>\n<div *ngIf=\"editing\" class=\"editable-text-container\">\n  <div>\n    <input\n      type=\"text\"\n      class=\"editable-text-input\"\n      #inputElement\n      [disabled]=\"disabled\"\n      [class.active]=\"active\"\n      [value]=\"value\"\n      (keyup.escape)=\"emitToggleEditing($event)\"\n      (keyup.enter)=\"emitUpdate(inputElement.value)\"\n      (change)=\"emitUpdate(inputElement.value)\"\n      (blur)=\"emitToggleEditing($event)\"\n    />\n  </div>\n</div>\n<div *ngIf=\"errorText\" class=\"editable-text-container ice-pt-10\">\n  <label class=\"ice-error-msg\">{{ errorText }}</label>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pY2UtZWRpdGFibGUtdGV4dC9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQVl2QixNQUFNLE9BQU8scUJBQXFCO0lBVmxDO1FBV0UsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRU4sVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNkLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN6QyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDeEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUF5Q2hELENBQUM7Ozs7O0lBckNDLFVBQVUsQ0FBQyxPQUFPO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxNQUFNO1FBQ3RCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUM5QjtJQUNILENBQUM7Ozs7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLE1BQU07UUFDckIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakMsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hELENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSztnQkFDUixJQUFJLENBQUMsT0FBTztvQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDakQ7SUFDSCxDQUFDOzs7WUFqRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDYvQkFBaUQ7Z0JBRWpELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG1CQUFtQjtpQkFDM0I7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7b0JBS0UsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLO29CQUNMLE1BQU07NEJBQ04sTUFBTTsyQkFDTixNQUFNO3FCQUNOLE1BQU07c0JBQ04sWUFBWSxTQUFDLGNBQWM7c0JBQzNCLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Ozs7SUFoQjlDLHdDQUFnQjs7SUFDaEIsdUNBQWU7O0lBRWYsc0NBQXdCOztJQUN4Qiw0Q0FBNEI7O0lBQzVCLDRDQUE0Qjs7SUFDNUIsNkNBQTZCOztJQUM3Qiw0Q0FBNkI7O0lBQzdCLHlDQUEwQjs7SUFDMUIsc0NBQXVCOztJQUN2QiwwQ0FBd0I7O0lBQ3hCLHNDQUEyQzs7SUFDM0MsOENBQW1EOztJQUNuRCw2Q0FBa0Q7O0lBQ2xELHVDQUE4Qzs7SUFDOUMsd0NBQXNDOztJQUN0Qyx3Q0FBb0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaWNlLWVkaXRhYmxlLXRleHQnLFxuICB0ZW1wbGF0ZVVybDogJy4vaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdpY2UtZWRpdGFibGUtdGV4dCdcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRWRpdGFibGVUZXh0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGVkaXRpbmcgPSBmYWxzZTtcbiAgYWN0aXZlID0gZmFsc2U7XG5cbiAgQElucHV0KCkgYWxpZ24gPSAnbGVmdCc7XG4gIEBJbnB1dCgpIGVkaXRPblNwYWNlID0gdHJ1ZTtcbiAgQElucHV0KCkgZWRpdE9uQ2xpY2sgPSB0cnVlO1xuICBASW5wdXQoKSBmb2N1c09uRW50ZXIgPSB0cnVlO1xuICBASW5wdXQoKSBlZGl0T25Gb2N1cyA9IGZhbHNlO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKSBlcnJvclRleHQgPSAnJztcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICBAT3V0cHV0KCkgdG9nZ2xlRWRpdGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgQE91dHB1dCgpIHRvZ2dsZUFjdGl2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgQE91dHB1dCgpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAVmlld0NoaWxkcmVuKCdpbnB1dEVsZW1lbnQnKSBpbnB1dEVsO1xuICBAVmlld0NoaWxkKCdjb250ZW50V3JhcHBlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIGVtaXRVcGRhdGUobmV3VGV4dCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy51cGRhdGUuZW1pdChuZXdUZXh0KTtcbiAgICB9XG4gIH1cblxuICBlbWl0VG9nZ2xlRWRpdGluZygkZXZlbnQpIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmVkaXRpbmcgPSAhdGhpcy5lZGl0aW5nO1xuICAgIH1cbiAgfVxuXG4gIGVtaXRGb2N1cygpIHtcbiAgICBpZiAodGhpcy5mb2N1cykge1xuICAgICAgdGhpcy5mb2N1cy5lbWl0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGVtaXRUb2dnbGVBY3RpdmUoJGV2ZW50KSB7XG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW5wdXRFbC5jaGFuZ2VzLnN1YnNjcmliZShkID0+IHtcbiAgICAgIHJldHVybiBkLmxhc3QgJiYgZC5sYXN0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy52YWx1ZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLnZhbHVlID1cbiAgICAgICAgdGhpcy5jb250ZW50ICYmXG4gICAgICAgIHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzWzBdLmRhdGE7XG4gICAgfVxuICB9XG59XG4iXX0=