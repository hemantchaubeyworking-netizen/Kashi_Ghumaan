import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Banner - Overlap & Spacing Fixed */}
      <div className="text-center d-flex align-items-center justify-content-center" style={{
        background: "linear-gradient(rgba(17, 20, 26, 0.85), rgba(26, 32, 44, 0.95)), url('https://images.unsplash.com/photo-1561361531-99e224e97962?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "60vh", /* Isse background image ko badi screen par poora space milega */
        color: "white",
        padding: "60px 20px",
        borderBottomLeftRadius: "32px",
        borderBottomRightRadius: "32px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        marginBottom: "40px"
      }}>
        {/* Container me Flexbox aur Gap lagaya taaki element ek dusre par na chadhe */}
        <div className="container d-flex flex-column align-items-center gap-3">
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
            Varanasi's Culinary Heritage
          </span>
          
          <h1 className="display-4 fw-bold text-white m-0">
            Taste the Legend, Without the Distance
          </h1>
          
          <p className="fs-5 text-white-50 mx-auto m-0" style={{ maxWidth: "600px", lineHeight: "1.6" }}>
            Explore and order authentic, legendary flavors from the city's most trusted heritage culinary spots.
          </p>
          
          <Link to="/shop" className="btn btn-warning btn-lg px-5 py-3 shadow-sm fw-bold mt-3" style={{ borderRadius: "8px", color: "#11141a" }}>
            Explore All Heritage Shops →
          </Link>
        </div>
      </div>

      {/* Category Selection Row */}
      <div className="container mt-5">
        <div className="text-center mb-4">
          <p className="text-muted small text-uppercase fw-bold mb-2">What are you craving today?</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/shop" className="btn btn-outline-secondary rounded-pill px-4 fw-medium">🥞 Morning Kachori</Link>
            <Link to="/shop" className="btn btn-outline-secondary rounded-pill px-4 fw-medium">🍹 Thick Fruit Lassi</Link>
            <Link to="/shop" className="btn btn-outline-secondary rounded-pill px-4 fw-medium">🍢 Banarasi Chaat</Link>
          </div>
        </div>
      </div>
      
      <hr className="container my-5 opacity-25" />
      
      {/* Footer */}
      <footer className="bg-dark text-white-50 text-center p-4 mt-5 border-top border-secondary">
        <div className="container">
          <p className="m-0 small">© 2026 Taste of Varanasi • Premium Heritage Delivery App</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;