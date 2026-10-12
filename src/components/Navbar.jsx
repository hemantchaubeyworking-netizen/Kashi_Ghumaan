import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // Scroll detection for glassmorphism effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/',      label: 'Home',   emoji: '🏠' },
    { to: '/shop',  label: 'Shop',   emoji: '🍽️' },
  ];

  return (
    <nav className={`tov-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container d-flex align-items-center justify-content-between py-2">

        {/* Brand */}
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <span style={{ fontSize: '1.6rem', filter: 'drop-shadow(0 2px 8px rgba(255,193,7,0.5))' }}>🪔</span>
          <span className="navbar-brand-text">Taste of Varanasi</span>
        </Link>

        {/* Nav Links */}
        <div className="d-flex align-items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link-custom ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Cart icon — decorative */}
          <div className="ms-2 position-relative">
            <button
              id="navbar-cart-btn"
              className="btn d-flex align-items-center gap-2 rounded-pill px-3 py-2"
              style={{
                background: 'rgba(255,193,7,0.1)',
                border: '1px solid rgba(255,193,7,0.3)',
                color: '#ffc107',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
              onClick={() => {
                const shopSection = document.querySelector('.cart-panel');
                shopSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              🛒 Cart
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;