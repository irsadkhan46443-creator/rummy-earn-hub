import { useAppStore } from '@/store/useAppStore';
import { Copy, Crown } from 'lucide-react';
import { toast } from 'sonner';

const Team = () => {
  const { inviteCode, commissionTotal, totalProfit, teamCommissionToday, teamCommissionYesterday, teamA, teamB, teamC } = useAppStore();
  const inviteLink = `https://rummypay.lovable.app/register?invite=${inviteCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const stats = [
    { label: 'Total Commission', value: `₹${commissionTotal.toFixed(2)}` },
    { label: 'My Total Profit', value: `₹${totalProfit.toFixed(2)}` },
    { label: 'Yesterday Commission', value: `₹${teamCommissionYesterday.toFixed(2)}` },
    { label: 'Today Commission', value: `₹${teamCommissionToday.toFixed(2)}` },
  ];

  const levels = [
    { name: 'Level A', rate: 'Buy × 9%', color: 'bg-green-100 border-rummy-green', text: 'text-rummy-green', count: teamA },
    { name: 'Level B', rate: 'Buy × 6%', color: 'bg-blue-100 border-blue-400', text: 'text-blue-500', count: teamB },
    { name: 'Level C', rate: 'Buy × 3%', color: 'bg-amber-100 border-rummy-yellow', text: 'text-rummy-yellow', count: teamC },
  ];

  return (
    <div className="flex flex-col">
      <div className="gradient-header px-5 pb-8 pt-10">
        <div className="flex items-center gap-2">
          <Crown size={22} className="text-primary-foreground" />
          <h1 className="text-xl font-black text-primary-foreground">Invite & Earn</h1>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-card p-3 shadow-sm">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-lg font-black text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Invite Section */}
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <p className="text-sm font-bold text-foreground">📩 Invitation Link</p>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-muted px-3 py-2.5">
            <span className="text-sm font-semibold text-foreground">{inviteCode}</span>
            <button onClick={() => copyToClipboard(inviteCode)} className="text-rummy-green">
              <Copy size={16} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-muted px-3 py-2.5">
            <span className="truncate text-xs text-muted-foreground">{inviteLink}</span>
            <button onClick={() => copyToClipboard(inviteLink)} className="ml-2 text-rummy-green">
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Commission Levels */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-foreground">💰 Commission Levels</p>
          {levels.map((l) => (
            <div key={l.name} className={`flex items-center justify-between rounded-2xl border-l-4 ${l.color} bg-card p-4 shadow-sm`}>
              <div>
                <p className={`text-sm font-bold ${l.text}`}>{l.name}</p>
                <p className="text-xs text-muted-foreground">{l.rate}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-foreground">{l.count}</p>
                <p className="text-xs text-muted-foreground">members</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
