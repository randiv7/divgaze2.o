import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, MonitorSmartphone, Code2, Plug, Layers, Server } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const services = [
  {
    icon: ShoppingCart,
    title: 'Online Stores',
    description: 'E-commerce platforms built for conversion, from Shopify customizations to fully custom solutions.',
  },
  {
    icon: MonitorSmartphone,
    title: 'POS & Internal Systems',
    description: 'Point-of-sale integrations and internal tools that streamline your operations.',
  },
  {
    icon: Code2,
    title: 'Custom Web Apps',
    description: 'Bespoke web applications tailored to your unique business requirements.',
  },
  {
    icon: Plug,
    title: 'API Integrations',
    description: 'Connect your systems with third-party services for seamless data flow.',
  },
];

const portfolio = [
  {
    title: 'E-Commerce Platform',
    category: 'Online Store',
    description: 'Custom Shopify Plus build with integrated inventory management.',
  },
  {
    title: 'Restaurant POS',
    category: 'POS System',
    description: 'Full-service point-of-sale system with kitchen display integration.',
  },
  {
    title: 'Booking Platform',
    category: 'Web Application',
    description: 'Multi-location booking system with payment processing.',
  },
  {
    title: 'CRM Dashboard',
    category: 'Internal Tool',
    description: 'Custom CRM with analytics and reporting capabilities.',
  },
];

const process = [
  { step: 'Plan', description: 'Requirements gathering, architecture design, and project roadmap.' },
  { step: 'Build', description: 'Agile development with regular check-ins and iterative delivery.' },
  { step: 'Launch', description: 'Deployment, testing, training, and ongoing support.' },
];

const WebDev = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-full relative overflow-hidden font-ibm-plex pt-20 bg-gray-50">
        <div className="noise-overlay" />

        <div className="container-premium relative z-10">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Web Dev & Systems
            </span>
            <h1 className="heading-xl max-w-4xl text-foreground">
              Systems that <span className="opacity-60">scale.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="body-lg max-w-2xl text-muted-foreground mt-8">
              We engineer robust digital infrastructure—from e-commerce platforms 
              to custom applications—built for performance and growth.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-12">
              <Link to="/contact" className="btn-primary">
                Get a Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What We Build */}
      <section className="section-full bg-background font-ibm-plex">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              What We Build
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              Digital infrastructure, <span className="opacity-60">done right.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <div className="p-8 bg-gray-50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group">
                  <service.icon className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
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

      {/* Portfolio */}
      <section className="section-full bg-gray-50 font-ibm-plex">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              Recent <span className="opacity-60">projects.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolio.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 0.1}>
                <div className="group cursor-pointer">
                  {/* Mock UI Frame */}
                  <div className="relative aspect-video bg-background border border-border overflow-hidden mb-4">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 border-b border-border flex items-center px-3 gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                    </div>
                    <div className="absolute top-8 inset-x-0 bottom-0 p-4 flex flex-col gap-3">
                      <div className="h-4 bg-gray-100 w-3/4" />
                      <div className="h-4 bg-gray-100 w-1/2" />
                      <div className="flex gap-3 mt-2">
                        <div className="h-8 bg-gray-200 flex-1" />
                        <div className="h-8 bg-gray-200 flex-1" />
                      </div>
                      <div className="flex-1 bg-gray-50 mt-2" />
                    </div>
                  </div>
                  
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{project.category}</span>
                  <h3 className="heading-sm mt-2 mb-2 group-hover:opacity-70 transition-opacity">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-full bg-background font-ibm-plex">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Our Process
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              From concept to <span className="opacity-60">launch.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-12">
            {process.map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.15}>
                <div className="relative pl-8 border-l-2 border-border">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 bg-foreground rounded-full" />
                  <h3 className="heading-md mb-4">{item.step}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-full bg-primary text-primary-foreground font-ibm-plex">
        <div className="container-premium text-center">
          <AnimatedSection>
            <h2 className="heading-lg mb-6">
              Ready to build your <span className="opacity-60">digital infrastructure?</span>
            </h2>
            <p className="body-lg text-primary-foreground/70 max-w-2xl mx-auto mb-12">
              Let's create systems that power your growth.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary font-medium 
                         transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default WebDev;
