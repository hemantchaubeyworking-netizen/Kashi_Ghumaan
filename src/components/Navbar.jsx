import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-dark py-3" style={{ backgroundColor: '#11141a', borderBottom: '2px solid #ffc107' }}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold text-warning fs-4" style={{ textDecoration: 'none' }}>
          Taste of Varanasi
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;