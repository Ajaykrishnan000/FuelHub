const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqDknkx1Hh1QSB1lF1SR0RXY5EFqwqk_cORKt1io0tgU8MN9ndadX6o0frpu7xaPTeXaBJN4qBTXfD/pubhtml?gid=0&single=true";
const phone = "919XXXXXXXXX"; // your WhatsApp number

let allProducts = [];

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
  })
  .catch(err => console.error("Sheet error", err));

function renderProducts(products) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  products.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        ${p.badge ? `<div class="badge">${p.badge}</div>` : ""}
        <img src="${p.image_url}" />
        <h4>${p.brand}</h4>
        <p>${p.product_name}</p>
        <div class="price">$${p.price}</div>
        <small>⭐ ${p.rating}</small>

        <div class="whatsapp"
          onclick="order('${p.whatsapp_message}', '${p.price}')">
          💬
        </div>
      </div>
    `;
  });
}

function order(message, price) {
  const text = `${message} for $${price}`;
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
}
