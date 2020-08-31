import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ElementRef, OnDestroy } from '@angular/core';
export declare class ToolTipRendererDirective implements OnDestroy {
    private _overlay;
    private _overlayPositionBuilder;
    private _elementRef;
    iceTooltipHtmlText: string;
    showToolTip: boolean;
    showToolTipOnTextOverflow: boolean;
    duration: number;
    private _overlayRef;
    private timeout;
    private componentInstance;
    constructor(_overlay: Overlay, _overlayPositionBuilder: OverlayPositionBuilder, _elementRef: ElementRef);
    show(): void;
    hide(): void;
    ngOnDestroy(): void;
    private closeToolTip;
}
