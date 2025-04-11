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
  


// --- EXISTING LOGIN POPUP CODE (UNCHANGED) ---
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

// --- ENHANCED SIGNUP POPUP CODE ---
const switchToSignup = document.querySelector("#switch-to-signup");
const signupPopup = document.querySelector("#signup-popup");
const closeSignupBtn = document.querySelector("#signup-popup .close-btn");
const switchToLogin = document.querySelector("#switch-to-login");
const signupForm = document.querySelector("#signup-form");
const signupPassword = document.querySelector("#signup-password");
const confirmPassword = document.querySelector("#confirm-password");
const signupSubmitBtn = document.querySelector("#signup-form button[type='submit']");
const loginForm = document.querySelector("#login-form");

// Password matching validation
function validatePasswords() {
    const password = signupPassword.value;
    const confirm = confirmPassword.value;
    const mismatchError = document.querySelector(".password-mismatch-error");

    if (password !== confirm && confirm !== "") {
        if (!mismatchError) {
            const errorMsg = document.createElement("p");
            errorMsg.className = "password-mismatch-error";
            errorMsg.style.color = "red";
            errorMsg.textContent = "Passwords do not match!";
            confirmPassword.insertAdjacentElement("afterend", errorMsg);
        }
        signupSubmitBtn.disabled = true;
        signupSubmitBtn.style.opacity = "0.5";
        signupSubmitBtn.style.cursor = "not-allowed";
    } else {
        if (mismatchError) mismatchError.remove();
        signupSubmitBtn.disabled = false;
        signupSubmitBtn.style.opacity = "1";
        signupSubmitBtn.style.cursor = "pointer";
    }
}

// Event listeners for password validation
if (signupPassword && confirmPassword) {
    confirmPassword.addEventListener("input", validatePasswords);
    signupPassword.addEventListener("input", validatePasswords);
}

// Signup success handler
function showSignupSuccess() {
    const signupContent = document.querySelector("#signup-popup .popup-content");
    signupContent.innerHTML = `
        <span class="close-btn">&times;</span>
        <h2>Thank You!</h2>
        <div class="success-message">
            <p>Your account has been created successfully!</p>
            <button id="go-to-login" class="success-btn">Login Now</button>
        </div>
    `;
    
    // Add event listener for the new login button
    document.querySelector("#go-to-login").addEventListener("click", () => {
        signupPopup.classList.remove("active");
        loginPopup.classList.add("active");
    });
    
    // Reattach close button functionality
    document.querySelector("#signup-popup .close-btn").addEventListener("click", () => {
        signupPopup.classList.remove("active");
    });
}

// Login success handler
function showLoginSuccess(email) {
    const loginContent = document.querySelector("#login-popup .popup-content");
    loginContent.innerHTML = `
        <span class="close-btn">&times;</span>
        <h2>Welcome Back!</h2>
        <div class="success-message">
            <p>You are logged in as <strong>${email}</strong></p>
            <button id="close-success" class="success-btn">Continue</button>
        </div>
    `;
    
    // Add event listener for the close button
    document.querySelector("#close-success").addEventListener("click", () => {
        loginPopup.classList.remove("active");
    });
    
    // Reattach close button functionality
    document.querySelector("#login-popup .close-btn").addEventListener("click", () => {
        loginPopup.classList.remove("active");
    });
}

// Signup form submission
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (signupPassword.value !== confirmPassword.value) {
            alert("Passwords do not match!");
            return;
        }
        
        // In a real app, you would send data to server here
        showSignupSuccess();
    });
}

// Login form submission
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.querySelector("#email").value;
        
        // In a real app, you would verify credentials with server here
        showLoginSuccess(email);
    });
}

// Popup switching functionality
if (switchToSignup && signupPopup) {
    switchToSignup.addEventListener("click", (e) => {
        e.preventDefault();
        loginPopup.classList.remove("active");
        signupPopup.classList.add("active");
    });
}

if (closeSignupBtn) {
    closeSignupBtn.addEventListener("click", () => {
        signupPopup.classList.remove("active");
    });
}

if (switchToLogin) {
    switchToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        signupPopup.classList.remove("active");
        loginPopup.classList.add("active");
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