import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {ServerDataSource} from 'ng2-smart-table';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit, OnChanges {
  @Input('settings') settings: any;
  @Input('endpoint') endpoint: string;
  @Output() userRowClick = new EventEmitter<any>();
  @Output() onCustomActionClick = new EventEmitter<any>();
  source: ServerDataSource;

  constructor(private _http: HttpClient)  {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.source) {
      this.source.setPaging(1, changes.settings.currentValue.pager.perPage);
    }
  }

  ngOnInit(): void {
    this.source = new ServerDataSource(this._http,
      {
        dataKey: 'data',
        endPoint: this.endpoint,
        pagerPageKey: 'page',
        pagerLimitKey: 'pageSize', // this should page size param name in endpoint (request not response)
        totalKey: 'pagination.totalCount', // this is total records count in response, this will handle pager
        // filterFieldKey: '',
      });
  }

  userRowSelect($event: any) {
    this.userRowClick.emit($event.data);
  }

  onCustomAction(event): void {
    if (this.onCustomActionClick.observers.length === 0) {
      this.userRowSelect(event);
    } else {
      this.onCustomActionClick.emit(event.data);
    }
  }
}
