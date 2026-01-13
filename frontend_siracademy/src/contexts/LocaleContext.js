"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import messagesEn from "@/messages/en.json";
import messagesAr from "@/messages/ar.json";
import {
  createTranslator,
  defaultLocale,
  normalizeLocale,
  supportedLocales,
} from "@/libs/i18n";

const LocaleContext = createContext(null);

export const LocaleProvider = ({ locale, children }) => {
  const router = useRouter();
  const currentLocale = normalizeLocale(locale || defaultLocale);
  const messages = currentLocale === "ar" ? messagesAr : messagesEn;

  const t = useMemo(
    () => createTranslator(messages, messagesEn),
    [currentLocale, messages]
  );

  const setLocale = useCallback(
    (nextLocale) => {
      const normalized = normalizeLocale(nextLocale);
      if (normalized === currentLocale) return;

      document.cookie = `locale=${normalized}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.lang = normalized;
      document.documentElement.dir = normalized === "ar" ? "rtl" : "ltr";
      router.refresh();
    },
    [currentLocale, router]
  );

  const value = useMemo(
    () => ({
      locale: currentLocale,
      locales: supportedLocales,
      t,
      setLocale,
    }),
    [currentLocale, t, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
};
