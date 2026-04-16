import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';

const Withdrawal = () => {
  const { balance, upiId, setUpiId, withdraw } = useAppStore();
  const [tab, setTab] = useState<'UPI' | 'Bank'>('UPI');
  const [amount, setAmount] = useState('');
  const [localUpi, setLocalUpi] = useState(upiId);

  const handleSubmit = () => {
    const amt = Number(amount);
    if (amt < 300) {
      toast.error('Minimum withdrawal is ₹300');
      return;
    }
    if (amt > balance) {
      toast.error('Insufficient balance');
      return;
    }
    if (!localUpi.includes('@')) {
      toast.error('Enter a valid UPI ID');
      return;
    }
    setUpiId(localUpi);
    withdraw(amt);
    setAmount('');
    toast.success(`Withdrawal of ₹${amt} submitted!`);
  };

  return (
    <div className="flex flex-col">
      <div className="gradient-header px-5 pb-6 pt-10">
        <h1 className="text-xl font-black text-primary-foreground">Withdrawal</h1>
      </div>

      <div className="px-4 -mt-3 space-y-4">
        <div className="rounded-2xl bg-card p-4 shadow-sm text-center">
          <p className="text-xs text-muted-foreground">Available Balance</p>
          <p className="mt-1 text-2xl font-black text-rummy-green">₹{balance.toFixed(2)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Minimum withdrawal: ₹300</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['UPI', 'Bank'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
                tab === t
                  ? 'gradient-green text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground shadow-sm'
              }`}
            >
              {t === 'Bank' ? 'Bank Account' : t}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-card p-4 shadow-sm space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-foreground">
              {tab === 'UPI' ? 'UPI ID' : 'Account Number'}
            </label>
            <input
              value={localUpi}
              onChange={(e) => setLocalUpi(e.target.value)}
              placeholder={tab === 'UPI' ? 'name@upi' : 'Enter account number'}
              className="w-full rounded-xl border border-border bg-muted px-3 py-3 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-foreground">Amount (min ₹300)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full rounded-xl border border-border bg-muted px-3 py-3 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full rounded-xl py-3.5 text-sm font-bold text-primary-foreground gradient-green shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
