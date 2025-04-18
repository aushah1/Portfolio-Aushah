"use client";
import React, { useState, useEffect } from "react";
import Robot from "./Robot";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../lib/utils";

export const Nav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    if (!visible) {
      setIsMenuOpen(false);
    }
  }, [visible]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (current <= 0.01) {
        setIsTop(true);
        setVisible(true);
      } else {
        setIsTop(false);
        if (current > 0.05) {
          if (direction < 0) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          delay: !visible ? 0.5 : 0,
          layout: { type: "tween", duration: 0.3 },
        }}
        className={cn(
          "flex items-center inset-x-0 mx-auto bg-black/50 backdrop-blur-sm fixed top-10 border border-transparent dark:border-white/[0.2] rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] p-10 py-2 space-x-4 transition-all duration-300",
          className,
          isTop
            ? " w-[80%] lg:w-[70%] justify-around"
            : "max-w-fit justify-center"
        )}>
        <motion.div
          className="robo relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <Robot />
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 mt-2 bg-black/75 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                I'm watching you
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Desktop Navigation Items */}
        <div className="hidden sm:flex items-center space-x-4">
          {navItems.map((navItem, idx) => {
            const isActive = currentPath === navItem.link;
            return (
              <motion.a
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500",
                  isActive ? "text-blue-400" : ""
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <span className="block sm:hidden">{navItem.icon}</span>
                <motion.span
                  className="hidden sm:block text-lg relative"
                  whileHover={{
                    rotateX: [0, 20, -20, 0],
                    transition: { duration: 0.6, ease: "easeInOut" },
                  }}>
                  {navItem.name}
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </motion.span>
              </motion.a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-1/2 -translate-x-1/2 top-24 bg-black/50 backdrop-blur-sm rounded-lg p-4 space-y-4 z-[5000]">
            {navItems.map((navItem, idx) => {
              const isActive = currentPath === navItem.link;
              return (
                <motion.a
                  key={`mobile-link-${idx}`}
                  href={navItem.link}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-white block text-center text-lg",
                    isActive ? "text-blue-400" : ""
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  {navItem.name}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
