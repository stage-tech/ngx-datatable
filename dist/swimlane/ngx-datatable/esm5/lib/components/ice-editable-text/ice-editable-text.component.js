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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pY2UtZWRpdGFibGUtdGV4dC9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQUFBO1FBV0UsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRU4sVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNkLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN6QyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDeEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUF5Q2hELENBQUM7Ozs7O0lBckNDLDBDQUFVOzs7O0lBQVYsVUFBVyxPQUFPO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxpREFBaUI7Ozs7SUFBakIsVUFBa0IsTUFBTTtRQUN0QixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7O0lBRUQseUNBQVM7OztJQUFUO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7OztJQUVELGdEQUFnQjs7OztJQUFoQixVQUFpQixNQUFNO1FBQ3JCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7SUFFRCwrQ0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoRCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLE9BQU87b0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQzs7Z0JBakVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3Qiw2L0JBQWlEO29CQUVqRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxtQkFBbUI7cUJBQzNCO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozt3QkFLRSxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7d0JBQ0wsTUFBTTtnQ0FDTixNQUFNOytCQUNOLE1BQU07eUJBQ04sTUFBTTswQkFDTixZQUFZLFNBQUMsY0FBYzswQkFDM0IsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7SUF1Q2hELDRCQUFDO0NBQUEsQUFsRUQsSUFrRUM7U0F4RFkscUJBQXFCOzs7SUFDaEMsd0NBQWdCOztJQUNoQix1Q0FBZTs7SUFFZixzQ0FBd0I7O0lBQ3hCLDRDQUE0Qjs7SUFDNUIsNENBQTRCOztJQUM1Qiw2Q0FBNkI7O0lBQzdCLDRDQUE2Qjs7SUFDN0IseUNBQTBCOztJQUMxQixzQ0FBdUI7O0lBQ3ZCLDBDQUF3Qjs7SUFDeEIsc0NBQTJDOztJQUMzQyw4Q0FBbUQ7O0lBQ25ELDZDQUFrRDs7SUFDbEQsdUNBQThDOztJQUM5Qyx3Q0FBc0M7O0lBQ3RDLHdDQUFvRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpY2UtZWRpdGFibGUtdGV4dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ljZS1lZGl0YWJsZS10ZXh0LmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2ljZS1lZGl0YWJsZS10ZXh0J1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVRleHRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgZWRpdGluZyA9IGZhbHNlO1xuICBhY3RpdmUgPSBmYWxzZTtcblxuICBASW5wdXQoKSBhbGlnbiA9ICdsZWZ0JztcbiAgQElucHV0KCkgZWRpdE9uU3BhY2UgPSB0cnVlO1xuICBASW5wdXQoKSBlZGl0T25DbGljayA9IHRydWU7XG4gIEBJbnB1dCgpIGZvY3VzT25FbnRlciA9IHRydWU7XG4gIEBJbnB1dCgpIGVkaXRPbkZvY3VzID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVycm9yVGV4dCA9ICcnO1xuICBAT3V0cHV0KCkgZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XG4gIEBPdXRwdXQoKSB0b2dnbGVFZGl0aW5nID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICBAT3V0cHV0KCkgdG9nZ2xlQWN0aXZlID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICBAT3V0cHV0KCkgdXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBWaWV3Q2hpbGRyZW4oJ2lucHV0RWxlbWVudCcpIGlucHV0RWw7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnRXcmFwcGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgZW1pdFVwZGF0ZShuZXdUZXh0KSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnVwZGF0ZS5lbWl0KG5ld1RleHQpO1xuICAgIH1cbiAgfVxuXG4gIGVtaXRUb2dnbGVFZGl0aW5nKCRldmVudCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZWRpdGluZyA9ICF0aGlzLmVkaXRpbmc7XG4gICAgfVxuICB9XG5cbiAgZW1pdEZvY3VzKCkge1xuICAgIGlmICh0aGlzLmZvY3VzKSB7XG4gICAgICB0aGlzLmZvY3VzLmVtaXQobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgZW1pdFRvZ2dsZUFjdGl2ZSgkZXZlbnQpIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pbnB1dEVsLmNoYW5nZXMuc3Vic2NyaWJlKGQgPT4ge1xuICAgICAgcmV0dXJuIGQubGFzdCAmJiBkLmxhc3QubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLnZhbHVlID09IG51bGwpIHtcbiAgICAgIHRoaXMudmFsdWUgPVxuICAgICAgICB0aGlzLmNvbnRlbnQgJiZcbiAgICAgICAgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwICYmXG4gICAgICAgIHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXNbMF0uZGF0YTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==