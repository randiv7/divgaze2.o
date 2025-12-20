import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { FluidHero } from '@/components/shared/FluidHero';

const services = [
  {
    title: 'Creative Lab',
    description: 'AI content, social media, campaigns, video editing.',
    href: '/creative-lab',
    image: '/mon.png',
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

      {/* About Preview Section */}
      <section id="about" className="section-full bg-secondary font-inter">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
                About Us
              </span>
              <h2 className="heading-lg mb-8">
                Built for the <span className="opacity-60">future.</span>
              </h2>
              <p className="body-md text-muted-foreground mb-6">
                Divgaze is where creativity meets technology. We're a multidisciplinary studio 
                that believes in pushing boundaries—whether through compelling content, 
                intelligent AI systems, or robust digital infrastructure.
              </p>
              <p className="body-md text-muted-foreground mb-8">
                Our team combines artistic vision with technical excellence to deliver 
                solutions that don't just meet expectations—they redefine them.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="relative aspect-square bg-primary/5 flex items-center justify-center">
                <div className="absolute inset-4 border border-border" />
                <div className="absolute inset-8 bg-secondary" />
                <span className="relative text-8xl font-bold opacity-10">D</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section id="contact" className="section-full bg-primary text-primary-foreground font-inter">
        <div className="container-premium text-center">
          <AnimatedSection>
            <h2 className="heading-lg mb-6">
              Let's build <span className="opacity-60">beyond boundaries.</span>
            </h2>
            <p className="body-lg text-primary-foreground/70 max-w-2xl mx-auto mb-12">
              Ready to transform your ideas into reality? Let's start a conversation.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;