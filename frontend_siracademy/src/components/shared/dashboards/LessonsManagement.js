"use client";

import HeadingDashboard from "@/components/shared/headings/HeadingDashboard";
import { apiClient } from "@/libs/api";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const LessonsManagement = ({ title }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  const hasLessons = useMemo(() => lessons.length > 0, [lessons]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/v1/lessons/manage", {
        params: { paginate: false },
      });
      setLessons(response?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load lessons.");
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const startEdit = (lesson) => {
    const params = new URLSearchParams();
    if (lesson.course_id) params.set("courseId", lesson.course_id);
    params.set("lessonId", lesson.id);
    router.push(`/dashboards/create-course?${params.toString()}`);
  };

  const handleDelete = async (lessonId) => {
    const confirmed = window.confirm("Delete this lesson?");
    if (!confirmed) return;
    setDeletingId(lessonId);
    try {
      await apiClient.delete(`/v1/lessons/${lessonId}`);
      setLessons((prev) => prev.filter((lesson) => lesson.id !== lessonId));
      toast.success("Lesson deleted.");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Lesson delete failed.";
      toast.error(String(message));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <HeadingDashboard>{title}</HeadingDashboard>

      {loading ? (
        <p className="text-sm text-contentColor dark:text-contentColor-dark">
          Loading lessons...
        </p>
      ) : hasLessons ? (
        <div className="overflow-auto">
          <table className="w-full text-left">
            <thead className="text-sm text-blackColor dark:text-blackColor-dark">
              <tr>
                <th className="p-4 border-b border-borderColor dark:border-borderColor-dark">
                  Lesson
                </th>
                <th className="p-4 border-b border-borderColor dark:border-borderColor-dark">
                  Course
                </th>
                <th className="p-4 border-b border-borderColor dark:border-borderColor-dark">
                  Type
                </th>
                <th className="p-4 border-b border-borderColor dark:border-borderColor-dark">
                  Status
                </th>
                <th className="p-4 border-b border-borderColor dark:border-borderColor-dark">
                  Duration
                </th>
                <th className="p-4 border-b border-borderColor dark:border-borderColor-dark">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="text-sm">
                  <td className="p-4 border-b border-borderColor dark:border-borderColor-dark">
                    <p className="font-semibold text-blackColor dark:text-blackColor-dark">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-contentColor dark:text-contentColor-dark">
                      Order: {lesson.order ?? 0}
                    </p>
                  </td>
                  <td className="p-4 border-b border-borderColor dark:border-borderColor-dark">
                    {lesson.course?.title || "-"}
                  </td>
                  <td className="p-4 border-b border-borderColor dark:border-borderColor-dark capitalize">
                    {lesson.type}
                  </td>
                  <td className="p-4 border-b border-borderColor dark:border-borderColor-dark capitalize">
                    {lesson.status}
                  </td>
                  <td className="p-4 border-b border-borderColor dark:border-borderColor-dark">
                    {lesson.duration_seconds ? `${lesson.duration_seconds}s` : "Self paced"}
                  </td>
                  <td className="p-4 border-b border-borderColor dark:border-borderColor-dark">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(lesson)}
                        className="px-3 py-1 text-xs rounded bg-primaryColor text-whiteColor hover:bg-secondaryColor"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(lesson.id)}
                        disabled={deletingId === lesson.id}
                        className="px-3 py-1 text-xs rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-whiteColor disabled:opacity-60"
                      >
                        {deletingId === lesson.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-contentColor dark:text-contentColor-dark">
          No lessons available.
        </p>
      )}
    </div>
  );
};

export default LessonsManagement;
