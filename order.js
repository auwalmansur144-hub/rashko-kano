// Order page: dish picker with quantities + sticky cart + WhatsApp submission.
(function () {
  const I = RASHKO.icons;
  const dishesRoot = document.getElementById("order-menu-root");
  const cartRoot = document.getElementById("cart-root");
  if (!dishesRoot || !cartRoot) return;

  // Build a flat dish lookup
  const dishMap = new Map();
  RASHKO.menuSections.forEach(function (s) {
    s.items.forEach(function (d) { dishMap.set(d.name, d); });
  });

  const state = {
    cart: {},                 // { dishName: qty }
    mode: "delivery",         // "delivery" | "pickup"
    name: "", phone: "", address: "", notes: "",
    errors: []
  };

  // ---- Render menu picker ----
  function renderMenu() {
    dishesRoot.innerHTML = RASHKO.menuSections.map(function (section) {
      const items = section.items.map(function (d) {
        const qty = state.cart[d.name] || 0;
        const controls = qty > 0
          ? `
            <div class="qty-controls">
              <button type="button" class="qty-btn" data-action="dec" data-name="${escapeAttr(d.name)}" aria-label="Remove one ${escapeAttr(d.name)}">${I.minus}</button>
              <span class="qty-num">${qty}</span>
              <button type="button" class="qty-btn" data-action="inc" data-name="${escapeAttr(d.name)}" aria-label="Add one ${escapeAttr(d.name)}">${I.plus}</button>
            </div>
          `
          : `
            <div class="qty-controls">
              <button type="button" class="add-btn" data-action="inc" data-name="${escapeAttr(d.name)}">Add</button>
            </div>
          `;
        return `
          <article class="order-dish">
            <div class="order-dish-info">
              <div class="head">
                <h3>${d.name}</h3>
                <span class="price">${d.price}</span>
              </div>
              <p class="desc">${d.desc}</p>
            </div>
            ${controls}
          </article>
        `;
      }).join("");
      return `
        <section class="order-section">
          <header>
            <p class="eyebrow">${section.subtitle}</p>
            <h2 class="display-lg">${section.title}</h2>
          </header>
          <div class="order-dishes">${items}</div>
        </section>
      `;
    }).join("");
  }

  // ---- Render cart sidebar ----
  function renderCart() {
    const lines = Object.keys(state.cart)
      .filter(function (n) { return state.cart[n] > 0; })
      .map(function (n) {
        const d = dishMap.get(n);
        const qty = state.cart[n];
        return { dish: d, qty: qty, subtotal: d.priceValue * qty };
      });

    const total = lines.reduce(function (s, l) { return s + l.subtotal; }, 0);
    const itemCount = lines.reduce(function (s, l) { return s + l.qty; }, 0);

    const itemsHtml = lines.length
      ? `<ul class="cart-items">${lines.map(function (l) {
          return `
            <li class="cart-item">
              <span class="qty">${l.qty}×</span>
              <div class="cart-item-info">
                <p class="name">${l.dish.name}</p>
                <p class="sub">${RASHKO.formatNaira(l.subtotal)}</p>
              </div>
              <button type="button" class="cart-remove" data-action="remove" data-name="${escapeAttr(l.dish.name)}" aria-label="Remove ${escapeAttr(l.dish.name)}">${I.trash}</button>
            </li>
          `;
        }).join("")}</ul>`
      : `<p class="cart-empty">Add dishes from the menu to start your order.</p>`;

    const errorsHtml = state.errors.length
      ? `<ul class="form-errors">${state.errors.map(function (e) { return "<li>• " + e + "</li>"; }).join("")}</ul>`
      : "";

    const addressField = state.mode === "delivery"
      ? `
        <label class="field">
          <span class="field-label">Delivery address</span>
          <textarea class="form-input" rows="2" maxlength="200" placeholder="Street, area, landmark" data-field="address">${escapeHtml(state.address)}</textarea>
        </label>
      `
      : "";

    cartRoot.innerHTML = `
      <aside class="cart">
        <div>
          <p class="eyebrow">Your Order</p>
          <h2>${itemCount === 0 ? "Empty" : itemCount + " item" + (itemCount > 1 ? "s" : "")}</h2>
        </div>

        ${itemsHtml}

        <div class="cart-total">
          <span class="eyebrow">Total</span>
          <span class="total-amount">${RASHKO.formatNaira(total)}</span>
        </div>

        <form class="order-form" id="order-form" novalidate>
          <div class="mode-toggle">
            <button type="button" class="mode-btn ${state.mode === 'delivery' ? 'active' : ''}" data-mode="delivery">Delivery</button>
            <button type="button" class="mode-btn ${state.mode === 'pickup' ? 'active' : ''}" data-mode="pickup">Pickup</button>
          </div>

          <label class="field">
            <span class="field-label">Your name</span>
            <input type="text" class="form-input" maxlength="80" placeholder="Full name" data-field="name" value="${escapeAttr(state.name)}">
          </label>

          <label class="field">
            <span class="field-label">Phone (WhatsApp)</span>
            <input type="tel" class="form-input" maxlength="20" placeholder="+234 …" data-field="phone" value="${escapeAttr(state.phone)}">
          </label>

          ${addressField}

          <label class="field">
            <span class="field-label">Notes (optional)</span>
            <textarea class="form-input" rows="2" maxlength="300" placeholder="Allergies, spice level, etc." data-field="notes">${escapeHtml(state.notes)}</textarea>
          </label>

          ${errorsHtml}

          <button type="submit" class="btn-whatsapp-pill" ${lines.length === 0 ? 'disabled' : ''}>
            ${I.whatsapp}
            <span style="margin-left:0.5rem;">Send Order via WhatsApp</span>
          </button>

          <p class="form-help">You'll be taken to WhatsApp with your order pre-filled. We'll confirm price &amp; ETA before cooking.</p>
        </form>
      </aside>
    `;
  }

  // ---- Event handlers ----
  function rerender() {
    renderMenu();
    renderCart();
  }

  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-action], [data-mode]");
    if (!btn) return;

    if (btn.dataset.mode) {
      state.mode = btn.dataset.mode;
      renderCart();
      return;
    }

    const name = btn.dataset.name;
    if (!name) return;

    if (btn.dataset.action === "inc") {
      state.cart[name] = (state.cart[name] || 0) + 1;
    } else if (btn.dataset.action === "dec") {
      state.cart[name] = Math.max(0, (state.cart[name] || 0) - 1);
      if (state.cart[name] === 0) delete state.cart[name];
    } else if (btn.dataset.action === "remove") {
      delete state.cart[name];
    }
    rerender();
  });

  // Live-bind form fields without re-rendering on every keystroke
  document.addEventListener("input", function (e) {
    const el = e.target;
    if (!el.dataset || !el.dataset.field) return;
    state[el.dataset.field] = el.value;
  });

  document.addEventListener("submit", function (e) {
    if (e.target.id !== "order-form") return;
    e.preventDefault();
    submitOrder();
  });

  function submitOrder() {
    const lines = Object.keys(state.cart)
      .filter(function (n) { return state.cart[n] > 0; })
      .map(function (n) {
        const d = dishMap.get(n);
        return { dish: d, qty: state.cart[n], subtotal: d.priceValue * state.cart[n] };
      });

    const errs = [];
    if (lines.length === 0) errs.push("Please add at least one dish to your order.");
    if (state.name.trim().length < 2) errs.push("Please enter your name.");
    if (!/^[0-9+\s()\-]{7,20}$/.test(state.phone.trim())) errs.push("Please enter a valid phone number.");
    if (state.mode === "delivery" && state.address.trim().length < 6) {
      errs.push("Please enter a delivery address in Kano.");
    }

    state.errors = errs;
    renderCart();
    if (errs.length > 0) return;

    const total = lines.reduce(function (s, l) { return s + l.subtotal; }, 0);
    const msg = [];
    msg.push("*New Order — Rashko Restaurant*", "");
    msg.push("*Name:* " + state.name.trim());
    msg.push("*Phone:* " + state.phone.trim());
    msg.push("*Type:* " + (state.mode === "delivery" ? "Delivery" : "Pickup"));
    if (state.mode === "delivery") msg.push("*Address:* " + state.address.trim());
    if (state.notes.trim()) msg.push("*Notes:* " + state.notes.trim());
    msg.push("", "*Items:*");
    lines.forEach(function (l) {
      msg.push("• " + l.qty + " × " + l.dish.name + " — " + RASHKO.formatNaira(l.subtotal));
    });
    msg.push("", "*Total:* " + RASHKO.formatNaira(total));

    window.open(RASHKO.whatsappUrl(msg.join("\n")), "_blank", "noopener,noreferrer");
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function escapeAttr(s) { return escapeHtml(s); }

  rerender();
})();
