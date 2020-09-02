/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
var EditableTextComponent = /** @class */ (function () {
    function EditableTextComponent() {
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
    EditableTextComponent.prototype.emitUpdate = /**
     * @param {?} newText
     * @return {?}
     */
    function (newText) {
        if (!this.disabled) {
            this.update.emit(newText);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    EditableTextComponent.prototype.emitToggleEditing = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.stopPropagation();
        if (!this.disabled) {
            this.editing = !this.editing;
        }
    };
    /**
     * @return {?}
     */
    EditableTextComponent.prototype.emitFocus = /**
     * @return {?}
     */
    function () {
        if (this.focus) {
            this.focus.emit(null);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    EditableTextComponent.prototype.emitToggleActive = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.stopPropagation();
        if (!this.disabled) {
            this.active = !this.active;
        }
    };
    /**
     * @return {?}
     */
    EditableTextComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.inputEl.changes.subscribe((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.last && d.last.nativeElement.focus();
        }));
        if (this.value == null) {
            this.value =
                this.content &&
                    this.content.nativeElement.childNodes.length > 0 &&
                    this.content.nativeElement.childNodes[0].data;
        }
    };
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
    return EditableTextComponent;
}());
export { EditableTextComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pY2UtZWRpdGFibGUtdGV4dC9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQUFBO1FBV0UsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRU4sVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNkLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN6QyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDeEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUF5Q2hELENBQUM7Ozs7O0lBckNDLDBDQUFVOzs7O0lBQVYsVUFBVyxPQUFPO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxpREFBaUI7Ozs7SUFBakIsVUFBa0IsTUFBTTtRQUN0QixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7O0lBRUQseUNBQVM7OztJQUFUO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7OztJQUVELGdEQUFnQjs7OztJQUFoQixVQUFpQixNQUFNO1FBQ3JCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7SUFFRCwrQ0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoRCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLE9BQU87b0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQzs7Z0JBakVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QiwyakNBQWlEO29CQUVqRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxtQkFBbUI7cUJBQzNCO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozt3QkFLRSxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7d0JBQ0wsTUFBTTtnQ0FDTixNQUFNOytCQUNOLE1BQU07eUJBQ04sTUFBTTswQkFDTixZQUFZLFNBQUMsY0FBYzswQkFDM0IsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7SUF1Q2hELDRCQUFDO0NBQUEsQUFsRUQsSUFrRUM7U0F4RFkscUJBQXFCOzs7SUFDaEMsd0NBQWdCOztJQUNoQix1Q0FBZTs7SUFFZixzQ0FBd0I7O0lBQ3hCLDRDQUE0Qjs7SUFDNUIsNENBQTRCOztJQUM1Qiw2Q0FBNkI7O0lBQzdCLDRDQUE2Qjs7SUFDN0IseUNBQTBCOztJQUMxQixzQ0FBdUI7O0lBQ3ZCLDBDQUF3Qjs7SUFDeEIsc0NBQTJDOztJQUMzQyw4Q0FBbUQ7O0lBQ25ELDZDQUFrRDs7SUFDbEQsdUNBQThDOztJQUM5Qyx3Q0FBc0M7O0lBQ3RDLHdDQUFvRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q2hpbGRyZW4sXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWNlLWVkaXRhYmxlLXRleHQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnaWNlLWVkaXRhYmxlLXRleHQnXHJcbiAgfSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRWRpdGFibGVUZXh0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgZWRpdGluZyA9IGZhbHNlO1xyXG4gIGFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBhbGlnbiA9ICdsZWZ0JztcclxuICBASW5wdXQoKSBlZGl0T25TcGFjZSA9IHRydWU7XHJcbiAgQElucHV0KCkgZWRpdE9uQ2xpY2sgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGZvY3VzT25FbnRlciA9IHRydWU7XHJcbiAgQElucHV0KCkgZWRpdE9uRm9jdXMgPSBmYWxzZTtcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZXJyb3JUZXh0ID0gJyc7XHJcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gIEBPdXRwdXQoKSB0b2dnbGVFZGl0aW5nID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gIEBPdXRwdXQoKSB0b2dnbGVBY3RpdmUgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgQE91dHB1dCgpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gIEBWaWV3Q2hpbGRyZW4oJ2lucHV0RWxlbWVudCcpIGlucHV0RWw7XHJcbiAgQFZpZXdDaGlsZCgnY29udGVudFdyYXBwZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGVudDogRWxlbWVudFJlZjtcclxuXHJcbiAgZW1pdFVwZGF0ZShuZXdUZXh0KSB7XHJcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy51cGRhdGUuZW1pdChuZXdUZXh0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVtaXRUb2dnbGVFZGl0aW5nKCRldmVudCkge1xyXG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuZWRpdGluZyA9ICF0aGlzLmVkaXRpbmc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbWl0Rm9jdXMoKSB7XHJcbiAgICBpZiAodGhpcy5mb2N1cykge1xyXG4gICAgICB0aGlzLmZvY3VzLmVtaXQobnVsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbWl0VG9nZ2xlQWN0aXZlKCRldmVudCkge1xyXG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5pbnB1dEVsLmNoYW5nZXMuc3Vic2NyaWJlKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZC5sYXN0ICYmIGQubGFzdC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9XHJcbiAgICAgICAgdGhpcy5jb250ZW50ICYmXHJcbiAgICAgICAgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlc1swXS5kYXRhO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=