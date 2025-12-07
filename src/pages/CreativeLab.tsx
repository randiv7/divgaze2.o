import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Video, Megaphone, Camera, PenTool, Sparkles } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { PortfolioCard } from '@/components/shared/PortfolioCard';

const services = [
  {
    icon: Sparkles,
    title: 'AI-Powered Content',
    description: 'Leverage generative AI to create unique, engaging content at scale.',
  },
  {
    icon: Video,
    title: 'Video Production',
    description: 'Professional editing, motion graphics, and visual storytelling.',
  },
  {
    icon: Megaphone,
    title: 'Campaign Strategy',
    description: 'Data-driven campaigns that resonate with your target audience.',
  },
  {
    icon: Camera,
    title: 'Social Media',
    description: 'Complete social presence management across all platforms.',
  },
  {
    icon: PenTool,
    title: 'Brand Identity',
    description: 'Visual systems that communicate your unique story.',
  },
  {
    icon: Palette,
    title: 'Visual Design',
    description: 'Stunning graphics and illustrations that captivate.',
  },
];

const portfolio = [
  { title: 'Brand Refresh', description: 'Complete visual identity overhaul for tech startup.', category: 'Brand Identity' },
  { title: 'Social Campaign', description: 'Viral social media series with 2M+ impressions.', category: 'Social Media' },
  { title: 'Product Launch', description: 'Full-scale video campaign for product release.', category: 'Video Campaign' },
  { title: 'AI Content Series', description: 'Automated content pipeline for e-commerce brand.', category: 'AI Content' },
  { title: 'Event Visuals', description: 'Motion graphics and stage design for conference.', category: 'Motion Design' },
  { title: 'Editorial Design', description: 'Magazine layout and photography direction.', category: 'Print Design' },
];

const process = [
  { step: '01', title: 'Discover', description: 'We dive deep into your brand, audience, and goals.' },
  { step: '02', title: 'Create', description: 'Our team crafts compelling content and visuals.' },
  { step: '03', title: 'Deliver', description: 'Polished assets ready to make an impact.' },
];

const CreativeLab = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-full relative overflow-hidden font-satoshi pt-20 bg-background">
        <div className="noise-overlay" />
        
        {/* Organic Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-[15%] w-80 h-80 bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-40" />
        </div>

        <div className="container-premium relative z-10">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Creative Lab
            </span>
            <h1 className="heading-xl max-w-4xl">
              Where art meets <span className="opacity-60">algorithm.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="body-lg max-w-2xl text-muted-foreground mt-8">
              We blend creative intuition with cutting-edge AI to produce content 
              that captivates, converts, and creates lasting impressions.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-12">
              <Link to="/contact" className="btn-primary">
                Start a Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-full bg-secondary font-satoshi">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              What We Do
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              Full-spectrum <span className="opacity-60">creative services.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <div className="p-8 bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 group">
                  <service.icon className="w-8 h-8 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="heading-sm mb-3">{service.title}</h3>
                  <p className="text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                    {service.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Process */}
      <section className="section-full bg-background font-satoshi">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Our Process
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              Simple, effective, <span className="opacity-60">results-driven.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-12">
            {process.map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.15}>
                <div className="relative">
                  <span className="text-8xl font-bold opacity-10">{item.step}</span>
                  <div className="mt-[-2rem]">
                    <h3 className="heading-md mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section-full bg-secondary font-satoshi">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              Selected <span className="opacity-60">works.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <PortfolioCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-full bg-primary text-primary-foreground font-satoshi">
        <div className="container-premium text-center">
          <AnimatedSection>
            <h2 className="heading-lg mb-6">
              Ready to create <span className="opacity-60">something extraordinary?</span>
            </h2>
            <p className="body-lg text-primary-foreground/70 max-w-2xl mx-auto mb-12">
              Let's collaborate and bring your vision to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary font-medium 
                         transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default CreativeLab;
