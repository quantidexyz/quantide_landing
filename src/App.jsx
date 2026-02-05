import React, { useState, useEffect } from 'react';
import './App.css';

// Logo component (placeholder - replace with actual logo)
const Logo = () => (
  <div className="logo">
    <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="30" fontFamily="system-ui, sans-serif" fontSize="24" fontWeight="700" fill="currentColor">QUANTIDE</text>
    </svg>
  </div>
);

// Navigation Component
const Navbar = ({ activeSection, setActiveSection }) => {
  const sections = ['studio', 'work', 'podcast', 'contact'];
  
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Logo />
      </div>
      <div className="nav-center">
        {sections.map(section => (
          <button 
            key={section}
            className={`nav-link ${activeSection === section ? 'active' : ''}`}
            onClick={() => setActiveSection(section)}
          >
            {section.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="nav-right">
        <button className="btn-outlined">BOOK A CALL</button>
        <div className="social-icons">
          <span>X</span>
          <span>GH</span>
          <span>IN</span>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const Hero = ({ setActiveSection }) => (
  <section className="hero" id="studio">
    <div className="hero-content">
      <h1 className="hero-title">
        APPS<br />
        THAT<br />
        WORK
      </h1>
      <p className="hero-subtitle">
        A product-focused development studio for web apps, 
        smart contracts, and API integrations.
      </p>
      <div className="hero-cta">
        <button className="btn-primary" onClick={() => setActiveSection('contact')}>BOOK A CALL</button>
        <button className="btn-text" onClick={() => setActiveSection('work')}>VIEW WORK →</button>
      </div>
    </div>
    <div className="hero-visual">
      <div className="system-illustration">
        <svg viewBox="0 0 400 300" className="illustration-svg">
          {/* Abstract system/pipeline illustration */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid)"/>
          {/* Pipeline lines */}
          <path d="M50 150 Q100 100 150 150 T250 150 T350 100" stroke="currentColor" strokeWidth="2" fill="none" className="pipeline"/>
          <path d="M50 180 Q100 230 150 180 T250 180 T350 220" stroke="currentColor" strokeWidth="1.5" fill="none" className="pipeline-secondary"/>
          {/* Nodes */}
          <circle cx="50" cy="150" r="8" className="node"/>
          <circle cx="150" cy="150" r="6" className="node"/>
          <circle cx="250" cy="150" r="8" className="node"/>
          <circle cx="350" cy="100" r="10" className="node-main"/>
          {/* Connection dots */}
          <circle cx="50" cy="180" r="5" className="node-secondary"/>
          <circle cx="150" cy="180" r="4" className="node-secondary"/>
          <circle cx="250" cy="180" r="5" className="node-secondary"/>
          <circle cx="350" cy="220" r="8" className="node-main"/>
        </svg>
      </div>
    </div>
  </section>
);

// What We Build Section
const WhatWeBuild = () => (
  <section className="what-we-build" id="what-we-build">
    <h2 className="section-title">WHAT WE BUILD</h2>
    <div className="build-grid">
      {[
        { title: 'Web Apps', desc: 'Full-stack applications with modern frameworks' },
        { title: 'Smart Contracts', desc: 'Secure, audited DeFi and token contracts' },
        { title: 'API & Platform Integrations', desc: 'Connect your systems seamlessly' },
        { title: 'MVP → Launch', desc: 'From concept to production in weeks' }
      ].map((item, i) => (
        <div key={i} className="build-card">
          <span className="card-index">[0{i + 1}]</span>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// Projects Section
const Projects = ({ onOpenProject }) => (
  <section className="projects" id="work">
    <h2 className="projects-title-bg">PROJECTS</h2>
    <div className="project-cards">
      {[
        { 
          id: 'levr',
          name: 'Levr', 
          type: 'Token Launchpad',
          role: 'Product, Design, Engineering',
          stack: 'Solidity, React, APIs',
          status: 'Live',
          url: 'https://levr.world'
        },
        { 
          id: 'breadcrumb', 
          name: 'Breadcrumb', 
          type: 'AI Marketing',
          role: 'Product, Design, Engineering',
          stack: 'AI, Twitter/X APIs',
          status: 'Live'
        }
      ].map((project, i) => (
        <div key={project.id} className="project-card" onClick={() => onOpenProject(project)}>
          <div className="project-preview">
            <div className="project-placeholder">
              <span>{project.name}</span>
            </div>
          </div>
          <div className="project-meta">
            <span>{project.type}</span>
            <span>|</span>
            <span>{project.role}</span>
            <span>|</span>
            <span>{project.stack}</span>
            <span>|</span>
            <span>{project.status}</span>
          </div>
          <button className="see-project-btn">SEE PROJECT →</button>
        </div>
      ))}
    </div>
  </section>
);

// Project Modal
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-header">
          <h2>{project.name}</h2>
          <span className="modal-index">[01]</span>
        </div>
        <div className="modal-hero">
          <div className="modal-screenshot">
            <div className="screenshot-placeholder">
              <span>{project.name} Interface</span>
            </div>
          </div>
        </div>
        <div className="modal-summary">
          <div className="summary-grid">
            <div><span className="label">TYPE</span><span>{project.type}</span></div>
            <div><span class="label">ROLE</span><span>{project.role}</span></div>
            <div><span class="label">STACK</span><span>{project.stack}</span></div>
            <div><span class="label">STATUS</span><span>{project.status}</span></div>
          </div>
          <div className="what-we-did">
            <h4>WHAT WE DID</h4>
            <ul>
              <li>Product definition</li>
              <li>Smart contract architecture</li>
              <li>Frontend & UX</li>
              <li>API integrations</li>
            </ul>
          </div>
        </div>
        <div className="modal-actions">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              VISIT LIVE ↑
            </a>
          )}
          <button className="btn-primary" onClick={onClose}>CLOSE PROJECT</button>
        </div>
      </div>
    </div>
  );
};

// Podcast Section
const Podcast = () => (
  <section className="podcast" id="podcast">
    <h2 className="section-title">PODCAST — 0 TO SHIPPED</h2>
    <p className="podcast-desc">
      A behind-the-scenes podcast about building, shipping, and scaling real products.
    </p>
    <div className="podcast-cta">
      <button className="btn-primary">LISTEN →</button>
      <button className="btn-primary">WATCH →</button>
    </div>
    <div className="waveform">
      <svg viewBox="0 0 200 40" className="waveform-svg">
        <path d="M0 20 Q10 5 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20" 
              stroke="currentColor" fill="none" strokeWidth="2"/>
      </svg>
    </div>
  </section>
);

// Studio/Philosophy Section
const Studio = () => (
  <section className="studio" id="studio-section">
    <h2 className="studio-title">
      WE DON'T JUST<br />
      DESIGN OR CODE.<br />
      WE SHIP.
    </h2>
    <div className="studio-points">
      <div className="studio-point">
        <span className="point-number">[01]</span>
        <p>Built by founders who understand product</p>
      </div>
      <div className="studio-point">
        <span className="point-number">[02]</span>
        <p>Product-first mindset, engineering excellence</p>
      </div>
      <div className="studio-point">
        <span className="point-number">[03]</span>
        <p>Fast execution, reliable delivery</p>
      </div>
      <div className="studio-point">
        <span className="point-number">[04]</span>
        <p>Real-world systems, not theory</p>
      </div>
    </div>
  </section>
);

// Contact Section
const Contact = () => (
  <section className="contact" id="contact">
    <div className="contact-left">
      <h2>
        LET'S<br />
        BUILD
      </h2>
    </div>
    <div className="contact-right">
      <form className="contact-form" onSubmit={e => e.preventDefault()}>
        <input type="email" placeholder="EMAIL" className="form-input" />
        <textarea placeholder="WHAT DO YOU WANT TO BUILD?" className="form-textarea" rows={3}></textarea>
        <button type="submit" className="btn-primary">SEND →</button>
      </form>
      <a href="mailto:hello@quantide.xyz" className="email-link">hello@quantide.xyz</a>
    </div>
  </section>
);

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('studio');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseProject = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  // Smooth scroll handler
  const handleNavClick = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section === 'studio' ? 'studio' : section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <Navbar activeSection={activeSection} setActiveSection={handleNavClick} />
      <main>
        <Hero setActiveSection={handleNavClick} />
        <WhatWeBuild />
        <Projects onOpenProject={handleOpenProject} />
        <Podcast />
        <Studio />
        <Contact />
      </main>
      <ProjectModal project={selectedProject} onClose={handleCloseProject} />
    </div>
  );
}

export default App;
