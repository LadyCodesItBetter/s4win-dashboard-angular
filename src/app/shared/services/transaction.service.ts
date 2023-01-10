import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TransactionStatus } from '../enum/transaction-status.enum';
import { Transaction } from '../enum/transaction.interface';
import {environment} from '../../../environments/environment';
import {PaginatedResponse} from '../interfaces/paginated.response';

export interface SearchParams {
  /**
   * status of transaction
   */
  status?: (TransactionStatus|'all')[];
  /**
   * product type. can be 'bike' or 'frame'
   */
  productType?: string;
  /**
   * search from date
   */
  dateFrom?: Date;
  /**
   * search until date
   */
  dateTo?: Date;
  /**
   * selected page
   */
  page?: number;
  /**
   * page's elements size
   */
  pageSize?: number;
  /**
   * working asset. if true the backend ignore the status above and set a bunch of statuses
   */
  working?: boolean;
  /**
   * serial number of the bike/frame
   */
  serialNumber?: string;
}

@Injectable()
export class TransactionService {
  url: string;
  productType = 'frame';

  constructor(
    private httpClient: HttpClient,
  ) {
    this.url = environment.baseUrl;
  }

  /**
   * format data to match table needs
   * @param data
   * @returns
   */
  formatData(data: any[]) {
    return data.map(item => ({
      data: {
        ...item,
        id: `colnago-${item._id}`,
        'serial number': item.serialNumber,
        'product type': item.productType === 0 ? 'bike' : 'kitframe',
        status: item.status.replace(/_/g, ' '),
      },
    }));
  }

  /**
   * get transactions by type. Page and PageSize can be specified
   * @param page
   * @param pageSize
   * @param productType
   * @returns
   */
  get(page: number = 1, pageSize = 10, productType?: string): Promise<PaginatedResponse<Transaction>> {
    return new Promise((resolve) => {
      this.httpClient.get<PaginatedResponse<Transaction>>(this.url + '/transactions', {
        params: {
          page,
          pageSize,
          productType: productType || this.productType,
        },
      }).subscribe(res => resolve(res));
    });
  }

  /**
   * Search transaction by filters
   * @param filters
   * @returns
   */
  search(filters: SearchParams): Promise<PaginatedResponse<Transaction>> {
    let params: any = {};
    if (filters.status && filters.status.length) {
      if (!filters.status.includes('all')) {
        params.status = filters.status;
      }
    }
    if (filters.productType) {
      params.productType = filters.productType;
    }
    if (filters.dateFrom) {
      params.dateFrom = moment(filters.dateFrom).unix();
    }
    if (filters.dateTo) {
      params.dateTo = moment(filters.dateTo).unix();
    }
    if (filters.page !== undefined && filters.page !== null) {
      params.page = filters.page;
    }
    if (filters.pageSize !== undefined && filters.pageSize !== null) {
      params.pageSize = filters.pageSize;
    }
    if (filters.working) {
      params.working = filters.working;
    }
    if (filters.serialNumber) {
      params = {
        serialNumber: filters.serialNumber,
      };
    }
    return new Promise((resolve) => {
      this.httpClient.get<PaginatedResponse<Transaction>>(this.url + '/transactions/search', {
        params,
      }).subscribe(res => resolve(res));
    });
  }
}
