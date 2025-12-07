import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const values = [
  {
    title: 'Creative',
    description: 'We approach every project with fresh perspectives and bold ideas that break conventions.',
  },
  {
    title: 'Intelligent',
    description: 'We leverage data, AI, and strategic thinking to make informed decisions.',
  },
  {
    title: 'Engineered',
    description: 'We build with precision, ensuring every solution is robust and scalable.',
  },
];

const milestones = [
  { year: '2020', title: 'Founded', description: 'Divgaze was born with a vision to merge creativity and technology.' },
  { year: '2021', title: 'First AI Project', description: 'Delivered our first enterprise AI solution.' },
  { year: '2022', title: 'Team Growth', description: 'Expanded to a multidisciplinary team of 15+.' },
  { year: '2023', title: 'Global Clients', description: 'Serving clients across 12 countries.' },
  { year: '2024', title: 'Beyond Boundaries', description: 'Launching new initiatives in emerging tech.' },
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
                We are <span className="opacity-60">Divgaze.</span>
              </h1>
              <p className="body-lg text-muted-foreground mt-8">
                A multidisciplinary studio where creativity meets technology. We believe in 
                pushing boundaries—whether through compelling content, intelligent AI systems, 
                or robust digital infrastructure.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="relative aspect-square bg-secondary flex items-center justify-center">
                <div className="absolute inset-8 border-2 border-foreground/10" />
                <span className="text-[200px] font-bold opacity-5">D</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-full bg-secondary font-inter">
        <div className="container-premium">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
                Our Vision
              </span>
              <h2 className="heading-lg mb-8">
                Beyond <span className="opacity-60">Boundaries.</span>
              </h2>
              <p className="body-lg text-muted-foreground">
                We exist to help brands transcend limitations. In a world where technology 
                evolves rapidly and creativity knows no bounds, we position ourselves at 
                the intersection—crafting solutions that are both innovative and impactful.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="section-full bg-background font-inter">
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
                  <span className="text-7xl font-bold opacity-5">{value.title.charAt(0)}</span>
                  <div className="mt-[-1.5rem]">
                    <h3 className="heading-md mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-full bg-secondary font-inter">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Our Journey
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              Key <span className="opacity-60">milestones.</span>
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <AnimatedSection
                  key={milestone.year}
                  delay={index * 0.1}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}>
                    {/* Content */}
                    <div className={`flex-1 pl-8 md:pl-0 ${
                      index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'
                    }`}>
                      <span className="text-4xl font-bold opacity-20">{milestone.year}</span>
                      <h3 className="heading-sm mt-2 mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-[-5px] md:left-1/2 md:ml-[-6px] top-2 w-3 h-3 bg-foreground rounded-full" />

                    {/* Spacer */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
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
