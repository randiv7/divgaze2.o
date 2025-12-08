import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Globe, Heart, Zap, Target } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const values = [
  {
    icon: Heart,
    title: 'Client First',
    description: 'We put our clients first — always. We dive deep into every project, explore every angle, and give our absolute best.',
  },
  {
    icon: Zap,
    title: 'Bold Innovation',
    description: 'We embrace experimentation. We welcome risk. Because we know real innovation happens outside the comfort zone.',
  },
  {
    icon: Target,
    title: 'Purposeful Solutions',
    description: 'Every line of code we write has purpose. Every design decision serves your vision. We create real competitive advantages.',
  },
];

const locations = [
  {
    country: 'Sri Lanka',
    city: 'Colombo',
    phone: '+94 707 616 554',
    hours: 'Monday-Friday, 9 AM - 6 PM (IST)',
  },
  {
    country: 'Australia',
    city: 'Melbourne',
    phone: '+61 408 840 996',
    hours: 'Monday-Friday, 9 AM - 5 PM (AEST)',
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-full relative overflow-hidden font-inter pt-20 bg-background">
        <div className="noise-overlay" />

        <div className="container-premium relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
                About Us
              </span>
              <h1 className="heading-xl">
                Who We <span className="opacity-60">Are.</span>
              </h1>
              <p className="body-lg text-muted-foreground mt-8">
                We're Divgaze — a passionate, creative tech startup based in Sri Lanka, 
                with deep roots extending to Melbourne, Australia.
              </p>
              <p className="text-muted-foreground mt-4">
                At our core, we're a team of curious builders and bold thinkers who believe 
                in creating digital experiences that truly make a difference. We're not just 
                here to deliver services — we're here to partner with you, challenge ideas, 
                and bring visions to life.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="relative aspect-square bg-secondary flex items-center justify-center">
                <div className="absolute inset-8 border-2 border-foreground/10" />
                <span className="text-[200px] font-bold opacity-5">D</span>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>Sri Lanka & Australia</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="section-full bg-secondary font-inter">
        <div className="container-premium">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
                What Sets Us Apart
              </span>
              <h2 className="heading-lg mb-8">
                Beyond <span className="opacity-60">Boundaries.</span>
              </h2>
              <p className="body-lg text-muted-foreground">
                What sets us apart? We put our clients first — always. We dive deep into 
                every project, explore every angle, and give our absolute best to craft 
                solutions that are smart, scalable, and meaningful.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Divgaze */}
      <section className="section-full bg-background font-inter">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
                Why Choose Divgaze
              </span>
              <h2 className="heading-lg mb-8">
                Creating <span className="opacity-60">Extraordinary.</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Every line of code we write has purpose. Every design decision serves your 
                vision. We're not interested in building "just another website" — we create 
                solutions that give you real competitive advantages.
              </p>
              <p className="text-muted-foreground mb-6">
                We deliver faster, think deeper, and build smarter. Your project isn't just 
                another task on our list — it's an opportunity to create something extraordinary 
                together.
              </p>
              <p className="text-foreground font-medium">
                The result? Digital experiences that don't just meet today's needs — they 
                anticipate tomorrow's opportunities.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary p-8 aspect-square flex items-center justify-center">
                  <span className="text-6xl font-bold opacity-10">01</span>
                </div>
                <div className="bg-primary text-primary-foreground p-8 aspect-square flex items-center justify-center">
                  <span className="text-6xl font-bold opacity-20">02</span>
                </div>
                <div className="bg-primary text-primary-foreground p-8 aspect-square flex items-center justify-center">
                  <span className="text-6xl font-bold opacity-20">03</span>
                </div>
                <div className="bg-secondary p-8 aspect-square flex items-center justify-center">
                  <span className="text-6xl font-bold opacity-10">04</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-full bg-secondary font-inter">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Our Values
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              What we <span className="opacity-60">stand for.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.15}>
                <div className="relative">
                  <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="heading-md mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="section-full bg-background font-inter">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Our Locations
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              Where we <span className="opacity-60">operate.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <AnimatedSection key={location.country} delay={index * 0.15}>
                <div className="bg-secondary p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6" />
                    <h3 className="heading-sm">{location.country}</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">{location.city}</p>
                  <p className="text-foreground font-medium mb-2">{location.phone}</p>
                  <p className="text-sm text-muted-foreground">{location.hours}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-full bg-primary text-primary-foreground font-inter">
        <div className="container-premium text-center">
          <AnimatedSection>
            <h2 className="heading-lg mb-6">
              Ready to work <span className="opacity-60">together?</span>
            </h2>
            <p className="body-lg text-primary-foreground/70 max-w-2xl mx-auto mb-12">
              Let's create something extraordinary.
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

export default About;
