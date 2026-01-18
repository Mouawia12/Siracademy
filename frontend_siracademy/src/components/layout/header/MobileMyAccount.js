"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import useTranslations from "@/hooks/useTranslations";
import { AUTH_EVENT, clearAuth, isLoggedIn } from "@/libs/auth";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

const MobileMyAccount = () => {
  const { t } = useTranslations();
  const [loggedIn, setLoggedIn] = useState(false);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX || "/api";
  const router = useRouter();
  const clearAuthStore = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const updateState = () => setLoggedIn(isLoggedIn());
    updateState();
    window.addEventListener(AUTH_EVENT, updateState);
    return () => window.removeEventListener(AUTH_EVENT, updateState);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      if (token) {
        await fetch(`${apiBase}${apiPrefix}/v1/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } finally {
      clearAuth();
      clearAuthStore();
      router.push("/login");
    }
  };
  return (
    <div>
      <ul className="accordion-container mt-9 mb-30px pb-9 border-b border-borderColor dark:border-borderColor-dark">
        <li className="accordion group">
          {/*  accordion header */}
          <div className="accordion-controller flex items-center justify-between">
            <Link
              className="leading-1 text-darkdeep1 font-medium group-hover:text-secondaryColor dark:text-whiteColor dark:hover:text-secondaryColor"
              href="#"
            >
              {t("header.account.myAccount")}
            </Link>
            <button className="px-3 py-1">
              <i className="icofont-thin-down text-size-15 text-darkdeep1 group-hover:text-secondaryColor dark:text-whiteColor dark:hover:text-secondaryColor"></i>
            </button>
          </div>
          {/*  accordion content */}
          <div className="accordion-content h-0 overflow-hidden transition-all duration-500 shadow-standard">
            <div className="content-wrapper">
              <ul>
                {!loggedIn ? (
                  <li>
                    {/*  accordion header */}
                    <div className="flex items-center gap-1">
                      <Link
                        href="/login"
                        className="leading-1 text-darkdeep1 text-sm pl-30px pt-7 pb-3 font-medium hover:text-secondaryColor dark:text-whiteColor dark:hover:text-secondaryColor"
                      >
                        {t("header.login")}
                      </Link>

                      <Link
                        href="/login"
                        className="leading-1 text-darkdeep1 text-sm pr-30px pt-7 pb-4 font-medium hover:text-secondaryColor dark:text-whiteColor dark:hover:text-secondaryColor"
                      >
                        <span>/</span> {t("header.account.createAccount")}
                      </Link>
                    </div>
                  </li>
                ) : null}
                <li>
                  {/*  accordion header */}
                  <div className="flex items-center justify-between">
                    <Link
                      href="/login"
                      className="leading-1 text-darkdeep1 text-sm pl-30px pt-3 pb-7 font-medium hover:text-secondaryColor dark:text-whiteColor dark:hover:text-secondaryColor"
                    >
                      {t("header.account.myAccount")}
                    </Link>
                  </div>
                  {/*  accordion content */}
                </li>
                {loggedIn ? (
                  <li>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="leading-1 text-darkdeep1 text-sm pl-30px pt-3 pb-7 font-medium hover:text-secondaryColor dark:text-whiteColor dark:hover:text-secondaryColor"
                      >
                        {t("header.account.logout")}
                      </button>
                    </div>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MobileMyAccount;
