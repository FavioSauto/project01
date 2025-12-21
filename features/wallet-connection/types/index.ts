export interface TransactionState {
  loading: boolean;
  error: string | null;
  success: boolean;
  txHash: string | null;
}
