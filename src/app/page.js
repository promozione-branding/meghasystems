import About from "@/components/home/About";
import CertificatesSection from "@/components/home/CertificatesSection";
import CertificationSection from "@/components/home/CertificationSection";
import ChannelPartners from "@/components/home/ChannelPartners";
import FAQSection from "@/components/home/FAQSection";
import Hero from "@/components/home/Hero";
import MeghaInteractiveSection from "@/components/home/MeghaInteractiveSection";
import ServicesSection from "@/components/home/MeghaShowcase";
import ProductMarquee from "@/components/home/ProductMarquee";
import ProductShowcase from "@/components/home/ProductShowcase";
import ProjectsSection from "@/components/home/ProjectsSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function Home() {
  return (
    <>
      <Hero />
      <ProductMarquee />
      <About />
      <StatsSection />
      <ServicesSection />
      <ProductShowcase />
      <ChannelPartners />
      <ProjectsSection />
      <MeghaInteractiveSection />
      <CertificationSection />
      <WhyChooseUs />
      <CertificatesSection />
      <FAQSection />
      <TestimonialsSection />
    </>
  );
}
