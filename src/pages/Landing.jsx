import { Button } from "@/components/ui/button";
import { Form, Link, useNavigate } from "react-router-dom";
import ImageSrc from "../assets/laptop.png";
import { laptops } from "@/json/laptops.json";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag } from "lucide-react";

import SplitText from "@/components/animations/split-text";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCallback, useState } from "react";

gsap.registerPlugin(useGSAP);

function Hero() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0 });
    tl.from(".main-text", {
      duration: 1,
      ease: "bounce",
      opacity: 0,
    })
      .from(
        "#img",
        {
          duration: 1,
          opacity: 0,
          x: -100,
          stagger: 0.05,
          ease: "back",
        },
        "<",
      )
      .from(
        ".footer",
        {
          y: 50,
          ease: "power2.out",
        },
        "-=1/2",
      );
  });

  const handleSearch = useCallback(() => {
    const navTo = search.trim() ? `/products?search=${encodeURIComponent(search)}` : "/products";
    navigate(navTo);
  }, [search, navigate]);

  return (
    <div className="p- mx-auto mt-5 text-center sm:flex sm:justify-between">
      <div className="flex flex-col text-center sm:mt-10 sm:w-1/2 sm:text-left">
        <h2
          className={`main-text mb-4 justify-center gap-3 text-2xl font-bold max-sm:flex max-sm:text-nowrap sm:text-3xl md:text-4xl lg:text-5xl xl:text-nowrap ${isMobile ? "" : "lg-screen"}`}
        >
          Find the{" "}
          <SplitText
            text="Perfect"
            className="perfect block text-3xl uppercase sm:inline sm:text-4xl md:text-5xl lg:text-6xl"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
          Laptop
        </h2>
        <p
          className="secondary-text mb-6 text-sm sm:text-base lg:text-lg"
          id="img"
        >
          Performance laptops built for Work, Play, and Everything in Between.
        </p>
        <div className="flex w-full flex-col justify-center sm:justify-start sm:px-0 px-5 gap-3 sm:flex-row">
          <Link to="/products" id="img">
            <Button className="w-full sm:w-auto">
              Buy Now <ShoppingBag className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Form
            method="get"
            action="/products"
            className="flex w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            id="img"
          >
            <Input
              name="search"
              className="w-full rounded-r-none border-r-0 focus:border-muted-foreground focus:ring-0"
              placeholder="Find Your Laptop"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-l-none"
            >
              <Search className="h-4 w-4" />
            </Button>
          </Form>
        </div>
      </div>

      <div className="mt-8 flex justify-center sm:mt-0 sm:w-1/2">
        <img
          src={ImageSrc}
          alt="Hero Laptop"
          id="img"
          className="w-full max-w-sm md:max-w-md lg:max-w-md"
        />
      </div>
    </div>
  );
}

function Landing() {
  return (
    <section className="py-10">
      <Hero />
    </section>
  );
}

export default Landing;

{
  /* <SplitText
  text="Perfect"
  className="perfect block text-3xl uppercase sm:inline sm:text-4xl md:text-5xl lg:text-6xl"
  delay={150}
  animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
/> */
}
