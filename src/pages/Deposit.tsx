import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { ArrowLeft, Copy, CheckCircle2, Clock, QrCode } from 'lucide-react';
import { toast } from 'sonner';

const depositAmounts = [300, 500, 1000, 2000, 5000, 10000];

type Step = 'amount' | 'qr' | 'confirm';

const Deposit = () => {
  const navigate = useNavigate();
  const { balance, deposit } = useAppStore();
  const [step, setStep] = useState<Step>('amount');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [txnId, setTxnId] = useState('');

  const selectedAmount = Number(amount) || Number(customAmount);

  const handleSelectAmount = (val: number) => {
    setAmount(String(val));
    setCustomAmount('');
  };

  const handleProceed = () => {
    if (selectedAmount < 100) {
      toast.error('Minimum deposit is ₹100');
      return;
    }
    setStep('qr');
  };

  const handlePaymentDone = () => {
    const id = 'TXN' + Date.now().toString().slice(-10) + Math.floor(Math.random() * 1000);
    setTxnId(id);
    deposit(selectedAmount);
    setStep('confirm');
  };

  const upiId = '8209173882@ybl';

  if (step === 'confirm') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={48} className="text-rummy-green" />
          </div>
          <h2 className="text-xl font-black text-foreground">Deposit Successful!</h2>
          <p className="mt-2 text-sm text-muted-foreground">Your wallet has been credited</p>

          <div className="mt-6 rounded-2xl bg-card p-5 shadow-sm space-y-3 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-bold text-rummy-green">₹{selectedAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-semibold text-foreground text-xs">{txnId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-bold text-rummy-green">✅ Completed</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">New Balance</span>
              <span className="font-black text-foreground">₹{balance.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-6 w-full rounded-xl py-3.5 text-sm font-bold text-primary-foreground gradient-green shadow-md"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/order')}
            className="mt-2 w-full rounded-xl bg-card py-3.5 text-sm font-bold text-foreground shadow-sm"
          >
            Buy Packages
          </button>
        </div>
      </div>
    );
  }

  if (step === 'qr') {
    return (
      <div className="flex flex-col">
        <div className="gradient-header px-5 pb-6 pt-10">
          <button onClick={() => setStep('amount')} className="mb-2 flex items-center gap-1 text-sm text-primary-foreground/80">
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-xl font-black text-primary-foreground">Complete Payment</h1>
        </div>

        <div className="px-4 -mt-3 space-y-4">
          <div className="rounded-2xl bg-card p-5 shadow-md text-center">
            <p className="text-xs text-muted-foreground">Pay exactly</p>
            <p className="mt-1 text-3xl font-black text-rummy-green">₹{selectedAmount}</p>
          </div>

          {/* QR Code Simulation */}
          <div className="rounded-2xl bg-card p-6 shadow-sm flex flex-col items-center">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted">
              <QrCode size={100} className="text-foreground/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-lg bg-card px-3 py-1.5 shadow-sm">
                  <p className="text-xs font-bold text-rummy-green">Scan to Pay</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Scan QR with any UPI app</p>
          </div>

          {/* UPI ID */}
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground mb-2">Or pay to UPI ID</p>
            <div className="flex items-center justify-between rounded-xl bg-muted px-3 py-2.5">
              <span className="text-sm font-bold text-foreground">{upiId}</span>
              <button
                onClick={() => { navigator.clipboard.writeText(upiId); toast.success('UPI ID copied!'); }}
                className="text-rummy-green"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* Timer hint */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Clock size={14} />
            <span>Complete payment within 15 minutes</span>
          </div>

          <button
            onClick={handlePaymentDone}
            className="w-full rounded-xl py-3.5 text-sm font-bold text-primary-foreground gradient-green shadow-md"
          >
            I've Made the Payment ✅
          </button>

          <button
            onClick={() => setStep('amount')}
            className="w-full rounded-xl bg-card py-3 text-sm font-semibold text-muted-foreground shadow-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="gradient-header px-5 pb-6 pt-10">
        <button onClick={() => navigate(-1)} className="mb-2 flex items-center gap-1 text-sm text-primary-foreground/80">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-xl font-black text-primary-foreground">Deposit</h1>
        <p className="text-xs text-primary-foreground/70 mt-1">Current Balance: ₹{balance.toFixed(2)}</p>
      </div>

      <div className="px-4 -mt-3 space-y-4">
        {/* Quick amounts */}
        <div className="rounded-2xl bg-card p-4 shadow-md">
          <p className="text-sm font-bold text-foreground mb-3">Select Amount</p>
          <div className="grid grid-cols-3 gap-2">
            {depositAmounts.map((val) => (
              <button
                key={val}
                onClick={() => handleSelectAmount(val)}
                className={`rounded-xl py-3 text-sm font-bold transition-all ${
                  Number(amount) === val
                    ? 'gradient-green text-primary-foreground shadow-md'
                    : 'bg-muted text-foreground'
                }`}
              >
                ₹{val}
              </button>
            ))}
          </div>
        </div>

        {/* Custom amount */}
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <label className="mb-1.5 block text-xs font-semibold text-foreground">Or enter custom amount</label>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setAmount(''); }}
            placeholder="₹ Enter amount (min ₹100)"
            className="w-full rounded-xl border border-border bg-muted px-3 py-3 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>

        {selectedAmount >= 100 && (
          <div className="rounded-2xl bg-green-50 p-3 text-center">
            <p className="text-sm text-rummy-green font-bold">₹{selectedAmount} will be added to your wallet</p>
          </div>
        )}

        <button
          onClick={handleProceed}
          disabled={selectedAmount < 100}
          className="w-full rounded-xl py-3.5 text-sm font-bold text-primary-foreground gradient-green shadow-md disabled:opacity-40"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Deposit;
