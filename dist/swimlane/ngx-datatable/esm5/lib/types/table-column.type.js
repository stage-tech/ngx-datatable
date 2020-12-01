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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1uLnR5cGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi90eXBlcy90YWJsZS1jb2x1bW4udHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWNBLGlDQWtQQzs7Ozs7Ozs7SUE1T0MsMkJBQWM7Ozs7Ozs7SUFPZCxpQ0FBb0I7Ozs7Ozs7SUFPcEIsb0NBQTRCOzs7Ozs7O0lBTzVCLG1DQUF1Qjs7Ozs7OztJQU92QixpQ0FBcUI7Ozs7Ozs7SUFPckIsa0NBQXNCOzs7Ozs7Ozs7O0lBVXRCLCtCQUFrQjs7Ozs7OztJQU9sQiwrQkFBa0I7Ozs7Ozs7SUFPbEIsK0JBQWtCOzs7Ozs7O0lBT2xCLDRCQUFlOzs7Ozs7O0lBT2YsaUNBQXFCOzs7Ozs7O0lBT3JCLGlDQUFpQjs7Ozs7OztJQU9qQiwyQkFBcUI7Ozs7Ozs7SUFPckIsK0JBQW1COzs7Ozs7O0lBT25CLGdDQUFvQjs7Ozs7OztJQU9wQixvQ0FBd0I7Ozs7Ozs7SUFPeEIsMkJBQWM7Ozs7Ozs7Ozs7O0lBV2QsMkJBQXVCOzs7Ozs7O0lBT3ZCLG1DQUFtQjs7Ozs7OztJQU9uQixxQ0FBcUI7Ozs7Ozs7SUFPckIseUNBQXlCOzs7Ozs7OztJQVF6QixnQ0FBbUQ7Ozs7Ozs7O0lBUW5ELGtDQUFxRDs7Ozs7OztJQU9yRCx5Q0FBNkI7Ozs7Ozs7SUFPN0IsbUNBQXVCOzs7Ozs7O0lBT3ZCLHNDQUF5Qjs7Ozs7OztJQU96QixrQ0FBb0M7Ozs7Ozs7SUFPcEMsc0NBQXNCOzs7Ozs7O0lBT3RCLDRCQUFlOztJQUVmLGdEQUFtQzs7SUFFbkMsZ0NBQW1COztJQUVuQix1Q0FBMEI7O0lBRTFCLDZCQUE2Qjs7SUFFN0IsdUNBQXNEOztJQUV0RCwwQ0FBNkI7O0lBRTdCLG9DQUF1RTs7SUFFdkUsK0JBQThDOztJQUU5QyxtQ0FBc0I7O0lBRXRCLCtCQUFtQjs7SUFFbkIsa0NBQXNCOztJQUV0QixtQ0FBdUI7O0lBRXZCLHdDQUEyQjs7SUFFM0Isb0NBQW9DOztJQUVwQyw2QkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWx1ZUdldHRlciB9IGZyb20gJy4uL3V0aWxzL2NvbHVtbi1wcm9wLWdldHRlcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIENvbHVtbiBwcm9wZXJ0eSB0aGF0IGluZGljYXRlcyBob3cgdG8gcmV0cmlldmUgdGhpcyBjb2x1bW4nc1xuICogdmFsdWUgZnJvbSBhIHJvdy5cbiAqICdhLmRlZXAudmFsdWUnLCAnbm9ybWFscHJvcCcsIDAgKG51bWVyaWMpXG4gKi9cbmV4cG9ydCB0eXBlIFRhYmxlQ29sdW1uUHJvcCA9IHN0cmluZyB8IG51bWJlcjtcblxuLyoqXG4gKiBDb2x1bW4gVHlwZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlQ29sdW1uIHtcbiAgLyoqXG4gICAqIEludGVybmFsIHVuaXF1ZSBpZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gICQkaWQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEludGVybmFsIGZvciBjb2x1bW4gd2lkdGggZGlzdHJpYnV0aW9uc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gICQkb2xkV2lkdGg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEludGVybmFsIGZvciBzZXRDb2x1bW5EZWZhdWx0c1xuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gICQkdmFsdWVHZXR0ZXI/OiBWYWx1ZUdldHRlcjtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiBjb2x1bW4gaXMgY2hlY2tib3hcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBjaGVja2JveGFibGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjb2x1bW4gaXMgZnJvemVuIHRvIHRoZSBsZWZ0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgZnJvemVuTGVmdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGNvbHVtbiBpcyBmcm96ZW4gdG8gdGhlIHJpZ2h0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgZnJvemVuUmlnaHQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgZ3JvdyBmYWN0b3IgcmVsYXRpdmUgdG8gb3RoZXIgY29sdW1ucy4gU2FtZSBhcyB0aGUgZmxleC1ncm93XG4gICAqIEFQSSBmcm9tIGh0dHAgPS8vd3d3LnczLm9yZy9UUi9jc3MzLWZsZXhib3gvLiBCYXNpY2FsbHk7XG4gICAqIHRha2UgYW55IGF2YWlsYWJsZSBleHRyYSB3aWR0aCBhbmQgZGlzdHJpYnV0ZSBpdCBwcm9wb3J0aW9uYWxseVxuICAgKiBhY2NvcmRpbmcgdG8gYWxsIGNvbHVtbnMnIGZsZXhHcm93IHZhbHVlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBmbGV4R3Jvdz86IG51bWJlcjtcblxuICAvKipcbiAgICogTWluIHdpZHRoIG9mIHRoZSBjb2x1bW5cbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBtaW5XaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogTWF4IHdpZHRoIG9mIHRoZSBjb2x1bW5cbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBtYXhXaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgd2lkdGggb2YgdGhlIGNvbHVtbiwgaW4gcGl4ZWxzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgd2lkdGg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIENhbiB0aGUgY29sdW1uIGJlIHJlc2l6ZWRcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICByZXNpemVhYmxlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ3VzdG9tIHNvcnQgY29tcGFyYXRvclxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGNvbXBhcmF0b3I/OiBhbnk7XG5cbiAgLyoqXG4gICAqIEN1c3RvbSBwaXBlIHRyYW5zZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBwaXBlPzogUGlwZVRyYW5zZm9ybTtcblxuICAvKipcbiAgICogQ2FuIHRoZSBjb2x1bW4gYmUgc29ydGVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgc29ydGFibGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDYW4gdGhlIGNvbHVtbiBiZSByZS1hcnJhbmdlZCBieSBkcmFnZ2luZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGNvbHVtbiBjYW4gYXV0b21hdGljYWxseSByZXNpemUgdG8gZmlsbCBzcGFjZSBpbiB0aGUgdGFibGUuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgY2FuQXV0b1Jlc2l6ZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENvbHVtbiBuYW1lIG9yIGxhYmVsXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgbmFtZT86IHN0cmluZztcblxuICAvKipcbiAgICogUHJvcGVydHkgdG8gYmluZCB0byB0aGUgcm93LiBFeGFtcGxlOlxuICAgKlxuICAgKiBgc29tZUZpZWxkYCBvciBgc29tZS5maWVsZC5uZXN0ZWRgLCAwIChudW1lcmljKVxuICAgKlxuICAgKiBJZiBsZWZ0IGJsYW5rLCB3aWxsIHVzZSB0aGUgbmFtZSBhcyBjYW1lbCBjYXNlIGNvbnZlcnNpb25cbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBwcm9wPzogVGFibGVDb2x1bW5Qcm9wO1xuXG4gIC8qKlxuICAgKiBDZWxsIHRlbXBsYXRlIHJlZlxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGNlbGxUZW1wbGF0ZT86IGFueTtcblxuICAvKipcbiAgICogSGVhZGVyIHRlbXBsYXRlIHJlZlxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGhlYWRlclRlbXBsYXRlPzogYW55O1xuXG4gIC8qKlxuICAgKiBUcmVlIHRvZ2dsZSB0ZW1wbGF0ZSByZWZcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICB0cmVlVG9nZ2xlVGVtcGxhdGU/OiBhbnk7XG5cbiAgLyoqXG4gICAqIENTUyBDbGFzc2VzIGZvciB0aGUgY2VsbFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGNlbGxDbGFzcz86IHN0cmluZyB8ICgoZGF0YTogYW55KSA9PiBzdHJpbmcgfCBhbnkpO1xuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3NlcyBmb3IgdGhlIGhlYWRlclxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGhlYWRlckNsYXNzPzogc3RyaW5nIHwgKChkYXRhOiBhbnkpID0+IHN0cmluZyB8IGFueSk7XG5cbiAgLyoqXG4gICAqIEhlYWRlciBjaGVja2JveCBlbmFibGVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgaGVhZGVyQ2hlY2tib3hhYmxlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogSXMgdHJlZSBkaXNwbGF5ZWQgb24gdGhpcyBjb2x1bW5cbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBpc1RyZWVDb2x1bW4/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgdHJlZSBsZXZlbCBpbmRlbnRcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICB0cmVlTGV2ZWxJbmRlbnQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFN1bW1hcnkgZnVuY3Rpb25cbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBzdW1tYXJ5RnVuYz86IChjZWxsczogYW55W10pID0+IGFueTtcblxuICAvKipcbiAgICogU3VtbWFyeSBjZWxsIHRlbXBsYXRlIHJlZlxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIHN1bW1hcnlUZW1wbGF0ZT86IGFueTtcblxuICAvKipcbiAgICogSWNlIHNwZWNpYWwgY2FzZXNcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBpY29ucz86IHN0cmluZztcblxuICBpY29uQ3VzdG9tVG9vbHRpcEh0bWxUZXh0Pzogc3RyaW5nO1xuXG4gIGljb25Db2xvcj86IHN0cmluZztcblxuICBhY3Rpb25CdXR0b25JY29uPzogc3RyaW5nO1xuXG4gIGFjdGlvbj86IChhcmcwOiBhbnkpID0+IHZvaWQ7XG5cbiAgaGlkZUFjdGlvbkJ1dHRvbj86IChhcmcwOiBhbnkpID0+IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgYWN0aW9uQnV0dG9uVG9vbHRpcD86IHN0cmluZztcblxuICBzZWxlY3RPcHRpb25zPzogKGFyZzA6IGFueSkgPT4gQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH0+O1xuXG4gIGVkaXRhYmxlPzogKGFyZzA6IGFueSkgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBkZWZhdWx0VmFsdWU/OiBzdHJpbmc7XG5cbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuXG4gIGhpZGVJZkVtcHR5PzogYm9vbGVhbjtcblxuICBoaWRlRWRpdEljb24/OiBib29sZWFuO1xuXG4gIGVycm9yTWVzc2FnZUZpZWxkPzogc3RyaW5nO1xuXG4gIG9uQ2xpY2tBY3Rpb24/OiAoYXJnMDogYW55KSA9PiB2b2lkO1xuXG4gIGZpbHRlcj86IGJvb2xlYW47XG59XG4iXX0=