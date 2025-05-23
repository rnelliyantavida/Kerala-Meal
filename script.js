window.addEventListener("hashchange", () => {
  window.scroll(0, 0);
});

// Also scroll to top on initial load if needed
window.addEventListener("load", () => {
  window.scroll(0, 0);
});
const app = document.getElementById("app");
const cartCount = document.getElementById("cart-count");

let cart = [];
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
    category: "Dessert",
  },
  {
    name: "Malabar Curry with Porotta",
    price: 8,
    image: "./assets/porotta_curry.png",
    description:
      "Flaky Kerala-style porotta served with spicy, slow-cooked Malabar curry.",
    category: "Curry",
  },
  {
    name: "Appam",
    price: 9,
    image: "./assets/appam.jpg",
    description:
      "Soft and lacy fermented rice pancakes, perfect with any curry.",
    category: "Bread",
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
        <div class="category-filters fade-in">
          <button class="filter-btn active" onclick="filterCategory('All')">All</button>
          <button class="filter-btn" onclick="filterCategory('Curry')">Curry</button>
          <button class="filter-btn" onclick="filterCategory('Bread')">Bread</button>
          <button class="filter-btn" onclick="filterCategory('Rice')">Rice</button>
          <button class="filter-btn" onclick="filterCategory('Dessert')">Dessert</button>
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
          <button id="submitReview" onclick="addReview()" disabled>Submit Review</button>
        </div>

        <!-- Review Display Area -->
        <div id="reviewList" class="review-list fade-in delay-2">
          <!-- Reviews will be dynamically inserted here -->
        </div>
      </section>
  `,
  contact: () => `
      <section class="contact-section">
        <h1 class="sub-title fade-in">Get in <span>Touch</span></h1>
        <p class="fade-in delay-1">
          We’re happy to take your orders and answer any questions! Reach out to us via call or email for the best Kerala home-cooked meals.
        </p>
        <div class="contact-info fade-in delay-2">
          <p><strong>Email:</strong> <a href="mailto:contactkeralahomemeals@gmail.com">contactkeralahomemeals@gmail.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:2488264628">248-826-4628</a></p>
        </div>
        <div class="contact-buttons fade-in delay-3">
          <a href="tel:2488264628" class="btn-icon"><i class="bx bx-phone-call"></i> Call Us</a>
          <a href="mailto:contactkeralahomemeals@gmail.com" class="btn-icon"><i class="bx bxl-gmail"></i> Send Email</a>
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

    // ✅ Store order details in localStorage
    const orderDetailsText =
      itemDetails
        .map(
          (item) =>
            `${item.name} x ${item.quantity} = $${item.total.toFixed(2)}`
        )
        .join("\n") + `\n\nTotal: $${totalAmount.toFixed(2)}`;

    localStorage.setItem("orderDetails", orderDetailsText);

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
          <button class="btn primary" onclick="openModal()">Send Order via Email</button>
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
// function addReview() {
//   const name = document.getElementById("reviewerName").value.trim();
//   const text = document.getElementById("reviewText").value.trim();
//   const reviewList = document.getElementById("reviewList");

//   if (!name || !text) {
//     alert("Please fill in both your name and review.");
//     return;
//   }

//   const reviewCard = document.createElement("div");
//   reviewCard.className = "review-card";
//   reviewCard.innerHTML = `
//     <p>“${text}”</p>
//     <span>– ${name}</span>
//   `;

//   reviewList.prepend(reviewCard);

//   // Clear form fields
//   document.getElementById("reviewerName").value = "";
//   document.getElementById("reviewText").value = "";
// }
function addToCart(itemName) {
  cart.push(itemName);
  cartCount.textContent = cart.length;
}
function filterCategory(category) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`.filter-btn[onclick*="${category}"]`)
    .classList.add("active");

  const filteredItems =
    category === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  document.querySelector(".services-list").innerHTML = filteredItems
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
    .join("");
}
document.addEventListener("DOMContentLoaded", () => {
  filterCategory("All");
});

function sendOrder() {
  if (cart.length === 0) return alert("Your cart is empty!");
  const message = encodeURIComponent(
    "Hi, I'd like to order: " + cart.join(", ")
  );
  window.open(`https://wa.me/91XXXXXXXXXX?text=${message}`, "_blank");
}

