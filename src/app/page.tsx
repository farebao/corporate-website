import { HeroSection } from '@/components/sections/HeroSection';
import { ValuePropsSection } from '@/components/sections/ValuePropsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { HomeCasesSection } from '@/components/sections/HomeCasesSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValuePropsSection />
      <ServicesSection />
      <HomeCasesSection />
      <TrustSection />
      <CTASection />
    </>
  );
}
