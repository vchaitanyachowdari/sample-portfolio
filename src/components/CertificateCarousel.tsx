import React from "react";
import { Carousel } from "@/once-ui/components";

const importCertificates = () => {
  const context = require.context(
    "/public/certificates",
    false,
    /\.(png|jpe?g|svg)$/
  );
  return context.keys().map((key) => ({
    src: key.replace("./", "/certificates/"),
    alt: key.replace("./", "").replace(/\.[^/.]+$/, ""), // Use filename as alt text
  }));
};

const CertificateCarousel: React.FC = () => {
  const certificates = importCertificates();

  return (
    <Carousel
      aspectRatio="4 / 3" // Adjusted to a wider aspect ratio
      indicator="line"
      images={certificates.map((certificate) => ({
        ...certificate,
        sizes: "(max-width: 600px) 100vw, 600px", // Adjusted sizes for better performance
      }))}
      style={{
        maxWidth: "600px", // Increased the width
        height: "400px",   // Fixed the height
        margin: "0 auto",  // Center the carousel
      }}
      objectFit="fill"
    />
  );
};

export default CertificateCarousel;