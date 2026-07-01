import type { Metadata } from "next";

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
    <div className="min-h-screen bg-[#06060C] text-white">{children}</div>
  );
}
