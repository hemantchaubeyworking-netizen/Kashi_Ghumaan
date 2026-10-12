import React, { useState, useEffect, useRef } from 'react';

/* ── Toast Notification Component ── */
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="toast-notification animate-slide-right">
      <span className="toast-icon">✅</span>
      <span className="toast-text">{message}</span>
    </div>
  );
}

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton" style={{ height: 210, borderRadius: 0 }} />
      <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
        <div className="skeleton mb-3" style={{ height: 18, width: '70%' }} />
        <div className="skeleton mb-2" style={{ height: 14, width: '90%' }} />
        <div className="skeleton" style={{ height: 42, borderRadius: 100 }} />
      </div>
    </div>
  );
}

/* ── Shop list stub data (used while backend loads or as fallback) ── */
const STUB_SHOPS = [
  {
    id: 1,
    name: 'Kashi Chat Bhandar',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    tag: 'Iconic since 1950s',
    meta: 'Chaat • Golgappa • Tikki',
    menu: [
      { id: 101, name: 'Tamatar Chaat', price: 40 },
      { id: 102, name: 'Aloo Tikki',   price: 30 },
      { id: 103, name: 'Golgappa (8pc)', price: 20 },
      { id: 104, name: 'Dahi Puri',    price: 50 },
    ],
  },
  {
    id: 2,
    name: 'Blue Lassi Shop',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    tag: '200+ Flavors',
    meta: 'Lassi • Shakes • Thandai',
    menu: [
      { id: 201, name: 'Rose Lassi',    price: 80 },
      { id: 202, name: 'Mango Lassi',   price: 90 },
      { id: 203, name: 'Oreo Lassi',    price: 100 },
      { id: 204, name: 'Thandai',       price: 70 },
    ],
  },
  {
    id: 3,
    name: 'Kachori Gali',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    tag: 'Open 5 AM – 12 PM',
    meta: 'Kachori • Puri Sabzi • Jalebi',
    menu: [
      { id: 301, name: 'Kachori Sabzi',   price: 40 },
      { id: 302, name: 'Puri Sabzi',       price: 35 },
      { id: 303, name: 'Jalebi (250g)',    price: 60 },
      { id: 304, name: 'Malpua',           price: 50 },
    ],
  },
  {
    id: 4,
    name: 'Ram Bhandar Sweets',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80',
    tag: 'Heritage Sweets',
    meta: 'Mithais • Peda • Rabri',
    menu: [
      { id: 401, name: 'Banarasi Peda',     price: 120 },
      { id: 402, name: 'Rabri',             price: 80 },
      { id: 403, name: 'Gulab Jamun (4pc)', price: 50 },
      { id: 404, name: 'Malaiyo',           price: 60 },
    ],
  },
];

