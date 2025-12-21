import { Feature01Slice } from '@/features/feature01/types';
import { ApproveSlice } from '@/features/wallet-connection/slices/approveSlice';
import { BalanceSlice } from '@/features/wallet-connection/slices/balanceSlice';
import { ErrorSlice } from '@/features/wallet-connection/slices/errorSlice';
import { HistorySlice } from '@/features/wallet-connection/slices/historySlice';
import { MintSlice } from '@/features/wallet-connection/slices/mintSlice';
import { TransferSlice } from '@/features/wallet-connection/slices/transferSlice';
import { ProfileSlice } from '@/features/wallet-connection/slices/profileSlice';
import { NetworkSlice } from '@/features/wallet-connection/slices/networkSlice';

export type AppState = Feature01Slice &
  ProfileSlice &
  BalanceSlice &
  HistorySlice &
  NetworkSlice &
  ErrorSlice &
  MintSlice &
  TransferSlice &
  ApproveSlice;
