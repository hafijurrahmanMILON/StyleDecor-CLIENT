import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";

const MainLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 w-full z-50">
        <Navbar />
      </header>
      <main className="flex-1 pt-8 lg:pt-0">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
