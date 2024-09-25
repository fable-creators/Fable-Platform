import Footer from "../Footer/Footer";
import Navbar from "../NavBar_Comp/Navbar";

interface PageTemplateProps {
  children: React.ReactNode;
  isNavbarVisible: boolean;
}

export default function PageTemplate({ children, isNavbarVisible }: PageTemplateProps) {
  return (
    <div className="fable-platform min-h-screen flex flex-col">
      <Navbar isVisible={isNavbarVisible} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}