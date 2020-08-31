import { Component, Input, ViewEncapsulation } from '@angular/core';

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
}
