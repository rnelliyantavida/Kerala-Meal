const app = document.getElementById("app");
const cartCount = document.getElementById("cart-count");
const cart = [];

const menuItems = [
  {
    name: "Kerala Sadya",
    price: 10,
    image:
      "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Sibyl_Sunitha/Kerala_Sadya.jpg",
  },
  {
    name: "Beef Fry with Porotta",
    price: 8,
    image:
      "https://www.keralatourism.org/images/enjoy-kannur/kannur/beef-fry.jpg",
  },
  {
    name: "Fish Curry Meal",
    price: 9,
    image:
      "https://www.tastycircle.com/wp-content/uploads/2021/06/Kerala-style-fish-curry.jpg",
  },
];

const routes = {
  home: () => `
    <section class="home">
      <div class="home-content">
        <h3>Welcome to</h3>
        <h1>Kerala Home Meals</h1>
        <h3>Authentic, homemade food from <span>God's Own Country</span></h3>
        <p>We bring you the warmth and love of Kerala through traditional home-cooked meals. Every dish is prepared fresh in our kitchen with handpicked spices and ingredients just like how it's made back home in Kerala. Perfect for those craving comfort food and authentic flavors.</p>
        <img src="https://www.keralatourism.org/images/homecontentimage/desktop/sadya.jpg" alt="Kerala Meal" style="max-width: 100%; border-radius: 12px; margin-top: 20px; box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);">
        <div style="margin-top: 30px; display: flex; gap: 20px; flex-wrap: wrap;">
          <a href="#/menu" class="btn-icon"><i class="bx bx-restaurant"></i> Menu</a>
          <a href="#/review" class="btn-icon"><i class="bx bx-star"></i> Reviews</a>
          <a href="#/contact" class="btn-icon"><i class="bx bx-phone-call"></i> Contact</a>
        </div>
      </div>
    </section>
  `,
  menu: () => `
    <section class="menu-section">
      <h1 class="sub-title">Our <span>Menu</span></h1>
      <div class="services-list">
        ${menuItems
          .map(
            (item) => `
          <div class="menu-item">
            <img src="${item.image}" alt="${item.name}" style="width:100%; border-radius:10px; margin-bottom:10px;" />
            <h2>${item.name}</h2>
            <p>Price: $${item.price}</p>
            <button onclick="addToCart('${item.name}')" class="btn-box">Add to Cart</button>
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `,
  review: () => `
    <section class="review-section">
      <h1 class="sub-title">Customer <span>Reviews</span></h1>
      <p>"Absolutely loved the Sadya! Reminded me of home." – Anjali K.</p>
      <p>"The beef fry was perfectly spiced. Thank you for bringing Kerala to my doorstep!" – Ravi M.</p>
    </section>
  `,
  contact: () => `
    <section class="review-section">
      <h1 class="sub-title">Get in <span>Touch</span></h1>
      <p>We’re happy to take your orders and answer any questions! Contact us via WhatsApp or email for the best Kerala home-cooked meals.</p>
      <p><strong>Email:</strong> contact@keralahomemeals.com</p>
      <p><strong>Phone:</strong> +91-XXXXXXXXXX</p>
    </section>
  `,
  cart: () => {
    if (cart.length === 0) {
      return `<section class="review-section"><h1 class="sub-title">Your <span>Cart</span></h1><p>Your cart is empty. Add something tasty!</p></section>`;
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
      <section class="menu-section">
        <h1 class="sub-title">Your <span>Order</span></h1>
        <div class="services-list">
          ${itemDetails
            .map(
              (item) => `
            <div class="menu-item">
              <h2>${item.name}</h2>
              <p>Quantity: ${item.quantity}</p>
              <p>Price: $${item.price}</p>
              <p><strong>Subtotal: $${item.total}</strong></p>
            </div>
          `
            )
            .join("")}
        </div>
        <h2 style="margin-top: 40px; text-align:center;">Total: $${totalAmount}</h2>
        <div style="text-align:center; margin-top: 20px;">
          <button onclick="sendOrder()" class="btn-box">Send Order via WhatsApp</button>
        </div>
      </section>
    `;
  },
};

document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("navbar").classList.toggle("active");
});

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
