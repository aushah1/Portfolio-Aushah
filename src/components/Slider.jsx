import { motion } from "framer-motion";

const Slider = () => {
  const techStack = [
    { name: "HTML", icon: "/html.png" },
    { name: "CSS", icon: "/css.png" },
    { name: "JavaScript", icon: "/js.png" },
    { name: "React", icon: "/react.png" },
    { name: "Node.js", icon: "/node.png" },
    { name: "MongoDB", icon: "/mongo.png" },
  ];

  return (
    <section className="w-full py-24  text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4">
          My Tech Stack
        </h2>

        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Tools and technologies I use to build fast, clean, and scalable web
          experiences.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-12 place-items-center">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.02 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.12 }}
              className="flex flex-col items-center gap-4">
              {/* Icon container */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer overflow-hidden bg-white/10 backdrop-blur flex items-center justify-center shadow-lg">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-full h-full  object-cover"
                />
              </motion.div>

              <span className="text-sm text-gray-300 tracking-wide">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
