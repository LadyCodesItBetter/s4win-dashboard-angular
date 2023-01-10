import { NftStatus } from "./nft-status.enum";

export interface Nft {
  assetSerialNumber: string,
  rawData: string,
  ucc: number,
  status: NftStatus,
  originalImageUrl: string,
  attributes: any[],
  blockchainHash?: string
}