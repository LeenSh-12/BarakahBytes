document.addEventListener('DOMContentLoaded', function(){
// tajweed.js

// DOM Elements
const tajweedClubLink = document.querySelector('.nav-link:last-child');
const becomeMemberBtn = document.querySelector('#membership .btn');
const membershipPopup = document.getElementById('membershipPopup');
const closeBtn = document.querySelector('.close-btn');
const cardLinks = document.querySelectorAll('.card-link');
const loginBtn = document.getElementById('login-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
const selectBtns = document.querySelectorAll('.select-btn');
const membershipForm = document.getElementById('membershipForm');

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

// Membership access handlers
tajweedClubLink.addEventListener('click', function(e) {
    e.preventDefault();
    handleMembershipAccess();
});

becomeMemberBtn.addEventListener('click', function(e) {
    e.preventDefault();
    handleMembershipAccess();
});

closeBtn.addEventListener('click', function() {
    membershipPopup.style.display = 'none';
});

// Resource access control
cardLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (!isMember) {
            e.preventDefault();
            alert('Please join our Tajweed Club to access these resources!');
            handleMembershipAccess();
        }
    });
});

// Membership selection
selectBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('Please login first to become a member!');
            return;
        }
        document.getElementById('paymentForm').style.display = 'block';
    });
});

// Membership form submission
membershipForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Process payment (in a real app, this would be handled securely)
    currentUser.isMember = true;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    isMember = true;
    updateAuthUI();
    membershipPopup.style.display = 'none';
    alert('Thank you for becoming a member! You now have full access to all resources.');
});

// Update authentication UI
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

// Handle membership access
function handleMembershipAccess() {
    if (!isLoggedIn) {
        alert('Please login first to access the Tajweed Club!');
        // Redirect to login page
        window.location.href = '/Home/login.html';
    } else {
        membershipPopup.style.display = 'flex';
    }
}

// Initialize UI
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    // Hide payment form initially
    document.getElementById('paymentForm').style.display = 'none';
});


// Newsletter Form Validation
const newsletterForm = document.querySelector('#newsletter .form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('.btn');
        const email = emailInput.value.trim();
        
        // Validate email format
        if (!email) {
            showNewsletterMessage('Please enter your email address', 'error');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNewsletterMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Disable button during submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            // On success
            showNewsletterMessage('Thank you for subscribing!', 'success');
            emailInput.value = '';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Receive Notification';
            }, 2000);
            
            // Here you would normally send the data to your server
            console.log('Subscribed email:', email);
            
        }, 1000);
    });
}

// Helper function to show validation messages
function showNewsletterMessage(message, type) {
    // Remove any existing messages first
    const existingMsg = document.querySelector('.newsletter-message');
    if (existingMsg) existingMsg.remove();
    
    // Create message element
    const msgElement = document.createElement('p');
    msgElement.className = `newsletter-message ${type}`;
    msgElement.textContent = message;
    
    // Insert after the form button
    const form = document.querySelector('#newsletter .form');
    form.appendChild(msgElement);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        msgElement.remove();
    }, 3000);
}
})