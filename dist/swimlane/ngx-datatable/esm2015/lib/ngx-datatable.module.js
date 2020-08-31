/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
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
                imports: [CommonModule, MatTooltipModule, OverlayModule, MatIconModule],
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
                ]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGF0YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZGF0YXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFN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Qyx3QkFBd0I7b0JBQ3hCLDhCQUE4QjtvQkFDOUIsNEJBQTRCO29CQUM1Qiw2QkFBNkI7b0JBQzdCLGdDQUFnQztvQkFDaEMsd0JBQXdCO29CQUN4Qix1QkFBdUI7b0JBQ3ZCLHFDQUFxQztpQkFDdEM7YUFDRjs7Ozs7O0FBaUJELHlDQU1DOzs7SUFMQyx1Q0FJRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IFNjcm9sbGJhckhlbHBlciB9IGZyb20gJy4vc2VydmljZXMvc2Nyb2xsYmFyLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnNIZWxwZXIgfSBmcm9tICcuL3NlcnZpY2VzL2RpbWVuc2lvbnMtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sdW1uQ2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbHVtbi1jaGFuZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVRhYmxlRm9vdGVyVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmlzaWJpbGl0eURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy92aXNpYmlsaXR5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZXNpemVhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2l6ZWFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9yZGVyYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlcmFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IExvbmdQcmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9sb25nLXByZXNzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3Njcm9sbGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVIZWFkZXJDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQm9keUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZUZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVQYWdlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb290ZXIvcGFnZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2dyZXNzQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Um93Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZVJvd1dyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LXJvdy13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvcm93LWRldGFpbC9yb3ctZGV0YWlsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVSb3dEZXRhaWxUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9yb3ctZGV0YWlsL3Jvdy1kZXRhaWwtdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVTZWxlY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9zZWxlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2x1bW5zL2NvbHVtbi1oZWFkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkNlbGxEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy9jb2x1bW4tY2VsbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uQ2VsbFRyZWVUb2dnbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy90cmVlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdW1tYXJ5Um93Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvc3VtbWFyeS9zdW1tYXJ5LXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9vbFRpcFJlbmRlcmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ljZS1jdXN0b20taHRtbC10b29sdGlwLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDdXN0b21Ub29sVGlwQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ljZS1jdXN0b20tdG9vbHRpcC9pY2UtY3VzdG9tLXRvb2x0aXAuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgTWF0SWNvbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1Njcm9sbGJhckhlbHBlciwgRGltZW5zaW9uc0hlbHBlciwgQ29sdW1uQ2hhbmdlc1NlcnZpY2VdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEYXRhVGFibGVGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBWaXNpYmlsaXR5RGlyZWN0aXZlLFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBSZXNpemVhYmxlRGlyZWN0aXZlLFxuICAgIE9yZGVyYWJsZURpcmVjdGl2ZSxcbiAgICBMb25nUHJlc3NEaXJlY3RpdmUsXG4gICAgVG9vbFRpcFJlbmRlcmVyRGlyZWN0aXZlLFxuICAgIFNjcm9sbGVyQ29tcG9uZW50LFxuICAgIERhdGF0YWJsZUNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZUhlYWRlckNlbGxDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlQm9keUNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVGb290ZXJDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlUGFnZXJDb21wb25lbnQsXG4gICAgUHJvZ3Jlc3NCYXJDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlQm9keVJvd0NvbXBvbmVudCxcbiAgICBEYXRhVGFibGVSb3dXcmFwcGVyQ29tcG9uZW50LFxuICAgIEN1c3RvbVRvb2xUaXBDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUJvZHlDZWxsQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZVNlbGVjdGlvbkNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSxcbiAgICBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUsXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVTdW1tYXJ5Um93Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEYXRhdGFibGVDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSxcbiAgICBEYXRhVGFibGVGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlUGFnZXJDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neERhdGF0YWJsZU1vZHVsZSB7XG4gIC8qKlxuICAgKiBDb25maWd1cmUgZ2xvYmFsIGNvbmZpZ3VyYXRpb24gdmlhIElOZ3hEYXRhdGFibGVDb25maWdcbiAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyYXRpb246IElOZ3hEYXRhdGFibGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neERhdGF0YWJsZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogJ2NvbmZpZ3VyYXRpb24nLCB1c2VWYWx1ZTogY29uZmlndXJhdGlvbiB9XVxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZGVmaW5pdGlvbiBmb3IgSU5neERhdGF0YWJsZUNvbmZpZyBnbG9iYWwgY29uZmlndXJhdGlvblxuICovXG5leHBvcnQgaW50ZXJmYWNlIElOZ3hEYXRhdGFibGVDb25maWcge1xuICBtZXNzYWdlczoge1xuICAgIGVtcHR5TWVzc2FnZTogc3RyaW5nOyAvLyBNZXNzYWdlIHRvIHNob3cgd2hlbiBhcnJheSBpcyBwcmVzZW50ZWQsIGJ1dCBjb250YWlucyBubyB2YWx1ZXNcbiAgICB0b3RhbE1lc3NhZ2U6IHN0cmluZzsgLy8gRm9vdGVyIHRvdGFsIG1lc3NhZ2VcbiAgICBzZWxlY3RlZE1lc3NhZ2U6IHN0cmluZzsgLy8gRm9vdGVyIHNlbGVjdGVkIG1lc3NhZ2VcbiAgfTtcbn1cbiJdfQ==