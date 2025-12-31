import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import AISolutionsLoading from '@/components/shared/AISolutionsLoading';

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

const techStack = [
  "OpenAI", "LangChain", "LlamaIndex", "Pinecone", "Hugging Face", "Google DeepMind", "FastAPI"
];

const AISolutions = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  if (isLoading) {
    return <AISolutionsLoading onComplete={handleLoadingComplete} />;
  }

  return (
    <Layout>
      <div className={`min-h-screen bg-black text-white font-space-grotesk selection:bg-white selection:text-black transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section - Optimized for Mobile */}
        <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 lg:px-32 pt-24 sm:pt-28 md:pt-32 overflow-hidden font-space-grotesk">
          <div className="ambient-blob top-[-15%] left-[-10%]"></div>
          <div className="ambient-blob ambient-blob-2 bottom-[5%] right-[-5%]"></div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <AnimatedSection direction="up" delay={100}>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] font-light mb-6 sm:mb-8 block text-white/50 font-space-grotesk">
                Intelligence, Engineered.
              </span>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={300}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[10rem] font-light leading-none tracking-tighter mb-8 sm:mb-10 md:mb-12 font-space-grotesk">
                AI SOLUTIONS
              </h1>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={500} className="max-w-3xl">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/70 font-space-grotesk">
                We build AI systems that think, learn, and act. From agentic workflows to production ML pipelines, we turn complex problems into elegant solutions.
              </p>
            </AnimatedSection>
          </div>

          <div className="absolute right-0 bottom-10 w-1/3 h-px bg-gradient-to-l from-white/30 to-transparent hidden md:block"></div>
        </section>

        {/* Services Section - Mobile Optimized */}
        <section className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-16 lg:px-32 bg-zinc-900/30 border-y border-white/5 font-space-grotesk">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="mb-16 sm:mb-20 md:mb-24" direction="left">
              <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light mb-3 sm:mb-4 text-white/50 font-space-grotesk">What We Solve</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight font-space-grotesk">Complex problems,<br/>intelligent solutions.</h3>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-14 md:gap-16 lg:gap-24">
              {services.map((service, idx) => (
                <AnimatedSection key={idx} delay={idx * 200} direction="up">
                  <div className="group cursor-default">
                    <div className="relative mb-6 sm:mb-8 h-[1px] w-full bg-white/5 overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-6 bg-white/40 group-hover:w-full group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
                    </div>
                    
                    <h4 className="text-lg sm:text-xl uppercase tracking-[0.1em] sm:tracking-[0.15em] mb-4 sm:mb-6 font-medium transition-colors duration-500 group-hover:text-white text-white/80 font-space-grotesk">
                      {service.title}
                    </h4>
                    <p className="text-white/40 leading-loose text-sm sm:text-base font-light transition-colors duration-500 group-hover:text-white/60 font-space-grotesk">
                      {service.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section - Mobile Optimized */}
        <section className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-16 lg:px-32 bg-black font-space-grotesk">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-20">
              <AnimatedSection className="md:w-1/3" direction="right">
                <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light mb-3 sm:mb-4 text-white/50 font-space-grotesk">Use Cases</h2>
                <h3 className="text-3xl sm:text-4xl font-light tracking-tight font-space-grotesk">AI that drives real results.</h3>
              </AnimatedSection>
              
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                {useCases.map((useCase, idx) => (
                  <AnimatedSection key={idx} delay={idx * 100} className="border-l border-white/10 pl-6 sm:pl-8 py-2" direction="left">
                    <span className="text-base sm:text-lg font-light text-white/70 hover:text-white transition-colors cursor-default font-space-grotesk">{useCase}</span>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section - Mobile Optimized */}
        <section className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-16 lg:px-32 bg-black font-space-grotesk">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16 sm:mb-20 md:mb-24" direction="up">
              <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light text-white/50 font-space-grotesk">Engineered with Precision</h2>
            </AnimatedSection>

            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 max-w-5xl mx-auto">
              {techStack.map((tech, idx) => (
                <AnimatedSection key={idx} delay={idx * 100} direction="zoom">
                  <span className="text-base sm:text-lg md:text-xl lg:text-3xl font-light text-white/20 hover:text-white hover:scale-110 transition-all duration-700 cursor-default uppercase tracking-[0.2em] sm:tracking-[0.3em] inline-block transform-gpu font-space-grotesk">
                    {tech}
                  </span>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Mobile Optimized */}
        <section className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-16 lg:px-32 bg-zinc-900/20 border-t border-white/5 font-space-grotesk">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 sm:gap-20 md:gap-24 items-start">
              <div className="lg:w-1/2 w-full">
                <AnimatedSection direction="up">
                  <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light mb-6 sm:mb-8 text-white/50 font-space-grotesk">Collaborate</h2>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 sm:mb-10 md:mb-12 font-space-grotesk">
                    Engineer the future of your operations.
                  </h3>
                  <p className="text-white/40 mb-8 sm:mb-10 md:mb-12 max-w-md leading-relaxed font-light font-space-grotesk text-sm sm:text-base">
                    Direct engagement with our team ensures your vision is translated into production-grade intelligence.
                  </p>
                  <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-10 md:pt-12 border-t border-white/10">
                     <a 
                       href="/" 
                       onClick={handleContactClick}
                       className="group block cursor-pointer"
                     >
                       <span className="text-[9px] sm:text-[10px] text-white/30 tracking-widest block mb-2 uppercase font-space-grotesk">Get in Touch</span>
                       <span className="text-base sm:text-lg tracking-widest text-white/70 group-hover:text-white transition-colors font-space-grotesk">START YOUR PROJECT</span>
                     </a>
                  </div>
                </AnimatedSection>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <AnimatedSection delay={400} direction="zoom">
                  <div className="border border-white/10 p-8 sm:p-10 md:p-16 bg-white/[0.02] backdrop-blur-xl">
                    <div className="text-center space-y-6 sm:space-y-8">
                      <h4 className="text-xl sm:text-2xl font-light tracking-wide font-space-grotesk">Ready to Build?</h4>
                      <p className="text-white/60 font-light leading-relaxed font-space-grotesk text-sm sm:text-base">
                        Let's discuss how AI can transform your business operations and drive measurable results.
                      </p>
                      <a 
                        href="/" 
                        onClick={handleContactClick}
                        className="inline-block border border-white/30 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] hover:bg-white hover:text-black hover:border-white transition-all duration-700 font-space-grotesk"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AISolutions;