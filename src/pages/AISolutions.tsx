import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import ParticleBackground from '@/components/shared/ParticleBackground';

const services = [
  {
    title: "Agentic AI Workflows",
    description: "Autonomous agents that handle complex tasks, make decisions, and execute multi-step processes with human-like reasoning."
  },
  {
    title: "Generative AI Tools",
    description: "Custom AI solutions for high-fidelity content generation, image synthesis, and sophisticated creative automation."
  },
  {
    title: "Machine Learning Systems",
    description: "Production-ready ML pipelines designed for enterprise prediction, classification, and continuous optimization."
  }
];

const useCases = [
  "Customer Service Automation",
  "Document Processing & Analysis",
  "Predictive Analytics",
  "Content Generation at Scale",
  "Process Optimization",
  "Intelligent Search & Discovery"
];

const portfolio = [
  {
    metric: "85%",
    context: "Reduction in response time",
    title: "AI Customer Agent",
    description: "Autonomous support agent handling 10,000+ queries daily with high sentiment accuracy and zero-latency resolution."
  },
  {
    metric: "50k",
    context: "Documents processed / month",
    title: "Document Intelligence",
    description: "Automated extraction and classification system for complex financial instruments and legal frameworks."
  },
  {
    metric: "$2M",
    context: "Prevented annual downtime",
    title: "Predictive Maintenance",
    description: "Advanced ML model for mission-critical industrial equipment, identifying failures before they manifest."
  }
];

const techStack = [
  "OpenAI", "LangChain", "LlamaIndex", "Pinecone", "Hugging Face", "Google DeepMind", "FastAPI"
];

