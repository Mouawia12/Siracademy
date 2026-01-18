"use client";

import lessons from "@/../public/fakedata/lessons.json";
import LessonAccordion from "@/components/shared/lessons/LessonAccordion";
import { getStoredUser, isActiveMember, isLoggedIn } from "@/libs/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LessonPrimary = ({ id: id1 }) => {
  const router = useRouter();
  const loggedIn = isLoggedIn();
  const storedUser = getStoredUser();
  const hasMembership = isActiveMember(storedUser);
  const { id, link } = lessons?.find(({ id }) => id1 === id) || {
    id: 1,
    link: "https://www.youtube.com/embed/vHdclsdkp28",
  };

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/login");
    }
  }, [loggedIn, router]);

  if (!loggedIn) {
    return (
      <section>
        <div className="container pt-50px pb-100px text-center">
          <p className="text-base text-contentColor dark:text-contentColor-dark mb-4">
            This content is available for academy members only.
          </p>
          <Link
            href="/login"
            className="text-size-15 text-whiteColor bg-primaryColor px-25px py-10px border border-primaryColor hover:text-primaryColor hover:bg-whiteColor inline-block rounded group dark:hover:text-whiteColor dark:hover:bg-whiteColor-dark"
          >
            Log in to Access
          </Link>
        </div>
      </section>
    );
  }

  if (!hasMembership) {
    return (
      <section>
        <div className="container pt-50px pb-100px text-center">
          <p className="text-base text-contentColor dark:text-contentColor-dark mb-4">
            An active academy membership is required to view this content.
          </p>
          <Link
            href="/contact"
            className="text-size-15 text-whiteColor bg-secondaryColor px-25px py-10px border border-secondaryColor hover:text-secondaryColor hover:bg-whiteColor inline-block rounded group dark:hover:text-secondaryColor dark:hover:bg-whiteColor-dark"
          >
            Contact Membership Team
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section>
      <div className="container-fluid-2 pt-50px pb-100px">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-30px">
          {/* lesson left  */}
          <div className="xl:col-start-1 xl:col-span-4" data-aos="fade-up">
            {/* curriculum  */}
            <LessonAccordion />
          </div>
          {/* lesson right  */}
          <div
            className="xl:col-start-5 xl:col-span-8 relative"
            data-aos="fade-up"
          >
            <div>
              <div className="absolute top-0 left-0 w-full flex justify-between items-center px-5 py-10px bg-primaryColor leading-1.2 text-whiteColor">
                <h3 className="sm:text-size-22 font-bold">
                  Video Content lesson 01
                </h3>
                <a href="course-details.html" className="">
                  Close
                </a>
              </div>

              <div className="aspect-[16/9]">
                <iframe
                  src={link}
                  allowFullScreen=""
                  allow="autoplay"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonPrimary;
