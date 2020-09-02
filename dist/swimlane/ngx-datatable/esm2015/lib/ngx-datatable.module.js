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
import { DatatableComponent } from './components/datatable.component';
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
export class NgxDatatableModule {
    /**
     * Configure global configuration via INgxDatatableConfig
     * @param {?} configuration
     * @return {?}
     */
    static forRoot(configuration) {
        return {
            ngModule: NgxDatatableModule,
            providers: [{ provide: 'configuration', useValue: configuration }]
        };
    }
}
NgxDatatableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatTooltipModule, OverlayModule, MatIconModule, MatButtonModule],
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
/**
 * Interface definition for INgxDatatableConfig global configuration
 * @record
 */
export function INgxDatatableConfig() { }
if (false) {
    /** @type {?} */
    INgxDatatableConfig.prototype.messages;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGF0YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZGF0YXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxr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QTJCO29CQUMzQiw4QkFBOEI7b0JBQzlCLDRCQUE0QjtvQkFDNUIsNkJBQTZCO29CQUM3Qix3QkFBd0I7b0JBQ3hCLHFDQUFxQztvQkFDckMsNEJBQTRCO2lCQUM3QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asa0JBQWtCO29CQUNsQiwyQkFBMkI7b0JBQzNCLDZCQUE2QjtvQkFDN0IsbUNBQW1DO29CQUNuQyx3QkFBd0I7b0JBQ3hCLDhCQUE4QjtvQkFDOUIsNEJBQTRCO29CQUM1Qiw2QkFBNkI7b0JBQzdCLGdDQUFnQztvQkFDaEMsd0JBQXdCO29CQUN4Qix1QkFBdUI7b0JBQ3ZCLHFDQUFxQztpQkFDdEM7Z0JBQ0QsZUFBZSxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDMUM7Ozs7OztBQWlCRCx5Q0FNQzs7O0lBTEMsdUNBSUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcclxuaW1wb3J0IHsgU2Nyb2xsYmFySGVscGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9zY3JvbGxiYXItaGVscGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEaW1lbnNpb25zSGVscGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9kaW1lbnNpb25zLWhlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29sdW1uQ2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbHVtbi1jaGFuZ2VzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFZpc2liaWxpdHlEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlzaWJpbGl0eS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFJlc2l6ZWFibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVzaXplYWJsZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBPcmRlcmFibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3JkZXJhYmxlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IExvbmdQcmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9sb25nLXByZXNzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFNjcm9sbGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvc2Nyb2xsZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2RhdGF0YWJsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YVRhYmxlSGVhZGVyQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWNlbGwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YVRhYmxlQm9keUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YVRhYmxlRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YVRhYmxlUGFnZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL3BhZ2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFByb2dyZXNzQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlSb3dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LXJvdy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVSb3dXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1yb3ctd3JhcHBlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvcm93LWRldGFpbC9yb3ctZGV0YWlsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1ncm91cC1oZWFkZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0YXRhYmxlUm93RGV0YWlsVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvcm93LWRldGFpbC9yb3ctZGV0YWlsLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1jZWxsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGFUYWJsZVNlbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3NlbGVjdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy9jb2x1bW4taGVhZGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkNlbGxEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy9jb2x1bW4tY2VsbC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2x1bW5zL3RyZWUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZVN1bW1hcnlSb3dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9zdW1tYXJ5L3N1bW1hcnktcm93LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRvb2xUaXBSZW5kZXJlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9pY2UtY3VzdG9tLWh0bWwtdG9vbHRpcC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDdXN0b21Ub29sVGlwQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ljZS1jdXN0b20tdG9vbHRpcC9pY2UtY3VzdG9tLXRvb2x0aXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YXRhYmxlU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ljZS1kYXRhdGFibGUtc2VsZWN0L2ljZS1kYXRhdGFibGUtc2VsZWN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEVkaXRhYmxlVGV4dENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9pY2UtZWRpdGFibGUtdGV4dC9pY2UtZWRpdGFibGUtdGV4dC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW1Njcm9sbGJhckhlbHBlciwgRGltZW5zaW9uc0hlbHBlciwgQ29sdW1uQ2hhbmdlc1NlcnZpY2VdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRGF0YVRhYmxlRm9vdGVyVGVtcGxhdGVEaXJlY3RpdmUsXHJcbiAgICBWaXNpYmlsaXR5RGlyZWN0aXZlLFxyXG4gICAgRHJhZ2dhYmxlRGlyZWN0aXZlLFxyXG4gICAgUmVzaXplYWJsZURpcmVjdGl2ZSxcclxuICAgIE9yZGVyYWJsZURpcmVjdGl2ZSxcclxuICAgIExvbmdQcmVzc0RpcmVjdGl2ZSxcclxuICAgIFRvb2xUaXBSZW5kZXJlckRpcmVjdGl2ZSxcclxuICAgIFNjcm9sbGVyQ29tcG9uZW50LFxyXG4gICAgRGF0YXRhYmxlQ29tcG9uZW50LFxyXG4gICAgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlLFxyXG4gICAgRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50LFxyXG4gICAgRGF0YVRhYmxlSGVhZGVyQ2VsbENvbXBvbmVudCxcclxuICAgIERhdGFUYWJsZUJvZHlDb21wb25lbnQsXHJcbiAgICBEYXRhVGFibGVGb290ZXJDb21wb25lbnQsXHJcbiAgICBEYXRhVGFibGVQYWdlckNvbXBvbmVudCxcclxuICAgIFByb2dyZXNzQmFyQ29tcG9uZW50LFxyXG4gICAgRGF0YVRhYmxlQm9keVJvd0NvbXBvbmVudCxcclxuICAgIERhdGFUYWJsZVJvd1dyYXBwZXJDb21wb25lbnQsXHJcbiAgICBDdXN0b21Ub29sVGlwQ29tcG9uZW50LFxyXG4gICAgRGF0YXRhYmxlU2VsZWN0Q29tcG9uZW50LFxyXG4gICAgRWRpdGFibGVUZXh0Q29tcG9uZW50LFxyXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLFxyXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmUsXHJcbiAgICBEYXRhdGFibGVSb3dEZXRhaWxUZW1wbGF0ZURpcmVjdGl2ZSxcclxuICAgIERhdGFUYWJsZUJvZHlDZWxsQ29tcG9uZW50LFxyXG4gICAgRGF0YVRhYmxlU2VsZWN0aW9uQ29tcG9uZW50LFxyXG4gICAgRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlLFxyXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSxcclxuICAgIERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlLFxyXG4gICAgRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlLFxyXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSxcclxuICAgIERhdGFUYWJsZVN1bW1hcnlSb3dDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIERhdGF0YWJsZUNvbXBvbmVudCxcclxuICAgIERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSxcclxuICAgIERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLFxyXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsVGVtcGxhdGVEaXJlY3RpdmUsXHJcbiAgICBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUsXHJcbiAgICBEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUsXHJcbiAgICBEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlLFxyXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbFRyZWVUb2dnbGUsXHJcbiAgICBEYXRhVGFibGVGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSxcclxuICAgIERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSxcclxuICAgIERhdGFUYWJsZVBhZ2VyQ29tcG9uZW50LFxyXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbQ3VzdG9tVG9vbFRpcENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neERhdGF0YWJsZU1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogQ29uZmlndXJlIGdsb2JhbCBjb25maWd1cmF0aW9uIHZpYSBJTmd4RGF0YXRhYmxlQ29uZmlnXHJcbiAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb25cclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uOiBJTmd4RGF0YXRhYmxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogTmd4RGF0YXRhYmxlTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6ICdjb25maWd1cmF0aW9uJywgdXNlVmFsdWU6IGNvbmZpZ3VyYXRpb24gfV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGRlZmluaXRpb24gZm9yIElOZ3hEYXRhdGFibGVDb25maWcgZ2xvYmFsIGNvbmZpZ3VyYXRpb25cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5neERhdGF0YWJsZUNvbmZpZyB7XHJcbiAgbWVzc2FnZXM6IHtcclxuICAgIGVtcHR5TWVzc2FnZTogc3RyaW5nOyAvLyBNZXNzYWdlIHRvIHNob3cgd2hlbiBhcnJheSBpcyBwcmVzZW50ZWQsIGJ1dCBjb250YWlucyBubyB2YWx1ZXNcclxuICAgIHRvdGFsTWVzc2FnZTogc3RyaW5nOyAvLyBGb290ZXIgdG90YWwgbWVzc2FnZVxyXG4gICAgc2VsZWN0ZWRNZXNzYWdlOiBzdHJpbmc7IC8vIEZvb3RlciBzZWxlY3RlZCBtZXNzYWdlXHJcbiAgfTtcclxufVxyXG4iXX0=