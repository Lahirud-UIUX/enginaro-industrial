'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Briefcase,
  CalendarDays,
  Check,
  ChevronDown,
  CirclePlay,
  Clock,
  Compass,
  Cog,
  Eye,
  Factory,
  FacebookIcon,
  FlaskConical,
  Globe,
  GraduationCap,
  Handshake,
  Layers,
  Lightbulb,
  LinkedinIcon,
  MessageCircleQuestion,
  MessagesSquare,
  Mic,
  MonitorCog,
  Package,
  Rocket,
  Sparkles,
  Ticket,
  TrendingUp,
  TwitterIcon,
  Users,
  Video,
  Wrench,
  YoutubeIcon,
} from 'lucide-react';
import Footer from '@/components/Footer';
import SectionAnimation from '@/components/ui/SectionAnimation';

const IMAGE_DIR = '/images/engineering-talks';

const socialLinks = [
  { href: 'https://www.facebook.com/share/19NKrUc6i5/?mibextid=wwXIfr', label: 'Facebook', icon: FacebookIcon },
  { href: 'https://youtube.com/@enginaro?si=HsQXMjvs4l830Q2L', label: 'YouTube', icon: YoutubeIcon },
  { href: 'https://x.com/enginaroIS', label: 'X (Twitter)', icon: TwitterIcon },
  { href: 'https://www.linkedin.com/company/enginaro-industrial-solutions/', label: 'LinkedIn', icon: LinkedinIcon },
];

const threeWorlds = [
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Connecting academic engineering knowledge with practical applications and professional experience.',
  },
  {
    icon: FlaskConical,
    title: 'Research',
    description: 'Introducing students and young engineers to engineering research, postgraduate studies, innovation and emerging technologies.',
  },
  {
    icon: Factory,
    title: 'Industry',
    description: 'Sharing real-world engineering practices, technologies, challenges and lessons from professional engineering environments.',
  },
];

const programFacts = [
  { icon: Video, value: '6', label: 'Online sessions in the initial series' },
  { icon: Clock, value: '60–75', label: 'Minutes per session (approx.)' },
  { icon: Globe, value: 'Online', label: 'Join from different locations' },
  { icon: Ticket, value: 'Free', label: 'Planned for the initial pilot series' },
];

const sessionFormat = [
  'Guest speaker introduction',
  'Technical discussion or presentation',
  'Real-world engineering insights',
  'Professional and research experiences',
  'Interactive participant Q&A',
];

const topics = [
  {
    icon: GraduationCap,
    title: 'Engineering Research & PhD Pathways',
    description: 'Explore engineering research, postgraduate study opportunities, academic careers and the journey toward advanced research.',
  },
  {
    icon: Package,
    title: 'Product Development',
    description: 'Understand how an engineering idea develops into a real product through concept development, design, prototyping, testing and manufacturing.',
  },
  {
    icon: MonitorCog,
    title: 'CAD, CAE & Engineering Simulation',
    description: 'Learn how engineers use modern design, analysis and simulation tools to solve real engineering problems and support better decision-making.',
  },
  {
    icon: Cog,
    title: 'Manufacturing & Design for Manufacturing',
    description: 'Explore manufacturing processes, material selection, tolerances, production limitations and the importance of designing products that can be manufactured efficiently.',
  },
  {
    icon: Bot,
    title: 'Automation & Robotics',
    description: 'Discover industrial automation, robotics, control systems, mechatronics and the technologies transforming modern industries.',
  },
  {
    icon: Briefcase,
    title: 'Engineering Careers & Professional Development',
    description: 'Learn from the experiences of engineers working in different industries and explore the skills, decisions and opportunities that shape an engineering career.',
  },
  {
    icon: Sparkles,
    title: 'Emerging Engineering Technologies',
    description: 'Explore developments such as additive manufacturing, smart manufacturing, IoT, AI-assisted engineering and other technologies influencing the future of engineering.',
  },
];

