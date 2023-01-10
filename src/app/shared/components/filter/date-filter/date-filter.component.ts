import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'ngx-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent {
  @Input('dateFrom') dateFrom?: Date | null = moment().toDate();
  @Input('dateTo') dateTo?: Date | null = moment().toDate();
  dateEnabled = true;
  @Output() dateFromChanged: EventEmitter<any> = new EventEmitter();
  @Output() dateToChanged: EventEmitter<Date> = new EventEmitter();
  @Output() noDateSet: EventEmitter<boolean> = new EventEmitter();
  @Output() searchStart: EventEmitter<boolean> = new EventEmitter();
  @Input('title') title?: string;
  @Input('buttonVisible') buttonVisible?: boolean = false;
  @Input('selectValues') selectValues?: string[];
  @Output() setSelected: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  setNoDate() {
    this.dateFrom = this.dateFrom ? null : moment().toDate();
    this.dateTo = this.dateTo ? null : moment().toDate();
    this.dateEnabled = !this.dateEnabled;
    this.noDateSet.emit(true);
  }

  onDateFromChanged($event: Date) {
    this.dateFromChanged.emit($event);
  }

  onDateToChanged($event: Date) {
    this.dateFromChanged.emit($event);
  }

  onSelectChange($event: string) {
    this.setSelected.emit($event);
  }

  onSearchStart($event: boolean) {
    this.searchStart.emit($event);
  }

}
