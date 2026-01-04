import { useState } from "react";

const Pill = ({ link, img, hoverEffect, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const particles = Array.from({ length: 10 }, (_, i) => i); // Reduced to 10 particles

  const getParticleStyles = (index) => {
    const baseStyles = {
      width: "1vmin",
      height: "1vmin",
      animationDelay: `${index * -0.1}s`,
    };

    switch (index) {
      case 0:
        return {
          ...baseStyles,
          marginTop: "-2vmin",
          marginRight: "-2vmin",
        };
      case 1:
        return {
          ...baseStyles,
          width: "1.2vmin",
          height: "1.2vmin",
          marginTop: "2vmin",
          marginRight: "2vmin",
        };
      case 2:
        return {
          ...baseStyles,
          marginTop: "-1vmin",
          marginRight: "3vmin",
        };
      case 3:
        return {
          ...baseStyles,
          marginTop: "3vmin",
          marginRight: "-2vmin",
        };
      case 4:
        return {
          ...baseStyles,
          marginTop: "-3vmin",
          marginLeft: "2vmin",
        };
      case 5:
        return {
          ...baseStyles,
          width: "0.8vmin",
          height: "0.8vmin",
          marginTop: "1vmin",
          marginLeft: "-3vmin",
        };
      case 6:
        return {
          ...baseStyles,
          marginTop: "-2vmin",
          marginLeft: "4vmin",
        };
      case 7:
        return {
          ...baseStyles,
          width: "1.2vmin",
          height: "1.2vmin",
          marginTop: "2vmin",
          marginRight: "-4vmin",
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div className=" h-24 overflow-hidden flex items-center justify-center ">
      <div className="w-[25vmin] h-[20vmin] flex items-center justify-center relative">
        <div
          className="pill-container w-[10vmin] h-[30vmin] flex flex-col items-center justify-center relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}>
          {/* Particles Container with overflow hidden */}
          <div className="absolute w-[calc(100%-4vmin)] h-[calc(100%-6vmin)] flex items-center justify-center flex-wrap overflow-hidden">
            {particles.map((_, index) => (
              <i
                key={index}
                className="absolute bg-white/80 rounded-full animate-medicine-dust"
                style={getParticleStyles(index)}
              />
            ))}

            {/* Link */}
            <a
              href={link}
              className="absolute w-[35px]  md:w-[35px]   rounded-full cursor-pointer transition-transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </a>
          </div>

          {/* Pill Sections */}
          <div className="pill-top w-[4.5rem] h-9 md:w-20 md:h-10 bg-[#171717] border-2 border-white relative rounded-t-full overflow-hidden" />
          <div
            className={`pill-bottom w-[4.5rem] h-9 md:w-20 md:h-10 bg-[#171717] border-2 border-white mt-0 rounded-b-full relative ${
              isOpen ? "open" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Pill;
