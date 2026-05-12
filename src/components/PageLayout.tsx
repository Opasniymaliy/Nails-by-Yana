import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-16">{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
