import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="w-full lg:w-5xl mx-auto flex flex-col items-center justify-between min-h-screen">
      <nav className="w-full">
        <Navbar />
      </nav>
      <main className="w-full flex-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Welcome;
