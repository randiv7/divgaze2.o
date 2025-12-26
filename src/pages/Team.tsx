import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { MemberCard } from '@/components/team/MemberCard';
import { TeamMember } from '@/types';

const teamMembers: TeamMember[] = [
  {
    name: 'Randiv Dharmapriya',
    role: 'Founder',
    photo: '/randiv.png',
    quote: `Design is not just what it looks like, it's how it works and feels.`,
    bio: `With over 12 years of experience in creative direction, Sarah leads our design vision. She ensures every project pushes creative boundaries while maintaining strategic focus. Her work has been featured in leading design publications and has won multiple industry awards.`
  },
  {
    name: 'Savinu Ranasinghe',
    role: 'Co-Founder',
    photo: '/savinu.png',
    quote: `Great code is invisible—it just works, beautifully.`,
    bio: `Marcus specializes in building scalable, performant web applications. With a background in computer science and a passion for clean architecture, he transforms complex requirements into elegant solutions. He's a firm believer in writing code that humans can read.`
  },
  {
    name: 'Sihan Edward',
    role: 'Co-Founder',
    photo: '/sihan.png',
    quote: `AI should amplify human creativity, not replace it.`,
    bio: `Aisha brings cutting-edge AI capabilities to our projects. She bridges the gap between machine learning and practical business applications, creating intelligent systems that enhance user experiences. Her expertise spans natural language processing to computer vision.`
  },
  {
    name: 'Harsha Chandimal',
    role: 'AI Engineer',
    photo: '/harsha.png',
    quote: `The best solutions come from understanding both frontend and backend.`,
    bio: `Jake is our versatile problem-solver who seamlessly navigates between frontend elegance and backend robustness. His holistic approach ensures our applications are not just beautiful, but also reliable and maintainable at every layer.`
  },
  {
    name: 'Methdul Dharmapriya',
    role: 'Full-Stack Developer',
    photo: '/methdul t.png',
    quote: `Content is the bridge between brands and their audience.`,
    bio: `Elena crafts compelling narratives that resonate across platforms. She combines data-driven insights with creative storytelling to develop content strategies that drive engagement and conversions. Her campaigns have reached millions worldwide.`
  },
  {
    name: 'Shashintha Wijesooriya',
    role: 'Video Editor & Graphic Designer',
    photo: '/kithul.png',
    quote: `Good design is invisible. Great design is felt.`,
    bio: `David obsesses over every pixel and interaction. His user-centric approach combines psychology, aesthetics, and functionality to create interfaces that feel intuitive and delightful. He believes design should solve problems, not create them.`
  },
];

const Team = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen w-full bg-black relative overflow-hidden font-inter pt-32 pb-20">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[15%] left-[10%] w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[15%] right-[10%] w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16 md:mb-24">
              <span className="text-sm font-medium text-zinc-500 tracking-widest uppercase mb-4 block">
                Our Team
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-tight tracking-tighter text-white uppercase mb-8">
                MEET THE <span className="opacity-60">MINDS</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto leading-relaxed">
                The creative builders and bold thinkers behind Divgaze, 
                crafting digital experiences that shape what's next.
              </p>
            </div>
          </AnimatedSection>

          {/* Team Grid - 2 columns on mobile, 3 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <MemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;