/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Column Type
 * @record
 */
export function TableColumn() { }
if (false) {
    /**
     * Internal unique id
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.$$id;
    /**
     * Internal for column width distributions
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.$$oldWidth;
    /**
     * Internal for setColumnDefaults
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.$$valueGetter;
    /**
     * Determines if column is checkbox
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.checkboxable;
    /**
     * Determines if the column is frozen to the left
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.frozenLeft;
    /**
     * Determines if the column is frozen to the right
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.frozenRight;
    /**
     * The grow factor relative to other columns. Same as the flex-grow
     * API from http =//www.w3.org/TR/css3-flexbox/. Basically;
     * take any available extra width and distribute it proportionally
     * according to all columns' flexGrow values.
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.flexGrow;
    /**
     * Min width of the column
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.minWidth;
    /**
     * Max width of the column
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.maxWidth;
    /**
     * The default width of the column, in pixels
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.width;
    /**
     * Can the column be resized
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.resizeable;
    /**
     * Custom sort comparator
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.comparator;
    /**
     * Custom pipe transforms
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.pipe;
    /**
     * Can the column be sorted
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.sortable;
    /**
     * Can the column be re-arranged by dragging
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.draggable;
    /**
     * Whether the column can automatically resize to fill space in the table.
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.canAutoResize;
    /**
     * Column name or label
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.name;
    /**
     * Property to bind to the row. Example:
     *
     * `someField` or `some.field.nested`, 0 (numeric)
     *
     * If left blank, will use the name as camel case conversion
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.prop;
    /**
     * Cell template ref
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.cellTemplate;
    /**
     * Header template ref
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.headerTemplate;
    /**
     * Tree toggle template ref
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.treeToggleTemplate;
    /**
     * CSS Classes for the cell
     *
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.cellClass;
    /**
     * CSS classes for the header
     *
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.headerClass;
    /**
     * Header checkbox enabled
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.headerCheckboxable;
    /**
     * Is tree displayed on this column
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.isTreeColumn;
    /**
     * Width of the tree level indent
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.treeLevelIndent;
    /**
     * Summary function
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.summaryFunc;
    /**
     * Summary cell template ref
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.summaryTemplate;
    /**
     * Ice special cases
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.icons;
    /** @type {?|undefined} */
    TableColumn.prototype.iconCustomTooltipHtmlText;
    /** @type {?|undefined} */
    TableColumn.prototype.iconColor;
    /** @type {?|undefined} */
    TableColumn.prototype.actionButtonIcon;
    /** @type {?|undefined} */
    TableColumn.prototype.action;
    /** @type {?|undefined} */
    TableColumn.prototype.hideActionButton;
    /** @type {?|undefined} */
    TableColumn.prototype.actionButtonTooltip;
    /** @type {?|undefined} */
    TableColumn.prototype.selectOptions;
    /** @type {?|undefined} */
    TableColumn.prototype.editable;
    /** @type {?|undefined} */
    TableColumn.prototype.defaultValue;
    /** @type {?|undefined} */
    TableColumn.prototype.disabled;
    /** @type {?|undefined} */
    TableColumn.prototype.hideIfEmpty;
    /** @type {?|undefined} */
    TableColumn.prototype.hideEditIcon;
    /** @type {?|undefined} */
    TableColumn.prototype.errorMessageField;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1uLnR5cGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi90eXBlcy90YWJsZS1jb2x1bW4udHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWNBLGlDQThPQzs7Ozs7Ozs7SUF4T0MsMkJBQWM7Ozs7Ozs7SUFPZCxpQ0FBb0I7Ozs7Ozs7SUFPcEIsb0NBQTRCOzs7Ozs7O0lBTzVCLG1DQUF1Qjs7Ozs7OztJQU92QixpQ0FBcUI7Ozs7Ozs7SUFPckIsa0NBQXNCOzs7Ozs7Ozs7O0lBVXRCLCtCQUFrQjs7Ozs7OztJQU9sQiwrQkFBa0I7Ozs7Ozs7SUFPbEIsK0JBQWtCOzs7Ozs7O0lBT2xCLDRCQUFlOzs7Ozs7O0lBT2YsaUNBQXFCOzs7Ozs7O0lBT3JCLGlDQUFpQjs7Ozs7OztJQU9qQiwyQkFBcUI7Ozs7Ozs7SUFPckIsK0JBQW1COzs7Ozs7O0lBT25CLGdDQUFvQjs7Ozs7OztJQU9wQixvQ0FBd0I7Ozs7Ozs7SUFPeEIsMkJBQWM7Ozs7Ozs7Ozs7O0lBV2QsMkJBQXVCOzs7Ozs7O0lBT3ZCLG1DQUFtQjs7Ozs7OztJQU9uQixxQ0FBcUI7Ozs7Ozs7SUFPckIseUNBQXlCOzs7Ozs7OztJQVF6QixnQ0FBbUQ7Ozs7Ozs7O0lBUW5ELGtDQUFxRDs7Ozs7OztJQU9yRCx5Q0FBNkI7Ozs7Ozs7SUFPN0IsbUNBQXVCOzs7Ozs7O0lBT3ZCLHNDQUF5Qjs7Ozs7OztJQU96QixrQ0FBb0M7Ozs7Ozs7SUFPcEMsc0NBQXNCOzs7Ozs7O0lBT3RCLDRCQUFlOztJQUVmLGdEQUFtQzs7SUFFbkMsZ0NBQW1COztJQUVuQix1Q0FBMEI7O0lBRTFCLDZCQUE2Qjs7SUFFN0IsdUNBQXNEOztJQUV0RCwwQ0FBNkI7O0lBRTdCLG9DQUF3RDs7SUFFeEQsK0JBQThDOztJQUU5QyxtQ0FBc0I7O0lBRXRCLCtCQUFtQjs7SUFFbkIsa0NBQXNCOztJQUV0QixtQ0FBdUI7O0lBRXZCLHdDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsdWVHZXR0ZXIgfSBmcm9tICcuLi91dGlscy9jb2x1bW4tcHJvcC1nZXR0ZXJzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuLyoqXHJcbiAqIENvbHVtbiBwcm9wZXJ0eSB0aGF0IGluZGljYXRlcyBob3cgdG8gcmV0cmlldmUgdGhpcyBjb2x1bW4nc1xyXG4gKiB2YWx1ZSBmcm9tIGEgcm93LlxyXG4gKiAnYS5kZWVwLnZhbHVlJywgJ25vcm1hbHByb3AnLCAwIChudW1lcmljKVxyXG4gKi9cclxuZXhwb3J0IHR5cGUgVGFibGVDb2x1bW5Qcm9wID0gc3RyaW5nIHwgbnVtYmVyO1xyXG5cclxuLyoqXHJcbiAqIENvbHVtbiBUeXBlXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlQ29sdW1uIHtcclxuICAvKipcclxuICAgKiBJbnRlcm5hbCB1bmlxdWUgaWRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gICQkaWQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVybmFsIGZvciBjb2x1bW4gd2lkdGggZGlzdHJpYnV0aW9uc1xyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgJCRvbGRXaWR0aD86IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJuYWwgZm9yIHNldENvbHVtbkRlZmF1bHRzXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICAkJHZhbHVlR2V0dGVyPzogVmFsdWVHZXR0ZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgaWYgY29sdW1uIGlzIGNoZWNrYm94XHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBjaGVja2JveGFibGU/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjb2x1bW4gaXMgZnJvemVuIHRvIHRoZSBsZWZ0XHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBmcm96ZW5MZWZ0PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgY29sdW1uIGlzIGZyb3plbiB0byB0aGUgcmlnaHRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIGZyb3plblJpZ2h0PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGdyb3cgZmFjdG9yIHJlbGF0aXZlIHRvIG90aGVyIGNvbHVtbnMuIFNhbWUgYXMgdGhlIGZsZXgtZ3Jvd1xyXG4gICAqIEFQSSBmcm9tIGh0dHAgPS8vd3d3LnczLm9yZy9UUi9jc3MzLWZsZXhib3gvLiBCYXNpY2FsbHk7XHJcbiAgICogdGFrZSBhbnkgYXZhaWxhYmxlIGV4dHJhIHdpZHRoIGFuZCBkaXN0cmlidXRlIGl0IHByb3BvcnRpb25hbGx5XHJcbiAgICogYWNjb3JkaW5nIHRvIGFsbCBjb2x1bW5zJyBmbGV4R3JvdyB2YWx1ZXMuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBmbGV4R3Jvdz86IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWluIHdpZHRoIG9mIHRoZSBjb2x1bW5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIG1pbldpZHRoPzogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBNYXggd2lkdGggb2YgdGhlIGNvbHVtblxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgbWF4V2lkdGg/OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkZWZhdWx0IHdpZHRoIG9mIHRoZSBjb2x1bW4sIGluIHBpeGVsc1xyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbiB0aGUgY29sdW1uIGJlIHJlc2l6ZWRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIHJlc2l6ZWFibGU/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBDdXN0b20gc29ydCBjb21wYXJhdG9yXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBjb21wYXJhdG9yPzogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBDdXN0b20gcGlwZSB0cmFuc2Zvcm1zXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBwaXBlPzogUGlwZVRyYW5zZm9ybTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FuIHRoZSBjb2x1bW4gYmUgc29ydGVkXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBzb3J0YWJsZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbiB0aGUgY29sdW1uIGJlIHJlLWFycmFuZ2VkIGJ5IGRyYWdnaW5nXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBkcmFnZ2FibGU/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBjb2x1bW4gY2FuIGF1dG9tYXRpY2FsbHkgcmVzaXplIHRvIGZpbGwgc3BhY2UgaW4gdGhlIHRhYmxlLlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgY2FuQXV0b1Jlc2l6ZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbHVtbiBuYW1lIG9yIGxhYmVsXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBuYW1lPzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBQcm9wZXJ0eSB0byBiaW5kIHRvIHRoZSByb3cuIEV4YW1wbGU6XHJcbiAgICpcclxuICAgKiBgc29tZUZpZWxkYCBvciBgc29tZS5maWVsZC5uZXN0ZWRgLCAwIChudW1lcmljKVxyXG4gICAqXHJcbiAgICogSWYgbGVmdCBibGFuaywgd2lsbCB1c2UgdGhlIG5hbWUgYXMgY2FtZWwgY2FzZSBjb252ZXJzaW9uXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBwcm9wPzogVGFibGVDb2x1bW5Qcm9wO1xyXG5cclxuICAvKipcclxuICAgKiBDZWxsIHRlbXBsYXRlIHJlZlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgY2VsbFRlbXBsYXRlPzogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBIZWFkZXIgdGVtcGxhdGUgcmVmXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBoZWFkZXJUZW1wbGF0ZT86IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVHJlZSB0b2dnbGUgdGVtcGxhdGUgcmVmXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICB0cmVlVG9nZ2xlVGVtcGxhdGU/OiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBDbGFzc2VzIGZvciB0aGUgY2VsbFxyXG4gICAqXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBjZWxsQ2xhc3M/OiBzdHJpbmcgfCAoKGRhdGE6IGFueSkgPT4gc3RyaW5nIHwgYW55KTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzZXMgZm9yIHRoZSBoZWFkZXJcclxuICAgKlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgaGVhZGVyQ2xhc3M/OiBzdHJpbmcgfCAoKGRhdGE6IGFueSkgPT4gc3RyaW5nIHwgYW55KTtcclxuXHJcbiAgLyoqXHJcbiAgICogSGVhZGVyIGNoZWNrYm94IGVuYWJsZWRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIGhlYWRlckNoZWNrYm94YWJsZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIElzIHRyZWUgZGlzcGxheWVkIG9uIHRoaXMgY29sdW1uXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBpc1RyZWVDb2x1bW4/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBXaWR0aCBvZiB0aGUgdHJlZSBsZXZlbCBpbmRlbnRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIHRyZWVMZXZlbEluZGVudD86IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3VtbWFyeSBmdW5jdGlvblxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgc3VtbWFyeUZ1bmM/OiAoY2VsbHM6IGFueVtdKSA9PiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1bW1hcnkgY2VsbCB0ZW1wbGF0ZSByZWZcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIHN1bW1hcnlUZW1wbGF0ZT86IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWNlIHNwZWNpYWwgY2FzZXNcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIGljb25zPzogc3RyaW5nO1xyXG5cclxuICBpY29uQ3VzdG9tVG9vbHRpcEh0bWxUZXh0Pzogc3RyaW5nO1xyXG5cclxuICBpY29uQ29sb3I/OiBzdHJpbmc7XHJcblxyXG4gIGFjdGlvbkJ1dHRvbkljb24/OiBzdHJpbmc7XHJcblxyXG4gIGFjdGlvbj86IChhcmcwOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIGhpZGVBY3Rpb25CdXR0b24/OiAoYXJnMDogYW55KSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG5cclxuICBhY3Rpb25CdXR0b25Ub29sdGlwPzogc3RyaW5nO1xyXG5cclxuICBzZWxlY3RPcHRpb25zPzogQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH0+O1xyXG5cclxuICBlZGl0YWJsZT86IChhcmcwOiBhbnkpID0+IE9ic2VydmFibGU8Ym9vbGVhbj47XHJcblxyXG4gIGRlZmF1bHRWYWx1ZT86IHN0cmluZztcclxuXHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG5cclxuICBoaWRlSWZFbXB0eT86IGJvb2xlYW47XHJcblxyXG4gIGhpZGVFZGl0SWNvbj86IGJvb2xlYW47XHJcblxyXG4gIGVycm9yTWVzc2FnZUZpZWxkPzogc3RyaW5nO1xyXG59XHJcbiJdfQ==