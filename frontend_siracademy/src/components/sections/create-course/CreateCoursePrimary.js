"use client";

import dashboardImage4 from "@/assets/images/dashbord/dashbord__4.jpg";
import dashboardImage5 from "@/assets/images/dashbord/dashbord__5.jpg";
import dashboardImage7 from "@/assets/images/dashbord/dashbord__7.jpg";
import dashboardImage8 from "@/assets/images/dashbord/dashbord__8.jpg";
import dashboardImage9 from "@/assets/images/dashbord/dashbord__9.jpg";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import { apiClient } from "@/libs/api";
import accordions from "@/libs/accordions";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const slugify = (value) =>
  value
    ?.toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const courseSchema = z.object({
  title: z.string().min(3, "Title is required"),
  summary: z.string().min(10, "Short description is required"),
  description: z.string().min(20, "Description is required"),
  category_id: z.string().min(1, "Category is required"),
  level_id: z.string().min(1, "Level is required"),
  language: z.string().min(2, "Language is required"),
  thumbnail_path: z.string().min(5, "Thumbnail URL is required"),
  status: z.enum(["draft", "published"]),
  visibility: z.enum(["public", "members"]),
  preview_video_url: z.string().optional(),
});

const lessonSchema = z.object({
  title: z.string().min(3, "Lesson title is required"),
  type: z.enum(["video", "text"]),
  content: z.string().optional(),
  video_url: z.string().optional(),
  order: z.coerce.number().min(0),
  duration_seconds: z.coerce.number().min(0),
  status: z.enum(["draft", "published"]),
});

const quizSchema = z.object({
  title: z.string().min(3, "Quiz title is required"),
  description: z.string().optional(),
  pass_mark: z.coerce.number().min(0),
  status: z.enum(["draft", "published"]),
});

const questionSchema = z
  .object({
    question: z.string().min(5, "Question is required"),
    type: z.enum(["multiple_choice", "true_false"]),
    correctIndex: z.coerce.number().min(0),
    optionA: z.string().optional(),
    optionB: z.string().optional(),
    optionC: z.string().optional(),
    optionD: z.string().optional(),
  })
  .refine(
    (values) =>
      values.type === "true_false" ||
      (values.optionA && values.optionB),
    {
      message: "Option A and B are required",
      path: ["optionA"],
    }
  );

