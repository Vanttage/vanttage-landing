import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Portal Interno · Vanttage",
  robots: { index: false, follow: false },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--pbg)] text-[var(--ptext)]">
      {children}
      <Toaster position="top-right" richColors closeButton theme="dark" />
    </div>
  );
}
