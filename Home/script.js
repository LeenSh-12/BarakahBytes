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
    
    // Logout functionality
const logoutBtn = document.querySelector('.dropdown-menu .dropdown-item:nth-child(2)');

if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Check if user is actually logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('No user is currently logged in');
            return;
        }

        // Confirmation dialog
        const confirmLogout = confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            // Remove user data from localStorage
            localStorage.removeItem('currentUser');
            
            // Optional: Remove other user-related data if needed
            // localStorage.removeItem('userCart');
            // localStorage.removeItem('userPreferences');
            
            // Close the dropdown
            dropdownMenu.classList.remove('show');
            
            // Optional: Refresh the page or update UI
            alert('You have been logged out successfully');
            location.reload(); // Remove this line if you don't want page refresh
        }
    });
}

// Update UI based on login status
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginItem = document.querySelector('.dropdown-menu .dropdown-item:nth-child(1)');
    const logoutItem = document.querySelector('.dropdown-menu .dropdown-item:nth-child(2)');

    if (currentUser) {
        // User is logged in
        if (loginItem) loginItem.style.display = 'none';
        if (logoutItem) logoutItem.style.display = 'block';
    } else {
        // User is logged out
        if (loginItem) loginItem.style.display = 'block';
        if (logoutItem) logoutItem.style.display = 'none';
    }
}

// Initialize UI on page load
document.addEventListener('DOMContentLoaded', updateAuthUI);
});

  document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileDrawer = document.getElementById("mobile-drawer");

    menuToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("active");
    });
  });

document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const dropdownMenu = document.getElementById("dropdown-menu");
    if (currentUser && dropdownMenu) {
      const ordersLink = document.createElement("a");
      ordersLink.href = "/Products/orders.html";
      ordersLink.className = "dropdown-item";
      ordersLink.textContent = "My Orders";
      dropdownMenu.appendChild(ordersLink);
    }
  });