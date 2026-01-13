import React from "react";
import DropdownHome from "./DropdownHome";
import DropdownCourses2 from "./DropdownCourses2";
import DropdownBlog from "./DropdownBlog";
import DropdownPages2 from "./DropdownPages2";
import Navitem from "./Navitem";
import DropdownWrapper from "@/components/shared/wrappers/DropdownWrapper";
import useTranslations from "@/hooks/useTranslations";

const NavItems2 = () => {
  const { t } = useTranslations();
  const navItems = [
    {
      id: 1,
      name: t("header.nav.home"),
      path: "/",
      dropdown: <DropdownHome />,
      isRelative: true,
    },
    {
      id: 2,
      name: t("header.nav.about"),
      path: "/about",
      dropdown: null,
      isRelative: false,
    },
    {
      id: 3,
      name: t("header.nav.blog"),
      path: "/dashboards/instructor-dashboard",
      dropdown: <DropdownBlog />,
      isRelative: true,
    },
    {
      id: 4,
      name: t("header.nav.courses"),
      path: "/courses",
      dropdown: <DropdownCourses2 />,
      isRelative: true,
    },

    {
      id: 5,
      name: t("header.nav.pages"),
      path: "/about",
      dropdown: <DropdownPages2 />,
      isRelative: true,
    },
    {
      id: 6,
      name: t("header.nav.contact"),
      path: "/contact",
      dropdown: null,
      isRelative: false,
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
export default NavItems2;
