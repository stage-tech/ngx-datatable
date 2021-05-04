import { OverlayRef } from '@angular/cdk/overlay';
/**
 * service to make DatatableComponent aware of changes to
 * input bindings of DataTableColumnDirective
 */
export declare class ToolbarService {
    _overlayRef: OverlayRef;
    timeout: any;
    componentInstance: any;
    setToolbar(_overlay: any, _overlayPositionBuilder: any, _elementRef: any, iceTooltipHtmlText: any, duration: any): void;
    clearTimeout(): void;
    setTimeout(duration: any): void;
    destroy(): void;
    closeToolTip(): void;
}
