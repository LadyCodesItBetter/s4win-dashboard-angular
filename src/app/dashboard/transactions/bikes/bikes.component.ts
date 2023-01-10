import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../shared/services/storage.service';
import {environment} from '../../../../environments/environment';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'ngx-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent implements OnInit {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private readonly userService: UserService,
  ) {}
  user: any;
  pageSize: number = 10;
  settings = {
    hideSubHeader: false,
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'viewRecord', title: '<i class="fa fa-info"></i>'},
      ],
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        filter: false,
        sort: false,
        valuePrepareFunction: (idx, product) => {
          return `colnago-${product._id}`;
        },
      },
      serialNumber: {
        title: 'Serial number',
        type: 'string',
        filter: true,
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: true,
        valuePrepareFunction: (idx, product) => {
          return `${product.status.toUpperCase().replace(/_/g, ' ')}`;
        },
      },
    },
    pager: {
      display: true,
      perPage: this.pageSize,
    },
  };
  endpoint = `${environment.baseUrl}/transactions/search-wrp?productType=bike`;

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getCurrentUser();
    if (this.user && this.user.userSettings) {
      this.pageSize = this.user.userSettings.allPages.nRowsPerTable;
      this.settings.pager.perPage = this.pageSize;
      this.settings = Object.assign({}, this.settings);
    }
  }

  onRowClicked($event: any): void {
    $event = {
      ...$event,
      detailTitle: `Bike No. ${$event.serialNumber}`,
      backUrl: '/dashboard/transaction/bikes',
    };
    this.localStorageService.setItem('backUrl', '/dashboard/transaction/bikes');
    this.router.navigate(['/dashboard/transaction/bikes/detail'], {state: $event});
  }

}
