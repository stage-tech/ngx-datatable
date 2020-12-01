import { Component } from '@angular/core';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'basic-auto-demo',
  template: `
    <div>
      <h3>
        Fluid Row Heights
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/basic-auto.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [loadingIndicator]="loadingIndicator"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        headerHeight="50"
        footerHeight="50"
        rowHeight="auto"
        [reorderable]="reorderable"
      >
      </ngx-datatable>
    </div>
  `
})
export class BasicAutoComponent {
  rows = [];
  loadingIndicator = true;
  reorderable = true;

  columns = [
    { prop: 'name' },
    { name: 'Gender', filter: true },
    { name: 'Company', sortable: false, icons: 'icons', onClickAction: row => console.log('ok', row) },
    {
      prop: 'select',
      name: 'Select',
      selectOptions: row => [
        { label: 'Option', value: '1', class: 'red-option', disabled: true },
        { label: 'Option2', value: '2' },
        { label: 'Option3', value: '3' }
      ],
      hideIfEmpty: row => row.hide
    }
  ];

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      this.rows = data.map((row, i) => ({ ...row, select: '1', hide: i === 0 }));
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}
