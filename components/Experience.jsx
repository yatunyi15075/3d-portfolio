import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBrush, FaCode, FaUserTie } from 'react-icons/fa';
import styles from '../styles/experience.module.css';

const Experience = () => {
  const experiences = [
    {
      role: '3D Artist',
      company: 'Creative Studio',
      duration: '2020 - Present',
      icon: <FaBrush />,
      details: 'Worked on creating immersive 3D environments, animations, and models for various projects.',
    },
    {
      role: 'Frontend Developer',
      company: 'Tech Solutions',
      duration: '2018 - 2020',
      icon: <FaCode />,
      details: 'Developed responsive web applications using React.js, improving user experience and performance.',
    },
    {
      role: 'Freelance Designer',
      company: 'Self-Employed',
      duration: '2015 - 2018',
      icon: <FaUserTie />,
      details: 'Collaborated with clients to deliver high-quality designs, branding materials, and illustrations.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDetails = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Experience</h2>
      <VerticalTimeline>
        {experiences.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            contentStyle={{ background: '#1a202c', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #1a202c' }}
            date={exp.duration}
            iconStyle={{ background: '#3182ce', color: '#fff' }}
            icon={exp.icon}
          >
            <div onClick={() => toggleDetails(index)} className={styles.timelineElement}>
              <h3 className={styles.role}>{exp.role}</h3>
              <h4 className={styles.company}>{exp.company}</h4>
              {activeIndex === index && <p className={styles.details}>{exp.details}</p>}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default Experience;
