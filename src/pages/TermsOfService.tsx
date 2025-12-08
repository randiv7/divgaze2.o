import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { FileText, Scale, CreditCard, Clock, Shield, Globe, Mail, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-32 bg-background font-inter">
        <div className="container-premium">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8" />
                <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
                  Terms of Service
                </span>
              </div>
              <h1 className="heading-xl mb-6">
                Clear terms for our <span className="opacity-60">professional services.</span>
              </h1>
              <p className="body-lg text-muted-foreground">
                Clear terms for our professional digital services and partnerships.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-secondary font-inter">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* Agreement to Terms */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Agreement to Terms</h2>
              <p className="text-muted-foreground">
                These Terms of Service ("Terms") govern your use of Divgaze's services and website. 
                By accessing our services, you agree to be bound by these Terms. If you disagree with 
                any part of these terms, you may not access our services. Divgaze operates from Sri Lanka 
                and Australia, providing digital transformation solutions worldwide including AI-powered 
                services, custom development, and digital marketing.
              </p>
            </AnimatedSection>

            {/* Our Services */}
            <AnimatedSection>
              <h2 className="heading-md mb-6 flex items-center gap-3">
                <Scale className="w-6 h-6" />
                Our Services
              </h2>
              <p className="text-muted-foreground mb-6">
                Divgaze provides comprehensive digital transformation services:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Development Services</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Web & Mobile App Development</li>
                    <li>• Custom Software Solutions</li>
                    <li>• SaaS & E-commerce Platforms</li>
                    <li>• Cloud Solutions & DevOps</li>
                  </ul>
                </div>

                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">AI & Innovation Services</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• AI Content Generation & Virtual Influencers</li>
                    <li>• AI-Powered Data Analytics</li>
                    <li>• Machine Learning Solutions</li>
                    <li>• AI Optimization for Business</li>
                  </ul>
                </div>

                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Creative & Marketing</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Digital Marketing & SEO</li>
                    <li>• Graphic Design & Video Production</li>
                    <li>• Social Media Management</li>
                    <li>• Brand Identity & Content Strategy</li>
                  </ul>
                </div>

                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Ongoing Support</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Website & Application Maintenance</li>
                    <li>• Technical Support & Monitoring</li>
                    <li>• Content Management & Updates</li>
                    <li>• Performance Optimization</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* User Responsibilities */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">User Responsibilities</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-4">Client Obligations</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Provide accurate, complete, and timely information required for service delivery</li>
                    <li>• Respond promptly to requests for clarification, approval, or feedback</li>
                    <li>• Make payments according to agreed schedules and terms</li>
                    <li>• Respect intellectual property rights of third parties</li>
                    <li>• Use our services in compliance with applicable laws</li>
                    <li>• Maintain confidentiality of login credentials and sensitive information</li>
                    <li>• Provide clear project requirements at project commencement</li>
                    <li>• Designate authorized representatives for approvals</li>
                  </ul>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-6">
                  <h3 className="heading-sm mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Prohibited Uses
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Use our services for illegal, harmful, or unauthorized purposes</li>
                    <li>• Violate any laws, regulations, or third-party rights</li>
                    <li>• Infringe upon intellectual property rights</li>
                    <li>• Upload malicious code, viruses, or harmful content</li>
                    <li>• Attempt to gain unauthorized access to our systems</li>
                    <li>• Resell or redistribute AI-generated content without permission</li>
                    <li>• Create content promoting hate speech, violence, or illegal activities</li>
                    <li>• Reverse engineer proprietary algorithms or methodologies</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Intellectual Property */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Intellectual Property Rights</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-4">Divgaze Intellectual Property</h3>
                  <p className="text-muted-foreground mb-3">Divgaze retains exclusive ownership of:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Proprietary software, algorithms, frameworks, and development methodologies</li>
                    <li>• AI models, training data, and machine learning techniques</li>
                    <li>• Brand identity, trademarks, logos, and marketing materials</li>
                    <li>• General knowledge, processes, and techniques developed during projects</li>
                    <li>• Source code templates, libraries, and reusable components</li>
                  </ul>
                </div>

                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Client-Owned Content & Rights</h3>
                  <p className="text-muted-foreground mb-3">Upon final payment completion, clients receive:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Full ownership rights to custom-developed software specific to their project</li>
                    <li>• Commercial usage rights to AI-generated content created for their brand</li>
                    <li>• Ownership of marketing materials and creative assets</li>
                    <li>• Source code and complete documentation for custom projects</li>
                    <li>• Rights to modify, enhance, and maintain delivered solutions</li>
                    <li>• Unlimited commercial use within agreed scope</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">AI-Generated Content Rights</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Commercial rights transfer to client upon project completion and full payment</li>
                    <li>• Content ownership subject to AI platform terms and applicable laws</li>
                    <li>• Clients receive perpetual, worldwide, non-exclusive rights</li>
                    <li>• Divgaze may retain anonymized examples for portfolio with permission</li>
                    <li>• Virtual influencers become client property with full commercial rights</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Payment Terms */}
            <AnimatedSection>
              <h2 className="heading-md mb-6 flex items-center gap-3">
                <CreditCard className="w-6 h-6" />
                Payment Terms and Billing
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-4">Payment Schedules</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Standard Projects:</strong> 50% upfront, 50% upon completion</li>
                    <li><strong className="text-foreground">Large Projects (&gt;$10,000):</strong> 30% upfront, 40% at milestone, 30% upon delivery</li>
                    <li><strong className="text-foreground">Monthly Retainers:</strong> Billed in advance each month</li>
                    <li><strong className="text-foreground">Ongoing Services:</strong> Billed monthly for completed work</li>
                    <li><strong className="text-foreground">Rush Projects:</strong> Standard rates plus 25-50% expedite fee</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Accepted Payment Methods</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• International bank transfers (SWIFT)</li>
                    <li>• PayPal, Stripe, Wise</li>
                    <li>• Local banking in Sri Lanka and Australia</li>
                    <li>• Cryptocurrency (Bitcoin, Ethereum)</li>
                    <li>• Credit/Debit cards</li>
                  </ul>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-6">
                  <h3 className="heading-sm mb-4">Late Payment Policy</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Invoices due within 30 days unless otherwise agreed</li>
                    <li>• 2% monthly service charge after 30-day grace period</li>
                    <li>• Services may be suspended after 45 days of non-payment</li>
                    <li>• Collection costs may be added to overdue amounts</li>
                    <li>• Resumed services require full payment of outstanding amounts</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Project Delivery */}
            <AnimatedSection>
              <h2 className="heading-md mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6" />
                Project Delivery & Warranties
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-4">Delivery Commitments</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Project timelines are estimates based on agreed scope</li>
                    <li>• Client delays may extend timelines</li>
                    <li>• Regular progress updates provided weekly or bi-weekly</li>
                    <li>• Milestone deliveries allow incremental review</li>
                    <li>• Final delivery requires client approval and full payment</li>
                    <li>• Documentation and training materials included</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Revisions and Scope Changes</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Minor revisions within scope included at no cost</li>
                    <li>• Up to 3 rounds of revisions for design work</li>
                    <li>• Major changes quoted separately with approval</li>
                    <li>• Additional revisions billed at current hourly rates</li>
                    <li>• Scope change requests must be submitted in writing</li>
                  </ul>
                </div>

                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Service Warranties</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Bug-Free Delivery:</strong> 90-day warranty for software defects</li>
                    <li><strong className="text-foreground">Performance Guarantee:</strong> Meet agreed performance benchmarks</li>
                    <li><strong className="text-foreground">Code Quality:</strong> Industry best practices and standards</li>
                    <li><strong className="text-foreground">Security Standards:</strong> Current security best practices</li>
                    <li><strong className="text-foreground">Training & Support:</strong> 30 days included with all projects</li>
                    <li><strong className="text-foreground">Documentation:</strong> Complete technical and user docs provided</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* AI Services Terms */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">AI Services Specific Terms</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-4">AI Content Generation</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Content quality depends on input data and AI platform capabilities</li>
                    <li>• Multiple iterations may be required for desired results</li>
                    <li>• AI-generated content subject to platform ethics guidelines</li>
                    <li>• We commit to best-effort optimization</li>
                    <li>• Clients retain full commercial rights upon payment</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Virtual Influencer Services</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Virtual personas created for specified brand use cases</li>
                    <li>• Personality and appearance customizable within constraints</li>
                    <li>• Social media performance cannot be guaranteed</li>
                    <li>• Ongoing management services available separately</li>
                    <li>• Full ownership transfers to client upon completion</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">AI Platform Dependencies</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Services rely on third-party AI platforms (OpenAI, Anthropic, Midjourney)</li>
                    <li>• Platform changes may affect service delivery</li>
                    <li>• Alternative solutions provided when primary platforms have issues</li>
                    <li>• Force majeure applies to uncontrollable platform failures</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Service Level Agreements */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Service Level Agreements</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Uptime & Performance</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li><strong className="text-foreground">Website Hosting:</strong> 99.9% uptime guarantee</li>
                    <li><strong className="text-foreground">Response Times:</strong> 24hr for critical, 72hr for non-critical</li>
                    <li><strong className="text-foreground">Performance:</strong> Page load under 3 seconds</li>
                    <li><strong className="text-foreground">Backups:</strong> Daily with 30-day retention</li>
                  </ul>
                </div>

                <div className="bg-background p-6">
                  <h3 className="heading-sm mb-4">Communication</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Dedicated project manager for projects &gt;$5,000</li>
                    <li>• Weekly progress reports for ongoing projects</li>
                    <li>• 24-hour response during business hours</li>
                    <li>• Emergency procedures for critical issues</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Limitation of Liability */}
            <AnimatedSection>
              <h2 className="heading-md mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6" />
                Limitation of Liability
              </h2>
              <p className="text-muted-foreground mb-4">
                To the fullest extent permitted by applicable law:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Total liability shall not exceed the amount paid for that specific service</li>
                <li>• We are not liable for indirect, incidental, or consequential damages</li>
                <li>• Warranties of merchantability and fitness are disclaimed</li>
                <li>• Client assumes responsibility for data backup and business continuity</li>
                <li>• Not liable for third-party service failures or force majeure events</li>
                <li>• Business interruption and lost profits are excluded</li>
                <li>• Client indemnifies Divgaze against claims from delivered services use</li>
              </ul>
              <p className="text-muted-foreground mt-4 text-sm italic">
                Note: Some jurisdictions do not allow limitation of liability for certain damages. 
                These limitations may not apply where prohibited by law.
              </p>
            </AnimatedSection>

            {/* Confidentiality */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Confidentiality & Data Protection</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-4">Mutual Confidentiality</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Both parties maintain confidentiality of proprietary information</li>
                    <li>• Non-disclosure obligations survive termination for 5 years</li>
                    <li>• Exceptions for publicly available and independently developed materials</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Data Protection & Privacy</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Client data processed according to our Privacy Policy</li>
                    <li>• GDPR, CCPA, and Australian Privacy Principles compliance</li>
                    <li>• Data encryption in transit and at rest</li>
                    <li>• Client data not shared except as necessary for service delivery</li>
                    <li>• Client rights include access, correction, deletion, and portability</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Force Majeure */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Force Majeure</h2>
              <p className="text-muted-foreground mb-4">
                Neither party shall be liable for delays or failures resulting from circumstances beyond 
                reasonable control, including:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Natural disasters, pandemics, government actions</li>
                <li>• Internet outages, power failures, telecommunications failures</li>
                <li>• Third-party service provider or AI platform failures</li>
                <li>• Cyber attacks, data breaches, or security incidents</li>
                <li>• Labor strikes, transportation disruptions</li>
                <li>• Changes in laws or regulations</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Force majeure events suspend performance obligations for the duration of the event.
              </p>
            </AnimatedSection>

            {/* Termination */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Termination & Cancellation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-4">Client-Initiated Termination</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 30-day written notice required for ongoing services</li>
                    <li>• Payment due for all work completed to termination date</li>
                    <li>• Cancellation fees: 25% of remaining value for projects &gt;50% complete</li>
                    <li>• Delivered work remains client property upon payment</li>
                    <li>• Transition assistance provided for 30 days</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Divgaze-Initiated Termination</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Immediate termination for non-payment exceeding 60 days</li>
                    <li>• 30-day notice for convenience termination with refund of unused services</li>
                    <li>• Immediate termination for illegal use or security violations</li>
                    <li>• Client provided with all completed work upon payment</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Refund Policy</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Unused portions of prepaid retainers refunded within 30 days</li>
                    <li>• Project deposits refundable if cancellation before work starts</li>
                    <li>• No refunds for completed work or delivered milestones</li>
                    <li>• Refunds processed via original payment method within 14 days</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Governing Law */}
            <AnimatedSection>
              <h2 className="heading-md mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6" />
                Governing Law and Jurisdiction
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-4">Legal Framework</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Sri Lankan Law:</strong> Applies to clients served from Sri Lankan operations</li>
                    <li><strong className="text-foreground">Australian Law:</strong> Applies to clients served from Australian operations</li>
                    <li><strong className="text-foreground">International Clients:</strong> Disputes resolved under laws of primary service location</li>
                    <li><strong className="text-foreground">Jurisdiction:</strong> Courts of Colombo, Sri Lanka or Sydney, Australia</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-sm mb-4">Dispute Resolution Process</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Step 1:</strong> Good faith negotiations (30 days)</li>
                    <li><strong className="text-foreground">Step 2:</strong> Professional mediation (60 days)</li>
                    <li><strong className="text-foreground">Step 3:</strong> Binding arbitration if mediation fails</li>
                    <li><strong className="text-foreground">Emergency Relief:</strong> Either party may seek injunctive relief</li>
                    <li><strong className="text-foreground">Legal Costs:</strong> Prevailing party entitled to reasonable fees</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Changes to Terms */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We may modify these Terms to reflect changes in our services, legal requirements, or business 
                practices. Material changes will be communicated through:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Posted updates on our website with prominent notice</li>
                <li>• Email notification to active clients at least 30 days before effective date</li>
                <li>• In-app notifications for users of our platforms</li>
                <li>• Direct communication for significant changes affecting ongoing projects</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Continued use after the effective date constitutes acceptance of modified Terms.
              </p>
            </AnimatedSection>

            {/* Severability */}
            <AnimatedSection>
              <h2 className="heading-md mb-6">Severability & Final Provisions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="heading-sm mb-2">Severability</h3>
                  <p className="text-muted-foreground">
                    If any provision is found unenforceable, remaining provisions continue in full force. 
                    Unenforceable provisions will be replaced with enforceable ones reflecting original intent.
                  </p>
                </div>

                <div>
                  <h3 className="heading-sm mb-2">Entire Agreement</h3>
                  <p className="text-muted-foreground">
                    These Terms, together with our Privacy Policy and any signed project agreements, constitute 
                    the entire agreement between parties and supersede all prior negotiations or agreements.
                  </p>
                </div>

                <div>
                  <h3 className="heading-sm mb-2">Assignment</h3>
                  <p className="text-muted-foreground">
                    Clients may not assign these Terms without written consent. Divgaze may assign in connection 
                    with a merger, acquisition, or sale of assets.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact */}
            <AnimatedSection>
              <div className="bg-primary text-primary-foreground p-8">
                <h2 className="heading-md mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6" />
                  Contact Information
                </h2>
                <p className="opacity-80 mb-6">
                  For questions about these Terms of Service, legal matters, or service inquiries:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">General Inquiries</h3>
                    <p className="opacity-80">Email: divgaze@gmail.com</p>
                    <p className="opacity-60 text-sm">Subject: "Terms of Service Inquiry"</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Legal & Contract Matters</h3>
                    <p className="opacity-80">Email: divgaze@gmail.com</p>
                    <p className="opacity-60 text-sm">Subject: "Legal/Contract Matter"</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Sri Lanka Office</h3>
                    <p className="opacity-80">Phone: +94 707 616 554</p>
                    <p className="opacity-60 text-sm">Mon-Fri, 9 AM - 6 PM (IST)</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Australia Office</h3>
                    <p className="opacity-80">Phone: +61 408 840 996</p>
                    <p className="opacity-60 text-sm">Mon-Fri, 9 AM - 5 PM (AEST)</p>
                  </div>
                </div>

                <p className="opacity-60 text-sm mt-6">
                  We strive to respond to all legal and contract inquiries within 48 hours during business days.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
