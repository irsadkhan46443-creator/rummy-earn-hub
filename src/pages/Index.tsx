import { useAppStore } from '@/store/useAppStore';
import { Wallet, ClipboardList, Users, LayoutList, Headphones, Send, ArrowUpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { phone, userId, balance } = useAppStore();
  const navigate = useNavigate();

  const quickActions = [
    { icon: Wallet, label: 'Deposit', color: 'bg-green-100 text-rummy-green', path: '/order' },
    { icon: ClipboardList, label: 'Task', color: 'bg-orange-100 text-orange-500', path: '/order' },
    { icon: Users, label: 'Team', color: 'bg-blue-100 text-blue-500', path: '/team' },
    { icon: LayoutList, label: 'Order', color: 'bg-purple-100 text-purple-500', path: '/order' },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="gradient-header px-5 pb-8 pt-10 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">Hello, {phone} 👋</p>
            <p className="text-xs opacity-70">User ID: {userId}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20">
            <span className="text-lg">🔔</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Balance Card */}
        <div className="rounded-2xl gradient-green p-5 text-primary-foreground shadow-lg">
          <p className="text-xs font-medium opacity-80">Total Balance</p>
          <p className="mt-1 text-3xl font-black">₹{balance.toFixed(2)}</p>
          <button
            onClick={() => navigate('/order')}
            className="mt-3 rounded-xl bg-primary-foreground/20 px-6 py-2 text-sm font-bold backdrop-blur-sm"
          >
            Deposit
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => navigate(a.path)}
              className="flex flex-col items-center gap-2 rounded-2xl bg-card p-3 shadow-sm"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.color}`}>
                <a.icon size={20} />
              </div>
              <span className="text-xs font-semibold text-foreground">{a.label}</span>
            </button>
          ))}
        </div>

        {/* Current Rate */}
        <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">💱</span>
            <span className="text-sm font-bold text-foreground">Current Rate</span>
          </div>
          <span className="text-sm font-black text-rummy-green">1 USDT = ₹105</span>
        </div>

        {/* Service Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-card py-3 text-sm font-semibold text-foreground shadow-sm">
            <Headphones size={16} className="text-rummy-green" /> Customer Service
          </button>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-card py-3 text-sm font-semibold text-foreground shadow-sm">
            <Send size={16} className="text-rummy-yellow" /> Official Channel
          </button>
        </div>

        {/* Newbie Task */}
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h3 className="text-sm font-bold text-foreground">🎯 Newbie Task</h3>
          <p className="mt-2 text-xs text-muted-foreground">No top-up orders yet</p>
          <button
            onClick={() => navigate('/order')}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-primary-foreground gradient-green shadow-md"
          >
            <ArrowUpCircle size={16} /> Top up now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
