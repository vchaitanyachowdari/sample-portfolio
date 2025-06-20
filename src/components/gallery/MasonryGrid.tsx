"use client";

import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import styles from "./Gallery.module.scss";

// Dynamically import all images from the /images/gallery folder
const importAllImages = (requireContext: __WebpackModuleApi.RequireContext) => {
  return requireContext.keys().map((key) => {
    const src = requireContext(key).default;
    const orientation = src.width > src.height ? "horizontal" : "vertical"; // Determine orientation based on dimensions
    return {
      id: key.replace("./", "").replace(/\.[^/.]+$/, ""), // Unique ID for each image
      src: src.src, // Use the actual image URL
      alt: key.replace("./", "").replace(/\.[^/.]+$/, ""), // Use filename as alt text
      orientation,
    };
  });
};

const images = importAllImages(require.context("/public/images/gallery", false, /\.(png|jpe?g|svg)$/));

export default function MasonryGrid() {
  const [imageLikes, setImageLikes] = useState<Record<string, number>>({});
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

  // Fetch likes from the database when the component mounts
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch("/api/likes", {
          method: "GET",
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "", // Add API key here
          },
        });
        const data = await response.json();

        // Map the fetched data to a format compatible with imageLikes
        const likesMap = data.reduce((acc: Record<string, number>, item: { id: string; count: number }) => {
          acc[item.id] = item.count;
          return acc;
        }, {});

        setImageLikes(likesMap);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    fetchLikes();
  }, []);

  const handleLike = async (id: string) => {
    // Increment the like count locally
    setImageLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }));

    // Send the like count to the database
    try {
      await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error("Failed to update likes:", error);
    }
  };

  const handleDownload = (src: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop() || "image"; // Use the file name from the URL
    link.click();
  };

  const handleTouch = (id: string) => {
    setActiveOverlay((prev) => (prev === id ? null : id)); // Toggle overlay
  };

  const handleMouseLeave = () => {
    setActiveOverlay(null); // Reset the active overlay when the mouse leaves
  };

  const breakpointColumnsObj = {
    default: 5,
    1440: 3,
    1024: 2,
    560: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {images.map((image) => (
        <div
          key={image.id}
          className={`${styles.gridItemWrapper} ${
            activeOverlay === image.id ? styles.active : ""
          }`}
          onClick={() => handleTouch(image.id)} // Handle touch to toggle overlay
          onMouseLeave={handleMouseLeave} // Hide overlay when the mouse leaves
        >
          <img
            src={image.src}
            alt={image.alt}
            className={styles.gridItem}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
          <div className={styles.overlay}>
            {/* Left Section: Like Button and Count */}
            <div className={styles.leftSection}>
              <button
                className={styles.likeButton}
                onClick={() => handleLike(image.id)}
              >
                ❤️
              </button>
              <span className={styles.likeCount}>{imageLikes[image.id] || 0}</span>
            </div>

            {/* Right Section: Download Button */}
            <button
              className={styles.downloadButton}
              onClick={() => handleDownload(image.src)}
            >
              ⬇️ 
            </button>
          </div>
        </div>
      ))}
    </Masonry>
  );
}
