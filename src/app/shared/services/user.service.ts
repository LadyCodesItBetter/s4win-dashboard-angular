import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';

/**
 * Interface for Nft search filters
 */
// export interface NftSearchFilters {
//   /**
//    * status
//    */
//   status?: (NftStatus | 'all')[];
//   /**
//    * date from
//    */
//   dateFrom?: Date | null;
//   /**
//    * date to
//    */
//   dateTo?: Date | null;
//   /**
//    * page
//    */
//   page?: number;
//   /**
//    * page size
//    */
//   pageSize?: number;
//   /**
//    * ucc web configurator
//    */
//   ucc?: string;
//   /**
//    * working asset. if true the backend ignore the status above and set a bunch of statuses
//    */
//   working?: boolean;
//   /**
//    * asset serial number of the associated bike
//    */
//   assetSerialNumber?: string;
// }

/**
 * User Service
 */
@Injectable()
export class UserService {
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
   * Get current logged user
   * @returns User
   */
  getCurrentUser(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get(this.url + '/auth/me')
        .subscribe(res => resolve(res));
    });
  }

  /**
   * Get current logged user
   * @returns User
   */
  saveSettings(body): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.patch(this.url + '/auth/me', body)
        .subscribe(res => resolve(res));
    });
  }
}
