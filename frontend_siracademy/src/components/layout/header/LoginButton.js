"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import useTranslations from "@/hooks/useTranslations";
import { AUTH_EVENT, clearAuth, isLoggedIn } from "@/libs/auth";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

const LoginButton = () => {
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
    <div className="mr-[7px] 2xl:mr-15px">
      {loggedIn ? (
        <button
          type="button"
          onClick={handleLogout}
          className="text-size-12 2xl:text-size-15 px-15px py-2 text-blackColor hover:text-whiteColor bg-whiteColor block hover:bg-primaryColor border border-borderColor1 rounded-standard font-semibold dark:text-blackColor-dark dark:bg-whiteColor-dark dark:hover:bg-primaryColor dark:hover:text-whiteColor dark:hover:border-primaryColor"
        >
          {t("header.account.logout")}
        </button>
      ) : (
        <Link
          href="/login"
          className="text-size-12 2xl:text-size-15 px-15px py-2 text-blackColor hover:text-whiteColor bg-whiteColor block hover:bg-primaryColor border border-borderColor1 rounded-standard font-semibold dark:text-blackColor-dark dark:bg-whiteColor-dark dark:hover:bg-primaryColor dark:hover:text-whiteColor dark:hover:border-primaryColor"
        >
          {t("header.nav.loginRegister")}
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
