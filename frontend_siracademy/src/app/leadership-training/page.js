import CoursesMain from "@/components/layout/main/CoursesMain";
import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Leadership Training | Sir Academy",
  description:
    "Leadership training pathways, executive coaching, and professional qualifications.",
};

const LeadershipTraining = () => {
  return (
    <PageWrapper>
      <main>
        <CoursesMain />
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default LeadershipTraining;
