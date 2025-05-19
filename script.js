const app = document.getElementById("app");
const cartCount = document.getElementById("cart-count");

const cart = [];
function updateCartCount(count) {
  const mobileCount = document.getElementById("cart-count");
  const desktopCount = document.getElementById("cart");
  console.log(desktopCount);

  if (mobileCount) mobileCount.textContent = count;
  if (desktopCount) desktopCount.textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(cartItems.length); // or localStorage count
});

// Example usage:
let cartItems = [];

function addToCart(itemName) {
  cartItems.push(itemName);
  updateCartCount(cartItems.length);
}

const menuItems = [
  {
    name: "Kaai Pola",
    price: 10,
    image: "./assets/kaaypola.png",
    description:
      "A delicious banana and egg dessert from Malabar, rich and sweet.",
  },
  {
    name: "Malabar Curry with Porotta",
    price: 8,
    image: "./assets/porotta_curry.png",
    description:
      "Flaky Kerala-style porotta served with spicy, slow-cooked Malabar curry.",
  },
  {
    name: "Appam",
    price: 9,
    image: "./assets/appam.jpg",
    description:
      "Soft and lacy fermented rice pancakes, perfect with any curry.",
  },
];

const routes = {
  home: () => `
      <section class="home">
        <div class="home-content">
          <h3 class="fade-in">Welcome to</h3>
          <h1 class="fade-in delay-1">Kerala Home Meals</h1>
          <h3 class="fade-in delay-2">Authentic, homemade food from <span>God's Own Country</span></h3>
          <p class="fade-in delay-3">
            Dive into the flavors of Kerala — where every meal is a celebration. Our home-cooked dishes are crafted with love, handpicked spices, and authentic recipes passed down generations. Experience the warmth of a Keralite kitchen in every bite.
          </p>
          <img src="./assets/malabar_palate.png" alt="Kerala Meal" class="home-img fade-in delay-4">
          <div class="btn-group fade-in delay-5">
            <a href="#/menu" class="btn-icon"><i class="bx bx-restaurant"></i> Menu</a>
            <a href="#/contact" class="btn-icon"><i class="bx bx-phone-call"></i> Contact</a>
          </div>
        </div>
      </section>
  `,
  menu: () => `
      <section class="menu-section"> 
        <h1 class="sub-title fade-in">Our <span>Menu</span></h1>
        <div class="search-box fade-in">
          <input
            type="text"
            id="menuSearch"
            placeholder="Search for a dish..."
            oninput="filterMenu()"
          />
        </div>
        <div class="services-list">
          ${menuItems
            .map(
              (item) => `
            <div class="menu-item fade-in">
              <img src="${item.image}" alt="${item.name}" />
              <h2>${item.name}</h2>
              <p class="description">${item.description}</p>
              <p class="price">$${item.price.toFixed(2)}</p>
              <button onclick="addToCart('${
                item.name
              }')" class="btn-box">Add to Cart</button>
            </div>
          `
            )
            .join("")}
        </div>
      </section>
  `,
  review: () => `
      <section class="review-section">
        <h1 class="sub-title fade-in">Customer <span>Reviews</span></h1>

        <!-- Review Form -->
        <div class="review-form fade-in delay-1">
          <input type="text" id="reviewerName" placeholder="Your Name" required />
          <textarea id="reviewText" placeholder="Write your review..." required></textarea>
          <button onclick="addReview()">Submit Review</button>
        </div>

        <!-- Review Display Area -->
        <div id="reviewList" class="review-list fade-in delay-2">
          <div class="review-card">
            <p>“Absolutely loved the Sadya! Reminded me of home.”</p>
            <span>– Anjali K.</span>
          </div>
          <div class="review-card">
            <p>“The beef fry was perfectly spiced. Thank you for bringing Kerala to my doorstep!”</p>
            <span>– Ravi M.</span>
          </div>
        </div>
      </section>
  `,
  contact: () => `
      <section class="contact-section">
        <h1 class="sub-title fade-in">Get in <span>Touch</span></h1>
        <p class="fade-in delay-1">
          We’re happy to take your orders and answer any questions! Reach out to us on WhatsApp or email for the best Kerala home-cooked meals.
        </p>
        <div class="contact-info fade-in delay-2">
          <p><strong>Email:</strong> <a href="mailto:contact@keralahomemeals.com">contact@keralahomemeals.com</a></p>
          <p><strong>Phone:</strong> <a href="https://wa.me/91XXXXXXXXXX" target="_blank">+91-XXXXXXXXXX</a></p>
        </div>
        <div class="contact-buttons fade-in delay-3">
          <a href="https://wa.me/91XXXXXXXXXX" class="btn-icon"><i class="bx bxl-whatsapp"></i> WhatsApp Us</a>
          <a href="mailto:contact@keralahomemeals.com" class="btn-icon"><i class="bx bxl-gmail"></i> Send Email</a>
        </div>
      </section>

  `,
  cart: () => {
    if (cart.length === 0) {
      return `
      <section class="cart-page empty">
        <h1>Your <span>Cart</span></h1>
        <p>Your cart is currently empty. Let's fix that!</p>
        <a href="#/menu" class="btn primary">Browse Menu</a>
      </section>
    `;
    }

    const itemCounts = {};
    cart.forEach((item) => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });

    const itemDetails = menuItems.reduce((acc, item) => {
      if (itemCounts[item.name]) {
        acc.push({
          name: item.name,
          price: item.price,
          quantity: itemCounts[item.name],
          total: item.price * itemCounts[item.name],
        });
      }
      return acc;
    }, []);

    const totalAmount = itemDetails.reduce((sum, item) => sum + item.total, 0);

    return `
    <section class="cart-page">
      <h1>Your <span>Cart</span></h1>
      <div class="cart-container">
        <div class="cart-items">
          ${itemDetails
            .map(
              (item) => `
              <div class="cart-card">
                <div class="cart-card-content">
                  <div class="item-name">${item.name}</div>
                  <div class="item-info">
                    <span>Qty: ${item.quantity}</span>
                    <span>Price: $${item.price.toFixed(2)}</span>
                    <span class="subtotal">Subtotal: $${item.total.toFixed(
                      2
                    )}</span>
                  </div>
                </div>
              </div>
            `
            )
            .join("")}
        </div>

        <div class="cart-summary">
          <h2>Order Summary</h2>
          <p>Total Items: <strong>${cart.length}</strong></p>
          <p>Total: <strong>$${totalAmount.toFixed(2)}</strong></p>
          <button class="btn primary" onclick="sendOrder()">Send Order via WhatsApp</button>
          <a href="#/menu" class="btn secondary">Add More Items</a>
        </div>
      </div>
    </section>
  `;
  },
};

