"use client";
import { IconButton } from "@/once-ui/components";
import React, { useState, useEffect } from "react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isMobile) {
    return null;
  }

  return (
    <IconButton
      onClick={scrollToTop}
      size="m"
      icon="arrowUp"
      variant="secondary"
      style={{
        position: "fixed",
        bottom: "3rem",
        right: "2rem",
        display: isVisible ? "flex" : "none",
        opacity: 0.8,
        border: "1.5px solid var(--accent-border-strong)",
        transition: "border-color 0.3s ease-in-out",
        height: "3rem",
        borderRadius: "1.5rem",
      }}
    />
  );
};

export default ScrollToTop;
