"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

/* Toaster cuyo tema sigue el ptheme del portal (claro/oscuro) */
export default function ThemedToaster() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const read = () =>
      setTheme(document.documentElement.getAttribute("data-ptheme") === "light" ? "light" : "dark");
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ptheme"] });
    return () => obs.disconnect();
  }, []);

  return <Toaster position="top-right" richColors closeButton theme={theme} />;
}
