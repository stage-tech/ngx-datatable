import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ElementRef, OnDestroy, OnInit } from '@angular/core';
export declare class ToolTipRendererDirective implements OnDestroy, OnInit {
    private _overlay;
    private _overlayPositionBuilder;
    private _elementRef;
    iceTooltipHtmlText: string;
    showToolTip: boolean;
    showToolTipOnTextOverflow: boolean;
    duration: number;
    private _overlayRef;
    private timeout;
    constructor(_overlay: Overlay, _overlayPositionBuilder: OverlayPositionBuilder, _elementRef: ElementRef);
    ngOnInit(): void;
    show(): void;
    hide(): void;
    ngOnDestroy(): void;
    private closeToolTip;
}
