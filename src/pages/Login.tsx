import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Phone, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const login = useAppStore((s) => s.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const sendOtp = async () => {
    if (phone.length < 10 || loading) return;
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('send-otp', { body: { phone } });
    setLoading(false);
    if (error || !data?.ok) {
      toast({ title: 'Could not send the code', description: 'Please check the number and try again.', variant: 'destructive' });
      return;
    }
    setStep('otp');
    setSeconds(30);
    toast({ title: 'Code sent', description: `We sent a 6-digit code to +91 ${phone}` });
  };

  const verifyOtp = async () => {
    if (code.length < 4 || loading) return;
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('verify-otp', { body: { phone, code } });
    setLoading(false);
    if (error || !data?.approved) {
      toast({ title: 'Wrong code', description: 'Please enter the code again.', variant: 'destructive' });
      return;
    }
    login(phone);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl gradient-header shadow-lg">
            <span className="text-3xl font-black text-primary-foreground">RP</span>
          </div>
          <h1 className="text-2xl font-black text-foreground">Rummy Pay</h1>
          <p className="mt-1 text-sm text-muted-foreground">Trade USDT/INR &amp; Earn Rewards</p>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-lg">
          {step === 'phone' ? (
            <>
              <label className="mb-2 block text-sm font-semibold text-foreground">Phone Number</label>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-3">
                <Phone size={18} className="text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>

              <button
                onClick={sendOtp}
                disabled={phone.length < 10 || loading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-primary-foreground gradient-green shadow-md transition-opacity disabled:opacity-40"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                Send OTP <ArrowRight size={16} />
              </button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                By logging in, you agree to our Terms &amp; Conditions
              </p>
            </>
          ) : (
            <>
              <label className="mb-2 block text-sm font-semibold text-foreground">Enter OTP</label>
              <p className="mb-3 text-xs text-muted-foreground">Sent to +91 {phone}</p>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-3">
                <ShieldCheck size={18} className="text-muted-foreground" />
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="6-digit code"
                  className="flex-1 bg-transparent text-base font-bold tracking-[0.4em] text-foreground outline-none placeholder:text-sm placeholder:font-medium placeholder:tracking-normal placeholder:text-muted-foreground"
                />
              </div>

              <button
                onClick={verifyOtp}
                disabled={code.length < 4 || loading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-primary-foreground gradient-green shadow-md transition-opacity disabled:opacity-40"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                Verify &amp; Login <ArrowRight size={16} />
              </button>

              <div className="mt-4 flex items-center justify-between text-xs">
                <button
                  onClick={() => { setStep('phone'); setCode(''); }}
                  className="font-semibold text-muted-foreground"
                >
                  Change number
                </button>
                <button
                  onClick={sendOtp}
                  disabled={seconds > 0 || loading}
                  className="font-semibold text-primary disabled:text-muted-foreground"
                >
                  {seconds > 0 ? `Resend in ${seconds}s` : 'Resend OTP'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
