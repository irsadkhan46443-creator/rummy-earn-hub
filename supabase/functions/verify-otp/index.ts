import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY = 'https://connector-gateway.lovable.dev/twilio';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { phone, code } = await req.json();
    if (typeof phone !== 'string' || !/^\d{10}$/.test(phone)) {
      return json({ error: 'Enter a valid 10-digit mobile number' }, 400);
    }
    if (typeof code !== 'string' || !/^\d{4,8}$/.test(code)) {
      return json({ error: 'Enter the code you received' }, 400);
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const TWILIO_API_KEY = Deno.env.get('TWILIO_API_KEY');
    const SERVICE_SID = Deno.env.get('TWILIO_VERIFY_SERVICE_SID');
    if (!LOVABLE_API_KEY || !TWILIO_API_KEY || !SERVICE_SID) {
      return json({ error: 'SMS service is not configured' }, 500);
    }

    const res = await fetch(`${GATEWAY}/verify/v2/Services/${SERVICE_SID}/VerificationCheck`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': TWILIO_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ To: `+91${phone}`, Code: code }),
    });

    if (!res.ok) {
      const details = await res.text();
      console.error(`verify-otp failed [${res.status}]: ${details}`);
      return json({ error: 'Code could not be checked', status: res.status, details }, res.status);
    }

    const data = await res.json();
    const approved = data.status === 'approved';
    return json({ approved, status: data.status }, approved ? 200 : 401);
  } catch (e) {
    console.error('verify-otp error', e);
    return json({ error: String(e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
