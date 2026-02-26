import React, { useState, useEffect } from 'react';
import { ShoppingCart, Home, Box, Menu, X, CheckCircle, ChevronDown, ChevronRight, AlertCircle, Trash2, User, LogIn, UserPlus, LogOut } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Quantum Watch', price: 299, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id: 2, name: 'Nebula Sounds', price: 159, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 3, name: 'Nova Camera', price: 899, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop' }, // Fixed image URL
  { id: 4, name: 'Lumina Lamp', price: 79, image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=400&fit=crop' },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(null);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [showPostAddToCart, setShowPostAddToCart] = useState(false);

  // Auth state
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [authError, setAuthError] = useState('');

  const addToCart = (product) => {
    const newItem = { ...product, cartId: Date.now() };
    setCart([...cart, newItem]);
    setLastAddedItem(product);
    setShowPostAddToCart(true);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (authForm.email && authForm.password) {
      setUser({ email: authForm.email, name: authForm.email.split('@')[0] });
      setCurrentPage('home');
      setAuthError('');
    } else {
      setAuthError('Please enter valid credentials');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (authForm.email && authForm.password && authForm.name) {
      setUser({ email: authForm.email, name: authForm.name });
      setCurrentPage('home');
      setAuthError('');
    } else {
      setAuthError('Please fill in all fields');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="container">
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '10px' }}>Future Store</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Experience the next generation of e-commerce components.</p>

            <div className="product-grid">
              {PRODUCTS.map(product => (
                <div key={product.id} className="product-card glass-morphism">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3 id={`product-name-${product.id}`}>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  <button
                    id={`add-to-cart-${product.id}`}
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {showPostAddToCart && (
              <div className="modal-overlay" id="post-add-to-cart-overlay">
                <div className="modal glass-morphism" style={{ textAlign: 'center' }}>
                  <CheckCircle size={48} color="var(--success)" style={{ marginBottom: '16px' }} />
                  <h3>Added to Cart!</h3>
                  <p style={{ color: 'var(--text-muted)', margin: '12px 0 24px' }}>
                    {lastAddedItem?.name} has been added to your shopping cart.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button className="btn" onClick={() => setShowPostAddToCart(false)} id="continue-shopping-btn">Continue Shopping</button>
                    <button className="btn btn-primary" onClick={() => { setShowPostAddToCart(false); setCurrentPage('cart'); }} id="view-cart-btn">View Cart & Checkout</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'components':
        return (
          <div className="container">
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Web Component Showcase</h2>

            <section className="showcase-section">
              <h3>1. Accordions</h3>
              <div className="component-box glass-morphism">
                {[1, 2, 3].map(i => (
                  <div key={i} className="accordion-item" id={`accordion-${i}`}>
                    <div
                      className="accordion-header"
                      onClick={() => setAccordionOpen(accordionOpen === i ? null : i)}
                      id={`accordion-header-${i}`}
                    >
                      <span>Item {i}: Advanced Logic Details</span>
                      {accordionOpen === i ? <ChevronDown /> : <ChevronRight />}
                    </div>
                    {accordionOpen === i && (
                      <div className="accordion-content" id={`accordion-content-${i}`}>
                        This is a dynamic accordion component used for displaying collapsible content.
                        It helps in managing vertical space effectively while providing clear user interaction.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="showcase-section">
              <h3>2. Interactive Modals</h3>
              <div className="component-box glass-morphism">
                <button
                  id="open-modal-btn"
                  className="btn btn-primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Trigger Popup Modal
                </button>

                {isModalOpen && (
                  <div className="modal-overlay" id="modal-overlay">
                    <div className="modal glass-morphism" id="modal-content">
                      <h3 style={{ marginBottom: '15px' }}>System Configuration</h3>
                      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                        This modal serves as a demonstration of overlay components with blur effects.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <button className="btn" onClick={() => setIsModalOpen(false)} id="modal-close-btn">Close</button>
                        <button className="btn btn-primary" onClick={() => setIsModalOpen(false)} id="modal-confirm-btn">Confirm</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="showcase-section">
              <h3>3. Dynamic Data Forms</h3>
              <div className="component-box glass-morphism">
                <form id="showcase-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" placeholder="Enter test name" id="form-username" />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select id="form-category">
                      <option>Electronics</option>
                      <option>Mechanical</option>
                      <option>Software</option>
                    </select>
                  </div>
                  <button className="btn btn-primary" id="form-submit-btn">
                    <CheckCircle size={18} /> Submit Data
                  </button>
                </form>
              </div>
            </section>
          </div>
        );

      case 'login':
        return (
          <div className="container" style={{ maxWidth: '400px' }}>
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '30px', textAlign: 'center' }}>Login</h2>
            <div className="glass-morphism" style={{ padding: '32px' }}>
              <form onSubmit={handleLogin} id="login-form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    id="login-email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    id="login-password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  />
                </div>
                {authError && <p style={{ color: 'var(--error)', marginBottom: '16px', fontSize: '0.9rem' }}>{authError}</p>}
                <button className="btn btn-primary" style={{ width: '100%' }} id="login-submit">
                  <LogIn size={18} /> Sign In
                </button>
              </form>
              <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Don't have an account? <a href="#" onClick={() => setCurrentPage('register')} style={{ color: 'var(--primary)', fontWeight: '600' }}>Register</a>
              </p>
            </div>
          </div>
        );

      case 'register':
        return (
          <div className="container" style={{ maxWidth: '400px' }}>
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '30px', textAlign: 'center' }}>Register</h2>
            <div className="glass-morphism" style={{ padding: '32px' }}>
              <form onSubmit={handleRegister} id="register-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    id="register-name"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    id="register-email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    id="register-password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  />
                </div>
                {authError && <p style={{ color: 'var(--error)', marginBottom: '16px', fontSize: '0.9rem' }}>{authError}</p>}
                <button className="btn btn-primary" style={{ width: '100%' }} id="register-submit">
                  <UserPlus size={18} /> Create Account
                </button>
              </form>
              <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Already have an account? <a href="#" onClick={() => setCurrentPage('login')} style={{ color: 'var(--primary)', fontWeight: '600' }}>Login</a>
              </p>
            </div>
          </div>
        );

      case 'cart':
        return (
          <div className="container">
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Your Shopping Cart</h2>
            <div className="glass-morphism" style={{ padding: '24px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }} id="empty-cart-msg">
                  <AlertCircle size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
                  <p>Your cart is empty. Start shopping!</p>
                </div>
              ) : (
                <>
                  <ul style={{ listStyle: 'none' }} id="cart-list">
                    {cart.map(item => (
                      <li key={item.cartId} className="glass-morphism" style={{ padding: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img src={item.image} style={{ width: '60px', height: '60px', borderRadius: '8' }} alt={item.name} />
                        <div style={{ flex: 1 }}>
                          <h4>{item.name}</h4>
                          <p className="price" style={{ fontSize: '1rem' }}>${item.price}</p>
                        </div>
                        <button
                          className="btn"
                          style={{ color: 'var(--error)' }}
                          onClick={() => removeFromCart(item.cartId)}
                          id={`remove-item-${item.cartId}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '24px', textAlign: 'right', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
                    <h3 style={{ marginBottom: '16px' }}>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</h3>
                    <button className="btn btn-primary" id="checkout-btn">Proceed to Checkout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      default:
        return <div>404</div>;
    }
  };

  return (
    <>
      <header>
        <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: '800', cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
            M-STORE
          </div>
          <nav className="nav-links">
            <a href="#" className={currentPage === 'home' ? 'active' : ''} onClick={() => setCurrentPage('home')} id="nav-home">Home</a>
            <a href="#" className={currentPage === 'components' ? 'active' : ''} onClick={() => setCurrentPage('components')} id="nav-components">Components</a>
            <a href="#" className={currentPage === 'cart' ? 'active' : ''} onClick={() => setCurrentPage('cart')} id="nav-cart" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingCart size={18} />
              Cart ({cart.length})
            </a>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px', borderLeft: '1px solid var(--glass-border)', paddingLeft: '12px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '600' }} id="user-display"><User size={16} /> {user.name}</span>
                <button onClick={handleLogout} className="btn" style={{ padding: '6px 12px' }} id="logout-btn"><LogOut size={16} /></button>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                style={{ marginLeft: '12px', padding: '8px 16px' }}
                onClick={() => setCurrentPage('login')}
                id="header-login-btn"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </header>

      <main>
        {renderContent()}
      </main>

      <footer>
        <div className="container">
          <p>© 2026 M-Store Architect. Built for Quality Assurance Demonstration.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
