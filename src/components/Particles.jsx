import { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

const defaultColors = ["#ffffff", "#4a90e2", "#50e3c2"];

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(hex, 16);
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    float circle = smoothstep(0.5, 0.4, d) * 0.8;
    vec3 color = vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28);
    gl_FragColor = vec4(color, mix(1.0, circle, uAlphaParticles));
  }
`;

const Particles = ({
  particleCount = 300,
  particleSpread = 15,
  speed = 0.2,
  particleColors = defaultColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 2,
  alphaParticles = true,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 25,
  disableRotation = false,
  className = "",
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rendererRef = useRef(null);
  const isMobile =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 700px)").matches
      : false;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const actualParticleCount = isMobile
      ? Math.floor(particleCount * 0.6)
      : particleCount;
    const renderer = new Renderer({
      depth: false,
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;

    gl.canvas.style.position = "fixed";
    gl.canvas.style.top = "0";
    gl.canvas.style.left = "0";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.pointerEvents = "none";
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };
    if (moveParticlesOnHover) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Initialize particles
    const positions = new Float32Array(actualParticleCount * 3);
    const randoms = new Float32Array(actualParticleCount * 4);
    const colors = new Float32Array(actualParticleCount * 3);
    const colorPalette =
      Array.isArray(particleColors) && particleColors.length
        ? particleColors
        : defaultColors;

    for (let i = 0; i < actualParticleCount; i++) {
      // Sphere distribution
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);

      randoms.set(
        [Math.random(), Math.random(), Math.random(), Math.random()],
        i * 4
      );

      const color = hexToRgb(
        colorPalette[Math.floor(Math.random() * colorPalette.length)]
      );
      colors.set(color, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });

    const mesh = new Mesh(gl, { geometry, program, mode: gl.POINTS });

    let frameId;
    let lastTime = 0;
    const animate = (time) => {
      frameId = requestAnimationFrame(animate);
      const delta = time - lastTime;
      lastTime = time;

      program.uniforms.uTime.value = time * 0.001 * speed;

      if (moveParticlesOnHover) {
        mesh.position.x = mouseRef.current.x * particleHoverFactor;
        mesh.position.y = mouseRef.current.y * particleHoverFactor;
      }

      if (!disableRotation) {
        mesh.rotation.x = Math.sin(time * 0.0002) * 0.1;
        mesh.rotation.y = Math.cos(time * 0.0003) * 0.15;
        mesh.rotation.z += 0.0005 * speed;
      }

      renderer.render({ scene: mesh, camera });
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      rendererRef.current = null;
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    isMobile,
  ]);

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 w-full h-full z-0 ${className}`}
      aria-hidden="true"
    />
  );
};

export default Particles;
