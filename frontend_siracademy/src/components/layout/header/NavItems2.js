import React, { useEffect, useMemo, useState } from "react";
import Navitem from "./Navitem";
import useTranslations from "@/hooks/useTranslations";
import { AUTH_EVENT, getDashboardPath, getStoredUser, isLoggedIn } from "@/libs/auth";

const NavItems2 = () => {
  const { t } = useTranslations();
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const updateState = () => setShowDashboard(isLoggedIn());
    updateState();
    window.addEventListener(AUTH_EVENT, updateState);
    return () => window.removeEventListener(AUTH_EVENT, updateState);
  }, []);

  const navItems = useMemo(() => {
    const dashboardPath = getDashboardPath(getStoredUser());
    const items = [
      {
        id: 1,
        name: t("header.nav.home"),
        path: "/",
        dropdown: null,
        isRelative: false,
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
        name: t("header.nav.programs"),
        path: "/courses",
        dropdown: null,
        isRelative: false,
      },
      {
        id: 4,
        name: t("header.nav.instructors"),
        path: "/instructors",
        dropdown: null,
        isRelative: false,
      },
      {
        id: 5,
        name: t("header.nav.leadership"),
        path: "/leadership-training",
        dropdown: null,
        isRelative: false,
      },
      {
        id: 6,
        name: t("header.nav.insights"),
        path: "/blogs",
        dropdown: null,
        isRelative: false,
      },
      {
        id: 7,
        name: t("header.nav.contact"),
        path: "/contact",
        dropdown: null,
        isRelative: false,
      },
    ];

    if (showDashboard) {
      return [
        ...items,
        {
          id: 8,
          name: t("header.nav.dashboard"),
          path: dashboardPath,
          dropdown: null,
          isRelative: false,
        },
      ];
    }

    return items;
  }, [showDashboard, t]);
  return (
    <div className="hidden lg:block lg:col-start-3 lg:col-span-7">
      <ul className="nav-list flex justify-center">
        {navItems.map((navItem, idx) => (
          <Navitem key={idx} idx={idx} navItem={{ ...navItem, idx: idx }} />
        ))}
      </ul>
    </div>
  );
};
export default NavItems2;
