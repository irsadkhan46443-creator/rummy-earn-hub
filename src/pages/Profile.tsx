import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { Wallet, FileText, Landmark, CircleDollarSign, Headphones, LogOut } from 'lucide-react';

const Profile = () => {
  const { userId, phone, depositTotal, withdrawTotal, commissionTotal, totalOrders, logout } = useAppStore();
  const navigate = useNavigate();

  const topCards = [
    { label: 'Deposit', value: `₹${depositTotal.toFixed(0)}`, icon: '💰' },
    { label: 'Withdraw', value: `₹${withdrawTotal.toFixed(0)}`, icon: '💸' },
    { label: 'Commission', value: `₹${commissionTotal.toFixed(0)}`, icon: '🎁' },
  ];

  const menuItems = [
    { icon: Wallet, label: 'Wallet', path: '/withdrawal' },
    { icon: FileText, label: 'Order History', path: '/order' },
    { icon: Landmark, label: 'Bank Details', path: '/withdrawal' },
    { icon: CircleDollarSign, label: 'USDT Deposit', path: '/order' },
    { icon: Headphones, label: 'Service', path: '/' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col">
      <div className="gradient-header px-5 pb-8 pt-10">
        <h1 className="text-xl font-black text-primary-foreground">My Assets</h1>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Top Cards */}
        <div className="grid grid-cols-3 gap-3">
          {topCards.map((c) => (
            <div key={c.label} className="rounded-2xl bg-card p-3 text-center shadow-sm">
              <span className="text-2xl">{c.icon}</span>
              <p className="mt-1 text-lg font-black text-foreground">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>

        {/* User Details */}
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-semibold text-foreground">{userId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-semibold text-foreground">{phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Orders</span>
              <span className="font-semibold text-foreground">{totalOrders}</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="rounded-2xl bg-card shadow-sm">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-sm font-semibold text-foreground ${
                i < menuItems.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <item.icon size={18} className="text-rummy-green" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-destructive py-3.5 text-sm font-bold text-destructive-foreground shadow-md"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
