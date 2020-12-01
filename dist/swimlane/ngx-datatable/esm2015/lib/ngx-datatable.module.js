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
import { MatSelectModule } from '@angular/material';
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
                imports: [
                    CommonModule,
                    MatTooltipModule,
                    OverlayModule,
                    MatIconModule,
                    MatButtonModule,
                    MatInputModule,
                    MatFormFieldModule,
                    MatSelectModule,
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
/**
 * Interface definition for INgxDatatableConfig global configuration
 * @record
 */
export function INgxDatatableConfig() { }
if (false) {
    /** @type {?} */
    INgxDatatableConfig.prototype.messages;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGF0YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZGF0YXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4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QUFpQjtvQkFDakIsa0JBQWtCO29CQUNsQix3QkFBd0I7b0JBQ3hCLHdCQUF3QjtvQkFDeEIsNEJBQTRCO29CQUM1QixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2QixvQkFBb0I7b0JBQ3BCLHlCQUF5QjtvQkFDekIsNEJBQTRCO29CQUM1QixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIscUJBQXFCO29CQUNyQiwyQkFBMkI7b0JBQzNCLDZCQUE2QjtvQkFDN0IsbUNBQW1DO29CQUNuQywwQkFBMEI7b0JBQzFCLDJCQUEyQjtvQkFDM0IsOEJBQThCO29CQUM5Qiw0QkFBNEI7b0JBQzVCLDZCQUE2QjtvQkFDN0Isd0JBQXdCO29CQUN4QixxQ0FBcUM7b0JBQ3JDLDRCQUE0QjtpQkFDN0I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtvQkFDbEIsMkJBQTJCO29CQUMzQiw2QkFBNkI7b0JBQzdCLG1DQUFtQztvQkFDbkMsd0JBQXdCO29CQUN4Qiw4QkFBOEI7b0JBQzlCLDRCQUE0QjtvQkFDNUIsNkJBQTZCO29CQUM3QixnQ0FBZ0M7b0JBQ2hDLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2QixxQ0FBcUM7aUJBQ3RDO2dCQUNELGVBQWUsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQzFDOzs7Ozs7QUFpQkQseUNBTUM7OztJQUxDLHVDQUlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IFNjcm9sbGJhckhlbHBlciB9IGZyb20gJy4vc2VydmljZXMvc2Nyb2xsYmFyLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnNIZWxwZXIgfSBmcm9tICcuL3NlcnZpY2VzL2RpbWVuc2lvbnMtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sdW1uQ2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbHVtbi1jaGFuZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVRhYmxlRm9vdGVyVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmlzaWJpbGl0eURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy92aXNpYmlsaXR5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZXNpemVhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2l6ZWFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9yZGVyYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlcmFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IExvbmdQcmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9sb25nLXByZXNzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3Njcm9sbGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2x1bW5zL2NvbHVtbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZUhlYWRlckNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZVBhZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9wYWdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NCYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9wcm9ncmVzcy1iYXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlSb3dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlUm93V3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktcm93LXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9yb3ctZGV0YWlsL3Jvdy1kZXRhaWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1ncm91cC1oZWFkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvdy1kZXRhaWwvcm93LWRldGFpbC10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQm9keUNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZVNlbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3NlbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLWhlYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2x1bW5zL2NvbHVtbi1jZWxsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2x1bW5zL3RyZWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVHcm91cEhlYWRlclRlbXBsYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1ncm91cC1oZWFkZXItdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZVN1bW1hcnlSb3dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9zdW1tYXJ5L3N1bW1hcnktcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb29sVGlwUmVuZGVyZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaWNlLWN1c3RvbS1odG1sLXRvb2x0aXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IEN1c3RvbVRvb2xUaXBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaWNlLWN1c3RvbS10b29sdGlwL2ljZS1jdXN0b20tdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YXRhYmxlU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ljZS1kYXRhdGFibGUtc2VsZWN0L2ljZS1kYXRhdGFibGUtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFZGl0YWJsZVRleHRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaWNlLWVkaXRhYmxlLXRleHQvaWNlLWVkaXRhYmxlLXRleHQuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtTY3JvbGxiYXJIZWxwZXIsIERpbWVuc2lvbnNIZWxwZXIsIENvbHVtbkNoYW5nZXNTZXJ2aWNlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGF0YVRhYmxlRm9vdGVyVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgVmlzaWJpbGl0eURpcmVjdGl2ZSxcbiAgICBEcmFnZ2FibGVEaXJlY3RpdmUsXG4gICAgUmVzaXplYWJsZURpcmVjdGl2ZSxcbiAgICBPcmRlcmFibGVEaXJlY3RpdmUsXG4gICAgTG9uZ1ByZXNzRGlyZWN0aXZlLFxuICAgIFRvb2xUaXBSZW5kZXJlckRpcmVjdGl2ZSxcbiAgICBTY3JvbGxlckNvbXBvbmVudCxcbiAgICBEYXRhdGFibGVDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVIZWFkZXJDZWxsQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZUJvZHlDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlRm9vdGVyQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZVBhZ2VyQ29tcG9uZW50LFxuICAgIFByb2dyZXNzQmFyQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZUJvZHlSb3dDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlUm93V3JhcHBlckNvbXBvbmVudCxcbiAgICBDdXN0b21Ub29sVGlwQ29tcG9uZW50LFxuICAgIERhdGF0YWJsZVNlbGVjdENvbXBvbmVudCxcbiAgICBFZGl0YWJsZVRleHRDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUJvZHlDZWxsQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZVNlbGVjdGlvbkNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSxcbiAgICBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUsXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVTdW1tYXJ5Um93Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEYXRhdGFibGVDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSxcbiAgICBEYXRhVGFibGVGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlUGFnZXJDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDdXN0b21Ub29sVGlwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEYXRhdGFibGVNb2R1bGUge1xuICAvKipcbiAgICogQ29uZmlndXJlIGdsb2JhbCBjb25maWd1cmF0aW9uIHZpYSBJTmd4RGF0YXRhYmxlQ29uZmlnXG4gICAqIEBwYXJhbSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uOiBJTmd4RGF0YXRhYmxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6ICdjb25maWd1cmF0aW9uJywgdXNlVmFsdWU6IGNvbmZpZ3VyYXRpb24gfV1cbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGRlZmluaXRpb24gZm9yIElOZ3hEYXRhdGFibGVDb25maWcgZ2xvYmFsIGNvbmZpZ3VyYXRpb25cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJTmd4RGF0YXRhYmxlQ29uZmlnIHtcbiAgbWVzc2FnZXM6IHtcbiAgICBlbXB0eU1lc3NhZ2U6IHN0cmluZzsgLy8gTWVzc2FnZSB0byBzaG93IHdoZW4gYXJyYXkgaXMgcHJlc2VudGVkLCBidXQgY29udGFpbnMgbm8gdmFsdWVzXG4gICAgdG90YWxNZXNzYWdlOiBzdHJpbmc7IC8vIEZvb3RlciB0b3RhbCBtZXNzYWdlXG4gICAgc2VsZWN0ZWRNZXNzYWdlOiBzdHJpbmc7IC8vIEZvb3RlciBzZWxlY3RlZCBtZXNzYWdlXG4gIH07XG59XG4iXX0=