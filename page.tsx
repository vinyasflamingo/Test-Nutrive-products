 "use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Leaf, Minus, Plus, ShoppingBag, X } from "lucide-react";

type Product = {
  id: string;
  name: string;
  flavor: string;
  description: string;
  price: number;
  color: string;
  accent: string;
  number: string;
  notes: string[];
};

const products: Product[] = [
  {
    id: "dark",
    name: "Dark Chocolate",
    flavor: "The bold one",
    description: "A rich, bittersweet chocolate dip for a beautifully balanced bite.",
    price: 399,
    color: "#24130e",
    accent: "#b8783c",
    number: "01",
    notes: ["Deep cocoa notes", "Rich chocolate finish", "20 bites per pack"],
  },
  {
    id: "white",
    name: "White Chocolate",
    flavor: "The mellow one",
    description: "A creamy, delicate white chocolate dip with a smooth finish.",
    price: 399,
    color: "#e9d7ad",
    accent: "#b9945b",
    number: "02",
    notes: ["Creamy and mellow", "Silky sweet finish", "20 bites per pack"],
  },
  {
    id: "milk",
    name: "Milk Chocolate",
    flavor: "The classic one",
    description: "A familiar, velvety milk chocolate dip made for everyday moments.",
    price: 399,
    color: "#80502e",
    accent: "#d3a16b",
    number: "03",
    notes: ["Smooth cocoa taste", "A classic chocolate dip", "20 bites per pack"],
  },
];

type CartLine = { id: string; quantity: number };

function money(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function ProductArtwork({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`product-art ${large ? "product-art-large" : ""}`} style={{ "--choco": product.color, "--accent": product.accent } as React.CSSProperties}>
      <div className="art-glow" />
      <div className="art-leaf leaf-one">✦</div>
      <div className="art-leaf leaf-two">✧</div>
      <div className="bite bite-a"><span /></div>
      <div className="bite bite-b"><span /></div>
      <div className="bite bite-c"><span /></div>
      <div className="pack">
        <div className="pack-topline"><span>NUTRIVÉ</span><span>EST. IN NATURE</span></div>
        <div className="pack-brand">Nutri<span>vé.</span></div>
        <div className="pack-rule" />
        <div className="pack-title">NUTRITIOUS<br />BITES</div>
        <div className="pack-dip">DIPPED IN {product.name.toUpperCase()}</div>
        <div className="pack-bottom">
          <span>20 BITES</span>
          <span className="pack-seal">N</span>
        </div>
      </div>
      <div className="art-caption">NATURE’S FINEST. NOTHING ELSE.</div>
    </div>
  );
}

