import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" as const },
] as const;

export type SupportedLanguageCode = "en";

export function isRtl(_code: string): boolean {
  return false;
}

export function applyDocumentDirection(_code: string): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("dir", "ltr");
  document.documentElement.setAttribute("lang", "en");
}

if (typeof window !== "undefined") {
  try {
    localStorage.setItem("i18nextLng", "en");
  } catch {
    // ignore
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en"],
    interpolation: { escapeValue: false },
  });

applyDocumentDirection("en");
i18n.on("initialized", () => {
  applyDocumentDirection("en");
});

export default i18n;
