"use client"
import { InlineCode } from "@/once-ui/components";
import React, { useEffect, useState } from "react";

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        // Fetch user's timezone using an IP-based geolocation API
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const timezone = data.timezone;

        // Get local time
        const localTime = new Date().toLocaleTimeString("en-US", {
          timeZone: timezone,
          hour: "2-digit",
          hour12: false,
        });

        const hour = parseInt(localTime.split(":")[0]);

        // Determine greeting based on hour
        if (hour >= 5 && hour < 12) {
          setGreeting("Good Morning");
        } else if (hour >= 12 && hour < 18) {
          setGreeting("Good Afternoon");
        } else {
          setGreeting("Good Evening");
        }
      } catch (error) {
        console.error("Error fetching user location or time:", error);
        setGreeting("Hello");
      }
    };

    fetchGreeting();
  }, []);

  return <InlineCode>{greeting}</InlineCode>;
};

export default Greeting;