// function router() {
//   const hash = location.hash.replace("#/", "") || "home";
//   app.innerHTML = routes[hash] ? routes[hash]() : routes.home();
// }

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
  setActiveLink();

  if (hash === "review") {
    fetchReviews();
    const reviewerName = document.getElementById("reviewerName");
    const reviewText = document.getElementById("reviewText");

    if (reviewerName && reviewText) {
      reviewerName.addEventListener("input", toggleSubmitButton);
      reviewText.addEventListener("input", toggleSubmitButton);
    }
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

emailjs.init("TXDSCYxWtmZPDrkDu"); // replace with your actual public key

const nameInput = document.getElementById("customer-name");
const emailInput = document.getElementById("customer-email");
const sendButton = document.getElementById("send-button");

function openModal() {
  document.getElementById("order-modal").classList.add("show");
  document.getElementById("order-details").value =
    localStorage.getItem("orderDetails") || "No order";
  validateInputs();
}

function closeModal() {
  document.getElementById("order-modal").classList.remove("show");
}

function validateInputs() {
  sendButton.disabled = !(nameInput.value.trim() && emailInput.value.trim());
}

nameInput.addEventListener("input", validateInputs);
emailInput.addEventListener("input", validateInputs);

document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();
  sendButton.disabled = true;

  emailjs.sendForm("service_hy93ivp", "template_p4h22i6", this).then(
    () => {
      cart = [];
      cartCount.textContent = cart.length;
      localStorage.removeItem("orderDetails");
      // alert("✅ Order sent successfully!");
      closeModal();
      window.location.hash = "#/home";
    },
    (error) => {
      alert("❌ Failed to send order. Please try again.");
      console.error(error);
      sendButton.disabled = false;
    }
  );
});

// fetch reviews

// <div id="pagination" style="margin-top:20px; text-align:center;">
//   <button id="prevPage" onclick="changePage(-1)" disabled>Previous</button>
//   <span id="pageInfo"></span>
//   <button id="nextPage" onclick="changePage(1)" disabled>Next</button>
// </div>
const apiBase = "https://review-api-qvgb.onrender.com/api/reviews";
let currentPage = 1;
let totalPages = 1;

async function fetchReviews(page = 1) {
  try {
    const res = await fetch(`${apiBase}?page=${page}`);
    const data = await res.json();
    currentPage = data.page;
    totalPages = data.pages;
    renderReviews(data.reviews);
    updatePagination();
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}

function renderReviews(reviews) {
  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";

  if (reviews.length === 0) {
    reviewList.innerHTML = "<p>No reviews yet. Be the first to add one!</p>";
    return;
  }

  reviews.forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";
    reviewCard.innerHTML = `
      <p>“${escapeHtml(review.text)}”</p>
      <span>– ${escapeHtml(review.name)}</span>
    `;
    reviewList.appendChild(reviewCard);
  });
}

function updatePagination() {
  const pageInfo = document.getElementById("pageInfo");
  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");

  if (pageInfo && prevPage && nextPage) {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPage.disabled = currentPage <= 1;
    nextPage.disabled = currentPage >= totalPages;
  }
}

function changePage(delta) {
  const newPage = currentPage + delta;
  if (newPage >= 1 && newPage <= totalPages) {
    fetchReviews(newPage);
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function toggleSubmitButton() {
  const name = document.getElementById("reviewerName").value.trim();
  const text = document.getElementById("reviewText").value.trim();
  const button = document.getElementById("submitReview");
  button.disabled = !(name && text);
}

async function addReview() {
  const nameInput = document.getElementById("reviewerName");
  const textInput = document.getElementById("reviewText");
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!name || !text) return;

  try {
    const res = await fetch(apiBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text }),
    });

    if (!res.ok) throw new Error("Failed to submit review");

    nameInput.value = "";
    textInput.value = "";
    toggleSubmitButton();

    fetchReviews(1);
    showThankYouModal();
  } catch (error) {
    console.error("Error submitting review:", error);
    alert("Failed to submit review. Please try again.");
  }
}

function showThankYouModal() {
  const modal = document.createElement("div");
  modal.className = "review-thankyou-modal";
  modal.innerHTML = `
    <div class="modal-inner">
      <h2>🎉 Thank you for your review!</h2>
      <p>We truly appreciate your feedback.</p>
      <button onclick="closeThankYouModal()">Close</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeThankYouModal() {
  const modal = document.querySelector(".review-thankyou-modal");
  if (modal) modal.remove();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchReviews();
  document
    .getElementById("reviewerName")
    .addEventListener("input", toggleSubmitButton);
  document
    .getElementById("reviewText")
    .addEventListener("input", toggleSubmitButton);
});
