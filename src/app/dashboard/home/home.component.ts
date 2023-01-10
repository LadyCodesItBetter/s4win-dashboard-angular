import { Component, OnInit } from '@angular/core';
import {TransactionStatus} from '../../shared/enum/transaction-status.enum';
import {NftStatus} from '../../shared/enum/nft-status.enum';
import {TransactionService} from '../../shared/services/transaction.service';
import {NftService} from '../../shared/services/nft.service';
import {Transaction} from '../../shared/enum/transaction.interface';
import {Nft} from '../../shared/enum/nft.interface';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  bikeTableData: any[] = [];
  bikeColumns = ['serial number', 'status'];
  bikeChartData: any[] = [];
  bikesChartOption: any = {};


  frameTableData: any[] = [];
  frameColumns = ['serial number', 'status'];
  framesChartOption: any = {};
  frameChartData: any[] = [];


  nftTableData: any[] = [];
  nftColumns = ['asset serial number', 'status'];
  nftChartData: any[] = [];

  options: any = {};

  constructor(
    private readonly transactionService: TransactionService,
    private readonly nftService: NftService,
    private readonly userService: UserService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    const user = await this.userService.getCurrentUser();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayFrom = new Date();
    let rowPerPage: number = 5;
    if (user && user.userSettings) {
      switch (user.userSettings.homePage.defaultDateRangeUnit) {
        case 'months':
          dayFrom.setMonth(today.getMonth() - user.userSettings.homePage.defaultDateRange);
          break;
        case 'days':
          dayFrom.setDate(today.getDate() - user.userSettings.homePage.defaultDateRange);
          break;
        case 'hours':
          dayFrom.setHours(today.getHours() - user.userSettings.homePage.defaultDateRange);
          break;
      }
      rowPerPage = user.userSettings.homePage.nRowsPerTable;
    } else {
      dayFrom.setDate(today.getDate() - 2);
      rowPerPage = 5;
    }


    const [frameRes, bikeRes, nftRes] = await Promise.all([
      this.transactionService.search({
        productType: 'frame',
        dateFrom: dayFrom,
        dateTo: today,
        page: 1,
        pageSize: rowPerPage,
      }),
      this.transactionService.search({
        productType: 'bike',
        dateFrom: dayFrom,
        dateTo: today,
        page: 1,
        pageSize: rowPerPage,
      }),
      this.nftService.search({
        dateFrom: dayFrom,
        dateTo: today,
        page: 1,
        pageSize: rowPerPage,
      }),
    ]);

    this.frameTableData = this.transactionService.formatData(frameRes.data.slice(0, 9));
    this.bikeTableData = this.transactionService.formatData(bikeRes.data.slice(0, 9));
    this.nftTableData = this.nftService.formatData(nftRes.data.slice(0, 9));

    this.setBikesChart(bikeRes.data);
    this.setFramesChart(frameRes.data);
    this.setNftsChart(nftRes.data);

  }

  /**
   * Setup Bike chart
   * @param {Transaction} bikes
   * @returns
   */
  setBikesChart(bikes: Transaction[]) {
    // set bike items number by status

    this.bikeChartData = [
      {
        name: TransactionStatus.PENDING.replace(/_/g, ' '),
        value: bikes.filter(b => b.status === TransactionStatus.PENDING).length,
      },
      {
        name: TransactionStatus.CREATED.replace(/_/g, ' '),
        value: bikes.filter(b => b.status === TransactionStatus.CREATED).length,
      },
      {
        name: TransactionStatus.WAITING_FOR_REVIEW.replace(/_/g, ' '),
        value: bikes.filter(b => b.status === TransactionStatus.WAITING_FOR_REVIEW).length,
      },
      {
        name: TransactionStatus.CONFIRMED.replace(/_/g, ' '),
        value: bikes.filter(b => b.status === TransactionStatus.CONFIRMED).length,
      },
      {
        name: TransactionStatus.WRITING.replace(/_/g, ' '),
        value: bikes.filter(b => b.status === TransactionStatus.WRITING).length,
      },
      {
        name: TransactionStatus.WRITTEN.replace(/_/g, ' '),
        value: bikes.filter(b => b.status === TransactionStatus.WRITTEN).length,
      },
    ];
    return true;
  }

  /**
   * Setup frames chart
   * @param frames
   * @returns
   */
  setFramesChart(frames: Transaction[]) {
    // set frame items number by status
    this.frameChartData = [
      {
        name: TransactionStatus.PENDING.replace(/_/g, ' '),
        value: frames.filter(b => b.status === TransactionStatus.PENDING).length,
      },
      {
        name: TransactionStatus.CREATED.replace(/_/g, ' '),
        value: frames.filter(b => b.status === TransactionStatus.CREATED).length,
      },
      {
        name: TransactionStatus.WAITING_FOR_REVIEW.replace(/_/g, ' '),
        value: frames.filter(b => b.status === TransactionStatus.WAITING_FOR_REVIEW).length,
      },
      {
        name: TransactionStatus.CONFIRMED.replace(/_/g, ' '),
        value: frames.filter(b => b.status === TransactionStatus.CONFIRMED).length,
      },
      {
        name: TransactionStatus.WRITING.replace(/_/g, ' '),
        value: frames.filter(b => b.status === TransactionStatus.WRITING).length,
      },
      {
        name: TransactionStatus.WRITTEN.replace(/_/g, ' '),
        value: frames.filter(b => b.status === TransactionStatus.WRITTEN).length,
      },
    ];
    return true;
  }

  /**
   * Setup NFT chart
   * @param nfts
   * @returns
   */
  setNftsChart(nfts: Nft[]) {
    // Set nft items number by status
    this.nftChartData = [
      {
        name: NftStatus.CREATED.replace(/_/g, ' '),
        value: nfts.filter(b => b.status === NftStatus.CREATED).length,
      },
      {
        name: NftStatus.WAITING_FOR_REVIEW.replace(/_/g, ' '),
        value: nfts.filter(b => b.status === NftStatus.WAITING_FOR_REVIEW).length,
      },
      {
        name: NftStatus.READY_TO_WRITE.replace(/_/g, ' '),
        value: nfts.filter(b => b.status === NftStatus.READY_TO_WRITE).length,
      },
      {
        name: NftStatus.WRITING.replace(/_/g, ' '),
        value: nfts.filter(b => b.status === NftStatus.WRITING).length,
      },
      {
        name: NftStatus.WRITTEN.replace(/_/g, ' '),
        value: nfts.filter(b => b.status === NftStatus.WRITTEN).length,
      },
    ];
    return true;
  }

  /**
   * Fetch transacions or nfts' page by given product type
   * @param event
   */
  async goToTransactionPage(event: {page: number, productType: string}) {
    console.info('goToTransactionPage', event);
  }

}
