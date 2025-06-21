"use client";

import { Flex, RevealFx, Scroller, SmartImage } from "@/once-ui/components";
import { useEffect, useState, useRef, CSSProperties } from "react";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState, useRef, CSSProperties, useCallback } from "react";

interface Image {
  src: string;
  alt: string;
}

interface CarouselProps extends React.ComponentProps<typeof Flex> {
  images: Image[];
  indicator?: "line" | "thumbnail";
  aspectRatio?: string;
  sizes?: string;
  revealedByDefault?: boolean;
  objectFit?: CSSProperties["objectFit"];
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  indicator = "line",
  aspectRatio = "16 / 9",
  sizes,
  revealedByDefault = false,
  objectFit = "contain",
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(revealedByDefault);
  const [initialTransition, setInitialTransition] = useState(revealedByDefault);
  const nextImageRef = useRef<HTMLImageElement | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const preloadNextImage = useCallback((nextIndex: number) => {
  if (nextIndex >= 0 && nextIndex < images.length) {
    nextImageRef.current = new Image();
    nextImageRef.current.src = images[nextIndex].src;
  }
}, [images]);

const handleControlClick = useCallback((nextIndex: number) => {
  if (nextIndex !== activeIndex && !transitionTimeoutRef.current) {
    preloadNextImage(nextIndex);
    setIsTransitioning(false);
    transitionTimeoutRef.current = setTimeout(() => {
      setActiveIndex(nextIndex);
      setTimeout(() => {
        setIsTransitioning(true);
        transitionTimeoutRef.current = undefined;
      }, 300);
    }, 800);
  }
}, [activeIndex, preloadNextImage]);

const handleKeyDown = useCallback((event: KeyboardEvent) => {
  if (event.key === "ArrowRight") {
    const nextIndex = (activeIndex + 1) % images.length;
    handleControlClick(nextIndex);
  } else if (event.key === "ArrowLeft") {
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    handleControlClick(prevIndex);
  }
}, [activeIndex, images.length, handleControlClick]);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      const nextIndex = (activeIndex + 1) % images.length;
      setActiveIndex(nextIndex);
    } else if (direction === "right") {
      const prevIndex = (activeIndex - 1 + images.length) % images.length;
      setActiveIndex(prevIndex);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

 useEffect(() => {
  window.addEventListener("keydown", handleKeyDown);
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [handleKeyDown]);

  useEffect(() => {
    if (!revealedByDefault && !initialTransition) {
      setIsTransitioning(true);
      setInitialTransition(true);
    }
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [revealedByDefault, initialTransition]);

  if (images.length === 0) {
    return null;
  }

  return (
    <Flex
      {...swipeHandlers}
      fillWidth
      gap="12"
      direction="column"
      {...rest}
    >
      <RevealFx
        onClick={() => handleControlClick((activeIndex + 1) % images.length)}
        fillWidth
        trigger={isTransitioning}
        translateY="16"
        aspectRatio={aspectRatio}
        speed="fast"
      >
        <SmartImage
          sizes={sizes}
          priority
          radius="l"
          border="neutral-alpha-weak"
          alt={images[activeIndex]?.alt}
          aspectRatio={aspectRatio}
         objectFit={objectFit}
          src={images[activeIndex]?.src}
          style={{
            ...(images.length > 1 && {
              cursor: "pointer",
            }),
          }}
        />
      </RevealFx>
      {images.length > 1 && (
        <>
          {indicator === "line" ? (
            <Flex gap="4" paddingX="s" fillWidth horizontal="center">
              {images.map((_, index) => (
                <Flex
                  key={index}
                  onClick={() => handleControlClick(index)}
                  style={{
                    background:
                      activeIndex === index
                        ? "var(--neutral-on-background-strong)"
                        : "var(--neutral-alpha-medium)",
                    transition: "background 0.3s ease",
                  }}
                  cursor="interactive"
                  fillWidth
                  height="2"
                ></Flex>
              ))}
            </Flex>
          ) : (
            <Scroller fillWidth gap="4" onItemClick={handleControlClick}>
              {images.map((image, index) => (
                <Flex
                  key={index}
                  style={{
                    border: activeIndex === index ? "2px solid var(--brand-solid-strong)" : "none",
                    borderRadius: "var(--radius-m-nest-4)",
                    transition: "border 0.3s ease",
                  }}
                  cursor="interactive"
                  padding="4"
                  width="80"
                  height="80"
                >
                  <SmartImage
                    alt={image.alt}
                    aspectRatio="1 / 1"
                    sizes="120px"
                    src={image.src}
                    cursor="interactive"
                    radius="m"
                    transition="macro-medium"
                  />
                </Flex>
              ))}
            </Scroller>
          )}
        </>
      )}
    </Flex>
  );
};

Carousel.displayName = "Carousel";
export { Carousel };
