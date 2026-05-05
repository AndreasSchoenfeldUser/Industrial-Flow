'use client';

// Client component because the form has interactive submit handling.
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Activity, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState('andreas');
  const [pw, setPw] = useState('mockup');
  const [pending, setPending] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    // Phase 1: Mock-Login. Phase 2 wird hier echtes RBAC gegen Jenkins prüfen.
    setTimeout(() => router.push('/dashboard'), 250);
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center gap-6">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[color:rgba(255,91,19,0.15)]">
          <Activity className="h-5 w-5 text-[color:var(--color-accent)]" aria-hidden />
        </div>
        <h1 className="text-lg font-semibold tracking-tight">IndustrialFlow</h1>
        <p className="mt-1 text-xs text-[color:var(--color-fg-muted)]">
          Phase 1 Mock-Login · Default-User &bdquo;andreas&ldquo;
        </p>
      </div>

      <form
        onSubmit={submit}
        className="flex flex-col gap-3 rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/70 p-5"
      >
        <label className="flex flex-col gap-1 text-xs uppercase tracking-wider text-[color:var(--color-fg-dim)]">
          Benutzer
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="rounded-md border bg-[color:var(--color-bg-elev)] px-3 py-2 text-sm normal-case tracking-normal text-[color:var(--color-fg)]"
            autoComplete="username"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs uppercase tracking-wider text-[color:var(--color-fg-dim)]">
          Passwort
          <input
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            type="password"
            className="rounded-md border bg-[color:var(--color-bg-elev)] px-3 py-2 text-sm normal-case tracking-normal text-[color:var(--color-fg)]"
            autoComplete="current-password"
          />
        </label>
        <Button variant="primary" type="submit" disabled={pending} className="justify-center">
          <LogIn className="h-3.5 w-3.5" aria-hidden />
          {pending ? 'Anmeldung läuft…' : 'Anmelden'}
        </Button>
      </form>

      <p className="text-center text-[11px] text-[color:var(--color-fg-dim)]">
        Echtes RBAC kommt mit Jenkins JCasC in Phase 2.
      </p>
    </div>
  );
}
