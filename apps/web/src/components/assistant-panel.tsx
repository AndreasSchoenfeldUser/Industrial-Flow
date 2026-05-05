import type {
  AssistantMessage,
  AssistantSuggestedAction,
} from '@industrialflow/types';
import { cn } from '@/lib/cn';
import { Bot, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { formatTime } from '@/lib/format';

export function AssistantPanel({
  conversation,
  actions,
}: {
  conversation: AssistantMessage[];
  actions: AssistantSuggestedAction[];
}) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>
          <span className="inline-flex items-center gap-2">
            <Bot className="h-4 w-4 text-[color:var(--color-accent)]" aria-hidden />
            KI-Assistent
          </span>
        </CardTitle>
        <span className="rounded-md bg-[color:var(--color-bg-elev)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[color:var(--color-fg-muted)]">
          Online · Logs gescrubbt
        </span>
      </CardHeader>
      <CardBody className="flex flex-1 flex-col gap-3">
        <div className="flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-thin">
          {conversation.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'rounded-[var(--radius-md)] px-3 py-2 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-[color:var(--color-bg-elev)] text-[color:var(--color-fg)]'
                  : msg.role === 'assistant'
                    ? 'bg-[color:rgba(255,91,19,0.08)] text-[color:var(--color-fg)]'
                    : 'border border-dashed bg-transparent text-[color:var(--color-fg-muted)]',
              )}
            >
              <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-[color:var(--color-fg-dim)]">
                <span>
                  {msg.role === 'assistant'
                    ? 'Assistent'
                    : msg.role === 'user'
                      ? 'andreas'
                      : 'System'}
                </span>
                <span>{formatTime(msg.timestamp)}</span>
              </div>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t pt-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[color:var(--color-fg-dim)]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Vorgeschlagene Aktionen
          </div>
          {actions.map((a) => (
            <button
              key={a.id}
              className="group flex items-center gap-2 rounded-md border border-transparent bg-[color:var(--color-bg-elev)] px-3 py-2 text-left text-sm transition hover:border-[color:var(--color-accent)]"
            >
              <Wand2
                className="h-3.5 w-3.5 text-[color:var(--color-accent)]"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <div className="font-medium">{a.label}</div>
                <div className="text-xs text-[color:var(--color-fg-muted)]">
                  {a.description}
                </div>
              </div>
            </button>
          ))}
          <div className="flex items-center gap-2">
            <input
              disabled
              placeholder="Fragen Sie den Assistenten… (in Phase 3 aktiv)"
              className="flex-1 rounded-md border bg-[color:var(--color-bg-elev)] px-3 py-2 text-sm placeholder:text-[color:var(--color-fg-dim)] disabled:cursor-not-allowed"
            />
            <Button disabled variant="primary">
              Senden
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
