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

// Login/Signup section
const conta = document.querySelector('.cont');
const registerBTN = document.querySelector('.register-BTN');
const loginBTN = document.querySelector('.login-BTN');
const loginIcon = document.getElementById('login-btn');
const closeBtn = document.querySelectorAll('.close-btn');
const loginForm = document.querySelector('.form-box.login');
const registerForm = document.querySelector('.form-box.register');

// Show/hide login container
loginIcon.addEventListener('click', () => {
    conta.style.display = 'block';
});

// Close button functionality
closeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        conta.style.display = 'none';
    });
});

// Toggle between login and register forms
registerBTN.addEventListener('click', () => {
    conta.classList.add('active');
});

loginBTN.addEventListener('click', () => {
    conta.classList.remove('active');
});

// User data from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Login form validation and submission
const loginUsername = loginForm.querySelector('input[type="text"]');
const loginPassword = loginForm.querySelector('input[type="password"]');
const loginSubmitBtn = loginForm.querySelector('.BTN');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!loginUsername.value || !loginPassword.value) {
        alert('Please fill in all fields');
        return;
    }
    
    // Check if user exists
    const user = users.find(u => u.username === loginUsername.value && u.password === loginPassword.value);
    
    if (user) {
        alert('Login successful!');
        // Store current user in session
        localStorage.setItem('currentUser', JSON.stringify(user));
        conta.style.display = 'none';
        // Reset form
        loginForm.reset();
    } else {
        alert('Invalid username or password');
    }
});

// Register form elements
const regUsername = registerForm.querySelector('input[type="text"]');
const regEmail = registerForm.querySelector('input[type="email"]');
const regPassword = registerForm.querySelector('input[type="password"]');
const regSubmitBtn = registerForm.querySelector('.BTN');

// Email validation function
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Register form validation and submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!regUsername.value || !regEmail.value || !regPassword.value) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(regEmail.value)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Check if username or email already exists
    const userExists = users.some(u => u.username === regUsername.value || u.email === regEmail.value);
    
    if (userExists) {
        alert('Username or email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        username: regUsername.value,
        email: regEmail.value,
        password: regPassword.value
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful! You can now login.');
    conta.classList.remove('active');
    registerForm.reset();
});

// Check if user is already logged in on page load
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        // User is logged in, you could update UI here
        console.log('User is logged in:', currentUser.username);
    }
    
    // Hide the container initially
    conta.style.display = 'none';
});

// Disable register button if form is invalid
function validateRegisterForm() {
    const isEmailValid = isValidEmail(regEmail.value);
    const allFieldsFilled = regUsername.value && regEmail.value && regPassword.value;
    
    regSubmitBtn.disabled = !(isEmailValid && allFieldsFilled);
}

// Add event listeners for real-time validation
regUsername.addEventListener('input', validateRegisterForm);
regEmail.addEventListener('input', validateRegisterForm);
regPassword.addEventListener('input', validateRegisterForm);

// Initial validation
validateRegisterForm();
});