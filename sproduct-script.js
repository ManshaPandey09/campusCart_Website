const API_URL = "https://sheetdb.io/api/v1/oyfbwin1f16yb";
const params = new URLSearchParams(window.location.search);
const productId = params.get("id"); // e.g., "product0"

async function loadProduct() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const index = parseInt(productId.replace("product", ""));
  const product = data[index];

  if (!product) {
    document.querySelector(".single-pro-details").innerHTML = `<h3>Product Not Found 😢</h3>`;
    return;
  }

  // DOM elements
  const nameEl = document.getElementById("product-name");
  const imageEl = document.getElementById("MainImg");
  const selectEl = document.getElementById("variant-select");
  const priceEl = document.getElementById("product-price");
  const originalPriceEl = document.getElementById("product-original-price");
  const descList = document.getElementById("product-description");
  const quantityEl = document.getElementById("quantity");

  // Set product name
  nameEl.innerText = product.name;

  // Smooth image loading with fade-in
  imageEl.style.opacity = "0";
  imageEl.onload = () => {
    imageEl.style.opacity = "1";
  };
  imageEl.src = product.image;

  // Build variant options
  const variants = [];

  for (let i = 1; i <= 3; i++) {
    const duration = product[`variant${i}_duration`];
    const price = parseFloat(product[`variant${i}_price`]);
    const originalPrice = parseFloat(product[`variant${i}_original`]);

    if (duration && !isNaN(price) && !isNaN(originalPrice)) {
      variants.push({ duration, price, originalPrice });
    }
  }

  // Populate dropdown
  selectEl.innerHTML = "";
  variants.forEach((variant, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = `${variant.duration} - ₹${variant.price}`;
    selectEl.appendChild(opt);
  });

  // Description list
  descList.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const desc = product[`description${i}`];
    if (desc && desc.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = desc;
      descList.appendChild(li);
    }
  }

  // Handle pricing
  function updatePrice(index) {
    const v = variants[index];
    const discount = v.originalPrice - v.price;
    const discountPercent = Math.round((discount / v.originalPrice) * 100);
    priceEl.innerText = `₹${v.price} (${discountPercent}% off)`;
    originalPriceEl.innerText = `₹${v.originalPrice}`;
  }

  updatePrice(0); // Show initial price

  selectEl.addEventListener("change", () => {
    updatePrice(selectEl.value);
  });

  // Add to Cart
  window.addToCart = () => {
    const quantity = parseInt(quantityEl.value) || 1;
    const selectedVariant = variants[selectEl.value];

    const cartItem = {
      id: productId,
      name: product.name,
      variant: selectedVariant.duration,
      price: selectedVariant.price,
      quantity
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Added to cart!");
  };
}

loadProduct();

