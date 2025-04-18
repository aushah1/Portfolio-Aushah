import React from "react";
import Slider from "./Slider";
import Title from "./Title";

const TechStack = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 gap-10">
      <Title
        text="TECH STACK"
        disabled={false}
        speed={3}
        className="md:text-7xl text-5xl"
      />
      <Slider />
    </div>
  );
};

export default TechStack;