const AISolutions = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white font-space-grotesk selection:bg-white selection:text-black">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-32 pt-32 overflow-hidden font-space-grotesk">
          <ParticleBackground />
          <div className="ambient-blob top-[-15%] left-[-10%]"></div>
          <div className="ambient-blob ambient-blob-2 bottom-[5%] right-[-5%]"></div>

          <div className="relative z-10">
            <AnimatedSection direction="up" delay={100}>
              <span className="text-xs uppercase tracking-[0.5em] font-light mb-8 block text-white/50 font-space-grotesk">
                Intelligence, Engineered.
              </span>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={300}>
              <h1 className="text-6xl md:text-[10rem] font-light leading-none tracking-tighter mb-12 font-space-grotesk">
                AI SOLUTIONS
              </h1>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={500} className="max-w-3xl">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/70 mb-16 font-space-grotesk">
                We build AI systems that think, learn, and act. From agentic workflows to production ML pipelines, we turn complex problems into elegant solutions.
              </p>
              <a 
                href="/" 
                onClick={handleContactClick}
                className="inline-block border border-white px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 font-space-grotesk"
              >
                Discuss Your Project
              </a>
            </AnimatedSection>
          </div>

          <div className="absolute right-0 bottom-10 w-1/3 h-px bg-gradient-to-l from-white/30 to-transparent hidden md:block"></div>
        </section>

        {/* Services Section */}
        <section className="py-40 px-8 md:px-32 bg-zinc-900/30 border-y border-white/5 font-space-grotesk">
          <AnimatedSection className="mb-24" direction="left">
            <h2 className="text-xs uppercase tracking-[0.4em] font-light mb-4 text-white/50 font-space-grotesk">What We Solve</h2>
            <h3 className="text-4xl md:text-6xl font-light tracking-tight font-space-grotesk">Complex problems,<br/>intelligent solutions.</h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
            {services.map((service, idx) => (
              <AnimatedSection key={idx} delay={idx * 200} direction="up">
                <div className="group cursor-default">
                  <div className="relative mb-8 h-[1px] w-full bg-white/5 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-6 bg-white/40 group-hover:w-full group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
                  </div>
                  
                  <h4 className="text-xl uppercase tracking-[0.15em] mb-6 font-medium transition-colors duration-500 group-hover:text-white text-white/80 font-space-grotesk">
                    {service.title}
                  </h4>
                  <p className="text-white/40 leading-loose text-sm font-light transition-colors duration-500 group-hover:text-white/60 font-space-grotesk">
                    {service.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-40 px-8 md:px-32 bg-black font-space-grotesk">
          <div className="flex flex-col md:flex-row gap-20">
            <AnimatedSection className="md:w-1/3" direction="right">
              <h2 className="text-xs uppercase tracking-[0.4em] font-light mb-4 text-white/50 font-space-grotesk">Use Cases</h2>
              <h3 className="text-4xl font-light tracking-tight font-space-grotesk">AI that drives real results.</h3>
            </AnimatedSection>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
              {useCases.map((useCase, idx) => (
                <AnimatedSection key={idx} delay={idx * 100} className="border-l border-white/10 pl-8 py-2" direction="left">
                  <span className="text-lg font-light text-white/70 hover:text-white transition-colors cursor-default font-space-grotesk">{useCase}</span>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-40 px-8 md:px-32 bg-white text-black overflow-hidden font-space-grotesk">
          <AnimatedSection className="mb-32" direction="up">
            <h2 className="text-xs uppercase tracking-[0.4em] font-light mb-4 text-black/50 font-space-grotesk">Impact Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-light tracking-tight font-space-grotesk">Measurable excellence.</h3>
          </AnimatedSection>

          <div className="space-y-48 md:space-y-64">
            {portfolio.map((item, idx) => (
              <AnimatedSection 
                key={idx} 
                direction={idx % 2 === 0 ? 'left' : 'right'} 
                className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
              >
                <div className={`md:col-span-6 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2 text-right md:text-left'}`}>
                  <span className="text-8xl md:text-[14rem] font-light leading-none tracking-tighter block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.08] hover:text-neutral-500 cursor-default text-black transform-gpu font-space-grotesk">
                    {item.metric}
                  </span>
                  <div className="text-sm md:text-lg font-light text-black/40 uppercase tracking-[0.3em] mt-2 font-space-grotesk">
                    {item.context}
                  </div>
                </div>
                
                <div className={`md:col-span-5 md:col-start-${idx % 2 === 0 ? '8' : '2'} ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="space-y-6">
                    <h4 className="text-3xl md:text-4xl font-light tracking-wide uppercase font-space-grotesk">{item.title}</h4>
                    <p className="text-black/60 text-lg leading-relaxed font-light font-space-grotesk">
                      {item.description}
                    </p>
                    <div className="pt-4">
                      <div className={`h-[1px] bg-black/10 w-full ${idx % 2 === 0 ? 'origin-left' : 'origin-right'} scale-x-100`}></div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-40 px-8 md:px-32 bg-black font-space-grotesk">
          <AnimatedSection className="text-center mb-24" direction="up">
            <h2 className="text-xs uppercase tracking-[0.4em] font-light text-white/50 font-space-grotesk">Engineered with Precision</h2>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-x-16 gap-y-16 max-w-5xl mx-auto">
            {techStack.map((tech, idx) => (
              <AnimatedSection key={idx} delay={idx * 100} direction="zoom">
                <span className="text-xl md:text-3xl font-light text-white/20 hover:text-white hover:scale-110 transition-all duration-700 cursor-default uppercase tracking-[0.3em] inline-block transform-gpu font-space-grotesk">
                  {tech}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-40 px-8 md:px-32 bg-zinc-900/20 border-t border-white/5 font-space-grotesk">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:w-1/2">
              <AnimatedSection direction="up">
                <h2 className="text-xs uppercase tracking-[0.4em] font-light mb-8 text-white/50 font-space-grotesk">Collaborate</h2>
                <h3 className="text-4xl md:text-6xl font-light tracking-tight mb-12 font-space-grotesk">
                  Engineer the future of your operations.
                </h3>
                <p className="text-white/40 mb-12 max-w-md leading-relaxed font-light font-space-grotesk">
                  Direct engagement with our team ensures your vision is translated into production-grade intelligence.
                </p>
                <div className="space-y-6 pt-12 border-t border-white/10">
                   <a 
                     href="/" 
                     onClick={handleContactClick}
                     className="group block cursor-pointer"
                   >
                     <span className="text-[10px] text-white/30 tracking-widest block mb-2 uppercase font-space-grotesk">Get in Touch</span>
                     <span className="text-lg tracking-widest text-white/70 group-hover:text-white transition-colors font-space-grotesk">START YOUR PROJECT</span>
                   </a>
                </div>
              </AnimatedSection>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <AnimatedSection delay={400} direction="zoom">
                <div className="border border-white/10 p-10 md:p-16 bg-white/[0.02] backdrop-blur-xl">
                  <div className="text-center space-y-8">
                    <h4 className="text-2xl font-light tracking-wide font-space-grotesk">Ready to Build?</h4>
                    <p className="text-white/60 font-light leading-relaxed font-space-grotesk">
                      Let's discuss how AI can transform your business operations and drive measurable results.
                    </p>
                    <a 
                      href="/" 
                      onClick={handleContactClick}
                      className="inline-block border border-white/30 px-12 py-6 text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black hover:border-white transition-all duration-700 font-space-grotesk"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AISolutions;