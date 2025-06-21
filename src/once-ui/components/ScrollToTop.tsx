import { useState, useEffect } from "react";
import { Flex } from "@/once-ui/components";
import styles from "./ScrollToTop.module.scss";
import classNames from "classnames";
import { useState, useEffect, useCallback } from "react";

interface ScrollToTopProps extends React.ComponentProps<typeof Flex> {
  offset?: number;
}

export const ScrollToTop = ({
  children,
  offset = 300,
  className,
  ...rest
}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
  setIsVisible(window.scrollY > offset);
}, [offset]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [handleScroll]);

  return (
    <Flex
      onClick={scrollToTop}
      aria-hidden={!isVisible}
      position="fixed"
      bottom="16"
      right="16"
      className={classNames(styles.scrollToTop, className)}
      data-visible={isVisible}
      tabIndex={isVisible ? 0 : -1}
      zIndex={isVisible ? 8 : 0}
      cursor="pointer"
      {...rest}
    >
      {children}
    </Flex>
  );
};
