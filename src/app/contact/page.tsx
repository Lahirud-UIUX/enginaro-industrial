'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations';

const ContactPage = () => {
  return (
    <main className="pt-36 w-full">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
          {/* Left Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 bg-white rounded-3xl p-8 mb-8 lg:mb-0"
          >
            <div className="space-y-8">
              {/* Header section */}
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900">Let's Build Something Great Together!</h1>
                <p className="text-gray-600">
                  Have an idea or project in mind? Our team is ready to help you design, develop, and deliver engineering solutions that make a real impact.
                </p>
              </div>
              
              <hr className="border-gray-200" />
              
              {/* Contact Form */}
              <div className="space-y-6">
                {/* Name fields */}
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex-1 space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Your first name"
                      className="w-full px-4 py-3 bg-gray-100 rounded-full text-gray-600 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Your last name"
                      className="w-full px-4 py-3 bg-gray-100 rounded-full text-gray-600 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                {/* Email field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-gray-100 rounded-full text-gray-600 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                {/* Subject field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-3 bg-gray-100 rounded-full text-gray-600 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your project or inquiry..."
                    rows={10}
                    className="w-full px-4 py-3 bg-gray-100 rounded-2xl text-gray-600 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-primary text-white font-medium rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors duration-300"
                >
                  <span className="mr-2">Send Message</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
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
            <div className="bg-white rounded-3xl p-8 lg:p-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
                <p className="text-gray-600">
                  We'd love to hear from you! Whether you're interested in partnering with us, learning more about our programs, or joining our mission, feel free to reach out.
                </p>
                
                {/* Social Media Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-6">Follow Us on Social Media</h3>
                  
                  <div className="flex space-x-6">
                    <a href="#" className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="#FF6301" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    
                    <a href="#" className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors duration-300">
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