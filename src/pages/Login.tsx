import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { Phone, ArrowRight } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const login = useAppStore((s) => s.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (phone.length >= 10) {
      login(phone);
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl gradient-header shadow-lg">
            <span className="text-3xl font-black text-primary-foreground">RP</span>
          </div>
          <h1 className="text-2xl font-black text-foreground">Rummy Pay</h1>
          <p className="mt-1 text-sm text-muted-foreground">Trade USDT/INR & Earn Rewards</p>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-lg">
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
            onClick={handleLogin}
            disabled={phone.length < 10}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-primary-foreground gradient-green shadow-md transition-opacity disabled:opacity-40"
          >
            Login <ArrowRight size={16} />
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By logging in, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
