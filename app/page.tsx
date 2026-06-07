import { HomeExperience } from "@/components/HomeExperience";
import { homeMetadata } from "@/lib/metadata";
import { localBusinessSchema, webSiteSchema } from "@/lib/schema";

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <>
      {/* LocalBusiness: Sternebewertungen & Kontakt in Google SERP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      {/* WebSite: Domain als Marke bei Google registrieren */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
      />
      <HomeExperience />
    </>
  );
}
