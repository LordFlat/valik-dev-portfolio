import { prisma } from "@/lib/prisma";
import { MessagesList } from "@/components/admin/MessagesList";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-white">Messages</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {messages.length} total · {unread} unread
      </p>

      <div className="mt-8">
        <MessagesList
          messages={messages.map((m) => ({
            id: m.id,
            name: m.name,
            email: m.email,
            projectType: m.projectType,
            message: m.message,
            read: m.read,
            createdAt: m.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
