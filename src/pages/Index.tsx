import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { KineticHero } from '@/components/shared/KineticHero';
import { ContactSection } from '@/components/shared/ContactSection';
import { AboutSection } from '@/components/shared/AboutSection';
import { MarqueeSection } from '@/components/shared/MarqueeSection';
import StarField from '@/components/shared/StarField';
import LiquidReveal from '@/components/shared/LiquidReveal';

const services = [
  {
    title: 'Creative Lab',
    description: 'AI content, social media, campaigns, video editing.',
    href: '/creative-lab',
    image: '/mon1.png',
  },
  {
    title: 'AI Solutions',
    description: 'Agentic workflows, generative AI, ML systems.',
    href: '/ai-solutions',
    image: '/ais1.png',
  },
  {
    title: 'Web Dev & Systems',
    description: 'E-commerce, POS systems, custom web applications.',
    href: '/web-dev',
    image: '/web1.png',
  },
];

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.state]);

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        id="home" 
        className="relative overflow-hidden font-inter pt-20 min-h-screen flex flex-col justify-center bg-black"
      >
        <StarField />
        <KineticHero />
      </section>

      {/* Services Section */}
      <section id="services" className="section-full bg-background font-inter">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-4">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Our Services
            </span>
            <h2 className="heading-lg max-w-3xl mb-8 sm:mb-12 md:mb-16">
              Three disciplines, <span className="opacity-60">one vision.</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 md:gap-3 lg:gap-4">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Liquid Reveal Animation Section */}
      <LiquidReveal ghostText="Vision" />

      {/* Marquee Animation Section */}
      <MarqueeSection />

      {/* Contact Section */}
      <ContactSection />
    </Layout>
  );
};

export default Index;