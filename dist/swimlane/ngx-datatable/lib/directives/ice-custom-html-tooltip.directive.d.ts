import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ElementRef, OnDestroy } from '@angular/core';
import { ToolbarService } from '../services/toolbar-service';
export declare class ToolTipRendererDirective implements OnDestroy {
    private _overlay;
    private _overlayPositionBuilder;
    private _elementRef;
    private toolbarService;
    iceTooltipHtmlText: string;
    showToolTip: boolean;
    showToolTipOnTextOverflow: boolean;
    duration: number;
    constructor(_overlay: Overlay, _overlayPositionBuilder: OverlayPositionBuilder, _elementRef: ElementRef, toolbarService: ToolbarService);
    show(): void;
    hide(): void;
    ngOnDestroy(): void;
}
