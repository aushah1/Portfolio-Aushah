import { useState } from "react";
import "./App.css";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Particles from "./components/Particles";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import { Nav } from "./components/Nav";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Footer from "./components/Footer";

function App() {
  const navItems = [
    {
      id: 1,
      name: "About",
      link: "#about",
      icon: "/about.gif",
    },
    {
      id: 2,
      name: "Skills",
      link: "#main",
      icon: "/skill.gif",
    },
    {
      id: 3,
      name: "Projects",
      link: "#projects",
      icon: "/project.gif",
    },
    {
      id: 4,
      name: "Contact",
      link: "#contact",
      icon: "/chat.gif",
    },
  ];
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={300}
        particleSpread={20}
        speed={0.3}
        particleBaseSize={300}
        moveParticlesOnHover={true}
        particleHoverFactor={2}
        alphaParticles={true}
        disableRotation={false}
        className="z-0"
      />

      <div className="relative z-10">
        <Cursor />
        <Nav navItems={navItems} />
        <About />
        <TechStack />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
