import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// --- TYPES ---
export type BatchStatus = 'Pending' | 'Certified' | 'Rejected' | 'Sold';

export interface Batch {
  id: string;
  producer: string; // Wallet address
  volume: number;
  energySource: string;
  proof: string; // Mock proof document (e.g., a filename)
  status: BatchStatus;
  price?: number; // Set by Certifier
  buyer?: string; // Wallet address
}

export interface UserData {
  ghcBalance: number;
  totalSpent: number;
  purchaseHistory: Batch[];
  totalRevenue: number;
  batchesSold: number;
}

interface AppState {
  batches: Batch[];
  userData: { [wallet: string]: UserData };
  registerNewBatch: (batchData: Omit<Batch, 'id' | 'status'>) => void;
  updateBatchStatus: (batchId: string, status: BatchStatus, price?: number) => void;
  purchaseBatch: (batchId: string, buyerWallet: string) => void;
  getBatchesByStatus: (status: BatchStatus) => Batch[];
  getBatchesForProducer: (wallet: string) => Batch[];
  getUserData: (wallet: string) => UserData;
}

// --- INITIAL MOCK DATA ---
const MOCK_PRODUCER_WALLET = '0xProducerWalletAddress';
const MOCK_BUYER_WALLET = '0xBuyerWalletAddress';

const initialBatches: Batch[] = [
  {
    id: `BATCH-${Date.now() - 20000}`,
    producer: MOCK_PRODUCER_WALLET,
    volume: 5000,
    energySource: 'Solar',
    proof: 'proof-solar-1.pdf',
    status: 'Sold',
    price: 3.5,
    buyer: MOCK_BUYER_WALLET,
  },
  {
    id: `BATCH-${Date.now() - 10000}`,
    producer: MOCK_PRODUCER_WALLET,
    volume: 3000,
    energySource: 'Wind',
    proof: 'proof-wind-1.pdf',
    status: 'Certified',
    price: 4.1,
  },
  {
    id: `BATCH-${Date.now() - 5000}`,
    producer: '0xAnotherProducer',
    volume: 8000,
    energySource: 'Hydro',
    proof: 'proof-hydro-1.pdf',
    status: 'Pending',
  },
];

const initialUserData: { [wallet: string]: UserData } = {
  [MOCK_PRODUCER_WALLET]: {
    ghcBalance: 0,
    totalSpent: 0,
    purchaseHistory: [],
    totalRevenue: 5000 * 3.5,
    batchesSold: 1,
  },
  [MOCK_BUYER_WALLET]: {
    ghcBalance: 5000,
    totalSpent: 5000 * 3.5,
    purchaseHistory: [initialBatches[0]],
    totalRevenue: 0,
    batchesSold: 0,
  },
};

// --- ZUSTAND STORE ---
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      batches: initialBatches,
      userData: initialUserData,

      getUserData: (wallet: string) => {
        const users = get().userData;
        return (
          users[wallet] || {
            ghcBalance: 0,
            totalSpent: 0,
            purchaseHistory: [],
            totalRevenue: 0,
            batchesSold: 0,
          }
        );
      },

      getBatchesByStatus: (status: BatchStatus) => {
        return get().batches.filter((batch) => batch.status === status);
      },

      getBatchesForProducer: (wallet: string) => {
        return get().batches.filter((batch) => batch.producer === wallet);
      },

      registerNewBatch: (batchData) => {
        const newBatch: Batch = {
          ...batchData,
          id: `BATCH-${Date.now()}`,
          status: 'Pending',
        };
        set((state) => ({ batches: [newBatch, ...state.batches] }));
      },

      updateBatchStatus: (batchId, status, price) => {
        set((state) => ({
          batches: state.batches.map((batch) =>
            batch.id === batchId
              ? { ...batch, status, price: price !== undefined ? price : batch.price }
              : batch
          ),
        }));
      },

      purchaseBatch: (batchId, buyerWallet) => {
        const batchToBuy = get().batches.find((b) => b.id === batchId);
        if (!batchToBuy || batchToBuy.status !== 'Certified' || !batchToBuy.price) return;

        set((state) => {
          const producerWallet = batchToBuy.producer;

          // Update batch status
          const updatedBatches = state.batches.map((batch) =>
            batch.id === batchId ? { ...batch, status: 'Sold', buyer: buyerWallet } : batch
          );

          // Update buyer data
          const buyerData = state.userData[buyerWallet] || {
            ghcBalance: 0,
            totalSpent: 0,
            purchaseHistory: [],
            totalRevenue: 0,
            batchesSold: 0,
          };
          const updatedBuyerData = {
            ...buyerData,
            ghcBalance: buyerData.ghcBalance + batchToBuy.volume,
            totalSpent: buyerData.totalSpent + batchToBuy.volume * batchToBuy.price!,
            purchaseHistory: [batchToBuy, ...buyerData.purchaseHistory],
          };

          // Update producer data
          const producerData = state.userData[producerWallet] || {
            ghcBalance: 0,
            totalSpent: 0,
            purchaseHistory: [],
            totalRevenue: 0,
            batchesSold: 0,
          };
          const updatedProducerData = {
            ...producerData,
            totalRevenue: producerData.totalRevenue + batchToBuy.volume * batchToBuy.price!,
            batchesSold: producerData.batchesSold + 1,
          };

          return {
            batches: updatedBatches,
            userData: {
              ...state.userData,
              [buyerWallet]: updatedBuyerData,
              [producerWallet]: updatedProducerData,
            },
          };
        });
      },
    }),
    {
      name: 'green-hydrogen-ledger-storage', // unique name
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);