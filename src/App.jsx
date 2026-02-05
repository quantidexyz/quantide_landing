import React, { useState, useEffect, useRef } from 'react';
import { cn } from 'liquidcn';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from 'liquidcn/client';
import { Github } from 'lucide-react';

const navItems = [
  { name: 'Studio', link: '#studio' },
  { name: 'Work', link: '#work' },
  { name: 'Podcast', link: '#podcast' },
  { name: 'Contact', link: '#contact' },
];

// Navigation Component using liquidcn ResizableNavbar
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ResizableNavbar menuOpen={isMobileMenuOpen}>
      {/* Desktop Navigation */}
      <NavBody>
        <div className="flex items-center gap-3">
          <NavbarLogo imageSrc="/quantide_logo.png" label="" imageWidth={140} imageHeight={40} imageClassName="h-10 w-auto" />
        </div>
        <NavItems items={navItems} currentPath="#studio" />
        <div className="flex items-center gap-4">
          <NavbarButton asChild>
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0nzEnWRO2K7nWz1ZqegG84WxOSIVSzjpqfZ9aPsklpl4AXS79jBxHAEjk42nFsq-_q01Mf1tEw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-foreground bg-transparent text-foreground text-xs tracking-wide font-semibold hover:bg-foreground hover:text-background transition-colors rounded-md"
            >
              BOOK A CALL
            </a>
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo imageSrc="/quantide_logo.png" label="" imageWidth={120} imageHeight={35} imageClassName="h-9 w-auto" />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-base font-medium transition text-foreground/60 hover:text-foreground"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton onClick={() => setIsMobileMenuOpen(false)} asChild>
              <a
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0nzEnWRO2K7nWz1ZqegG84WxOSIVSzjpqfZ9aPsklpl4AXS79jBxHAEjk42nFsq-_q01Mf1tEw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 bg-foreground text-background text-sm tracking-wide font-semibold rounded-md text-center"
              >
                BOOK A CALL
              </a>
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
};

// Hero Section
const Hero = () => (
  <section className="min-h-screen pt-[120px] pb-20 px-10 grid grid-cols-[1.2fr_0.8fr] gap-[60px] items-center bg-[linear-gradient(to_right,var(--color-background)_60%,transparent_60%),repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.03)_40px,rgba(0,0,0,0.03)_41px)] max-[1024px]:grid-cols-1 max-[1024px]:bg-background max-[1024px]:pt-[100px] max-[1024px]:pb-[60px] max-[1024px]:px-6 max-[768px]:pt-20 max-[768px]:px-5" id="studio">
    <div className="max-w-[700px] max-[1024px]:max-w-[600px]">
      <h1 className="text-[clamp(3rem,8vw,7rem)] leading-[0.9] mb-10">
        APPS<br />
        THAT<br />
        WORK
      </h1>
      <p className="text-xl text-foreground/60 mb-10 max-w-[480px] max-[1024px]:text-lg">
        A product-focused development studio for web apps,
        smart contracts, and API integrations.
      </p>
      <div className="flex gap-6 items-center max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-4">
          <a
          href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0nzEnWRO2K7nWz1ZqegG84WxOSIVSzjpqfZ9aPsklpl4AXS79jBxHAEjk42nFsq-_q01Mf1tEw"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-foreground text-background text-sm tracking-[0.05em] font-semibold transition-colors duration-200 hover:bg-foreground/90 max-[768px]:w-full max-[768px]:text-center min-h-12 rounded-md"
        >
          BOOK A CALL
        </a>
        <a
          href="#work"
          className="flex items-center text-sm tracking-[0.05em] font-semibold text-foreground hover:text-foreground/70 transition-colors duration-200 bg-transparent border-none cursor-pointer max-[768px]:w-full max-[768px]:justify-center min-h-12"
        >
          VIEW WORK →
        </a>
      </div>
    </div>
    <div className="flex items-center justify-center max-[1024px]:mt-10 max-[768px]:mt-8">
      <div className="w-full max-w-[500px] aspect-[4/3] text-foreground/30 max-[768px]:max-w-[300px]">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid)"/>
          {/* Pipeline lines with animation */}
          <path
            d="M50 150 Q100 100 150 150 T250 150 T350 100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="opacity-40 animate-dash"
            strokeDasharray="10 5"
          />
          <path
            d="M50 180 Q100 230 150 180 T250 180 T350 220"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="opacity-20 animate-dash-slow"
            strokeDasharray="8 4"
          />
          {/* Animated nodes */}
          <circle cx="50" cy="150" r="8" className="fill-foreground animate-pulse-node" style={{ animationDelay: '0s' }}/>
          <circle cx="150" cy="150" r="6" className="fill-foreground animate-pulse-node" style={{ animationDelay: '0.3s' }}/>
          <circle cx="250" cy="150" r="8" className="fill-foreground animate-pulse-node" style={{ animationDelay: '0.6s' }}/>
          <circle cx="350" cy="100" r="10" className="fill-foreground/80 animate-pulse-node" style={{ animationDelay: '0.9s' }}/>
          {/* Secondary nodes */}
          <circle cx="50" cy="180" r="5" className="fill-foreground/50 animate-pulse-node" style={{ animationDelay: '0.15s' }}/>
          <circle cx="150" cy="180" r="4" className="fill-foreground/50 animate-pulse-node" style={{ animationDelay: '0.45s' }}/>
          <circle cx="250" cy="180" r="5" className="fill-foreground/50 animate-pulse-node" style={{ animationDelay: '0.75s' }}/>
          <circle cx="350" cy="220" r="8" className="fill-foreground/80 animate-pulse-node" style={{ animationDelay: '1.05s' }}/>
          {/* Data particles flowing along paths */}
          <circle r="3" className="fill-foreground">
            <animateMotion dur="3s" repeatCount="indefinite" path="M50 150 Q100 100 150 150 T250 150 T350 100" />
          </circle>
          <circle r="2" className="fill-foreground/60">
            <animateMotion dur="4s" repeatCount="indefinite" path="M50 180 Q100 230 150 180 T250 180 T350 220" />
          </circle>
        </svg>
      </div>
    </div>
  </section>
);

