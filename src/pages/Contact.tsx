import { useState } from 'react';
import { ArrowRight, Mail, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message sent!',
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: '', email: '', service: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-full relative overflow-hidden font-inter pt-20 bg-background">
        <div className="noise-overlay" />

        <div className="container-premium relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <AnimatedSection>
              <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
                Contact
              </span>
              <h1 className="heading-xl mb-8">
                Let's <span className="opacity-60">talk.</span>
              </h1>
              <p className="body-lg text-muted-foreground mb-12">
                Have a project in mind? We'd love to hear about it. 
                Fill out the form or reach out directly.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email us at</p>
                    <a href="mailto:hello@divgaze.com" className="font-medium hover:opacity-70 transition-opacity">
                      hello@divgaze.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Schedule a call</p>
                    <a href="#" className="font-medium hover:opacity-70 transition-opacity">
                      Book a meeting
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Column - Form */}
            <AnimatedSection delay={0.2} direction="right">
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
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map or Additional Info Section */}
      <section className="py-20 bg-primary text-primary-foreground font-inter">
        <div className="container-premium">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="heading-md mb-4">Based globally. Available worldwide.</h2>
              <p className="text-primary-foreground/70">
                We work with clients across every timezone.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
