import { StickyTimer }  from "@/components/layout/StickyTimer";
import { BookHero }     from "@/components/sections/BookHero";
import { PainSection }   from "@/components/sections/PainSection";
import { AuthorSection }    from "@/components/sections/AuthorSection";
import { FrameworkSection } from "@/components/sections/FrameworkSection";
import { StartSection }  from "@/components/sections/StartSection";
import { SaleSection }   from "@/components/sections/SaleSection";
import { ScaleSection }  from "@/components/sections/ScaleSection";
import { LeadSection }    from "@/components/sections/LeadSection";
import { BookContents }        from "@/components/sections/BookContents";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { UrgencySection }      from "@/components/sections/UrgencySection";
import { CtaSection }          from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <StickyTimer />
      <main>
        <BookHero />
        <PainSection />
        <AuthorSection />
        <FrameworkSection />
        <StartSection />
        <SaleSection />
        <ScaleSection />
        <LeadSection />
        <BookContents />
        <TestimonialsSection />
        <UrgencySection />
        <CtaSection />
      </main>
    </>
  );
}