export default function Home() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [notice, setNotice] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = useMemo(() => cart.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.id);
    return sum + (product?.price ?? 0) * line.quantity;
  }, 0), [cart]);

  function addToCart(id: string) {
    setCart((current) => {
      const existing = current.find((line) => line.id === id);
      return existing
        ? current.map((line) => line.id === id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { id, quantity: 1 }];
    });
    const product = products.find((item) => item.id === id);
    setNotice(`${product?.name ?? "Product"} added to your bag`);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => current
      .map((line) => line.id === id ? { ...line, quantity: line.quantity + delta } : line)
      .filter((line) => line.quantity > 0));
  }

  function openCheckout() {
    setCartOpen(false);
    setCheckoutOpen(true);
    setOrderPlaced(false);
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="NutriVé home">Nutri<span>vé.</span></a>
        <nav className="main-nav">
          <a className="nav-active" href="#home">Home</a>
          <a href="#ingredients">Our ingredients</a>
          <a href="#philosophy">Our philosophy</a>
        </nav>
        <button className="header-shop" onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}>
          Explore the goodness <ArrowUpRight size={17} />
        </button>
        <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${cartCount} items`}>
          <ShoppingBag size={20} /><span>Bag</span><b>{cartCount}</b>
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-vignette" />
        <div className="hero-sparks"><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="hero-copy">
          <div className="eyebrow"><span /> NATURE’S FINEST. NOTHING ELSE. <span /></div>
          <h1>Nutri<span>vé</span></h1>
          <p className="hero-tagline">NUTRITION THAT TASTES LIKE A TREAT</p>
          <div className="ornament"><span />◆<span /></div>
          <p className="hero-description">Crafted with nature&apos;s finest ingredients,<br />for your everyday energy.</p>
          <a className="scroll-cue" href="#shop" aria-label="Scroll to shop"><ArrowDown size={20} /></a>
          <p className="scroll-label">SCROLL TO DISCOVER</p>
        </div>
        <div className="hero-bottom">
          <div><span>01</span><i /> Welcome</div>
          <p>A LITTLE CLOSER TO NATURE</p>
          <a href="#shop">Meet our bites <ArrowDown size={15} /></a>
        </div>
      </section>

      <section className="intro-strip" id="ingredients">
        <div className="intro-icon"><Leaf size={18} /></div>
        <p>Thoughtfully crafted bites. A little moment of goodness in every pack.</p>
        <span>MADE FOR YOUR EVERYDAY</span>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow small-eyebrow">THE NUTRIVÉ COLLECTION</p>
            <h2>A little bite.<br /><em>A lot of goodness.</em></h2>
          </div>
          <p className="section-note">Three delicious chocolate dips.<br />Twenty little moments in every pack.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <button className="product-visual-button" onClick={() => setActiveProduct(product)} aria-label={`View ${product.name} Nutritious Bites`}>
                <ProductArtwork product={product} />
                <span className="visual-open"><ArrowUpRight size={17} /></span>
                <span className="product-number">{product.number} / 03</span>
              </button>
              <div className="product-card-info">
                <div className="product-meta"><span>{product.flavor}</span><span>20 BITES</span></div>
                <button className="product-name" onClick={() => setActiveProduct(product)}>{product.name} Dip</button>
                <p>{product.description}</p>
                <div className="product-buy-row">
                  <strong>{money(product.price)}</strong>
                  <button className="add-button" onClick={() => addToCart(product.id)}><Plus size={15} /> Add to bag</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="price-note">Introductory placeholder pricing · Update prices before launch</p>
      </section>

      <section className="philosophy" id="philosophy">
        <div className="philosophy-mark">N.</div>
        <p className="eyebrow small-eyebrow">OUR PHILOSOPHY</p>
        <h2>Goodness should<br /><em>feel this good.</em></h2>
        <p>Small bites, considered ingredients, and chocolate-dipped moments made to bring a little joy to your everyday.</p>
        <a href="#shop">Find your favourite <ArrowRight size={16} /></a>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#home">Nutri<span>vé.</span></a>
        <p>Nature’s finest. Nothing else.</p>
        <span>© 2026 NUTRIVÉ · MADE FOR EVERYDAY GOODNESS</span>
      </footer>

      {notice && <div className="toast"><Check size={16} /> {notice} <button onClick={() => setCartOpen(true)}>View bag</button></div>}

      {activeProduct && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveProduct(null); }}>
          <div className="product-modal">
            <button className="icon-close" onClick={() => setActiveProduct(null)} aria-label="Close product details"><X /></button>
            <ProductArtwork product={activeProduct} large />
            <div className="modal-copy">
              <p className="eyebrow small-eyebrow">{activeProduct.flavor}</p>
              <h2>{activeProduct.name}<br /><em>Nutritious Bites</em></h2>
              <p>{activeProduct.description}</p>
              <ul>{activeProduct.notes.map((note) => <li key={note}><Leaf size={14} /> {note}</li>)}</ul>
              <div className="modal-price">{money(activeProduct.price)} <span>/ packet</span></div>
              <button className="gold-button" onClick={() => { addToCart(activeProduct.id); setActiveProduct(null); }}>Add to bag <ArrowRight size={17} /></button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <aside className="cart-drawer">
            <div className="drawer-header"><div><p className="eyebrow small-eyebrow">YOUR SELECTION</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-close" onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
            {cart.length === 0 ? (
              <div className="empty-cart"><ShoppingBag size={32} /><h3>Your bag is waiting.</h3><p>Find a little goodness to make your day.</p><button className="gold-button" onClick={() => { setCartOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the collection <ArrowRight size={16} /></button></div>
            ) : (
              <>
                <div className="cart-lines">
                  {cart.map((line) => {
                    const product = products.find((item) => item.id === line.id)!;
                    return <div className="cart-line" key={line.id}>
                      <div className="cart-thumb"><ProductArtwork product={product} /></div>
                      <div className="cart-line-copy"><h3>{product.name} Dip</h3><p>20 nutritious bites · 1 packet</p><strong>{money(product.price * line.quantity)}</strong><div className="quantity-control"><button onClick={() => changeQuantity(line.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{line.quantity}</span><button onClick={() => changeQuantity(line.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div>
                      <button className="remove-line" onClick={() => setCart((current) => current.filter((item) => item.id !== line.id))}>Remove</button>
                    </div>;
                  })}
                </div>
                <div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes are calculated at checkout.</p><button className="gold-button full-button" onClick={openCheckout}>Continue to checkout <ArrowRight size={17} /></button><button className="text-button" onClick={() => setCartOpen(false)}>Continue shopping</button></div>
              </>
            )}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div className="checkout-screen">
          <header className="checkout-header"><button className="back-link" onClick={() => { setCheckoutOpen(false); setCartOpen(true); }}>← Back to bag</button><a className="wordmark" href="#home">Nutri<span>vé.</span></a><span className="secure-note">SECURE CHECKOUT · DEMO</span></header>
          <div className="checkout-layout">
            <div className="checkout-form-column">
              {orderPlaced ? (
                <div className="order-success"><div className="success-icon"><Check size={28} /></div><p className="eyebrow small-eyebrow">THANK YOU</p><h1>Your goodness<br /><em>is on its way.</em></h1><p>This is a demo checkout. No payment has been taken and no order has been sent.</p><button className="gold-button" onClick={() => { setCheckoutOpen(false); setCart([]); setOrderPlaced(false); }}>Back to NutriVé <ArrowRight size={16} /></button></div>
              ) : (
                <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setOrderPlaced(true); }}>
                  <p className="eyebrow small-eyebrow">JUST A FEW DETAILS</p><h1>Checkout</h1>
                  <label>Email address<input type="email" placeholder="you@example.com" required /></label>
                  <div className="form-section-title"><h2>Delivery details</h2><span>Where should we send your goodness?</span></div>
                  <div className="form-two"><label>First name<input placeholder="First name" required /></label><label>Last name<input placeholder="Last name" required /></label></div>
                  <label>Address<input placeholder="House number and street" required /></label>
                  <label>Apartment, suite, etc. <span className="optional">(optional)</span><input placeholder="Apartment, floor, landmark" /></label>
                  <div className="form-three"><label>City<input placeholder="City" required /></label><label>State<input placeholder="State" required /></label><label>PIN code<input inputMode="numeric" pattern="[0-9]{6}" placeholder="6-digit PIN" required /></label></div>
                  <label>Phone number<input type="tel" inputMode="tel" placeholder="+91" required /></label>
                  <div className="form-section-title payment-title"><h2>Payment</h2><span>Choose how you&apos;d like to pay.</span></div>
                  <div className="payment-demo"><div className="payment-radio"><span className="radio-dot" /><div><strong>Online payment</strong><p>UPI, cards and net banking</p></div><span className="payment-label">COMING SOON</span></div><div className="payment-radio"><span className="radio-ring" /><div><strong>Cash on delivery</strong><p>Pay when your order arrives</p></div></div><p className="demo-warning">Demo only: payment processing and order submission are not connected yet.</p></div>
                  <button className="gold-button full-button place-order" type="submit">Place demo order <ArrowRight size={17} /></button>
                  <p className="terms-note">By continuing, you agree to our store terms and privacy policy.</p>
                </form>
              )}
            </div>
            {!orderPlaced && <aside className="checkout-summary"><p className="eyebrow small-eyebrow">YOUR GOODNESS</p><h2>Order summary</h2><div className="checkout-items">{cart.map((line) => { const product = products.find((item) => item.id === line.id)!; return <div className="checkout-item" key={line.id}><div className="summary-thumb"><ProductArtwork product={product} /><b>{line.quantity}</b></div><div><strong>{product.name} Dip</strong><p>20 nutritious bites</p></div><span>{money(product.price * line.quantity)}</span></div>; })}</div><div className="summary-total"><div><span>Subtotal</span><span>{money(subtotal)}</span></div><div><span>Shipping</span><span className="shipping-note">Calculated later</span></div><div className="total-row"><strong>Total</strong><strong>{money(subtotal)}</strong></div><p>Shipping will be confirmed before a real order is placed.</p></div></aside>}
          </div>
        </div>
      )}
    </main>
  );
}