// What We Build Section
const WhatWeBuild = () => (
  <section className="py-[120px] px-10 bg-foreground text-background max-[1024px]:py-20 max-[1024px]:px-6 max-[768px]:px-5" id="what-we-build">
    <h2 className="text-sm tracking-[0.15em] text-background/50 mb-[60px]">WHAT WE BUILD</h2>
    <div className="grid grid-cols-4 gap-px bg-background/20 border border-background/20 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1">
      {[
        { title: 'Web Apps', desc: 'Full-stack applications with modern frameworks' },
        { title: 'Smart Contracts', desc: 'Secure, audited DeFi and token contracts' },
        { title: 'API & Platform Integrations', desc: 'Connect your systems seamlessly' },
        { title: 'MVP → Launch', desc: 'From concept to production in weeks' }
      ].map((item, i) => (
        <div key={i} className="p-12 bg-foreground border border-background/20 transition-colors duration-300 cursor-pointer hover:bg-foreground/90 group max-[1024px]:p-8">
          <span className="block text-xs text-background/40 mb-6 font-mono group-hover:text-background/60">[0{i + 1}]</span>
          <h3 className="text-2xl font-bold mb-4 max-[1024px]:text-xl">{item.title}</h3>
          <p className="text-sm text-background/50 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// Projects Section
const Projects = ({ onOpenProject }) => (
  <section className="py-[120px] px-10 bg-muted relative overflow-hidden max-[1024px]:py-20 max-[1024px]:px-6 max-[768px]:px-5" id="work">
    <h2 className="absolute top-10 left-10 text-[clamp(6rem,20vw,15rem)] font-bold text-foreground leading-[0.8] tracking-[-0.05em] pointer-events-none z-0 max-[768px]:text-[clamp(4rem,15vw,8rem)]">
      PROJECTS
    </h2>
    <div className="relative z-[1] grid grid-cols-2 gap-10 mt-[120px] max-[1024px]:grid-cols-1 max-[1024px]:gap-8 max-[1024px]:mt-20">
      {[
        {
          id: 'levr',
          name: 'Levr',
          type: 'Token Launchpad',
          role: 'Product, Design, Engineering',
          stack: 'Solidity, React, APIs',
          status: 'Live',
          url: 'https://levr.world',
          image: '/levr_screenshot.jpg'
        },
        {
          id: 'breadcrumb',
          name: 'Breadcrumb',
          type: 'AI Marketing',
          role: 'Product, Design, Engineering',
          stack: 'AI, Twitter/X APIs',
          status: 'Live',
          url: 'https://breadcrumb.cash',
          image: '/breadcrumb_screenshot.jpg'
        }
      ].map((project) => (
        <div
          key={project.id}
          className="bg-background rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border border-foreground/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
          onClick={() => onOpenProject(project)}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenProject(project)}
        >
          <div 
            className="aspect-[16/10] bg-muted flex items-center justify-center p-4 rounded-t-2xl relative"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.18) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0'
            }}
          >
            <img src={project.image} alt={`${project.name} screenshot`} className="max-w-full max-h-full object-contain rounded-lg relative z-10" />
          </div>
          <div className="py-6 px-8 flex gap-3 text-xs text-foreground/50 flex-wrap max-[1024px]:py-5 max-[1024px]:px-6">
            <span>{project.type}</span>
            <span>|</span>
            <span>{project.role}</span>
            <span>|</span>
            <span>{project.stack}</span>
            <span>|</span>
            <span>{project.status}</span>
          </div>
          <button className="w-full py-5 bg-foreground text-background text-sm tracking-[0.1em] font-semibold transition-colors duration-200 hover:bg-foreground/90 min-h-14 rounded-md">
            SEE PROJECT →
          </button>
        </div>
      ))}
    </div>
  </section>
);

