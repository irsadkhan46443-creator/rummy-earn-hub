import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, CheckCircle2, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) setIsInstalled(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsInstalled(true);
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={48} className="text-rummy-green" />
          </div>
          <h1 className="text-xl font-black text-foreground">App Installed! 🎉</h1>
          <p className="mt-2 text-sm text-muted-foreground">Rummy Pay is on your home screen</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 w-full rounded-xl py-3.5 text-sm font-bold text-primary-foreground gradient-green shadow-md"
          >
            Open App
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl gradient-header shadow-lg">
          <span className="text-3xl font-black text-primary-foreground">RP</span>
        </div>
        <h1 className="text-xl font-black text-foreground">Install Rummy Pay</h1>
        <p className="mt-2 text-sm text-muted-foreground">Get the full app experience on your phone</p>

        <div className="mt-6 space-y-3 text-left">
          {[
            { icon: Smartphone, text: 'Works like a real app on your phone' },
            { icon: Download, text: 'No app store needed — install instantly' },
            { icon: Share2, text: 'Access from your home screen anytime' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <item.icon size={20} className="text-rummy-green" />
              </div>
              <span className="text-sm font-semibold text-foreground">{item.text}</span>
            </div>
          ))}
        </div>

        {isIOS ? (
          <div className="mt-6 rounded-2xl bg-card p-4 shadow-sm">
            <p className="text-sm font-bold text-foreground">📱 How to install on iPhone:</p>
            <ol className="mt-2 space-y-1 text-left text-xs text-muted-foreground">
              <li>1. Tap the <strong>Share</strong> button (square with arrow) in Safari</li>
              <li>2. Scroll down and tap <strong>"Add to Home Screen"</strong></li>
              <li>3. Tap <strong>"Add"</strong> — done! 🎉</li>
            </ol>
          </div>
        ) : deferredPrompt ? (
          <button
            onClick={handleInstall}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-primary-foreground gradient-green shadow-md"
          >
            <Download size={16} /> Install App
          </button>
        ) : (
          <div className="mt-6 rounded-2xl bg-card p-4 shadow-sm">
            <p className="text-sm font-bold text-foreground">📱 How to install:</p>
            <ol className="mt-2 space-y-1 text-left text-xs text-muted-foreground">
              <li>1. Tap the <strong>⋮ menu</strong> (3 dots) in your browser</li>
              <li>2. Tap <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong></li>
              <li>3. Tap <strong>"Install"</strong> — done! 🎉</li>
            </ol>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-3 w-full rounded-xl bg-card py-3 text-sm font-semibold text-muted-foreground shadow-sm"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default Install;
