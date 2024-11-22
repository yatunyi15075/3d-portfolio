import React, { useEffect, useRef, useState, Suspense } from "react";
import { Link } from "react-scroll"; // Import react-scroll for smooth scrolling
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import background from "../assets/background.jpg";
import astronaut from "../model/astronaut.glb";
import alien from "../model/alien.glb";
import styles from "../styles/hero.module.css";

const Hero = () => {
  const astronautRef = useRef(null);
  const alienRef = useRef(null);

  const roles = ["YouTuber", "Indie Hacker", "Writer", "Coder"];
  const colors = [
    "text-red-400",
    "text-green-400",
    "text-blue-400",
    "text-yellow-400",
  ];
  const [currentRole, setCurrentRole] = useState(0);

  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (astronautRef.current) {
        astronautRef.current.position.y = Math.sin(Date.now() * 0.001) * 2;
      }
      if (alienRef.current) {
        alienRef.current.rotation.y += 0.01;
      }
      requestAnimationFrame(animate);
    };

    animate();

    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, []);

  return (
    <section
      id="hero"
      className={styles.heroSection}
      style={{ backgroundImage: `url(${background})` }}
    >
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className="text-blue-400">CWB</span>
        </div>
        <ul className={styles.navList}>
          {["hero", "projects", "experience", "contact"].map((section) => (
            <li key={section}>
              <Link
                to={section}
                smooth={true}
                duration={500}
                className={styles.navItem}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          <span className="animate-bounce mr-3">👋</span>
          Hi, I'm Yatunyi Brian
        </h1>
        <p className={styles.roleText}>
          I'm a passionate{" "}
          <span className={`${colors[currentRole]} font-bold`}>
            {roles[currentRole]}
          </span>{" "}
          specializing in crafting stunning, functional 3D experiences that
          bring ideas to life.
        </p>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <Canvas>
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 10, 10]} angle={0.15} />
          <OrbitControls />
          <Suspense fallback={null}>
            <AstronautModel modelRef={astronautRef} setShowInfo={setShowInfo} />
            <AlienModel modelRef={alienRef} />
          </Suspense>
        </Canvas>
      </div>

      <div className={styles.scrollIndicator}>
        <Link to="projects" smooth={true} duration={500}>
          <div className={styles.scrollLink}>
            <span className="text-white text-sm">Scroll Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </Link>
      </div>

      {showInfo && (
        <div className={styles.popup}>
          <h2 className={styles.popupTitle}>About Me</h2>
          <p>
            Hi! I'm Yatunyi Brian, a dedicated programmer with a passion for
            creating innovative solutions. I specialize in web and 3D
            development, constantly pushing the boundaries of creativity and
            functionality.
          </p>
          <p>
            With a strong foundation in coding and years of experience in the
            industry, I strive to deliver projects that not only meet but
            exceed expectations.
          </p>
          <button
            className={styles.popupButton}
            onClick={() => setShowInfo(false)}
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
};

const AstronautModel = ({ modelRef, setShowInfo }) => {
  const gltf = useLoader(GLTFLoader, astronaut);
  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={1.5}
      position={[0, 0, 0]}
      onClick={() => setShowInfo(true)}
    />
  );
};

const AlienModel = ({ modelRef }) => {
  const gltf = useLoader(GLTFLoader, alien);
  return (
    <primitive ref={modelRef} object={gltf.scene} scale={1} position={[4, -2, -3]} />
  );
};

export default Hero;
