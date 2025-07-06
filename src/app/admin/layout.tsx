'use client';

import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Function to hide navigation elements
    const hideNavigation = () => {
      // Target the navigation bar more specifically
      const navElements = document.querySelectorAll('nav, .navigation-bar, [role="navigation"]');
      const scrollElements = document.querySelectorAll('[data-testid="scroll-to-top"]');
      
      // Also target by the navigation's parent div structure
      const navContainers = document.querySelectorAll('div > nav[class*="rounded"]');
      
      [...navElements, ...navContainers].forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none !important';
          el.style.visibility = 'hidden !important';
          el.style.opacity = '0 !important';
        }
      });
      
      scrollElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none !important';
        }
      });
      
      // Reset body styling
      document.body.style.paddingTop = '0 !important';
      document.body.style.marginTop = '0 !important';
    };

    // Hide immediately
    hideNavigation();
    
    // Also hide after a short delay to catch dynamically rendered content
    const timeoutId = setTimeout(hideNavigation, 100);
    
    // Use MutationObserver to catch dynamically added navigation
    const observer = new MutationObserver(() => {
      hideNavigation();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      
      // Cleanup - restore navigation when leaving admin
      const navElements = document.querySelectorAll('nav, .navigation-bar, [role="navigation"]');
      const scrollElements = document.querySelectorAll('[data-testid="scroll-to-top"]');
      const navContainers = document.querySelectorAll('div > nav[class*="rounded"]');
      
      [...navElements, ...navContainers].forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = '';
          el.style.visibility = '';
          el.style.opacity = '';
        }
      });
      
      scrollElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = '';
        }
      });
    };
  }, []);

  return (
    <>
      {/* Add CSS to ensure navigation is hidden */}
      <style jsx global>{`
        body nav,
        body [role="navigation"],
        body .navigation-bar,
        body div > nav[class*="rounded"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
        
        body {
          padding-top: 0 !important;
          margin-top: 0 !important;
        }
      `}</style>
      <div className="min-h-screen bg-gray-50" style={{ paddingTop: 0, marginTop: 0 }}>
        {children}
      </div>
    </>
  );
} 