// Project Modal using liquidcn Dialog
const ProjectModal = ({ project, open, onClose }) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[800px]" showCloseButton>
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.name}</DialogTitle>
          <DialogDescription>
            {project.type} • {project.status}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img src={project.image} alt={`${project.name} interface`} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-foreground/5 rounded-lg">
            <div>
              <span className="block text-[10px] tracking-wide text-foreground/50 mb-1">TYPE</span>
              <span className="text-sm font-medium">{project.type}</span>
            </div>
            <div>
              <span className="block text-[10px] tracking-wide text-foreground/50 mb-1">ROLE</span>
              <span className="text-sm font-medium">{project.role}</span>
            </div>
            <div>
              <span className="block text-[10px] tracking-wide text-foreground/50 mb-1">STACK</span>
              <span className="text-sm font-medium">{project.stack}</span>
            </div>
            <div>
              <span className="block text-[10px] tracking-wide text-foreground/50 mb-1">STATUS</span>
              <span className="text-sm font-medium">{project.status}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-wide text-foreground/50 mb-3">WHAT WE DID</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['Product definition', 'Smart contract architecture', 'Frontend & UX', 'API integrations'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <span className="text-foreground/40">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="mt-6">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-foreground/20 text-sm font-medium rounded-md transition-colors duration-200 hover:bg-foreground/5 text-center"
            >
              Visit Live ↗
            </a>
          )}
          <button
            className="px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-md transition-colors duration-200 hover:bg-foreground/90"
            onClick={onClose}
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Podcast Section
const Podcast = () => (
  <section
    className="py-[120px] px-10 bg-foreground text-background text-center max-[1024px]:py-20 max-[1024px]:px-6 max-[768px]:px-5 relative"
    id="podcast"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
      `,
      backgroundSize: '32px 32px',
    }}
  >
    <img src="/0-to-shipped-logo.png" alt="0 TO SHIPPED" className="mb-6 mx-auto" style={{ maxWidth: 'clamp(16rem, 40vw, 32rem)', height: 'auto' }} />
    <p className="text-xl text-background/50 max-w-[600px] mx-auto mb-10">
      A behind-the-scenes podcast about building, shipping, and scaling real products.
    </p>
    <div className="flex gap-6 justify-center mb-[60px] max-[1024px]:gap-4 max-[768px]:flex-col max-[768px]:gap-4">
      <button className="px-8 py-4 bg-background text-foreground text-sm tracking-[0.05em] font-semibold transition-colors duration-200 hover:bg-background/90 max-[768px]:w-full max-[768px]:max-w-[280px] max-[768px]:mx-auto rounded-md">
        LISTEN →
      </button>
      <button className="px-8 py-4 bg-background text-foreground text-sm tracking-[0.05em] font-semibold transition-colors duration-200 hover:bg-background/90 max-[768px]:w-full max-[768px]:max-w-[280px] max-[768px]:mx-auto rounded-md">
        WATCH →
      </button>
    </div>
    <div className="max-w-[200px] mx-auto text-background/40">
      <svg viewBox="0 0 200 40" className="w-full">
        <path
          d="M0 20 Q10 5 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
        />
      </svg>
    </div>
  </section>
);

// Studio/Philosophy Section
const Studio = () => (
  <section className="py-[120px] px-10 bg-background max-[1024px]:py-20 max-[1024px]:px-6 max-[768px]:px-5" id="studio-section">
    <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-none mb-20 max-[1024px]:mb-[60px]">
      WE DON'T JUST<br />
      DESIGN OR CODE.<br />
      WE SHIP.
    </h2>
    <div className="grid grid-cols-2 gap-10 max-[1024px]:gap-6 max-[768px]:grid-cols-1">
      {[
        'Built by founders who understand product',
        'Product-first mindset, engineering excellence',
        'Fast execution, reliable delivery',
        'Real-world systems, not theory'
      ].map((point, i) => (
        <div key={i} className="p-8 bg-muted border border-foreground/10 max-[1024px]:p-6">
          <span className="block text-xs text-foreground/40 mb-4 font-mono">[0{i + 1}]</span>
          <p className="text-lg text-foreground/80">{point}</p>
        </div>
      ))}
    </div>
  </section>
);

// Party Mode Component - Raining Doges
const PartyMode = ({ active }) => {
  const [doges, setDoges] = useState([]);
  const audioRef = useRef(null);
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

  useEffect(() => {
    if (!active) {
      setDoges([]);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }
    const t = setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 0);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const interval = setInterval(() => {
      const newDoge = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 40 + Math.random() * 40,
      };
      setDoges((prev) => [...prev, newDoge]);
    }, 200);

    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const timeout = setTimeout(() => {
      setDoges((prev) => prev.slice(1));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [doges, active]);

  if (!active) return null;

  return (
    <>
      <audio ref={audioRef} src="/celebration.mp3" loop />
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {doges.map((doge) => (
        <img
          key={doge.id}
          src="/dancing_doge.png"
          alt="dancing doge"
          className="absolute party-doge"
          style={{
            left: `${doge.left}%`,
            width: `${doge.size}px`,
            height: `${doge.size}px`,
            animationDelay: `${doge.delay}s`,
            animationDuration: `${doge.duration}s`,
            filter: `hue-rotate(${Math.random() * 360}deg) saturate(1.5)`,
            top: '-50px',
          }}
        />
      ))}
    </div>
    </>
  );
};

// Contact Section
const Contact = ({ onPartyModeToggle }) => (
  <section className="py-[120px] px-10 bg-foreground text-background grid grid-cols-2 gap-20 max-[1024px]:py-20 max-[1024px]:px-6 max-[1024px]:gap-10 max-[900px]:grid-cols-1 max-[768px]:px-5" id="contact">
    <div>
      <h2 className="text-[clamp(3rem,10vw,8rem)] leading-[0.9] max-[900px]:text-[clamp(2.5rem,8vw,5rem)] max-[768px]:text-[clamp(2.5rem,12vw,5rem)]">
        LET'S<br />
        BUILD
      </h2>
    </div>
    <div>
      <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
        <input
          type="email"
          placeholder="EMAIL"
          className="w-full p-5 bg-transparent border border-background/30 text-background font-sans text-sm tracking-[0.05em] transition-colors duration-200 placeholder:text-background/40 focus:outline-none focus:border-background min-h-12 rounded-md"
        />
        <textarea
          placeholder="WHAT DO YOU WANT TO BUILD?"
          className="w-full p-5 bg-transparent border border-background/30 text-background font-sans text-sm tracking-[0.05em] transition-colors duration-200 placeholder:text-background/40 focus:outline-none focus:border-background resize-y min-h-[120px] rounded-md"
          rows={3}
        />
        <button
          type="submit"
          className="px-8 py-4 bg-background text-foreground text-sm tracking-[0.05em] font-semibold transition-colors duration-200 hover:bg-background/90 min-h-12 rounded-md"
        >
          SEND →
        </button>
      </form>
      <div className="flex items-center gap-6 mt-8 flex-wrap">
        <a
          href="mailto:hello@quantide.xyz"
          className="text-background/50 text-base hover:text-background transition-colors duration-200"
        >
          hello@quantide.xyz
        </a>
        <a
          href="https://github.com/quantidexyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-background/50 hover:text-background transition-colors duration-200"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <button
          onClick={onPartyModeToggle}
          className="text-background/50 text-base hover:text-background transition-colors duration-200 cursor-pointer"
        >
          party
        </button>
      </div>
    </div>
  </section>
);


// Main App Component
function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [partyMode, setPartyMode] = useState(false);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseProject = () => {
    setShowModal(false);
  };

  const handlePartyModeToggle = () => {
    setPartyMode(!partyMode);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhatWeBuild />
        <Projects onOpenProject={handleOpenProject} />
        <Podcast />
        <Studio />
        <Contact onPartyModeToggle={handlePartyModeToggle} />
      </main>
      <ProjectModal project={selectedProject} open={showModal} onClose={handleCloseProject} />
      <PartyMode active={partyMode} />
    </div>
  );
}

export default App;
