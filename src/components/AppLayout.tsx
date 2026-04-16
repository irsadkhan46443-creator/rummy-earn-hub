import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const AppLayout = () => {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-20">
      <Outlet />
      <BottomNav />
      <div className="fixed bottom-16 right-2 z-40 rounded-full bg-card px-2 py-1 text-[10px] font-medium text-muted-foreground shadow-md">
        Edit with ❤️ Lovable
      </div>
    </div>
  );
};

export default AppLayout;
