import React from "react";
import FooterNavItems from "./FooterNavItems";
import FooterAbout from "./FooterAbout";
import FooterRecentPosts from "./FooterRecentPosts";
import useTranslations from "@/hooks/useTranslations";

const FooterNavList = () => {
  const { t } = useTranslations();
  const lists = [
    {
      heading: t("footer.links.useful.heading"),
      items: [
        {
          name: t("footer.links.useful.items.about"),
          path: "/about",
        },
        {
          name: t("footer.links.useful.items.teachers"),
          path: "/instructors",
        },
        {
          name: t("footer.links.useful.items.partner"),
          path: "#",
        },
        {
          name: t("footer.links.useful.items.roomDetails"),
          path: "#",
        },
        {
          name: t("footer.links.useful.items.gallery"),
          path: "#",
        },
      ],
    },
    {
      heading: t("footer.links.course.heading"),
      items: [
        {
          name: t("footer.links.course.items.uiux"),
          path: "#",
        },
        {
          name: t("footer.links.course.items.webDev"),
          path: "#",
        },
        {
          name: t("footer.links.course.items.businessStrategy"),
          path: "#",
        },
        {
          name: t("footer.links.course.items.softwareDev"),
          path: "#",
        },
        {
          name: t("footer.links.course.items.businessEnglish"),
          path: "#",
        },
      ],
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-2 lg:grid-cols-12 gap-30px md:gap-y-5 lg:gap-y-0 pt-60px pb-50px md:pt-30px md:pb-30px lg:pt-110px lg:pb-20">
        {/* left */}
        <FooterAbout />

        {/* nav area */}
        {lists.map((list, idx) => (
          <FooterNavItems key={idx} list={list} idx={idx} />
        ))}

        {/* right */}
        <FooterRecentPosts />
      </div>
    </section>
  );
};

export default FooterNavList;
