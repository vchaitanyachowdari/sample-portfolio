"use client";
import React, { useEffect, useState } from "react";
import { Flex, Icon, RevealFx, SmartImage, Text } from "@/once-ui/components";
import DashboardStats from "./DashboardStats";

interface Service {
  name: string;
  icon: string; // Icon URL or path
  endpoint: string; // URL to ping
  url: string; // URL to open on click
}

const services: Service[] = [
  {
    name: "Immich",
    icon: "/icons/immich.svg",
    endpoint: "https://immich.maheshbabu11.dev/api/server/ping",
    url: "https://immich.maheshbabu11.dev",
  },
  {
    name: "Gotify",
    icon: "/icons/gotify.svg",
    endpoint: "https://gotify.maheshbabu11.dev/health",
    url: "https://gotify.maheshbabu11.dev",
  },
  {
    name: "Jellyfin",
    icon: "/icons/jellyfin.svg",
    endpoint: "https://jellyfin.maheshbabu11.dev",
    url: "https://jellyfin.maheshbabu11.dev",
  },
  {
    name: "Nextcloud",
    icon: "/icons/next_cloud.svg",
    endpoint: "https://nextcloud.maheshbabu11.dev",
    url: "https://nextcloud.maheshbabu11.dev",
  },
  {
    name: "ASCII Art",
    icon: "/icons/ascii_art.svg",
    endpoint: "https://ascii-art-generator.maheshbabu11.dev",
    url: "https://ascii-art-generator.maheshbabu11.dev",
  },
  {
    name: "Stats Server",
    icon: "/icons/server.png",
    endpoint: "https://stats.maheshbabu11.dev/health",
    url: "https://stats.maheshbabu11.dev/stats",
  },
];

const HomeLab: React.FC = () => {
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const checkServiceStatus = async () => {
    const updatedStatuses: Record<string, string> = {};

    for (const service of services) {
      try {
        const response = await fetch(
          `/api/check?url=${encodeURIComponent(service.endpoint)}`
        );
        const data = await response.json();
        updatedStatuses[service.name] = data.status;
      } catch (error) {
        updatedStatuses[service.name] = "Offline";
      }
    }

    setStatuses(updatedStatuses);
  };

  useEffect(() => {
    // Initial check
    checkServiceStatus();

    // Set interval to check every 1 minute
    const interval = setInterval(() => {
      checkServiceStatus();
    }, 60000); // 1 minute = 60000 ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Flex direction="column" gap="l" padding="m" align="center">
      <Text variant="heading-default-m">Home Lab Services</Text>
      <RevealFx translateY="8" delay={0.2} fillWidth>
        <Flex gap="l" wrap content="center" center={true}>
          {services.map((service) => (
            <Flex
              key={service.name}
              direction="column"
              align="center"
              onClick={() => window.open(service.url, "_blank")}
              style={{
                width: "110px",
                height: "110px",
                position: "relative",
                background: "var(--neutral-alpha-medium)",
                borderRadius: "8px",
                padding: "1rem",
                // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Icon */}
              <SmartImage
                src={service.icon}
                alt={service.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />

              {/* Service Name */}
              <Text
                variant="body-default-xs"
                style={{
                  marginTop: "0.5rem",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {service.name}
              </Text>

              {/* Status Indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background:
                    statuses[service.name] === "Online"
                      ? "green" // Online color
                      : "red", // Offline color
                  border: "2px solid var(--surface)",
                }}
              ></div>
            </Flex>
          ))}
        </Flex>
      </RevealFx>
      <DashboardStats />
    </Flex>
  );
};

export default HomeLab;