const CreateCoursePrimary = () => {
  const searchParams = useSearchParams();
  const existingCourseId = searchParams.get("courseId");
  const existingLessonId = searchParams.get("lessonId");
  const [courseId, setCourseId] = useState(existingCourseId || null);
  const [editingLessonId, setEditingLessonId] = useState(existingLessonId || null);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(false);
  const [loadingLesson, setLoadingLesson] = useState(false);
  const router = useRouter();

  const courseForm = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      summary: "",
      description: "",
      category_id: "",
      level_id: "",
      language: "en",
      thumbnail_path: "",
      status: "draft",
      visibility: "members",
      preview_video_url: "",
    },
  });

  const lessonForm = useForm({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      type: "video",
      content: "",
      video_url: "",
      order: 1,
      duration_seconds: 0,
      status: "draft",
    },
  });

  const quizForm = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      description: "",
      pass_mark: 60,
      status: "draft",
    },
  });

  const questionForm = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      type: "multiple_choice",
      correctIndex: 0,
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
    },
  });

  const fetchOptions = async () => {
    try {
      const [cats, lvls] = await Promise.all([
        apiClient.get("/v1/categories"),
        apiClient.get("/v1/levels"),
      ]);
      setCategories(cats?.data?.data || []);
      setLevels(lvls?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load categories or levels.");
    }
  };

  const loadCourse = useCallback(async (id) => {
    if (!id) return;
    try {
      const response = await apiClient.get(`/v1/courses/${id}`);
      const course = response?.data?.data;
      if (!course) return;
      courseForm.reset({
        title: course.title || "",
        summary: course.summary || "",
        description: course.description || "",
        category_id: course?.categories?.[0]?.id?.toString() || "",
        level_id: course.level_id?.toString() || "",
        language: course.language || "en",
        thumbnail_path: course.thumbnail_path || "",
        status: course.status || "draft",
        visibility: course.visibility || "members",
        preview_video_url: course.preview_video_url || "",
      });
    } catch (error) {
      toast.error("Failed to load course.");
    }
  }, [courseForm]);

  const loadLesson = useCallback(async (id) => {
    if (!id) return;
    setLoadingLesson(true);
    try {
      const response = await apiClient.get(`/v1/lessons/${id}`);
      const lesson = response?.data?.data;
      if (!lesson) return;
      setCourseId(lesson.course_id?.toString() || null);
      setEditingLessonId(lesson.id?.toString() || null);
      lessonForm.reset({
        title: lesson.title || "",
        type: lesson.type || "video",
        content: lesson.content || "",
        video_url: lesson.video_url || "",
        order: lesson.order ?? 1,
        duration_seconds: lesson.duration_seconds ?? 0,
        status: lesson.status || "draft",
      });
      if (!existingCourseId && lesson.course_id) {
        loadCourse(lesson.course_id);
      }
    } catch (error) {
      toast.error("Failed to load lesson.");
    } finally {
      setLoadingLesson(false);
    }
  }, [existingCourseId, lessonForm, loadCourse]);

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    accordions();
  }, []);

  useEffect(() => {
    if (existingCourseId) {
      loadCourse(existingCourseId);
    }
  }, [existingCourseId, loadCourse]);

  useEffect(() => {
    if (existingLessonId) {
      loadLesson(existingLessonId);
    }
  }, [existingLessonId, loadLesson]);

  const handleCourseSubmit = async (values) => {
    setLoadingCourse(true);
    const payload = {
      title: values.title,
      slug: slugify(values.title),
      summary: values.summary,
      description: values.description,
      language: values.language,
      level_id: Number(values.level_id),
      category_ids: [Number(values.category_id)],
      status: values.status,
      visibility: values.visibility,
      preview_video_url: values.preview_video_url || null,
      thumbnail_path: values.thumbnail_path,
      is_free: true,
      regular_price: null,
      sale_price: null,
      published_at: values.status === "published" ? new Date().toISOString() : null,
    };

    try {
      const response = courseId
        ? await apiClient.put(`/v1/courses/${courseId}`, payload)
        : await apiClient.post("/v1/courses", payload);
      const created = response?.data?.data;
      if (!created) {
        toast.error("Course save failed.");
        return;
      }
      setCourseId(created.id);
      toast.success(courseId ? "Course updated." : "Course created.");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Course save failed.";
      toast.error(String(message));
    } finally {
      setLoadingCourse(false);
    }
  };

  const handleLessonSubmit = async (values) => {
    if (!courseId) {
      toast.error("Create the course first.");
      return;
    }
    const payload = {
      course_id: Number(courseId),
      title: values.title,
      ...(editingLessonId ? {} : { slug: slugify(values.title) }),
      type: values.type,
      content: values.type === "text" ? values.content : null,
      video_url: values.type === "video" ? values.video_url : null,
      order: values.order,
      duration_seconds: values.duration_seconds || 0,
      status: values.status,
      language: courseForm.getValues("language"),
      published_at: values.status === "published" ? new Date().toISOString() : null,
    };

    try {
      if (editingLessonId) {
        await apiClient.put(`/v1/lessons/${editingLessonId}`, payload);
        toast.success("Lesson updated.");
        setEditingLessonId(null);
        const params = courseId ? `?courseId=${courseId}` : "";
        router.replace(`/dashboards/create-course${params}`);
      } else {
        await apiClient.post("/v1/lessons", payload);
        toast.success("Lesson added.");
        lessonForm.reset({
          title: "",
          type: values.type,
          content: "",
          video_url: "",
          order: values.order + 1,
          duration_seconds: 0,
          status: "draft",
        });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Lesson creation failed.";
      toast.error(String(message));
    }
  };

  const handleQuizSubmit = async (values) => {
    if (!courseId) {
      toast.error("Create the course first.");
      return;
    }
    const payload = {
      course_id: Number(courseId),
      title: values.title,
      slug: slugify(values.title),
      description: values.description || null,
      pass_mark: values.pass_mark,
      status: values.status,
      language: courseForm.getValues("language"),
      published_at: values.status === "published" ? new Date().toISOString() : null,
    };

    try {
      const response = await apiClient.post("/v1/quizzes", payload);
      const created = response?.data?.data;
      if (!created) {
        toast.error("Quiz creation failed.");
        return;
      }
      setQuizId(created.id);
      toast.success("Quiz created. Add questions below.");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Quiz creation failed.";
      toast.error(String(message));
    }
  };

  const handleQuestionSubmit = async (values) => {
    if (!quizId) {
      toast.error("Create a quiz first.");
      return;
    }
    try {
      const questionResponse = await apiClient.post("/v1/quiz-questions", {
        quiz_id: Number(quizId),
        question: values.question,
        type: values.type === "true_false" ? "true_false" : "multiple_choice",
        order: 1,
      });
      const question = questionResponse?.data?.data;
      if (!question) {
        toast.error("Question creation failed.");
        return;
      }

      const options = values.type === "true_false"
        ? ["True", "False"]
        : [values.optionA, values.optionB, values.optionC, values.optionD].filter(Boolean);

      await Promise.all(
        options.map((option, index) =>
          apiClient.post("/v1/quiz-options", {
            quiz_question_id: question.id,
            option_text: option,
            is_correct: index === Number(values.correctIndex),
            order: index + 1,
          })
        )
      );

      toast.success("Question added.");
      questionForm.reset({
        question: "",
        type: values.type,
        correctIndex: 0,
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
      });
    } catch (error) {
      toast.error("Question save failed.");
    }
  };

  const lessonType = lessonForm.watch("type");
  const quizType = questionForm.watch("type");

  const categoryOptions = useMemo(
    () => categories.map((item) => ({ id: item.id, name: item.name })),
    [categories]
  );

  const levelOptions = useMemo(
    () => levels.map((item) => ({ id: item.id, name: item.name })),
    [levels]
  );

  return (
    <div>
      <div className="container pt-100px pb-100px" data-aos="fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-30px gap-y-5">
          <div data-aos="fade-up" className="lg:col-start-1 lg:col-span-8">
            <ul className="accordion-container curriculum create-course">
              <li className={`accordion mb-5 ${editingLessonId ? "" : "active"}`}>
                <div className="bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-t-md">
                  <div className="py-5 px-30px">
                    <div className="cursor-pointer accordion-controller flex justify-between items-center text-lg text-headingColor font-semibold w-full dark:text-headingColor-dark font-hind leading-27px rounded-t-md">
                      <div>
                        <span>Course Info</span>
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
                  <div className="accordion-content transition-all duration-500 overflow-hidden">
                    <div className="content-wrapper py-4 px-5">
                      <form
                        className="p-10px md:p-10 lg:p-5 2xl:p-10 bg-darkdeep3 dark:bg-transparent text-sm text-blackColor dark:text-blackColor-dark leading-1.8"
                        data-aos="fade-up"
                        onSubmit={courseForm.handleSubmit(handleCourseSubmit)}
                      >
                        <div className="grid grid-cols-1 mb-15px gap-15px">
                          <div>
                            <label className="mb-3 block font-semibold">
                              Course Title
                            </label>
                            <input
                              type="text"
                              placeholder="Course Title"
                              {...courseForm.register("title")}
                              className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                            />
                            {courseForm.formState.errors.title ? (
                              <p className="text-sm text-red-500 mt-2">
                                {String(courseForm.formState.errors.title.message)}
                              </p>
                            ) : null}
                          </div>
                          <div>
                            <label className="mb-3 block font-semibold">
                              Short Description
                            </label>
                            <input
                              type="text"
                              placeholder="Short Description"
                              {...courseForm.register("summary")}
                              className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                            />
                            {courseForm.formState.errors.summary ? (
                              <p className="text-sm text-red-500 mt-2">
                                {String(courseForm.formState.errors.summary.message)}
                              </p>
                            ) : null}
                          </div>
                          <div>
                            <label className="mb-3 block font-semibold">
                              Category
                            </label>
                            <div className="bg-whiteColor relative rounded-md">
                              <select
                                {...courseForm.register("category_id")}
                                className="text-base bg-transparent text-blackColor2 w-full p-13px pr-30px focus:outline-none block appearance-none relative z-20 focus:shadow-select rounded-md"
                              >
                                <option value="">Select Category</option>
                                {categoryOptions.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {String(item.name)}
                                  </option>
                                ))}
                              </select>
                              <i className="icofont-simple-down absolute top-1/2 right-3 -translate-y-1/2 block text-lg z-10"></i>
                            </div>
                            {courseForm.formState.errors.category_id ? (
                              <p className="text-sm text-red-500 mt-2">
                                {String(courseForm.formState.errors.category_id.message)}
                              </p>
                            ) : null}
                          </div>
                          <div>
                            <label className="mb-3 block font-semibold">
                              Level
                            </label>
                            <div className="bg-whiteColor relative rounded-md">
                              <select
                                {...courseForm.register("level_id")}
                                className="text-base bg-transparent text-blackColor2 w-full p-13px pr-30px focus:outline-none block appearance-none relative z-20 focus:shadow-select rounded-md"
                              >
                                <option value="">Select Level</option>
                                {levelOptions.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {String(item.name)}
                                  </option>
                                ))}
                              </select>
                              <i className="icofont-simple-down absolute top-1/2 right-3 -translate-y-1/2 block text-lg z-10"></i>
                            </div>
                            {courseForm.formState.errors.level_id ? (
                              <p className="text-sm text-red-500 mt-2">
                                {String(courseForm.formState.errors.level_id.message)}
                              </p>
                            ) : null}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-30px">
                            <div>
                              <label className="mb-3 block font-semibold">
                                Language
                              </label>
                              <input
                                type="text"
                                placeholder="English"
                                {...courseForm.register("language")}
                                className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                              />
                            </div>
                            <div>
                              <label className="mb-3 block font-semibold">
                                Visibility
                              </label>
                              <div className="bg-whiteColor relative rounded-md">
                                <select
                                  {...courseForm.register("visibility")}
                                  className="text-base bg-transparent text-blackColor2 w-full p-13px pr-30px focus:outline-none block appearance-none relative z-20 focus:shadow-select rounded-md"
                                >
                                  <option value="members">Members-only</option>
                                  <option value="public">Public</option>
                                </select>
                                <i className="icofont-simple-down absolute top-1/2 right-3 -translate-y-1/2 block text-lg z-10"></i>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="mb-3 block font-semibold">
                              Thumbnail URL
                            </label>
                            <input
                              type="text"
                              placeholder="https://..."
                              {...courseForm.register("thumbnail_path")}
                              className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                            />
                            {courseForm.formState.errors.thumbnail_path ? (
                              <p className="text-sm text-red-500 mt-2">
                                {String(courseForm.formState.errors.thumbnail_path.message)}
                              </p>
                            ) : null}
                          </div>
                          <div>
                            <label className="mb-3 block font-semibold">
                              Course Description
                            </label>
                            <textarea
                              {...courseForm.register("description")}
                              className="w-full py-10px px-5 text-sm text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
                              rows="6"
                            />
                            {courseForm.formState.errors.description ? (
                              <p className="text-sm text-red-500 mt-2">
                                {String(courseForm.formState.errors.description.message)}
                              </p>
                            ) : null}
                          </div>
                          <div>
                            <label className="mb-3 block font-semibold">
                              Status
                            </label>
                            <div className="bg-whiteColor relative rounded-md">
                              <select
                                {...courseForm.register("status")}
                                className="text-base bg-transparent text-blackColor2 w-full p-13px pr-30px focus:outline-none block appearance-none relative z-20 focus:shadow-select rounded-md"
                              >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                              </select>
                              <i className="icofont-simple-down absolute top-1/2 right-3 -translate-y-1/2 block text-lg z-10"></i>
                            </div>
                          </div>
                        </div>
                        <div className="mt-15px">
                          <ButtonPrimary type="submit" disabled={loadingCourse}>
                            {loadingCourse ? "Saving..." : "Save Course"}
                          </ButtonPrimary>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
              <li className={`accordion mb-5 ${editingLessonId ? "active" : ""}`}>
                <div className="bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark">
                  <div className="py-5 px-30px">
                    <div className="cursor-pointer accordion-controller flex justify-between items-center text-lg text-headingColor font-semibold w-full dark:text-headingColor-dark font-hind leading-27px">
                      <div>
                        <span>Course Intro Video</span>
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
                  <div className="accordion-content transition-all duration-500 overflow-hidden h-0">
                    <div className="content-wrapper py-4 px-5">
                      <div className="p-10px md:p-10 lg:p-5 2xl:p-10 bg-darkdeep3 dark:bg-transparent text-sm text-blackColor dark:text-blackColor-dark leading-1.8">
                        <label className="mb-3 block font-semibold">
                          Intro Video URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://www.youtube.com/watch?v=..."
                          {...courseForm.register("preview_video_url")}
                          className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="accordion mb-5">
                <div className="bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark">
                  <div className="py-5 px-30px">
                    <div className="cursor-pointer accordion-controller flex justify-between items-center text-lg text-headingColor font-semibold w-full dark:text-headingColor-dark font-hind leading-27px">
                      <div>
                        <span>Lessons</span>
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
                  <div className="accordion-content transition-all duration-500 overflow-hidden h-0">
                    <div className="content-wrapper py-4 px-5">
                      <form
                        className="p-10px md:p-10 lg:p-5 2xl:p-10 bg-darkdeep3 dark:bg-transparent text-sm text-blackColor dark:text-blackColor-dark leading-1.8"
                        onSubmit={lessonForm.handleSubmit(handleLessonSubmit)}
                      >
                        <div className="grid grid-cols-1 gap-15px">
                          <div>
                            <label className="mb-3 block font-semibold">
                              Lesson Title
                            </label>
                            <input
                              type="text"
                              placeholder="Lesson title"
                              {...lessonForm.register("title")}
                              className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                            />
                            {lessonForm.formState.errors.title ? (
                              <p className="text-sm text-red-500 mt-2">
                                {String(lessonForm.formState.errors.title.message)}
                              </p>
                            ) : null}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-30px">
                            <div>
                              <label className="mb-3 block font-semibold">
                                Lesson Type
                              </label>
                              <div className="bg-whiteColor relative rounded-md">
                                <select
                                  {...lessonForm.register("type")}
                                  className="text-base bg-transparent text-blackColor2 w-full p-13px pr-30px focus:outline-none block appearance-none relative z-20 focus:shadow-select rounded-md"
                                >
                                  <option value="video">Video</option>
                                  <option value="text">Text</option>
                                </select>
                                <i className="icofont-simple-down absolute top-1/2 right-3 -translate-y-1/2 block text-lg z-10"></i>
                              </div>
                            </div>
                            <div>
                              <label className="mb-3 block font-semibold">
                                Status
                              </label>
                              <div className="bg-whiteColor relative rounded-md">
                                <select
                                  {...lessonForm.register("status")}
                                  className="text-base bg-transparent text-blackColor2 w-full p-13px pr-30px focus:outline-none block appearance-none relative z-20 focus:shadow-select rounded-md"
                                >
                                  <option value="draft">Draft</option>
                                  <option value="published">Published</option>
                                </select>
                                <i className="icofont-simple-down absolute top-1/2 right-3 -translate-y-1/2 block text-lg z-10"></i>
                              </div>
                            </div>
                          </div>
                          {lessonType === "video" ? (
                            <div>
                              <label className="mb-3 block font-semibold">
                                Video URL
                              </label>
                              <input
                                type="text"
                                placeholder="https://www.youtube.com/..."
                                {...lessonForm.register("video_url")}
                                className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                              />
                            </div>
                          ) : (
                            <div>
                              <label className="mb-3 block font-semibold">
                                Lesson Content
                              </label>
                              <textarea
                                rows="4"
                                {...lessonForm.register("content")}
                                className="w-full py-10px px-5 text-sm text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
                              />
                            </div>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-30px">
                            <div>
                              <label className="mb-3 block font-semibold">
                                Order
                              </label>
                              <input
                                type="number"
                                {...lessonForm.register("order")}
                                className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                              />
                            </div>
                            <div>
                              <label className="mb-3 block font-semibold">
                                Duration (seconds)
                              </label>
                              <input
                                type="number"
                                {...lessonForm.register("duration_seconds")}
                                className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-15px">
                          <div className="flex flex-wrap gap-3">
                            <ButtonPrimary type="submit" disabled={loadingLesson}>
                              {loadingLesson
                                ? "Saving..."
                                : editingLessonId
                                ? "Update Lesson"
                                : "Add Lesson"}
                            </ButtonPrimary>
                            {editingLessonId ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingLessonId(null);
                                  const params = courseId ? `?courseId=${courseId}` : "";
                                  router.replace(`/dashboards/create-course${params}`);
                                  lessonForm.reset({
                                    title: "",
                                    type: "video",
                                    content: "",
                                    video_url: "",
                                    order: 1,
                                    duration_seconds: 0,
                                    status: "draft",
                                  });
                                }}
                                className="text-sm px-5 py-2 rounded border border-borderColor dark:border-borderColor-dark text-contentColor dark:text-contentColor-dark hover:bg-darkdeep3 dark:hover:bg-darkdeep3-dark"
                              >
                                Cancel Edit
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
              <li className="accordion mb-5">
                <div className="bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark">
                  <div className="py-5 px-30px">
                    <div className="cursor-pointer accordion-controller flex justify-between items-center text-lg text-headingColor font-semibold w-full dark:text-headingColor-dark font-hind leading-27px">
                      <div>
                        <span>Quizzes & Tests</span>
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
                  <div className="accordion-content transition-all duration-500 overflow-hidden h-0">
                    <div className="content-wrapper py-4 px-5">
                      <form
                        className="p-10px md:p-10 lg:p-5 2xl:p-10 bg-darkdeep3 dark:bg-transparent text-sm text-blackColor dark:text-blackColor-dark leading-1.8"
                        onSubmit={quizForm.handleSubmit(handleQuizSubmit)}
                      >
                        <div className="grid grid-cols-1 gap-15px">
                          <div>
                            <label className="mb-3 block font-semibold">
                              Quiz Title
                            </label>
                            <input
                              type="text"
                              {...quizForm.register("title")}
                              placeholder="Quiz title"
                              className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                            />
                            {quizForm.formState.errors.title ? (
                              <p className="text-sm text-red-500 mt-2">
                                {String(quizForm.formState.errors.title.message)}
                              </p>
                            ) : null}
                          </div>
                          <div>
                            <label className="mb-3 block font-semibold">
                              Quiz Description
                            </label>
                            <textarea
                              rows="3"
                              {...quizForm.register("description")}
                              className="w-full py-10px px-5 text-sm text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-30px">
                            <div>
                              <label className="mb-3 block font-semibold">
                                Pass Mark (%)
                              </label>
                              <input
                                type="number"
                                {...quizForm.register("pass_mark")}
                                className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                              />
                            </div>
                            <div>
                              <label className="mb-3 block font-semibold">
                                Status
                              </label>
                              <div className="bg-whiteColor relative rounded-md">
                                <select
                                  {...quizForm.register("status")}
                                  className="text-base bg-transparent text-blackColor2 w-full p-13px pr-30px focus:outline-none block appearance-none relative z-20 focus:shadow-select rounded-md"
                                >
                                  <option value="draft">Draft</option>
                                  <option value="published">Published</option>
                                </select>
                                <i className="icofont-simple-down absolute top-1/2 right-3 -translate-y-1/2 block text-lg z-10"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-15px">
                          <ButtonPrimary type="submit">Create Quiz</ButtonPrimary>
                        </div>
                      </form>

                      <form
                        className="mt-10 p-10px md:p-10 lg:p-5 2xl:p-10 bg-darkdeep3 dark:bg-transparent text-sm text-blackColor dark:text-blackColor-dark leading-1.8"
                        onSubmit={questionForm.handleSubmit(handleQuestionSubmit)}
                      >
                        <div className="grid grid-cols-1 gap-15px">
                          <div>
                            <label className="mb-3 block font-semibold">
                              Question
                            </label>
                            <input
                              type="text"
                              {...questionForm.register("question")}
                              placeholder="Question text"
                              className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-30px">
                            <div>
                              <label className="mb-3 block font-semibold">
                                Question Type
                              </label>
                              <div className="bg-whiteColor relative rounded-md">
                                <select
                                  {...questionForm.register("type")}
                                  className="text-base bg-transparent text-blackColor2 w-full p-13px pr-30px focus:outline-none block appearance-none relative z-20 focus:shadow-select rounded-md"
                                >
                                  <option value="multiple_choice">
                                    Multiple Choice
                                  </option>
                                  <option value="true_false">True / False</option>
                                </select>
                                <i className="icofont-simple-down absolute top-1/2 right-3 -translate-y-1/2 block text-lg z-10"></i>
                              </div>
                            </div>
                            <div>
                              <label className="mb-3 block font-semibold">
                                Correct Option Index
                              </label>
                              <input
                                type="number"
                                {...questionForm.register("correctIndex")}
                                className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                              />
                            </div>
                          </div>

                          {quizType === "true_false" ? (
                            <p className="text-xs text-contentColor dark:text-contentColor-dark">
                              True/False options will be generated automatically.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-30px">
                              <div>
                                <label className="mb-3 block font-semibold">
                                  Option A
                                </label>
                                <input
                                  type="text"
                                  {...questionForm.register("optionA")}
                                  className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                                />
                              </div>
                              <div>
                                <label className="mb-3 block font-semibold">
                                  Option B
                                </label>
                                <input
                                  type="text"
                                  {...questionForm.register("optionB")}
                                  className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                                />
                              </div>
                              <div>
                                <label className="mb-3 block font-semibold">
                                  Option C
                                </label>
                                <input
                                  type="text"
                                  {...questionForm.register("optionC")}
                                  className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                                />
                              </div>
                              <div>
                                <label className="mb-3 block font-semibold">
                                  Option D
                                </label>
                                <input
                                  type="text"
                                  {...questionForm.register("optionD")}
                                  className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-15px">
                          <ButtonPrimary type="submit">Add Question</ButtonPrimary>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
              <li className="accordion mb-5">
                <div className="bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-b-md">
                  <div className="cursor-pointer py-5 px-30px">
                    <div className="accordion-controller flex justify-between items-center text-lg text-headingColor font-semibold w-full dark:text-headingColor-dark font-hind leading-27px rounded-b-md">
                      <div>
                        <span>Certificate Template</span>
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
                  <div className="accordion-content transition-all duration-500 overflow-hidden h-0">
                    <div className="content-wrapper py-4 px-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-30px gap-y-5">
                        {[dashboardImage8, dashboardImage4, dashboardImage5, dashboardImage9, dashboardImage7, dashboardImage8].map(
                          (img, idx) => (
                            <div key={idx}>
                              <Image src={img} className="w-full" alt="" />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-10 leading-1.8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-30px gap-y-5">
              <div data-aos="fade-up" className="lg:col-start-1 lg:col-span-4">
                <a
                  href="/courses"
                  className="text-whiteColor bg-primaryColor w-full p-13px hover:text-whiteColor hover:bg-secondaryColor inline-block rounded group dark:hover:text-whiteColor dark:hover:bg-secondaryColor text-center"
                >
                  Preview
                </a>
              </div>

              <div data-aos="fade-up" className="lg:col-start-5 lg:col-span-8">
                <button
                  type="button"
                  onClick={courseForm.handleSubmit(handleCourseSubmit)}
                  className="text-whiteColor bg-primaryColor w-full p-13px hover:text-whiteColor hover:bg-secondaryColor inline-block rounded group dark:hover:text-whiteColor dark:hover:bg-secondaryColor text-center"
                >
                  {courseId ? "Update Course" : "Create Course"}
                </button>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" className="lg:col-start-9 lg:col-span-4">
            <div className="p-30px border-2 border-primaryColor">
              <ul>
                <li className="my-7px flex gap-10px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check flex-shrink-0"
                  >
                    <polyline
                      points="20 6 9 17 4 12"
                      className="text-greencolor"
                    ></polyline>
                  </svg>
                  <p className="text-lg text-contentColor dark:text-contentColor-dark leading-1.45">
                    Courses are included with academy membership.
                  </p>
                </li>
                <li className="my-7px flex gap-10px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check flex-shrink-0"
                  >
                    <polyline
                      points="20 6 9 17 4 12"
                      className="text-greencolor"
                    ></polyline>
                  </svg>
                  <p className="text-lg text-contentColor dark:text-contentColor-dark leading-1.45">
                    Use Draft status while preparing content.
                  </p>
                </li>
                <li className="my-7px flex gap-10px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check flex-shrink-0"
                  >
                    <polyline
                      points="20 6 9 17 4 12"
                      className="text-greencolor"
                    ></polyline>
                  </svg>
                  <p className="text-lg text-contentColor dark:text-contentColor-dark leading-1.45">
                    Publish when ready to make courses visible.
                  </p>
                </li>
                <li className="my-7px flex gap-10px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check flex-shrink-0"
                  >
                    <polyline
                      points="20 6 9 17 4 12"
                      className="text-greencolor"
                    ></polyline>
                  </svg>
                  <p className="text-lg text-contentColor dark:text-contentColor-dark leading-1.45">
                    Add lessons and quizzes after saving the course.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePrimary;
