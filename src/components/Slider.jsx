import { useEffect, useRef, useCallback } from "react";

const Slider = () => {
  const dragContainerRef = useRef(null);
  const spinContainerRef = useRef(null);
  const radius = useRef(240);
  const autorotate = useRef(true);
  const rotatespeed = useRef(-60);
  const imgwidth = 120;
  const imgheight = 170;

  // State variables using refs since we don't need re-renders
  const sx = useRef(0);
  const sy = useRef(0);
  const nx = useRef(0);
  const ny = useRef(0);
  const desx = useRef(0);
  const desy = useRef(0);
  const tx = useRef(0);
  const ty = useRef(10);
  const animation = useRef(null);

  const images = [
    "/html.png",
    "/css.png",
    "/js.png",
    "/react.png",
    "/tailwind.png",
  ];

  const positionImages = useCallback(
    (radiusValue) => {
      const elements = Array.from(spinContainerRef.current.children).filter(
        (el) => el.tagName === "IMG"
      );
      elements.forEach((el, i) => {
        el.style.transform = `rotateY(${
          i * (360 / elements.length)
        }deg) translateZ(${radiusValue}px)`;
      });
    },
    [images.length]
  );

  const applyTransform = useCallback((obj) => {
    if (ty.current > 180) ty.current = 180;
    if (ty.current < 0) ty.current = 0;

    obj.style.transform = `rotateX(${-ty.current}deg) rotateY(${
      tx.current
    }deg)`;
  }, []);

  const playSpin = useCallback((yes) => {
    if (spinContainerRef.current) {
      spinContainerRef.current.style.animationPlayState = yes
        ? "running"
        : "paused";
    }
  }, []);

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      clearInterval(animation.current);
      sx.current = e.clientX;
      sy.current = e.clientY;

      const handlePointerMove = (e) => {
        nx.current = e.clientX;
        ny.current = e.clientY;
        desx.current = nx.current - sx.current;
        desy.current = ny.current - sy.current;

        tx.current += desx.current * 0.1;
        ty.current += desy.current * 0.1;

        applyTransform(dragContainerRef.current);
        playSpin(false);

        sx.current = nx.current;
        sy.current = ny.current;
      };

      const handlePointerUp = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);

        animation.current = setInterval(() => {
          desx.current *= 0.95;
          desy.current *= 0.95;
          tx.current += desx.current * 0.1;
          ty.current += desy.current * 0.1;

          applyTransform(dragContainerRef.current);

          if (Math.abs(desx.current) < 0.5 && Math.abs(desy.current) < 0.5) {
            clearInterval(animation.current);
            if (autorotate.current) playSpin(true);
          }
        }, 17);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [applyTransform, playSpin]
  );

  const handleWheel = useCallback(
    (e) => {
      const delta = e.deltaY ? e.deltaY * -0.1 : e.wheelDelta / 12;
      radius.current += delta;
      positionImages(radius.current);
    },
    [positionImages]
  );

  useEffect(() => {
    const handleResize = () => {
      // Check screen width and adjust radius
      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      const newRadius = isSmallScreen ? 180 : 240; // Smaller radius for mobile
      if (radius.current !== newRadius) {
        radius.current = newRadius;
        positionImages(radius.current);
      }
    };

    const init = () => {
      // Initial radius based on screen size
      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      radius.current = isSmallScreen ? 180 : 240;

      const elements = Array.from(spinContainerRef.current.children).filter(
        (el) => el.tagName === "IMG"
      );

      positionImages(radius.current);

      elements.forEach((el, i) => {
        el.style.transition = "transform 1s";
        el.style.transitionDelay = `${(elements.length - i) / 4}s`;
      });

      if (autorotate.current) {
        const animationName = rotatespeed.current > 0 ? "spin" : "spinrevert";
        spinContainerRef.current.style.animation = `${animationName} ${Math.abs(
          rotatespeed.current
        )}s infinite linear`;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            init();
            window.addEventListener("resize", handleResize);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (dragContainerRef.current) {
      observer.observe(dragContainerRef.current);
    }

    const dragContainer = dragContainerRef.current;
    dragContainer.addEventListener("pointerdown", handlePointerDown);
    dragContainer.addEventListener("wheel", handleWheel);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      dragContainer.removeEventListener("pointerdown", handlePointerDown);
      dragContainer.removeEventListener("wheel", handleWheel);
      clearInterval(animation.current);
    };
  }, [handlePointerDown, handleWheel, positionImages]);

  return (
    <div className="h-96 touch-none w-full overflow-hidden flex ">
      <div
        ref={dragContainerRef}
        className="relative mx-auto my-auto prevent-select"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(-10deg)",
        }}>
        <div
          ref={spinContainerRef}
          className="relative"
          style={{
            width: `${imgwidth}px`,
            height: `${imgheight}px`,
            transformStyle: "preserve-3d",
          }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="tech logo"
              className="absolute left-0 top-0 w-full h-full shadow-[0_0_8px_#fff] hover:shadow-[0_0_15px_#fffd] prevent-select"
              style={{
                transformStyle: "preserve-3d",
                WebkitBoxReflect:
                  "below 10px linear-gradient(transparent, transparent, #0005)",
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
        {/* Moved text element outside spin container and adjusted transform */}
        <p
          className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-white whitespace-nowrap text-3xl md:text-5xl cursor-pointer"
          style={{
            transform: "rotateX(10deg) translate(-50%, -50%)",
            transformOrigin: "center center",
          }}>
          MY TECH STACK
        </p>
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-x-90"
          style={{
            width: `${radius.current * 3}px`,
            height: `${radius.current * 3}px`,
            background:
              "radial-gradient(center center, farthest-side, #9993, transparent)",
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
