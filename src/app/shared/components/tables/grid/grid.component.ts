import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSourceBuilder, NbTreeGridPresentationNode,
} from '@nebular/theme';
import {Transaction} from '../../../enum/transaction.interface';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}


@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnChanges {
  @Input('show-header') showHeader: boolean = true;
  @Input('equalColumnsWidth') equalColumnsWidth: boolean = true;
  @Input('columns') columns: string[] = [];
  @Input('data') data: any = [];

  @Output(`clickedRow`) clickedRow: EventEmitter<any> = new EventEmitter();

  sortColumn: string = '';
  noData: boolean = true;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,
  ) {}

  changeSort(sortRequest: NbSortRequest): void {
    this.data.sort(sortRequest);
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.data = this.dataSourceBuilder.create(changes.data.currentValue);
    }

    this.noData = changes.data.currentValue.length === 0;
  }

  onClick(row: NbTreeGridPresentationNode<Transaction>) {
    this.clickedRow.emit(row.data as any);
  }
}
