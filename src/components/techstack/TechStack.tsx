import React from "react";
import { Flex, Text } from "@/once-ui/components";
import * as IconComponents from "@/components/Icons";
import clsx from "clsx";

interface TechStackLogoProps {
  icon: string;
  name: string;
}

export const TechStackLogo: React.FC<TechStackLogoProps> = ({ icon, name }) => {
  const IconComponent = Icons[icon];

  return (
    <div className={clsx("transition duration-200 hover:text-primary")}>
      <Flex direction="column" align="center" gap="8">
        {IconComponent ? (
          <IconComponent
            className={clsx("h-6 w-6")}
            style={{ width: "48px", height: "48px" }}
          />
        ) : (
          <Text variant="body-default-s" color="error">
            Icon not found
          </Text>
        )}
        {/* <Text variant="body-default-s">{name}</Text> */}
      </Flex>
    </div>
  );
};
