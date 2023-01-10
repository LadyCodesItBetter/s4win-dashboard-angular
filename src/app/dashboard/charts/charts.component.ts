import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Transaction} from '../../shared/enum/transaction.interface';
import {Nft} from '../../shared/enum/nft.interface';
import {TransactionStatus} from '../../shared/enum/transaction-status.enum';
import {NftStatus} from '../../shared/enum/nft-status.enum';
import {TransactionService} from '../../shared/services/transaction.service';
import {NftService} from '../../shared/services/nft.service';
import {TransactionHelper} from '../../shared/utils/transaction.helper';
import {ProductType} from '../../shared/enum/product-type.enum';
import {NftHelper} from '../../shared/utils/nft.helper';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'ngx-echarts-pie',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  showWorked: boolean = false;
  showWorking: boolean = false;

  workingChart: any[] = [];
  workedChart: any[] = [];
  transactionChartData: any[] = [];

  bikes: Transaction[] = [];
  frames: Transaction[] = [];
  nft: Nft[] = [];

  workedBikes: Transaction[] = [];
  workedFrames: Transaction[] = [];
  workingBikes: Transaction[] = [];
  workingFrames: Transaction[] = [];
  workingNft: Nft[] = [];
  workedNft: Nft[] = [];
  selectedDateFrom: Date | undefined = moment().toDate();
  selectedNftDateFrom: Date | undefined = moment().subtract(1, 'month').toDate();
  selectedTransactionDateFrom: Date | undefined = moment().subtract(1, 'month').toDate();
  selectedDateTo: Date | undefined = moment().toDate();
  selectedNftDateTo: Date | undefined = moment().toDate();
  selectedTransactionDateTo: Date | undefined = moment().toDate();
  nftSearchButtonVisible = true;

  dateEnabled = true;
  dataTransactionHistogramEnabled = true;
  dateRangeLabel = 'Worked assets date range';
  searchButtonVisible = true;
  /**
   * Nebular configuration options
   */
  productTypes = ['bike', 'kitframe', 'frame'];
  selectedHistogramProductType = '';
  transactionStatuses = Object.values(TransactionStatus);
  nftStatuses = Object.values(NftStatus);
  transactionHOptions: any;


  cardColor: string = '#fafafa';

  constructor(
    private readonly transactionService: TransactionService,
    private readonly nftService: NftService,
    private readonly cdr: ChangeDetectorRef,
    private readonly userService: UserService,
  ) {
  }

  async ngOnInit() {
    const user = await this.userService.getCurrentUser();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayFrom = new Date();
    let rowPerPage: number = 5;
    if (user && user.userSettings) {
      switch (user.userSettings.allPages.defaultDateRangeUnit) {
        case 'months':
          dayFrom.setMonth(today.getMonth() - user.userSettings.allPages.defaultDateRange);
          break;
        case 'days':
          dayFrom.setDate(today.getDate() - user.userSettings.allPages.defaultDateRange);
          break;
        case 'hours':
          dayFrom.setHours(today.getHours() - user.userSettings.allPages.defaultDateRange);
          break;
      }
      rowPerPage = user.userSettings.allPages.nRowsPerTable;
    } else {
      dayFrom.setDate(today.getDate() - 2);
      rowPerPage = 5;
    }

    this.selectedDateFrom = dayFrom;
    this.selectedNftDateFrom = dayFrom;
    this.selectedTransactionDateFrom = dayFrom;

    this.selectedDateTo = today;
    this.selectedNftDateTo = today;
    this.selectedTransactionDateTo = today;

    const [
      transactionsToday,
      nftToday,
      transactionsHistogram,
      nftHistogram,
    ] = await Promise.all([
      this.transactionService.search({
        pageSize: 0,
        dateFrom: dayFrom,
        dateTo: today,
      }),
      this.nftService.search({
        pageSize: 0,
        dateFrom: dayFrom,
        dateTo: today,
      }),
      this.transactionService.search({
        pageSize: 0,
        dateFrom: this.selectedTransactionDateFrom, dateTo: this.selectedTransactionDateTo,
      }),
      this.nftService.search({
        pageSize: 0,
        dateFrom: this.selectedNftDateFrom, dateTo: this.selectedNftDateTo,
      }),
    ]);

    this.setWorkingBikes(transactionsToday.data);
    this.setWorkedBikes(transactionsToday.data);
    this.setWorkingFrames(transactionsToday.data);
    this.setWorkedFrames(transactionsToday.data);
    this.setWorkingNft(nftToday.data);
    this.setWorkedNft(nftToday.data);
    this.setTransactionsHistogram(transactionsHistogram.data);
    this.setNftHistogram(nftHistogram.data);

    this.setWorkingChartData(this.workingBikes.length, this.workingFrames.length, this.workingNft.length);
    this.setWorkedChartData(this.workedBikes.length, this.workedFrames.length, this.workedNft.length);
  }

  onDateFromChanged($event: Date, field: string) {
    switch (field) {
      case 'selectedDateFrom':
        this.selectedDateFrom = $event;
        break;
      case 'selectedNftDateFrom':
        this.selectedNftDateFrom = $event;
        break;
      case 'selectedTransactionDateFrom':
        this.selectedTransactionDateFrom = $event;
        break;
      default:
        break;
    }
  }

  onDateToChanged($event: Date, field: string) {
    switch (field) {
      case 'selectedDateTo':
        this.selectedDateTo = $event;
        break;
      case 'selectedTransactionDateTo':
        this.selectedTransactionDateTo = $event;
        break;
      case 'selectedNftDateTo':
        this.selectedNftDateTo = $event;
        break;
      default:
        break;
    }
  }

  onSetNoDate($event: boolean, field?: string) {
    switch (field) {
      case 'transaction-histogram':
        this.dataTransactionHistogramEnabled = !this.dataTransactionHistogramEnabled;
        if (!this.dataTransactionHistogramEnabled) {
          this.selectedTransactionDateFrom = undefined;
          this.selectedTransactionDateTo = undefined;
        } else {
          this.selectedTransactionDateFrom = moment().toDate();
          this.selectedTransactionDateTo = moment().toDate();
        }
        break;
      default:
        this.dateEnabled = !this.dateEnabled;
        if (!this.dateEnabled) {
          this.selectedDateFrom = undefined;
          this.selectedDateTo = undefined;
        } else {
          this.selectedDateFrom = moment().toDate();
          this.selectedDateTo = moment().toDate();
        }
        break;
    }
  }


  async updateWorkedAsset() {
    const [workedTransactions, workedNft] = await Promise.all([
      this.transactionService.search({
        status: [TransactionStatus.CLOSED],
        dateFrom: this.selectedDateFrom,
        dateTo: this.selectedDateTo,
        pageSize: 0,
      }),
      this.nftService.search({
        status: [NftStatus.WRITTEN],
        dateFrom: this.selectedDateFrom,
        dateTo: this.selectedDateTo,
        pageSize: 0,
      }),
    ]);
    this.setWorkedBikes(workedTransactions.data);
    this.setWorkedFrames(workedTransactions.data);
    this.setWorkedNft(workedNft.data);

    this.setWorkingChartData(this.workingBikes.length, this.workingFrames.length, this.workingNft.length);
    this.setWorkedChartData(this.workedBikes.length, this.workedFrames.length, this.workedNft.length);

    this.cdr.detectChanges();
  }

  /**
   * Set Transactions histogram
   * @param {Transaction[]} transactions
   */
  setTransactionsHistogram(transactions: Transaction[]) {
    // group transactions by status
    const groupedTransactions = _.groupBy(transactions, 'status');
    const bike = []; // blue value for bike
    const frame = []; // green value for frame and kitframe
    const chartData = [];
    for (const status of this.transactionStatuses) {

      const groupedData = {
        name: status.toUpperCase().replace(/_/g, ' '),
        value: groupedTransactions[status]?.filter(t => {
          return t.productType === ProductType.FRAME ||
            t.productType === ProductType.KITFRAME ||
            t.productType === ProductType.BIKE;
        }).length || 0,
      };

      chartData.push(groupedData);

      /**
       * fare un array per ogni stato e dentro ogni array mettere bike e frame&&kit frame per farlo vedere come vogliono
       **/

      // // set bike's number
      // bike.push({
      //   name: status.toUpperCase().replace(/_/g, ' '),
      //   value: groupedTransactions[status]?.filter(t => t.productType === ProductType.BIKE).length || 0,
      // });


      // set frame's number
      frame.push({
        name: status.toUpperCase().replace(/_/g, ' '),
        value: groupedTransactions[status]?.filter(t => {
          return t.productType === ProductType.FRAME ||
            t.productType === ProductType.KITFRAME ||
            t.productType === ProductType.BIKE;
        }).length || 0,
      });

    }
    this.transactionHOptions = {
      legend: {
        data: ['bike', 'frame'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        // format status human readable
        data: this.transactionStatuses.map(ts => ts.replace(/_/g, ' ')),
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bike',
          type: 'bar',
          data: bike,
          animationDelay: (idx: any) => idx * 10,
        },
        {
          name: 'frame',
          type: 'bar',
          data: frame,
          animationDelay: (idx: any) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: any) => idx * 5,
    };

    this.transactionChartData = chartData;
    // this.transactionChartData = [
    //   {
    //     name: 'Bike',
    //     series: bike,
    //   },
    //   {
    //     name: 'Frame',
    //     series: frame,
    //   },
    // ];
    // this.transactionChartData = [
    //   {
    //     name: 'Bike',
    //     series: data1,
    //     animationDelay: (idx: any) => idx * 10,
    //   },
    //   {
    //     name: 'Frame',
    //     series: data2,
    //     animationDelay: (idx: any) => idx * 10 + 100,
    //   },
    // ];
  }

  setNftHistogram(nft: Nft[]) {
    // group nft by status
    const groupedTransactions = _.groupBy(nft, 'status');
    const data1 = [];
    for (const status of this.nftStatuses) {
      data1.push(groupedTransactions[status]?.length || 0);
    }
  }

  setWorkedNft(nft: Nft[]) {
    this.workedNft = nft.filter(
      n => n.status === NftStatus.WRITTEN,
    );
  }

  setWorkingNft(nft: Nft[]) {
    this.workingNft = nft.filter(
      n => NftHelper.getWorkingStatuses().includes(n.status),
    );
  }

  setWorkedFrames(transactions: Transaction[]) {
    this.workedFrames = transactions.filter(
      t => t.status === TransactionStatus.CLOSED && t.productType === ProductType.KITFRAME,
    );
  }

  setWorkingFrames(transactions: Transaction[]) {
    this.workingFrames = transactions.filter(
      t => TransactionHelper.getWorkingStatuses().includes(t.status as TransactionStatus)
        && t.productType === ProductType.KITFRAME,
    );
  }

  setWorkedBikes(transactions: Transaction[]) {
    this.workedBikes = transactions.filter(
      t => t.status === TransactionStatus.CLOSED && t.productType === ProductType.BIKE,
    );
  }

  setWorkingBikes(transactions: Transaction[]) {
    this.workingBikes = transactions.filter(
      t => TransactionHelper.getWorkingStatuses().includes(t.status as TransactionStatus)
        && t.productType === ProductType.BIKE,
    );
  }

  setWorkingChartData(workingBikesCount: number, workingFramesCount: number, workingNftCount: number) {
    this.workingChart = [
      {value: workingBikesCount, name: 'Bikes'},
      {value: workingFramesCount, name: 'Frames'},
      {value: workingNftCount, name: 'Nfts'},
    ];

    // if no assets then hide charts and show message
    this.showWorking = !!this.workingBikes.length || !!this.workingFrames.length || !!this.workingNft.length;
  }

  setWorkedChartData(workedBikesCount: number, workedFramesCount: number, workedNftCount: number) {
    this.workedChart = [
      {value: workedBikesCount, name: 'Bikes'},
      {value: workedFramesCount, name: 'Frames'},
      {value: workedNftCount, name: 'NFTs'},
    ];

    // if no assets then hide charts and show message
    this.showWorked = !!this.workedBikes.length || !!this.workedFrames.length || !!this.workedNft.length;
  }

  async updateTransactionsHistogram() {
    const transactions = await this.transactionService.search({
      dateFrom: this.selectedTransactionDateFrom, dateTo: this.selectedTransactionDateTo,
      pageSize: 0,
      productType: this.selectedHistogramProductType,
    });
    this.setTransactionsHistogram(transactions.data);
  }

  async updateNftHistogram() {
    const nft = await this.nftService.search({
      dateFrom: this.selectedNftDateFrom, dateTo: this.selectedNftDateTo,
      pageSize: 0,
    });
  }

  setSelectedProductType(selectedProductType: string) {
    this.selectedHistogramProductType = selectedProductType;
  }
}


