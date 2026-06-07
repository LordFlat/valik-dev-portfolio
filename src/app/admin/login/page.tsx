import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="absolute left-1/2 top-1/3 h-64 w-96 -translate-x-1/2 rounded-full bg-neon-violet/15 blur-[120px]" aria-hidden />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xl font-bold">
            <span className="h-2.5 w-2.5 rounded-full bg-neon-purple shadow-glow-sm" />
            WorkFlow.dev
          </div>
          <p className="mt-2 text-sm text-ink-muted">Admin access</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-6 backdrop-blur-md sm:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