function Shop() {
  const [shops, setShops]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeShop, setActiveShop]   = useState(null);
  const [cart, setCart]               = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast]             = useState(null);
  const menuRef = useRef(null);

  /* ── Fetch shops from backend, fallback to stub ── */
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/shops')
      .then(res => res.json())
      .then(data => {
        setShops(data.length ? data : STUB_SHOPS);
        setLoading(false);
      })
      .catch(() => {
        setShops(STUB_SHOPS); // graceful fallback
        setLoading(false);
      });
  }, []);

  /* ── Cart Logic ── */
  const addToCart = (item, shopName) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.id === item.id);
      if (existing) {
        return prev.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { ...item, shopName, quantity: 1 }];
    });
    setToast(`${item.name} added to cart!`);
  };

  const updateQuantity = (itemId, change) => {
    setCart(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  /* ── Search Filter ── */
  const filteredShops = shops.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ── Open shop & scroll to menu ── */
  const openShop = (shop) => {
    setActiveShop(shop);
    setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="container mt-4 mb-5" style={{ paddingTop: '1rem' }}>
      <div className="row g-4">

        {/* ════════════════════════════════════════
            LEFT: Shops & Menu
        ══════════════════════════════════════════ */}
        <div className="col-lg-8" ref={menuRef}>

          {!activeShop ? (
            /* ── SHOP LIST VIEW ── */
            <>
              <div
                className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 animate-fade-down"
              >
                <div>
                  <span className="section-label d-block mb-1">Varanasi's Best</span>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#f0f6fc', margin: 0 }}>
                    Heritage Shops
                  </h2>
                </div>
                <div className="search-input-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    id="shop-search-input"
                    type="text"
                    className="search-input"
                    placeholder="Search shops..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <div className="row g-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="col-md-6">
                      <SkeletonCard />
                    </div>
                  ))}
                </div>
              ) : filteredShops.length === 0 ? (
                <div className="text-center py-5 animate-scale-in">
                  <div style={{ fontSize: '3rem', opacity: 0.4, marginBottom: 16 }}>🔍</div>
                  <h5 style={{ color: 'rgba(240,246,252,0.55)' }}>No shops found matching "{searchQuery}"</h5>
                  <button
                    className="btn-back mt-3"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredShops.map((shop, i) => (
                    <div
                      key={shop.id}
                      className={`col-md-6 animate-fade-up delay-${Math.min(i + 1, 6)}`}
                    >
                      <div className="shop-card h-100" onClick={() => openShop(shop)}>
                        <div className="shop-card-img-wrapper">
                          <img src={shop.image} alt={shop.name} />
                          <div className="shop-card-overlay" />
                          {shop.tag && (
                            <span className="shop-card-badge">{shop.tag}</span>
                          )}
                        </div>
                        <div className="shop-card-body">
                          <h5 className="shop-card-title">{shop.name}</h5>
                          {shop.meta && (
                            <div className="shop-card-meta">
                              <span>🍽️ {shop.meta}</span>
                              <span>⭐ 4.8</span>
                            </div>
                          )}
                          <button id={`view-menu-${shop.id}`} className="btn-view-menu">
                            View Menu 🍽️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* ── MENU VIEW ── */
            <div className="animate-scale-in">
              <button
                id="back-to-shops-btn"
                className="btn-back mb-4"
                onClick={() => setActiveShop(null)}
              >
                ← Back to Shops
              </button>

              {/* Shop detail hero */}
              <div className="shop-detail-hero mb-4">
                <img src={activeShop.image} alt={activeShop.name} />
                <div className="shop-detail-hero-overlay" />
                <div className="shop-detail-info">
                  {activeShop.tag && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        color: '#ffc107',
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      {activeShop.tag}
                    </span>
                  )}
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      color: '#fff',
                      margin: 0,
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    {activeShop.name}
                  </h2>
                </div>
              </div>

              {/* Menu items */}
              <div
                style={{
                  background: 'rgba(22,27,34,0.8)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20,
                  padding: '1.5rem',
                }}
              >
                <h4
                  style={{
                    fontWeight: 700,
                    color: '#f0f6fc',
                    marginBottom: '1.25rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  Menu
                </h4>

                {activeShop.menu.map((item, i) => (
                  <div
                    key={item.id}
                    className="menu-item"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <div>
                      <div className="menu-item-name">{item.name}</div>
                      {item.desc && (
                        <div className="menu-item-desc">{item.desc}</div>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-3 ms-3">
                      <span className="menu-item-price">₹{item.price}</span>
                      <button
                        id={`add-item-${item.id}`}
                        className="btn-add-item"
                        onClick={() => addToCart(item, activeShop.name)}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════
            RIGHT: Cart Panel
        ══════════════════════════════════════════ */}
        <div className="col-lg-4">
          <div className="cart-panel">
            {/* Header */}
            <div className="cart-header">
              <div className="cart-header-title">
                🛒 Your Cart
                <span className="cart-count-badge" key={totalItems}
                  style={{ animation: totalItems > 0 ? 'badge-pop 0.35s ease' : 'none' }}
                >
                  {totalItems}
                </span>
              </div>
              {cart.length > 0 && (
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(240,246,252,0.4)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                  onClick={() => setCart([])}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Empty state */}
            {cart.length === 0 ? (
              <div className="cart-empty">
                <span className="cart-empty-icon">🧺</span>
                <p style={{ fontWeight: 600, marginBottom: 6, color: 'rgba(240,246,252,0.7)' }}>
                  Your cart is empty
                </p>
                <small>Add some heritage flavors from the menu!</small>
              </div>
            ) : (
              <>
                {/* Items */}
                <div style={{ maxHeight: 380, overflowY: 'auto' }}>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-shop">{item.shopName}</div>
                        </div>
                        <button
                          className="btn-remove"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove"
                        >
                          ×
                        </button>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <span className="cart-item-price">₹{item.price * item.quantity}</span>
                        <div className="qty-control">
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            −
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="cart-footer">
                  <div className="cart-total-row">
                    <span className="cart-total-label">Total</span>
                    <span className="cart-total-amount">₹{getTotal()}</span>
                  </div>
                  <button id="checkout-btn" className="btn-checkout">
                    Checkout Now →
                  </button>
                  <p
                    style={{
                      fontSize: '0.72rem',
                      color: 'rgba(240,246,252,0.35)',
                      textAlign: 'center',
                      margin: '0.75rem 0 0',
                    }}
                  >
                    Free delivery on orders above ₹299
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast} onDone={() => setToast(null)} />
      )}
    </div>
  );
}

export default Shop;