const speakers = [
  {
    icon: Wrench,
    title: 'Industry Professionals',
    description: 'Engineers working on real products, machines, systems, manufacturing processes and industrial projects.',
  },
  {
    icon: FlaskConical,
    title: 'Researchers & PhD Scholars',
    description: 'Professionals involved in advanced engineering research, innovation and technology development.',
  },
  {
    icon: GraduationCap,
    title: 'Academics',
    description: 'Lecturers and educators sharing knowledge and perspectives from engineering education and research.',
  },
  {
    icon: Rocket,
    title: 'Entrepreneurs & Product Developers',
    description: 'People who have transformed engineering ideas into products, technologies and businesses.',
  },
];

const discussionQuestions = [
  'How are engineering decisions made in real projects?',
  'What skills matter when entering industry?',
  'How does a research idea become a real technology?',
  'What challenges appear during product development?',
  'How do engineers move from university into industry, research or entrepreneurship?',
  'What can students do today to prepare for their future engineering careers?',
];

const audience = [
  'Engineering undergraduates',
  'Recent engineering graduates',
  'Early-career engineers',
  'Engineering researchers',
  'Students interested in postgraduate studies',
  'Technology and engineering enthusiasts',
];

const upcomingSessions = [
  {
    number: '01',
    details: [
      { label: 'Topic', value: 'Coming Soon' },
      { label: 'Guest Speaker', value: 'To Be Announced' },
      { label: 'Format', value: 'Online' },
      { label: 'Duration', value: 'Approximately 60–75 Minutes' },
    ],
    note: 'Session details will be announced soon.',
  },
  { number: '02' },
  { number: '03' },
];

const gains = [
  { icon: Factory, title: 'Industry Perspective', description: 'Understand how engineering knowledge is applied in real working environments.' },
  { icon: Lightbulb, title: 'Professional Insights', description: 'Learn directly from engineers, researchers, academics and other professionals.' },
  { icon: Layers, title: 'Technical Exposure', description: 'Discover technologies, tools and engineering disciplines beyond your normal academic curriculum.' },
  { icon: Compass, title: 'Career Awareness', description: 'Explore different engineering career paths, research opportunities and postgraduate options.' },
  { icon: TrendingUp, title: 'Real-World Experience', description: 'Learn from actual engineering challenges, decisions, lessons and project experiences.' },
  { icon: MessagesSquare, title: 'Direct Interaction', description: 'Participate in discussions and ask questions directly to experienced professionals.' },
];

const communityItems = [
  'Upcoming Engineering Talks',
  'Speaker announcements',
  'Engineering discussions',
  'Educational content',
  'Technical resources',
  'Research insights',
  'Career-related discussions',
  'Future Enginaro initiatives',
];

const collaborators = [
  'Universities',
  'Engineering faculties',
  'Student societies',
  'Professional engineering organizations',
  'Research institutions',
  'Technology companies',
  'Engineering companies',
  'Industry professionals',
];

const faqs = [
  {
    question: 'What is Enginaro Engineering Talks?',
    answer: 'Enginaro Engineering Talks is a knowledge-sharing initiative by Enginaro (Pvt) Ltd that connects engineering students and young professionals with experienced people from industry, research and academia.',
  },
  {
    question: 'Who can participate?',
    answer: 'Engineering students, recent graduates, early-career engineers, researchers and people with a genuine interest in engineering and technology are welcome.',
  },
  {
    question: 'Are the sessions online?',
    answer: 'The initial Engineering Talks are planned to be conducted online.',
  },
  {
    question: 'How long is each session?',
    answer: 'Most sessions are expected to run for approximately 60–75 minutes, including the main discussion and interactive Q&A.',
  },
  {
    question: 'Is there a participation fee?',
    answer: 'Participation in the initial pilot series is planned to be free.',
  },
  {
    question: 'Can participants ask questions?',
    answer: 'Yes. Interactive discussion and participant questions are an important part of Enginaro Engineering Talks.',
  },
  {
    question: 'How can I join a session?',
    answer: 'The participation and registration process is currently being finalized. Session details and participation instructions will be announced before each Engineering Talk.',
  },
  {
    question: 'How can I stay updated?',
    answer: 'Upcoming topics, guest speakers, session details and program updates will be announced through the Enginaro website and official social media channels.',
  },
  {
    question: 'Can I become a guest speaker?',
    answer: 'Professionals from engineering, research, academia and related technology fields who are interested in sharing their experience can contact Enginaro regarding future speaking opportunities.',
  },
];

