import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ServiceCard } from '@/components/shared/ServiceCard';

const services = [
  {
    title: 'Creative Lab',
    description: 'AI content, social media, campaigns, video editing.',
    href: '/creative-lab',
  },
  {
    title: 'AI Solutions',
    description: 'Agentic workflows, generative AI, ML systems.',
    href: '/ai-solutions',
  },
  {
    title: 'Web Dev & Systems',
    description: 'E-commerce, POS systems, custom web applications.',
    href: '/web-dev',
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

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section id="home" className="section-full relative overflow-hidden font-inter pt-20">
        <div className="noise-overlay" />
        
        {/* Abstract Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-[10%] w-64 h-64 border border-border rounded-full opacity-30"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 left-[5%] w-96 h-96 border border-border opacity-20"
            style={{ transform: 'rotate(45deg)' }}
            animate={{ rotate: [45, 55, 45] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/3 left-1/4 w-32 h-32 bg-secondary opacity-50"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <h1 className="heading-xl max-w-4xl">
              Divgaze — <span className="opacity-60">Beyond Boundaries.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-8"
          >
            <p className="body-lg max-w-2xl text-muted-foreground">
              A creative, AI, and systems studio.
              <br />
              We craft content, intelligence, and digital systems for modern brands.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <button onClick={scrollToServices} className="btn-primary">
              Explore Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <a href="#about" className="btn-secondary">
              About Us
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
              onClick={scrollToServices}
            >
              <ArrowDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
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

          <div className="grid md:grid-cols-3 gap-6">
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
              <Link to="/about" className="btn-primary">
                Read More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
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
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary font-medium 
                         transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
