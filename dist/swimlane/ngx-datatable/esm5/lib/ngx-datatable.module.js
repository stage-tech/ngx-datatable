/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollbarHelper } from './services/scrollbar-helper.service';
import { DimensionsHelper } from './services/dimensions-helper.service';
import { ColumnChangesService } from './services/column-changes.service';
import { DataTableFooterTemplateDirective } from './components/footer/footer-template.directive';
import { VisibilityDirective } from './directives/visibility.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { ResizeableDirective } from './directives/resizeable.directive';
import { OrderableDirective } from './directives/orderable.directive';
import { LongPressDirective } from './directives/long-press.directive';
import { ScrollerComponent } from './components/body/scroller.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataTableColumnDirective } from './components/columns/column.directive';
import { DataTableHeaderComponent } from './components/header/header.component';
import { DataTableHeaderCellComponent } from './components/header/header-cell.component';
import { DataTableBodyComponent } from './components/body/body.component';
import { DataTableFooterComponent } from './components/footer/footer.component';
import { DataTablePagerComponent } from './components/footer/pager.component';
import { ProgressBarComponent } from './components/body/progress-bar.component';
import { DataTableBodyRowComponent } from './components/body/body-row.component';
import { DataTableRowWrapperComponent } from './components/body/body-row-wrapper.component';
import { DatatableRowDetailDirective } from './components/row-detail/row-detail.directive';
import { DatatableGroupHeaderDirective } from './components/body/body-group-header.directive';
import { DatatableRowDetailTemplateDirective } from './components/row-detail/row-detail-template.directive';
import { DataTableBodyCellComponent } from './components/body/body-cell.component';
import { DataTableSelectionComponent } from './components/body/selection.component';
import { DataTableColumnHeaderDirective } from './components/columns/column-header.directive';
import { DataTableColumnCellDirective } from './components/columns/column-cell.directive';
import { DataTableColumnCellTreeToggle } from './components/columns/tree.directive';
import { DatatableFooterDirective } from './components/footer/footer.directive';
import { DatatableGroupHeaderTemplateDirective } from './components/body/body-group-header-template.directive';
import { DataTableSummaryRowComponent } from './components/body/summary/summary-row.component';
import { ToolTipRendererDirective } from './directives/ice-custom-html-tooltip.directive';
import { CustomToolTipComponent } from './components/ice-custom-tooltip/ice-custom-tooltip.component';
import { DatatableSelectComponent } from './components/ice-datatable-select/ice-datatable-select.component';
import { EditableTextComponent } from './components/ice-editable-text/ice-editable-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DatatableComponent } from './components/datatable.component';
import { BrowserModule } from '@angular/platform-browser';
var NgxDatatableModule = /** @class */ (function () {
    function NgxDatatableModule() {
    }
    /**
     * Configure global configuration via INgxDatatableConfig
     * @param configuration
     */
    /**
     * Configure global configuration via INgxDatatableConfig
     * @param {?} configuration
     * @return {?}
     */
    NgxDatatableModule.forRoot = /**
     * Configure global configuration via INgxDatatableConfig
     * @param {?} configuration
     * @return {?}
     */
    function (configuration) {
        return {
            ngModule: NgxDatatableModule,
            providers: [{ provide: 'configuration', useValue: configuration }]
        };
    };
    NgxDatatableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatTooltipModule,
                        OverlayModule,
                        MatIconModule,
                        MatButtonModule,
                        BrowserModule,
                        MatFormFieldModule,
                        MatInputModule,
                        FormsModule,
                        ReactiveFormsModule
                    ],
                    providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
                    declarations: [
                        DataTableFooterTemplateDirective,
                        VisibilityDirective,
                        DraggableDirective,
                        ResizeableDirective,
                        OrderableDirective,
                        LongPressDirective,
                        ToolTipRendererDirective,
                        ScrollerComponent,
                        DatatableComponent,
                        DataTableColumnDirective,
                        DataTableHeaderComponent,
                        DataTableHeaderCellComponent,
                        DataTableBodyComponent,
                        DataTableFooterComponent,
                        DataTablePagerComponent,
                        ProgressBarComponent,
                        DataTableBodyRowComponent,
                        DataTableRowWrapperComponent,
                        CustomToolTipComponent,
                        DatatableSelectComponent,
                        EditableTextComponent,
                        DatatableRowDetailDirective,
                        DatatableGroupHeaderDirective,
                        DatatableRowDetailTemplateDirective,
                        DataTableBodyCellComponent,
                        DataTableSelectionComponent,
                        DataTableColumnHeaderDirective,
                        DataTableColumnCellDirective,
                        DataTableColumnCellTreeToggle,
                        DatatableFooterDirective,
                        DatatableGroupHeaderTemplateDirective,
                        DataTableSummaryRowComponent
                    ],
                    exports: [
                        DatatableComponent,
                        DatatableRowDetailDirective,
                        DatatableGroupHeaderDirective,
                        DatatableRowDetailTemplateDirective,
                        DataTableColumnDirective,
                        DataTableColumnHeaderDirective,
                        DataTableColumnCellDirective,
                        DataTableColumnCellTreeToggle,
                        DataTableFooterTemplateDirective,
                        DatatableFooterDirective,
                        DataTablePagerComponent,
                        DatatableGroupHeaderTemplateDirective
                    ],
                    entryComponents: [CustomToolTipComponent]
                },] }
    ];
    return NgxDatatableModule;
}());
export { NgxDatatableModule };
/**
 * Interface definition for INgxDatatableConfig global configuration
 * @record
 */
