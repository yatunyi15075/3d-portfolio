// src/data/projects.js
import image1 from '../assets/project1.jpg';
import image2 from '../assets/project2.jpg';
import image3 from '../assets/project3.jpg';
import image4 from '../assets/project4.jpg';

export const projects = [
  {
    title: 'Project 1: AI Assistant',
    description:
      'An AI-powered virtual assistant that helps users manage tasks, answer questions, and provide recommendations.',
    details: 'This project uses GPT-4 for AI responses and integrates with task management APIs.',
    image: image1,
  },
  {
    title: 'Project 2: E-Commerce Platform',
    description:
      'A full-stack e-commerce platform featuring product recommendations, cart management, and secure payments.',
    details:
      'Built with React, Node.js, and Stripe for payments, offering a seamless shopping experience.',
    image: image2,
  },
  {
    title: 'Project 3: Portfolio Website',
    description:
      'A 3D portfolio website showcasing interactive models and immersive designs.',
    details: 'Uses Three.js for 3D models and Tailwind CSS for responsive styling.',
    image: image3,
  },
  {
    title: 'Project 4: Learning App',
    description:
      'An AI-based educational app designed to help students learn at their own pace with personalized content.',
    details:
      'Combines adaptive learning algorithms with gamified experiences for better engagement.',
    image: image4,
  },
];
