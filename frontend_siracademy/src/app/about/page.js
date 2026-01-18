import AboutMain from "@/components/layout/main/AboutMain";

import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "About the Academy | Sir Academy",
  description:
    "Learn about Sir Academy and our leadership, coaching, and qualification approach.",
};

const About = async () => {
  return (
    <PageWrapper>
      <main>
        <AboutMain />
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default About;
