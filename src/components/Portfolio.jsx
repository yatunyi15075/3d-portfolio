import React, { useState, Suspense, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import styles from '../styles/portfolio.module.css';
import { projects } from '../data/projects';  // Import the projects array
import computerModelPath from '../model/computer.glb';

const Portfolio = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleNext = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const handlePrevious = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  const handleThumbnailClick = (index) => setCurrentProject(index);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    const handleScroll = () => {
      const parallax = document.querySelector(`.${styles.parallaxBg}`);
      if (parallax) {
        parallax.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.section}>
      <div
        className={styles.parallaxBg}
        style={{
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?space,stars)',
        }}
      ></div>

      <div className={styles.container}>
        <h2 className={styles.title}>Portfolio</h2>
        <div className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-40">
          <div className={styles.projectDetails}>
            <h3 className={styles.projectTitle}>{projects[currentProject].title}</h3>
            <p className={styles.projectDescription}>{projects[currentProject].description}</p>
            <div className={styles.buttonGroup}>
              <button className={`${styles.button} ${styles.buttonGray}`} onClick={handlePrevious}>
                &lt; Previous
              </button>
              <button className={`${styles.button} ${styles.buttonBlue}`} onClick={handleNext}>
                Next &gt;
              </button>
              <button className={`${styles.button} ${styles.buttonGreen}`} onClick={toggleModal}>
                More Info
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-96">
            <Canvas>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <OrbitControls enableZoom={false} />
              <Suspense fallback={<Fallback />}>
                <ComputerModel image={projects[currentProject].image} />
              </Suspense>
            </Canvas>
          </div>
        </div>

        <div className={styles.thumbnails}>
          {projects.map((project, index) => (
            <img
              key={index}
              src={project.image}
              alt={project.title}
              className={`${styles.thumbnail} ${
                currentProject === index ? styles.thumbnailActive : styles.thumbnailInactive
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>

        <div className={styles.progress}>
          <p>
            Project {currentProject + 1} of {projects.length}
          </p>
        </div>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>{projects[currentProject].title}</h3>
            <p>{projects[currentProject].details}</p>
            <button className={styles.modalButton} onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const Fallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="gray" />
  </mesh>
);

const ComputerModel = ({ image }) => {
  const gltf = useLoader(GLTFLoader, computerModelPath);
  const texture = useLoader(TextureLoader, image);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    gltf.scene.rotation.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group>
      <primitive object={gltf.scene} scale={1.5} />
      <mesh position={[0, 1.2, 0.65]} rotation={[0, Math.PI, 0]} scale={[1.2, 0.8, 0.1]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
};

export default Portfolio;
