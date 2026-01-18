"use client";

import useTranslations from "@/hooks/useTranslations";

const LanguageController = () => {
  const { locale, setLocale, t } = useTranslations();
  const nextLocale = locale === "ar" ? "en" : "ar";
  const label =
    locale === "ar" ? t("common.language.en") : t("common.language.ar");

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      dir="ltr"
      className="w-90px h-10 bg-primaryColor dark:bg-whiteColor-dark rounded-l-lg2 text-whiteColor px-10px flex items-center text-base font-semibold uppercase tracking-wide dark:shadow-theme-controller"
      aria-label={label}
    >
      <span className="flex h-5 w-5 items-center justify-center">
        <i className="icofont-globe-alt text-lg leading-none"></i>
      </span>
      <span className="ml-10px">{label}</span>
    </button>
  );
};

export default LanguageController;
