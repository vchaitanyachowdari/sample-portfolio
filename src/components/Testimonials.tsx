"use client";
import React, { useState } from "react";
import {
  Flex,
  Column,
  Text,
  Heading,
  Button,
  Avatar,
  Icon,
} from "@/once-ui/components";
import styles from "@/components/Testimonials.module.scss";
import { testimonials } from "@/app/resources/content";

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500); // Match the transition duration
  };

  const handlePrevious = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 500); // Match the transition duration
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Column
      fillWidth
      gap="m"
      horizontal="center"
      paddingY="l"
      className={styles.testimonials}
    >
      <Heading as="h2" variant="display-strong-xs" wrap="balance">
        Testimonials
      </Heading>
      <Text variant="heading-default-m" onBackground="neutral-weak">
        Here's what people I've worked with think of my work...
      </Text>
      <Flex
        background="surface"
        border="brand-medium"
        radius="l"
        padding="l"
        shadow="l"
        direction="column"
        gap="m"
        horizontal="center"
        style={{
          maxWidth: "1200px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Column className="absolute top-[10%] left-32">
          <Flex className="absolute top-[10%] left-32">
            <Icon
              name="startQuote"
              onBackground="brand-medium"
              size="xl"
              style={{
                position: "absolute",
                top: "10%",
                left: "32px",
                alignSelf:"start" // Adjust this value to move it to the left
              }}
            />
          </Flex>
        </Column>
        <div
          className={`${styles["testimonial-content"]} ${
            isAnimating ? "" : styles.active
          }`}
        >
          <Avatar
            src={currentTestimonial.avatar}
            size="xl"
            className={styles.avatar}
          />
          <Text variant="body-default-s" onBackground="neutral-strong">
            {currentTestimonial.feedback}
          </Text>
          <Column gap="4" style={{ marginTop: "16" }}>
            <Flex gap="4" direction="column">
              <Text
                variant="heading-default-m"
                onBackground="brand-medium"
                className={styles.name}
              >
                {currentTestimonial.name}
              </Text>
              <Text variant="body-default-s" onBackground="brand-weak">
                {currentTestimonial.role}
              </Text>
            </Flex>
          </Column>
        </div>
        <Icon
          name="endQuote"
          onBackground="brand-medium"
          size="xl"
          style={{
            // position: "absolute",
            // bottom: window.innerWidth <= 768 ? "8px" : "10%",
            // right: window.innerWidth <= 768 ? "8px" : "32px",
            alignSelf: "end"
          }}
        />
      </Flex>
      <Flex gap="16" horizontal="center" className={styles.buttons}>
        <Button onClick={handlePrevious} size="l" prefixIcon="chevronLeft" />
        <Button onClick={handleNext} size="l" prefixIcon="chevronRight" />
      </Flex>
    </Column>
  );
};
