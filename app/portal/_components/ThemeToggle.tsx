"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ptheme");
    const isLight = saved === "light";
    setLight(isLight);
    document.documentElement.setAttribute("data-ptheme", isLight ? "light" : "dark");
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    const val = next ? "light" : "dark";
    localStorage.setItem("ptheme", val);
    document.documentElement.setAttribute("data-ptheme", val);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[var(--pmuted)] transition hover:bg-[var(--pcardhover)] hover:text-[var(--ptext)]"
    >
      {light ? <Moon size={14} /> : <Sun size={14} />}
      {light ? "Modo oscuro" : "Modo claro"}
    </button>
  );
}
