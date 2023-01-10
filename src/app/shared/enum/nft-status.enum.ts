export enum NftStatus {
  OPEN = 'open',
  DOWNLOADED = 'downloaded', // image downloaded
  READY = 'ready',  // written on ipfs
  CREATED = 'created',
  WAITING_FOR_REVIEW = 'waiting_for_review', //visible for manager
  READY_TO_WRITE = 'ready_to_write', // manager can handle nft
  ACCEPTED = 'accepted', // sent to mylime
  CONFIRMED = 'confirmed', // signed from manager and arrived to mylime
  WRITING = 'writing',
  WRITTEN = 'written',
  // error statuses
  ERROR_IPFS = 'error_ipfs',
  ERROR_WFS = 'error_wfs', // db error or redis error
  ERROR_SFS = 'error_sfs', // error by mylime
  ERROR_MYL = 'error_myl',
  ERROR_BC = 'error_bc' // error bc writing
}