import React, { useState, useEffect } from 'react';
import './App.css';

// Logo component
const Logo = () => (
  <div className="logo">
    <img src="/quantide_logo.jpg" alt="Quantide" className="logo-img" />
  </div>
);

// Navigation Component
const Navbar = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sections = ['studio', 'work', 'podcast', 'contact'];

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
        <button className="btn-outlined btn-book-call">BOOK A CALL</button>
        <div className="social-icons">
          <a href="https://x.com/quantide" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://github.com/quantide" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/company/quantide" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <button
          className="hamburger-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {sections.map(section => (
            <button
              key={section}
              className={`mobile-nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => handleNavClick(section)}
            >
              {section.toUpperCase()}
            </button>
          ))}
          <div className="mobile-menu-footer">
            <button className="btn-primary mobile-cta">BOOK A CALL</button>
            <div className="mobile-social-icons">
              <a href="https://x.com/quantide" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com/quantide" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/quantide" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
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
          image: '/breadcrumb_screenshot.jpg'
        }
      ].map((project, i) => (
        <div key={project.id} className="project-card" onClick={() => onOpenProject(project)}>
          <div className="project-preview">
            <img src={project.image} alt={`${project.name} screenshot`} className="project-image" />
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
            <img src={project.image} alt={`${project.name} interface`} className="modal-image" />
          </div>
        </div>
        <div className="modal-summary">
          <div className="summary-grid">
            <div><span className="label">TYPE</span><span>{project.type}</span></div>
            <div><span className="label">ROLE</span><span>{project.role}</span></div>
            <div><span className="label">STACK</span><span>{project.stack}</span></div>
            <div><span className="label">STATUS</span><span>{project.status}</span></div>
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
