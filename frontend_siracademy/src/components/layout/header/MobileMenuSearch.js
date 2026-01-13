import React from "react";
import useTranslations from "@/hooks/useTranslations";
{
  /*  search input  */
}
const MobileMenuSearch = () => {
  const { t } = useTranslations();
  return (
    <div className="pb-10 border-b border-borderColor dark:border-borderColor-dark">
      <form className="flex justify-between items-center w-full bg-whitegrey2 dark:bg-whitegrey2-dark px-15px py-[11px]">
        <input
          type="text"
          placeholder={t("mobile.searchPlaceholder")}
          className="bg-transparent w-4/5 focus:outline-none text-sm text-darkdeep1 dark:text-blackColor-dark"
        />
        <button className="block text-lg text-darkdeep1 hover:text-secondaryColor dark:text-blackColor-dark dark:hover:text-secondaryColor">
          <i className="icofont icofont-search-2"></i>
        </button>
      </form>
    </div>
  );
};

export default MobileMenuSearch;
