'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Form errors
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Form status
  const [status, setStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: ''
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form submitted');
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Please fix the errors in the form'
      });
      return;
    }

    // Set submitting state
    setStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: ''
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: 'Your message has been sent successfully!'
        });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
        // Scroll to top of form to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // API error
        setStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: data.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      // Network error
      setStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Network error. Please check your connection and try again.'
      });
    }
  };

  return (
    <main className="pt-36 w-full bg-gray-50 dark:bg-[#000000] min-h-screen">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
          {/* Left Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 bg-white dark:bg-[#292929] rounded-3xl p-8 mb-8 lg:mb-0"
          >
            <div className="space-y-8">
              {/* Header section */}
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Let's Build Something Great Together!</h1>
                <p className="text-gray-600 dark:text-white">
                  Have an idea or project in mind? Our team is ready to help you design, develop, and deliver engineering solutions that make a real impact.
                </p>
              </div>
              
              <hr className="border-gray-200 dark:border-gray-700" />
              
              {/* Status Messages */}
              {status.isSuccess && (
                <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-100 px-4 py-3 rounded-lg">
                  {status.message}
                </div>
              )}
              
              {status.isError && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-100 px-4 py-3 rounded-lg">
                  {status.message}
                </div>
              )}
              
              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name fields */}
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex-1 space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 dark:text-white">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                      className={`w-full px-4 py-3 bg-gray-100 dark:bg-[#3D3D3D] rounded-full text-gray-600 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.firstName ? 'border-2 border-red-500' : ''
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 dark:text-white">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      className={`w-full px-4 py-3 bg-gray-100 dark:bg-[#3D3D3D] rounded-full text-gray-600 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.lastName ? 'border-2 border-red-500' : ''
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                {/* Email field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className={`w-full px-4 py-3 bg-gray-100 dark:bg-[#3D3D3D] rounded-full text-gray-600 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? 'border-2 border-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                {/* Subject field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className={`w-full px-4 py-3 bg-gray-100 dark:bg-[#3D3D3D] rounded-full text-gray-600 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.subject ? 'border-2 border-red-500' : ''
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>
                
                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    rows={10}
                    className={`w-full px-4 py-3 bg-gray-100 dark:bg-[#3D3D3D] rounded-2xl text-gray-600 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.message ? 'border-2 border-red-500' : ''
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>
                
                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status.isSubmitting}
                  whileHover={{ scale: status.isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: status.isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-3 font-medium rounded-full flex items-center justify-center transition-colors duration-300 ${
                    status.isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  <span className="mr-2">
                    {status.isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </form>
            </div>
          </motion.div>
          
          {/* Right Column - Image and Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-4"
          >
            {/* Image Section */}
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
              <Image 
                src="/images/contact-us.jpg" 
                alt="Contact Enginaro Industrial" 
                fill
                className="object-cover"
              />
            </div>
            
            {/* Information Box */}
            <div className="bg-white dark:bg-[#292929] rounded-3xl p-8 lg:p-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Get in Touch</h2>
                <p className="text-gray-600 dark:text-white">
                  We'd love to hear from you! Whether you're interested in partnering with us, learning more about our programs, or joining our mission, feel free to reach out.
                </p>
                
                {/* Social Media Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Follow Us on Social Media</h3>
                  
                  <div className="flex space-x-6">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors duration-300"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="#FF6301" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors duration-300"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#FF6301" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 9H2V21H6V9Z" stroke="#FF6301" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#FF6301" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default ContactPage; 