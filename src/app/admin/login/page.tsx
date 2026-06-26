import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight">
            <span className="h-2.5 w-2.5 rounded-full bg-neon-soft" />
            Valentyn <span className="text-neon-soft">Studio</span>
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
