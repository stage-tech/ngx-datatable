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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1uLnR5cGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi90eXBlcy90YWJsZS1jb2x1bW4udHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWNBLGlDQThPQzs7Ozs7Ozs7SUF4T0MsMkJBQWM7Ozs7Ozs7SUFPZCxpQ0FBb0I7Ozs7Ozs7SUFPcEIsb0NBQTRCOzs7Ozs7O0lBTzVCLG1DQUF1Qjs7Ozs7OztJQU92QixpQ0FBcUI7Ozs7Ozs7SUFPckIsa0NBQXNCOzs7Ozs7Ozs7O0lBVXRCLCtCQUFrQjs7Ozs7OztJQU9sQiwrQkFBa0I7Ozs7Ozs7SUFPbEIsK0JBQWtCOzs7Ozs7O0lBT2xCLDRCQUFlOzs7Ozs7O0lBT2YsaUNBQXFCOzs7Ozs7O0lBT3JCLGlDQUFpQjs7Ozs7OztJQU9qQiwyQkFBcUI7Ozs7Ozs7SUFPckIsK0JBQW1COzs7Ozs7O0lBT25CLGdDQUFvQjs7Ozs7OztJQU9wQixvQ0FBd0I7Ozs7Ozs7SUFPeEIsMkJBQWM7Ozs7Ozs7Ozs7O0lBV2QsMkJBQXVCOzs7Ozs7O0lBT3ZCLG1DQUFtQjs7Ozs7OztJQU9uQixxQ0FBcUI7Ozs7Ozs7SUFPckIseUNBQXlCOzs7Ozs7OztJQVF6QixnQ0FBbUQ7Ozs7Ozs7O0lBUW5ELGtDQUFxRDs7Ozs7OztJQU9yRCx5Q0FBNkI7Ozs7Ozs7SUFPN0IsbUNBQXVCOzs7Ozs7O0lBT3ZCLHNDQUF5Qjs7Ozs7OztJQU96QixrQ0FBb0M7Ozs7Ozs7SUFPcEMsc0NBQXNCOzs7Ozs7O0lBT3RCLDRCQUFlOztJQUVmLGdEQUFtQzs7SUFFbkMsZ0NBQW1COztJQUVuQix1Q0FBMEI7O0lBRTFCLDZCQUE2Qjs7SUFFN0IsdUNBQXNEOztJQUV0RCwwQ0FBNkI7O0lBRTdCLG9DQUF3RDs7SUFFeEQsK0JBQThDOztJQUU5QyxtQ0FBc0I7O0lBRXRCLCtCQUFtQjs7SUFFbkIsa0NBQXNCOztJQUV0QixtQ0FBdUI7O0lBRXZCLHdDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbHVlR2V0dGVyIH0gZnJvbSAnLi4vdXRpbHMvY29sdW1uLXByb3AtZ2V0dGVycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQ29sdW1uIHByb3BlcnR5IHRoYXQgaW5kaWNhdGVzIGhvdyB0byByZXRyaWV2ZSB0aGlzIGNvbHVtbidzXG4gKiB2YWx1ZSBmcm9tIGEgcm93LlxuICogJ2EuZGVlcC52YWx1ZScsICdub3JtYWxwcm9wJywgMCAobnVtZXJpYylcbiAqL1xuZXhwb3J0IHR5cGUgVGFibGVDb2x1bW5Qcm9wID0gc3RyaW5nIHwgbnVtYmVyO1xuXG4vKipcbiAqIENvbHVtbiBUeXBlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVDb2x1bW4ge1xuICAvKipcbiAgICogSW50ZXJuYWwgdW5pcXVlIGlkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgJCRpZD86IHN0cmluZztcblxuICAvKipcbiAgICogSW50ZXJuYWwgZm9yIGNvbHVtbiB3aWR0aCBkaXN0cmlidXRpb25zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgJCRvbGRXaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogSW50ZXJuYWwgZm9yIHNldENvbHVtbkRlZmF1bHRzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgJCR2YWx1ZUdldHRlcj86IFZhbHVlR2V0dGVyO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIGNvbHVtbiBpcyBjaGVja2JveFxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGNoZWNrYm94YWJsZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGNvbHVtbiBpcyBmcm96ZW4gdG8gdGhlIGxlZnRcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBmcm96ZW5MZWZ0PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgY29sdW1uIGlzIGZyb3plbiB0byB0aGUgcmlnaHRcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBmcm96ZW5SaWdodD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBncm93IGZhY3RvciByZWxhdGl2ZSB0byBvdGhlciBjb2x1bW5zLiBTYW1lIGFzIHRoZSBmbGV4LWdyb3dcbiAgICogQVBJIGZyb20gaHR0cCA9Ly93d3cudzMub3JnL1RSL2NzczMtZmxleGJveC8uIEJhc2ljYWxseTtcbiAgICogdGFrZSBhbnkgYXZhaWxhYmxlIGV4dHJhIHdpZHRoIGFuZCBkaXN0cmlidXRlIGl0IHByb3BvcnRpb25hbGx5XG4gICAqIGFjY29yZGluZyB0byBhbGwgY29sdW1ucycgZmxleEdyb3cgdmFsdWVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGZsZXhHcm93PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBNaW4gd2lkdGggb2YgdGhlIGNvbHVtblxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIG1pbldpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBNYXggd2lkdGggb2YgdGhlIGNvbHVtblxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIG1heFdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCB3aWR0aCBvZiB0aGUgY29sdW1uLCBpbiBwaXhlbHNcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogQ2FuIHRoZSBjb2x1bW4gYmUgcmVzaXplZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIHJlc2l6ZWFibGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDdXN0b20gc29ydCBjb21wYXJhdG9yXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgY29tcGFyYXRvcj86IGFueTtcblxuICAvKipcbiAgICogQ3VzdG9tIHBpcGUgdHJhbnNmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIHBpcGU/OiBQaXBlVHJhbnNmb3JtO1xuXG4gIC8qKlxuICAgKiBDYW4gdGhlIGNvbHVtbiBiZSBzb3J0ZWRcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBzb3J0YWJsZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENhbiB0aGUgY29sdW1uIGJlIHJlLWFycmFuZ2VkIGJ5IGRyYWdnaW5nXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY29sdW1uIGNhbiBhdXRvbWF0aWNhbGx5IHJlc2l6ZSB0byBmaWxsIHNwYWNlIGluIHRoZSB0YWJsZS5cbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBjYW5BdXRvUmVzaXplPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ29sdW1uIG5hbWUgb3IgbGFiZWxcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBuYW1lPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBQcm9wZXJ0eSB0byBiaW5kIHRvIHRoZSByb3cuIEV4YW1wbGU6XG4gICAqXG4gICAqIGBzb21lRmllbGRgIG9yIGBzb21lLmZpZWxkLm5lc3RlZGAsIDAgKG51bWVyaWMpXG4gICAqXG4gICAqIElmIGxlZnQgYmxhbmssIHdpbGwgdXNlIHRoZSBuYW1lIGFzIGNhbWVsIGNhc2UgY29udmVyc2lvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIHByb3A/OiBUYWJsZUNvbHVtblByb3A7XG5cbiAgLyoqXG4gICAqIENlbGwgdGVtcGxhdGUgcmVmXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgY2VsbFRlbXBsYXRlPzogYW55O1xuXG4gIC8qKlxuICAgKiBIZWFkZXIgdGVtcGxhdGUgcmVmXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgaGVhZGVyVGVtcGxhdGU/OiBhbnk7XG5cbiAgLyoqXG4gICAqIFRyZWUgdG9nZ2xlIHRlbXBsYXRlIHJlZlxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIHRyZWVUb2dnbGVUZW1wbGF0ZT86IGFueTtcblxuICAvKipcbiAgICogQ1NTIENsYXNzZXMgZm9yIHRoZSBjZWxsXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgY2VsbENsYXNzPzogc3RyaW5nIHwgKChkYXRhOiBhbnkpID0+IHN0cmluZyB8IGFueSk7XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzc2VzIGZvciB0aGUgaGVhZGVyXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgaGVhZGVyQ2xhc3M/OiBzdHJpbmcgfCAoKGRhdGE6IGFueSkgPT4gc3RyaW5nIHwgYW55KTtcblxuICAvKipcbiAgICogSGVhZGVyIGNoZWNrYm94IGVuYWJsZWRcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBoZWFkZXJDaGVja2JveGFibGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJcyB0cmVlIGRpc3BsYXllZCBvbiB0aGlzIGNvbHVtblxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGlzVHJlZUNvbHVtbj86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSB0cmVlIGxldmVsIGluZGVudFxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIHRyZWVMZXZlbEluZGVudD86IG51bWJlcjtcblxuICAvKipcbiAgICogU3VtbWFyeSBmdW5jdGlvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIHN1bW1hcnlGdW5jPzogKGNlbGxzOiBhbnlbXSkgPT4gYW55O1xuXG4gIC8qKlxuICAgKiBTdW1tYXJ5IGNlbGwgdGVtcGxhdGUgcmVmXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgc3VtbWFyeVRlbXBsYXRlPzogYW55O1xuXG4gIC8qKlxuICAgKiBJY2Ugc3BlY2lhbCBjYXNlc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGljb25zPzogc3RyaW5nO1xuXG4gIGljb25DdXN0b21Ub29sdGlwSHRtbFRleHQ/OiBzdHJpbmc7XG5cbiAgaWNvbkNvbG9yPzogc3RyaW5nO1xuXG4gIGFjdGlvbkJ1dHRvbkljb24/OiBzdHJpbmc7XG5cbiAgYWN0aW9uPzogKGFyZzA6IGFueSkgPT4gdm9pZDtcblxuICBoaWRlQWN0aW9uQnV0dG9uPzogKGFyZzA6IGFueSkgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBhY3Rpb25CdXR0b25Ub29sdGlwPzogc3RyaW5nO1xuXG4gIHNlbGVjdE9wdGlvbnM/OiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfT47XG5cbiAgZWRpdGFibGU/OiAoYXJnMDogYW55KSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIGRlZmF1bHRWYWx1ZT86IHN0cmluZztcblxuICBkaXNhYmxlZD86IGJvb2xlYW47XG5cbiAgaGlkZUlmRW1wdHk/OiBib29sZWFuO1xuXG4gIGhpZGVFZGl0SWNvbj86IGJvb2xlYW47XG5cbiAgZXJyb3JNZXNzYWdlRmllbGQ/OiBzdHJpbmc7XG59XG4iXX0=