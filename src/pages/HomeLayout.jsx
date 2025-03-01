import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "@/components/navbar/navigation-bar";
import Footer from "@/components/footer/Footer";

gsap.registerPlugin(useGSAP);

function HomeLayout() {
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1 });
    tl
      .from(
        ".nav",
        {
          y: -50,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=1",
      );
  });

  return (
    <div className="home-layout flex min-h-[100dvh] flex-col justify-between relative">
      <div className="container mx-auto mb-10 px-4 sm:px-6 lg:px-8 ">
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Toaster  />
      </div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
