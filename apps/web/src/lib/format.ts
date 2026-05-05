export function formatDuration(ms: number | undefined): string {
  if (ms === undefined) return '–';
  if (ms < 1000) return `${ms} ms`;
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec} s`;
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min < 60) return sec === 0 ? `${min} min` : `${min} min ${sec} s`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export function formatRelative(iso: string | undefined): string {
  if (!iso) return '–';
  const target = new Date(iso).getTime();
  const diff = target - Date.now();
  const past = diff < 0;
  const absMin = Math.round(Math.abs(diff) / 60_000);
  if (absMin < 1) return past ? 'gerade eben' : 'in Kürze';
  if (absMin < 60) return past ? `vor ${absMin} min` : `in ${absMin} min`;
  const h = Math.floor(absMin / 60);
  const m = absMin % 60;
  if (h < 24) {
    const tail = m === 0 ? `${h} h` : `${h} h ${m} min`;
    return past ? `vor ${tail}` : `in ${tail}`;
  }
  const d = Math.floor(h / 24);
  return past ? `vor ${d} Tag${d === 1 ? '' : 'en'}` : `in ${d} Tag${d === 1 ? '' : 'en'}`;
}

export function formatDateTime(iso: string | undefined): string {
  if (!iso) return '–';
  const d = new Date(iso);
  return d.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(iso: string | undefined): string {
  if (!iso) return '–';
  return new Date(iso).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
