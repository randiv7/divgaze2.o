import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { FluidHero } from '@/components/shared/FluidHero';

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
      {/* Hero Section with 3D Background */}
      <section 
        id="home" 
        className="relative overflow-hidden font-inter pt-20 min-h-screen flex flex-col justify-center" 
        style={{ background: '#000000' }}
      >
        {/* 3D Canvas Background - Contained to hero section only */}
        <FluidHero />

        {/* Content Overlay */}
        <div className="container-premium relative py-20 md:py-32" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wide text-purple-300 uppercase glass-panel rounded-full">
              Beyond Boundaries
            </div>
            
            <h1 className="heading-xl max-w-4xl text-white mb-4">
              Divgaze — <span className="text-gradient-neon">Creative, AI & Systems.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-6 md:mt-8"
          >
            <p className="body-lg max-w-2xl text-gray-300 leading-relaxed">
              We craft content, intelligence, and digital systems for modern brands.
              <br className="hidden md:block" />
              Experience the future of digital transformation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={scrollToServices} 
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Services
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            
            <Link
              to="/about"
              className="px-6 md:px-8 py-3 md:py-4 glass-panel text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 justify-center"
            >
              About Us
            </Link>
          </motion.div>

          {/* Scroll Indicator - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={scrollToServices}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <ArrowDown className="w-6 h-6 text-white" />
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