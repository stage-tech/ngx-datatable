import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ice-custom-tooltip',
  templateUrl: './ice-custom-tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ice-custom-tooltip.component.scss'],
  host: {
    class: 'ice-custom-tooltip'
  }
})
export class CustomToolTipComponent {
  @Input() text: string;
  @Input() onMouseLeave: () => void;
  @Input() onMouseEnter: () => void;

  @HostListener('mouseleave')
  hide() {
    if (this.onMouseLeave) {
      this.onMouseLeave();
    }
  }

  @HostListener('mouseenter')
  show() {
    if (this.onMouseEnter) {
      this.onMouseEnter();
    }
  }
}
