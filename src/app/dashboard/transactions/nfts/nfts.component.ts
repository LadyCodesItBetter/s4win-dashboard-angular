import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../shared/services/storage.service';
import {NftService} from '../../../shared/services/nft.service';
import {UserService} from '../../../shared/services/user.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ngx-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.scss'],
})
export class NftsComponent implements OnInit {

  user: any;
  pageSize: number = 10;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private readonly nftService: NftService,
    private readonly userService: UserService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getCurrentUser();
    if (this.user && this.user.userSettings) {
      this.pageSize = this.user.userSettings.allPages.nRowsPerTable;
      this.settings.pager.perPage = this.pageSize;
      this.settings = Object.assign({}, this.settings);
    }
  }

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
      assetSerialNumber: {
        title: 'Asset serial number',
        type: 'string',
        filter: true,
      },
      ucc: {
        title: 'UCC',
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
  endpoint = `${this.nftService.url}/nfts/search-wrp`;

  onRowClicked($event: any): void {
    $event = {
      ...$event,
      detailTitle: `Nft No. ${$event.assetSerialNumber}`,
    };
    // if (!!$event.blockchainHash) {
    //   console.info('test', $event.attributes.find(attr => attr.attributeLabel === 'txId'));
    //   $event['polygonUrl'] = `https://polygonscan.com/tx/${$event.blockchainHash}`;
    // }

    // $event['polygonUrl'] = `${environment.polygonUrl}${$event.blockchainHash}`;

    this.localStorageService.setItem('backUrl', '/dashboard/transaction/nfts');
    this.router.navigate(['/dashboard/transaction/nfts/detail'], {state: $event});
  }

}
