import { Component } from '@angular/core';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';
import { of } from 'rxjs';

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
    { name: 'Gender', tooltip: 'topo', tooltipDuration: 300 },
    {
      name: 'Company',
      sortable: false,
      icons: 'icons',
      onClickAction: row => console.log('ok', row),
      hideTextProperty: true
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
