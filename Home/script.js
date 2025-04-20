document.addEventListener("DOMContentLoaded", function () {
    // Toggle search bar
    const searchBtn = document.querySelector("#search-btn");
    const searchForm = document.querySelector(".search-form");

    if (searchBtn && searchForm) {
        searchBtn.addEventListener("click", () => {
            searchForm.classList.toggle("active");
        });
    }

    // Carousel functionality
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = 300; // Adjust scroll amount as needed

        nextBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        prevBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
    } else {
        console.log("Carousel elements not found - this might be expected if not on a page with carousel");
    }
  
    // Search functionality
    const searchBox = document.querySelector("#search-box");
    const products = document.querySelectorAll(".product");

    if (searchBox && products.length > 0) {
        searchBox.addEventListener("input", () => {
            const searchTerm = searchBox.value.toLowerCase();
            products.forEach((product) => {
                const productNameElement = product.querySelector("h3");
                if (productNameElement) {
                    const productName = productNameElement.textContent.toLowerCase();
                    product.style.display = productName.includes(searchTerm) ? "block" : "none";
                }
            });
        });
    }

    // Fetch the reviews from the JSON file
    const reviewContainer = document.getElementById('review-container');
    if (reviewContainer) {
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(reviews => {
                // Create review elements for each review in the JSON
                reviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.className = 'review';
                    
                    reviewElement.innerHTML = `
                        <img src="${review.image}" alt="${review.alt || 'Reviewer image'}">
                        <p>"${review.quote}"</p>
                        <h4>${review.name}</h4>
                    `;
                    
                    reviewContainer.appendChild(reviewElement);
                });
            })
            .catch(error => {
                console.error('Error loading reviews:', error);
                reviewContainer.innerHTML = '<p>Unable to load reviews at this time.</p>';
            });
    }

    // Login dropdown functionality
    const loginBtn = document.getElementById('login-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (loginBtn && dropdownMenu) {
        loginBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking anywhere else
        window.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
        });

        // Prevent dropdown from closing when clicking inside it
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Update UI based on login status
    function updateAuthUI() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const dropdownMenu = document.getElementById('dropdown-menu');
        
        if (!dropdownMenu) return;

        // Clear existing menu items
        dropdownMenu.innerHTML = '';

        if (currentUser) {
            // User is logged in - show Logout, Change User, and My Orders
            dropdownMenu.innerHTML = `
                <a href="#" class="dropdown-item change-user-item">Change User</a>
                <a href="#" class="dropdown-item logout-item">Logout</a>
                <a href="/Products/orders.html" class="dropdown-item orders-item">My Orders</a>
            `;
            
            // Add logout functionality
            document.querySelector('.logout-item')?.addEventListener('click', function(e) {
                e.preventDefault();
                const confirmLogout = confirm('Are you sure you want to logout?');
                if (confirmLogout) {
                    localStorage.removeItem('currentUser');
                    updateAuthUI();
                    alert('You have been logged out successfully');
                    location.reload();
                }
            });
            
            // Add change user functionality
            document.querySelector('.change-user-item')?.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = "/Home/login.html";
            });
        } else {
            // User is logged out - show Login only
            dropdownMenu.innerHTML = `
                <a href="/Home/login.html" class="dropdown-item login-item">Login</a>
            `;
        }
    }

    // Initialize UI on page load
    updateAuthUI();

    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle");
    const mobileDrawer = document.getElementById("mobile-drawer");

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener("click", () => {
            mobileDrawer.classList.toggle("active");
        });
    }

    // Product details functionality
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        fetch("products.json")
            .then(res => res.json())
            .then(products => {
                const product = products.find(p => p.id === productId);
                const container = document.getElementById("product-details");

                if (product) {
                    container.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="info">
                            <h1>${product.name}</h1>
                            <p class="price">${product.price}</p>
                            <p class="desc">${product.description}</p>

                            <div class="engage-section">
                                <div class="engage-item">
                                    <i class="fas fa-shipping-fast"></i>
                                    <span>Free Delivery</span>
                                </div>
                                <div class="engage-item">
                                    <i class="fas fa-certificate"></i>
                                    <span>Trusted Quality</span>
                                </div>
                                <div class="engage-item">
                                    <i class="fas fa-hand-holding-heart"></i>
                                    <span>Spiritual Gift</span>
                                </div>
                            </div>

                            <button class="buy-btn">Add to Cart</button>
                        </div>
                    `;

                    document.querySelector(".buy-btn")?.addEventListener("click", () => {
                        addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image
                        });
                    });

                    const recommended = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
                    if (recommended.length > 0) {
                        document.getElementById("recommended-section").style.display = "block";
                        const list = document.getElementById("recommended-list");
                        recommended.forEach(p => {
                            const card = document.createElement("div");
                            card.className = "recommended-product";
                            card.innerHTML = `
                                <img src="${p.image}" alt="${p.name}">
                                <h3>${p.name}</h3>
                                <p>${p.price}</p>
                            `;
                            card.addEventListener("click", () => {
                                window.location.href = `product-details.html?id=${p.id}`;
                            });
                            list.appendChild(card);
                        });
                    }
                } else {
                    container.innerHTML = "<p>Product not found.</p>";
                }
            });
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart-items")) || [];
        const exists = cart.find(item => item.id === product.id);
        if (exists) {
            exists.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart-items", JSON.stringify(cart));
        alert("Product added to cart!");
    }
});