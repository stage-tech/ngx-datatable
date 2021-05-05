import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
export class CustomToolTipComponent {
  hide() {
    if (this.onMouseLeave) {
      this.onMouseLeave();
    }
  }
  show() {
    if (this.onMouseEnter) {
      this.onMouseEnter();
    }
  }
}
CustomToolTipComponent.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'ice-custom-tooltip',
        template:
          '<div>\r\n  <div class="tooltip-container">\r\n    <div [innerHTML]="text"></div>\r\n  </div>\r\n</div>\r\n',
        encapsulation: ViewEncapsulation.None,
        host: {
          class: 'ice-custom-tooltip'
        },
        styles: [
          '.ice-custom-tooltip .tooltip-container{background:#616161;border:1px solid grey;border-radius:2px;border-radius:5px;color:#fff;padding:1px 5px 4px}.ice-custom-tooltip .tooltip-table{border-collapse:collapse}.ice-custom-tooltip .tooltip-header-row{border-bottom:1pt solid #fff}.ice-custom-tooltip .text-align-left{text-align:left}.ice-custom-tooltip .text-align-vertical-center{vertical-align:middle!important}.ice-custom-tooltip .cell-padding{margin:5px;padding:5px}'
        ]
      }
    ]
  }
];
CustomToolTipComponent.propDecorators = {
  text: [{ type: Input }],
  onMouseLeave: [{ type: Input }],
  onMouseEnter: [{ type: Input }],
  hide: [{ type: HostListener, args: ['mouseleave'] }],
  show: [{ type: HostListener, args: ['mouseenter'] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNlLWN1c3RvbS10b29sdGlwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2ljZS1jdXN0b20tdG9vbHRpcC9pY2UtY3VzdG9tLXRvb2x0aXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVdsRixNQUFNLE9BQU8sc0JBQXNCO0lBTWpDLElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUdELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7O1lBMUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QiwwSEFBa0Q7Z0JBQ2xELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUVyQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG9CQUFvQjtpQkFDNUI7O2FBQ0Y7OzttQkFFRSxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzttQkFFTCxZQUFZLFNBQUMsWUFBWTttQkFPekIsWUFBWSxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ljZS1jdXN0b20tdG9vbHRpcCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ljZS1jdXN0b20tdG9vbHRpcC5jb21wb25lbnQuaHRtbCcsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBzdHlsZVVybHM6IFsnLi9pY2UtY3VzdG9tLXRvb2x0aXAuY29tcG9uZW50LnNjc3MnXSxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ2ljZS1jdXN0b20tdG9vbHRpcCdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21Ub29sVGlwQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSB0ZXh0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgb25Nb3VzZUxlYXZlOiAoKSA9PiB2b2lkO1xyXG4gIEBJbnB1dCgpIG9uTW91c2VFbnRlcjogKCkgPT4gdm9pZDtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXHJcbiAgaGlkZSgpIHtcclxuICAgIGlmICh0aGlzLm9uTW91c2VMZWF2ZSkge1xyXG4gICAgICB0aGlzLm9uTW91c2VMZWF2ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXHJcbiAgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLm9uTW91c2VFbnRlcikge1xyXG4gICAgICB0aGlzLm9uTW91c2VFbnRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
