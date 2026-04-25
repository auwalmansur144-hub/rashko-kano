// Reviews page: render the cards.
(function () {
  const target = document.getElementById("reviews-root");
  if (!target) return;
  const I = RASHKO.icons;

  function stars(n) {
    let out = "";
    for (let i = 0; i < n; i++) out += I.star;
    return out;
  }

  target.innerHTML = RASHKO.reviews.map(function (r) {
    return `
      <article class="review-card">
        <div class="review-stars">${stars(r.rating)}</div>
        <p class="review-quote">&ldquo;${r.text}&rdquo;</p>
        <div class="review-meta">
          <span>${r.name}</span>
          <span>${r.when}</span>
        </div>
      </article>
    `;
  }).join("");
})();
