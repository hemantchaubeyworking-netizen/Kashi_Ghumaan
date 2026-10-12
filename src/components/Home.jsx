import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* Animated counter hook */
function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const categories = [
  { emoji: '🥞', label: 'Morning Kachori', gradient: 'rgba(255,193,7,0.12)' },
  { emoji: '🍹', label: 'Thick Fruit Lassi', gradient: 'rgba(99,207,255,0.12)' },
  { emoji: '🍢', label: 'Banarasi Chaat', gradient: 'rgba(255,100,100,0.12)' },
  { emoji: '🍮', label: 'Malaiyo', gradient: 'rgba(255,200,80,0.12)' },
  { emoji: '🧁', label: 'Thandai', gradient: 'rgba(180,100,255,0.12)' },
  { emoji: '🫙', label: 'Tamatar Chaat', gradient: 'rgba(255,140,60,0.12)' },
];

const featuredItems = [
  {
    name: 'Kashi Chat Bhandar',
    tag: 'Iconic since 1950s',
    desc: 'Home of the legendary tamatar chaat & aloo tikki.',
    emoji: '🍢',
    delay: 'delay-1',
  },
  {
    name: 'Blue Lassi Shop',
    tag: '200+ flavors',
    desc: 'Thick, creamy lassi with seasonal fruit toppings.',
    emoji: '🍹',
    delay: 'delay-2',
  },
  {
    name: 'Kachori Gali',
    tag: 'Open 5 AM – 12 PM',
    desc: 'Freshly fried kachori with sabzi & imli chutney.',
    emoji: '🥞',
    delay: 'delay-3',
  },
];

function Home() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const shops    = useCountUp(48, 1600, statsVisible);
  const orders   = useCountUp(12400, 1800, statsVisible);
  const heritage = useCountUp(150, 1400, statsVisible);

  // Intersection Observer for stats animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className="hero-section" ref={heroRef}>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>

          {/* Badge */}
          <div className="animate-fade-up">
            <span className="hero-badge">
              <span>🪔</span>
              Varanasi's Culinary Heritage
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title my-4 animate-fade-up delay-1">
            Taste the <span className="gold-word">Legend,</span>
            <br />Without the Distance
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle animate-fade-up delay-2">
            Explore and order authentic, legendary flavors from the city's most trusted
            heritage culinary spots — delivered fresh to your door.
          </p>

          {/* CTA Buttons */}
          <div className="d-flex justify-content-center gap-3 flex-wrap mt-4 animate-fade-up delay-3">
            <Link
              to="/shop"
              id="hero-explore-btn"
              className="btn-hero-primary text-decoration-none"
            >
              Explore All Shops →
            </Link>
            <a
              href="#how-it-works"
              className="btn-hero-secondary text-decoration-none"
            >
              How It Works
            </a>
          </div>

          {/* Stats Bar */}
          <div
            ref={statsRef}
            className="stats-bar mt-5 animate-fade-up delay-4 mx-auto"
            style={{ maxWidth: 560 }}
          >
            <div className="stat-item">
              <span className="stat-number">{shops}+</span>
              <span className="stat-label">Heritage Shops</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">{orders.toLocaleString()}+</span>
              <span className="stat-label">Orders Delivered</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">{heritage}+</span>
              <span className="stat-label">Years of Heritage</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CATEGORY PILLS
      ══════════════════════════════════════════════ */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4 animate-fade-up">
            <span className="section-label mb-2 d-block">Browse by Craving</span>
            <h2 className="section-title">What Are You Craving Today?</h2>
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.label}
                to="/shop"
                className={`category-pill animate-fade-up delay-${i + 1} text-decoration-none`}
                style={{ background: cat.gradient }}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED SPOTS
      ══════════════════════════════════════════════ */}
      <section className="py-5" id="how-it-works">
        <div className="container">
          <div className="text-center mb-5 animate-fade-up">
            <span className="section-label mb-2 d-block">Handpicked for You</span>
            <h2 className="section-title">Featured Heritage Spots</h2>
          </div>

          <div className="row g-4">
            {featuredItems.map((item, i) => (
              <div key={item.name} className="col-md-4">
                <Link
                  to="/shop"
                  className={`text-decoration-none d-block h-100 animate-fade-up ${item.delay}`}
                >
                  <div
                    className="h-100 p-4 rounded-4"
                    style={{
                      background: 'rgba(22,27,34,0.8)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.borderColor = 'rgba(255,193,7,0.35)';
                      e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.emoji}</div>
                    <div
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: '#ffc107',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.tag}
                    </div>
                    <h4 style={{ color: '#f0f6fc', fontWeight: 700, marginBottom: '0.75rem' }}>
                      {item.name}
                    </h4>
                    <p style={{ color: 'rgba(240,246,252,0.55)', fontSize: '0.88rem', margin: 0 }}>
                      {item.desc}
                    </p>
                    <div
                      style={{
                        marginTop: '1.25rem',
                        color: '#ffc107',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      View Menu <span style={{ transition: 'transform 0.2s' }}>→</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, rgba(255,193,7,0.06) 0%, rgba(13,17,23,0) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="container">
          <div className="text-center mb-5 animate-fade-up">
            <span className="section-label mb-2 d-block">Simple & Easy</span>
            <h2 className="section-title">How It Works</h2>
          </div>

          <div className="row g-4 text-center">
            {[
              { step: '01', icon: '🔍', title: 'Browse Shops', desc: 'Explore curated heritage shops from Varanasi\'s iconic lanes.' },
              { step: '02', icon: '🛒', title: 'Add to Cart', desc: 'Pick your favorite dishes and add them to your cart.' },
              { step: '03', icon: '🚀', title: 'Fast Delivery', desc: 'Authentic flavors delivered fresh right to your doorstep.' },
            ].map((step, i) => (
              <div key={step.step} className={`col-md-4 animate-fade-up delay-${i + 1}`}>
                <div
                  className="p-4 rounded-4"
                  style={{
                    background: 'rgba(22,27,34,0.6)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'rgba(255,193,7,0.12)',
                      border: '1px solid rgba(255,193,7,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      margin: '0 auto 1rem',
                    }}
                  >
                    {step.icon}
                  </div>
                  <div style={{ color: '#ffc107', fontSize: '0.7rem', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
                    STEP {step.step}
                  </div>
                  <h5 style={{ color: '#f0f6fc', fontWeight: 700, marginBottom: 8 }}>{step.title}</h5>
                  <p style={{ color: 'rgba(240,246,252,0.55)', fontSize: '0.88rem', margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="tov-footer">
        <div className="container">
          <div className="mb-2">
            <span className="footer-brand">🪔 Taste of Varanasi</span>
          </div>
          <p className="mb-0">© 2026 Taste of Varanasi · Premium Heritage Delivery · Made with ❤️ in Banaras</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;