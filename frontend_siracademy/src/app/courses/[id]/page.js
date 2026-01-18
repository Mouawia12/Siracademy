import CourseDetailsMain from "@/components/layout/main/CourseDetailsMain";
import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
export const metadata = {
  title: "Course Details | Edurock - Education LMS Template",
  description: "Course Details | Edurock - Education LMS Template",
};

const Course_Details = ({ params }) => {
  const { id } = params;
  return (
    <PageWrapper>
      <main>
        <CourseDetailsMain id={id} />
        <ThemeController />
      </main>
    </PageWrapper>
  );
};
export default Course_Details;
