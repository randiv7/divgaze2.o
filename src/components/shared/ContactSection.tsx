import { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: '',
        email: '',
        service: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-full bg-background font-inter">
      <div className="container-premium">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block text-center">
              Get in Touch
            </span>
            <h2 className="heading-lg text-center mb-12">
              Let's build something <span className="opacity-60">great.</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-secondary border-0 focus:ring-2 focus:ring-foreground transition-all outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-secondary border-0 focus:ring-2 focus:ring-foreground transition-all outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">
                  I'm interested in...
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-secondary border-0 focus:ring-2 focus:ring-foreground transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select a service</option>
                  <option value="creative-lab">Creative Lab</option>
                  <option value="ai-solutions">AI Solutions</option>
                  <option value="web-dev">Web Dev & Systems</option>
                  <option value="not-sure">Not Sure Yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 bg-secondary border-0 focus:ring-2 focus:ring-foreground transition-all outline-none resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed font-medium border-0"
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};