// Helper Components
const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}) => (
  <div className={`flex flex-col gap-4 mb-10 ${align === 'center' ? 'items-center text-center max-w-[800px] mx-auto' : ''}`}>
    <span className="text-primary font-secondary uppercase tracking-wider">{eyebrow}</span>
    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white font-primary">{title}</h2>
    {description && (
      <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">{description}</p>
    )}
  </div>
);

const ButtonLink = ({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'white' | 'outline-white';
}) => {
  const styles = {
    primary: 'bg-primary text-white',
    outline: 'border border-black/20 dark:border-white/30 text-black dark:text-white hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary',
    white: 'bg-white text-primary',
    'outline-white': 'border border-white/60 text-white hover:bg-white/10',
  }[variant];
  const isExternal = href.startsWith('http');

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-fit">
      <Link
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`${styles} rounded-full py-4 px-8 flex items-center justify-center w-fit gap-2 transition-all font-secondary`}
      >
        <span>{children}</span>
        <ArrowUpRight size={20} strokeWidth={1.5} />
      </Link>
    </motion.div>
  );
};

// Banner images already carry their own headline text, so they are shown uncropped at 16:9
const TalkImage = ({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) => (
  <div className="relative w-full aspect-video rounded-3xl overflow-hidden">
    <Image
      src={`${IMAGE_DIR}/${src}`}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 1300px) 650px, (min-width: 1024px) 50vw, 100vw"
      className="object-cover"
    />
  </div>
);

const IconBox = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#3D3D3D] flex items-center justify-center flex-shrink-0">
    <Icon size={26} className="text-primary" />
  </div>
);

