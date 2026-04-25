// Renders the read-only menu page with WhatsApp links per dish.
(function () {
  const target = document.getElementById("menu-root");
  if (!target) return;
  const I = RASHKO.icons;

  const html = RASHKO.menuSections.map(function (section) {
    const dishes = section.items.map(function (d) {
      const msg = "Hello Rashko! I'd like to order: " + d.name + " (" + d.price + ").";
      const href = RASHKO.whatsappUrl(msg);
      return `
        <article class="dish">
          <div class="dish-head">
            <h3 class="dish-name">${d.name}</h3>
            <span class="dish-dots"></span>
            <span class="dish-price">${d.price}</span>
          </div>
          <p class="dish-desc">${d.desc}</p>
          <a class="dish-order-link" href="${href}" target="_blank" rel="noopener noreferrer">
            ${I.whatsapp} Order on WhatsApp
          </a>
        </article>
      `;
    }).join("");

    return `
      <section class="menu-section">
        <header>
          <p class="eyebrow">${section.subtitle}</p>
          <h2 class="display-lg">${section.title}</h2>
        </header>
        <div class="dishes">${dishes}</div>
      </section>
    `;
  }).join("");

  target.innerHTML = html;
})();
