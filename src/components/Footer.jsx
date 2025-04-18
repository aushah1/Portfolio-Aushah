import React from "react";
import { FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="w-full text-white bg-transparent flex justify-between items-center text-sm lg:text-3xl px-3 md:px-10 py-5 mt-10 z-0">
        <div className="text ">
          {" "}
          &copy; . AUSHAH GOWHAR . ALL RIGHTS RESERVED
        </div>
        <div
          onClick={handleScroll}
          className="scroll flex gap-2 md:gap-3 items-center justify-center cursor-pointer">
          <span>
            <FaArrowUp />
          </span>{" "}
          SCROLL TO TOP
        </div>
      </div>
    </>
  );
};

export default Footer;
