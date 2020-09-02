/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, HostBinding, ElementRef, Output, KeyValueDiffers, EventEmitter, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, SkipSelf } from '@angular/core';
import { columnsByPin, columnGroupWidths, columnsByPinArr } from '../../utils/column';
import { Keys } from '../../utils/keys';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { translateXY } from '../../utils/translate';
export class DataTableBodyRowComponent {
    /**
     * @param {?} differs
     * @param {?} scrollbarHelper
     * @param {?} cd
     * @param {?} element
     */
    constructor(differs, scrollbarHelper, cd, element) {
        this.differs = differs;
        this.scrollbarHelper = scrollbarHelper;
        this.cd = cd;
        this.treeStatus = 'collapsed';
        this.activate = new EventEmitter();
        this.treeAction = new EventEmitter();
        this._groupStyles = {
            left: {},
            center: {},
            right: {}
        };
        this._element = element.nativeElement;
        this._rowDiffer = differs.find({}).create();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set columns(val) {
        this._columns = val;
        this.recalculateColumns(val);
        this.buildStylesByGroup();
    }
    /**
     * @return {?}
     */
    get columns() {
        return this._columns;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set innerWidth(val) {
        if (this._columns) {
            /** @type {?} */
            const colByPin = columnsByPin(this._columns);
            this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
        }
        this._innerWidth = val;
        this.recalculateColumns();
        this.buildStylesByGroup();
    }
    /**
     * @return {?}
     */
    get innerWidth() {
        return this._innerWidth;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set offsetX(val) {
        this._offsetX = val;
        this.buildStylesByGroup();
    }
    /**
     * @return {?}
     */
    get offsetX() {
        return this._offsetX;
    }
    /**
     * @return {?}
     */
    get cssClass() {
        /** @type {?} */
        let cls = 'datatable-body-row';
        if (this.isSelected) {
            cls += ' active';
        }
        if (this.rowIndex % 2 !== 0) {
            cls += ' datatable-row-odd';
        }
        if (this.rowIndex % 2 === 0) {
            cls += ' datatable-row-even';
        }
        if (this.rowClass) {
            /** @type {?} */
            const res = this.rowClass(this.row);
            if (typeof res === 'string') {
                cls += ` ${res}`;
            }
            else if (typeof res === 'object') {
                /** @type {?} */
                const keys = Object.keys(res);
                for (const k of keys) {
                    if (res[k] === true) {
                        cls += ` ${k}`;
                    }
                }
            }
        }
        return cls;
    }
    /**
     * @return {?}
     */
    get columnsTotalWidths() {
        return this._columnGroupWidths.total;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._rowDiffer.diff(this.row)) {
            this.cd.markForCheck();
        }
    }
    /**
     * @param {?} index
     * @param {?} colGroup
     * @return {?}
     */
    trackByGroups(index, colGroup) {
        return colGroup.type;
    }
    /**
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    /**
     * @return {?}
     */
    buildStylesByGroup() {
        this._groupStyles.left = this.calcStylesByGroup('left');
        this._groupStyles.center = this.calcStylesByGroup('center');
        this._groupStyles.right = this.calcStylesByGroup('right');
        this.cd.markForCheck();
    }
    /**
     * @param {?} group
     * @return {?}
     */
    calcStylesByGroup(group) {
        /** @type {?} */
        const widths = this._columnGroupWidths;
        /** @type {?} */
        const offsetX = this.offsetX;
        /** @type {?} */
        const styles = {
            width: `${widths[group]}px`
        };
        if (this.row && !!this.row.detail && group === 'left') {
            styles.width = `100%`;
        }
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            /** @type {?} */
            const bodyWidth = parseInt(this.innerWidth + '', 0);
            /** @type {?} */
            const totalDiff = widths.total - bodyWidth;
            /** @type {?} */
            const offsetDiff = totalDiff - offsetX;
            /** @type {?} */
            const offset = (offsetDiff + this.scrollbarHelper.width) * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    onActivate(event, index) {
        event.cellIndex = index;
        event.rowElement = this._element;
        this.activate.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */
        const isTargetRow = event.target === this._element;
        /** @type {?} */
        const isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event,
                row: this.row,
                rowElement: this._element
            });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseenter(event) {
        this.activate.emit({
            type: 'mouseenter',
            event,
            row: this.row,
            rowElement: this._element
        });
    }
    /**
     * @param {?=} val
     * @return {?}
     */
    recalculateColumns(val = this.columns) {
        this._columns = val;
        /** @type {?} */
        const colsByPin = columnsByPin(this._columns);
        this._columnsByPin = columnsByPinArr(this._columns);
        this._columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
    }
    /**
     * @return {?}
     */
    onTreeAction() {
        this.treeAction.emit();
    }
}
DataTableBodyRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-body-row',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div
      *ngFor="let colGroup of _columnsByPin; let i = index; trackBy: trackByGroups"
      class="datatable-row-{{ colGroup.type }} datatable-row-group"
      [ngStyle]="_groupStyles[colGroup.type]"
    >
      <datatable-body-cell
        *ngFor="let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn"
        tabindex="-1"
        [row]="row"
        [group]="group"
        [rowDetail]="rowDetail"
        [expanded]="expanded"
        [isSelected]="isSelected"
        [rowIndex]="rowIndex"
        [column]="column"
        [rowHeight]="rowHeight"
        [displayCheck]="displayCheck"
        [treeStatus]="treeStatus"
        (activate)="onActivate($event, ii)"
        (treeAction)="onTreeAction()"
      >
      </datatable-body-cell>
    </div>
  `
            }] }
];
/** @nocollapse */
DataTableBodyRowComponent.ctorParameters = () => [
    { type: KeyValueDiffers },
    { type: ScrollbarHelper, decorators: [{ type: SkipSelf }] },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
DataTableBodyRowComponent.propDecorators = {
    columns: [{ type: Input }],
    innerWidth: [{ type: Input }],
    expanded: [{ type: Input }],
    rowClass: [{ type: Input }],
    row: [{ type: Input }],
    group: [{ type: Input }],
    isSelected: [{ type: Input }],
    rowIndex: [{ type: Input }],
    displayCheck: [{ type: Input }],
    treeStatus: [{ type: Input }],
    rowDetail: [{ type: Input }],
    offsetX: [{ type: Input }],
    cssClass: [{ type: HostBinding, args: ['class',] }],
    rowHeight: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
    columnsTotalWidths: [{ type: HostBinding, args: ['style.width.px',] }],
    activate: [{ type: Output }],
    treeAction: [{ type: Output }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onMouseenter: [{ type: HostListener, args: ['mouseenter', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    DataTableBodyRowComponent.prototype.expanded;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.rowClass;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.row;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.group;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.isSelected;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.rowIndex;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.displayCheck;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.treeStatus;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.rowDetail;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.rowHeight;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.activate;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.treeAction;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._element;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._columnGroupWidths;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._columnsByPin;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._offsetX;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._columns;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._innerWidth;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._groupStyles;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyRowComponent.prototype._rowDiffer;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyRowComponent.prototype.differs;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyRowComponent.prototype.scrollbarHelper;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyRowComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ib2R5L2JvZHktcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFVBQVUsRUFDVixNQUFNLEVBQ04sZUFBZSxFQUVmLFlBQVksRUFDWixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUVqQixRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQWdDcEQsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7OztJQXFHcEMsWUFDVSxPQUF3QixFQUNaLGVBQWdDLEVBQzVDLEVBQXFCLEVBQzdCLE9BQW1CO1FBSFgsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDNUMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUF2RXRCLGVBQVUsR0FBZSxXQUFXLENBQUM7UUFtRHBDLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFRN0QsaUJBQVksR0FBMkI7WUFDckMsSUFBSSxFQUFFLEVBQUU7WUFDUixNQUFNLEVBQUUsRUFBRTtZQUNWLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQztRQVVBLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFD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QUFLO2lDQUdMLFdBQVcsU0FBQyxnQkFBZ0I7dUJBSzVCLE1BQU07eUJBQ04sTUFBTTt3QkE4RU4sWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQkF5QmxDLFlBQVksU0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUFsS3RDLDZDQUEyQjs7SUFDM0IsNkNBQXVCOztJQUN2Qix3Q0FBa0I7O0lBQ2xCLDBDQUFvQjs7SUFDcEIsK0NBQTZCOztJQUM3Qiw2Q0FBMEI7O0lBQzFCLGlEQUEyQjs7SUFDM0IsK0NBQThDOztJQUM5Qyw4Q0FBd0I7O0lBeUN4Qiw4Q0FFa0I7O0lBT2xCLDZDQUEyRDs7SUFDM0QsK0NBQTZEOztJQUU3RCw2Q0FBYzs7SUFDZCx1REFBd0I7O0lBQ3hCLGtEQUFtQjs7SUFDbkIsNkNBQWlCOztJQUNqQiw2Q0FBZ0I7O0lBQ2hCLGdEQUFvQjs7SUFDcEIsaURBSUU7Ozs7O0lBRUYsK0NBQTJDOzs7OztJQUd6Qyw0Q0FBZ0M7Ozs7O0lBQ2hDLG9EQUFvRDs7Ozs7SUFDcEQsdUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgRWxlbWVudFJlZixcclxuICBPdXRwdXQsXHJcbiAgS2V5VmFsdWVEaWZmZXJzLFxyXG4gIEtleVZhbHVlRGlmZmVyLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgRG9DaGVjayxcclxuICBTa2lwU2VsZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVHJlZVN0YXR1cyB9IGZyb20gJy4vYm9keS1jZWxsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGNvbHVtbnNCeVBpbiwgY29sdW1uR3JvdXBXaWR0aHMsIGNvbHVtbnNCeVBpbkFyciB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbHVtbic7XHJcbmltcG9ydCB7IEtleXMgfSBmcm9tICcuLi8uLi91dGlscy9rZXlzJztcclxuaW1wb3J0IHsgU2Nyb2xsYmFySGVscGVyIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc2Nyb2xsYmFyLWhlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdHJhbnNsYXRlWFkgfSBmcm9tICcuLi8uLi91dGlscy90cmFuc2xhdGUnO1xyXG5pbXBvcnQgeyBzdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtYm9keS1yb3cnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2XHJcbiAgICAgICpuZ0Zvcj1cImxldCBjb2xHcm91cCBvZiBfY29sdW1uc0J5UGluOyBsZXQgaSA9IGluZGV4OyB0cmFja0J5OiB0cmFja0J5R3JvdXBzXCJcclxuICAgICAgY2xhc3M9XCJkYXRhdGFibGUtcm93LXt7IGNvbEdyb3VwLnR5cGUgfX0gZGF0YXRhYmxlLXJvdy1ncm91cFwiXHJcbiAgICAgIFtuZ1N0eWxlXT1cIl9ncm91cFN0eWxlc1tjb2xHcm91cC50eXBlXVwiXHJcbiAgICA+XHJcbiAgICAgIDxkYXRhdGFibGUtYm9keS1jZWxsXHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2xHcm91cC5jb2x1bW5zOyBsZXQgaWkgPSBpbmRleDsgdHJhY2tCeTogY29sdW1uVHJhY2tpbmdGblwiXHJcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXHJcbiAgICAgICAgW3Jvd109XCJyb3dcIlxyXG4gICAgICAgIFtncm91cF09XCJncm91cFwiXHJcbiAgICAgICAgW3Jvd0RldGFpbF09XCJyb3dEZXRhaWxcIlxyXG4gICAgICAgIFtleHBhbmRlZF09XCJleHBhbmRlZFwiXHJcbiAgICAgICAgW2lzU2VsZWN0ZWRdPVwiaXNTZWxlY3RlZFwiXHJcbiAgICAgICAgW3Jvd0luZGV4XT1cInJvd0luZGV4XCJcclxuICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXHJcbiAgICAgICAgW3Jvd0hlaWdodF09XCJyb3dIZWlnaHRcIlxyXG4gICAgICAgIFtkaXNwbGF5Q2hlY2tdPVwiZGlzcGxheUNoZWNrXCJcclxuICAgICAgICBbdHJlZVN0YXR1c109XCJ0cmVlU3RhdHVzXCJcclxuICAgICAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQsIGlpKVwiXHJcbiAgICAgICAgKHRyZWVBY3Rpb24pPVwib25UcmVlQWN0aW9uKClcIlxyXG4gICAgICA+XHJcbiAgICAgIDwvZGF0YXRhYmxlLWJvZHktY2VsbD5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUJvZHlSb3dDb21wb25lbnQgaW1wbGVtZW50cyBEb0NoZWNrIHtcclxuICBASW5wdXQoKSBzZXQgY29sdW1ucyh2YWw6IGFueVtdKSB7XHJcbiAgICB0aGlzLl9jb2x1bW5zID0gdmFsO1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnModmFsKTtcclxuICAgIHRoaXMuYnVpbGRTdHlsZXNCeUdyb3VwKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY29sdW1ucygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBpbm5lcldpZHRoKHZhbDogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fY29sdW1ucykge1xyXG4gICAgICBjb25zdCBjb2xCeVBpbiA9IGNvbHVtbnNCeVBpbih0aGlzLl9jb2x1bW5zKTtcclxuICAgICAgdGhpcy5fY29sdW1uR3JvdXBXaWR0aHMgPSBjb2x1bW5Hcm91cFdpZHRocyhjb2xCeVBpbiwgdGhpcy5fY29sdW1ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IHZhbDtcclxuICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKCk7XHJcbiAgICB0aGlzLmJ1aWxkU3R5bGVzQnlHcm91cCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlubmVyV2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9pbm5lcldpZHRoO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcm93Q2xhc3M6IGFueTtcclxuICBASW5wdXQoKSByb3c6IGFueTtcclxuICBASW5wdXQoKSBncm91cDogYW55O1xyXG4gIEBJbnB1dCgpIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcm93SW5kZXg6IG51bWJlcjtcclxuICBASW5wdXQoKSBkaXNwbGF5Q2hlY2s6IGFueTtcclxuICBASW5wdXQoKSB0cmVlU3RhdHVzOiBUcmVlU3RhdHVzID0gJ2NvbGxhcHNlZCc7XHJcbiAgQElucHV0KCkgcm93RGV0YWlsOiBhbnk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG9mZnNldFgodmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX29mZnNldFggPSB2YWw7XHJcbiAgICB0aGlzLmJ1aWxkU3R5bGVzQnlHcm91cCgpO1xyXG4gIH1cclxuICBnZXQgb2Zmc2V0WCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9vZmZzZXRYO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXHJcbiAgZ2V0IGNzc0NsYXNzKCkge1xyXG4gICAgbGV0IGNscyA9ICdkYXRhdGFibGUtYm9keS1yb3cnO1xyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCkge1xyXG4gICAgICBjbHMgKz0gJyBhY3RpdmUnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucm93SW5kZXggJSAyICE9PSAwKSB7XHJcbiAgICAgIGNscyArPSAnIGRhdGF0YWJsZS1yb3ctb2RkJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnJvd0luZGV4ICUgMiA9PT0gMCkge1xyXG4gICAgICBjbHMgKz0gJyBkYXRhdGFibGUtcm93LWV2ZW4nO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnJvd0NsYXNzKSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IHRoaXMucm93Q2xhc3ModGhpcy5yb3cpO1xyXG4gICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBjbHMgKz0gYCAke3Jlc31gO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcclxuICAgICAgICAgIGlmIChyZXNba10gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgY2xzICs9IGAgJHtrfWA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNscztcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcclxuICBASW5wdXQoKVxyXG4gIHJvd0hlaWdodDogbnVtYmVyO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLnB4JylcclxuICBnZXQgY29sdW1uc1RvdGFsV2lkdGhzKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uR3JvdXBXaWR0aHMudG90YWw7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgX2VsZW1lbnQ6IGFueTtcclxuICBfY29sdW1uR3JvdXBXaWR0aHM6IGFueTtcclxuICBfY29sdW1uc0J5UGluOiBhbnk7XHJcbiAgX29mZnNldFg6IG51bWJlcjtcclxuICBfY29sdW1uczogYW55W107XHJcbiAgX2lubmVyV2lkdGg6IG51bWJlcjtcclxuICBfZ3JvdXBTdHlsZXM6IHsgW3Byb3A6IHN0cmluZ106IHt9IH0gPSB7XHJcbiAgICBsZWZ0OiB7fSxcclxuICAgIGNlbnRlcjoge30sXHJcbiAgICByaWdodDoge31cclxuICB9O1xyXG5cclxuICBwcml2YXRlIF9yb3dEaWZmZXI6IEtleVZhbHVlRGlmZmVyPHt9LCB7fT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgICBAU2tpcFNlbGYoKSBwcml2YXRlIHNjcm9sbGJhckhlbHBlcjogU2Nyb2xsYmFySGVscGVyLFxyXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5fcm93RGlmZmVyID0gZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9yb3dEaWZmZXIuZGlmZih0aGlzLnJvdykpIHtcclxuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYWNrQnlHcm91cHMoaW5kZXg6IG51bWJlciwgY29sR3JvdXA6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gY29sR3JvdXAudHlwZTtcclxuICB9XHJcblxyXG4gIGNvbHVtblRyYWNraW5nRm4oaW5kZXg6IG51bWJlciwgY29sdW1uOiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIGNvbHVtbi4kJGlkO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRTdHlsZXNCeUdyb3VwKCkge1xyXG4gICAgdGhpcy5fZ3JvdXBTdHlsZXMubGVmdCA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ2xlZnQnKTtcclxuICAgIHRoaXMuX2dyb3VwU3R5bGVzLmNlbnRlciA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ2NlbnRlcicpO1xyXG4gICAgdGhpcy5fZ3JvdXBTdHlsZXMucmlnaHQgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdyaWdodCcpO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGNhbGNTdHlsZXNCeUdyb3VwKGdyb3VwOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHdpZHRocyA9IHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzO1xyXG4gICAgY29uc3Qgb2Zmc2V0WCA9IHRoaXMub2Zmc2V0WDtcclxuXHJcbiAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgIHdpZHRoOiBgJHt3aWR0aHNbZ3JvdXBdfXB4YFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5yb3cgJiYgISF0aGlzLnJvdy5kZXRhaWwgJiYgZ3JvdXAgPT09ICdsZWZ0Jykge1xyXG4gICAgICBzdHlsZXMud2lkdGggPSBgMTAwJWA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdyb3VwID09PSAnbGVmdCcpIHtcclxuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXRYLCAwKTtcclxuICAgIH0gZWxzZSBpZiAoZ3JvdXAgPT09ICdyaWdodCcpIHtcclxuICAgICAgY29uc3QgYm9keVdpZHRoID0gcGFyc2VJbnQodGhpcy5pbm5lcldpZHRoICsgJycsIDApO1xyXG4gICAgICBjb25zdCB0b3RhbERpZmYgPSB3aWR0aHMudG90YWwgLSBib2R5V2lkdGg7XHJcbiAgICAgIGNvbnN0IG9mZnNldERpZmYgPSB0b3RhbERpZmYgLSBvZmZzZXRYO1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSAob2Zmc2V0RGlmZiArIHRoaXMuc2Nyb2xsYmFySGVscGVyLndpZHRoKSAqIC0xO1xyXG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIG9mZnNldCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0eWxlcztcclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgZXZlbnQuY2VsbEluZGV4ID0gaW5kZXg7XHJcbiAgICBldmVudC5yb3dFbGVtZW50ID0gdGhpcy5fZWxlbWVudDtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xyXG4gICAgY29uc3QgaXNUYXJnZXRSb3cgPSBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgaXNBY3Rpb24gPVxyXG4gICAgICBrZXlDb2RlID09PSBLZXlzLnJldHVybiB8fFxyXG4gICAgICBrZXlDb2RlID09PSBLZXlzLmRvd24gfHxcclxuICAgICAga2V5Q29kZSA9PT0gS2V5cy51cCB8fFxyXG4gICAgICBrZXlDb2RlID09PSBLZXlzLmxlZnQgfHxcclxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5yaWdodDtcclxuXHJcbiAgICBpZiAoaXNBY3Rpb24gJiYgaXNUYXJnZXRSb3cpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xyXG4gICAgICAgIHR5cGU6ICdrZXlkb3duJyxcclxuICAgICAgICBldmVudCxcclxuICAgICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICAgIHJvd0VsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJywgWyckZXZlbnQnXSlcclxuICBvbk1vdXNlZW50ZXIoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcclxuICAgICAgdHlwZTogJ21vdXNlZW50ZXInLFxyXG4gICAgICBldmVudCxcclxuICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgcm93RWxlbWVudDogdGhpcy5fZWxlbWVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWNhbGN1bGF0ZUNvbHVtbnModmFsOiBhbnlbXSA9IHRoaXMuY29sdW1ucyk6IHZvaWQge1xyXG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcclxuICAgIGNvbnN0IGNvbHNCeVBpbiA9IGNvbHVtbnNCeVBpbih0aGlzLl9jb2x1bW5zKTtcclxuICAgIHRoaXMuX2NvbHVtbnNCeVBpbiA9IGNvbHVtbnNCeVBpbkFycih0aGlzLl9jb2x1bW5zKTtcclxuICAgIHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzID0gY29sdW1uR3JvdXBXaWR0aHMoY29sc0J5UGluLCB0aGlzLl9jb2x1bW5zKTtcclxuICB9XHJcblxyXG4gIG9uVHJlZUFjdGlvbigpIHtcclxuICAgIHRoaXMudHJlZUFjdGlvbi5lbWl0KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==