import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Brain, Cpu, Workflow, Zap, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const services = [
  {
    icon: Bot,
    title: 'Agentic AI Workflows',
    description: 'Autonomous agents that handle complex tasks, make decisions, and execute multi-step processes.',
  },
  {
    icon: Brain,
    title: 'Generative AI Tools',
    description: 'Custom AI solutions for content generation, image synthesis, and creative automation.',
  },
  {
    icon: Cpu,
    title: 'Machine Learning Systems',
    description: 'Production-ready ML pipelines for prediction, classification, and optimization.',
  },
];

const useCases = [
  'Customer Service Automation',
  'Document Processing & Analysis',
  'Predictive Analytics',
  'Content Generation at Scale',
  'Process Optimization',
  'Intelligent Search & Discovery',
];

const portfolio = [
  {
    title: 'AI Customer Agent',
    outcome: 'Reduced response time by 85%',
    description: 'Autonomous support agent handling 10,000+ queries daily.',
  },
  {
    title: 'Document Intelligence',
    outcome: 'Processing 50,000 docs/month',
    description: 'Automated extraction and classification system.',
  },
  {
    title: 'Predictive Maintenance',
    outcome: 'Prevented $2M in downtime',
    description: 'ML model for equipment failure prediction.',
  },
];

const techStack = [
  'OpenAI', 'LangChain', 'PyTorch', 'TensorFlow', 'Hugging Face', 'Vector DBs'
];

const AISolutions = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-full relative overflow-hidden font-space-grotesk pt-20 bg-primary text-primary-foreground">
        <div className="noise-overlay opacity-[0.05]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--primary-foreground) / 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, hsl(var(--primary-foreground) / 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          {/* Floating Nodes */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-primary-foreground/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-primary-foreground/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="container-premium relative z-10">
          <AnimatedSection>
            <span className="text-sm font-medium text-primary-foreground/60 tracking-widest uppercase mb-4 block">
              AI Solutions
            </span>
            <h1 className="heading-xl max-w-4xl">
              Intelligence, <span className="opacity-60">engineered.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="body-lg max-w-2xl text-primary-foreground/70 mt-8">
              We build AI systems that think, learn, and act. From agentic workflows 
              to production ML pipelines, we turn complex problems into elegant solutions.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-12">
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary font-medium 
                           transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              >
                Discuss Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What We Solve */}
      <section className="section-full bg-gray-900 text-primary-foreground font-space-grotesk">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4 block">
              What We Solve
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              Complex problems, <span className="opacity-60">intelligent solutions.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <div className="p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300 group">
                  <service.icon className="w-10 h-10 mb-6 text-gray-400 group-hover:text-primary-foreground transition-colors" />
                  <h3 className="heading-sm mb-3">{service.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-full bg-primary text-primary-foreground font-space-grotesk">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-primary-foreground/60 tracking-widest uppercase mb-4 block">
              Use Cases
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              AI that drives <span className="opacity-60">real results.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <AnimatedSection key={useCase} delay={index * 0.08}>
                <div className="flex items-center gap-4 p-6 border border-primary-foreground/20 hover:border-primary-foreground/40 transition-colors">
                  <Zap className="w-5 h-5 text-primary-foreground/60" />
                  <span className="font-medium">{useCase}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section-full bg-gray-900 text-primary-foreground font-space-grotesk">
        <div className="container-premium">
          <AnimatedSection>
            <span className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="heading-lg max-w-3xl mb-16">
              Measurable <span className="opacity-60">impact.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 0.12}>
                <div className="p-8 bg-gray-800/50 hover:bg-gray-800 transition-all duration-300">
                  <span className="text-sm font-mono text-gray-500">{project.outcome}</span>
                  <h3 className="heading-sm mt-4 mb-3">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-primary text-primary-foreground font-space-grotesk">
        <div className="container-premium">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <span className="text-sm font-medium text-primary-foreground/60 tracking-widest uppercase mb-2 block">
                  Tech Stack
                </span>
                <h3 className="heading-md">Built with industry-leading tools.</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 border border-primary-foreground/20 text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-full bg-gray-900 text-primary-foreground font-space-grotesk">
        <div className="container-premium text-center">
          <AnimatedSection>
            <h2 className="heading-lg mb-6">
              Ready to build <span className="opacity-60">intelligent systems?</span>
            </h2>
            <p className="body-lg text-gray-400 max-w-2xl mx-auto mb-12">
              Let's discuss how AI can transform your business operations.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary font-medium 
                         transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            >
              Start a Conversation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default AISolutions;
