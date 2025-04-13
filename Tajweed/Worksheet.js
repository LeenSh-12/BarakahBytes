document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('worksheetsContainer');
    
    // Show loading state
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-circle-notch fa-spin"></i> Loading worksheets...</div>';
    
    // Fetch data from external JSON file
    fetch('worksheet.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Clear loading state
            container.innerHTML = '';
            
            // Create cards for each worksheet
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'worksheet-card';
                
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-description">${item.description}</p>
                        <span class="card-price">${item.price}</span>
                        <button class="card-button" data-id="${item.id || item.title.toLowerCase().replace(/ /g, '-')}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                `;
                
                container.appendChild(card);
            });
            
            // Add event listeners to all buttons
            document.querySelectorAll('.card-button').forEach(button => {
                button.addEventListener('click', function() {
                    addToCart(this.dataset.id);
                });
            });
        })
        .catch(error => {
            console.error('Error loading worksheets:', error);
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load worksheets. Please try again later.</p>
                    <button onclick="window.location.reload()">Retry</button>
                </div>
            `;
        });

    // Cart functionality
    function addToCart(itemId) {
        console.log(`Added item ${itemId} to cart`);
        // Add your cart logic here
        // Example: 
        // const cart = JSON.parse(localStorage.getItem('cart')) || [];
        // cart.push(itemId);
        // localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = 'cart-feedback';
        feedback.innerHTML = `<i class="fas fa-check"></i> Added to cart!`;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

// tajweed.js

// DOM Elements
const tajweedClubLink = document.querySelector('.nav-link:last-child');
const closeBtn = document.querySelector('.close-btn');
const cardLinks = document.querySelectorAll('.card-link');
const loginBtn = document.getElementById('login-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
const selectBtns = document.querySelectorAll('.select-btn');


// Check if user is logged in and is a member from localStorage
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let isLoggedIn = currentUser !== null;
let isMember = currentUser ? currentUser.isMember : false;

// Login dropdown functionality
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
        if (!currentUser) {
            alert('No user is currently logged in');
            return;
        }

        // Confirmation dialog
        const confirmLogout = confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            // Remove user data from localStorage
            localStorage.removeItem('currentUser');
            currentUser = null;
            isLoggedIn = false;
            isMember = false;
            
            // Close the dropdown
            dropdownMenu.classList.remove('show');
            
            // Update UI and show alert
            updateAuthUI();
            alert('You have been logged out successfully');
            location.reload(); // Refresh the page
        }
    });
}

});