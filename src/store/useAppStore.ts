import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Order {
  id: string;
  orderNo: string;
  amount: number;
  reward: number;
  bonus: number;
  total: number;
  date: string;
  type: 'UPI' | 'USDT';
}

interface AppState {
  isLoggedIn: boolean;
  phone: string;
  userId: string;
  inviteCode: string;
  balance: number;
  depositTotal: number;
  withdrawTotal: number;
  commissionTotal: number;
  orders: Order[];
  totalOrders: number;
  teamA: number;
  teamB: number;
  teamC: number;
  teamCommissionToday: number;
  teamCommissionYesterday: number;
  totalProfit: number;
  upiId: string;
  
  login: (phone: string) => void;
  logout: () => void;
  buyPackage: (amount: number) => void;
  setUpiId: (upi: string) => void;
  withdraw: (amount: number) => void;
  deposit: (amount: number) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 8).toUpperCase();
const generateOrderNo = () => 'No:' + Array.from({ length: 18 }, () => Math.floor(Math.random() * 10)).join('');

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      phone: '',
      userId: '',
      inviteCode: '',
      balance: 200,
      depositTotal: 0,
      withdrawTotal: 0,
      commissionTotal: 0,
      orders: [],
      totalOrders: 0,
      teamA: 0,
      teamB: 0,
      teamC: 0,
      teamCommissionToday: 0,
      teamCommissionYesterday: 0,
      totalProfit: 0,
      upiId: '',

      login: (phone: string) => {
        const masked = phone.substring(0, 3) + '***' + phone.substring(phone.length - 3);
        set({
          isLoggedIn: true,
          phone: masked,
          userId: generateId(),
          inviteCode: generateId(),
        });
      },

      logout: () => set({
        isLoggedIn: false,
        phone: '',
        userId: '',
        inviteCode: '',
        balance: 200,
        depositTotal: 0,
        withdrawTotal: 0,
        commissionTotal: 0,
        orders: [],
        totalOrders: 0,
        upiId: '',
      }),

      buyPackage: (amount: number) => {
        const reward = Math.round(amount * 0.09 * 100) / 100;
        const bonus = Math.round(amount * 0.15 * 100) / 100;
        const total = amount + reward + bonus;
        const order: Order = {
          id: generateId(),
          orderNo: generateOrderNo(),
          amount,
          reward,
          bonus,
          total,
          date: new Date().toISOString(),
          type: 'UPI',
        };
        set(s => ({
          orders: [order, ...s.orders],
          totalOrders: s.totalOrders + 1,
          balance: Math.round((s.balance + reward + bonus) * 100) / 100,
          commissionTotal: Math.round((s.commissionTotal + reward) * 100) / 100,
          totalProfit: Math.round((s.totalProfit + reward + bonus) * 100) / 100,
        }));
        return order;
      },

      setUpiId: (upi: string) => set({ upiId: upi }),

      withdraw: (amount: number) => {
        const s = get();
        if (amount > s.balance || amount < 300) return;
        set({
          balance: Math.round((s.balance - amount) * 100) / 100,
          withdrawTotal: Math.round((s.withdrawTotal + amount) * 100) / 100,
        });
      },

      deposit: (amount: number) => {
        set(s => ({
          balance: Math.round((s.balance + amount) * 100) / 100,
          depositTotal: Math.round((s.depositTotal + amount) * 100) / 100,
        }));
      },
    }),
    { name: 'rummy-pay-store' }
  )
);
