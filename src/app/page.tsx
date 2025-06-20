import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Arrow,
  Column,
  LetterFx,
  Icon,
  Card,
  SmartImage,
  Badge,
} from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, display, routes } from "@/app/resources";
import {
  home,
  about,
  person,
  newsletter,
  techStack,
} from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { TechStackLogo } from "@/components/techstack/TechStack";
import { Testimonials } from "@/components/Testimonials";
import Greeting from "@/components/Greeting";
import Quote from "@/components/Quote";
import GetInTouch from "@/components/GetInTouch";
import CertificateCarousel from "@/components/CertificateCarousel";
export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Column fillWidth paddingY="l" gap="s">
        <Column maxWidth="s">
          <Heading wrap="balance" variant="display-strong-l" marginBottom="s">
            {/* {home.headline} */}
            <LetterFx
              speed="medium"
              trigger="instant"
              charset={[
                "α",
                "β",
                "γ",
                "δ",
                "ε",
                "ζ",
                "η",
                "θ",
                "ι",
                "κ",
                "λ",
                "μ",
                "ν",
                "ξ",
                "ο",
              ]}
            >
              {home.headline}
            </LetterFx>
          </Heading>

          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="start"
            paddingBottom="m"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              👋 Hey {display.greeting && <Greeting />}, {home.subline}
            </Text>
          </RevealFx>

          {/* <Text
            wrap="balance"
            onBackground="neutral-weak"
            variant="heading-default-xl"
             marginBottom="m"
          >
            <LetterFx
              speed="fast"
              trigger="instant"
              charset={[
                "X",
                "@",
                "$",
                "a",
                "H",
                "z",
                "o",
                "0",
                "y",
                "#",
                "?",
                "*",
                "0",
                "1",
                "+",
              ]}
            >
              {home.subline}
            </LetterFx>
          </Text> */}

          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Button
              id="about"
              data-border="rounded"
              href="/about"
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
        {/* <RevealFx translateY="12" delay={0.4} horizontal="start">
          <Flex
            horizontal="start"
            style={{
              flexDirection: "column", // Stack elements vertically
              maxWidth: "60%",
            }}
          >
            <Icon
              name="startQuote"
              size="xl"
              style={{ alignSelf: "start" }}
              onBackground="brand-medium"
            />
            <Text
              variant="heading-default-m"
              onBackground="neutral-weak"
              style={{
                fontStyle: "italic",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              {" "}
              <Quote />
            </Text>
            <Icon
              name="endQuote"
              size="xl"
              style={{ alignSelf: "end" }}
              onBackground="brand-medium"
            />
          </Flex>
        </RevealFx> */}
        {display.quote && (
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Badge maxWidth={60} opacity={80} arrow={false} marginBottom="s">
              <Text
                variant="heading-default-m"
                onBackground="neutral-weak"
                style={{
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                <Quote />
              </Text>
            </Badge>
          </RevealFx>
        )}
      </Column>

      <RevealFx translateY="20" delay={0.8}>
        {techStack.display && (
          <Column fillWidth paddingY="0" gap="m">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              My Tech Stack
            </Heading>
            <Flex
              gap="16"
              horizontal="center"
              wrap={true} // Ensure items wrap in smaller viewports
              style={{ justifyContent: "center" }} // Center items in mobile view
            >
              {techStack.tech.map((tech) => (
                <TechStackLogo
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                />
              ))}
            </Flex>
          </Column>
        )}
      </RevealFx>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}
      <Column maxWidth="m" gap="m" horizontal="center">
      <CertificateCarousel/>
    </Column>
      {/* <Projects range={[2]} /> */}
      <Column maxWidth="m" gap="xl" horizontal="center">
        {/* ...existing content */}
        <RevealFx translateY="16" delay={0.6}>
          <Testimonials />
        </RevealFx>
        {/* ...existing content */}
      </Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}

      <Column maxWidth="m" gap="xl" horizontal="center">
      {/* ...existing content */}
      <RevealFx translateY="16" delay={0.6}>
        <GetInTouch />
      </RevealFx>
      {/* ...existing content */}
    </Column>
    </Column>
  );
}
