"use client";
import MobileItems2 from "./MobileItems2";
import MobileMenuSearch from "./MobileMenuSearch";
import MobileMyAccount from "./MobileMyAccount";
import MobileSocial from "./MobileSocial";
import MobileMenuClose from "@/components/shared/buttons/MobileMenuClose";
import LanguageSwitcher from "@/components/shared/others/LanguageSwitcher";

const MobileMenu = () => {
  return (
    <div className="mobile-menu w-mobile-menu-sm md:w-mobile-menu-lg fixed top-0 -right-[280px] md:-right-[330px] transition-all duration-500 w-mobile-menu h-full shadow-dropdown-secodary bg-whiteColor dark:bg-whiteColor-dark z-high block lg:hidden">
      <MobileMenuClose />

      {/*  mobile menu wrapper */}
      <div className="px-5 md:px-30px pt-5 md:pt-10 pb-50px h-full overflow-y-auto">
        <MobileMenuSearch />
        <div className="pt-5">
          <LanguageSwitcher className="border-borderColor text-darkdeep1 hover:text-primaryColor dark:border-borderColor-dark dark:text-whiteColor" />
        </div>
        {/*  mobile menu accordions */}
        <MobileItems2 />
        {/*  my account accordion */}
        <MobileMyAccount />
        {/*  Mobile menu social area */}

        <MobileSocial />
      </div>
    </div>
  );
};

export default MobileMenu;
