import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NftStatus} from '../enum/nft-status.enum';
import {PaginatedResponse} from '../interfaces/paginated.response';
import * as moment from 'moment';
import {Nft} from '../enum/nft.interface';
import {environment} from '../../../environments/environment';

/**
 * Interface for Nft search filters
 */
export interface NftSearchFilters {
  /**
   * status
   */
  status?: (NftStatus | 'all')[];
  /**
   * date from
   */
  dateFrom?: Date | null;
  /**
   * date to
   */
  dateTo?: Date | null;
  /**
   * page
   */
  page?: number;
  /**
   * page size
   */
  pageSize?: number;
  /**
   * ucc web configurator
   */
  ucc?: string;
  /**
   * working asset. if true the backend ignore the status above and set a bunch of statuses
   */
  working?: boolean;
  /**
   * asset serial number of the associated bike
   */
  assetSerialNumber?: string;
}

/**
 * Nft Service
 */
@Injectable()
export class NftService {
  /**
   * factory system url
   */
  url: string;

  /**
   * constructor
   * @param httpClient
   */
  constructor(
    /**
     * http client from angular
     */
    private httpClient: HttpClient,
  ) {
    this.url = environment.baseUrl;
  }

  /**
   * Format data to match table need
   * @param data
   * @returns
   */
  formatData(data: any[]) {
    return data.map(item => ({
      data: {
        ...item,
        id: `colnago-nft_${item._id}`,
        'asset serial number': item.assetSerialNumber,
        status: item.status.replace(/_/g, ' '),
      },
    }));
  }

  /**
   * Get nft data paginated
   * @param page
   * @param pageSize
   * @returns
   */
  get(page: number = 1, pageSize = 5): Promise<PaginatedResponse<Nft>> {
    return new Promise((resolve) => {
      this.httpClient.get<PaginatedResponse<Nft>>(this.url + '/nfts', {
        params: {
          page,
          pageSize,
        },
      }).subscribe(res => {
        resolve(res);
      });
    });
  }

  /**
   * Search nft by filters
   * @param {NftSearchFilters} filters
   * @returns
   */
  search(filters: NftSearchFilters): Promise<PaginatedResponse<Nft>> {
    const params: any = {};
    if (filters.status) {
      if (!filters.status.includes('all')) {
        params.status = filters.status;
      }
    }
    if (filters.dateFrom) {
      params.dateFrom = moment(filters.dateFrom).unix();
    }
    if (filters.dateTo) {
      params.dateTo = moment(filters.dateTo).unix();
    }
    if (filters.page) {
      params.page = filters.page;
    }
    if (filters.pageSize) {
      params.pageSize = filters.pageSize;
    }
    if (filters.ucc) {
      params.ucc = filters.ucc;
    }
    if (filters.working) {
      params.working = filters.working;
    }
    if (filters.assetSerialNumber) {
      params.assetSerialNumber = filters.assetSerialNumber;
    }
    return new Promise((resolve) => {
      this.httpClient.get<PaginatedResponse<Nft>>(this.url + '/nfts/search', {
        params,
      })
        .subscribe(res => resolve(res));
    });
  }
}
