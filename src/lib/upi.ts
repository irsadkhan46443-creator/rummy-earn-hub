export const MERCHANT_UPI_ID = '8209173882@ybl';
export const MERCHANT_NAME = 'Rummy Pay';

export const buildUpiParams = (amount: number, note?: string) => {
  const params = new URLSearchParams();
  params.set('pa', MERCHANT_UPI_ID);
  params.set('pn', MERCHANT_NAME);
  params.set('am', amount.toFixed(2));
  params.set('cu', 'INR');
  if (note) params.set('tn', note);
  return params.toString();
};

export const buildUpiUri = (amount: number, note?: string) =>
  `upi://pay?${buildUpiParams(amount, note)}`;

// Paytm-specific deep link (preferred when installed on Android)
export const buildPaytmUri = (amount: number, note?: string) =>
  `paytmmp://pay?${buildUpiParams(amount, note)}`;

export const isAndroid = () =>
  typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);

export const isMobile = () =>
  typeof navigator !== 'undefined' && /android|iphone|ipad|ipod/i.test(navigator.userAgent);

/**
 * Opens a UPI app for the given amount.
 * Returns a promise that resolves to true if the device appears to have handed
 * off to a UPI app, false if nothing opened (no UPI app / desktop browser).
 */
export const openUpiApp = (amount: number, note?: string): Promise<boolean> =>
  new Promise((resolve) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      resolve(false);
      return;
    }
    if (!isMobile()) {
      resolve(false);
      return;
    }

    let handedOff = false;
    const onHide = () => {
      if (document.visibilityState === 'hidden') handedOff = true;
    };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onHide);

    const generic = buildUpiUri(amount, note);

    if (isAndroid()) {
      // Try Paytm first, fall back to the generic UPI chooser.
      window.location.href = buildPaytmUri(amount, note);
      window.setTimeout(() => {
        if (!handedOff) window.location.href = generic;
      }, 700);
    } else {
      window.location.href = generic;
    }

    window.setTimeout(() => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onHide);
      resolve(handedOff);
    }, 2200);
  });
