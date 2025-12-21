import { create } from 'zustand';

import { createFeature01Slice } from '@/features/feature01/slice';
import { createHistorySlice } from '@/features/wallet-connection/slices/historySlice';
import { createNetworkSlice } from '@/features/wallet-connection/slices/networkSlice';
import { createProfileSlice } from '@/features/wallet-connection/slices/profileSlice';
import { createBalanceSlice } from '@/features/wallet-connection/slices/balanceSlice';
import { createErrorSlice } from '@/features/wallet-connection/slices/errorSlice';
import { createMintSlice } from '@/features/wallet-connection/slices/mintSlice';
import { createTransferSlice } from '@/features/wallet-connection/slices/transferSlice';
import { createApproveSlice } from '@/features/wallet-connection/slices/approveSlice';

import { AppState } from '@/store/types';

export function createStore() {
  return create<AppState>()((...a) => ({
    ...createFeature01Slice(...a),
    ...createHistorySlice(...a),
    ...createNetworkSlice(...a),
    ...createProfileSlice(...a),
    ...createBalanceSlice(...a),
    ...createErrorSlice(...a),
    ...createMintSlice(...a),
    ...createTransferSlice(...a),
    ...createApproveSlice(...a),
  }));
}
