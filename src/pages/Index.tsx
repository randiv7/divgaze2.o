import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { FluidHero } from '@/components/shared/FluidHero';
import { ContactSection } from '@/components/shared/ContactSection';
import { AboutSection } from '@/components/shared/AboutSection';

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
      {/* Hero Section with 3D Glass Text */}
      <section 
        id="home" 
        className="relative overflow-hidden font-inter pt-20 min-h-screen flex flex-col justify-center" 
        style={{ background: '#000000' }}
      >
        {/* 3D Canvas Background with integrated "Divgaze" glass text */}
        <FluidHero />
      </section>

      {/* Services Section */}
      <section id="services" className="section-full bg-background font-inter">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Our Services
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              Three disciplines, <span className="opacity-60">one vision.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 lg:gap-x-14">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section with PhilosophySection Style */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />
    </Layout>
  );
};

export default Index;