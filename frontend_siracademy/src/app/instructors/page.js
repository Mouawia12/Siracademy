import InstructorMain from "@/components/layout/main/InstructorMain";
import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Faculty & Coaches | Sir Academy",
  description:
    "Meet our leadership faculty, mentors, and executive coaches.",
};
const Instructors = () => {
  return (
    <PageWrapper>
      <main>
        <InstructorMain />
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default Instructors;
