"use client";

import { useSyncExternalStore } from "react";

/* Tema del portal: vive en el atributo data-ptheme de <html> y se guarda en localStorage("ptheme").
   Se lee con useSyncExternalStore para no duplicar estado ni llamar setState dentro de efectos. */

export type PortalTheme = "light" | "dark";
export const THEME_KEY = "ptheme";

function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ptheme"] });
  return () => obs.disconnect();
}

const getSnapshot = (): PortalTheme =>
  document.documentElement.getAttribute("data-ptheme") === "light" ? "light" : "dark";
const getServerSnapshot = (): PortalTheme => "dark";

export function usePortalTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setPortalTheme(theme: PortalTheme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* almacenamiento bloqueado: el cambio queda solo para esta vista */
  }
  document.documentElement.setAttribute("data-ptheme", theme);
}

/* Aplica el tema guardado (necesario en navegación del lado del cliente, donde el
   script inline del layout no se vuelve a ejecutar) */
export function applyStoredTheme() {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(THEME_KEY);
  } catch {
    /* ignora */
  }
  document.documentElement.setAttribute("data-ptheme", saved === "light" ? "light" : "dark");
}
