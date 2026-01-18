import AccordionContainer from "@/components/shared/containers/AccordionContainer";
import MobileMenuItem from "./MobileItem";
import useTranslations from "@/hooks/useTranslations";
import { useEffect, useMemo, useState } from "react";
import { AUTH_EVENT, getDashboardPath, getStoredUser, isLoggedIn } from "@/libs/auth";

const MobileItems2 = () => {
  const { t } = useTranslations();
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const updateState = () => setShowDashboard(isLoggedIn());
    updateState();
    window.addEventListener(AUTH_EVENT, updateState);
    return () => window.removeEventListener(AUTH_EVENT, updateState);
  }, []);

  const items = useMemo(() => {
    const dashboardPath = getDashboardPath(getStoredUser());
    const baseItems = [
      {
        id: 1,
        name: t("header.nav.home"),
        path: "/",
        accordion: false,
        children: null,
      },
      {
        id: 2,
        name: t("header.nav.about"),
        path: "/about",
        accordion: false,
        children: null,
      },
      {
        id: 3,
        name: t("header.nav.programs"),
        path: "/courses",
        accordion: false,
        children: null,
      },
      {
        id: 4,
        name: t("header.nav.instructors"),
        path: "/instructors",
        accordion: false,
        children: null,
      },
      {
        id: 5,
        name: t("header.nav.leadership"),
        path: "/leadership-training",
        accordion: false,
        children: null,
      },
      {
        id: 6,
        name: t("header.nav.insights"),
        path: "/blogs",
        accordion: false,
        children: null,
      },
      {
        id: 7,
        name: t("header.nav.contact"),
        path: "/contact",
        accordion: false,
        children: null,
      },
    ];

    if (showDashboard) {
      baseItems.push({
        id: 9,
        name: t("header.nav.dashboard"),
        path: dashboardPath,
        accordion: false,
        children: null,
      });
    }

    return baseItems;
  }, [showDashboard, t]);

  return (
    <div className="pt-8 pb-6 border-b border-borderColor dark:border-borderColor-dark">
      <AccordionContainer>
        {items.map((item, idx) => (
          <MobileMenuItem key={idx} item={item} />
        ))}
      </AccordionContainer>
    </div>
  );
};

export default MobileItems2;
