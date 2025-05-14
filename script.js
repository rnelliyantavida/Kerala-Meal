
    //   const app = document.getElementById("app");
    //   const cartCount = document.getElementById("cart-count");
    //   const cart = [];

    //   const menuItems = [
    //     {
    //       name: "Kerala Sadya",
    //       price: 10,
    //       image: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Sibyl_Sunitha/Kerala_Sadya.jpg",
    //     },
    //     {
    //       name: "Beef Fry with Porotta",
    //       price: 8,
    //       image: "https://www.keralatourism.org/images/enjoy-kannur/kannur/beef-fry.jpg",
    //     },
    //     {
    //       name: "Fish Curry Meal",
    //       price: 9,
    //       image: "https://www.tastycircle.com/wp-content/uploads/2021/06/Kerala-style-fish-curry.jpg",
    //     },
    //   ];

    //   const routes = {
    //     home: () => `
    //       <section class="home">
    //         <div class="home-content">
    //           <h3>Welcome to</h3>
    //           <h1>Kerala Home Meals</h1>
    //           <h3>Authentic, homemade food from <span>God's Own Country</span></h3>
    //           <p>Enjoy delicious, freshly made Kerala dishes delivered straight to your door. Traditional flavors, homely vibes, and love in every bite.</p>
    //           <a href="#/menu" class="btn-box">View Menu</a>
    //         </div>
    //       </section>
    //     `,
    //     menu: () => `
    //       <section class="menu-section">
    //         <h1 class="sub-title">Our <span>Menu</span></h1>
    //         <div class="services-list">
    //           ${menuItems.map(item => `
    //             <div class="menu-item">
    //               <img src="${item.image}" alt="${item.name}" style="width:100%; border-radius:10px; margin-bottom:10px;" />
    //               <h2>${item.name}</h2>
    //               <p>Price: $${item.price}</p>
    //               <button onclick="addToCart('${item.name}')" class="btn-box">Add to Cart</button>
    //             </div>
    //           `).join("")}
    //         </div>
    //       </section>
    //     `,
    //     review: () => `
    //       <section class="review-section">
    //         <h1 class="sub-title">Customer <span>Reviews</span></h1>
    //         <p>"Absolutely loved the Sadya! Reminded me of home." – Anjali K.</p>
    //         <p>"The beef fry was perfectly spiced. Thank you for bringing Kerala to my doorstep!" – Ravi M.</p>
    //       </section>
    //     `,
    //     about: () => `
    //       <section class="about">
    //         <div class="about-img">
    //           <img src="https://www.keralatourism.org/images/homecontentimage/desktop/kerala-tourism-beautiful.jpg" alt="Kerala" />
    //         </div>
    //         <div class="about-text">
    //           <h2>About <span>Us</span></h2>
    //           <h4>Bringing you the heart of Kerala</h4>
    //           <p>We’re a home kitchen committed to sharing the love of Kerala’s rich cuisine. Every dish is handmade with locally sourced ingredients, ensuring authenticity and freshness.</p>
    //         </div>
    //       </section>
    //     `,
    //   };

    //   function addToCart(itemName) {
    //     cart.push(itemName);
    //     cartCount.textContent = cart.length;
    //   }

    //   function sendOrder() {
    //     if (cart.length === 0) return alert("Your cart is empty!");
    //     const message = encodeURIComponent("Hi, I'd like to order: " + cart.join(", "));
    //     window.open(`https://wa.me/91XXXXXXXXXX?text=${message}`, "_blank");
    //   }

    //   function router() {
    //     const hash = location.hash.replace("#/", "") || "home";
    //     app.innerHTML = routes[hash] ? routes[hash]() : routes.home();
    //   }

    //   window.addEventListener("hashchange", router);
    //   window.addEventListener("load", router);