"use client";

import useTranslations from "@/hooks/useTranslations";

const LanguageSwitcher = ({ className = "" }) => {
  const { locale, setLocale, t } = useTranslations();
  const nextLocale = locale === "ar" ? "en" : "ar";
  const label = locale === "ar" ? t("common.language.en") : t("common.language.ar");

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      className={`rounded-standard border border-whiteColor px-10px py-2 text-size-12 font-semibold uppercase tracking-wide text-whiteColor transition hover:border-primaryColor hover:text-primaryColor dark:border-borderColor-dark dark:text-whiteColor ${className}`}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default LanguageSwitcher;
