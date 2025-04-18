import { motion } from "framer-motion";

const Title = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: false, // Trigger every time element enters view
        margin: "0px 0px -30% 0px", // Adjust trigger point
        reset: true, // Reset animation when leaving view
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      className={`inline-block ${className}`}>
      <div
        className={`text-[#d7d6d6a8] bg-clip-text font-bold ${
          disabled ? "" : "animate-shine"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          animationDuration: animationDuration,
        }}>
        {text}
      </div>
    </motion.div>
  );
};

export default Title;
