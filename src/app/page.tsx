import { StickyTimer }  from "@/components/layout/StickyTimer";
import { StickyAmazonBadge } from "@/components/layout/StickyAmazonBadge";
import { BookHero }     from "@/components/sections/BookHero";
import { PainSection }   from "@/components/sections/PainSection";
import { AuthorSection }    from "@/components/sections/AuthorSection";
import { AuthorVideoSection } from "@/components/sections/AuthorVideoSection";
import { FrameworkSection } from "@/components/sections/FrameworkSection";
import { StartSection }  from "@/components/sections/StartSection";
import { SaleSection }   from "@/components/sections/SaleSection";
import { ScaleSection }  from "@/components/sections/ScaleSection";
import { LeadSection }    from "@/components/sections/LeadSection";
import { BookContents }        from "@/components/sections/BookContents";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { UrgencySection }      from "@/components/sections/UrgencySection";
import { FaqSection }          from "@/components/sections/FaqSection";
import { CtaSection }          from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <StickyTimer />
      <StickyAmazonBadge />
      <main>
        <BookHero />
        <PainSection />
        <AuthorSection />
        <AuthorVideoSection />
        <FrameworkSection />
        <StartSection />
        <SaleSection />
        <ScaleSection />
        <LeadSection />
        <BookContents />
        <TestimonialsSection />
        <UrgencySection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  );
}
