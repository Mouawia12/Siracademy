import CoursesMain from "@/components/layout/main/CoursesMain";

import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Programs | Sir Academy",
  description:
    "Explore leadership programs, professional courses, and executive pathways.",
};

const Courses = async () => {
  return (
    <PageWrapper>
      <main>
        <CoursesMain />
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default Courses;
