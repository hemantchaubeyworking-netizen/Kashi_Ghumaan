import React, { useState, useEffect } from 'react';

function Shop() {
  // 1. STATE MANAGEMENT
  const [shops, setShops] = useState([]); // Data ab backend se aayega
  const [activeShop, setActiveShop] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. BACKEND SE DATA MANGWANA (API Call)
  useEffect(() => {
    fetch('http://localhost:5000/api/shops')
      .then((response) => response.json())
      .then((data) => {
        setShops(data); // Backend ka data state me save kiya
      })
      .catch((error) => console.error("API se data laane me error aayi:", error));
  }, []);

  // 3. SMART CART LOGIC
  const addToCart = (item, shopName) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, shopName, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, change) => {
    setCart(cart.map((item) => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // 4. SEARCH LOGIC
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        
        {/* LEFT SIDE: Shops & Menu */}
        <div className="col-lg-8">
          {!activeShop ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0">Explore Heritage Shops</h2>
                <input 
                  type="text" 
                  className="form-control w-50 rounded-pill px-4" 
                  placeholder="🔍 Search for a shop..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {shops.length === 0 ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Backend se dukaane load ho rahi hain...</p>
                </div>
              ) : filteredShops.length === 0 ? (
                <p className="text-muted text-center py-5 fs-5">No shops found matching your search.</p>
              ) : (
                <div className="row g-4">
                  {filteredShops.map(shop => (
                    <div className="col-md-6" key={shop.id}>
                      <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden custom-card">
                        <img src={shop.image} className="card-img-top" alt={shop.name} style={{ height: '200px', objectFit: 'cover' }} />
                        <div className="card-body text-center p-4">
                          <h5 className="fw-bold mb-3">{shop.name}</h5>
                          <button className="btn btn-warning w-100 rounded-pill fw-bold" onClick={() => setActiveShop(shop)}>
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
            <>
              <button className="btn btn-outline-secondary mb-4 rounded-pill px-4" onClick={() => setActiveShop(null)}>
                ← Back to All Shops
              </button>
              <div className="card shadow-sm border-0 rounded-4 mb-4 overflow-hidden">
                <img src={activeShop.image} className="card-img-top" alt={activeShop.name} style={{ height: '250px', objectFit: 'cover' }} />
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-4">{activeShop.name} Menu</h2>
                  <ul className="list-group list-group-flush">
                    {activeShop.menu.map(item => (
                      <li className="list-group-item d-flex justify-content-between align-items-center py-3 px-0 border-bottom" key={item.id}>
                        <div>
                          <h5 className="mb-1 fw-bold text-dark">{item.name}</h5>
                          <span className="text-success fw-bold fs-5">₹{item.price}</span>
                        </div>
                        <button className="btn btn-dark rounded-pill px-4 fw-bold" onClick={() => addToCart(item, activeShop.name)}>
                          + Add
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT SIDE: Live Cart */}
        <div className="col-lg-4 mt-5 mt-lg-0">
          <div className="card shadow border-0 rounded-4 sticky-top" style={{ top: '20px' }}>
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4 d-flex align-items-center justify-content-between">
                <span>🛒 Your Cart</span>
                <span className="badge bg-warning text-dark rounded-pill fs-6">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </h4>
              
              {cart.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <p className="mb-0 fs-5">Your cart is empty.</p>
                  <small>Add some heritage flavors!</small>
                </div>
              ) : (
                <>
                  <ul className="list-group list-group-flush mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {cart.map((item) => (
                      <li className="list-group-item d-flex flex-column px-0 py-3 border-bottom" key={item.id}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <p className="mb-0 fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{item.name}</p>
                            <small className="text-muted" style={{ fontSize: '0.8rem' }}>{item.shopName}</small>
                          </div>
                          <button className="btn btn-sm text-danger p-0 m-0 fw-bold fs-5" onClick={() => removeFromCart(item.id)}>×</button>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mt-1">
                          <span className="fw-bold text-success fs-5">₹{item.price * item.quantity}</span>
                          <div className="d-flex align-items-center gap-3 border rounded-pill px-2 py-1">
                            <button className="btn btn-sm text-secondary p-0 fw-bold fs-5" style={{ width: '24px' }} onClick={() => updateQuantity(item.id, -1)}>-</button>
                            <span className="fw-bold">{item.quantity}</span>
                            <button className="btn btn-sm text-secondary p-0 fw-bold fs-5" style={{ width: '24px' }} onClick={() => updateQuantity(item.id, 1)}>+</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="d-flex justify-content-between align-items-center mb-4 pt-3 border-top">
                    <span className="fs-5 fw-bold text-secondary">Total Amount:</span>
                    <span className="fs-3 fw-bold text-dark">₹{getTotal()}</span>
                  </div>
                  <button className="btn btn-warning w-100 py-3 rounded-pill fw-bold fs-5 shadow-sm" style={{ color: '#11141a' }}>
                    Checkout Now →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Shop;