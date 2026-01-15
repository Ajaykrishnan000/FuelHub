const SHEET_URL =  "https://opensheet.elk.sh/1mY2_sIyD8t2l3LR4ztLL3Cy-EAHG-Ej7vm01w90Ndww/1";
const phone = "919809720203";

let allProducts = [];
let activeType = "all";

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filters button");

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
  })
  .catch(err => console.error("Sheet error", err));

function renderProducts(products) {
  grid.innerHTML = "";

  products.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        ${p.badge ? `<div class="badge">${p.badge}</div>` : ""}
        <img src="${p.image_url}" loading="lazy" />
        <h4>${p.brand}</h4>
        <p>${p.product_name}</p>
        <div class="price">₹${p.price}</div>
        <small>⭐ ${p.rating}</small>

        <div class="whatsapp"
          onclick="order('${p.whatsapp_message}', '${p.price}')">
          💬
        </div>
      </div>
    `;
  });
}

function applyFilters() {
  const searchText = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(p => {
    const matchesSearch =
      p.brand.toLowerCase().includes(searchText) ||
      p.product_name.toLowerCase().includes(searchText);

    const productCategory = (p.category || "")
      .toLowerCase()
      .trim();

    const matchesType =
      activeType === "all" || productCategory.includes(activeType);

    return matchesSearch && matchesType;
  });

  renderProducts(filtered);
}



// 🔍 Search
searchInput.addEventListener("input", applyFilters);

// 🧩 Filters
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    activeType = btn.dataset.type;
    applyFilters();
  });
});

function order(message, price) {
  const text = `${message} for $${price}`;
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
}