const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-[#3D3D3D] dark:text-white font-secondary">
    <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
      <Check size={14} strokeWidth={2.5} />
    </span>
    {children}
  </li>
);

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#292929] rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="text-lg font-bold text-black dark:text-white font-primary">{question}</span>
        <ChevronDown
          size={20}
          className={`text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-6 text-[#3D3D3D] dark:text-white font-secondary">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EngineeringTalksPage = () => {
  return (
    <main className="bg-gray-50 dark:bg-[#000000] min-h-screen">
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-primary font-secondary uppercase tracking-wider">Engineering Talks</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white font-primary mt-4 mb-4">
                Enginaro Engineering Talks
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-primary font-primary mb-6">
                Bridging Engineering Education, Research and Industry
              </p>
              <p className="text-black dark:text-white text-lg font-secondary font-semibold mb-4">
                Learn from experience. Connect with industry. Go beyond the classroom.
              </p>
              <div className="space-y-4 mb-8">
                <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                  Enginaro Engineering Talks is a knowledge-sharing initiative by Enginaro (Pvt) Ltd, created to
                  connect engineering students and young professionals with experienced engineers, researchers,
                  academics and industry specialists.
                </p>
                <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                  Through focused technical discussions and interactive sessions, the program brings real-world
                  engineering experience, research knowledge and professional insight closer to the next
                  generation of engineers.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="#upcoming-sessions">Explore Upcoming Sessions</ButtonLink>
                <ButtonLink href="#stay-connected" variant="outline">Follow Engineering Talks</ButtonLink>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden"
            >
              <TalkImage
                src="engineering-talks-hero.jpg"
                alt="Enginaro Engineering Talks – an engineer presenting to an online audience"
                priority
              />
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 1, delay: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 bg-primary z-10"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* About Enginaro Engineering Talks */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <div className="bg-white dark:bg-[#1B1B1B] rounded-3xl p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="flex flex-col gap-6">
                <span className="text-primary font-secondary uppercase tracking-wider">About the Program</span>
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white font-primary">
                  About Enginaro Engineering Talks
                </h2>
                <p className="text-2xl font-bold text-black dark:text-white font-primary">
                  Engineering education builds the foundation.
                </p>
                <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                  But professional engineering also involves design decisions, manufacturing limitations,
                  problem-solving, teamwork, research, innovation, project challenges and real-world experience.
                </p>
              </div>
              <div className="p-6 md:p-8 bg-gray-50 dark:bg-[#292929] rounded-3xl space-y-4">
                <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                  Enginaro Engineering Talks was created to help bridge the gap between academic engineering
                  knowledge and practical engineering experience.
                </p>
                <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                  Through conversations with professionals from industry, academia and research, participants can
                  gain a broader understanding of how engineering is applied beyond the classroom.
                </p>
                <p className="text-black dark:text-white text-lg font-secondary font-semibold">
                  Each session is designed to be informative, practical and interactive.
                </p>
              </div>
            </div>
          </div>
        </SectionAnimation>

        {/* Connecting Three Worlds */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <SectionHeader eyebrow="Our Focus" title="Connecting Three Worlds" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <TalkImage
              src="education-research-industry.jpg"
              alt="Education, Research and Industry – engineering students collaborating"
            />
            <div className="space-y-4">
              {threeWorlds.map((world, index) => (
                <motion.div
                  key={world.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#292929] rounded-3xl p-6 flex gap-4 items-start"
                >
                  <IconBox icon={world.icon} />
                  <div>
                    <h3 className="text-xl font-bold text-black dark:text-white font-primary mb-2">{world.title}</h3>
                    <p className="text-[#3D3D3D] dark:text-white font-secondary">{world.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="text-center text-xl md:text-2xl font-bold text-black dark:text-white font-primary mt-10">
            Education <span className="text-primary">•</span> Research <span className="text-primary">•</span> Industry
          </p>
        </SectionAnimation>

        {/* The Program */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <div className="bg-white dark:bg-[#1B1B1B] rounded-3xl p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <SectionHeader
                  eyebrow="Program"
                  title="The Program"
                  description="Enginaro Engineering Talks will begin with an initial series of six online sessions covering different areas of engineering, technology, research and professional development."
                  align="left"
                />
                <h3 className="text-xl font-bold text-black dark:text-white font-primary mb-4">
                  Each session will typically run for approximately 60–75 minutes and may include:
                </h3>
                <ol className="space-y-3">
                  {sessionFormat.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-center"
                    >
                      <div className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-[#3D3D3D] dark:text-white font-secondary">{item}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  {programFacts.map((fact, index) => (
                    <motion.div
                      key={fact.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="bg-gray-50 dark:bg-[#292929] rounded-3xl p-6"
                    >
                      <fact.icon size={26} className="text-primary mb-4" />
                      <p className="text-3xl md:text-4xl font-bold text-black dark:text-white font-primary">{fact.value}</p>
                      <p className="text-[#3D3D3D] dark:text-white text-sm font-secondary mt-1">{fact.label}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                  The initial program will be conducted online, allowing engineering students and young
                  professionals to participate from different locations.
                </p>
                <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                  Participation in the initial pilot series is planned to be free of charge.
                </p>
              </div>
            </div>
          </div>
        </SectionAnimation>

        {/* Topics We Explore */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <SectionHeader
            eyebrow="Topics"
            title="Topics We Explore"
            description="Enginaro Engineering Talks will cover a broad range of technical and professional topics relevant to modern engineering."
          />
          <div className="flex flex-wrap justify-center gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white dark:bg-[#292929] rounded-3xl p-6 flex flex-col gap-4"
              >
                <IconBox icon={topic.icon} />
                <h3 className="text-xl font-bold text-black dark:text-white font-primary">{topic.title}</h3>
                <p className="text-[#3D3D3D] dark:text-white font-secondary">{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </SectionAnimation>

        {/* Learn From Experience */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-8">
            <div>
              <SectionHeader
                eyebrow="Guest Speakers"
                title="Learn From Experience"
                description="Our guest speakers may include professionals from different engineering and technology backgrounds."
                align="left"
              />
              <div className="bg-primary/10 border-l-4 border-primary rounded-2xl p-6">
                <p className="text-[#3D3D3D] dark:text-white font-secondary mb-2">The focus of every session is simple:</p>
                <p className="text-xl font-bold text-black dark:text-white font-primary">
                  Share useful knowledge, practical experience and lessons that can help the next generation of
                  engineers grow.
                </p>
              </div>
            </div>
            <TalkImage
              src="learn-from-experience.jpg"
              alt="Learn from Experience – an experienced engineer sharing insights with students"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((speaker, index) => (
              <motion.div
                key={speaker.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#292929] rounded-3xl p-6 flex flex-col gap-4"
              >
                <IconBox icon={speaker.icon} />
                <h3 className="text-xl font-bold text-black dark:text-white font-primary">{speaker.title}</h3>
                <p className="text-[#3D3D3D] dark:text-white font-secondary">{speaker.description}</p>
              </motion.div>
            ))}
          </div>
        </SectionAnimation>

        {/* More Than a Presentation */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <div className="bg-black dark:bg-[#1B1B1B] rounded-3xl p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-10">
              <div className="flex flex-col gap-6">
                <span className="text-primary font-secondary uppercase tracking-wider">Interactive Sessions</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-primary">More Than a Presentation</h2>
                <p className="text-white text-lg font-secondary font-semibold">
                  Enginaro Engineering Talks is designed to encourage conversation.
                </p>
                <p className="text-white/80 text-lg font-secondary">
                  Participants will have opportunities to ask questions, exchange ideas and learn directly from the
                  experiences of guest speakers.
                </p>
              </div>
              <TalkImage
                src="engineering-insights.jpg"
                alt="Engineering Insights – a presenter leading an interactive online session"
              />
            </div>
            <h3 className="text-xl font-bold text-white font-primary mb-6">The program aims to explore questions such as:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {discussionQuestions.map((question, index) => (
                <motion.div
                  key={question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-3 items-start"
                >
                  <MessageCircleQuestion size={22} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-white font-secondary">{question}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionAnimation>

        {/* Who Is It For? */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <TalkImage
              src="future-engineers.jpg"
              alt="Future Engineers – engineering students learning together"
            />
            <div>
              <SectionHeader
                eyebrow="Audience"
                title="Who Is It For?"
                description="Enginaro Engineering Talks is designed primarily for:"
                align="left"
              />
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {audience.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
              <p className="text-black dark:text-white text-lg font-secondary font-semibold mb-4">
                Students from different engineering disciplines are welcome.
              </p>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                Whether your interests are in design, manufacturing, research, automation, robotics, simulation,
                product development or engineering careers, the program is designed to provide valuable exposure
                beyond the classroom.
              </p>
            </div>
          </div>
        </SectionAnimation>

        {/* Meet Our Presenter */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <div className="bg-white dark:bg-[#1B1B1B] rounded-3xl p-6 md:p-12">
            <div className="max-w-[800px] mx-auto text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <Mic size={30} className="text-white" />
              </div>
              <span className="text-primary font-secondary uppercase tracking-wider">Meet Our Presenter</span>
              <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white font-primary">
                Guiding Every Engineering Conversation
              </h2>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                The presenter of Enginaro Engineering Talks helps connect the guest speaker, topic and audience.
              </p>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                The presenter will guide discussions, introduce important ideas, ask relevant questions and help
                make each session engaging and accessible for participants.
              </p>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                Before upcoming sessions, the presenter will also introduce speakers, topics and program updates
                through Enginaro&apos;s digital platforms.
              </p>
              <ButtonLink href="#stay-connected">Meet Our Presenter</ButtonLink>
            </div>
          </div>
        </SectionAnimation>

        {/* Upcoming Engineering Talks */}
        <SectionAnimation id="upcoming-sessions" className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6 scroll-mt-32">
          <SectionHeader
            eyebrow="Sessions"
            title="Upcoming Engineering Talks"
            description="Explore upcoming discussions, speakers and engineering topics."
          />
          <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary text-center max-w-[800px] mx-auto -mt-4 mb-10">
            Each Engineering Talk will focus on a specific subject and give participants an opportunity to learn
            from professionals with relevant experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={session.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className={`rounded-3xl p-6 md:p-8 flex flex-col ${
                  session.details
                    ? 'bg-white dark:bg-[#292929] ring-2 ring-primary shadow-lg shadow-primary/20 dark:shadow-primary/10'
                    : 'bg-white/60 dark:bg-[#1B1B1B] border-2 border-dashed border-gray-300 dark:border-[#3D3D3D]'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`rounded-full py-2 px-4 text-sm font-secondary font-semibold ${
                      session.details ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-[#3D3D3D] text-black dark:text-white'
                    }`}
                  >
                    Session {session.number}
                  </span>
                  <CalendarDays size={22} className={session.details ? 'text-primary' : 'text-gray-400'} />
                </div>

                {session.details ? (
                  <>
                    <dl className="space-y-3 mb-6">
                      {session.details.map((detail) => (
                        <div key={detail.label} className="flex flex-col border-b border-gray-100 dark:border-[#3D3D3D] pb-3">
                          <dt className="text-sm text-[#3D3D3D] dark:text-white/70 font-secondary">{detail.label}</dt>
                          <dd className="text-lg font-bold text-black dark:text-white font-primary">{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="text-[#3D3D3D] dark:text-white font-secondary mt-auto">{session.note}</p>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                    <Clock size={36} className="text-gray-400 mb-4" />
                    <p className="text-2xl font-bold text-black dark:text-white font-primary">Coming Soon</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-6 mt-10 text-center">
            <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
              Additional speakers and sessions will be announced as the program develops.
            </p>
            <ButtonLink href="#stay-connected">Follow for Session Updates</ButtonLink>
          </div>
        </SectionAnimation>

        {/* What Participants Can Gain */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <SectionHeader
            eyebrow="Benefits"
            title="What Participants Can Gain"
            description="Enginaro Engineering Talks is designed to complement engineering education by providing additional exposure to industry, research and professional experience."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gains.map((gain, index) => (
              <motion.div
                key={gain.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white dark:bg-[#292929] rounded-3xl p-6 flex gap-4 items-start"
              >
                <IconBox icon={gain.icon} />
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white font-primary mb-2">{gain.title}</h3>
                  <p className="text-[#3D3D3D] dark:text-white font-secondary">{gain.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionAnimation>

        {/* Enginaro Engineering Community */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <div className="bg-white dark:bg-[#1B1B1B] rounded-3xl p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <TalkImage
                src="engineering-community.jpg"
                alt="Engineering Community – students and professionals connecting"
              />
              <div className="flex flex-col gap-5">
                <span className="text-primary font-secondary uppercase tracking-wider">Community</span>
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white font-primary">
                  Enginaro Engineering Community
                </h2>
                <p className="text-black dark:text-white text-lg font-secondary font-semibold">
                  Engineering learning should continue beyond a single session.
                </p>
                <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                  The Enginaro Engineering Community is intended to bring together engineering students, graduates,
                  researchers and professionals who are interested in learning, sharing knowledge and exploring
                  engineering beyond the classroom.
                </p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-black dark:text-white font-primary mt-10 mb-4">
              Through the community, members can stay connected with:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {communityItems.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full py-2 px-4 font-secondary font-semibold text-sm">
              <Users size={16} />
              Community details will be announced soon.
            </span>
          </div>
        </SectionAnimation>

        {/* Previous Sessions */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <div className="border-2 border-dashed border-gray-300 dark:border-[#3D3D3D] rounded-3xl p-6 md:p-12 text-center flex flex-col items-center gap-5 max-w-[900px] mx-auto">
            <CirclePlay size={44} className="text-primary" />
            <span className="text-primary font-secondary uppercase tracking-wider">Archive</span>
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white font-primary">Previous Sessions</h2>
            <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
              As Enginaro Engineering Talks develops, selected session recordings, highlights and key discussions
              will be shared through Enginaro&apos;s digital platforms.
            </p>
            <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
              This will allow participants to revisit valuable discussions and help new audiences discover previous
              Engineering Talks.
            </p>
            <p className="text-black dark:text-white font-secondary font-semibold flex items-center gap-2">
              <Eye size={18} className="text-primary" />
              Previous session content will be available here after the program begins.
            </p>
          </div>
        </SectionAnimation>

        {/* Become a Guest Speaker & Collaborate */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#292929] rounded-3xl p-6 md:p-10 flex flex-col gap-5">
              <IconBox icon={Mic} />
              <h2 className="text-3xl font-bold text-black dark:text-white font-primary">Become a Guest Speaker</h2>
              <p className="text-black dark:text-white text-lg font-secondary font-semibold">
                Engineering knowledge becomes more valuable when it is shared.
              </p>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                Enginaro Engineering Talks welcomes experienced engineers, researchers, academics, PhD scholars and
                technology professionals who are interested in sharing valuable knowledge and experience with
                engineering students and young professionals.
              </p>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                If you are interested in contributing to a future Engineering Talk, we would be pleased to hear from
                you.
              </p>
              <div className="mt-auto pt-2">
                <ButtonLink href="/contact">Contact Enginaro</ButtonLink>
              </div>
            </div>

            <div className="bg-white dark:bg-[#292929] rounded-3xl p-6 md:p-10 flex flex-col gap-5">
              <IconBox icon={Handshake} />
              <h2 className="text-3xl font-bold text-black dark:text-white font-primary">
                Collaborate With Enginaro Engineering Talks
              </h2>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                We welcome opportunities to collaborate with:
              </p>
              <div className="flex flex-wrap gap-2">
                {collaborators.map((collaborator) => (
                  <span
                    key={collaborator}
                    className="bg-gray-100 dark:bg-[#3D3D3D] text-black dark:text-white rounded-full py-2 px-4 text-sm font-secondary"
                  >
                    {collaborator}
                  </span>
                ))}
              </div>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                Together, we can create more opportunities for engineering students to connect with industry
                knowledge, research and professional experience.
              </p>
              <div className="mt-auto pt-2">
                <ButtonLink href="/contact">Discuss a Collaboration</ButtonLink>
              </div>
            </div>
          </div>
        </SectionAnimation>

        {/* Engineering Goes Beyond the Classroom */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="relative z-10 max-w-[700px] mx-auto text-center flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-primary mb-6">
                Engineering Goes Beyond the Classroom
              </h2>
              <div className="space-y-1 text-white text-lg font-secondary opacity-90 mb-6">
                <p>Engineering education provides the foundation.</p>
                <p>Research expands knowledge.</p>
                <p>Industry turns ideas into reality.</p>
                <p>Experience connects everything together.</p>
              </div>
              <p className="text-white text-lg font-secondary font-semibold mb-2">
                Enginaro Engineering Talks brings these worlds closer.
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white font-primary mb-8">
                Learn. Connect. Engineer the Future.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ButtonLink href="#upcoming-sessions" variant="white">Explore Upcoming Sessions</ButtonLink>
                <ButtonLink href="#stay-connected" variant="outline-white">Follow Enginaro Engineering Talks</ButtonLink>
              </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-white opacity-10" style={{ filter: 'blur(80px)' }} />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-white opacity-10" style={{ filter: 'blur(60px)' }} />
          </div>
        </SectionAnimation>

        {/* Frequently Asked Questions */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
          <div className="max-w-[900px] mx-auto space-y-4">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </SectionAnimation>

        {/* Stay Connected */}
        <SectionAnimation id="stay-connected" className="w-full max-w-[1300px] mx-auto px-4 md:px-6 scroll-mt-32">
          <div className="bg-white dark:bg-[#1B1B1B] rounded-3xl p-6 md:p-12">
            <div className="max-w-[800px] mx-auto text-center flex flex-col items-center gap-6">
              <span className="text-primary font-secondary uppercase tracking-wider">Follow Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white font-primary">Stay Connected</h2>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                Follow Enginaro Engineering Talks for upcoming speakers, engineering discussions, session
                announcements and program updates.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-12 h-12 bg-gray-100 dark:bg-[#3D3D3D] rounded-full flex items-center justify-center"
                  >
                    <social.icon className="text-primary w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              <div>
                <p className="text-xl font-bold text-black dark:text-white font-primary">Enginaro Engineering Talks</p>
                <p className="text-[#3D3D3D] dark:text-white font-secondary">An initiative by Enginaro (Pvt) Ltd</p>
              </div>
              <p className="text-primary font-secondary uppercase tracking-wider text-sm">
                Engineering • Knowledge • Research • Industry
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ButtonLink href="https://www.linkedin.com/company/enginaro-industrial-solutions/">Follow Enginaro</ButtonLink>
                <ButtonLink href="/contact" variant="outline">Contact Us</ButtonLink>
              </div>
            </div>
          </div>
        </SectionAnimation>
      </div>
      <Footer />
    </main>
  );
};

export default EngineeringTalksPage;
