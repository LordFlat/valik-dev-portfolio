"use client";

import { useState, useTransition } from "react";
import {
  deleteMessageAction,
  markMessageReadAction,
} from "@/lib/actions/messages";
import { ConfirmDeleteModal } from "@/components/ui/ConfirmDeleteModal";
import { formatDate, cn } from "@/lib/utils";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export function MessagesList({ messages }: { messages: Message[] }) {
  const [toDelete, setToDelete] = useState<Message | null>(null);
  const [isPending, startTransition] = useTransition();
  const run = (fn: () => Promise<void>) => startTransition(() => void fn());

  if (!messages.length) {
    return (
      <div className="glass rounded-2xl p-10 text-center text-sm text-ink-muted">
        No messages yet.
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3", isPending && "opacity-70")}>
      {messages.map((m) => (
        <div
          key={m.id}
          className={cn(
            "rounded-2xl border bg-card p-5 backdrop-blur-md transition-colors",
            m.read ? "border-white/10" : "border-neon-purple/30",
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                {!m.read && <span className="h-2 w-2 rounded-full bg-neon-purple shadow-glow-sm" />}
                <span className="font-medium text-ink-white">{m.name}</span>
              </div>
              <a href={`mailto:${m.email}`} className="text-sm text-neon-soft hover:underline">
                {m.email}
              </a>
            </div>
            <span className="text-xs text-ink-muted">{formatDate(m.createdAt)}</span>
          </div>

          <p className="mt-3 whitespace-pre-wrap text-sm text-ink-muted">{m.message}</p>

          <div className="mt-4 flex items-center gap-4 text-xs">
            <button
              onClick={() => run(() => markMessageReadAction(m.id, !m.read))}
              className="text-ink-muted hover:text-neon-soft"
            >
              {m.read ? "Mark as unread" : "Mark as read"}
            </button>
            <button
              onClick={() => setToDelete(m)}
              className="text-ink-muted hover:text-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <ConfirmDeleteModal
        open={!!toDelete}
        title="Delete this message?"
        description={`From ${toDelete?.name}. This cannot be undone.`}
        pending={isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (!toDelete) return;
          const id = toDelete.id;
          run(async () => {
            await deleteMessageAction(id);
          });
          setToDelete(null);
        }}
      />
    </div>
  );
}
