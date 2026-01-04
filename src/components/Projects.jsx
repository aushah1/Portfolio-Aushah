import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

const Projects = () => {
  const stickySectionRef = useRef(null);
  const countContainerRef = useRef(null);
  const lenisRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    lenisRef.current = new Lenis();
    lenisRef.current.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    let totalCards = 5;
    const stickyHeight = window.innerHeight * (totalCards + 2);
    const cards = Array.from(document.querySelectorAll(".card"));

    const scrollTrigger = ScrollTrigger.create({
      trigger: stickySectionRef.current,
      start: "top top",
      end: `+=${stickyHeight}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        positionCards(self.progress);
      },
    });

    positionCards(0);

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0% 0%",
      threshold: 0.5,
    });

    cards.forEach((card) => observerRef.current.observe(card));

    const resizeHandler = () => positionCards(0);
    window.addEventListener("resize", resizeHandler);

    return () => {
      scrollTrigger.kill();
      observerRef.current.disconnect();
      window.removeEventListener("resize", resizeHandler);
      lenisRef.current.destroy();
      gsap.ticker.remove(() => lenisRef.current.raf());
    };
  }, []);

  const getRadius = () => {
    if (window.innerWidth < 768) return window.innerWidth * 6.5;
    if (window.innerWidth < 1200) return window.innerWidth * 3.5;
    return window.innerWidth * 3.5;
  };

  const positionCards = (progress = 0) => {
    const totalCards = document.querySelectorAll(".card").length;
    const radius = getRadius();
    let arcAngle;
    if (window.innerWidth >= 1200) {
      arcAngle = Math.PI * 0.4;
    } else if (window.innerWidth < 768) {
      arcAngle = Math.PI * 0.35; // Tighter angle for mobile
    } else {
      arcAngle = Math.PI * 0.4;
    }
    const startAngle = Math.PI / 2 - arcAngle / 2;
    const totalTravel = 1 + totalCards / 5;
    const adjustedProgress = (progress * totalTravel - 1) * 0.75;

    document.querySelectorAll(".card").forEach((card, i) => {
      const normalizedProgress = (totalCards - 1 - i) / totalCards;
      const cardProgress = normalizedProgress + adjustedProgress;
      const angle = startAngle + arcAngle * cardProgress;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

      gsap.set(card, {
        x: x,
        y: -y + radius,
        rotation: -rotation,
        transformOrigin: "center center",
      });
    });
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentCardIndex = Array.from(
          document.querySelectorAll(".card")
        ).indexOf(entry.target);
        const targetY = -(currentCardIndex + 1) * 150;

        gsap.to(document.querySelector(".count-container"), {
          y: targetY,
          duration: 0.3,
          ease: "power1.out",
          overwrite: true,
        });
      }
    });
  };

  const projectsData = [
    {
      image: "project1.png",
      name: "patreon website",
      description:
        "FundAura is a Patreon-based platform I created to connect with supporters.",
      demoLink: "#",
      githubLink: "https://github.com/aushah1/FundAura",
    },
    {
      image: "project2.png",
      name: "SecuKey",
      description: "A password manager to save all your passwords.",
      demoLink: "https://secu-key.vercel.app",
      githubLink: "https://github.com/aushah1/SecuKey.git",
    },
    {
      image: "project3.png",
      name: "Online Chess Game",
      description:
        "A multiplayer Chess game where playesrs can play with each other.",
      demoLink: "https://chess-gameplay.vercel.app",
      githubLink: "https://github.com/aushah1/Chess-game.git",
    },
    {
      image: "project4.png",
      name: "Trendzy",
      description: "An e-commerce platform with cart and product pages.",
      demoLink: "https://trenddzy.netlify.app",
      githubLink: "https://github.com/aushah1/ShopSphere.git",
    },
    {
      image: "project5.png",
      name: "Sidcup Golf Experience",
      description:
        "A pixel accurate recreation of the Sidcup Family Golf website focusing on layout, interactivity, and responsiveness. ",
      demoLink: "https://aushah1.github.io/Sidcup-Golf/",
      githubLink: "https://github.com/aushah1/Sidcup-Golf.git",
    },
  ];

  return (
    <section
      id="projects"
      className="steps relative w-full h-screen overflow-hidden"
      ref={stickySectionRef}>
      <div className="step-counter absolute flex flex-col my-8 mx-3 md:mx-8">
        <div className="counter-title relative w-[1200px] h-[150px] clip-path-polygon overflow-hidden">
          <h1 className="relative text-white uppercase font-black text-[80px] md:text-[150px] leading-none tracking-tighter will-change-transform">
            Project
          </h1>
        </div>
        <div className="count relative top-0 w-[1200px] h-[150px] clip-path-polygon overflow-hidden">
          <div className="count-container relative" ref={countContainerRef}>
            <h1 className="empty h-[150px] flex items-center text-white uppercase font-black text-[150px] leading-none tracking-tighter opacity-50">
              00
            </h1>
            {[1, 2, 3, 4, 5].map((num) => (
              <h1
                key={num}
                className="h-[150px] flex items-center text-white uppercase font-black text-[150px] leading-none tracking-tighter">
                {num.toString().padStart(2, "0")}
              </h1>
            ))}
          </div>
        </div>
      </div>

      <div className="cards absolute lg:top-[10%] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[600px] will-change-transform">
        {projectsData.map((project, i) => (
          <div
            key={i}
            className="card absolute w-[450px] h-[350px] sm:w-[600px] sm:h-[400px] lg:w-[741px] lg:h-[550px] md:w-[650px] md:h-[480px] top-[60%] left-1/2 -translate-x-[250px] flex flex-col justify-center items-center gap-4 will-change-transform">
            <div className="card-img outline outline-1 outline-white outline-offset-[10px] relative overflow-hidden rounded-lg group">
              <img
                loading="lazy"
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-all duration-500 ease-custom rounded-xl"
              />
              <div className="card-overlay hidden absolute inset-0 lg:flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="button-container flex flex-col gap-2 items-center p-5 text-center">
                  <div className="flex gap-6 mt-3">
                    {project.demoLink && project.demoLink !== "#" ? (
                      <a
                        href={project.demoLink}
                        className="demo-btn px-6 py-4 rounded-full font-semibold text-white backdrop-blur-sm border-2 border-slate-700 transition-all duration-400 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 hover:scale-105 hover:shadow-blue">
                        View Site
                      </a>
                    ) : (
                      <span className="text-sm cursor-not-allowed px-6 py-4 rounded-full font-semibold text-white border-2 border-slate-700 bg-black/30 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                        No Live Demo
                      </span>
                    )}
                    <a
                      href={project.githubLink}
                      className="github-btn px-6 py-4 rounded-full font-semibold text-white backdrop-blur-sm border-2 border-slate-700 transition-all duration-400 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 hover:scale-105 hover:shadow-blue">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="details flex text-white flex-col gap-5 justify-center items-center">
              <h3 className="text-white text-xl font-bold">{project.name}</h3>
              <p className="text-sm text-gray-300">{project.description}</p>
              <div className="button-container flex flex-col gap-2 items-center lg:hidden ">
                <div className="flex gap-6 mt-3">
                  {project.demoLink && project.demoLink !== "#" ? (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      className="demo-btn px-10 py-4 rounded-full font-semibold text-white backdrop-blur-sm border-2 border-slate-700 transition-all duration-400 hover:scale-105 hover:shadow-blue">
                      View Site
                    </a>
                  ) : (
                    <span className="text-sm cursor-not-allowed  px-10 py-4 rounded-full font-semibold text-white border-2 border-slate-700 bg-black/30">
                      No Live Demo
                    </span>
                  )}
                  <a
                    href={project.githubLink}
                    className="github-btn px-10 py-4 rounded-full font-semibold text-white backdrop-blur-sm border-2 border-slate-700 transition-all duration-400 hover:scale-105 hover:shadow-blue">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="card-empty"></div>
        <div className="card-empty"></div>
      </div>
    </section>
  );
};

export default Projects;
