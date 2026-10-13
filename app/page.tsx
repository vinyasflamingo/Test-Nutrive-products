"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  tone: string;
  notes: string[];
  price: number;
};

type CartLine = { id: string; qty: number };

const products: Product[] = [
  {
    id: "dark",
    name: "Dark Chocolate Dipped Bites",
    shortName: "Dark Chocolate",
    description: "Deep cocoa notes meet a naturally nourishing bite. Rich, balanced, and made for your little daily indulgence.",
    image: "/dark-chocolate.webp",
    tone: "dark",
    notes: ["20 nutritious bites", "Rich dark chocolate dip", "A little treat, a lot of goodness"],
    price: 399,
  },
  {
    id: "white",
    name: "White Chocolate Dipped Bites",
    shortName: "White Chocolate",
    description: "Creamy white chocolate brings a smooth, mellow finish to a bite made for everyday moments of joy.",
    image: "/white-chocolate.webp",
    tone: "white",
    notes: ["20 nutritious bites", "Smooth white chocolate dip", "Creamy, mellow sweetness"],
    price: 399,
  },
  {
    id: "milk",
    name: "Milk Chocolate Dipped Bites",
    shortName: "Milk Chocolate",
    description: "A familiar chocolatey finish wraps a wholesome bite in a comforting, crowd-pleasing treat.",
    image: "/milk-chocolate.webp",
    tone: "milk",
    notes: ["20 nutritious bites", "Classic milk chocolate dip", "A comforting chocolate finish"],
    price: 399,
  },
];

const ingredients = [
  { name: "Dates", image: "/reference/dates.webp" },
  { name: "Almonds", image: "/reference/almonds.webp" },
  { name: "Pistachios", image: "/reference/pistachios.webp" },
  { name: "Black Raisins", image: "/reference/black-raisins.webp" },
  { name: "Golden Raisins", image: "/reference/golden-raisins.webp" },
  { name: "Anjeer", image: "/reference/anjeer.webp" },
  { name: "Cashews", image: "/reference/cashews.webp" },
  { name: "Ghee", image: "/reference/ghee.webp" },
];

