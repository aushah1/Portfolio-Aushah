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
      className="flex w-full text-white lg:flex-row gap-10 flex-col justify-around items-center py-5 px-10 mt-32 overflow-hidden relative"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}>
      {/* Left Column */}
      <motion.div
        className="intro flex flex-col gap-6 mt-10"
        variants={{
          hidden: { x: -100, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 },
          },
        }}>
        <motion.h1
          className="text-5xl font-bold"
          variants={{
            hidden: { scale: 0.5 },
            visible: { scale: 1 },
          }}>
          HEY, I'M
        </motion.h1>

        <motion.div className="overflow-hidden" whileHover={{ scale: 1.05 }}>
          <RotatingText
            texts={["WEB DEVELOPER", "REACT DEVELOPER", "FRONTEND DEVELOPER"]}
            mainClassName="text-5xl bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text "
            staggerFrom="last"
            staggerDuration={0.02}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          />
        </motion.div>

        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <Name
            colors={["#40ffaa", "#4079ff", "#ff40f5"]}
            animationSpeed={2}
            className="text-6xl drop-shadow-lg">
            AUSHAH GOWHAR
          </Name>
        </motion.div>

        <motion.div
          className="info space-y-8 max-w-3xl"
          style={{ opacity: textOpacity }}>
          <motion.p className="text-xl  font-medium leading-relaxed text-gray-200">
            I am Aushah, a frontend web developer who enjoys building
            responsive, accessible, and user-friendly websites. I turn designs
            into quick, interactive ones using HTML, CSS, JavaScript, React, and
            Tailwind CSS.
          </motion.p>

          <div className="space-y-4 bg-gray-900/40 p-6 rounded-xl border border-gray-800">
            <motion.p className="text-lg font-semibold text-cyan-300">
              Do you know what the #1 hack top brands use?
            </motion.p>

            <motion.ul className="list-disc pl-8 space-y-2 text-md  font-medium">
              <li className="flex items-start">
                <span className="mr-2 text-cyan-400">•</span>
                <span>
                  Apple doesn't sell phones — it sells
                  <span className="text-cyan-300"> status</span>
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-cyan-400">•</span>
                <span>
                  Nike doesn't sell footwear — it sells
                  <span className="text-cyan-300"> emotion</span>
                </span>
              </li>
            </motion.ul>

            <div className="space-y-2 pt-2">
              <motion.p className="text-lg font-semibold text-gray-300">
                And where do they position their brand?
              </motion.p>

              <motion.p className="text-lg leading-relaxed">
                By using sites that get clients eager to click "Buy Now."
              </motion.p>
            </div>
          </div>

          <motion.p className="text-xl font-medium leading-relaxed bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-6 rounded-xl border border-cyan-500/30">
            That's what good frontend development can do — and that's what I'm
            dedicated to delivering in every project I undertake.
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
              src="/prof.png"
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
      <motion.div className="float">
        <img
          className="absolute top-1 right-10 w-28 sm:w-40 float-animation"
          src="/astraunt.png"
          alt=""
        />
        <img
          className="absolute lg:block hidden top-36 right-72 w-40 float-animation"
          src="/planet.png"
          alt=""
        />
        <img
          className="absolute lg:block hidden top-10 right-[40rem] w-40 float-animation"
          src="/ufo.png"
          alt=""
        />
        <img
          className="absolute -bottom-9 right-56 sm:w-40 w-32  float-animation"
          src="/astraunt2.png"
          alt=""
        />
      </motion.div>
    </motion.div>
  );
};

export default About;
