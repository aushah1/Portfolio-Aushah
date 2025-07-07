import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import Title from "./Title";

const TechStack = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setRotation(scrollTop * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-10 gap-10 relative">
      <Title
        text="TECH STACK"
        disabled={false}
        speed={3}
        className="md:text-7xl text-5xl"
      />
      <Slider />
      <div className="spinner sm:block hidden">
        <img
          className="absolute -top-20  -left-10 lg:w-96 w-72"
          src="/spinner.png"
          alt=""
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
    </div>
  );
};

export default TechStack;
