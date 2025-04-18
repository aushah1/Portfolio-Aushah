import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Name from "./Name";
import Pill from "./Pill";
import RotatingText from "./RotatingText";
import CircularText from "./CircularText";

const photoVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: "spring", stiffness: 100 } },
};
const About = () => {
  const { scrollYProgress } = useScroll();
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <motion.div
      id="about"
      className="flex w-full text-white lg:flex-row gap-10 flex-col justify-around items-center py-5 px-10 mt-32 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}>
      {/* Left Column */}
      <motion.div
        className="intro flex flex-col gap-6"
        variants={{
          hidden: { x: -100, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 },
          },
        }}>
        <motion.div className="overflow-hidden" whileHover={{ scale: 1.05 }}>
          <RotatingText
            texts={["WEB DEVELOPER", "REACT DEVELOPER", "FULLSTACK DEVELOPER"]}
            mainClassName="text-5xl bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
            staggerFrom="last"
            staggerDuration={0.02}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          />
        </motion.div>

        <motion.h1
          className="text-5xl font-bold"
          variants={{
            hidden: { scale: 0.5 },
            visible: { scale: 1 },
          }}>
          HEY, I'M
        </motion.h1>

        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <Name
            colors={["#40ffaa", "#4079ff", "#ff40f5"]}
            animationSpeed={2}
            className="text-6xl drop-shadow-lg">
            AUSHAH GOWHAR
          </Name>
        </motion.div>

        <motion.div className="info space-y-4" style={{ opacity: textOpacity }}>
          <motion.p className="text-2xl font-semibold">
            Do you know what’s the #1 Hack that Top Brands do?
          </motion.p>

          <motion.ul className="list-disc text-lg">
            <li>Apple Doesn't sell Phones, It Sells Status</li>
            <li>Nike Doesn’t Shoes, It Sells Emotions</li>
          </motion.ul>

          <motion.p className="text-xl">
            How are they Presenting their Brand?
          </motion.p>

          <motion.p className="text-xl">
            Through Creating Web sites that make customers happy about hitting
            “Buy Now”.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.5 } },
          }}>
          <Pill
            img="/github.png"
            link="https://github.com/aushah1"
            hoverEffect="glow"
          />
          <Pill
            img="/linkedin.webp"
            link="https://linkedin.com/in/aushahgw"
            hoverEffect="jump"
          />
        </motion.div>
      </motion.div>

      {/* Right Column */}
      <motion.div
        className="relative flex items-center justify-center w-[400px] h-[480px]"
        style={{ scale: photoScale }}>
        <motion.div
          className="photo w-80 h-80 md:w-96 md:h-96 overflow-hidden"
          variants={photoVariants}>
          <div className="octagon-mask w-full h-full">
            <img
              className="w-full h-full object-cover"
              src="/photo2.webp"
              alt="Profile"
            />
          </div>
        </motion.div>

        <motion.button
          onClick={() => (window.location.href = "mailto:aushah.gw@gmail.com")}
          className="absolute z-10 -bottom-8 -right-8"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}>
          <CircularText
            text="HIRE ME • BUILD YOUR VISION • "
            spinDuration={15}
            className="text-cyan-400 hover:text-blue-400 transition-colors"
            characterStyle={{ fontWeight: 700 }}
          />
        </motion.button>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                transition: {
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                },
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
