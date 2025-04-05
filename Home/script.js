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
        console.error("Carousel or buttons not found!");
    }

    // Login/Signup popup
    const loginBtn = document.querySelector("#login-btn");
    const loginPopup = document.querySelector("#login-popup");
    const closeLoginBtn = document.querySelector("#login-popup .close-btn");

    if (loginBtn && loginPopup && closeLoginBtn) {
        loginBtn.addEventListener("click", () => {
            loginPopup.classList.add("active");
        });

        closeLoginBtn.addEventListener("click", () => {
            loginPopup.classList.remove("active");
        });
    }

    // Search functionality
    const searchBox = document.querySelector("#search-box");
    const products = document.querySelectorAll(".product");

    if (searchBox && products) {
        searchBox.addEventListener("input", () => {
            const searchTerm = searchBox.value.toLowerCase();
            products.forEach((product) => {
                const productName = product.querySelector("h3").textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    }
  // Fetch the reviews from the JSON file
  fetch('data.json')
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
  .then(reviews => {
      const reviewContainer = document.getElementById('review-container');
      
      // Create review elements for each review in the JSON
      reviews.forEach(review => {
          const reviewElement = document.createElement('div');
          reviewElement.className = 'review';
          
          reviewElement.innerHTML = `
              <img src="${review.image}" alt="${review.alt}">
              <p>"${review.quote}"</p>
              <h4>${review.name}</h4>
          `;
          
          reviewContainer.appendChild(reviewElement);
      });
    })
    .catch(error => {
        console.error('Error loading reviews:', error);
        // You could display a fallback message here if the JSON fails to load
        document.getElementById('review-container').innerHTML = 
            '<p>Unable to load reviews at this time.</p>';
    });
});