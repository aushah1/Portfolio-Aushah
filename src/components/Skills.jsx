import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";
import FuzzyText from "./FuzzyText";
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  useEffect(() => {
    // Set initial states for animated elements
    gsap.set(".fuzzyText", { opacity: 0, scale: 0.8 });
    gsap.set(".card", { opacity: 0, y: 40, rotation: -15, scale: 0.85 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main",
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    // Main animation sequence
    tl.to("#top", { y: "-100%", ease: "power2.inOut" }, 0)
      .to("#bottom", { y: "100%", ease: "power2.inOut" }, 0)
      .to(".content", { y: "0%", ease: "power2.out" }, 0.2)
      .to(
        ".fuzzyText",
        {
          opacity: 1,
          scale: 1,
          ease: "back.out(2.5)",
          duration: 0.8,
        },
        0.3
      )
      .to(
        ".card",
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          stagger: {
            amount: 1.5,
            from: "center",
          },
          ease: "power4.out",
          duration: 0.8,
        },
        0.7
      );

    // Add subtle rotation to cards on hover
    gsap.utils.toArray(".card").forEach((card) => {
      gsap.to(card, {
        rotation: 3,
        scale: 1.05,
        paused: true,
        ease: "power2.out",
        onStart: () => (card.style.zIndex = 1),
        onReverseComplete: () => (card.style.zIndex = 0),
      });

      card.addEventListener("mouseenter", () =>
        gsap.to(card, { timeScale: 1 }).play()
      );
      card.addEventListener("mouseleave", () =>
        gsap.to(card, { timeScale: 3 }).reverse()
      );
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
      gsap.set(".content", { y: "100%" });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <>
      <div id="main" className=" relative w-full h-screen overflow-hidden ">
        <div
          id="top"
          className="absolute top-0 w-full h-[50vh] opacity-80 bg-[#000112] flex items-end justify-center overflow-hidden z-[9]">
          <h1 className="font-founder text-8xl md:text-[13rem] relative translate-y-[50%]">
            SKILLS
          </h1>
        </div>
        <div id="center" className="relative w-full h-[790px] ">
          <div className="content absolute top-0 left-0 w-full h-full flex flex-col gap-10 items-center justify-center text-white translate-y-full">
            <FuzzyText
              className="fuzzyText "
              baseIntensity={0.2}
              hoverIntensity={0.4}
              enableHover={0.4}>
              MY SKILLS
            </FuzzyText>
            <h2 className="px-5 text-center max-w-3xl text-lg md:text-xl">
              My expertise is in both Frontend and Backend. Here are some of My
              Professional Skills that helps you to present yourself in online
              world
            </h2>
            <div className="container mx-auto place-items-center w-[92%] md:w-[70%] grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
              <Card
                imageSrc="/html.png"
                altText="HTML"
                captionText="HTML"
                containerHeight="120px"
                containerWidth="120px"
                imageHeight="120px"
                imageWidth="120px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={<p className="tilted-card-demo-text">HTML</p>}
              />
              <Card
                imageSrc="/css.png"
                altText="CSS"
                captionText="CSS"
                containerHeight="120px"
                containerWidth="120px"
                imageHeight="120px"
                imageWidth="120px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={<p className="tilted-card-demo-text">CSS</p>}
              />
              <Card
                imageSrc="/js.png"
                altText="JavaScript"
                captionText="JavaScript"
                containerHeight="120px"
                containerWidth="120px"
                imageHeight="120px"
                imageWidth="120px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">JavaScript</p>
                }
              />
              <Card
                imageSrc="/react.png"
                altText="React"
                captionText="React"
                containerHeight="120px"
                containerWidth="120px"
                imageHeight="120px"
                imageWidth="120px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={<p className="tilted-card-demo-text">React</p>}
              />
              <Card
                imageSrc="/tailwind.png"
                altText="Tailwind CSS"
                captionText="Tailwind CSS"
                containerHeight="120px"
                containerWidth="120px"
                imageHeight="120px"
                imageWidth="120px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">Tailwind CSS</p>
                }
              />
              <Card
                imageSrc="/node.png"
                altText="Node JS"
                captionText="Node JS"
                containerHeight="120px"
                containerWidth="120px"
                imageHeight="120px"
                imageWidth="120px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">Node JS</p>
                }
              />
              <Card
                imageSrc="/mongo.png"
                altText="MongoDb"
                captionText="MongoDb"
                containerHeight="120px"
                containerWidth="120px"
                imageHeight="120px"
                imageWidth="120px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">MongoDb</p>
                }
              />
              <Card
                imageSrc="/git.png"
                altText="Git"
                captionText="Git"
                containerHeight="120px"
                containerWidth="120px"
                imageHeight="120px"
                imageWidth="120px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={<p className="tilted-card-demo-text">Git</p>}
              />
              <Card
                imageSrc="/github2.png"
                altText="Github"
                captionText="Github"
                containerHeight="120px"
                containerWidth="120px"
                imageHeight="120px"
                imageWidth="120px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={<p className="tilted-card-demo-text">Github</p>}
              />
            </div>
          </div>
        </div>
        <div
          id="bottom"
          className="absolute bottom-0 opacity-85 bg-[#000112] w-full h-[50vh]  flex items-start justify-center overflow-hidden">
          <h1 className="font-founder text-8xl md:text-[13rem] relative -translate-y-[50%]">
            SKILLS
          </h1>
        </div>
      </div>
    </>
  );
};

export default Skills;
