import { NftStatus } from '../enum/nft-status.enum';
export class NftHelper {

  /**
   * get NFT working statuses
   * @returns NFT working statuses
   */
  public static getWorkingStatuses() {
    return [
      NftStatus.OPEN,
      NftStatus.CREATED,
      NftStatus.DOWNLOADED,
      NftStatus.CONFIRMED,
      NftStatus.WAITING_FOR_REVIEW,
      NftStatus.READY_TO_WRITE,
      NftStatus.ACCEPTED,
      NftStatus.WRITING
    ]
  }
}