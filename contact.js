// Contact page: form submission swap.
(function () {
  const form = document.getElementById("reservation-form");
  const success = document.getElementById("reservation-success");
  if (!form || !success) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.style.display = "none";
    success.style.display = "block";
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
