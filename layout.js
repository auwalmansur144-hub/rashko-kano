// Renders the shared header, bottom nav, footer, and floating WhatsApp button.
// Each page calls RASHKO.mountLayout({ active: 'home' | 'menu' | 'order' | 'reviews' | 'reserve' });

(function () {
  const I = RASHKO.icons;

  const navLinks = [
    { key: "home",    href: "index.html",    label: "Home",    icon: I.home },
    { key: "menu",    href: "menu.html",     label: "Menu",    icon: I.utensils },
    { key: "order",   href: "order.html",    label: "Order",   icon: I.bag },
    { key: "reviews", href: "reviews.html",  label: "Reviews", icon: I.star },
    { key: "reserve", href: "contact.html",  label: "Reserve", icon: I.calendar }
  ];

  RASHKO.mountLayout = function (opts) {
    opts = opts || {};
    mountHeader();
    mountBottomNav(opts.active);
    mountFooter();
    mountWhatsAppFloat();
  };

  function mountHeader() {
    const target = document.getElementById("site-header");
    if (!target) return;
    target.innerHTML = `
      <header class="site-header">
        <div class="container-narrow site-header-inner">
          <a class="brand" href="index.html">
            <span class="brand-name">Rashko</span>
            <span class="brand-tag">Restaurant · Kano</span>
          </a>
          <span class="header-hours eyebrow">Open daily · 11 — 23</span>
        </div>
      </header>
    `;
  }

  function mountBottomNav(active) {
    const target = document.getElementById("bottom-nav");
    if (!target) return;
    const items = navLinks.map(function (l) {
      const cls = active === l.key ? "active" : "";
      return `<li><a class="${cls}" href="${l.href}">${l.icon}<span>${l.label}</span></a></li>`;
    }).join("");
    target.innerHTML = `
      <nav class="bottom-nav" aria-label="Primary"><ul>${items}</ul></nav>
      <div class="bottom-nav-spacer" aria-hidden="true"></div>
    `;
  }

  function mountFooter() {
    const target = document.getElementById("site-footer");
    if (!target) return;
    target.innerHTML = `
      <footer class="site-footer">
        <div class="container-narrow footer-grid">
          <div>
            <h3>Rashko</h3>
            <p>Authentic Arabic cuisine in the heart of Kano — slow-cooked, generously spiced, served with warmth.</p>
          </div>
          <div>
            <p class="eyebrow">Visit</p>
            <p>C41 Gwarzo Road<br>New Site Janbulo, near Next Electro<br>Kano 700252, Nigeria</p>
          </div>
          <div>
            <p class="eyebrow">Hours</p>
            <p>Daily · 11:00 — 23:00<br>Kitchen closes 22:30</p>
            <div class="footer-links">
              <a href="menu.html">Menu</a>
              <a href="about.html">About</a>
              <a href="contact.html">Reserve</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container-narrow footer-bottom-inner">
            <span>© ${new Date().getFullYear()} Rashko Restaurant. All rights reserved.</span>
            <span class="italic-script">Ahlan wa sahlan</span>
          </div>
        </div>
      </footer>
    `;
  }

  function mountWhatsAppFloat() {
    const target = document.getElementById("whatsapp-float");
    if (!target) return;
    const href = RASHKO.whatsappUrl("Hello Rashko! I'd like to place an order for delivery. 🍽️");
    target.innerHTML = `
      <a class="whatsapp-float" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp">
        ${I.whatsapp}
        <span class="sr-only">Order on WhatsApp</span>
        <span class="ping"></span>
      </a>
    `;
  }
})();
