"use client";
import React from "react";
import Link from "next/link";
import MobileMenuOpen from "@/components/shared/buttons/MobileMenuOpen";
import LoginButton from "./LoginButton";
import useTranslations from "@/hooks/useTranslations";
const NavbarRight = () => {
  const { t } = useTranslations();

  return (
    <div className="lg:col-start-10 lg:col-span-3">
      <ul className="relative nav-list flex justify-end items-center">
        <li className="hidden lg:block">
          <LoginButton />
        </li>
        <li className="hidden lg:block">
          <Link
            href="/contact"
            className="text-size-12 2xl:text-size-15 text-whiteColor bg-primaryColor block border-primaryColor border hover:text-primaryColor hover:bg-white px-15px py-2 rounded-standard dark:hover:bg-whiteColor-dark dark: dark:hover:text-whiteColor"
          >
            {t("header.cta.apply")}
          </Link>
        </li>
        <li className="block lg:hidden">
          <MobileMenuOpen />
        </li>
      </ul>
    </div>
  );
};

export default NavbarRight;
