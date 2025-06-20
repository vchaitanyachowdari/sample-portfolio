import { Column, Heading, Icon, Flex } from "@/once-ui/components";
import HomeLab from "@/components/homelab/HomeLab";
import { baseURL } from "@/app/resources";

export async function generateMetadata() {
  const title = "Home Lab";
  const description = "Check the availability of my home lab services.";
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/homelab`,
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

export default function HomeLabPage() {
  return (
    <Column maxWidth="m">
      <Heading as="h1" variant="display-strong-xl" marginBottom="m">
        <Flex align="center" gap="s" style={{ display: "flex", alignItems: "center" }}>
          <Icon
            name="lab"
            size="xl"
            style={{
              fontSize: "var(--size-l)", // Default size for desktop
            }}
            className="responsive-icon"
          />
          <span>Home Lab</span>
        </Flex>
      </Heading>
      <HomeLab />
    </Column>
  );
}