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

// Hero particle animation (canvas-based, inspired by provided snippet)
const HeroParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = window.devicePixelRatio || 1;

    const PARTICLE_COUNT = 2200;
    const particles = [];

    let currentShape = 0;
    let holdTimer = 0;
    const holdDuration = 260;
    let isMorphing = false;
    let morphT = 0;
    const morphSpeed = 0.003;
    let time = 0;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      W = rect.width || window.innerWidth;
      H = rect.height || window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize);
    resize();

    // Shape generators (adapted from provided HTML snippet)
    function worldMap() {
      const pts = [];
      const add = (cx, cy, w, h, n, scatter) => {
        for (let i = 0; i < n; i++) {
          const gx = cx + (Math.random() - 0.5) * w;
          const gy = cy + (Math.random() - 0.5) * h;
          const gridSize = 0.022;
          const x =
            Math.round(gx / gridSize) * gridSize +
            (Math.random() - 0.5) * gridSize * scatter;
          const y =
            Math.round(gy / gridSize) * gridSize +
            (Math.random() - 0.5) * gridSize * scatter;
          pts.push({ x, y, s: 1 + Math.random() * 2.2 });
        }
      };
      add(-0.52, -0.08, 0.38, 0.32, 200, 0.4);
      add(-0.35, 0.12, 0.08, 0.1, 30, 0.3);
      add(-0.28, 0.3, 0.18, 0.35, 140, 0.4);
      add(0.08, -0.15, 0.16, 0.16, 80, 0.35);
      add(0.12, 0.15, 0.2, 0.38, 160, 0.4);
      add(0.38, -0.12, 0.45, 0.32, 280, 0.4);
      add(0.58, 0.32, 0.16, 0.12, 50, 0.4);
      add(-0.22, -0.32, 0.1, 0.08, 25, 0.3);
      return pts;
    }

    function waveField() {
      const pts = [];
      const cols = 90;
      const rows = 24;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c / (cols - 1)) * 2 - 1;
          const baseY = (r / (rows - 1)) * 1.0 - 0.5;
          const wave1 = Math.sin(x * 3.5 + r * 0.25) * 0.06;
          const wave2 = Math.sin(x * 5 - r * 0.15) * 0.03;
          const y = baseY + wave1 + wave2;
          if (Math.random() < 0.82) {
            const amplitude = Math.abs(wave1 + wave2);
            pts.push({
              x,
              y,
              s: 0.8 + amplitude * 12 + Math.random() * 1.2
            });
          }
        }
      }
      return pts;
    }

    function globe() {
      const pts = [];
      for (let m = 0; m < 14; m++) {
        const lon = (m / 14) * Math.PI;
        for (let i = 0; i < 45; i++) {
          const lat = (i / 44) * Math.PI * 2;
          const x = Math.cos(lon) * Math.sin(lat) * 0.48;
          const y = Math.cos(lat) * 0.48;
          const z = Math.sin(lon) * Math.sin(lat);
          if (z > -0.25) {
            const depth = (z + 0.25) / 1.25;
            pts.push({
              x,
              y,
              s: (0.6 + depth * 2) * (0.5 + Math.random() * 0.5)
            });
          }
        }
      }
      for (let p = 1; p < 9; p++) {
        const lat = (p / 9) * Math.PI;
        const r = Math.sin(lat) * 0.48;
        const yy = Math.cos(lat) * 0.48;
        const count = Math.floor(55 * Math.sin(lat));
        for (let i = 0; i < count; i++) {
          const lon = (i / count) * Math.PI * 2;
          const x = Math.cos(lon) * r;
          const z = Math.sin(lon) * r;
          if (z > -0.2) {
            const depth = (z + 0.2) / 1.2;
            pts.push({
              x,
              y: yy,
              s: (0.6 + depth * 2) * (0.5 + Math.random() * 0.5)
            });
          }
        }
      }
      return pts;
    }

    function mountains() {
      const pts = [];
      const peaks = [
        { cx: -0.7, h: 0.25, w: 0.22 },
        { cx: -0.4, h: 0.42, w: 0.28 },
        { cx: -0.05, h: 0.55, w: 0.3 },
        { cx: 0.3, h: 0.38, w: 0.25 },
        { cx: 0.6, h: 0.3, w: 0.22 },
        { cx: 0.85, h: 0.2, w: 0.2 }
      ];
      const gridX = 0.018;
      const gridY = 0.018;
      for (let x = -1; x <= 1; x += gridX) {
        let skyline = 0.35;
        for (const p of peaks) {
          const d = Math.abs(x - p.cx) / p.w;
          if (d < 1) {
            const mtnY = 0.35 - p.h * Math.pow(1 - d * d, 1.2);
            skyline = Math.min(skyline, mtnY);
          }
        }
        for (let y = skyline; y <= 0.42; y += gridY) {
          if (Math.random() < 0.88) {
            const edgeDist = y - skyline;
            const s =
              edgeDist < 0.03
                ? 1.5 + Math.random() * 2
                : 0.8 + Math.random() * 1.5;
            pts.push({
              x: x + (Math.random() - 0.5) * gridX * 0.3,
              y: y + (Math.random() - 0.5) * gridY * 0.3,
              s
            });
          }
        }
      }
      return pts;
    }

    function galaxy() {
      const pts = [];
      const arms = 3;
      for (let a = 0; a < arms; a++) {
        const armOffset = (a / arms) * Math.PI * 2;
        for (let i = 0; i < 350; i++) {
          const t = (i / 350) * Math.PI * 2.5;
          const r = 0.05 + (i / 350) * 0.5;
          const spread = 0.03 + r * 0.12;
          const x =
            Math.cos(t + armOffset) * r +
            (Math.random() - 0.5) * spread;
          const y =
            Math.sin(t + armOffset) * r * 0.55 +
            (Math.random() - 0.5) * spread * 0.6;
          const distFromCenter = Math.sqrt(x * x + y * y);
          pts.push({
            x,
            y,
            s:
              0.5 +
              (1 - distFromCenter) * 2.5 * Math.random()
          });
        }
      }
      for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.08;
        pts.push({
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r * 0.55,
          s: 1.5 + Math.random() * 2
        });
      }
      return pts;
    }

    const shapeGenerators = [worldMap, waveField, globe, mountains, galaxy];

    const shapeTargets = shapeGenerators.map((fn) => {
      let pts = fn();
      while (pts.length < PARTICLE_COUNT) {
        const src = pts[Math.floor(Math.random() * pts.length)];
        pts.push({
          x: src.x + (Math.random() - 0.5) * 0.015,
          y: src.y + (Math.random() - 0.5) * 0.015,
          s: src.s * (0.2 + Math.random() * 0.4)
        });
      }
      return pts.slice(0, PARTICLE_COUNT);
    });

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = shapeTargets[0][i];
      particles.push({
        x: (Math.random() - 0.5) * 2.5,
        y: (Math.random() - 0.5) * 2.5,
        s: 0.5,
        tx: t.x,
        ty: t.y,
        ts: t.s,
        vx: 0,
        vy: 0,
        opacity: 0,
        delay: Math.random() * 40
      });
    }

    function assignTargets(shapeIndex) {
      const targets = shapeTargets[shapeIndex];
      const pIdx = Array.from({ length: PARTICLE_COUNT }, (_, i) => i);
      const tIdx = Array.from({ length: PARTICLE_COUNT }, (_, i) => i);

      pIdx.sort((a, b) => {
        const da =
          Math.atan2(particles[a].y, particles[a].x) +
          particles[a].y * 0.5;
        const db =
          Math.atan2(particles[b].y, particles[b].x) +
          particles[b].y * 0.5;
        return da - db;
      });
      tIdx.sort((a, b) => {
        const da =
          Math.atan2(targets[a].y, targets[a].x) +
          targets[a].y * 0.5;
        const db =
          Math.atan2(targets[b].y, targets[b].x) +
          targets[b].y * 0.5;
        return da - db;
      });

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const pi = pIdx[i];
        const ti = tIdx[i];
        particles[pi].tx = targets[ti].x;
        particles[pi].ty = targets[ti].y;
        particles[pi].ts = targets[ti].s;
      }
    }

    function nextShape() {
      currentShape = (currentShape + 1) % shapeGenerators.length;
      assignTargets(currentShape);
      isMorphing = true;
      morphT = 0;
    }

    let animationId;

    function animate() {
      animationId = requestAnimationFrame(animate);
      time++;

      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const scale = Math.min(W, H) * 0.52;

      if (!isMorphing) {
        holdTimer++;
        if (holdTimer > holdDuration) {
          holdTimer = 0;
          nextShape();
        }
      } else {
        morphT += morphSpeed;
        if (morphT >= 1) {
          morphT = 1;
          isMorphing = false;
          holdTimer = 0;
        }
      }

      const spring = 0.022;
      const damp = 0.91;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];

        if (time < p.delay) continue;

        const dx = p.tx - p.x;
        const dy = p.ty - p.y;

        p.vx += dx * spring;
        p.vy += dy * spring;
        p.vx *= damp;
        p.vy *= damp;

        const n = 0.0002;
        p.vx += Math.sin(time * 0.006 + i * 0.13) * n;
        p.vy += Math.cos(time * 0.008 + i * 0.09) * n;

        p.x += p.vx;
        p.y += p.vy;
        p.s += (p.ts - p.s) * 0.02;

        if (p.opacity < 1) p.opacity = Math.min(p.opacity + 0.015, 1);

        const sx = cx + p.x * scale;
        const sy = cy + p.y * scale;

        if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;

        const dist = Math.sqrt(dx * dx + dy * dy);
        const settledAlpha = Math.max(0.12, 1 - dist * 2.5);
        const alpha = p.opacity * (0.2 + 0.8 * settledAlpha);

        const breathe =
          1 + Math.sin(time * 0.012 + i * 0.7) * 0.05;
        const radius = Math.max(0.3, p.s * breathe);

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(18, 18, 18, ${alpha * 0.85})`;
        ctx.fill();
      }
    }

    assignTargets(currentShape);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

// Hero Section
const Hero = () => (
  <section className="relative overflow-hidden min-h-screen pt-[120px] pb-20 px-10 grid grid-cols-[1.2fr_0.8fr] gap-[60px] items-center bg-[linear-gradient(to_right,var(--color-background)_60%,transparent_60%),repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.03)_40px,rgba(0,0,0,0.03)_41px)] max-[1024px]:grid-cols-1 max-[1024px]:bg-background max-[1024px]:pt-[100px] max-[1024px]:pb-[60px] max-[1024px]:px-6 max-[768px]:pt-20 max-[768px]:px-5" id="studio">
    {/* Full-bleed particle background */}
    <div className="pointer-events-none absolute inset-0 opacity-80">
      <HeroParticles />
    </div>

    <div className="relative z-10 max-w-[700px] max-[1024px]:max-w-[600px]">
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
          className="px-8 py-4 bg-foreground text-background text-sm tracking-[0.05em] font-semibold transition-colors duration-200 hover:bg-foreground/90 max-[768px]:w-full max-[768px]:text-center min-h-12 rounded-sm"
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
    <div className="relative z-10 flex items-center justify-center max-[1024px]:mt-10 max-[768px]:mt-8" />
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
      <button className="px-8 py-4 bg-background text-foreground text-sm tracking-[0.05em] font-semibold transition-colors duration-200 hover:bg-background/90 max-[768px]:w-full max-[768px]:max-w-[280px] max-[768px]:mx-auto rounded-sm">
        LISTEN →
      </button>
      <a
        href="https://www.youtube.com/@0toShipped"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 bg-background text-foreground text-sm tracking-[0.05em] font-semibold transition-colors duration-200 hover:bg-background/90 max-[768px]:w-full max-[768px]:max-w-[280px] max-[768px]:mx-auto rounded-sm flex items-center justify-center"
      >
        WATCH →
      </a>
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
          className="w-full p-5 bg-transparent border border-background/30 text-background font-sans text-sm tracking-[0.05em] transition-colors duration-200 placeholder:text-background/40 focus:outline-none focus:border-background min-h-12 rounded-sm"
        />
        <textarea
          placeholder="WHAT DO YOU WANT TO BUILD?"
          className="w-full p-5 bg-transparent border border-background/30 text-background font-sans text-sm tracking-[0.05em] transition-colors duration-200 placeholder:text-background/40 focus:outline-none focus:border-background resize-y min-h-[120px] rounded-sm"
          rows={3}
        />
        <button
          type="submit"
          className="px-8 py-4 bg-background text-foreground text-sm tracking-[0.05em] font-semibold transition-colors duration-200 hover:bg-background/90 min-h-12 rounded-sm"
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
