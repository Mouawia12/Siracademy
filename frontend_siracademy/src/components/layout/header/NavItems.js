import React from "react";
import Navitem from "./Navitem";
import DropdownDemoes from "./DropdownDemoes";
import DropdownPages from "./DropdownPages";
import DropdownCourses from "./DropdownCourses";
import DropdownWrapper from "@/components/shared/wrappers/DropdownWrapper";
import DropdownDashboard from "./DropdownDashboard";
import DropdownEcommerce from "./DropdownEcommerce";
import useTranslations from "@/hooks/useTranslations";

const NavItems = () => {
  const { t } = useTranslations();
  const navItems = [
    {
      id: 1,
      name: t("header.nav.demos"),
      path: "/",
      dropdown: <DropdownDemoes />,
      isRelative: false,
    },
    {
      id: 2,
      name: t("header.nav.pages"),
      path: "/about",
      dropdown: <DropdownPages />,
      isRelative: false,
    },
    {
      id: 3,
      name: t("header.nav.courses"),
      path: "/courses",
      dropdown: <DropdownCourses />,
      isRelative: false,
    },
    {
      id: 4,
      name: t("header.nav.dashboard"),
      path: "/dashboards/instructor-dashboard",
      dropdown: <DropdownDashboard />,
      isRelative: true,
    },
    {
      id: 5,
      name: t("header.nav.ecommerce"),
      path: "/ecommerce/shop",
      dropdown: <DropdownEcommerce />,
      isRelative: true,
    },
  ];
  return (
    <div className="hidden lg:block lg:col-start-3 lg:col-span-7">
      <ul className="nav-list flex justify-center">
        {navItems.map((navItem, idx) => (
          <Navitem key={idx} idx={idx} navItem={{ ...navItem, idx: idx }}>
            <DropdownWrapper>{navItem.dropdown}</DropdownWrapper>
          </Navitem>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
