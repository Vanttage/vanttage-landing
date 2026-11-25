"use client";

import { Toaster } from "sonner";
import { usePortalTheme } from "./usePortalTheme";

/* Toaster cuyo tema sigue el ptheme del portal (claro/oscuro) */
export default function ThemedToaster() {
  const theme = usePortalTheme();
  return <Toaster position="top-right" richColors closeButton theme={theme} />;
}
