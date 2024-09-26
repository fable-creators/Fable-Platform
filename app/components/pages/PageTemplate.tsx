import Footer from "../Footer/Footer";
import Navbar from "../NavBar_Comp/Navbar";

interface PageTemplateProps {
  children: React.ReactNode;
  isNavbarVisible: boolean;
}

export default function PageTemplate({
  children,
  isNavbarVisible,
}: PageTemplateProps) {
  return (
    <div className="fable-platform min-h-screen flex flex-col bg-sand dark:bg-midnight">
      <Navbar isVisible={isNavbarVisible} />
      <main className="flex-grow text-coffee dark:text-sky">{children}</main>
      <Footer />
    </div>
  );
}
