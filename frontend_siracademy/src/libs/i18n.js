export const defaultLocale = "en";
export const supportedLocales = ["en", "ar"];

export function normalizeLocale(locale) {
  return supportedLocales.includes(locale) ? locale : defaultLocale;
}

export function getLocale({ cookieStore, headerStore }) {
  const cookieLocale = cookieStore?.get("locale")?.value;
  if (cookieLocale) {
    return normalizeLocale(cookieLocale);
  }

  const acceptLanguage = headerStore?.get("accept-language") || "";
  if (acceptLanguage.toLowerCase().includes("ar")) {
    return "ar";
  }

  return defaultLocale;
}

export function getMessage(messages, key) {
  if (!messages || !key) return undefined;

  return key.split(".").reduce((value, part) => {
    if (value && typeof value === "object" && part in value) {
      return value[part];
    }
    return undefined;
  }, messages);
}

export function createTranslator(messages, fallbackMessages) {
  return (key) => {
    const value = getMessage(messages, key);
    if (value !== undefined) {
      return value;
    }

    const fallbackValue = getMessage(fallbackMessages, key);
    return fallbackValue !== undefined ? fallbackValue : key;
  };
}
