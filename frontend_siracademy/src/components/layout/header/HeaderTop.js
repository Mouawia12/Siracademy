"use client";
import useTranslations from "@/hooks/useTranslations";
import React from "react";

const HeaderTop = () => {
  const { t } = useTranslations();

  return (
    <div className="bg-blackColor2 dark:bg-lightGrey10-dark hidden lg:block">
      <div
        className="container sm:container-fluid lg:container 3xl:container-secondary 4xl:container mx-auto text-whiteColor text-size-12 xl:text-sm py-5px xl:py-9px"
      >
        <div className="flex justify-between items-center">
          <div>
            <p>{t("header.callUs")}</p>
          </div>
          <div className="flex gap-37px items-center">
            <div>
              <p>
                <i className="icofont-location-pin text-primaryColor text-size-15 mr-5px"></i>
                <span>{t("header.address")}</span>
              </p>
            </div>
            <div>
              {/* header social list  */}
              <ul className="flex gap-[18px] text-size-15">
                <li>
                  <a
                    className="hover:text-primaryColor"
                    href="https://www.facebook.com"
                  >
                    <i className="icofont-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primaryColor"
                    href="https://www.twitter.com"
                  >
                    <i className="icofont-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primaryColor"
                    href="https://www.instagram.com"
                  >
                    <i className="icofont-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primaryColor"
                    href="https://www.youtube.com"
                  >
                    <i className="icofont-youtube-play"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
