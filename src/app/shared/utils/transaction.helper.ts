import {TransactionStatus } from '../enum/transaction-status.enum';
export class TransactionHelper {

  /**
   * Get transaction's working statuses
   * @returns Transaction's working statuses
   */
  public static getWorkingStatuses() {
    return [
      TransactionStatus.CREATED,
      TransactionStatus.ACCEPTED,
      TransactionStatus.WAITING_FOR_REVIEW,
      TransactionStatus.PENDING,
      TransactionStatus.REJECTED,
      TransactionStatus.CONFIRMED,
      TransactionStatus.WRITING,
      TransactionStatus.WRITTEN,
    ]
  }
}