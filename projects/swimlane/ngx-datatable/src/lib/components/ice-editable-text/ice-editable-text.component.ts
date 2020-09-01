import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ice-editable-text',
  templateUrl: './ice-editable-text.component.html',
  styleUrls: ['./ice-editable-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ice-editable-text'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTextComponent implements AfterViewInit {
  editing = false;
  active = false;

  @Input() align = 'left';
  @Input() editOnSpace = true;
  @Input() editOnClick = true;
  @Input() focusOnEnter = true;
  @Input() editOnFocus = false;
  @Input() disabled = false;
  @Input() value: string;
  @Input() errorText = '';
  @Output() focus = new EventEmitter<null>();
  @Output() toggleEditing = new EventEmitter<null>();
  @Output() toggleActive = new EventEmitter<null>();
  @Output() update = new EventEmitter<string>();
  @ViewChildren('inputElement') inputEl;
  @ViewChild('contentWrapper', { static: false }) content: ElementRef;

  emitUpdate(newText) {
    if (!this.disabled) {
      this.update.emit(newText);
    }
  }

  emitToggleEditing($event) {
    $event.stopPropagation();
    if (!this.disabled) {
      this.editing = !this.editing;
    }
  }

  emitFocus() {
    if (this.focus) {
      this.focus.emit(null);
    }
  }

  emitToggleActive($event) {
    $event.stopPropagation();
    if (!this.disabled) {
      this.active = !this.active;
    }
  }

  ngAfterViewInit() {
    this.inputEl.changes.subscribe(d => {
      return d.last && d.last.nativeElement.focus();
    });
    if (this.value == null) {
      this.value =
        this.content &&
        this.content.nativeElement.childNodes.length > 0 &&
        this.content.nativeElement.childNodes[0].data;
    }
  }
}