export function INgxDatatableConfig() { }
if (false) {
    /** @type {?} */
    INgxDatatableConfig.prototype.messages;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGF0YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZGF0YXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4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d0JBQ3hCLGlCQUFpQjt3QkFDakIsa0JBQWtCO3dCQUNsQix3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsNEJBQTRCO3dCQUM1QixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2QixvQkFBb0I7d0JBQ3BCLHlCQUF5Qjt3QkFDekIsNEJBQTRCO3dCQUM1QixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBQzNCLDZCQUE2Qjt3QkFDN0IsbUNBQW1DO3dCQUNuQywwQkFBMEI7d0JBQzFCLDJCQUEyQjt3QkFDM0IsOEJBQThCO3dCQUM5Qiw0QkFBNEI7d0JBQzVCLDZCQUE2Qjt3QkFDN0Isd0JBQXdCO3dCQUN4QixxQ0FBcUM7d0JBQ3JDLDRCQUE0QjtxQkFDN0I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGtCQUFrQjt3QkFDbEIsMkJBQTJCO3dCQUMzQiw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsd0JBQXdCO3dCQUN4Qiw4QkFBOEI7d0JBQzlCLDRCQUE0Qjt3QkFDNUIsNkJBQTZCO3dCQUM3QixnQ0FBZ0M7d0JBQ2hDLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2QixxQ0FBcUM7cUJBQ3RDO29CQUNELGVBQWUsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUMxQzs7SUFZRCx5QkFBQztDQUFBLEFBM0VELElBMkVDO1NBWFksa0JBQWtCOzs7OztBQWdCL0IseUNBTUM7OztJQUxDLHVDQUlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IFNjcm9sbGJhckhlbHBlciB9IGZyb20gJy4vc2VydmljZXMvc2Nyb2xsYmFyLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnNIZWxwZXIgfSBmcm9tICcuL3NlcnZpY2VzL2RpbWVuc2lvbnMtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sdW1uQ2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbHVtbi1jaGFuZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVRhYmxlRm9vdGVyVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmlzaWJpbGl0eURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy92aXNpYmlsaXR5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZXNpemVhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2l6ZWFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9yZGVyYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlcmFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IExvbmdQcmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9sb25nLXByZXNzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3Njcm9sbGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2x1bW5zL2NvbHVtbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZUhlYWRlckNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZVBhZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9wYWdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NCYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9wcm9ncmVzcy1iYXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlSb3dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlUm93V3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktcm93LXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9yb3ctZGV0YWlsL3Jvdy1kZXRhaWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1ncm91cC1oZWFkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvdy1kZXRhaWwvcm93LWRldGFpbC10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQm9keUNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZVNlbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3NlbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLWhlYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2x1bW5zL2NvbHVtbi1jZWxsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2x1bW5zL3RyZWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVHcm91cEhlYWRlclRlbXBsYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1ncm91cC1oZWFkZXItdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZVN1bW1hcnlSb3dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9zdW1tYXJ5L3N1bW1hcnktcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb29sVGlwUmVuZGVyZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IEN1c3RvbVRvb2xUaXBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaWNlLWN1c3RvbS10b29sdGlwL2ljZS1jdXN0b20tdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YXRhYmxlU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ljZS1kYXRhdGFibGUtc2VsZWN0L2ljZS1kYXRhdGFibGUtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFZGl0YWJsZVRleHRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaWNlLWVkaXRhYmxlLXRleHQvaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbU2Nyb2xsYmFySGVscGVyLCBEaW1lbnNpb25zSGVscGVyLCBDb2x1bW5DaGFuZ2VzU2VydmljZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERhdGFUYWJsZUZvb3RlclRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIFZpc2liaWxpdHlEaXJlY3RpdmUsXG4gICAgRHJhZ2dhYmxlRGlyZWN0aXZlLFxuICAgIFJlc2l6ZWFibGVEaXJlY3RpdmUsXG4gICAgT3JkZXJhYmxlRGlyZWN0aXZlLFxuICAgIExvbmdQcmVzc0RpcmVjdGl2ZSxcbiAgICBUb29sVGlwUmVuZGVyZXJEaXJlY3RpdmUsXG4gICAgU2Nyb2xsZXJDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlSGVhZGVyQ2VsbENvbXBvbmVudCxcbiAgICBEYXRhVGFibGVCb2R5Q29tcG9uZW50LFxuICAgIERhdGFUYWJsZUZvb3RlckNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVQYWdlckNvbXBvbmVudCxcbiAgICBQcm9ncmVzc0JhckNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVCb2R5Um93Q29tcG9uZW50LFxuICAgIERhdGFUYWJsZVJvd1dyYXBwZXJDb21wb25lbnQsXG4gICAgQ3VzdG9tVG9vbFRpcENvbXBvbmVudCxcbiAgICBEYXRhdGFibGVTZWxlY3RDb21wb25lbnQsXG4gICAgRWRpdGFibGVUZXh0Q29tcG9uZW50LFxuICAgIERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSxcbiAgICBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZSxcbiAgICBEYXRhdGFibGVSb3dEZXRhaWxUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVCb2R5Q2VsbENvbXBvbmVudCxcbiAgICBEYXRhVGFibGVTZWxlY3Rpb25Db21wb25lbnQsXG4gICAgRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUNvbHVtbkNlbGxEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbFRyZWVUb2dnbGUsXG4gICAgRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZUdyb3VwSGVhZGVyVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlU3VtbWFyeVJvd0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGF0YXRhYmxlQ29tcG9uZW50LFxuICAgIERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSxcbiAgICBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZSxcbiAgICBEYXRhdGFibGVSb3dEZXRhaWxUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUNvbHVtbkNlbGxEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbFRyZWVUb2dnbGUsXG4gICAgRGF0YVRhYmxlRm9vdGVyVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZVBhZ2VyQ29tcG9uZW50LFxuICAgIERhdGF0YWJsZUdyb3VwSGVhZGVyVGVtcGxhdGVEaXJlY3RpdmVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbQ3VzdG9tVG9vbFRpcENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGF0YXRhYmxlTW9kdWxlIHtcbiAgLyoqXG4gICAqIENvbmZpZ3VyZSBnbG9iYWwgY29uZmlndXJhdGlvbiB2aWEgSU5neERhdGF0YWJsZUNvbmZpZ1xuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvblxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoY29uZmlndXJhdGlvbjogSU5neERhdGF0YWJsZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4RGF0YXRhYmxlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiAnY29uZmlndXJhdGlvbicsIHVzZVZhbHVlOiBjb25maWd1cmF0aW9uIH1dXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEludGVyZmFjZSBkZWZpbml0aW9uIGZvciBJTmd4RGF0YXRhYmxlQ29uZmlnIGdsb2JhbCBjb25maWd1cmF0aW9uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSU5neERhdGF0YWJsZUNvbmZpZyB7XG4gIG1lc3NhZ2VzOiB7XG4gICAgZW1wdHlNZXNzYWdlOiBzdHJpbmc7IC8vIE1lc3NhZ2UgdG8gc2hvdyB3aGVuIGFycmF5IGlzIHByZXNlbnRlZCwgYnV0IGNvbnRhaW5zIG5vIHZhbHVlc1xuICAgIHRvdGFsTWVzc2FnZTogc3RyaW5nOyAvLyBGb290ZXIgdG90YWwgbWVzc2FnZVxuICAgIHNlbGVjdGVkTWVzc2FnZTogc3RyaW5nOyAvLyBGb290ZXIgc2VsZWN0ZWQgbWVzc2FnZVxuICB9O1xufVxuIl19