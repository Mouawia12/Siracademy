import { useLocale } from "@/contexts/LocaleContext";

const useTranslations = () => {
  return useLocale();
};

export default useTranslations;