function Icon({ name, size = 20 }: { name: "bag" | "close" | "plus" | "minus" | "arrow" | "leaf" | "spark" | "menu"; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  if (name === "bag") return <svg {...common}><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
  if (name === "close") return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>;
  if (name === "plus") return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
  if (name === "minus") return <svg {...common}><path d="M5 12h14"/></svg>;
  if (name === "arrow") return <svg {...common}><path d="M4 12h15M13 5l7 7-7 7"/></svg>;
  if (name === "leaf") return <svg {...common}><path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16Z"/><path d="M4 20c3-5 7-8 12-11"/></svg>;
  if (name === "spark") return <svg {...common}><path d="m12 2 1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-2.8L12 2Z"/></svg>;
  return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
}

export default function HomePage() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutNote, setCheckoutNote] = useState(false);

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const cartItems = useMemo(() => cart.map((line) => ({ ...line, product: products.find((p) => p.id === line.id)! })), [cart]);
  const subtotal = cartItems.reduce((sum, line) => sum + line.product.price * line.qty, 0);

  function addToCart(id: string) {
    setCart((current) => {
      const found = current.find((line) => line.id === id);
      return found ? current.map((line) => line.id === id ? { ...line, qty: line.qty + 1 } : line) : [...current, { id, qty: 1 }];
    });
    setActiveProduct(null);
    setCheckoutNote(false);
    setCartOpen(true);
  }

  function changeQty(id: string, delta: number) {
    setCart((current) => current.map((line) => line.id === id ? { ...line, qty: line.qty + delta } : line).filter((line) => line.qty > 0));
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="NutriVé home">NutriVé<span>®</span></a>
        <nav className={`main-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a className="nav-active" href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#story" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
          <a href="#ingredients" onClick={() => setMobileMenuOpen(false)}>Ingredients</a>
          <a href="#shop" onClick={() => setMobileMenuOpen(false)}>Shop</a>
        </nav>
        <div className="header-actions">
          <a className="header-search" href="#shop" aria-label="Browse products"><span className="search-mark" /><span className="header-search-label">Our Products</span></a>
          <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${cartCount} items`}>
            <Icon name="bag" size={19} /><span className="cart-count">{cartCount}</span>
          </button>
          <button className="menu-trigger" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle menu"><Icon name={mobileMenuOpen ? "close" : "menu"} size={21} /></button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow"><span /> NATURE, MADE DELICIOUS <span /></p>
          <h1>Small Bite.<br /><em>Big Energy.</em></h1>
          <div className="hero-rule"><i /><span>✦</span><i /></div>
          <p className="hero-tagline">NUTRITION THAT TASTES LIKE A TREAT</p>
          <p className="hero-copy">Crafted with nature’s finest ingredients,<br className="desktop-break" /> for your everyday energy.</p>
          <a className="gold-button" href="#shop">Discover the bites <Icon name="arrow" size={17} /></a>
        </div>
        <a className="scroll-cue" href="#story" aria-label="Scroll to our story"><span>↓</span></a>
        <div className="hero-footnote"><span>01 / 03</span><i /><span>THE EVERYDAY INDULGENCE</span></div>
      </section>

      <div className="intro-strip"><Icon name="leaf" size={20} /><p>Crafted with nature’s finest ingredients, for your everyday energy.</p><span>PURE INGREDIENTS · THOUGHTFUL INDULGENCE</span></div>

      <section className="story-section" id="story">
        <div className="story-copy">
          <p className="eyebrow left"><span /> THE NUTRIVÉ PHILOSOPHY</p>
          <h2>Goodness you can<br /><em>feel good about.</em></h2>
          <p>We believe everyday nourishment should feel like a little luxury. NutriVé brings together the richness of nature and the joy of chocolate in a bite-sized treat made for the moments that matter.</p>
          <a className="text-link" href="#ingredients">Explore our ingredients <Icon name="arrow" size={16} /></a>
        </div>
        <div className="story-image-wrap"><img src="/reference/bite-count.webp" alt="NutriVé nutritious bites with nature-inspired ingredients" /><div className="image-caption"><span>MADE WITH CARE</span><span>ROOTED IN NATURE</span></div></div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div><p className="eyebrow left"><span /> FIND YOUR FAVOURITE</p><h2>A little chocolate.<br /><em>A lot of goodness.</em></h2></div>
          <p className="section-note">Twenty nutritious bites in every packet.<br />Three delicious ways to treat yourself.</p>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article className={`product-card ${product.tone}`} key={product.id}>
              <button className="product-image-button" onClick={() => setActiveProduct(product)} aria-label={`View ${product.name}`}>
                <span className="product-number">0{index + 1}</span>
                <span className="product-image-glow" />
                <img className="product-image" src={product.image} alt={`${product.shortName} NutriVé bites packet`} />
                <span className="view-product">Quick view <Icon name="arrow" size={14} /></span>
              </button>
              <div className="product-info">
                <div className="product-kicker">NUTRIVÉ BITES · 20 PIECES</div>
                <h3>{product.shortName}<br /><span>Dipped Bites</span></h3>
                <p>{product.description}</p>
                <div className="product-bottom"><strong>₹{product.price}</strong><button className="add-button" onClick={() => addToCart(product.id)}>Add to bag <Icon name="arrow" size={15} /></button></div>
              </div>
            </article>
          ))}
        </div>
        <p className="price-note">Prices shown are placeholders. Checkout is a demo and does not process real payments.</p>
      </section>

      <section className="ingredient-section" id="ingredients">
        <div className="ingredient-heading"><p className="eyebrow"><span /> FROM NATURE’S PANTRY <span /></p><h2>Every ingredient<br /><em>has a story.</em></h2><p>Inspired by the beautiful simplicity of nature’s pantry.</p></div>
        <div className="ingredient-grid">
          {ingredients.map((ingredient, index) => (
            <figure className={`ingredient-card ingredient-${index + 1}`} key={ingredient.name}>
              <img src={ingredient.image} alt={`${ingredient.name} ingredient story`} loading="lazy" />
              <figcaption><span>0{index + 1}</span>{ingredient.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="closing-banner">
        <img src="/reference/bite-count.webp" alt="NutriVé bites and packet surrounded by natural ingredients" loading="lazy" />
        <div className="closing-overlay" />
        <div className="closing-copy"><p className="eyebrow left"><span /> A BETTER KIND OF TREAT</p><h2>Make every<br /><em>bite count.</em></h2><a className="gold-button" href="#shop">Shop the collection <Icon name="arrow" size={17} /></a></div>
      </section>

      <footer className="site-footer">
        <div><a className="wordmark footer-wordmark" href="#home">NutriVé<span>®</span></a><p>Nutrition that tastes like a treat.</p></div>
        <div className="footer-links"><a href="#story">Our Story</a><a href="#ingredients">Ingredients</a><a href="#shop">Shop</a></div>
        <div className="footer-motto">BETTER INGREDIENTS <i>•</i> BETTER NUTRITION <i>•</i> A HEALTHIER YOU</div>
        <small>© {new Date().getFullYear()} NutriVé. All rights reserved.</small>
      </footer>

      {activeProduct && <div className="modal-backdrop" role="presentation" onClick={() => setActiveProduct(null)}><section className={`product-modal ${activeProduct.tone}`} role="dialog" aria-modal="true" aria-label={activeProduct.name} onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={() => setActiveProduct(null)} aria-label="Close product details"><Icon name="close" size={20} /></button>
        <div className="modal-visual"><img src={activeProduct.image} alt={`${activeProduct.shortName} bites packet`} /></div>
        <div className="modal-copy"><p className="eyebrow left"><span /> THE NUTRIVÉ COLLECTION</p><h2>{activeProduct.shortName}<br /><em>Dipped Bites</em></h2><p>{activeProduct.description}</p><ul>{activeProduct.notes.map((note) => <li key={note}><Icon name="spark" size={14} />{note}</li>)}</ul><div className="modal-price">₹{activeProduct.price}</div><button className="gold-button full-button" onClick={() => addToCart(activeProduct.id)}>Add to bag <Icon name="arrow" size={17} /></button></div>
      </section></div>}

      {cartOpen && <div className="drawer-backdrop" role="presentation" onClick={() => setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-heading"><div><p className="eyebrow left"><span /> YOUR SELECTION</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="modal-close static-close" onClick={() => setCartOpen(false)} aria-label="Close bag"><Icon name="close" size={20} /></button></div>
        {cartItems.length === 0 ? <div className="empty-cart"><div className="empty-bag"><Icon name="bag" size={30} /></div><h3>Your bag is waiting.</h3><p>Choose a chocolate-dipped bite to get started.</p><button className="gold-button" onClick={() => { setCartOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the collection <Icon name="arrow" size={16} /></button></div> : <>
          <div className="cart-lines">{cartItems.map(({ product, qty }) => <div className="cart-line" key={product.id}><img src={product.image} alt="" /><div className="cart-line-copy"><h3>{product.shortName}</h3><p>20 nutritious bites · ₹{product.price}</p><div className="quantity-control"><button onClick={() => changeQty(product.id, -1)} aria-label={`Remove one ${product.shortName}`}><Icon name="minus" size={13} /></button><span>{qty}</span><button onClick={() => changeQty(product.id, 1)} aria-label={`Add one ${product.shortName}`}><Icon name="plus" size={13} /></button></div></div><strong>₹{product.price * qty}</strong></div>)}</div>
          <div className="cart-total"><span>Subtotal</span><strong>₹{subtotal}</strong></div><p className="shipping-copy">Shipping and taxes are calculated at checkout.</p>
          {checkoutNote && <div className="demo-notice">Demo checkout only — no payment or order has been processed.</div>}
          <button className="gold-button full-button" onClick={() => setCheckoutNote(true)}>Continue to checkout <Icon name="arrow" size={17} /></button><button className="continue-shopping" onClick={() => setCartOpen(false)}>Continue shopping</button>
        </>}
      </aside></div>}
    </main>
  );
}
