export enum TransactionStatus {
  CREATED = 'created',
  WAITING_FOR_REVIEW = 'waiting_for_review',
  PENDING = 'pending',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
  CONFIRMED = 'confirmed',
  WRITING = 'writing',
  WRITTEN = 'written',
  // DELETED = 'deleted',
  WRITTEN_ON_DYNAMICS = 'written_on_dynamics',
  // errore su sistema Dynamics
  ERROR_DY = 'error_dy',
  // errore scrittura blockchain
  ERROR_BC = 'error_bc',
  // errore scheda produzione non trovata
  ERROR_SP = 'error_sp',
  ERROR_TAG = 'error_tag',
  CLOSED = 'closed',
}
