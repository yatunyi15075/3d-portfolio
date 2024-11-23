import React, { useState } from 'react';
import styles from '../styles/contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Invalid email format';
    if (!formData.message) formErrors.message = 'Message is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Contact</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {isSubmitted && (
          <div className={styles.successMessage}>Thank you! Your message has been sent.</div>
        )}

        {/* Name Input */}
        <div className={styles.inputWrapper}>
          <input
            type="text"
            id="name"
            placeholder=" "
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={styles.input}
          />
          <label htmlFor="name" className={styles.label}>
            Your Name
          </label>
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div className={styles.inputWrapper}>
          <input
            type="email"
            id="email"
            placeholder=" "
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={styles.input}
          />
          <label htmlFor="email" className={styles.label}>
            Your Email
          </label>
          {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
        </div>

        {/* Message Input */}
        <div className={styles.inputWrapper}>
          <textarea
            id="message"
            placeholder=" "
            rows="6"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={styles.input}
          ></textarea>
          <label htmlFor="message" className={styles.label}>
            Your Message
          </label>
          {errors.message && <p className={styles.errorMessage}>{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.button}>
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
