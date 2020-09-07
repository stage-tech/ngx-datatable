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
    /** @type {?|undefined} */
    TableColumn.prototype.onClickAction;
    /** @type {?|undefined} */
    TableColumn.prototype.filter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1uLnR5cGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi90eXBlcy90YWJsZS1jb2x1bW4udHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWNBLGlDQWtQQzs7Ozs7Ozs7SUE1T0MsMkJBQWM7Ozs7Ozs7SUFPZCxpQ0FBb0I7Ozs7Ozs7SUFPcEIsb0NBQTRCOzs7Ozs7O0lBTzVCLG1DQUF1Qjs7Ozs7OztJQU92QixpQ0FBcUI7Ozs7Ozs7SUFPckIsa0NBQXNCOzs7Ozs7Ozs7O0lBVXRCLCtCQUFrQjs7Ozs7OztJQU9sQiwrQkFBa0I7Ozs7Ozs7SUFPbEIsK0JBQWtCOzs7Ozs7O0lBT2xCLDRCQUFlOzs7Ozs7O0lBT2YsaUNBQXFCOzs7Ozs7O0lBT3JCLGlDQUFpQjs7Ozs7OztJQU9qQiwyQkFBcUI7Ozs7Ozs7SUFPckIsK0JBQW1COzs7Ozs7O0lBT25CLGdDQUFvQjs7Ozs7OztJQU9wQixvQ0FBd0I7Ozs7Ozs7SUFPeEIsMkJBQWM7Ozs7Ozs7Ozs7O0lBV2QsMkJBQXVCOzs7Ozs7O0lBT3ZCLG1DQUFtQjs7Ozs7OztJQU9uQixxQ0FBcUI7Ozs7Ozs7SUFPckIseUNBQXlCOzs7Ozs7OztJQVF6QixnQ0FBbUQ7Ozs7Ozs7O0lBUW5ELGtDQUFxRDs7Ozs7OztJQU9yRCx5Q0FBNkI7Ozs7Ozs7SUFPN0IsbUNBQXVCOzs7Ozs7O0lBT3ZCLHNDQUF5Qjs7Ozs7OztJQU96QixrQ0FBb0M7Ozs7Ozs7SUFPcEMsc0NBQXNCOzs7Ozs7O0lBT3RCLDRCQUFlOztJQUVmLGdEQUFtQzs7SUFFbkMsZ0NBQW1COztJQUVuQix1Q0FBMEI7O0lBRTFCLDZCQUE2Qjs7SUFFN0IsdUNBQXNEOztJQUV0RCwwQ0FBNkI7O0lBRTdCLG9DQUF3RDs7SUFFeEQsK0JBQThDOztJQUU5QyxtQ0FBc0I7O0lBRXRCLCtCQUFtQjs7SUFFbkIsa0NBQXNCOztJQUV0QixtQ0FBdUI7O0lBRXZCLHdDQUEyQjs7SUFFM0Isb0NBQW9DOztJQUVwQyw2QkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbHVlR2V0dGVyIH0gZnJvbSAnLi4vdXRpbHMvY29sdW1uLXByb3AtZ2V0dGVycyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKlxyXG4gKiBDb2x1bW4gcHJvcGVydHkgdGhhdCBpbmRpY2F0ZXMgaG93IHRvIHJldHJpZXZlIHRoaXMgY29sdW1uJ3NcclxuICogdmFsdWUgZnJvbSBhIHJvdy5cclxuICogJ2EuZGVlcC52YWx1ZScsICdub3JtYWxwcm9wJywgMCAobnVtZXJpYylcclxuICovXHJcbmV4cG9ydCB0eXBlIFRhYmxlQ29sdW1uUHJvcCA9IHN0cmluZyB8IG51bWJlcjtcclxuXHJcbi8qKlxyXG4gKiBDb2x1bW4gVHlwZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUYWJsZUNvbHVtbiB7XHJcbiAgLyoqXHJcbiAgICogSW50ZXJuYWwgdW5pcXVlIGlkXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICAkJGlkPzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBJbnRlcm5hbCBmb3IgY29sdW1uIHdpZHRoIGRpc3RyaWJ1dGlvbnNcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gICQkb2xkV2lkdGg/OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVybmFsIGZvciBzZXRDb2x1bW5EZWZhdWx0c1xyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgJCR2YWx1ZUdldHRlcj86IFZhbHVlR2V0dGVyO1xyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIGNvbHVtbiBpcyBjaGVja2JveFxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgY2hlY2tib3hhYmxlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgY29sdW1uIGlzIGZyb3plbiB0byB0aGUgbGVmdFxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgZnJvemVuTGVmdD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgaWYgdGhlIGNvbHVtbiBpcyBmcm96ZW4gdG8gdGhlIHJpZ2h0XHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBmcm96ZW5SaWdodD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBncm93IGZhY3RvciByZWxhdGl2ZSB0byBvdGhlciBjb2x1bW5zLiBTYW1lIGFzIHRoZSBmbGV4LWdyb3dcclxuICAgKiBBUEkgZnJvbSBodHRwID0vL3d3dy53My5vcmcvVFIvY3NzMy1mbGV4Ym94Ly4gQmFzaWNhbGx5O1xyXG4gICAqIHRha2UgYW55IGF2YWlsYWJsZSBleHRyYSB3aWR0aCBhbmQgZGlzdHJpYnV0ZSBpdCBwcm9wb3J0aW9uYWxseVxyXG4gICAqIGFjY29yZGluZyB0byBhbGwgY29sdW1ucycgZmxleEdyb3cgdmFsdWVzLlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgZmxleEdyb3c/OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1pbiB3aWR0aCBvZiB0aGUgY29sdW1uXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBtaW5XaWR0aD86IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWF4IHdpZHRoIG9mIHRoZSBjb2x1bW5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIG1heFdpZHRoPzogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGVmYXVsdCB3aWR0aCBvZiB0aGUgY29sdW1uLCBpbiBwaXhlbHNcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIHdpZHRoPzogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDYW4gdGhlIGNvbHVtbiBiZSByZXNpemVkXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICByZXNpemVhYmxlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VzdG9tIHNvcnQgY29tcGFyYXRvclxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgY29tcGFyYXRvcj86IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VzdG9tIHBpcGUgdHJhbnNmb3Jtc1xyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgcGlwZT86IFBpcGVUcmFuc2Zvcm07XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbiB0aGUgY29sdW1uIGJlIHNvcnRlZFxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgc29ydGFibGU/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBDYW4gdGhlIGNvbHVtbiBiZSByZS1hcnJhbmdlZCBieSBkcmFnZ2luZ1xyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgY29sdW1uIGNhbiBhdXRvbWF0aWNhbGx5IHJlc2l6ZSB0byBmaWxsIHNwYWNlIGluIHRoZSB0YWJsZS5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIGNhbkF1dG9SZXNpemU/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBDb2x1bW4gbmFtZSBvciBsYWJlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgbmFtZT86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogUHJvcGVydHkgdG8gYmluZCB0byB0aGUgcm93LiBFeGFtcGxlOlxyXG4gICAqXHJcbiAgICogYHNvbWVGaWVsZGAgb3IgYHNvbWUuZmllbGQubmVzdGVkYCwgMCAobnVtZXJpYylcclxuICAgKlxyXG4gICAqIElmIGxlZnQgYmxhbmssIHdpbGwgdXNlIHRoZSBuYW1lIGFzIGNhbWVsIGNhc2UgY29udmVyc2lvblxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgcHJvcD86IFRhYmxlQ29sdW1uUHJvcDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2VsbCB0ZW1wbGF0ZSByZWZcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIGNlbGxUZW1wbGF0ZT86IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogSGVhZGVyIHRlbXBsYXRlIHJlZlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgaGVhZGVyVGVtcGxhdGU/OiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyZWUgdG9nZ2xlIHRlbXBsYXRlIHJlZlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgdHJlZVRvZ2dsZVRlbXBsYXRlPzogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBDU1MgQ2xhc3NlcyBmb3IgdGhlIGNlbGxcclxuICAgKlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgY2VsbENsYXNzPzogc3RyaW5nIHwgKChkYXRhOiBhbnkpID0+IHN0cmluZyB8IGFueSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzc2VzIGZvciB0aGUgaGVhZGVyXHJcbiAgICpcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIGhlYWRlckNsYXNzPzogc3RyaW5nIHwgKChkYXRhOiBhbnkpID0+IHN0cmluZyB8IGFueSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlYWRlciBjaGVja2JveCBlbmFibGVkXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBoZWFkZXJDaGVja2JveGFibGU/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJcyB0cmVlIGRpc3BsYXllZCBvbiB0aGlzIGNvbHVtblxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXHJcbiAgICovXHJcbiAgaXNUcmVlQ29sdW1uPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2YgdGhlIHRyZWUgbGV2ZWwgaW5kZW50XHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICB0cmVlTGV2ZWxJbmRlbnQ/OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1bW1hcnkgZnVuY3Rpb25cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxyXG4gICAqL1xyXG4gIHN1bW1hcnlGdW5jPzogKGNlbGxzOiBhbnlbXSkgPT4gYW55O1xyXG5cclxuICAvKipcclxuICAgKiBTdW1tYXJ5IGNlbGwgdGVtcGxhdGUgcmVmXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBzdW1tYXJ5VGVtcGxhdGU/OiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEljZSBzcGVjaWFsIGNhc2VzXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cclxuICAgKi9cclxuICBpY29ucz86IHN0cmluZztcclxuXHJcbiAgaWNvbkN1c3RvbVRvb2x0aXBIdG1sVGV4dD86IHN0cmluZztcclxuXHJcbiAgaWNvbkNvbG9yPzogc3RyaW5nO1xyXG5cclxuICBhY3Rpb25CdXR0b25JY29uPzogc3RyaW5nO1xyXG5cclxuICBhY3Rpb24/OiAoYXJnMDogYW55KSA9PiB2b2lkO1xyXG5cclxuICBoaWRlQWN0aW9uQnV0dG9uPzogKGFyZzA6IGFueSkgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuXHJcbiAgYWN0aW9uQnV0dG9uVG9vbHRpcD86IHN0cmluZztcclxuXHJcbiAgc2VsZWN0T3B0aW9ucz86IEFycmF5PHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9PjtcclxuXHJcbiAgZWRpdGFibGU/OiAoYXJnMDogYW55KSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG5cclxuICBkZWZhdWx0VmFsdWU/OiBzdHJpbmc7XHJcblxyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuXHJcbiAgaGlkZUlmRW1wdHk/OiBib29sZWFuO1xyXG5cclxuICBoaWRlRWRpdEljb24/OiBib29sZWFuO1xyXG5cclxuICBlcnJvck1lc3NhZ2VGaWVsZD86IHN0cmluZztcclxuXHJcbiAgb25DbGlja0FjdGlvbj86IChhcmcwOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIGZpbHRlcj86IGJvb2xlYW47XHJcbn1cclxuIl19