document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("navbar").classList.toggle("active");
});

function filterMenu() {
  const input = document.getElementById("menuSearch").value.toLowerCase();
  const items = document.querySelectorAll(".menu-item");

  items.forEach((item) => {
    const name = item.querySelector("h2").textContent.toLowerCase();
    const description = item
      .querySelector(".description")
      .textContent.toLowerCase();

    if (name.includes(input) || description.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
function addReview() {
  const name = document.getElementById("reviewerName").value.trim();
  const text = document.getElementById("reviewText").value.trim();
  const reviewList = document.getElementById("reviewList");

  if (!name || !text) {
    alert("Please fill in both your name and review.");
    return;
  }

  const reviewCard = document.createElement("div");
  reviewCard.className = "review-card";
  reviewCard.innerHTML = `
    <p>“${text}”</p>
    <span>– ${name}</span>
  `;

  reviewList.prepend(reviewCard);

  // Clear form fields
  document.getElementById("reviewerName").value = "";
  document.getElementById("reviewText").value = "";
}
function addToCart(itemName) {
  cart.push(itemName);
  cartCount.textContent = cart.length;
}

function sendOrder() {
  if (cart.length === 0) return alert("Your cart is empty!");
  const message = encodeURIComponent(
    "Hi, I'd like to order: " + cart.join(", ")
  );
  window.open(`https://wa.me/91XXXXXXXXXX?text=${message}`, "_blank");
}

function router() {
  const hash = location.hash.replace("#/", "") || "home";
  app.innerHTML = routes[hash] ? routes[hash]() : routes.home();
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
function setActiveLink() {
  const links = document.querySelectorAll(".navbar a");
  links.forEach((link) => {
    link.classList.remove("active");
    const hash = location.hash || "#/home";
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    }
  });
}
function closeMobileMenu() {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menu-toggle");

  // Close menu when a link is clicked (mobile)
  if (window.innerWidth <= 768 && navbar.classList.contains("active")) {
    navbar.classList.remove("active");
  }
}

// Add click listeners to nav links
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

function router() {
  const hash = location.hash.replace("#/", "") || "home";
  app.innerHTML = routes[hash] ? routes[hash]() : routes.home();
  setActiveLink(); // ← Call this here
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
