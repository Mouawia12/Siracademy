"use client";
import NavbarLogo from "./NavbarLogo";
import NavbarRight from "./NavbarRight";
import NavItems2 from "./NavItems2";
const Navbar = () => {
  return (
    <div
      className="transition-all duration-500 sticky-header z-medium dark:bg-whiteColor-dark lg:border-b border-borderColor dark:border-borderColor-dark"
    >
      <nav>
        <div
          className="py-15px lg:py-0 px-15px container sm:container-fluid lg:container 3xl:container-secondary 4xl:container mx-auto relative"
        >
          <div className="grid grid-cols-2 lg:grid-cols-12 items-center gap-15px">
            {/* navbar left */}
            <NavbarLogo />
            {/* Main menu */}
            <NavItems2 />

            {/* navbar right */}
            <NavbarRight />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
