import { HomeExperience } from "@/components/HomeExperience";
import { homeMetadata } from "@/lib/metadata";
import { localBusinessSchema } from "@/lib/schema";

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <HomeExperience />
    </>
  );
}
