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
                    template: "",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pY2UtZWRpdGFibGUtdGV4dC9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQUFBO1FBV0UsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRU4sVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNkLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN6QyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDeEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUF5Q2hELENBQUM7Ozs7O0lBckNDLDBDQUFVOzs7O0lBQVYsVUFBVyxPQUFPO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxpREFBaUI7Ozs7SUFBakIsVUFBa0IsTUFBTTtRQUN0QixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7O0lBRUQseUNBQVM7OztJQUFUO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7OztJQUVELGdEQUFnQjs7OztJQUFoQixVQUFpQixNQUFNO1FBQ3JCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7SUFFRCwrQ0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoRCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLE9BQU87b0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQzs7Z0JBakVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixZQUFpRDtvQkFFakQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsbUJBQW1CO3FCQUMzQjtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7d0JBS0UsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7d0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3dCQUNMLE1BQU07Z0NBQ04sTUFBTTsrQkFDTixNQUFNO3lCQUNOLE1BQU07MEJBQ04sWUFBWSxTQUFDLGNBQWM7MEJBQzNCLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0lBdUNoRCw0QkFBQztDQUFBLEFBbEVELElBa0VDO1NBeERZLHFCQUFxQjs7O0lBQ2hDLHdDQUFnQjs7SUFDaEIsdUNBQWU7O0lBRWYsc0NBQXdCOztJQUN4Qiw0Q0FBNEI7O0lBQzVCLDRDQUE0Qjs7SUFDNUIsNkNBQTZCOztJQUM3Qiw0Q0FBNkI7O0lBQzdCLHlDQUEwQjs7SUFDMUIsc0NBQXVCOztJQUN2QiwwQ0FBd0I7O0lBQ3hCLHNDQUEyQzs7SUFDM0MsOENBQW1EOztJQUNuRCw2Q0FBa0Q7O0lBQ2xELHVDQUE4Qzs7SUFDOUMsd0NBQXNDOztJQUN0Qyx3Q0FBb0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaWNlLWVkaXRhYmxlLXRleHQnLFxuICB0ZW1wbGF0ZVVybDogJy4vaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdpY2UtZWRpdGFibGUtdGV4dCdcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRWRpdGFibGVUZXh0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGVkaXRpbmcgPSBmYWxzZTtcbiAgYWN0aXZlID0gZmFsc2U7XG5cbiAgQElucHV0KCkgYWxpZ24gPSAnbGVmdCc7XG4gIEBJbnB1dCgpIGVkaXRPblNwYWNlID0gdHJ1ZTtcbiAgQElucHV0KCkgZWRpdE9uQ2xpY2sgPSB0cnVlO1xuICBASW5wdXQoKSBmb2N1c09uRW50ZXIgPSB0cnVlO1xuICBASW5wdXQoKSBlZGl0T25Gb2N1cyA9IGZhbHNlO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKSBlcnJvclRleHQgPSAnJztcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICBAT3V0cHV0KCkgdG9nZ2xlRWRpdGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgQE91dHB1dCgpIHRvZ2dsZUFjdGl2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgQE91dHB1dCgpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAVmlld0NoaWxkcmVuKCdpbnB1dEVsZW1lbnQnKSBpbnB1dEVsO1xuICBAVmlld0NoaWxkKCdjb250ZW50V3JhcHBlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIGVtaXRVcGRhdGUobmV3VGV4dCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy51cGRhdGUuZW1pdChuZXdUZXh0KTtcbiAgICB9XG4gIH1cblxuICBlbWl0VG9nZ2xlRWRpdGluZygkZXZlbnQpIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmVkaXRpbmcgPSAhdGhpcy5lZGl0aW5nO1xuICAgIH1cbiAgfVxuXG4gIGVtaXRGb2N1cygpIHtcbiAgICBpZiAodGhpcy5mb2N1cykge1xuICAgICAgdGhpcy5mb2N1cy5lbWl0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGVtaXRUb2dnbGVBY3RpdmUoJGV2ZW50KSB7XG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW5wdXRFbC5jaGFuZ2VzLnN1YnNjcmliZShkID0+IHtcbiAgICAgIHJldHVybiBkLmxhc3QgJiYgZC5sYXN0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy52YWx1ZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLnZhbHVlID1cbiAgICAgICAgdGhpcy5jb250ZW50ICYmXG4gICAgICAgIHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzWzBdLmRhdGE7XG4gICAgfVxuICB9XG59XG4iXX0=