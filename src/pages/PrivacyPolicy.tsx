import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Shield, Lock, Eye, Globe, Clock, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-32 bg-background font-inter">
        <div className="container-premium">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8" />
                <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
                  Privacy Policy
                </span>
              </div>
              <h1 className="heading-xl mb-6">
                Your privacy is our <span className="opacity-60">priority.</span>
              </h1>
              <p className="body-lg text-muted-foreground">
                Learn how we protect and handle your information.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-secondary font-inter">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* Introduction */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Introduction</h2>
              <p className="text-muted-foreground">
                At Divgaze ("we," "our," or "us"), we are committed to protecting your privacy 
                and personal information. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you visit our website or use our 
                services, including AI-generated content, custom software development, web 
                applications, mobile development, and digital marketing solutions. We operate 
                from Sri Lanka and Australia, serving clients globally.
              </p>
            </AnimatedSection>

            {/* Information We Collect */}
            <AnimatedSection>
              <h2 className="heading-md mb-6 flex items-center gap-3">
                <Eye className="w-6 h-6" />
                Information We Collect
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="heading-sm mb-4">Personal Information</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Contact information (name, email address, phone number, company details)</li>
                    <li>• Business information (industry, project requirements, budget considerations)</li>
                    <li>• Communication preferences and interaction history</li>
                    <li>• Payment and billing information (processed securely through third-party providers)</li>
                    <li>• Professional credentials and portfolio materials you share with us</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Technical Information</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• IP address, location data, and device identifiers</li>
                    <li>• Browser type, version, and operating system</li>
                    <li>• Website usage analytics and interaction patterns</li>
                    <li>• Cookies, local storage, and similar tracking technologies</li>
                    <li>• Performance data and error logs from our applications</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Service-Specific Data</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Content, images, and videos uploaded for AI processing and generation</li>
                    <li>• Project files, source code, and creative assets shared during development</li>
                    <li>• Custom software requirements, specifications, and technical documentation</li>
                    <li>• Social media accounts and marketing campaign data under management</li>
                    <li>• Website analytics and user behavior data from sites we develop</li>
                    <li>• Mobile app usage statistics and performance metrics</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Legal Basis */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Legal Basis for Processing</h2>
              <p className="text-muted-foreground mb-4">
                We process your personal information based on the following legal grounds:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Contract Performance:</strong> To deliver agreed-upon services and fulfill project requirements</li>
                <li><strong className="text-foreground">Legitimate Interests:</strong> For business operations, service improvement, and fraud prevention</li>
                <li><strong className="text-foreground">Consent:</strong> For marketing communications and optional data processing activities</li>
                <li><strong className="text-foreground">Legal Obligations:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </AnimatedSection>

            {/* How We Use Your Information */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">How We Use Your Information</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Service Delivery:</strong> To provide web development, mobile apps, AI services, digital marketing, and custom software solutions</li>
                <li><strong className="text-foreground">AI Content Generation:</strong> To create personalized AI influencers, product photography, marketing materials, and custom AI models</li>
                <li><strong className="text-foreground">Project Management:</strong> To coordinate development timelines, provide updates, and ensure project success</li>
                <li><strong className="text-foreground">Communication:</strong> To respond to inquiries, provide support, and send service-related notifications</li>
                <li><strong className="text-foreground">Quality Improvement:</strong> To enhance our services, develop new features, and optimize user experience</li>
                <li><strong className="text-foreground">Security & Compliance:</strong> To protect against fraud, ensure data security, and comply with legal obligations</li>
                <li><strong className="text-foreground">Business Operations:</strong> For billing, account management, analytics, and administrative purposes</li>
                <li><strong className="text-foreground">Marketing:</strong> To send relevant updates about our services (with your consent)</li>
              </ul>
            </AnimatedSection>

            {/* AI Content & Data Processing */}
            <AnimatedSection>
              <h2 className="heading-md mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6" />
                AI Content & Data Processing
              </h2>
              <p className="text-muted-foreground mb-6">
                When you use our AI services, we want you to understand exactly how your content is handled:
              </p>
              
              <div className="space-y-8">
                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Content You Upload</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Processed using secure, third-party AI platforms (OpenAI, Midjourney, Stable Diffusion)</li>
                    <li>• Used solely to generate the specific content you've requested</li>
                    <li>• Never shared with other clients or used for other projects without consent</li>
                    <li>• Automatically deleted from AI processing platforms after generation (typically 30 days)</li>
                  </ul>
                </div>

                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Generated Content Rights</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Full rights to AI-generated content transfer to you upon final payment</li>
                    <li>• You may use generated content for any commercial or personal purposes</li>
                    <li>• We retain no ownership rights to your custom AI-generated content</li>
                    <li>• We may showcase anonymized examples in our portfolio (with your permission)</li>
                  </ul>
                </div>

                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">AI Model Training</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Your content is NOT used to train public AI models without explicit consent</li>
                    <li>• We may use anonymized, non-identifiable data to improve our internal AI workflows</li>
                    <li>• All training data is aggregated and cannot be traced back to individual clients</li>
                    <li>• You can opt-out of any data usage for improvement purposes at any time</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Information Sharing */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-6">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-4">Trusted Service Providers</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Cloud Services:</strong> AWS, Google Cloud, Microsoft Azure (data hosting and storage)</li>
                    <li><strong className="text-foreground">AI Platforms:</strong> OpenAI, Anthropic, Midjourney, Stable Diffusion (content generation)</li>
                    <li><strong className="text-foreground">Payment Processing:</strong> Stripe, PayPal (secure payment handling)</li>
                    <li><strong className="text-foreground">Analytics Tools:</strong> Google Analytics, Hotjar (website performance and user experience)</li>
                    <li><strong className="text-foreground">Communication:</strong> EmailJS, Twilio (email and SMS services)</li>
                    <li><strong className="text-foreground">Development Tools:</strong> GitHub, Vercel, Firebase (code management and deployment)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Legal Requirements</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• When required by law, court order, or legal process</li>
                    <li>• To protect our rights, property, and intellectual property</li>
                    <li>• To ensure user safety, prevent fraud, and investigate security incidents</li>
                    <li>• In connection with business transfers, mergers, or acquisitions</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Data Retention */}
            <AnimatedSection>
              <h2 className="heading-md mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6" />
                Data Retention Periods
              </h2>
              <p className="text-muted-foreground mb-4">
                We retain your personal information only as long as necessary for the purposes outlined in this policy:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Contact Information:</strong> 3 years after last interaction or until you request deletion</li>
                <li><strong className="text-foreground">Project Files & Code:</strong> 2 years after project completion for support and warranty purposes</li>
                <li><strong className="text-foreground">AI Generated Content:</strong> Permanently deleted from our systems upon project delivery</li>
                <li><strong className="text-foreground">Payment Records:</strong> 7 years for tax and legal compliance requirements</li>
                <li><strong className="text-foreground">Marketing Data:</strong> Until you unsubscribe or opt-out of communications</li>
                <li><strong className="text-foreground">Website Analytics:</strong> 14 months (automatically deleted by Google Analytics)</li>
                <li><strong className="text-foreground">Security Logs:</strong> 12 months for security incident investigation</li>
              </ul>
            </AnimatedSection>

            {/* International Data Transfers */}
            <AnimatedSection>
              <h2 className="heading-md mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6" />
                International Data Transfers
              </h2>
              <p className="text-muted-foreground">
                As we operate globally with offices in Sri Lanka and Australia, your information may 
                be transferred to and processed in countries other than your own. We ensure appropriate 
                safeguards are in place to protect your personal information in accordance with applicable 
                data protection laws, including GDPR, CCPA, and Australian Privacy Principles. All 
                international transfers use encryption and secure protocols.
              </p>
            </AnimatedSection>

            {/* Data Security */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Data Security</h2>
              <p className="text-muted-foreground mb-6">
                We implement comprehensive security measures to protect your information:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Technical Safeguards</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• End-to-end encryption (AES-256)</li>
                    <li>• Secure HTTPS connections with SSL/TLS</li>
                    <li>• Multi-factor authentication (MFA)</li>
                    <li>• Regular security audits</li>
                    <li>• Automated backup systems</li>
                  </ul>
                </div>

                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Operational Security</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Employee security training</li>
                    <li>• Access controls (least privilege)</li>
                    <li>• Incident response plan</li>
                    <li>• Regular software updates</li>
                    <li>• Secure development practices</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Your Rights */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Your Rights and Choices</h2>
              <p className="text-muted-foreground mb-4">
                You have comprehensive rights regarding your personal information:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Access & Copy:</strong> Request a complete copy of your personal information we hold</li>
                <li><strong className="text-foreground">Correction & Update:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong className="text-foreground">Deletion & Erasure:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong className="text-foreground">Data Portability:</strong> Request transfer of your data to another service provider in a structured format</li>
                <li><strong className="text-foreground">Opt-out & Unsubscribe:</strong> Withdraw consent for marketing communications at any time</li>
                <li><strong className="text-foreground">Restriction of Processing:</strong> Request limitation of how we process your data in certain circumstances</li>
                <li><strong className="text-foreground">Object to Processing:</strong> Object to processing based on legitimate interests</li>
                <li><strong className="text-foreground">Withdraw Consent:</strong> Withdraw previously given consent for specific data processing activities</li>
              </ul>
              <p className="text-muted-foreground mt-6">
                <strong className="text-foreground">How to Exercise Your Rights:</strong> Contact us at divgaze@gmail.com 
                with "Privacy Rights" in the subject line. We will respond within 30 days and may require 
                identity verification for security purposes.
              </p>
            </AnimatedSection>

            {/* Cookies */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Cookies and Tracking Technologies</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-4">Types of Cookies We Use</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Essential Cookies:</strong> Required for website functionality (cannot be disabled)</li>
                    <li><strong className="text-foreground">Performance Cookies:</strong> Google Analytics for website performance analysis (opt-out available)</li>
                    <li><strong className="text-foreground">Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong className="text-foreground">Marketing Cookies:</strong> Social media pixels and advertising (consent required)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Cookie Management</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Control cookie settings through your browser preferences</li>
                    <li>• Opt-out of Google Analytics via Google Analytics Opt-out</li>
                    <li>• Disable marketing cookies without affecting website functionality</li>
                    <li>• Clear existing cookies through your browser settings</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Children's Privacy */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are designed for businesses and individuals 18 years and older. We do not 
                knowingly collect personal information from children under 18. If you believe we have 
                collected information from a minor, please contact us immediately at divgaze@gmail.com, 
                and we will promptly delete such information.
              </p>
            </AnimatedSection>

            {/* Third-Party Services */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                Our services integrate with various third-party platforms. Each has their own privacy policies:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Social Media:</strong> Facebook, Instagram, LinkedIn, Twitter (for social media management)</li>
                <li><strong className="text-foreground">E-commerce:</strong> Shopify, WooCommerce, Stripe (for online store development)</li>
                <li><strong className="text-foreground">Analytics:</strong> Google Analytics, Search Console (for website performance)</li>
                <li><strong className="text-foreground">Cloud Services:</strong> AWS, Google Cloud, Vercel (for hosting and deployment)</li>
                <li><strong className="text-foreground">AI Platforms:</strong> OpenAI, Anthropic, Midjourney (for AI content generation)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We recommend reviewing the privacy policies of these third-party services to understand their data practices.
              </p>
            </AnimatedSection>

            {/* Changes */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy periodically to reflect changes in our practices, services, 
                or legal requirements. We will notify you of any material changes by posting the updated policy 
                on our website and sending an email to our active clients. We encourage you to review this 
                Privacy Policy regularly to stay informed about how we protect your information.
              </p>
            </AnimatedSection>

            {/* Contact */}
            <AnimatedSection>
              <div className="bg-primary text-primary-foreground p-8">
                <h2 className="heading-md mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6" />
                  Contact Us
                </h2>
                <p className="opacity-80 mb-4">
                  For questions about this Privacy Policy, please contact us:
                </p>
                <p className="font-medium">Email: divgaze@gmail.com</p>
                <p className="opacity-80 text-sm mt-2">Subject Line: "Privacy Policy Inquiry"</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
