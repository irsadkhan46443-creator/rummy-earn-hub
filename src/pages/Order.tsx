import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MERCHANT_NAME, MERCHANT_UPI_ID, openUpiApp } from '@/lib/upi';

const packages = [
  { price: 300, reward: 27, bonus: 45 },
  { price: 450, reward: 40.5, bonus: 68 },
  { price: 600, reward: 54, bonus: 90 },
  { price: 800, reward: 72, bonus: 120 },
  { price: 1000, reward: 90, bonus: 150 },
  { price: 1300, reward: 117, bonus: 195 },
];

type Pkg = (typeof packages)[number];

const Order = () => {
  const [tab, setTab] = useState<'UPI' | 'USDT'>('UPI');
  const [selected, setSelected] = useState<Pkg | null>(null);
  const [paying, setPaying] = useState(false);
  const buyPackage = useAppStore((s) => s.buyPackage);

  const handleBuy = (pkg: Pkg) => {
    if (tab === 'USDT') {
      const result = (buyPackage as any)(pkg.price);
      toast.success(`Order Placed! ${result?.orderNo || 'Success'}`, {
        description: `₹${pkg.price} package purchased. Reward + Bonus added to wallet!`,
      });
      return;
    }
    setSelected(pkg);
  };

  const handlePayNow = async () => {
    if (!selected) return;
    const amount = selected.price; // exact payable amount from the selected order
    setPaying(true);
    const opened = await openUpiApp(amount, `Order ${MERCHANT_NAME} ₹${amount}`);
    setPaying(false);
    if (opened) {
      toast.info('Complete the payment in your UPI app', {
        description: 'Your order stays pending until the payment is confirmed.',
      });
    } else {
      toast.error('No UPI app found', {
        description: `Open this page on your Android phone, or pay manually to ${MERCHANT_UPI_ID}.`,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="gradient-header px-5 pb-6 pt-10">
        <h1 className="text-xl font-black text-primary-foreground">Buy Packages</h1>
      </div>

      {/* Cashback Banner */}
      <div className="mx-4 -mt-3 rounded-2xl bg-card p-4 shadow-md">
        <p className="text-center text-sm font-bold text-foreground">
          🎉 Cashback <span className="text-rummy-green">9%</span> on Every Order! 🎁
        </p>
      </div>

      {/* Tabs */}
      <div className="mx-4 mt-4 flex gap-2">
        {(['UPI', 'USDT'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
              tab === t
                ? 'gradient-green text-primary-foreground shadow-md'
                : 'bg-card text-muted-foreground shadow-sm'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Packages */}
      <div className="mt-4 space-y-3 px-4 pb-4">
        {packages.map((pkg) => (
          <div key={pkg.price} className="rounded-2xl bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-black text-foreground">₹{pkg.price}</p>
                <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                  <p>Reward 9%: <span className="font-semibold text-rummy-green">₹{pkg.reward}</span></p>
                  <p>Bonus: <span className="font-semibold text-rummy-yellow">₹{pkg.bonus}</span></p>
                  <p className="font-bold text-foreground">
                    Total: ₹{(pkg.price + pkg.reward + pkg.bonus).toFixed(1)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleBuy(pkg)}
                className="rounded-xl px-6 py-2.5 text-sm font-bold text-primary-foreground gradient-green shadow-md"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
