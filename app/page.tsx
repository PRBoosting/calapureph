"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  shortName: string;
  price: number;
  size: string;
  image: string;
  description: string;
};

const products: Product[] = [
  {
    id: "pure-extract",
    name: "Pure Calamansi Extract",
    shortName: "Calamansi Extract",
    price: 250,
    size: "500 ml",
    image: "/products/calapure-extract-catalog.png",
    description: "100% pure calamansi extract for cool drinks, marinades, sauces, and everyday wellness.",
  },
  {
    id: "honey-ginger-tea",
    name: "Honey Calamansi Ginger Tea",
    shortName: "Honey Ginger Tea",
    price: 250,
    size: "500 ml",
    image: "/products/calapure-tea-catalog.png",
    description: "Calamansi and ginger blended with cultured honey for a comforting hot or iced drink.",
  },
];

const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 });

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const itemCount = useMemo(() => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0), [cart]);
  const selectedProducts = products.filter((product) => cart[product.id]);
  const subtotal = selectedProducts.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  function addProduct(id: string) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setNotice("Added to your order");
    window.setTimeout(() => setNotice(""), 2200);
  }

  function updateQuantity(id: string, delta: number) {
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[id] || 0) + delta);
      const next = { ...current };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  }

  function beginOrder() {
    if (!itemCount) {
      setCartOpen(true);
      return;
    }
    setCartOpen(false);
    setOrderOpen(true);
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const details = selectedProducts
      .map((product) => `${cart[product.id]} x ${product.shortName} (${product.size}) - ${peso.format(product.price * cart[product.id])}`)
      .join(", ");
    const message = [
      "Hello CalaPure! I would like to place an order.",
      `Items: ${details}`,
      `Subtotal: ${peso.format(subtotal)}`,
      "Payment options: GCash, Maya, Bank Transfer, or COD.",
      `Name: ${form.get("name")}`,
      `Mobile: ${form.get("contact")}`,
      `Delivery area: ${form.get("location")}`,
      `Notes: ${form.get("notes") || "None"}`,
      "Please confirm availability, delivery fee, and final total.",
    ].join("\n");
    window.location.href = `sms:+639774203854?&body=${encodeURIComponent(message)}`;
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top">
      <header className="siteHeader">
        <a className="brand brandLogo" href="#top" aria-label="CalaPure home">
          <Image src="/brand/calapure-logo-source.png" alt="CalaPure — all natural pure calamansi extract" width={1256} height={1252} priority />
        </a>
        <button className="menuButton" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? "navLinks isOpen" : "navLinks"} aria-label="Primary navigation">
          <a href="#top" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#benefits" onClick={closeMenu}>Benefits</a>
          <a href="#products" onClick={closeMenu}>Products</a>
          <a href="#reviews" onClick={closeMenu}>Reviews</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <button className="cartIcon" type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${itemCount} items`}>
          <span aria-hidden="true">Bag</span><b>{itemCount}</b>
        </button>
        <button className="headerOrder" type="button" onClick={beginOrder}>Order now</button>
      </header>

      <section className="hero">
        <Image className="heroPhoto" src="/products/calapure-hero-premium.png" alt="CalaPure calamansi extract with fresh calamansi and ginger" fill priority sizes="100vw" />
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">100% natural goodness</p>
          <h1>Pure. Natural.<br />Cala<span>Pure.</span></h1>
          <p>Fresh Philippine calamansi in a bottle, ready for refreshing drinks, cooking, marinades, sauces, and everyday goodness.</p>
          <div className="heroBenefits" aria-label="CalaPure highlights">
            <div><b className="heroBenefitIcon leafIcon" aria-hidden="true" /><span>100% Natural</span></div>
            <div><b className="heroBenefitIcon checkIcon" aria-hidden="true">✓</b><span>No Preservatives</span></div>
            <div><b className="heroBenefitIcon vitaminIcon" aria-hidden="true">C<sup>+</sup></b><span>Rich in Vitamin C</span></div>
          </div>
          <div className="heroActions">
            <a className="button primary" href="#products">Shop now <span aria-hidden="true">-&gt;</span></a>
            <a className="plainLink" href="#about">Learn more <span aria-hidden="true">-&gt;</span></a>
          </div>
        </div>
      </section>

      <aside className="registrationStrip" aria-label="CalaPure business credentials">
        <div className="credentialList">
          <div className="credentialItem">
            <span className="credentialMark"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/DTI_PH_new_logo.svg" alt="Department of Trade and Industry logo" /></span>
            <span className="credentialText"><strong>DTI</strong><small>Registered</small></span>
          </div>
          <div className="credentialItem">
            <span className="credentialMark"><img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Bureau_of_Internal_Revenue_%28BIR%29.svg" alt="Bureau of Internal Revenue logo" /></span>
            <span className="credentialText"><strong>BIR</strong><small>Registered</small></span>
          </div>
          <div className="credentialItem">
            <span className="credentialMark credentialMarkWide"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Food_and_Drug_Administration_%28FDA%29_Philippines.svg" alt="Food and Drug Administration Philippines logo" /></span>
            <span className="credentialText"><strong>FDA</strong><small>Approved</small></span>
          </div>
        </div>
      </aside>

      <section className="aboutSection" id="about">
        <div className="aboutCopy">
          <p className="eyebrow">Welcome to CalaPure</p>
          <h2>Goodness in<br /><span>Every Drop</span></h2>
          <p>At CalaPure, we bring you the fresh, natural goodness of premium Philippine calamansi in every bottle. Our products are carefully made to preserve the authentic citrus flavor, making them perfect for refreshing drinks, cooking, marinades, sauces, and everyday wellness.</p>
          <p>We are committed to delivering quality, freshness, and convenience so you can enjoy the pure taste of nature anytime.</p>
          <ul className="checkList">
            <li><i aria-hidden="true">+</i> Premium Philippine calamansi</li>
            <li><i aria-hidden="true">+</i> Made for drinks and everyday cooking</li>
            <li><i aria-hidden="true">+</i> Carefully bottled for freshness</li>
          </ul>
          <a className="button primary" href="#benefits">Our story <span aria-hidden="true">-&gt;</span></a>
        </div>
        <div className="aboutPhoto">
          <Image src="/products/calapure-tea-story.png" alt="CalaPure Honey Calamansi Ginger Tea with calamansi, ginger, and honey" fill sizes="(max-width: 800px) 92vw, 54vw" />
        </div>
      </section>

      <section className="benefitsSection" id="benefits">
        <div className="centerHeading">
          <p className="eyebrow">Naturally better, every day</p>
          <h2>Why Choose <span>CalaPure</span></h2>
          <p className="benefitsIntro">Made from real calamansi and crafted for convenience, freshness, and everyday use.</p>
        </div>
        <div className="benefitCards">
          <article><i aria-hidden="true">🌿</i><h3>100% Pure Calamansi</h3><p>Freshly extracted with no artificial citrus taste.</p></article>
          <article><i aria-hidden="true">🍹</i><h3>Refreshing Anytime</h3><p>Perfect for cold water, tea, juice, or healthy drinks.</p></article>
          <article><i aria-hidden="true">🍽️</i><h3>Perfect for Cooking</h3><p>Ideal for marinades, seafood, sauces, dressings, and Filipino dishes.</p></article>
          <article><i aria-hidden="true">⏱️</i><h3>Ready to Use</h3><p>No squeezing, no mess—just pour, mix, and enjoy.</p></article>
        </div>
      </section>

      <section className="productsSection" id="products">
        <div className="centerHeading">
          <p className="eyebrow">Our products</p>
          <h2>Made with Love.<br /><span>Packed with Nature.</span></h2>
        </div>
        <div className="productGrid">
          {products.map((product) => (
            <article className="productCard" key={product.id}>
              <div className="productPhoto"><Image src={product.image} alt={`${product.name}, ${product.size}`} fill sizes="(max-width: 720px) 92vw, 36vw" /></div>
              <div className="productDetails">
                <p className="productLabel">CalaPure</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="productBottom"><strong>{peso.format(product.price)}</strong><span>{product.size}</span></div>
                <button className="button primary addButton" type="button" onClick={() => addProduct(product.id)}>Add to cart <span aria-hidden="true">+</span></button>
              </div>
            </article>
          ))}
        </div>
        <p className="deliveryNote">Delivery fee is confirmed based on your location before checkout.</p>
        <div className="paymentBar" aria-label="Accepted payment methods">
          <span className="paymentTitle">Ways to pay</span><span>GCash</span><span>Maya</span><span>Bank Transfer</span><span>Cash on Delivery</span>
        </div>
      </section>

      <section className="reviewsSection" id="reviews">
        <div className="centerHeading">
          <p className="eyebrow">What our customers say</p>
          <h2>Pure Goodness. <span>Genuine Stories.</span></h2>
        </div>
        <div className="reviewGrid">
          <blockquote><div aria-label="Customer recommends CalaPure">✓ Recommended</div><p>"Di na need magpiga ng napakaraming calamansi. Pure Calamansi na sya. Rekta timpla na tas haluan ng honey. Ginagamit din namin pang marinade. Very useful ang Calapure 👍"</p><cite>— Ken Elorde</cite></blockquote>
          <blockquote><div aria-label="Customer recommends CalaPure">✓ Recommended</div><p>"Strong, authentic calamansi taste — just like squeezing fresh fruit, but much more convenient."</p><cite>— Inday Pia</cite></blockquote>
          <blockquote><div aria-label="Customer recommends CalaPure">✓ Recommended</div><p>"We just tried CalaPure today, and we already love how convenient it is! 🍊 No more slicing and squeezing calamansi—it’s ready to use anytime. The taste is fresh and natural, perfect for drinks and everyday use. Highly recommended for busy moms like me! Thank you, CalaPure! 💚"</p><cite>— Ricalynne Gregorio Narciso</cite></blockquote>
        </div>
      </section>

      <section className="ctaSection" id="contact">
        <div><h2>Ready to taste the natural goodness?</h2><p>Order now and bring home the bright flavor of calamansi, ginger, and honey.</p></div>
        <div className="ctaActions">
          <button className="button light" type="button" onClick={beginOrder}>Start your order <span aria-hidden="true">-&gt;</span></button>
          <a className="lazadaTextLink" href="https://s.lazada.com.ph/s.ZTCBl5" target="_blank" rel="noreferrer">Or shop on Lazada <span aria-hidden="true">-&gt;</span></a>
        </div>
      </section>

      <footer>
        <div className="footerBrandBlock">
          <a className="brand footerBrand brandLogo" href="#top" aria-label="CalaPure home"><Image src="/brand/calapure-logo-source.png" alt="CalaPure — all natural pure calamansi extract" width={1256} height={1252} /></a>
          <p>All natural. All good. All for you.</p>
          <div className="socials">
            <a className="socialFacebook" href="https://www.facebook.com/Calapureph" target="_blank" rel="noreferrer">Visit Facebook <span aria-hidden="true">→</span></a>
            <a className="socialLazada" href="https://s.lazada.com.ph/s.ZTCBl5" target="_blank" rel="noreferrer">Shop on Lazada <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="footerColumn"><h3>Quick links</h3><a href="#top">Home</a><a href="#about">About us</a><a href="#benefits">Benefits</a><a href="#products">Products</a><a href="https://s.lazada.com.ph/s.ZTCBl5" target="_blank" rel="noreferrer">Shop on Lazada</a></div>
        <div className="footerColumn"><h3>Contact us</h3><a href="tel:+639774203854">0977 420 3854</a><a href="https://www.facebook.com/Calapureph" target="_blank" rel="noreferrer">@Calapureph</a><span>Philippines</span></div>
        <div className="footerColumn"><h3>We deliver</h3><p>Enjoy CalaPure delivered to your area. Availability and fees are confirmed with every order.</p></div>
        <small>Copyright 2026 CalaPure. All rights reserved.</small>
      </footer>

      <div className={cartOpen ? "drawerBackdrop isOpen" : "drawerBackdrop"} onClick={() => setCartOpen(false)} />
      <aside className={cartOpen ? "cartDrawer isOpen" : "cartDrawer"} aria-hidden={!cartOpen} aria-label="Shopping cart">
        <div className="drawerHeader"><div><p>Your CalaPure picks</p><h2>Shopping cart</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart">x</button></div>
        {selectedProducts.length ? <>
          <div className="drawerItems">{selectedProducts.map((product) => <div className="drawerItem" key={product.id}>
            <Image src={product.image} alt="" width={72} height={88} />
            <div><h3>{product.shortName}</h3><p>{product.size} - {peso.format(product.price)}</p><div className="quantity"><button type="button" onClick={() => updateQuantity(product.id, -1)} aria-label={`Remove one ${product.shortName}`}>-</button><span>{cart[product.id]}</span><button type="button" onClick={() => updateQuantity(product.id, 1)} aria-label={`Add one ${product.shortName}`}>+</button></div></div>
          </div>)}</div>
          <div className="drawerFooter"><div className="subtotal"><span>Subtotal</span><strong>{peso.format(subtotal)}</strong></div><p>Delivery fee is confirmed before checkout.</p><button className="button primary" type="button" onClick={beginOrder}>Continue to order</button></div>
        </> : <div className="emptyCart"><b>CP</b><h3>Your cart is empty</h3><p>Choose a CalaPure favorite and it will appear here.</p><button className="button primary" type="button" onClick={() => setCartOpen(false)}>Browse products</button></div>}
      </aside>

      {orderOpen && <div className="modalBackdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOrderOpen(false)}>
        <section className="orderModal" role="dialog" aria-modal="true" aria-labelledby="order-title">
          <button className="modalClose" type="button" onClick={() => setOrderOpen(false)} aria-label="Close order form">x</button>
          <p className="eyebrow">Almost there</p><h2 id="order-title">Where should we send your CalaPure?</h2>
          <p>Submitting opens a pre-filled text message to CalaPure. Pay via GCash, Maya, bank transfer, or COD; payment and delivery are confirmed personally.</p>
          <form onSubmit={submitOrder}>
            <label>Full name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
            <label>Mobile number<input name="contact" required inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxxx" /></label>
            <label>City / delivery area<input name="location" required autoComplete="address-level2" placeholder="City or barangay" /></label>
            <label>Order notes<textarea name="notes" rows={3} placeholder="Preferred delivery date or other notes" /></label>
            <button className="button primary" type="submit">Send order by text message</button>
          </form>
        </section>
      </div>}

      <div className={notice ? "toast isVisible" : "toast"} role="status">{notice}</div>
    </main>
  );
}
