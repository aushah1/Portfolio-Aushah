import { useRef, useEffect } from "react";

const Robot = () => {
  const eye1Ref = useRef(null);
  const eye2Ref = useRef(null);
  const pupil1Ref = useRef(null);
  const pupil2Ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyes = [eye1Ref.current, eye2Ref.current];
      const pupils = [pupil1Ref.current, pupil2Ref.current];

      eyes.forEach((eye, index) => {
        if (!eye || !pupils[index]) return;

        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const angleRad = Math.atan2(
          e.clientY - eyeCenterY,
          e.clientX - eyeCenterX
        );

        const maxDistance = rect.width / 4;
        const distance = Math.min(
          maxDistance,
          Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 5
        );

        const x = Math.cos(angleRad) * distance;
        const y = Math.sin(angleRad) * distance;

        pupils[
          index
        ].style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      [eye1Ref.current, eye2Ref.current].forEach((eye) => {
        if (!eye) return;
        eye.classList.add("blink");
        setTimeout(() => eye.classList.remove("blink"), 300);
      });
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative h-20 w-24">
      <img src="/robot2.png" className=" h-20 w-24" alt="Robot" />
      <div className="absolute flex gap-[3px] top-[29.5px] left-[63%]  -translate-x-1/2">
        <div ref={eye1Ref} className="eye w-2 h-2">
          <div ref={pupil1Ref} className="pupil rounded-full" />
        </div>
        <div ref={eye2Ref} className="eye w-2 h-2">
          <div ref={pupil2Ref} className="pupil rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Robot;
