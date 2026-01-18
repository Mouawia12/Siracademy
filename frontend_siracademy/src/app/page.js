import Home2 from "@/components/layout/main/Home2";
import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <main>
        <Home2 />
        <ThemeController />
      </main>
    </PageWrapper>
  );
}
