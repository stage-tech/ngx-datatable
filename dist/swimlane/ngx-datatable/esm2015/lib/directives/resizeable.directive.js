/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { MouseEvent } from '../events';
import { takeUntil } from 'rxjs/operators';
export class ResizeableDirective {
    /**
     * @param {?} element
     * @param {?} renderer
     */
    constructor(element, renderer) {
        this.renderer = renderer;
        this.resizeEnabled = true;
        this.resize = new EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const renderer2 = this.renderer;
        /** @type {?} */
        const node = renderer2.createElement('span');
        if (this.resizeEnabled) {
            renderer2.addClass(node, 'resize-handle');
        }
        else {
            renderer2.addClass(node, 'resize-handle--not-resizable');
        }
        renderer2.appendChild(this.element, node);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroySubscription();
    }
    /**
     * @return {?}
     */
    onMouseup() {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
            this.resize.emit(this.element.clientWidth);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMousedown(event) {
        /** @type {?} */
        const isHandle = ((/** @type {?} */ (event.target))).classList.contains('resize-handle');
        /** @type {?} */
        const initialWidth = this.element.clientWidth;
        /** @type {?} */
        const mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            /** @type {?} */
            const mouseup = fromEvent(document, 'mouseup');
            this.subscription = mouseup.subscribe((/**
             * @param {?} ev
             * @return {?}
             */
            (ev) => this.onMouseup()));
            /** @type {?} */
            const mouseMoveSub = fromEvent(document, 'mousemove')
                .pipe(takeUntil(mouseup))
                .subscribe((/**
             * @param {?} e
             * @return {?}
             */
            (e) => this.move(e, initialWidth, mouseDownScreenX)));
            this.subscription.add(mouseMoveSub);
        }
    }
    /**
     * @param {?} event
     * @param {?} initialWidth
     * @param {?} mouseDownScreenX
     * @return {?}
     */
    move(event, initialWidth, mouseDownScreenX) {
        /** @type {?} */
        const movementX = event.screenX - mouseDownScreenX;
        /** @type {?} */
        const newWidth = initialWidth + movementX;
        /** @type {?} */
        const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        /** @type {?} */
        const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = `${newWidth}px`;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _destroySubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
}
ResizeableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[resizeable]',
                host: {
                    '[class.resizeable]': 'resizeEnabled'
                }
            },] }
];
/** @nocollapse */
ResizeableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
ResizeableDirective.propDecorators = {
    resizeEnabled: [{ type: Input }],
    minWidth: [{ type: Input }],
    maxWidth: [{ type: Input }],
    resize: [{ type: Output }],
    onMousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    ResizeableDirective.prototype.resizeEnabled;
    /** @type {?} */
    ResizeableDirective.prototype.minWidth;
    /** @type {?} */
    ResizeableDirective.prototype.maxWidth;
    /** @type {?} */
    ResizeableDirective.prototype.resize;
    /** @type {?} */
    ResizeableDirective.prototype.element;
    /** @type {?} */
    ResizeableDirective.prototype.subscription;
    /** @type {?} */
    ResizeableDirective.prototype.resizing;
    /**
     * @type {?}
     * @private
     */
    ResizeableDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplYWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3Jlc2l6ZWFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBNEIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUTNDLE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBVzlCLFlBQVksT0FBbUIsRUFBVSxRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBVm5ELGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBSTdCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUl6RCxhQUFRLEdBQVksS0FBSyxDQUFDO1FBR3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDOzs7O0lBRUQsZUFBZTs7Y0FDUCxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVE7O2NBQ3pCLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLDhCQUE4QixDQUFDLENBQUM7U0FDMUQ7UUFDRCxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FB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cUI7O0lBQ3JCLDJDQUEyQjs7SUFDM0IsdUNBQTBCOzs7OztJQUVPLHVDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi9ldmVudHMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tyZXNpemVhYmxlXScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzcy5yZXNpemVhYmxlXSc6ICdyZXNpemVFbmFibGVkJ1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlc2l6ZWFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIHJlc2l6ZUVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG1pbldpZHRoOiBudW1iZXI7XHJcbiAgQElucHV0KCkgbWF4V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgQE91dHB1dCgpIHJlc2l6ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHJlc2l6aW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVuZGVyZXIyID0gdGhpcy5yZW5kZXJlcjtcclxuICAgIGNvbnN0IG5vZGUgPSByZW5kZXJlcjIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgaWYgKHRoaXMucmVzaXplRW5hYmxlZCkge1xyXG4gICAgICByZW5kZXJlcjIuYWRkQ2xhc3Mobm9kZSwgJ3Jlc2l6ZS1oYW5kbGUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlbmRlcmVyMi5hZGRDbGFzcyhub2RlLCAncmVzaXplLWhhbmRsZS0tbm90LXJlc2l6YWJsZScpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyZXIyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCwgbm9kZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKTtcclxuICB9XHJcblxyXG4gIG9uTW91c2V1cCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzaXppbmcgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24gJiYgIXRoaXMuc3Vic2NyaXB0aW9uLmNsb3NlZCkge1xyXG4gICAgICB0aGlzLl9kZXN0cm95U3Vic2NyaXB0aW9uKCk7XHJcbiAgICAgIHRoaXMucmVzaXplLmVtaXQodGhpcy5lbGVtZW50LmNsaWVudFdpZHRoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXHJcbiAgb25Nb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlzSGFuZGxlID0gKDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucygncmVzaXplLWhhbmRsZScpO1xyXG4gICAgY29uc3QgaW5pdGlhbFdpZHRoID0gdGhpcy5lbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgY29uc3QgbW91c2VEb3duU2NyZWVuWCA9IGV2ZW50LnNjcmVlblg7XHJcblxyXG4gICAgaWYgKGlzSGFuZGxlKSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLnJlc2l6aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIGNvbnN0IG1vdXNldXAgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbW91c2V1cC5zdWJzY3JpYmUoKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2V1cCgpKTtcclxuXHJcbiAgICAgIGNvbnN0IG1vdXNlTW92ZVN1YiA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNlbW92ZScpXHJcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKG1vdXNldXApKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW92ZShlLCBpbml0aWFsV2lkdGgsIG1vdXNlRG93blNjcmVlblgpKTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChtb3VzZU1vdmVTdWIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZShldmVudDogTW91c2VFdmVudCwgaW5pdGlhbFdpZHRoOiBudW1iZXIsIG1vdXNlRG93blNjcmVlblg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgbW92ZW1lbnRYID0gZXZlbnQuc2NyZWVuWCAtIG1vdXNlRG93blNjcmVlblg7XHJcbiAgICBjb25zdCBuZXdXaWR0aCA9IGluaXRpYWxXaWR0aCArIG1vdmVtZW50WDtcclxuXHJcbiAgICBjb25zdCBvdmVyTWluV2lkdGggPSAhdGhpcy5taW5XaWR0aCB8fCBuZXdXaWR0aCA+PSB0aGlzLm1pbldpZHRoO1xyXG4gICAgY29uc3QgdW5kZXJNYXhXaWR0aCA9ICF0aGlzLm1heFdpZHRoIHx8IG5ld1dpZHRoIDw9IHRoaXMubWF4V2lkdGg7XHJcblxyXG4gICAgaWYgKG92ZXJNaW5XaWR0aCAmJiB1bmRlck1heFdpZHRoKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IGAke25ld1dpZHRofXB4YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==