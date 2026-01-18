"use client";

import accordions from "@/libs/accordions";
import Link from "next/link";
import { useEffect, useMemo } from "react";

const formatDuration = (seconds) => {
  if (!seconds) return "Self paced";
  const totalMinutes = Math.ceil(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours ? `${hours}h ` : ""}${minutes}m`;
};

const CurriculumContent = ({ lessons = [] }) => {
  useEffect(() => {
    accordions();
  }, []);

  const totalSeconds = useMemo(
    () => lessons.reduce((sum, lesson) => sum + (lesson.duration_seconds || 0), 0),
    [lessons]
  );

  return (
    <div>
      <ul className="accordion-container curriculum">
        <li className="accordion mb-25px overflow-hidden active">
          <div className="bg-whiteColor border border-borderColor dark:bg-whiteColor-dark dark:border-borderColor-dark rounded-t-md">
            <div>
              <div className="cursor-pointer accordion-controller flex justify-between items-center text-xl text-headingColor font-bold w-full px-5 py-18px dark:text-headingColor-dark font-hind leading-[20px]">
                <div className="flex items-center">
                  <span>Course Lessons</span>
                  <p className="text-xs text-headingColor dark:text-headingColor-dark px-10px py-0.5 ml-10px bg-borderColor dark:bg-borderColor-dark rounded-full">
                    {formatDuration(totalSeconds)}
                  </p>
                </div>
                <svg
                  className="transition-all duration-500 rotate-0"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="#212529"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="accordion-content transition-all duration-500">
              <div className="content-wrapper p-10px md:px-30px">
                {lessons.length ? (
                  <ul>
                    {lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="py-4 flex items-center justify-between flex-wrap border-b border-borderColor dark:border-borderColor-dark"
                      >
                        <div>
                          <h4 className="text-blackColor dark:text-blackColor-dark leading-1 font-light">
                            <i
                              className={`${
                                lesson.type === "text"
                                  ? "icofont-file-text"
                                  : "icofont-video-alt"
                              } mr-10px`}
                            ></i>
                            <span className="font-medium">
                              {lesson.type === "text" ? "Text" : "Video"} :
                            </span>{" "}
                            {lesson.title}
                          </h4>
                        </div>
                        <div className="text-blackColor dark:text-blackColor-dark text-sm flex items-center">
                          <p>
                            <i className="icofont-clock-time"></i>{" "}
                            {formatDuration(lesson.duration_seconds || 0)}
                          </p>
                          {lesson.status === "published" ? (
                            <Link
                              href={`/lessons/${lesson.id}`}
                              className="bg-primaryColor text-whiteColor text-sm ml-5 rounded py-0.5"
                            >
                              <p className="px-10px">
                                <i className="icofont-eye"></i> Watch Lesson
                              </p>
                            </Link>
                          ) : (
                            <p className="ml-5">
                              <i className="icofont-lock"></i>
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-contentColor dark:text-contentColor-dark">
                    No lessons available yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CurriculumContent;
